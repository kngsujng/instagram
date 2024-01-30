'use client';

import { ProfileUser } from '@/model/user';
import Button from './Button';
import useMe from '../hooks/useMe';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { PropagateLoader } from 'react-spinners';

type Props = {
	user: ProfileUser;
};

export default function FollowButton({ user }: Props) {
	const { username } = user;
	const { user: loggedInUser, toggleFollow } = useMe();
	// 💡 router.refresh(): 서버상에서 미리 렌더링된 페이지도 client component에서 달라진 데이터만 업데이트 가능하게 도와준다.
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const [isFetching, setIsFetching] = useState(false);
	const isUpdating = isPending || isFetching;
	const showButton = loggedInUser && loggedInUser.username !== username;
	const following =
		loggedInUser &&
		!!loggedInUser.following.find((item) => item.username === username);
	const text = following ? 'Unfollow' : 'Follow';
	const handleFollow = async () => {
		setIsFetching(true);
		await toggleFollow(user.id, !following);
		setIsFetching(false);
		startTransition(() => {
			router.refresh(); // 자동으로 isPending이 true로 설정됨
		});
	};
	return (
		<>
			{showButton && (
				<div className="relative">
					{isUpdating && (
						<div className="absolute z-20 inset-0 flex justify-center items-center">
							<PropagateLoader size={6} />
						</div>
					)}
					<Button
						disabled={isUpdating}
						text={text}
						onClick={handleFollow}
						red={text === 'Unfollow'}
					/>
				</div>
			)}
		</>
	);
}
