import React from 'react'

import { isWindow } from '../utils/isWindow'

const ACCESS_TOKEN_KEY = 'access_token'

const getAccessToken = () => isWindow && sessionStorage.getItem(ACCESS_TOKEN_KEY)
const setAccessToken = (accessToken: string) => isWindow && sessionStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
const removeAccessToken = () => sessionStorage.removeItem(ACCESS_TOKEN_KEY)

export const useSession = () => {
  const [token, setToken] = React.useState(getAccessToken)

  React.useEffect(() => {
    if (token) {
      setAccessToken(token)
    }
  }, [token])

  return {token, setToken, clearToken: removeAccessToken}
}
