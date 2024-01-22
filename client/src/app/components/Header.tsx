'use client';

import { usePathname } from 'next/navigation';
import { GoHomeFill, GoHome } from 'react-icons/go';
import { IoIosSearch } from 'react-icons/io';
import { IoSearch } from 'react-icons/io5';
import { AiOutlinePlusSquare } from 'react-icons/ai';
import { FaRegSquarePlus } from 'react-icons/fa6';
import { PiSignIn } from 'react-icons/pi';
import { PiSignInBold } from 'react-icons/pi';
import Link from 'next/link';

export default function Header() {
	const pathname = usePathname();
	return (
		<header className="flex justify-between mx-12 my-6 sticky">
			<h1 className="text-3xl font-bold">Instagram</h1>
			<nav>
				<ul className="flex items-center gap-2 text-3xl cursor-pointer">
					<li>
						<Link href="/">
							{pathname === '/' ? <GoHomeFill /> : <GoHome />}
						</Link>
					</li>
					<li>
						<Link href="/search">
							{pathname === '/search' ? <IoSearch /> : <IoIosSearch />}
						</Link>
					</li>
					<li>
						<Link href="/new">
							{pathname === '/new' ? (
								<FaRegSquarePlus />
							) : (
								<AiOutlinePlusSquare />
							)}
						</Link>
					</li>
					<li>
						<Link href="/signin">
							{pathname === '/signin' ? <PiSignInBold /> : <PiSignIn />}
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
}
