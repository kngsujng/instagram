'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import HomeIcon from './ui/icons/HomeIcon';
import HomeFillIcon from './ui/icons/HomeFillIcon';
import SearchIcon from './ui/icons/SearchIcon';
import SearchFillIcon from './ui/icons/SearchFillIcon';
import NewIcon from './ui/icons/NewIcon';
import NewFillIcon from './ui/icons/NewFillIcon';
import SignInIcon from './ui/icons/SignInIcon';
import SignInFillIcon from './ui/icons/SignInFillIcon';

const navbars = [
	{ href: '/', icon: <HomeIcon />, clickedIcon: <HomeFillIcon /> },
	{ href: '/search', icon: <SearchIcon />, clickedIcon: <SearchFillIcon /> },
	{
		href: '/new',
		icon: <NewIcon />,
		clickedIcon: <NewFillIcon />,
	},
	{ href: '/signin', icon: <SignInIcon />, clickedIcon: <SignInFillIcon /> },
];

export default function Header() {
	const pathname = usePathname();
	return (
		<header className="flex justify-between my-6 px-6 pb-2 sticky top-0 z-10 border-b">
			<Link href="/">
				<h1 className="text-3xl font-bold">Instagram</h1>
			</Link>
			<nav>
				<ul className="flex items-center gap-2 text-3xl cursor-pointer">
					{navbars.map((navbar) => (
						<li key={navbar.href}>
							<Link href={navbar.href}>
								{pathname === navbar.href ? navbar.clickedIcon : navbar.icon}
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</header>
	);
}
