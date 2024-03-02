import { IoIosHeartEmpty } from '@react-icons/all-files/io/IoIosHeartEmpty';

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
