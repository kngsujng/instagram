'use client';

import { SimplePost } from '@/model/post';
import Image from 'next/image';
import { useState } from 'react';
import ModalPortal from './ModalPortal';
import PostModal from './PostModal';
import PostDetail from './PostDetail';
import { signIn, useSession } from 'next-auth/react';

type Props = {
	post: SimplePost;
	priority: boolean;
};

export default function PostGridCard({ post, priority = false }: Props) {
	const [onModal, setOnModal] = useState<boolean>(false);
	const { image, username } = post;
	const { data: session } = useSession();
	const handleOpenPost = () => {
		if (!session?.user) {
			return signIn();
		}
		setOnModal(true);
	};
	return (
		<div className="relative w-full aspect-square">
			<Image
				className="object-cover"
				src={image}
				alt={`photo by ${username}`}
				fill
				sizes="150px"
				priority={priority}
				onClick={handleOpenPost}
			/>
			{onModal && (
				<ModalPortal>
					<PostModal onClose={() => setOnModal(false)}>
						<PostDetail post={post} />
					</PostModal>
				</ModalPortal>
			)}
		</div>
	);
}
