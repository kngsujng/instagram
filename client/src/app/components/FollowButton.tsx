'use client';

import { ProfileUser } from '@/model/user';
import Button from './Button';
import useMe from '../hooks/useMe';

type Props = {
	user: ProfileUser;
};

export default function FollowButton({ user }: Props) {
	const { username } = user;
	const { user: loggedInUser } = useMe();
	const showButton = loggedInUser && loggedInUser.username !== username;
	const following =
		loggedInUser &&
		loggedInUser.following.find((item) => item.username === username);
	const text = following ? 'Unfollow' : 'Follow';
	return (
		<>
			{showButton && (
				<Button
					text={text}
					onClick={() => {}}
					red={text === 'Unfollow'}
				/>
			)}
		</>
	);
}
