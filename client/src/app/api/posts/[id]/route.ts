import { NextRequest, NextResponse } from 'next/server';
import { getPost } from '@/service/posts';
import { withSessionUser } from '@/utils/session';

// [Dynamic Route Segments]
// export async function GET(
//   request: Request,
//   { params }: { params: { slug: string } }
// ) {
//   const slug = params.slug // 'a', 'b', or 'c'
// }

type Context = {
	params: { id: string };
};

export async function GET(_: NextRequest, context: Context) {
	return withSessionUser(async () => {
		return getPost(context.params.id) //
			.then((data) => NextResponse.json(data));
	});
}
