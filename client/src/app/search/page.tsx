import { Metadata } from 'next';
import UserSearch from '../components/UserSearch';

// 💡 ssg -> ssr (다이나믹 렌더링으로 바꿔줌)
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
	title: 'User Search',
	description: 'Search users to follow',
};

export default function SearchPage() {
	return <UserSearch />;
}
