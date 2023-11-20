import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";

import Image from "@components/Image";
import Text from "@components/Text";

import styles from "./MobileNavigator.module.scss";

const MobileTab: React.FC<MobileTabProps> = ({ exact, href, logo, text }) => {
  const router = useRouter();

  const isActive = router.asPath === href;

  return (
    <Link href={href} className={styles.tab} data-testid="mobile-tab">
      <Image src={logo} height={24} width={24} />
      <Text
        className={clsx("mt5", !isActive && styles.navText)}
        align="center"
        size="sm"
        color={isActive ? "success" : "grey"}
      >
        {text}
      </Text>
    </Link>
  );
};

type MobileTabProps = {
  exact?: boolean;
  href: string;
  logo: string;
  text: string;
};

export default MobileTab;
