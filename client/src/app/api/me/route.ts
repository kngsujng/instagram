// import { sendEmail } from '@/app/api/email';

import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { getUserByUsername } from '@/service/user';
import { NextResponse } from 'next/server';

export async function GET() {
	// 서버는 클라이언트가 보내준 사용자 정보가 담긴 토큰(jwt)을 해석하고 파싱해서 로그인한 사용자의 정보를 알아내야 함
	// 하지만!! next-auth에서 session에다 알아서 담아줌
	const session = await getServerSession(authOptions);
	const user = session?.user;

	if (!user) {
		return new Response('Authentication Error', { status: 401 });
	}

	return getUserByUsername(user.username) //
		.then((data) => NextResponse.json(data));
}
