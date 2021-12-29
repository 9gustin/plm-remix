import React from 'react'

import { getCredentials, removeCredentials, setCredentials, useSessionType } from './constants'

export const useSession: useSessionType = ({ credentials }) => {
	const loadData = () => {
		if (credentials && credentials.access_token){
			return credentials
		}
		const sessionData = getCredentials()
		if (sessionData) {
			return sessionData
		}

		return null
	}
	const [data, setData] = React.useState(loadData)

	const isLogged = React.useMemo(() => !!data, [data])
	const logout = () => setData(null)

	React.useEffect(() => {
		if (data) {
			setCredentials(data)
		} else {
			removeCredentials()
		}
	}, [data])

	return { data, setData, isLogged, logout }
}
