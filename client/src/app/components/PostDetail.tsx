'use client';

import { FullPost, SimplePost } from '@/model/post';
import useSWR from 'swr';
import Image from 'next/image';
import PostUserProfile from './PostUserProfile';
import ActionBar from './ActionBar';
import CommentForm from './CommentForm';
import Profile from './../components/Profile';
import useFullPost from '../hooks/usepost';
import useMe from '../hooks/useMe';

type Props = {
	post: SimplePost;
};

export default function PostDetail({ post }: Props) {
	const { id, username, userImage, image } = post;
	const { user } = useMe();
	const { post: data, isLoading: loading, postComment } = useFullPost(id);
	// 💡 api/posts로 가져와서 data를 find(v => v.id ===id ) ❌
	// api 요청을 /api/posts/${id} 이렇게 해서 가져오기 ! ⭕️
	const comments = data?.comments;
	const handlePostComment = (comment: string) => {
		user &&
			postComment({ username: user.username, image: user.image, comment });
	};

	return (
		<section className="flex w-full h-full">
			<div className="relative basis-3/5">
				<Image
					src={image}
					alt={`photo by ${username}`}
					fill // 높이는 부모 컴포넌트 가득 채우게
					sizes="650px" // 너비
					priority
					className="object-cover"
				/>
			</div>
			<div className="w-full basis-2/5 flex flex-col ">
				<PostUserProfile
					image={userImage}
					username={username}
				/>
				<ul className="border-t border-gray-200 h-full overflow-y-auto p-4 mb-1">
					{comments &&
						comments.map(
							({ comment, username: commentUsername, image }, index) => (
								<li
									key={index}
									className="flex items-center"
								>
									<Profile
										image={image}
										size="sm"
										border={commentUsername === username}
									/>
									<div className="ml-2">
										<span className="font-bold mr-2">{commentUsername}</span>
										<span>{comment}</span>
									</div>
								</li>
							)
						)}
				</ul>
				<ActionBar post={post} />
				<CommentForm onPostComment={handlePostComment} />
			</div>
		</section>
	);
}
