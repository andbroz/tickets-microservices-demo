import '../styles/globals.css';
import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';
import { buildClient } from '../api/build-client';
import { Header } from '../components/header';

type CurrentUser = {
  id: string;
  email: string;
  iat: number;
};

type User = {
  currentUser: CurrentUser | null;
};

function MyApp(appProps: AppProps & User) {
  const { Component, pageProps, currentUser } = appProps;
  return (
    <>
      <Header currentUser={currentUser} />
      <Component {...pageProps} />
    </>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const client = buildClient(appContext.ctx);

  try {
    const appInitialProps = await App.getInitialProps(appContext);
    const { data: user } = await client.get<User>('/api/users/currentuser');

    return { ...appInitialProps, ...user };
  } catch (err) {
    if (err instanceof Error) {
      console.error('ERROR:', err.message);
    }
  }

  return {};
};

export default MyApp;
