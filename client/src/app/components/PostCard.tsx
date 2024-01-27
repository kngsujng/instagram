import Image from 'next/image';
import { SimplePost } from '@/model/post';
import Profile from './../components/Profile';
import BookmarkIcon from './../components/ui/icons/BookmarIcon';
import HeartIcon from './ui/icons/HeartIcon';
import { parseDate } from '@/util/date';
import SmileIcon from './ui/icons/SmileIcon';

type Props = {
	post: SimplePost;
};

export default function PostCard({ post }: Props) {
	const { id, createdAt, username, userImage, image, likes, text, comments } =
		post;

	return (
		<>
			<div className="flex items-center">
				<Profile
					image={image}
					size="sm"
					border
				/>
				<span>{username}</span>
			</div>
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<Image
				src={image}
				alt={`photo by ${username}`}
				width={500}
				height={500}
			/>
			<div>
				<BookmarkIcon />
				<HeartIcon />
			</div>
			<div>
				<p>{`${likes.length ?? 0} ${likes.length > 1 ? 'likes' : 'like'}`}</p>
				<p>
					<span>{username}</span>
					{text}
				</p>
				<p>{parseDate(createdAt)}</p>
				<form>
					<SmileIcon />
					<input
						type="text"
						placeholder="Add a comment..."
					/>
					<button>Post</button>
				</form>
			</div>
		</>
	);
}
