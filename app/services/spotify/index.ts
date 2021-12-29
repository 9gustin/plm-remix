import { SPOTIFY_API_BASE } from '~/config/spotify'
import { getCredentials } from '~/hooks/useSession/constants'

export function requestBuilder(path: string) {
	return async (token?: string) => {
		const credentials = getCredentials()
		const tk = token || credentials?.access_token
		if (!tk){
			return null
		}

		const response = await fetch(`${SPOTIFY_API_BASE}/${path}`, {
			headers: {
				'Authorization': `Bearer ${tk}`
			}
		})
		const data = await response.json()
		return data
	}
}
