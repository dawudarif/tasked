import { Box } from '@chakra-ui/react';

type LeftPanelProps = {};

const LeftPanel: React.FC<LeftPanelProps> = () => {
  return (
    <Box
      width={{ lg: '25%' }}
      minHeight={'100vh'}
      border={'2px'}
      borderColor={'red'}
    >
      LeftPanel
    </Box>
  );
};
export default LeftPanel;
