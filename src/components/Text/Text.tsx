import clsx from "clsx";

import styles from "./Text.module.scss";

const Text: React.FC<TextProps> = (props) => {
  const { variant, className, children, font, color, weight, size, align, noWrap, ...rest } = props;

  const Content = variant as keyof JSX.IntrinsicElements;

  return (
    <Content
      {...rest}
      className={clsx(
        font && styles[font],
        color && styles[color],
        weight && styles[weight],
        size && styles[size],
        align && styles[align],
        noWrap && styles.noWrap,
        className
      )}
      data-testid="text"
    >
      {children}
    </Content>
  );
};

Text.defaultProps = {
  variant: "p",
  font: "primary",
  weight: "medium",
  size: "md",
  noWrap: false,
};

export type TextProps = React.HTMLAttributes<any> & {
  font?: "primary";
  color?:
    | "light"
    | "grey"
    | "grey1"
    | "grey2"
    | "dark"
    | "danger"
    | "success"
    | "primary-color"
    | "primary1"
    | "black"
    | "info";
  weight?: "normal" | "medium" | "semi-bold" | "bold" | "heavy";
  size?: "xxs" | "xs" | "sm" | "md" | "lg" | "xl";
  align?: "left" | "center" | "right" | "justify";
  variant?: keyof JSX.IntrinsicElements;
  noWrap?: boolean;
};

export default Text;
