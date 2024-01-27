import SmileIcon from './ui/icons/SmileIcon';

export default function CommentForm() {
	return (
		<form className="flex items-center px-3 border-t border-neutral-300 ">
			<SmileIcon />
			<input
				className="w-full mx-2 border-none outline-none p-2 bg-transparent"
				type="text"
				placeholder="Add a comment..."
			/>
			<button className="font-bold text-sky-500">Post</button>
		</form>
	);
}
