import { Flex } from '@chakra-ui/react';
import LeftPanel from './Panels/LeftPanel/LeftPanel';
import MainPanel from './Panels/MainPanel';

const HomeWrapper = () => {
  return (
    <Flex justifyContent='flex-start'>
      <LeftPanel />
      <MainPanel />
    </Flex>
  );
};

export default HomeWrapper;
