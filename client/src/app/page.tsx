import { getServerSession } from 'next-auth';
import FollowingBar from './components/FollowingBar';
import PostList from './components/PostList';
import SideBar from './components/SideBar';
import { redirect } from 'next/navigation';
import { AuthUser } from '@/model/user';
import { authOptions } from '@/utils/authOptions';

export default async function HomePage() {
	const session = await getServerSession(authOptions); // 1. SSR - session
	const user = session?.user as AuthUser;

	if (!user) {
		redirect('api/auth/signin');
	}
	return (
		<section className="w-full mx-auto map-4 flex flex-col justify-between md:flex-row max-w-[850px]">
			<div className="w-full basis-3/4 mb-10 min-w-0">
				<FollowingBar />
				<PostList />
			</div>
			<div className="basis-1/4 ml-8">
				<SideBar user={user} />
			</div>
		</section>
	);
}
