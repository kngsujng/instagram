'use client';

import { ClientSafeProvider, signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';

type Props = {
	providers: Record<string, ClientSafeProvider>;
	callbackUrl: string;
};

export default function SocialSignInButton({ providers, callbackUrl }: Props) {
	return (
		<>
			{Object.values(providers).map(({ name, id }) => (
				<div key={name}>
					<button
						onClick={() => signIn(id, { callbackUrl })}
						className="flex items-center gap-2 bg-black text-md text-white p-2 px-3 rounded-md"
					>
						<FcGoogle />
						{name}로 로그인
					</button>
				</div>
			))}
		</>
	);
}
