import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import { GET_USER_PROFILE } from './graphql/User/queries';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { IUserProfile } from '../types/types';
import { useQuery } from '@apollo/client';
import NotFound from './pages/404';

function App() {
  const { data, loading, error } = useQuery<IUserProfile>(GET_USER_PROFILE);

  return (
    <>
      <Header name={data?.userProfile.name} email={data?.userProfile.email} />
      <Routes>
        <Route
          index
          path='/'
          element={<Home data={data} loading={loading} error={error} />}
        />
        <Route index path='/register' element={<Register />} />
        <Route index path='/login' element={<Login />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
