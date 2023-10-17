import { Box } from '@chakra-ui/react';
import Dashboard from './RightPanel/Dashboard/Dashboard';
import Todo from './RightPanel/Todo/Todo';
import TimeSheets from './RightPanel/TimeSheets/TimeSheets';

type MainPanelProps = {
  selected: string;
};

const MainPanel: React.FC<MainPanelProps> = ({ selected }) => {
  return (
    <Box
      width={{ lg: '80%' }}
      minHeight='100vh'
      borderTopLeftRadius='2rem'
      backgroundColor='white'
    >
      {selected === 'dashboard' && <Dashboard />}
      {selected === 'todo' && <Todo />}
      {selected === 'timesheets' && <TimeSheets />}
    </Box>
  );
};
export default MainPanel;
