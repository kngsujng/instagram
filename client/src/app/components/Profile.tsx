import { Profile } from 'next-auth';
import Image from 'next/image';

type Props = {
	session: Profile;
	size: 'sm' | 'md';
	border: true | false;
};

export default function Profile({ session, size, border }: Props) {
	return (
		<>
			{session && (
				<Image
					src={(session.user && session.user.image) || ''}
					alt={(session.user && session.user.name) || ''}
					width={size === 'sm' ? '30' : '60'}
					height={size === 'sm' ? '30' : '60'}
					className={`rounded-full ${
						border ? 'border-4 border-red-500' : 'border-b-0'
					}`}
				/>
			)}
		</>
	);
}
