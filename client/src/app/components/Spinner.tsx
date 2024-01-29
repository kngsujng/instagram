import { FadeLoader } from 'react-spinners';

export default function Spinner() {
	return (
		<div className="flex justify-center text-center mt-32">
			<FadeLoader color="pink" />
		</div>
	);
}
