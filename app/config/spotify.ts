import querystring from 'query-string'

const SPOTIFY_LOGIN_SCOPES = 'user-read-private user-read-email user-top-read user-read-recently-played user-read-currently-playing'

const SPOTIFY_LOGIN_CONFIG = {
  response_type: 'code',
  client_id: process.env.SPOTIFY_CLIENT_ID,
  scope: SPOTIFY_LOGIN_SCOPES,
  redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
  show_dialog: true
}

export const SPOTIFY_LOGIN_URL = 'https://accounts.spotify.com/authorize?' + querystring.stringify(SPOTIFY_LOGIN_CONFIG);

export const SPOTIFY_API_BASE = 'https://api.spotify.com/v1'
