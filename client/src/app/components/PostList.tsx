'use client';

import useSWR from 'swr';
import { SimplePost } from '@/model/post';
import PostCard from './PostCard';
import { FadeLoader } from 'react-spinners';

export default function PostList() {
	const {
		data: posts,
		isLoading: loading,
		error,
	} = useSWR<SimplePost[]>('/api/posts');

	return (
		<>
			{loading && (
				<div>
					<FadeLoader color="red" />
				</div>
			)}
			{posts && (
				<ul>
					{posts.map((post) => (
						<li key={post.id}>
							<PostCard post={post} />
						</li>
					))}
				</ul>
			)}
		</>
	);
}
