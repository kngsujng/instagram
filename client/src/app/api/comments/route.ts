import { NextRequest, NextResponse } from 'next/server';
import { addComment } from '@/service/posts';
import { withSessionUser } from '@/utils/session';

// GET POST PUT DELETE
export async function POST(req: NextRequest) {
	return withSessionUser(async (user) => {
		const { id, comment } = await req.json();
		if (!id || comment == null) {
			// null과 undefined 두 경우 모두 검사하고 싶다면
			return new Response('Bad Request', { status: 400 });
		}

		return addComment(id, user.id, comment) //
			.then((res) => NextResponse.json(res))
			.catch((error) => new Response(JSON.stringify(error), { status: 500 }));
	});
}
