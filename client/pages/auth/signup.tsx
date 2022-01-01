import { NextPage } from 'next';
import React, { useState } from 'react';
import axios from 'axios';

const SignUpForm: NextPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users/signup', { email, password });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setErrors(err.response?.data.errors);
      }
    }
    setEmail('');
    setPassword('');
  };

  return (
    <div className='container flex mx-auto w-full flex-auto justify-center items-center mt-10'>
      <form className='w-1/3' onSubmit={onSubmit}>
        <h1 className='font-bold text-2xl'>Sign up</h1>
        <div className='flex flex-col'>
          <label className='font-semibold text-base  mt-2' htmlFor='email'>
            Email address
          </label>
          <input
            className='rounded border-2 p-1 mb-2 hover:border-blue-500'
            type='email'
            name='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter your email'
          />
        </div>
        <div className='flex flex-col'>
          <label className='font-semibold text-base  mt-2' htmlFor='password'>
            Password
          </label>
          <input
            className='rounded border-2 p-1 mb-2 hover:border-blue-500'
            type='password'
            name='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {errors.length > 0 && (
          <div className='my-2 border-2 border-red-300'>
            <h4>Oooops...</h4>
            <ul>
              {errors.map((err) => {
                return (
                  <li className='text-red-600 font-sans text-xs' key={err.message}>
                    {err.message}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        <button
          className='w-fit h-fit p-2 bg-blue-600 text-white rounded text-center align-middle hover:bg-blue-400'
          type='submit'
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
