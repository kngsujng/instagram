'use client';

import { SimplePost } from '@/model/post';
import useSWR, { useSWRConfig } from 'swr';

export default function usePosts() {
	const { mutate } = useSWRConfig();
	const { data: posts, isLoading, error } = useSWR<SimplePost[]>('/api/posts');
	const setLike = (post: SimplePost, username: string, like: boolean) => {
		fetch('/api/likes', {
			method: 'PUT',
			body: JSON.stringify({ id: post.id, like }),
		}).then(() => mutate('/api/posts')); // 캐시 업데이트 (SWR : '/api/posts'가 키)
	};
	return { posts, isLoading, error, setLike };
}
