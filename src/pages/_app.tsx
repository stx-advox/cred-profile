import "@cred-profile/styles/globals.css";
import type { AppProps } from "next/app";
import "@picocss/pico";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
