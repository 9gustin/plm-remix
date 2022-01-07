import { PropsWithChildren } from "react";
import Brand from "../Brand";
import Button from "../Button";

import styles from "./styles.css";

export const links = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];

type Props = PropsWithChildren<{
  action?: string;
}>;

function Layout({ action, children }: Props) {
  return (
    <div className="container">
      <header>
        <Brand />
      </header>
      <main className="content">
        {children}
        {action && <Button type="submit">{action}</Button>}
      </main>
    </div>
  );
}

export default Layout;
