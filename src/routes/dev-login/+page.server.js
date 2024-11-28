import { DEV_PASSWORD, DEV_USERNAME, ENVIRONMENT } from '$env/static/private';
import { redirect } from '@sveltejs/kit';

export const actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const username = data.get('username');
    const password = data.get('password');

    if (username === DEV_USERNAME && password === DEV_PASSWORD) {
      cookies.set('dev_session', 'authenticated', {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24
      });

      throw redirect(303, '/');
    }

    return {
      success: false,
      error: 'Invalid credentials'
    };
  }
};
