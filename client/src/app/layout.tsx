import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import './globals.css';
import Header from './components/Header';
import AuthContext from '@/context/AuthContext';
import SwrConfigContext from '@/context/SwrConfigContext';

const openSans = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: {
		default: 'Instagram',
		template: 'Instagram | %s',
	},
	description: 'Instagram Photos',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html className={openSans.className}>
			<body
				className="w-full bg-neutral-50 overflow-auto"
				suppressHydrationWarning={true}
			>
				<AuthContext>
					<Header />
					<main className="p-8 w-full flex justify-center min-h-full max-w-screen-xl mx-auto">
						<SwrConfigContext>{children}</SwrConfigContext>
					</main>
				</AuthContext>
				<div id="portal" />
			</body>
		</html>
	);
}
