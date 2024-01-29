import { getLikedPostsOf, getPostsOf, getSavedPostsOf } from '@/service/posts';
import { NextRequest, NextResponse } from 'next/server';

// 💡 Catch-all Segments
// app/shop/[...slug].js	/shop/a	{ slug: ['a'] }
// app/shop/[...slug].js	/shop/a/b	{ slug: ['a', 'b'] }
// app/shop/[...slug].js	/shop/a/b/c	{ slug: ['a', 'b', 'c'] }

type Context = {
	params: { slug: string[] }; // /slug/slug/
};

export async function GET(_: NextRequest, context: Context) {
	const { slug } = context.params;
	if (!slug || !Array.isArray(slug) || slug.length < 2) {
		return new NextResponse('Bad Request', { status: 400 });
	}
	const [username, query] = slug; // 튜플

	let request = getPostsOf;
	if (query === 'saved') {
		request = getSavedPostsOf;
	} else if (query == 'liked') {
		request = getLikedPostsOf;
	}

	return request(username).then((data) => NextResponse.json(data));
}
