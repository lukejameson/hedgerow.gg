import { fail, redirect } from "@sveltejs/kit";
import * as argon2 from "argon2";

import { db } from "$lib/database";

export const load = async () => {
  // todo
};

const login = async ({ cookies, request }) => {
  const data = await request.formData();
  const email = data.get("email");
  const password = data.get("password");

  if (typeof email != "string" || typeof password != "string" || !email || !password) {
    return fail(400, { invalid: true });
  }

  const user = await db.user.findUnique({ where: { email } });

  if (!user) {
    return fail(400, { email: true });
  }

  const userPassword = await argon2.verify(password, user.passwordHash);

  if (!userPassword) {
    return fail(400, { credentials: true });
  }

  const authenticatedUser = await db.user.update({
    where: { email: user.email },
    data: { userAuthToken: crypto.randomUUID() },
  });

  cookies.set("session", authenticatedUser.userAuthToken, {
    // send cookie for every page
    path: "/",
    // server side only cookie so you can't use `document.cookie`
    httpOnly: true,
    // only requests from same site can send cookies
    // https://developer.mozilla.org/en-US/docs/Glossary/CSRF
    sameSite: "strict",
    // only sent over HTTPS in production
    secure: process.env.NODE_ENV === "production",
    // set cookie to expire after a month
    maxAge: 60 * 60 * 24 * 30,
  });

  redirect(302, "/");
};

export const actions = { login };
