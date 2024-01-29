'use client';

import { useState } from 'react';
import Image from 'next/image';
import { SimplePost } from '@/model/post';
import Profile from './Profile';
import CommentForm from './CommentForm';
import ActionBar from './ActionBar';
import ModalPortal from './ModalPortal';
import PostModal from './PostModal';
import PostDetail from './PostDetail';
import PostUserProfile from './PostUserProfile';

type Props = {
	post: SimplePost;
	priority?: boolean;
};

export default function PostListCard({ post, priority }: Props) {
	const { createdAt, username, userImage, image, likes, text } = post;
	const [onModal, setOnModal] = useState<boolean>(false);

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
				createdAt={createdAt}
				likes={likes}
				text={text}
				username={username}
			/>
			<CommentForm />
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
