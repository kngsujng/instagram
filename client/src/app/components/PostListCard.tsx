'use client';

import { useState } from 'react';
import Image from 'next/image';
import { SimplePost, Comment } from '@/model/post';
import ActionBar from './ActionBar';
import ModalPortal from './ModalPortal';
import PostModal from './PostModal';
import PostDetail from './PostDetail';
import PostUserProfile from './PostUserProfile';
import usePosts from '../hooks/usePosts';

type Props = {
	post: SimplePost;
	priority?: boolean;
};

function getParametersForUnsplash({
	width,
	height,
	quality,
	format,
}: {
	width: number;
	height: number;
	quality: string;
	format: string;
}) {
	return `?w=${width}&h=${height}&q=${quality}&fm=${format}&fit=crop`;
}

export default function PostListCard({ post, priority }: Props) {
	const { username, userImage, image, comments, text } = post;

	const [onModal, setOnModal] = useState<boolean>(false);
	const { postComment } = usePosts();
	const handlePostComment = (comment: Comment) => {
		postComment(post, comment);
	};
	return (
		<article className="rounded-lg shadow-md border-gray-200">
			<PostUserProfile
				image={userImage}
				username={username}
			/>
			<Image
				className="w-full object-covera aspect-square"
				src={image}
				alt={`photo by ${username}`}
				width={500}
				height={500}
				priority={priority}
				onClick={() => setOnModal(true)}
			/>
			<ActionBar
				post={post}
				onComment={handlePostComment}
			>
				<p>
					<span className="font-bold mr-1">{username}</span>
					{text}
				</p>
				{comments > 1 && (
					<button
						className="font-bold my-2 text-sky-500"
						onClick={() => setOnModal(true)}
					>{`View all ${comments} comments`}</button>
				)}
			</ActionBar>
			{onModal && (
				<ModalPortal>
					<PostModal onClose={() => setOnModal(false)}>
						<PostDetail post={post} />
					</PostModal>
				</ModalPortal>
			)}
		</article>
	);
}
