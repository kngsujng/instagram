import { AuthUser } from '@/model/user';
import { getServerSession } from 'next-auth';
import { authOptions } from './authOptions';

export async function withSessionUser(
	handler: (user: AuthUser) => Promise<Response>
): Promise<Response> {
	const session = await getServerSession(authOptions);
	const user = session?.user;
	// 사용자 유무 체크

	if (!user) {
		// 사용자 없으면 error Response return
		return new Response('Authentication Error', { status: 401 });
	}

	return handler(user); // 사용자가 있는 경우에만 handler 호출
}
