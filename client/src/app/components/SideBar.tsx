import { User } from '@/model/user';
import Profile from './Profile';

type Props = {
	user: User;
};

export default function SideBar({ user: { name, username, image } }: Props) {
	return (
		<article className="flex flex-col gap-10">
			<div className="flex gap-6">
				{image && (
					<Profile
						image={image}
						size="md"
						border
					/>
				)}
				<div className="flex flex-col">
					<p className="font-bold text-lg">{username}</p>
					<p className="text-gray-600 text-lg">{name}</p>
				</div>
			</div>

			<p className="text-gray-500 max-w-xs">
				About | Help | Press | API | Jobs | Privacy | Terms | Location |
				Language
			</p>
			<p className="font-semibold text-gray-500">
				@Copyright Instagram from kngsujng
			</p>
		</article>
	);
}
