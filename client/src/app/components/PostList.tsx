'use client';

import PostListCard from './PostListCard';
import Spinner from './Spinner';
import usePosts from '../hooks/usePosts';

export default function PostList() {
	const { posts, isLoading: loading } = usePosts();

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
