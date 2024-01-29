import { IoIosHeartEmpty } from 'react-icons/io';

type Props = {
	className?: string;
};

export default function HeartIcon({ className }: Props) {
	return <IoIosHeartEmpty className={className || 'w-6 h-6'} />;
}
