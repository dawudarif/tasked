import Footer from './components/Footer';
import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import { useState } from 'react';
import { IUserProfile } from './util/types';
import { useQuery } from '@apollo/client';
import { GET_USER_PROFILE } from './graphql/User/queries';

function App() {
  const { data, loading, error } = useQuery<IUserProfile>(GET_USER_PROFILE);

  return (
    <>
      <Header name={data?.userProfile.name} />
      <Routes>
        <Route
          index
          path='/'
          element={<Home data={data} loading={loading} error={error} />}
        />
        <Route index path='/register' element={<Register />} />
        <Route index path='/login' element={<Login />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
