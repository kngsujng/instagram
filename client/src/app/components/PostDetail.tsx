'use client';

import { FullPost, SimplePost } from '@/model/post';
import useSWR from 'swr';

type Props = {
	post: SimplePost;
};

export default function PostDetail({ post }: Props) {
	const { id, createdAt, username, userImage, image, likes, text } = post;
	const {
		data,
		isLoading: loading,
		error,
	} = useSWR<FullPost>(`/api/posts/${id}`);
	// 💡 api/posts로 가져와서 data를 find(v => v.id ===id ) ❌
	// api 요청을 /api/posts/${id} 이렇게 해서 가져오기 ! ⭕️
	const comments = data?.comments;
	console.log(comments);

	return <div>PostDetail</div>;
}
