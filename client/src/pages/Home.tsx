import { ApolloError } from '@apollo/client';
import { Box, Flex, Stack } from '@chakra-ui/react';
import { IUserProfile } from '../../types/types';
import HomeWrapper from '../components/Home/HomeWrapper';
import Loader from '../components/Loader';
import Login from './Login';

interface IHome {
  data?: IUserProfile;
  loading?: boolean;
  error?: ApolloError;
}

const Home: React.FC<IHome> = ({ data, loading, error }) => {
  if (error)
    return (
      <Stack
        justifyContent='center'
        alignItems='center'
        height='90vh'
        width='100%'
        gap={2}
        color='#5555'
        fontSize='1.2rem'
      >
        <code>{error.message}</code>
        <code>refresh to continue...</code>
      </Stack>
    );

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
