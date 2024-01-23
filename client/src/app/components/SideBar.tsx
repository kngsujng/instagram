'use client';

import { useSession } from 'next-auth/react';
import Profile from './Profile';

export default function SideBar() {
	const { data: session } = useSession();

	return (
		<article className="flex flex-col gap-10">
			{session && (
				<div className="flex gap-6">
					<Profile
						session={session}
						size="md"
						border
					/>
					<div className="flex flex-col">
						<h2 className="font-bold text-lg">
							{session.user && session.user.email}
						</h2>
						<p className="text-gray-600 text-lg">
							{session.user && session.user.name}
						</p>
					</div>
				</div>
			)}
			<div className="text-gray-500 max-w-xs">
				About | Help | Press | API | Jobs | Privacy | Terms | Location |
				Language
			</div>
			<p className="font-semibold text-gray-500">
				@Copyright Instagram from kngsujng
			</p>
		</article>
	);
}
