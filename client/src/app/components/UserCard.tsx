import { SearchUser } from '@/model/user';
import Link from 'next/link';
import Profile from './../components/Profile';

type Props = {
	user: SearchUser;
};

export default function UserCard({
	user: { name, username, image, following, followers },
}: Props) {
	return (
		<Link
			href={`/user/${username}`}
			className="w-full flex items-center rouded-sm border border-neutral-300 mb-2 p-4 bg-white hover:bg-neutral-50"
		>
			<Profile
				image={image}
				size="lg"
			/>
			<div className="ml-3 text-neutral-500">
				<p className="text-black font-bold leading-4">{username}</p>
				<p>{name}</p>
				<p className="text-sm leading-4">{`${followers} followers ${following} following`}</p>
			</div>
		</Link>
	);
}

// 1. useRouter + push (dynamic)
// 2. Link - 사용자가 클릭할 가능성이 있기 때문에 미리 페이지를 prefetching
