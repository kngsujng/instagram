'use client';

import useSWR from 'swr';
import { SimplePost } from '@/model/post';
import PostListCard from './PostListCard';
import Spinner from './Spinner';

export default function PostList() {
	const {
		data: posts,
		isLoading: loading,
		error,
	} = useSWR<SimplePost[]>('/api/posts');

	return (
		<>
			{loading && <Spinner />}
			{posts && (
				<ul>
					{posts.map((post, index) => (
						<li
							key={post.id}
							className="mb-4"
						>
							<PostListCard
								post={post}
								priority={index < 2 && true}
							/>
						</li>
					))}
				</ul>
			)}
		</>
	);
}
