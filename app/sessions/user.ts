// app/sessions.js
import { createCookieSessionStorage } from "remix";

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "__session",

      // all of these are optional
      expires: new Date(Date.now() + 60),
      httpOnly: true,
      maxAge: 60,
      path: "/",
      sameSite: "lax",
      secrets: ["s3cret1"],
      secure: true
    }
  });

export { getSession, commitSession, destroySession };

export const KEY = 'accessToken';
