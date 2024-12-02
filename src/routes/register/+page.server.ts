import { db } from "$lib/database";
import { fail, redirect } from "@sveltejs/kit";
import * as argon2 from "argon2";

enum Roles {
  ADMIN = "ADMIN",
  CUSTOMER = "CUSTOMER",
  PRODUCER = "PRODUCER",
}

export const load = async () => {};

const register = async ({ request }: { request: Request }) => {
  const data = await request.formData();
  const email = data.get("email");
  const password = data.get("password");

  if (typeof email != "string" || typeof password != "string" || !email || !password) {
    return fail(400, { invalid: true });
  }

  const user = await db.user.findUnique({ where: { email } });

  if (user) {
    return fail(400, { email: true });
  }

  await db.user.create({
    data: {
      email,
      passwordHash: await argon2.hash(password),
      userAuthToken: crypto.randomUUID(),
      role: { connect: { name: Roles.CUSTOMER } },
    },
  });

  redirect(303, "/login");
};

export const actions = { register };
