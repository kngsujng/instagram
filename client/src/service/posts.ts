import { SimplePost } from '@/model/post';
import urlFor, { assetsURL, client } from './sanity';

const simpleProjection = `
  ..., 
  "id": _id,
  "createdAt": _createdAt,
  "username" : author->username,
  "userImage" : author->image,
  "image": photo, 
  "likes": likes[]->username,
  "text": comments[0].text,
  "comments": count(comments),
`;

function mapPosts(posts: SimplePost[]) {
	return posts.map((post: SimplePost) => ({
		...post,
		likes: post.likes ?? [],
		image: urlFor(post.image),
	}));
}

export async function getFollowingPostsOf(username: string) {
	return client
		.fetch(
			`
  *[_type=='post' && author->username == "${username}"
      || author._ref in *[_type=='user' && username=="${username}"].following[]._ref]
    | order(_createdAt desc){${simpleProjection}}
  `
		)
		.then(mapPosts);
}

// -> : refernce에서 한 항목 가져오고 싶을 때

export async function getPost(id: string) {
	return client
		.fetch(
			`
  *[_type=='post' && _id=="${id}"][0]{
    ...,
    "id": _id,
    "createdAt": _createdAt,
    "username": author->username,
    "userImage": author->image,
    "image": photo, 
    "likes": likes[]->username,
    comments[]{text, "username": author->username, "image": author->image}
  }
  `
		)
		.then((post) => ({ ...post, image: urlFor(post.image) }));
}

export async function getPostsOf(username: string) {
	return client
		.fetch(
			`
    *[_type == 'post' && author->username == "${username}"]
      | order(_createdAt desc){
        ${simpleProjection}
      }
  `
		) //
		.then(mapPosts);
}

export async function getLikedPostsOf(username: string) {
	return client
		.fetch(
			`
    *[_type == 'post' && "${username}" in likes[]->username]
      | order(_createdAt desc){
        ${simpleProjection}
      }
  `
		) //
		.then(mapPosts);
}

export async function getSavedPostsOf(username: string) {
	return client
		.fetch(
			`
    *[_type == 'post' && _id in *[_type=='user' && username=='${username}'].bookmarks[]._ref]
      | order(_createdAt desc){
        ${simpleProjection}
      }
  `
		) //
		.then(mapPosts);
}

export async function likePost(postId: string, userId: string) {
	return client
		.patch(postId) //
		.setIfMissing({ likes: [] }) //
		.append('likes', [
			{
				_ref: userId,
				_type: 'reference',
			},
		]) //
		.commit({ autoGenerateArrayKeys: true });
}

export async function dislikePost(postId: string, userId: string) {
	return client
		.patch(postId) //
		.unset([`likes[_ref=="${userId}"]`]) //
		.commit({ autoGenerateArrayKeys: true });
}

export async function addComment(postId: string, userId: string, text: string) {
	return client
		.patch(postId) //
		.setIfMissing({ comments: [] }) //
		.append('comments', [
			{
				author: { _ref: userId, _type: 'reference' },
				text,
			},
		]) //
		.commit({ autoGenerateArrayKeys: true });
}

export async function createPost(userId: string, text: string, file: Blob) {
	console.log(userId, text, file);
	// {} : POST option
	return fetch(assetsURL, {
		method: 'POST',
		headers: {
			'content-type': file.type,
			authorization: `Bearer ${process.env.SANITY_SECRET_TOKEN}`,
		},
		body: file,
	})
		.then((res) => res.json()) //
		.then((result) => {
			return client.create(
				{
					_type: 'post',
					author: { _ref: userId },
					photo: { asset: { _ref: result.document._id } },
					comments: [
						{
							author: { _ref: userId, _type: 'reference' },
							text: text,
						},
					],
					likes: [],
				},
				{ autoGenerateArrayKeys: true }
			);
		});
}
