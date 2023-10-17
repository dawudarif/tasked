import { Stack } from '@chakra-ui/react';
import React from 'react';
import { LuLayoutDashboard, LuListTodo, LuTimer } from 'react-icons/lu';
import { IPanelItem } from '../../../../util/types';
import SingleItem from './SingleItem';

interface LeftPanelProps {
  setSelected: (name: string) => void;
  selected: string;
}

const LeftPanel: React.FC<LeftPanelProps> = ({ setSelected, selected }) => {
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
      icon: <LuListTodo size={size} />,
    },
    {
      id: 3,
      name: 'timesheets',
      icon: <LuTimer size={size} />,
    },
  ];

  return (
    <Stack
      width={{ lg: '20%' }}
      minHeight={'100vh'}
      marginLeft='2rem'
      paddingY={8}
      gap={1}
      background='white'
    >
      {panelItems.map((item) => (
        <SingleItem
          key={item.id}
          name={item.name}
          icon={item.icon}
          setSelected={setSelected}
          selected={selected}
        />
      ))}
    </Stack>
  );
};

export default LeftPanel;
