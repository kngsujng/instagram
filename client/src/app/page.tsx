import { getServerSession } from 'next-auth';
import FollowingBar from './components/FollowingBar';
import PostList from './components/PostList';
import SideBar from './components/SideBar';
import { authOptions } from './api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { User } from '@/model/user';

export default async function HomePage() {
	const session = await getServerSession(authOptions); // 1. SSR - session
	const user = session?.user as User;

	if (!user) {
		redirect('api/auth/signin');
	}

	return (
		<section className="w-full mx-auto p-4 flex flex-col justify-between md:flex-row">
			<div className="basis-3/4 mb-10">
				<FollowingBar />
				<PostList />
			</div>
			<div className="basis-1/4">
				<SideBar user={user} />
			</div>
		</section>
	);
}
