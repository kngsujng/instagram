import FollowButton from './FollowButton';
import Profile from './Profile';
import { ProfileUser } from '@/model/user';

type Props = {
	user: ProfileUser;
};

export default function UserProfile({ user }: Props) {
	const { username, name, image, followers, following, posts } = user;
	const info = [
		{ title: 'posts', data: posts },
		{ title: 'followers', data: followers },
		{ title: 'following', data: following },
	];
	return (
		<section>
			<Profile
				image={image}
				size="lg"
				border
			/>
			<div>
				<h1>{username}</h1>
				<FollowButton user={user} />
				<ul>
					{info.map(({ title, data }, index) => (
						<li key={index}>
							<span>{data}</span>
							{title}
						</li>
					))}
				</ul>
				<p>{name}</p>
			</div>
		</section>
	);
}
