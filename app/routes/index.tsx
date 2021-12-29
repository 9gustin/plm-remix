import React from 'react'
import {
	ActionFunction,
	Form,
	LoaderFunction,
	redirect,
	useLoaderData,
	useSearchParams,
} from 'remix'

import { SPOTIFY_LOGIN_URL } from '../config/spotify'
import { getToken } from '~/services/spotify/token'
import { useSession } from '~/hooks/useSession'
import { me } from '~/services/spotify/user'

export const action: ActionFunction = () => redirect(SPOTIFY_LOGIN_URL)

export const loader: LoaderFunction = async ({ request }) => {
	const url = new URL(request.url)
	const code = url.searchParams.get('code')

	let credentials: any = {}
	if (code) {
		// TODO: Add types
		credentials = await getToken(code)

		if (credentials.access_token) {
			const data = await me(credentials.access_token)
			credentials.user = data
		}
	}

	// TODO: Review what is important to keep in the session
	return { credentials }
}

export default function Home() {
	const [searchParams, setSearchParams] = useSearchParams()
	const { credentials } = useLoaderData()
	const { data, isLogged, logout } = useSession({ credentials })

	const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		logout()
	}

	React.useEffect(() => {
		if (isLogged && searchParams.get('code')) {
			setSearchParams({})
		}
	}, [])

	return (
		<Form method="post">
			<h1>Welcome to PLM</h1>
			{
				data?.user ? data.user.display_name : 'no data :('
			}
			{isLogged ? (
				<button type="button" onClick={handleLogout}>
          logout
				</button>
			) : (
				<button type="submit">Login with Spotify</button>
			)}
			<p>Maded by 9gu :P</p>
		</Form>
	)
}
