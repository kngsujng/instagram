'use client';

import useSWR from 'swr';
import { useState } from 'react';
import { ProfileUser } from '@/model/user';
import Spinner from './Spinner';

export default function UserSearch() {
	const [keyword, setKeyword] = useState('');
	const {
		data: users,
		isLoading: loading,
		error,
	} = useSWR<ProfileUser[]>(`/api/search/${keyword}`);

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
	};

	return (
		<>
			<form onSubmit={onSubmit}>
				<input
					className="border border-gray-200 w-full outline-none"
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
			<ul>
				{users &&
					users.map((user) => (
						<li key={user.username}>
							<p>{user.username}</p>
						</li>
					))}
			</ul>
		</>
	);
}
