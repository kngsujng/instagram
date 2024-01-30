import { getProviders } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../[...nextauth]/route';
import SocialSignInButton from '@/app/components/SocialSignInButton';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Signin',
	description: 'Signup or Login to Instagram',
};

type Props = {
	searchParams: {
		callbackUrl: string;
	};
};

export default async function SignInPage({
	searchParams: { callbackUrl },
}: Props) {
	const session = await getServerSession(authOptions); // 1. SSR - session

	if (session) {
		return { redirect: { destination: '/' } };
	}

	const providers = (await getProviders()) ?? {};

	return (
		<section className="flex flex-col justify-around items-center mx-auto mt-[10%] px-10 w-1/4 min-w-80 h-80 text-center border-2 border-gray-200 rounded-lg shadow-xl">
			<div>
				<h2 className="font-bold text-2xl">Sign-in</h2>
				<p className="mt-3">지금 바로 인스타그램을 시작하세요!</p>
			</div>
			<SocialSignInButton
				providers={providers}
				callbackUrl={callbackUrl ?? '/'}
			/>
		</section>
	);
}
