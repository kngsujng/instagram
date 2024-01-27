'use client';

import { useState } from 'react';
import Image from 'next/image';
import { SimplePost } from '@/model/post';
import Profile from './../components/Profile';
import CommentForm from './CommentForm';
import ActionBar from './ActionBar';
import ModalPortal from './../components/ModalPortal';
import PostModal from './../components/PostModal';
import PostDetail from './PostDetail';

type Props = {
	post: SimplePost;
	priority?: boolean;
};

export default function PostCard({ post, priority }: Props) {
	const { createdAt, username, userImage, image, likes, text } = post;
	const [onModal, setOnModal] = useState<boolean>(false);

	return (
		<article className="rounded-lg shadow-md border-gray-200">
			<div className="flex items-center p-2">
				<Profile
					image={userImage}
					size="md"
					border
				/>
				<span className="text-gray-900 font-bold ml-2">{username}</span>
			</div>
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<Image
				className="w-full object-covera aspect-square"
				src={image}
				alt={`photo by ${username}`}
				width={300}
				height={300}
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
