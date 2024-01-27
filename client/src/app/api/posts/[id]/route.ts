import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { getPost } from '@/service/posts';
import { authOptions } from '../../auth/[...nextauth]/route';

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

export async function GET(req: NextRequest, context: Context) {
	const session = await getServerSession(authOptions);
	const user = session?.user;

	if (!user) {
		return new Response('Authentication Error', { status: 401 });
	}

	return getPost(context.params.id) //
		.then((data) => NextResponse.json(data));
}
