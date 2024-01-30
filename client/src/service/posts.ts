import { SimplePost } from '@/model/post';
import urlFor, { client } from './sanity';

const simpleProjection = `
  ..., 
  "id": _id,
  "createdAt": _createdAt,
  "username" : author->username,
  "userImage" : author->image,
  "image": photo, 
  "likes": likes[]->username,
  "text": comments[0].comment,
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
    comments[]{comment, "username": author->username, "image": author->image}
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
		.append('likes', [{ _ref: userId, _type: 'refernce' }]) //
		.commit({ autoGenerateArrayKeys: true });
}

export async function dislikePost(postId: string, userId: string) {
	return client
		.patch(postId) //
		.unset([`likes[_ref==${userId}]`]) //
		.commit({ autoGenerateArrayKeys: true });
}
