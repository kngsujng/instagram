'use client';
import { ProfileUser } from '@/model/user';
import { useState } from 'react';
import PostIcon from './ui/icons/PostIcon';
import HeartIcon from './ui/icons/HeartIcon';
import BookmarkIcon from './ui/icons/BookmarkIcon';
import PostGrid from './PostGrid';

type Props = {
	user: ProfileUser;
};
const tabs = [
	{ type: 'posts', icon: <PostIcon /> },
	{ type: 'liked', icon: <HeartIcon className={'w-5 h-5'} /> },
	{ type: 'saved', icon: <BookmarkIcon className={'w-5 h-5'} /> },
];
export default function UserPost({ user: { username } }: Props) {
	// /api/users/${username}/posts
	// /api/users/${username}/liked
	// /api/users/${username}/saved
	const [query, setQuery] = useState(tabs[0].type);
	return (
		<section>
			<ul>
				{tabs.map(({ type, icon }) => (
					<li
						key={type}
						onClick={() => setQuery(type)}
					>
						<button>{icon}</button>
						<span>{type}</span>
					</li>
				))}
			</ul>
			<PostGrid
				username={username}
				query={query}
			/>
		</section>
	);
}
