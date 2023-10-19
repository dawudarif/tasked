import { Box } from '@chakra-ui/react';
import Dashboard from './RightPanel/Dashboard/Dashboard';
import TimeSheets from './RightPanel/TimeSheets/TimeSheets';
import { useLocation } from 'react-router-dom';
import Tasks from './RightPanel/Tasks/Tasks';

const MainPanel: React.FC = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const menu = params.get('menu');
  const list = params.get('list');
  console.log(list);

  return (
    <Box
      width={{ lg: '80%' }}
      minHeight='100vh'
      borderTopLeftRadius='2rem'
      backgroundColor='white'
      paddingTop={4}
    >
      {menu === 'dashboard' && <Dashboard />}
      {menu === 'timesheets' && <TimeSheets />}
      {list !== '' && <Tasks collectionId={list} />}
    </Box>
  );
};
export default MainPanel;
