import axios from 'axios';
import { NextPageContext } from 'next';

const baseURL = 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local';

export const buildClient = (ctx: NextPageContext) => {
  const { req } = ctx;

  if (typeof window === 'undefined') {
    // server side client
    return axios.create({
      baseURL: baseURL,
      headers: (req?.headers as any) ?? {},
    });
  }

  return axios.create({
    baseURL: '/',
  });
};
