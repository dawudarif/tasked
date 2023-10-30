import { useMutation } from '@apollo/client';
import {
  Button,
  Heading,
  Input,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import React, { FormEvent, useState, useEffect } from 'react';
import { REGISTER_USER } from '../graphql/User/mutations';
import { Link } from 'react-router-dom';
import { IRegisterUser, IRegisterUserArgs } from '../../types/types';

const Register = () => {
  const toast = useToast();

  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    name: '',
    username: '',
  });

  const [registerUser, { data, loading: registerLoading, error }] = useMutation<
    IRegisterUser,
    IRegisterUserArgs
  >(REGISTER_USER, {
    variables: {
      input: {
        email: registerData.email,
        password: registerData.password,
        name: registerData.name,
        username: registerData.username,
      },
    },
    onCompleted: () => {
      redirectToRoot();
    },
  });

  console.log(data, error);

  const handleLoginInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
    return;
  };

  const handleRegisterForm = (e: FormEvent) => {
    e.preventDefault();
    registerUser();
  };

  function redirectToRoot() {
    window.location.href = '/?menu=dashboard';
  }

  useEffect(() => {
    if (error?.message) {
      toast({
        title: 'Register Unsuccessful',
        description: error?.message,
        status: 'error',
        duration: 1000,
        isClosable: true,
        position: 'top-right',
      });
    }
  }, [error]);

  useEffect(() => {
    if (data?.registerUser) {
      toast({
        title: 'Register Successful',
        description: `You've been registered as @${data?.registerUser.email}`,
        status: 'success',
        duration: 1000,
        isClosable: true,
        position: 'top-right',
      });
    }
    return;
  }, [data?.registerUser]);

  return (
    <Stack
      width='100%'
      minHeight='80vh'
      justifyContent='center'
      alignItems='center'
      gap={8}
    >
      <Stack
        justifyContent='center'
        alignItems='center'
        width={{ lg: '30%', base: '90%' }}
        gap={6}
      >
        <Heading color='brand.100'>Register</Heading>
        <form onSubmit={handleRegisterForm}>
          <Input
            type='name'
            name='name'
            placeholder='Name'
            marginY={2}
            width='100%'
            border='2px solid #5555'
            color='#333333a7'
            _placeholder={{ color: '#5555' }}
            paddingY={6}
            fontSize='1.1em'
            value={registerData.name}
            onChange={handleLoginInputs}
          />
          <Input
            type='username'
            name='username'
            placeholder='@username'
            marginY={2}
            width='100%'
            border='2px solid #5555'
            color='#333333a7'
            _placeholder={{ color: '#5555' }}
            paddingY={6}
            fontSize='1.1em'
            value={registerData.username}
            onChange={handleLoginInputs}
          />
          <Input
            type='email'
            name='email'
            placeholder='example@example.com'
            marginY={2}
            width='100%'
            border='2px solid #5555'
            color='#333333a7'
            _placeholder={{ color: '#5555' }}
            paddingY={6}
            fontSize='1.1em'
            value={registerData.email}
            onChange={handleLoginInputs}
          />
          <Input
            type='password'
            name='password'
            placeholder='password'
            marginY={2}
            width='100%'
            border='2px solid #5555'
            color='#333333a7'
            _placeholder={{ color: '#5555' }}
            paddingY={6}
            fontSize='1.1em'
            value={registerData.password}
            onChange={handleLoginInputs}
          />
          <Button
            type='submit'
            isLoading={registerLoading}
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
          <Link to='/login'>
            <Text
              color='blue.700'
              textDecoration='underline'
              fontSize='1rem'
              textAlign='center'
            >
              Login here
            </Text>
          </Link>
        </form>
      </Stack>
    </Stack>
  );
};

export default Register;
