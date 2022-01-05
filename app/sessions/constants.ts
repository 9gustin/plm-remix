const CANT_HOURS = 1;
export const MAX_AGE = CANT_HOURS * 60 * 60 * 1000;

export const cookieExpirationTime = () =>
  new Date(Date.now() + MAX_AGE);
