import { useLazyQuery, useMutation } from '@apollo/client';
import React, { useState, FormEvent } from 'react';
import { LOGIN_USER } from '../graphql/User/mutations';

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [loginUser, { data, loading, error }] = useMutation(LOGIN_USER, {
    variables: {
      input: {
        email: loginData.email,
        password: loginData.password,
      },
    },
  });

  console.log(data);

  const handleLoginInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
    return;
  };

  const handleLoginForm = (e: FormEvent) => {
    e.preventDefault();
    loginUser();
  };

  return (
    <div>
      <form onSubmit={handleLoginForm}>
        <input
          type='email'
          name='email'
          value={loginData.email}
          onChange={handleLoginInputs}
        />
        <input
          type='password'
          name='password'
          value={loginData.password}
          onChange={handleLoginInputs}
        />
        <button type='submit'>
          <p>Submit</p>
        </button>
      </form>
    </div>
  );
};

export default Login;
