import { Box, Flex } from '@chakra-ui/react';
import LeftPanel from './Panels/LeftPanel/LeftPanel';
import MainPanel from './Panels/MainPanel';
import { useState } from 'react';

const HomeWrapper = () => {
  const [selected, setSelected] = useState('dashboard');

  const handleSelect = (name: string) => {
    setSelected(name);
  };

  return (
    <Flex justifyContent='center' alignItems='center'>
      <LeftPanel setSelected={handleSelect} selected={selected} />
      <MainPanel selected={selected} />
    </Flex>
  );
};

export default HomeWrapper;
