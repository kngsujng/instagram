import { Profile } from 'next-auth';

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

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
				className={`rounded-full object-cover bg-white ${
					getImageSizeStyle(size).image
				}`}
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
	const { container } = getImageSizeStyle(size);

	return `${baseStyle} ${borderStyle} ${container}`;
};

type ImageSizeStyle = {
	container: string;
	image: string;
};

function getImageSizeStyle(size: AvatarSize): ImageSizeStyle {
	switch (size) {
		case 'sm':
			return { container: 'w-9 h-9', image: 'w-[34px] h-[34px] p-[0.1rem]' };
		case 'md':
			return { container: 'w-11 h-11', image: 'w-[42px] h-[42px] p-[0.1rem]' };
		case 'lg':
			return { container: 'w-[68px] h-[68px]', image: 'w-16 h-16 p-[0.2rem]' };
		case 'xl':
			return {
				container: 'w-[142px] h-[142px]',
				image: 'w-[138px] h-[138px] p-[0.3rem]',
			};
		default:
			throw new Error(`사이즈 크기가 적절하지 않습니다 : ${size}`);
	}
}
