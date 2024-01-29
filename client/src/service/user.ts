import { ProfileUser } from '@/model/user';
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
		? `&& (name match "${keyword}") || (username match "${keyword}")`
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
			users.map((user: ProfileUser) => ({
				...user,
				following: user.following ?? 0,
				followers: user.followers ?? 0,
			}))
		);
}
