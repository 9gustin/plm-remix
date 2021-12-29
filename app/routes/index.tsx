import React from 'react';
import { ActionFunction, Form, redirect, useSearchParams } from 'remix';
import { useSession } from '../hooks/useSession';

import { SPOTIFY_LOGIN_URL } from '../config/spotify';

export const action:ActionFunction = () => redirect(SPOTIFY_LOGIN_URL);

export default function Home() {
	const [searchParams, setSearchParams] = useSearchParams()
	const {token, setToken} = useSession()

	React.useEffect(() => {
		const accessToken = searchParams.get('code')
		if (accessToken) {
			setToken(accessToken)
			setSearchParams({})
		}
	}, [])

	return (
		<Form method="post">
			<h1>Welcome to PLM</h1>
			{token}
			<button type="submit">
        Login with Spotify
			</button>
			<p>Maded by 9gu :P</p>
		</Form>
	)
}
