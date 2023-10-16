import { Box } from '@chakra-ui/react';

type MainPanelProps = {};

const MainPanel: React.FC<MainPanelProps> = () => {
  return (
    <Box
      width={{ lg: '75%' }}
      minHeight={'100vh'}
      border={'2px'}
      borderColor={'yellow'}
    >
      MainPanel
    </Box>
  );
};
export default MainPanel;
