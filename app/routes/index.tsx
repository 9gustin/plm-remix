import {
  ActionFunction,
  Form,
  LoaderFunction,
  redirect,
  useActionData,
  useLoaderData,
} from "remix";

import { getSession, KEY } from "../sessions/user";
import { paths } from "~/config/paths";
import { current, me, myTracks, playedHistory } from "~/services/spotify/user";

import Layout, { links as layoutLinks } from "~/components/Layout";
import Playlist from "~/components/Playlist";

export const links = () => [...layoutLinks()];

export const action: ActionFunction = async () => {
  return { data: [] };
};

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

  return {user, tracks, history, actual, data: []};
};

export default function Home() {
  const { user, tracks, history, actual, data } = useLoaderData();
  const actionData = useActionData();

  return (
    <Form>
      <Layout action={{ name: "Remix!" }}>
        <div>
          <h1>Hey! generamos esto para ti</h1>
          <Playlist data={actionData?.data ?? data} />
        </div>
      </Layout>
    </Form>
  );
}
