import { GoBookmark } from 'react-icons/go';

type Props = {
	className?: string;
};

export default function BookmarkIcon({ className }: Props) {
	return <GoBookmark className={className || 'w-6 h-6'} />;
}
