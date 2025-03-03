import 'styles/globals.css'
import type { AppProps } from 'next/app'
import { StoreProvider } from 'store/index';
import Layout from 'components/layout'

export default function App({ Component, pageProps }: AppProps) {
  const renderLayout = () => {
    if ((Component as any).layout === null) {
      return <Component {...pageProps} />;
    } else {
      return (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      );
    }
  };

  return (
    <StoreProvider initialValue={{}}>
      {renderLayout()}
    </StoreProvider>
    
  )
}
