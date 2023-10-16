import { useMutation, useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { LOGOUT_USER } from '../graphql/User/mutations';
import { GET_USER_PROFILE } from '../graphql/User/queries';
import Loader from '../components/Loader';
import Login from './Login';
import HomeWrapper from '../components/Home/HomeWrapper';
import { IUserProfile } from '../util/types';

interface IHome {
  updateName: (name: string) => void;
}

const Home: React.FC<IHome> = ({ updateName }) => {
  const { data, loading, error } = useQuery<IUserProfile>(GET_USER_PROFILE);

  useEffect(() => {
    if (data?.userProfile.name) {
      updateName(data?.userProfile.name);
    }
  }, [data]);

  if (error) return <div>An Error occurred</div>;

  return (
    <main className='home'>
      {loading ? (
        <Loader size={100} />
      ) : data?.userProfile.id ? (
        <HomeWrapper />
      ) : (
        <Login />
      )}
    </main>
  );
};

export default Home;
