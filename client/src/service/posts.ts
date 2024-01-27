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

export async function getFollowingPostsOf(username: string) {
	return client
		.fetch(
			`
  *[_type=='post' && author->username == "${username}"
      || author._ref in *[_type=='user' && username=="${username}"].following[]._ref]
    | order(_createdAt desc){${simpleProjection}}
  `
		)
		.then((posts) =>
			posts.map((post: SimplePost) => ({ ...post, image: urlFor(post.image) }))
		);
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
