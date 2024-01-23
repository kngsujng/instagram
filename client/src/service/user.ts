import { client } from './sanity';

type OAuthUser = {
	id: string;
	email: string;
	name: string;
	username: string;
	image?: string | null;
};

export async function addUser({ id, name, username, email, image }: OAuthUser) {
	const auth = await client.createIfNotExists({
		// sanity 데이터베이스 구조
		_id: id,
		_type: 'user',
		name,
		username,
		email,
		image,
		following: [],
		followers: [],
		bookmarks: [],
	});
	return auth;
}
