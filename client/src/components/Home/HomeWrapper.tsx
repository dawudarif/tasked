import { Box, Flex } from '@chakra-ui/react';
import LeftPanel from './Panels/LeftPanel/LeftPanel';
import MainPanel from './Panels/MainPanel';
import { useState } from 'react';

const HomeWrapper = () => {
  return (
    <Flex justifyContent='flex-start'>
      <LeftPanel />
      <MainPanel />
    </Flex>
  );
};

export default HomeWrapper;
