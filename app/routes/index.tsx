import {
	Form,
	LoaderFunction,
	redirect
} from 'remix'

import { getSession, KEY } from '../sessions/user'
import { paths } from '~/config/paths'

export const loader: LoaderFunction = async ({ request }) => {
	const session = await getSession(
    request.headers.get("Cookie")
  );

	if (!session.has(KEY)) {
    return redirect(paths.login);
  }

	return null;
}

export default function Home() {
	return (
		<Form method="post">
			<h1>Welcome to PLM</h1>
			Nice! you're in ;)
			<p>Maded by 9gu :P</p>
		</Form>
	)
}
