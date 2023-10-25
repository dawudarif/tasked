import { Box, Flex, Stack, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { LuLayoutDashboard, LuTimer } from 'react-icons/lu';
import { MdCollectionsBookmark } from 'react-icons/md';
import { RiTodoLine } from 'react-icons/ri';
import { IPanelItem } from '../../../../util/types';
import CreateCollectionModal from '../../../Modal/CreateCollectionModal';
import Collections from './Collections';
import SingleItem from './SingleItem';
import { useLocation } from 'react-router-dom';

const LeftPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const menu = params.get('menu');
  const list = params.get('list');
  const displayPanel = list || menu;

  const size = 20;

  const panelItems: Array<IPanelItem> = [
    {
      id: 1,
      name: 'dashboard',
      icon: <LuLayoutDashboard size={size} />,
    },
    {
      id: 2,
      name: 'todo',
      icon: <RiTodoLine size={size} />,
    },
    {
      id: 3,
      name: 'timesheets',
      icon: <LuTimer size={size} />,
    },
  ];

  return (
    <Box
      width={{ lg: '20%', md: '30%', base: '100%' }}
      minHeight='100vh'
      height='auto'
      background='white'
      display={{ base: displayPanel ? 'none' : 'flex', md: 'flex' }}
      flexDirection='column'
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
              <MdCollectionsBookmark size={25} />
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
