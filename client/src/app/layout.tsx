import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import './globals.css';
import Header from './components/Header';
import AuthContext from '@/context/AuthContext';

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
		<html className={openSans.className}>
			<body className="w-full max-w-screen-xl overflow-auto mx-auto">
				<AuthContext>
					<Header />
					<main className="px-8">{children}</main>
				</AuthContext>
			</body>
		</html>
	);
}
