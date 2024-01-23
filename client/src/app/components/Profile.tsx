import { Profile } from 'next-auth';

type Props = {
	image?: string | null;
	size: 'sm' | 'md';
	border: true | false;
};

export default function Profile({ image, size, border }: Props) {
	return (
		<div className="rounded-full bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300">
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img
				src={image || ''}
				alt="user image"
				width={size === 'sm' ? '30' : '60'}
				height={size === 'sm' ? '30' : '60'}
				className={`rounded-full ${border && 'p-[0.2rem]'}`}
				referrerPolicy="no-referrer"
			/>
		</div>
	);
}
