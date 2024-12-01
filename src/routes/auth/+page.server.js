import { databaseWorker } from '$lib/server/db';
import bcrypt from 'bcryptjs';
import { fail } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
	login: async ({ request }) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');

		if (!email || !password) {
			return fail(400, {
				email,
				missing: true
			});
		}

		try {
			const user = await databaseWorker.getUserRecord(email);

			if (!user || !(await bcrypt.compare(password, user.password))) {
				return fail(401, { email, incorrect: true });
			}

			return { success: true };
		} catch (error) {
			console.error(error);
		}
	},
	signup: async ({ request }) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');

		if (!email || !password) {
			return fail(400, {
				email,
				missing: true
			});
		}

		try {
			await databaseWorker.createUser(email, password);
			return { success: true };
		} catch (error) {
			console.error(error);
		}
	}
};
