import { ICredentials } from '~/interfaces/credentials'
import { isWindow } from '~/utils/isWindow'

export const SESSION_KEY = 'session'

export const getCredentials = (): ICredentials | null => {
	if (isWindow && sessionStorage.getItem(SESSION_KEY)) {
		return JSON.parse(sessionStorage.getItem(SESSION_KEY) as string)
	}
	return null
}
export const setCredentials = (credentials: ICredentials) =>
	isWindow && sessionStorage.setItem(SESSION_KEY, JSON.stringify(credentials))
export const removeCredentials = () => sessionStorage.removeItem(SESSION_KEY)

export type useSessionType = ({
	credentials,
}: {
  credentials: ICredentials;
}) => {
	data: ICredentials | null;
  setData: (data: ICredentials) => void;
  isLogged: boolean;
  logout: () => void;
};
