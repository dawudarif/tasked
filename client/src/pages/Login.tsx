import { useMutation } from '@apollo/client';
import React, { useState, FormEvent } from 'react';
import { LOGIN_USER, LOGOUT_USER } from '../graphql/User/mutations';
import { Box, Input, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const router = useNavigate();

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
    onCompleted: () => {
      router('/');
    },
  });

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
    <Box>
      <form onSubmit={handleLoginForm}>
        <Input
          type='email'
          name='email'
          placeholder='example@exaple.com'
          value={loginData.email}
          onChange={handleLoginInputs}
        />
        <Input
          type='password'
          name='password'
          placeholder='Password'
          value={loginData.password}
          onChange={handleLoginInputs}
        />
        <Button type='submit'>
          <p>Submit</p>
        </Button>
      </form>
    </Box>
  );
};

export default Login;
