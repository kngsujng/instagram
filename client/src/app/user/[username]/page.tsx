import UserPost from '@/app/components/UserPost';
import UserProfile from '@/app/components/UserProfile';
import { getUserForProfile } from '@/service/user';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';

type Props = {
	params: { username: string };
};

const getUser = cache(async (username: string) => getUserForProfile(username));

export async function generateMetadata({
	params: { username },
}: Props): Promise<Metadata> {
	const user = await getUser(username);

	return {
		title: `${user?.name} (@${user?.username})`,
		description: `${user?.name}'s all Instagram posts`,
	};
}

export default async function UserPage({ params: { username } }: Props) {
	// 💡 Dynamic Route : 페이지에서 바로 사용자 정보 불러오기
	// 상단: 사용자의 프로필 이미지와 정보(username, name, 숫자)
	// 하단: 3개의 탭(posts, liked, saved)
	const user = await getUser(username);
	if (!user) {
		notFound();
	}
	return (
		<section className="w-full flex flex-col">
			<UserProfile user={user} />
			<UserPost user={user} />
		</section>
	);
}
