import useTranslation from "next-translate/useTranslation";
import { Col, Container, Row } from "react-grid-system";

import { } from "@config/urls";

import cardIcon from "@icons/Tabs/Card.svg";
import creditIcon from "@icons/Tabs/CreditGrey.svg";
import homeIcon from "@icons/Tabs/HomeGrey.svg";
import paymentsIcon from "@icons/Tabs/PaymentsGrey.svg";
import settingsIcon from "@icons/Tabs/SettingsGrey.svg";

import styles from "./MobileNavigator.module.scss";
import MobileTab from "./MobileTab";

const MobileNavigator: React.FC = () => {
  const { t } = useTranslation("header");

  const tabs = [
      { href: "/", text: t("nav-home"), logo: homeIcon },
      { href: "/cards", text: t("nav-cards"), logo: cardIcon },
      { href: "/payments", text: t("nav-payments"), logo: paymentsIcon },
      { href: "/credit", text: t("nav-credit"), logo: creditIcon },
      { href: "/settings", text: t("nav-settings"), logo: settingsIcon },
  ];

  return (
    <>
      <div className="p45" />
      <div className={styles.root} data-testid="mobile-navigator">
        <Container>
          <Row>
            {tabs.map((tab) => (
              <Col xs={2.4} key={tab.text} style={{ padding: 0 }}>
                <MobileTab {...tab} />
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default MobileNavigator;
