import Google from '@auth/core/providers/google';
import { databaseWorker } from './db';

/** @type {import('@auth/core').AuthConfig} */
export const authConfig = {
	providers: [
		Google({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET
		})
	],
	callbacks: {
		async signIn({ user, account }) {
			if (!user.email) return false;

			try {
				await databaseWorker.insertUserRecord(
					user.email,
					user.name,
					account.provider,
					account.providerAccountId
				);
				return true;
			} catch (error) {
				console.error('Sign in error:', error);
				return false;
			}
		},
		async session({ session }) {
			if (session.user) {
				const dbUser = await databaseWorker.getUserRecord(session.user.email);
				session.user.id = dbUser.id;
			}
			return session;
		}
	},
	pages: {
		signIn: '/auth/signin',
		error: '/auth/error'
	}
};
