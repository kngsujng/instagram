import { addUser } from '@/service/user';
import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
	secret: process.env.AUTH_SECRET, // 💡 설정해줘야 로그인 성공 후 redirect 작동함
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID || '',
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
		}),
	],
	callbacks: {
		async signIn({ user: { id, name, email, image } }) {
			if (!email) {
				return false;
			}
			// 기존 user정보 => sanity 데이터베이스에 추가
			addUser({
				id,
				name: name || '',
				username: email.split('@')[0] || '',
				image,
				email,
			});
			return true;
		},
		async session({ session, token }) {
			const user = session?.user;
			if (user) {
				session.user = {
					...user,
					username: user.email?.split('@')[0] || '',
					id: token.id as string,
				};
			}
			return session;
		},
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
			}
			return token;
		},
	},
	pages: {
		signIn: '/auth/signin',
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
