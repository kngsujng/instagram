import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { addUser } from '@/service/user';

export const authOptions: NextAuthOptions = {
	secret: process.env.NEXTAUTH_SECRET,
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
