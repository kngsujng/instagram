'use client';

import { ClientSafeProvider, signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';

type Props = {
	providers: Record<string, ClientSafeProvider>;
};

export default function SocialSignInButton({ providers }: Props) {
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get('callbackUrl') as string;
	console.log(callbackUrl);
	return (
		<>
			{Object.values(providers).map((provider) => (
				<div key={provider.name}>
					<button
						onClick={() => signIn(provider.id, { callbackUrl })}
						className="flex items-center gap-2 bg-black text-md text-white p-2 px-3 rounded-md"
					>
						<FcGoogle />
						{provider.name}로 로그인
					</button>
				</div>
			))}
		</>
	);
}
