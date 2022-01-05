import { requestBuilder } from ".";

export const me = requestBuilder("me");
export const myTracks = requestBuilder("me/top/tracks");
export const current = requestBuilder("me/player/currently-playing");
export const playedHistory = requestBuilder("me/player/recently-played");
