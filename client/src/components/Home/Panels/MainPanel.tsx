import { Box } from '@chakra-ui/react';
import Dashboard from './Dashboard';

type MainPanelProps = {
  selected: string;
};

const MainPanel: React.FC<MainPanelProps> = ({ selected }) => {
  return (
    <Box
      width={{ lg: '80%' }}
      minHeight={'100vh'}
      border={'2px'}
      borderColor={'yellow'}
    >
      {selected === 'dashboard' && <Dashboard />}
    </Box>
  );
};
export default MainPanel;
