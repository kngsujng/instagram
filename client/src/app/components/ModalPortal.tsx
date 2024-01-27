import ReactDom from 'react-dom';

type Props = {
	children: React.ReactNode;
};
export default function ModalPortal({ children }: Props) {
	if (typeof window === 'undefined') {
		// ssr에서는 렌더링해주지 않기 위해 (브라우저상에서만 렌더링하기 위해)
		return null;
	}
	const el = document.getElementById('portal') as HTMLElement;
	return ReactDom.createPortal(children, el);
}
