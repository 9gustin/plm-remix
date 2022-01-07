import {
	Form,
	LoaderFunction,
	redirect,
	useLoaderData
} from 'remix'

import { getSession, KEY } from '../sessions/user'
import { paths } from '~/config/paths'
import { current, me, myTracks, playedHistory } from '~/services/spotify/user';

import Layout, {links as layoutLinks } from '~/components/Layout'

export const links = () => [
	...layoutLinks()
];


export const loader: LoaderFunction = async ({ request }) => {
	const cookies = request.headers.get("Cookie")
	const session = await getSession(cookies)

	if (!cookies || !session.has(KEY)) {
    return redirect(paths.login);
  }

	const user = await me(cookies);
	const tracks = await myTracks(cookies);
	const actual = await current(cookies);
	const history = await playedHistory(cookies);

	console.log(JSON.stringify(actual));

	return {user, tracks, history, actual};
}

export default function Home() {
	const {user} = useLoaderData()
	return (
		<Layout action="Sorprendeme">
		Nice! you're in {user.display_name} ;)
	</Layout>
	)
}
