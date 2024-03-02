'use client';

import Spinner from './Spinner';
import PostGridCard from './PostGridCard';
import usePosts from '../hooks/usePosts';

export default function PostGrid() {
	const { posts, isLoading } = usePosts();
	return (
		<div>
			{isLoading && <Spinner />}
			<ul className="grid grid-cols-3 gap-4 py-4 px-8">
				{posts &&
					posts.map((post, index) => (
						<li key={post.id}>
							<PostGridCard
								post={post}
								priority={index < 6}
							/>
						</li>
					))}
			</ul>
		</div>
	);
}
