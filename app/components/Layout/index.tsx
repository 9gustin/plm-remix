import { PropsWithChildren } from "react";
import { useNavigate } from "remix";
import { APP_DATA } from "~/config/appData";
import Button from "../Button";

import styles from "./styles.css";

export const links = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];

type Props = PropsWithChildren<{
  action?: {
    name: string;
    to?: string;
  };
}>;

function Layout({ action, children }: Props) {
  const navigate = useNavigate();

  const btnProps = action?.to ? {
    handleClick: () => navigate(action.to!),
    type: 'button'
  }: {type: 'submit'}

  return (
    <div className="container">
      <header>
        {APP_DATA.brand}
      </header>
      <main className="content">
        {children}
        {action && <Button {...(btnProps as any)}>{action.name}</Button>}
      </main>
    </div>
  );
}

export default Layout;
