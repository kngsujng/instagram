'use client';

import useSWR from 'swr';
import { useState } from 'react';
import { SearchUser } from '@/model/user';
import Spinner from './Spinner';
import UserCard from './UserCard';
import useDebounce from '../hooks/useDebounce';

export default function UserSearch() {
	const [keyword, setKeyword] = useState('');
	const debouncedSearch = useDebounce(keyword, 500);
	const {
		data: users,
		isLoading: loading,
		error,
	} = useSWR<SearchUser[]>(`/api/search/${debouncedSearch}`);

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
	};

	return (
		<section className="w-full max-w-2xl flex flex-col items-center">
			<form
				onSubmit={onSubmit}
				className="w-full mb-4"
			>
				<input
					className="w-full text-xl p-3 border border-gray-400 outline-none"
					type="text"
					placeholder="Search form a username or name"
					autoFocus
					value={keyword}
					onChange={(e) => setKeyword(e.target.value)}
				/>
			</form>
			{error && <p>무언가가 잘못 되었음 😫</p>}
			{loading && <Spinner />}
			{!loading && !error && users?.length === 0 && (
				<p>찾는 사용자가 없음 😭</p>
			)}
			<ul className="w-full p-4">
				{users &&
					users.map((user) => (
						<li key={user.username}>
							<UserCard user={user} />
						</li>
					))}
			</ul>
		</section>
	);
}
