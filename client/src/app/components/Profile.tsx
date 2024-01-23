import { Profile } from 'next-auth';

type Props = {
	image?: string | null;
	size?: 'sm' | 'md';
	border?: boolean;
};

export default function Profile({ image, size = 'md', border = false }: Props) {
	return (
		<div className={getContainerStyle(size, border)}>
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img
				src={image || ''}
				alt="user image"
				className={`rounded-full bg-white ${getImageSizeStyle(size)}`}
				referrerPolicy="no-referrer"
			/>
		</div>
	);
}

const getContainerStyle = (size: string, border: boolean): string => {
	const baseStyle = 'rounded-full flex justify-center items-center';
	const borderStyle = border
		? ' bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300'
		: '';
	const sizeStyle = size === 'sm' ? 'w-9 h-9' : 'w-[68px] h-[68px]';

	return `${baseStyle} ${borderStyle} ${sizeStyle}`;
};

function getImageSizeStyle(size: string): string {
	return size === 'sm'
		? 'w-[34px] h-[34px] p-[0.1rem]'
		: 'w-16 h-16 p-[0.2rem]';
}
