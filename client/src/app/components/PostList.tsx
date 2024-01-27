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
				<div className="flex justify-center text-center mt-32">
					<FadeLoader color="pink" />
				</div>
			)}
			{posts && (
				<ul>
					{posts.map((post) => (
						<li
							key={post.id}
							className="mb-4"
						>
							<PostCard post={post} />
						</li>
					))}
				</ul>
			)}
		</>
	);
}
