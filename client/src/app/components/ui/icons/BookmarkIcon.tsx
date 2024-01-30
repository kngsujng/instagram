import { GoBookmark } from 'react-icons/go';

type Props = {
	className?: string;
	onClick?: () => void;
};

export default function BookmarkIcon({ className, onClick }: Props) {
	return (
		<GoBookmark
			className={className || 'w-6 h-6'}
			onClick={onClick}
		/>
	);
}
