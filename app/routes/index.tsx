import {
	Form,
	LoaderFunction,
	redirect,
	useLoaderData
} from 'remix'

import { getSession, KEY } from '../sessions/user'
import { paths } from '~/config/paths'
import { me } from '~/services/spotify/user';

export const loader: LoaderFunction = async ({ request }) => {
	const cookies = request.headers.get("Cookie")
	const session = await getSession(cookies)

	if (!cookies || !session.has(KEY)) {
    return redirect(paths.login);
  }

	const user = await me(cookies);
	return {user};
}

export default function Home() {
	const {user} = useLoaderData()
	return (
		<Form method="post">
			<h1>Welcome to PLM</h1>
			Nice! you're in {user.display_name} ;)
			<p>Maded by 9gu :P</p>
		</Form>
	)
}
