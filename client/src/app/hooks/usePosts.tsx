'use client';

import { SimplePost, Comment } from '@/model/post';
import useSWR from 'swr';

async function updateLike(id: string, like: boolean) {
	return fetch('/api/likes', {
		method: 'PUT',
		body: JSON.stringify({ id, like }),
	}).then((res) => res.json());
}
// .then(() => mutate('/api/posts')); // 캐시 업데이트 (SWR : '/api/posts'가 키)

async function addComment(id: string, comment: string) {
	return fetch('/api/comments', {
		method: 'POST',
		body: JSON.stringify({ id, comment }),
	}).then((res) => res.json());
}

// 💡💡💡
export default function usePosts() {
	const {
		data: posts,
		isLoading,
		error,
		mutate, // bound mutate
	} = useSWR<SimplePost[]>('/api/posts');

	const setLike = (post: SimplePost, username: string, like: boolean) => {
		// 💡 1. like 반영한 새로운 post 생성
		const newPost = {
			...post,
			likes: like
				? [...post.likes, username] // like 배열에 username 추가
				: post.likes.filter((item) => item !== username), // like 배열에 username없는 것만으로 새로운 like 배열 만들기
		};

		// 💡 2. newPost를 기반으로 posts도 업데이트 (optimistic UI update를 위함 -optimisticData)
		const newPosts = posts?.map((p) => (p.id === post.id ? newPost : p));

		// 💡 3. bound mutate
		return mutate(updateLike(post.id, like), {
			optimisticData: newPosts,
			populateCache: false, // 기존 posts 데이터 업데이트 x => 불필요한 서버 통신 x
			revalidate: false,
			rollbackOnError: true,
		});
	};

	// comment
	const postComment = (post: SimplePost, comment: Comment) => {
		const newPost = {
			...post,
			comments: post.comments + 1,
		};
		const newPosts = posts?.map((p) => (p.id === post.id ? newPost : p));

		return mutate(addComment(post.id, comment.text), {
			optimisticData: newPosts,
			populateCache: false,
			revalidate: false,
			rollbackOnError: true,
		});
	};

	return { posts, isLoading, error, setLike, postComment };
}
