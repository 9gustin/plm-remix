import {
	Form,
	LoaderFunction,
	redirect,
  useLocation,
} from 'remix'

import { getToken } from '~/services/spotify/token'
import { paths } from '~/config/paths'


export const loader: LoaderFunction = async ({ request }) => {
	const url = new URL(request.url)
	console.log(url.hash);

	return null;
}

export default function Login() {
  const loc = useLocation()
  console.log(`http://localhost:3000?${loc.hash.slice(1)}`);
	return (
    <p>aaaa</p>
	)
}
