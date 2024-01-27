import CloseIcon from './ui/icons/CloseIcon';

type Props = {
	onClose: () => void;
	children: React.ReactNode;
};

export default function PostModal({ onClose, children }: Props) {
	// 배경

	return (
		<section
			className="fixed top-0 left-0 flex flex-col justify-center items-center w-full h-full bg-neutral-900/70 z-50"
			onClick={(e) => {
				if (e.target === e.currentTarget) {
					onClose();
				}
			}}
		>
			<button
				className="fixed top-0 right-0 p-8 text-white"
				onClick={() => onClose()}
			>
				<CloseIcon />
			</button>
			{children}
		</section>
	);
}
