import { NextRequest, NextResponse } from 'next/server';
import { dislikePost, likePost } from '@/service/posts';
import { withSessionUser } from '@/utils/session';

// GET POST PUT DELETE
export async function PUT(req: NextRequest) {
	return withSessionUser(async (user) => {
		// body 부분 읽기
		const { id, like } = await req.json();
		if (!id || like == null) {
			return new Response('Bad Request', { status: 400 });
		}

		const request = like ? likePost : dislikePost;

		return request(id, user.id) //
			.then((res) => NextResponse.json(res))
			.catch((error) => new Response(JSON.stringify(error), { status: 500 }));
	});
}
