import {
	ActionFunction,
	Form,
	LoaderFunction,
	redirect,
} from 'remix'

import { SPOTIFY_LOGIN_URL } from '../config/spotify'
import { getToken } from '~/services/spotify/token'
import { getSession, commitSession, KEY } from '../sessions/user'
import { paths } from '~/config/paths'

export const action: ActionFunction = () => redirect(SPOTIFY_LOGIN_URL)

export const loader: LoaderFunction = async ({ request }) => {
	const session = await getSession(
    request.headers.get("Cookie")
  );

	if (session.has(KEY)) {
    return redirect(paths.home);
  }

	const url = new URL(request.url)
	const code = url.searchParams.get('code')

	if (code) {
		const credentials = await getToken(code)

		if (credentials.access_token) {
			session.set(KEY, credentials.access_token);
			return redirect(paths.home, {
				headers: {
					"Set-Cookie": await commitSession(session)
				}
			});
		}
	}

	return null;
}

export default function Login() {
	return (
		<Form method="post">
			<h1>Welcome to PLM</h1>
			<button type="submit">Login with Spotify</button>
			<p>Maded by 9gu :P</p>
		</Form>
	)
}
