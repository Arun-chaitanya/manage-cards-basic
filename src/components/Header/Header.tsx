import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { Container, Row, Col } from "react-grid-system";

import "@config/urls";
import useBreakpoint from "@hooks/useBreakpoint";

import Image from "@components/Image";
import Logo from "@components/Logo";
import NavItem from "@components/NavItem";
import NavList from "@components/NavList";
import Text from "@components/Text";

import cardIcon from "@icons/Tabs/Card.svg";
import creditIcon from "@icons/Tabs/Credit.svg";
import homeIcon from "@icons/Tabs/Home.svg";
import paymentsIcon from "@icons/Tabs/Payments.svg";
import settingsIcon from "@icons/Tabs/Settings.svg";

import styles from "./Header.module.scss";

const Header: React.FC = () => {
  const { t } = useTranslation("header");

  const isTab = useBreakpoint({ max: "md" });

  const router = useRouter();

  const tabs = [
    { href: "/", text: t("nav-home"), logo: homeIcon },
    { href: "/cards", text: t("nav-cards"), logo: cardIcon },
    { href: "/payments", text: t("nav-payments"), logo: paymentsIcon },
    { href: "/credit", text: t("nav-credit"), logo: creditIcon },
    { href: "/settings", text: t("nav-settings"), logo: settingsIcon },
  ];

  const renderLinks = () => (
    <>
      {tabs.map((item) => {
        return (
          <NavItem
            key={item.href}
            className={isTab ? "" : "pl10 pr10 fs16"}
            href={item.href}
            exact
            position="left"
            variant="header"
          >
            <div className="flex align-center gap20">
              <Image src={item.logo} height={24} width={24} />
              <Text size="xl" color={router.asPath === item.href ? "success" : "light"}>
                {item.text}
              </Text>
            </div>
          </NavItem>
        );
      })}
    </>
  );

  return (
    <header className={styles.root} data-testid="header">
      <Logo />
      <Text color="grey1" size="lg" className="mb100 mt25">
        Trusted way of banking for 3,000+ SMEs and startups in Singapore
      </Text>
      <NavList className="column gap75 align-start" justify="start">
        {renderLinks()}
      </NavList>
    </header>
  );
};

export default Header;
