import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../register/$types";

export const load = (async () => {
  redirect(302, "/");
}) satisfies PageServerLoad;

export const actions = {
  default({ cookies }) {
    cookies.set("session", "", {
      path: "/",
      expires: new Date(0),
    });

    redirect(302, "/login");
  },
};
