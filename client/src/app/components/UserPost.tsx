'use client';
import { ProfileUser } from '@/model/user';
import { useState } from 'react';
import PostIcon from './ui/icons/PostIcon';
import HeartIcon from './ui/icons/HeartIcon';
import BookmarkIcon from './ui/icons/BookmarkIcon';
import PostGrid from './PostGrid';
import { CacheKeysContext } from '@/context/CacheKeysContext';

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
			<ul className="flex justify-center uppercase">
				{tabs.map(({ type, icon }) => (
					<li
						className={`mx-12 p-4 cursor-pointer border-black flex items-center ${
							type === query && 'font-bold border-t'
						}`}
						key={type}
						onClick={() => setQuery(type)}
					>
						<button className="scale-150 md:scale-100">{icon}</button>
						<span className="hidden md:inline">{type}</span>
					</li>
				))}
			</ul>
			<CacheKeysContext.Provider
				value={{ postsKey: `/api/users/${username}/${query}` }}
			>
				<PostGrid />
			</CacheKeysContext.Provider>
		</section>
	);
}
