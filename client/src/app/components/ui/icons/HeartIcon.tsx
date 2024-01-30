import { IoIosHeartEmpty } from 'react-icons/io';

type Props = {
	className?: string;
	onClick?: () => void;
};

export default function HeartIcon({ className, onClick }: Props) {
	return (
		<IoIosHeartEmpty
			className={className || 'w-6 h-6'}
			onClick={onClick}
		/>
	);
}
