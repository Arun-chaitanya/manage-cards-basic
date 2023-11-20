import clsx from "clsx";
import Link from "next/link";

import Image from "@components/Image";

import styles from "./Logo.module.scss";
import navLogo from "@icons/NavLogo.svg"

const Logo: React.FC<LogoProps> = ({ variant, disabled, ...props }) => {
  if (!variant) return null;
  return (
    <Link href="/" className={clsx(styles.logo, styles[variant])} data-testid="logo" {...props}>
      <Image src={navLogo} height={35} width={125} />
    </Link>
  );
};

Logo.defaultProps = {
  variant: "header",
};

type LogoProps = React.DetailsHTMLAttributes<HTMLAnchorElement> & {
  variant?: "header" | "footer";
  disabled?: boolean;
};

export default Logo;
