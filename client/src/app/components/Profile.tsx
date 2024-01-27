import { Profile } from 'next-auth';

type AvatarSize = 'sm' | 'md' | 'lg';

type Props = {
	image?: string | null;
	size?: AvatarSize;
	border?: boolean;
};

export default function Profile({ image, size = 'lg', border = false }: Props) {
	return (
		<div className={getContainerStyle(size, border)}>
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img
				src={image || ''}
				alt="user image"
				className={`rounded-full object-cover bg-white ${getImageSizeStyle(
					size
				)}`}
				referrerPolicy="no-referrer"
			/>
		</div>
	);
}

const getContainerStyle = (size: AvatarSize, border: boolean): string => {
	const baseStyle = 'rounded-full flex justify-center items-center';
	const borderStyle = border
		? ' bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300'
		: '';
	const sizeStyle = getContainerSize(size);

	return `${baseStyle} ${borderStyle} ${sizeStyle}`;
};

function getContainerSize(size: AvatarSize): string {
	switch (size) {
		case 'sm':
			return 'w-9 h-9';
		case 'md':
			return 'w-11 h-11';
		case 'lg':
			return 'w-[68px] h-[68px]';
	}
}

function getImageSizeStyle(size: AvatarSize): string {
	switch (size) {
		case 'sm':
			return 'w-[34px] h-[34px] p-[0.1rem]';
		case 'md':
			return 'w-[42px] h-[42px] p-[0.1rem]';
		case 'lg':
			return 'w-16 h-16 p-[0.2rem]';
	}
}
