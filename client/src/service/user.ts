import { SearchUser } from '@/model/user';
import { client } from './sanity';

type OAuthUser = {
	id: string;
	email: string;
	name: string;
	username: string;
	image?: string | null;
};

export async function addUser({ id, name, username, email, image }: OAuthUser) {
	const auth = await client.createIfNotExists({
		// sanity 데이터베이스 구조
		_id: id,
		_type: 'user',
		name,
		username,
		email,
		image,
		following: [],
		followers: [],
		bookmarks: [],
	});
	return auth;
}

export async function getUserByUsername(username: string) {
	// client = sanity
	return client.fetch(
		`*[_type=="user" && username=="${username}"][0]{
    ...,
    "id": _id,
    following[]->{username, image}, 
    followers[]->{username, image}, 
    "bookmarks": bookmarks[]->_id
  }`
	);
	// following/follower는 user를 reference하고 있는데,
	// user 정보 다 가져오는게 아니라 그 중에서도 username과 image만 가져오기 !
}

export async function searchUsers(keyword?: string) {
	const query = keyword
		? `&& (name match "${keyword}*") || (username match "${keyword}*")`
		: '';
	return client
		.fetch(
			`
        *[_type=='user' ${query}]{
          ...,
          "following" : count(following),
          "followers" : count(followers)
        }
      `
		)
		.then((users) =>
			users.map((user: SearchUser) => ({
				...user,
				following: user.following ?? 0,
				followers: user.followers ?? 0,
			}))
		);
}

export async function getUserForProfile(username: string) {
	return client
		.fetch(
			`
    *[_type=="user" && username=="${username}"][0]{
        ...,
        "id": _id,
        "following": count(following), 
        "followers": count(followers), 
        "posts": count(*[_type=='post' && author->username == "${username}"])
    }
  `
		)
		.then((user) => ({
			...user,
			following: user.following ?? 0,
			followers: user.followers ?? 0,
			posts: user.posts ?? 0,
		}));
}

export async function addBookmark(userId: string, postId: string) {
	return client
		.patch(userId) //
		.setIfMissing({ bookmarks: [] }) //
		.append('bookmarks', [{ _ref: postId, _type: 'reference' }]) //
		.commit({ autoGenerateArrayKeys: true });
}

export async function removeBookmark(userId: string, postId: string) {
	return client
		.patch(userId) //
		.unset([`bookmarks[_ref==${postId}]`]) //
		.commit({ autoGenerateArrayKeys: true });
}

export async function follow(myId: string, targetId: string) {
	return client
		.transaction() //
		.patch(myId, (user) =>
			user
				.setIfMissing({ following: [] })
				.append('following', [{ _ref: targetId, _type: 'reference' }])
		)
		.patch(targetId, (user) =>
			user
				.setIfMissing({ followers: [] })
				.append('followers', [{ _ref: myId, _type: 'reference' }])
		)
		.commit({ autoGenerateArrayKeys: true });
}

export async function unfollow(myId: string, targetId: string) {
	return client
		.transaction() //
		.patch(myId, (user) => user.unset([`following[_ref=="${targetId}"]`]))
		.patch(targetId, (user) => user.unset([`followers[_ref=="${myId}"]`]))
		.commit({ autoGenerateArrayKeys: true });
}
