import type { NextPage, NextPageContext } from 'next';
import { buildClient } from '../api/build-client';
import { CurrentUser, User } from '../types/user';

interface PageProps {
  currentUser: CurrentUser | null;
}

const Home: NextPage<PageProps> = ({ currentUser }) => {
  return <div>Welcome {currentUser ? `${currentUser.email}` : 'stranger'}</div>;
};

Home.getInitialProps = async (ctx: NextPageContext) => {
  const client = buildClient(ctx);
  try {
    const { data: user } = await client.get<User>('/api/users/currentuser');
    return user;
  } catch (err) {
    if (err instanceof Error) {
      console.error('ERROR:', err.message);
    }
  }

  return { currentUser: null };
};

export default Home;
