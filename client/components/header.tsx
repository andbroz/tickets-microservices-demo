import React from 'react';
import Link from 'next/link';
import { CurrentUser } from '../types/user';

type Props = {
  currentUser: CurrentUser | null;
};

export const Header: React.FC<Props> = ({ currentUser }) => {
  const links = [
    { label: 'Sign Up', href: '/auth/signup', active: !currentUser },
    { label: 'Sign In', href: '/auth/signin', active: !currentUser },
    { label: 'Sign Out', href: '/auth/signout', active: !!currentUser },
  ]
    .filter((linkConfig) => linkConfig.active)
    .map(({ label, href }) => {
      return (
        <li key={href}>
          <Link href={href}>
            <a>{label}</a>
          </Link>
        </li>
      );
    });

  return (
    <nav className='bg-green-900 flex justify-center content-center p-6 '>
      <Link href='/'>
        <a className='text-xl text-red-700'>TikTix</a>
      </Link>

      <ul className='list-none flex flex-row justify-around ml-auto gap-6'>{links}</ul>
    </nav>
  );
};
