import clsx from "clsx";
import { Col, Row } from "react-grid-system";
import { BeatLoader } from "react-spinners";

import useBreakpoint from "@hooks/useBreakpoint";

import Header from "@components/Header";
import MobileNavigator from "@components/MobileNavigator";
import SEO from "@components/SEO";
import Text from "@components/Text";

import styles from "./Layout.module.scss";

const Layout: React.FC<LayoutProps> = (props) => {
  const { children, classes, loading, removeHeader } = props;

  return (
    <div className={clsx(styles.root, classes?.root)} data-testid="layout">
      <SEO />
      <Row gutterWidth={0}>
        <Col lg={3} sm={0}>
          {!removeHeader && (
            <div className={styles.showDesktop}>
              <Header />
            </div>
          )}
        </Col>
        <Col lg={9} sm={12}>
          <main className={clsx(styles.main, classes?.main)}>
            {loading ? (
              <div className="min-h-screen min-w-full flex flex-col items-center justify-center gap-4">
                <BeatLoader color="#965609" />
                <Text size="xs" color="primary-color" align="center" className="translate-x-2">
                  Loading...
                </Text>
              </div>
            ) : (
              children
            )}
          </main>
        </Col>
      </Row>

      {!removeHeader && (
        <div className={styles.showMobile}>
          <MobileNavigator />
        </div>
      )}
    </div>
  );
};

type LayoutProps = React.PropsWithChildren<{
  classes?: { root?: string; main?: string; footer?: string };
  loading?: boolean;
  indexing?: boolean;
  metaTitle?: string;
  metaDescription?: string;
  metaImage?: string;
  schemaSEO?: string;
  removeHeader?: boolean;
  isPublic?: boolean;
}>;

export default Layout;
