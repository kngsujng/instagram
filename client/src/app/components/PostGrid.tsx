'use client';

import useSWR from 'swr';
import Spinner from './Spinner';
import { SimplePost } from '@/model/post';
import PostGridCard from './PostGridCard';

type Props = {
	username: string;
	query: string;
};

export default function PostGrid({ username, query }: Props) {
	const {
		data: posts,
		isLoading,
		error,
	} = useSWR<SimplePost[]>(`/api/users/${username}/${query}`);
	return (
		<div>
			{isLoading && <Spinner />}
			<ul>
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
