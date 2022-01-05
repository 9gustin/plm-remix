import { SPOTIFY_API_BASE } from '~/config/spotify'
import { getSession, KEY } from '~/sessions/user';

export function requestBuilder(path: string) {
	return async (cookies: string) => {
		const session = await getSession(cookies);
		const token = session.get(KEY)

		if (!token){
			return null
		}

		const response = await fetch(`${SPOTIFY_API_BASE}/${path}`, {
			headers: {
				'Authorization': `Bearer ${token}`
			}
		})
		console.log(response)
		const data = await response.json()
		return data
	}
}
