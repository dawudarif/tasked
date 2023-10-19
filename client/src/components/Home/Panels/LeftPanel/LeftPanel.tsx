import { Box, Button, Flex, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { LuLayoutDashboard, LuListTodo, LuTimer } from 'react-icons/lu';
import { IPanelItem } from '../../../../util/types';
import SingleItem from './SingleItem';
import { AiOutlinePlus } from 'react-icons/ai';
import CreateCollectionModal from '../../../Modal/CreateCollectionModal';
import { useState } from 'react';
import Collections from './Collections';

const LeftPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const size = 20;

  const panelItems: Array<IPanelItem> = [
    {
      id: 1,
      name: 'dashboard',
      icon: <LuLayoutDashboard size={size} />,
    },
    {
      id: 3,
      name: 'timesheets',
      icon: <LuTimer size={size} />,
    },
  ];

  return (
    <Box
      width={{ lg: '20%' }}
      minHeight='100vh'
      height='auto'
      background='white'
    >
      <Stack paddingY={8} marginX={2} width='96%'>
        {panelItems.map((item) => (
          <SingleItem key={item.id} name={item.name} icon={item.icon} />
        ))}
      </Stack>
      <Box>
        <Flex
          justifyContent='space-between'
          alignItems='center'
          paddingX={4}
          paddingY={2}
          background='#f9f9f9'
        >
          <Flex gap={3} justifyContent='center' alignItems='center'>
            <Box background='black' color='white' rounded='md' padding={2}>
              <LuListTodo size={25} />
            </Box>
            <Text color='black' fontSize='1.1rem' fontWeight={600}>
              Collections
            </Text>
          </Flex>
          <Box
            background='brand.100'
            borderRadius='50%'
            padding={2}
            onClick={() => setIsOpen(true)}
          >
            <AiOutlinePlus size={20} />
          </Box>
        </Flex>
        <Collections />
      </Box>
      <CreateCollectionModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </Box>
  );
};

export default LeftPanel;
