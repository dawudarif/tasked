import { useMutation } from '@apollo/client';
import {
  Button,
  Heading,
  Input,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import React, { FormEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LOGIN_USER } from '../graphql/User/mutations';
import { ILoginArgs, ILoginResponse } from '../../types/types';

const Login = () => {
  const toast = useToast();

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [loginUser, { data, loading: loginLoading, error: loginError }] =
    useMutation<ILoginResponse, ILoginArgs>(LOGIN_USER, {
      variables: {
        input: {
          email: loginData.email,
          password: loginData.password,
        },
      },
      onCompleted: () => {
        redirectToRoot();
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

  function redirectToRoot() {
    window.location.href = '/?menu=dashboard';
  }

  useEffect(() => {
    if (loginError?.message) {
      toast({
        title: 'Login Unsuccessful',
        description: loginError?.message,
        status: 'error',
        duration: 1000,
        isClosable: true,
        position: 'top-right',
      });
    }
  }, [loginError]);

  useEffect(() => {
    if (data?.loginUser) {
      toast({
        title: 'Login Successful',
        description: `You've been logged in as @${data?.loginUser.username}`,
        status: 'success',
        duration: 1000,
        isClosable: true,
        position: 'top-right',
      });
    }
    return;
  }, [data?.loginUser]);

  return (
    <Stack
      width='100%'
      minHeight='80vh'
      justifyContent='center'
      alignItems='center'
      gap={8}
    >
      <Stack justifyContent='center' alignItems='center' width='30%' gap={6}>
        <Heading opacity={0.8}>LOGIN</Heading>
        <form onSubmit={handleLoginForm}>
          <Input
            type='email'
            name='email'
            placeholder='example@example.com'
            marginY={2}
            width='100%'
            border='2px solid #5555'
            paddingY={6}
            fontSize='1rem'
            fontWeight={600}
            value={loginData.email}
            onChange={handleLoginInputs}
          />
          <Input
            type='password'
            name='password'
            placeholder='Password'
            marginY={2}
            width='100%'
            border='2px solid #5555'
            paddingY={6}
            fontSize='1rem'
            fontWeight={600}
            value={loginData.password}
            onChange={handleLoginInputs}
          />
          <Button
            type='submit'
            isLoading={loginLoading}
            width='100%'
            paddingY={6}
            marginY={2}
            fontWeight={600}
            fontSize='1.1em'
            background='brand.100'
            transition='all .5s'
          >
            <p>Submit</p>
          </Button>
          <Link to='/register'>
            <Text
              color='blue.700'
              textDecoration='underline'
              fontSize='1.2rem'
              textAlign='center'
            >
              Not a user? Register here.
            </Text>
          </Link>
        </form>
      </Stack>
    </Stack>
  );
};

export default Login;
