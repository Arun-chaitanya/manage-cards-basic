import type { AppProps } from "next/app";
import { SnackbarProvider } from "notistack";
import { useRef } from "react";
import "swiper/css";
import "swiper/css/bundle";
import "swiper/css/pagination";

import IconButton from "@components/IconButton";

import Close from "@icons/Close";
import Info from "@icons/Info";
import Warning from "@icons/Warning";

import "@styles/classes.scss";
import "@styles/fonts.scss";
import "@styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  const notistackRef = useRef<SnackbarProvider>(null);
  const onDismiss = (key) => () => notistackRef.current?.closeSnackbar(key);
  return (
    <SnackbarProvider
      ref={notistackRef}
      preventDuplicate
      maxSnack={3}
      classes={{ containerRoot: "notistack" }}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      iconVariant={{
        success: <Info height="2.5rem" width="2.5rem" className="mr10 shrink0" />,
        error: <Warning height="2.5rem" width="2.5rem" className="mr10 shrink0" />,
      }}
      action={(key) => (
        <IconButton onClick={onDismiss(key)}>
          <Close className="close" fontSize="large" />
        </IconButton>
      )}
    >
      <Component {...pageProps} />
    </SnackbarProvider>
  );
}

export default MyApp;
