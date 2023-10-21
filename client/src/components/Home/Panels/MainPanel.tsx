import { Box, Text } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import Dashboard from './RightPanel/Dashboard/Dashboard';
import Tasks from './RightPanel/Tasks/Tasks';
import Todo from './RightPanel/Todo/Todo';

const MainPanel: React.FC = () => {
  const location = useLocation();
  const router = useNavigate();
  const params = new URLSearchParams(location.search);
  const menu = params.get('menu');
  const list = params.get('list');
  const name = params.get('name');

  return (
    <Box
      width={{ lg: '80%' }}
      minHeight='100vh'
      borderTopLeftRadius='2rem'
      background='brand.300'
      paddingTop={4}
      position='relative'
    >
      <Text
        position='absolute'
        top='1rem'
        right='1rem'
        fontSize='1.1rem'
        cursor='pointer'
        colorScheme='blackAlpha'
        fontWeight={600}
        display={{ md: 'block', sm: 'block', lg: 'none' }}
        onClick={() => router('/')}
      >
        Go back
      </Text>
      {menu === 'dashboard' && <Dashboard />}
      {menu === 'todo' && <Todo />}
      {list && <Tasks collectionId={list} collectionName={name} />}
    </Box>
  );
};
export default MainPanel;
