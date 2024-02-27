'use client';

import { AuthUser } from '@/model/user';
import PostUserProfile from './PostUserProfile';
import FilesIcon from './ui/FilesIcon';
import Button from './Button';
import {
	ChangeEventHandler,
	DragEventHandler,
	FormEvent,
	useRef,
	useState,
} from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Spinner from './Spinner';

type Props = {
	user: AuthUser;
};

export default function NewPost({ user: { username, image } }: Props) {
	const [dragging, setDragging] = useState(false);
	const [file, setFile] = useState<File>();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string>('');
	const textRef = useRef<HTMLTextAreaElement>(null);
	const router = useRouter();

	const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		// drag & drop으로 file 생성하지 않고, 파일 선택해서 했을 경우
		e.preventDefault(); // 페이지내에서 해당 파일 열지 않도록 해줌
		const files = e.target?.files;
		if (files && files[0]) {
			setFile(files[0]);
		}
	};
	const handleDrag: DragEventHandler<HTMLLabelElement> = (e) => {
		if (e.type === 'dragenter') {
			setDragging(true);
		} else if (e.type === 'dragleave') {
			setDragging(false);
		}
	};
	const handleDragOver: DragEventHandler<HTMLLabelElement> = (e) => {
		e.preventDefault();
	};
	const handleDrop: DragEventHandler<HTMLLabelElement> = (e) => {
		e.preventDefault(); // 페이지내에서 해당 파일 열지 않도록 해줌
		setDragging(false);
		const files = e.dataTransfer?.files;
		if (files && files[0]) {
			setFile(files[0]);
		}
	};
	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (!file) return;

		setLoading(true);
		const formData = new FormData();
		formData.append('file', file);
		formData.append('text', textRef.current?.value ?? '');
		fetch('/api/posts', { method: 'POST', body: formData }) //
			.then((res) => {
				if (!res.ok) {
					setError(`${res.status} ${res.statusText}`);
					return;
				}
				router.push('/');
			}) //
			.catch((err) => setError(err.toString())) //
			.finally(() => setLoading(false));
	};
	return (
		<section className="w-full bg-yellow-200 max-w-xl flex flex-col items-center mt-6">
			{loading && (
				<div className="absolute inset-0 z-20 text-center pt-[30%] bg-sky-500/20">
					<Spinner />
				</div>
			)}
			{error && (
				<p className="w-full bg-red-100 text-red-600 text-center p-4 mb-4 font-bold">
					{error}
				</p>
			)}
			<PostUserProfile
				username={username}
				image={image ?? ''}
			/>
			<form
				className="w-full bg-blue-200 flex flex-col mt-2"
				onSubmit={handleSubmit}
			>
				<input
					className="hidden"
					type="file"
					name="input"
					id="input-upload"
					accept="image/*"
					onChange={handleChange}
				/>
				<label
					className={`w-full h-60 flex flex-col items-center justify-center ${
						!file && `border-2 border-sky-500 border-dashed`
					}`}
					htmlFor="input-upload"
					onDragEnter={handleDrag}
					onDragLeave={handleDrag}
					onDragOver={handleDragOver}
					onDrop={handleDrop}
				>
					{dragging && (
						<div className="absolute inset-0 z-10 bg-sky-500/20 pointer-events-none" />
					)}
					{!file && (
						<div className="flex flex-col items-center pointer-event-none">
							<FilesIcon />
							<p>Drag and Drop your image here or click</p>
						</div>
					)}
					{file && (
						<div className="relative w-full aspect-square">
							<Image
								className="object-cover"
								src={URL.createObjectURL(file)}
								alt="local file"
								fill
								sizes="650px"
							/>
						</div>
					)}
				</label>
				<textarea
					className="outline-none text-lg border border-neutral-300"
					name="text"
					required
					id="input-text"
					placeholder={'Write a cation...'}
					rows={10}
					ref={textRef} // 💡 value를 state로 하는 경우 사용자가 text를 입력할 때마다 내부 상태가 변경되어서 리렌더링 -> 이미지 깜빡임 현상이 발생됨 (시험삼아 해보기!!)
				/>
				<Button
					text="Post"
					onClick={() => {}}
					red={false}
				/>
			</form>
		</section>
	);
}
