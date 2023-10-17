import { ApolloError, useMutation, useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { LOGOUT_USER } from '../graphql/User/mutations';
import { GET_USER_PROFILE } from '../graphql/User/queries';
import Loader from '../components/Loader';
import Login from './Login';
import HomeWrapper from '../components/Home/HomeWrapper';
import { IUserProfile } from '../util/types';
import { Box, Flex } from '@chakra-ui/react';

interface IHome {
  data?: IUserProfile;
  loading?: boolean;
  error?: ApolloError;
}

const Home: React.FC<IHome> = ({ data, loading, error }) => {
  if (error) return <div>An Error occurred</div>;

  return (
    <Box background='white'>
      {loading ? (
        <Flex
          justifyContent='center'
          alignItems='center'
          width='100%'
          height='80vh'
        >
          <Loader size={100} />
        </Flex>
      ) : data?.userProfile.id ? (
        <HomeWrapper />
      ) : (
        <Login />
      )}
    </Box>
  );
};

export default Home;
