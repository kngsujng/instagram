import { SimplePost } from '@/model/post';
import BookmarkIcon from './ui/icons/BookmarkIcon';
import HeartIcon from './ui/icons/HeartIcon';
import { parseDate } from '@/utils/date';

type Props = {
	likes: string[];
	text: string;
	createdAt: string;
	username: string;
};

export default function ActionBar({ likes, text, createdAt, username }: Props) {
	return (
		<>
			<div className="flex justify-between my-2 px-4">
				<BookmarkIcon />
				<HeartIcon />
			</div>
			<div className="px-4 py-1">
				<p className="text-sm font-bold mb-2">{`${likes.length ?? 0} ${
					likes.length > 1 ? 'likes' : 'like'
				}`}</p>
				<p>
					<span className="font-bold mr-1">{username}</span>
					{text}
				</p>
				<p className="text-xs text-gray-500 uppercase my-2">
					{parseDate(createdAt)}
				</p>
			</div>
		</>
	);
}
