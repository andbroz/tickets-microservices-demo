import Router from 'next/router';
import { useEffect } from 'react';

import useRequest from '../../hooks/useRequest';

const SignOut = () => {
  const { doRequest, errors } = useRequest({
    request: {
      url: '/api/users/signout',
      method: 'post',
      body: {},
    },
    onSuccess: () => Router.push('/'),
  });

  useEffect(() => {
    doRequest();
  }, [doRequest]);
  return <div>Signing you out</div>;
};

export default SignOut;
