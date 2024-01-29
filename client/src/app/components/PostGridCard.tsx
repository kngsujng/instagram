'use client';

import { SimplePost } from '@/model/post';
import Image from 'next/image';
import { useState } from 'react';
import ModalPortal from './ModalPortal';
import PostModal from './PostModal';
import PostDetail from './PostDetail';

type Props = {
	post: SimplePost;
	priority: boolean;
};

export default function PostGridCard({ post, priority = false }: Props) {
	const [onModal, setOnModal] = useState<boolean>(false);
	const { image, username } = post;
	return (
		<div>
			<Image
				src={image}
				alt={`photo by ${username}`}
				fill
				sizes="150px"
				priority={priority}
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
