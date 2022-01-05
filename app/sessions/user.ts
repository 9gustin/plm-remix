// app/sessions.js
import { createCookieSessionStorage } from "remix";
import { cookieExpirationTime, MAX_AGE } from "./constants";

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "__session",

      expires: cookieExpirationTime(),
      maxAge: MAX_AGE,
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secrets: [process.env.SECRET!],
      secure: true
    }
  });

export { getSession, commitSession, destroySession };

export const KEY = 'accessToken';
