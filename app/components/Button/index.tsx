import React, { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  size?: "small" | "large";
  handleClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: "default" | "secondary" | "error";
}>;

const Button = ({
  children,
  handleClick,
  variant = "default",
  type = "button",
}: Props) => (
  <button type={type} onClick={handleClick}>
    {children}
  </button>
);

export default Button;
