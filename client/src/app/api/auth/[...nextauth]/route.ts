import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth(
	//NextAuth.js를 사용하여 인증과 관련된 작업을 처리하는 핵심 함수이다.
	{
		providers: [
			GoogleProvider({
				clientId: process.env.GOOGLE_CLIENT_ID || '',
				clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
			}),
		],
	}
);
export { handler as GET, handler as POST };
