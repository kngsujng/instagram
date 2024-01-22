import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import './globals.css';

const openSans = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Instagram',
	description: 'Next.js 공부 목적의 인스타그램 클론코딩',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={openSans.className}>{children}</body>
		</html>
	);
}
