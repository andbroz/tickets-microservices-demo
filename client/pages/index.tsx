import type { InferGetServerSidePropsType, NextPage, NextPageContext } from 'next';
import { GetServerSideProps } from 'next';
import axios from 'axios';

export const baseURL = 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local';

type User = {
  currentUser: {
    id: string;
    email: string;
    iat: number;
  } | null;
};

export const getServerSideProps: GetServerSideProps<User> = async ({ req }) => {
  try {
    const response = await axios.get<User>(`${baseURL}/api/users/currentuser`, {
      headers: {
        host: req.headers.host ?? 'ticketing.dev.local',
        cookie: req.headers.cookie ?? '',
      },
    });
    return { props: response.data };
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    }
  }

  return { props: { currentUser: null } };
};

function Home(data: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(data.currentUser);

  return <h1 className='bg-emerald-800 text-2xl text-white'>Home</h1>;
}

export default Home;
