import { appWithTranslation } from 'next-i18next';
import { AppProps } from 'next/app';
import '../i18n';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default appWithTranslation(MyApp);