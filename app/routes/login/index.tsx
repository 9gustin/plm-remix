import {
	ActionFunction,
	Form,
	LoaderFunction,
	redirect,
} from 'remix'

import { SPOTIFY_LOGIN_URL } from '../../config/spotify'
import { getToken } from '~/services/spotify/token'
import { getSession, commitSession, KEY } from '../../sessions/user'
import { paths } from '~/config/paths'

import Layout, {links as layoutLinks } from '~/components/Layout'
import { APP_DATA } from '~/config/appData'

export const links = () => [
	...layoutLinks()
];

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
		console.log(credentials)

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
			<Layout action={{name: 'Ingresar con Spotify'}}>
				<div>
					<p>
						{APP_DATA.description}
					</p>
					<a href="/privacy">{APP_DATA.privacyTitle}</a>
				</div>
			</Layout>
		</Form>
	)
}
