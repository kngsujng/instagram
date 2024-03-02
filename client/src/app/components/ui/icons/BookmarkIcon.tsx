import { MdBookmarkBorder } from '@react-icons/all-files/md/MdBookmarkBorder';

type Props = {
	className?: string;
	onClick?: () => void;
};

export default function BookmarkIcon({ className, onClick }: Props) {
	return (
		<MdBookmarkBorder
			className={className || 'w-6 h-6'}
			onClick={onClick}
		/>
	);
}
