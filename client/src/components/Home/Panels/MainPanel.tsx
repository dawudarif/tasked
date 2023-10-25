import { Box, Button, Text } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import Dashboard from './RightPanel/Dashboard/Dashboard';
import Tasks from './RightPanel/Tasks/Tasks';
import Todo from './RightPanel/Todo/Todo';
import Timesheets from './RightPanel/Timesheets/Timesheets';
import { IoChevronBack } from 'react-icons/io5';

const MainPanel: React.FC = () => {
  const location = useLocation();
  const router = useNavigate();
  const params = new URLSearchParams(location.search);
  const menu = params.get('menu');
  const list = params.get('list');
  const name = params.get('name');
  const displayMain = list || menu;

  return (
    <Box
      width={{ lg: '80%', md: '70%', base: '100%' }}
      minHeight='100vh'
      borderTopLeftRadius='2rem'
      background='brand.300'
      paddingTop={4}
      position='relative'
      display={{ base: displayMain ? 'flex' : 'none', md: 'flex' }}
      flexDirection='column'
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
        bg='white'
        px={4}
        py={2}
        borderRadius={10}
        _hover={{ shadow: 'md' }}
      >
        <IoChevronBack size={20} />
      </Text>
      {menu === 'dashboard' && <Dashboard />}
      {menu === 'todo' && <Todo />}
      {menu === 'timesheets' && <Timesheets />}
      {list && <Tasks collectionId={list} collectionName={name} />}
    </Box>
  );
};
export default MainPanel;
