import { useMutation } from '@apollo/client';
import React, { FormEvent, useState } from 'react';
import { LOGIN_USER, REGISTER_USER } from '../graphql/User/mutations';

const Register = () => {
  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    name: '',
    username: '',
  });

  const [registerUser, { data, loading, error }] = useMutation(REGISTER_USER, {
    variables: {
      input: {
        email: registerData.email,
        password: registerData.password,
        name: registerData.name,
        username: registerData.username,
      },
    },
  });

  console.log(data);

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

  return (
    <div>
      <form onSubmit={handleRegisterForm}>
        <input
          type='name'
          name='name'
          value={registerData.name}
          onChange={handleLoginInputs}
        />
        <input
          type='username'
          name='username'
          value={registerData.username}
          onChange={handleLoginInputs}
        />
        <input
          type='email'
          name='email'
          value={registerData.email}
          onChange={handleLoginInputs}
        />
        <input
          type='password'
          name='password'
          value={registerData.password}
          onChange={handleLoginInputs}
        />
        <button type='submit'>
          <p>Submit</p>
        </button>
      </form>
    </div>
  );
};

export default Register;
