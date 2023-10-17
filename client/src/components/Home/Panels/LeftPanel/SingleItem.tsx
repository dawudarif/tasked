import { Flex, Text } from '@chakra-ui/react';
import React from 'react';

interface SingleItemProps {
  name: string;
  icon: JSX.Element;
  setSelected: (name: string) => void;
  selected: string;
}

const SingleItem: React.FC<SingleItemProps> = ({
  name,
  icon,
  setSelected,
  selected,
}) => {
  return (
    <Flex
      _hover={{ background: 'black', color: 'white' }}
      color={selected === name ? 'white' : 'black'}
      background={selected === name ? 'black' : 'white'}
      borderRadius='1rem'
      paddingX={6}
      paddingY={8}
      justifyContent='flex-start'
      alignItems='center'
      fontSize='1.1rem'
      fontWeight={500}
      gap={4}
      height='1.5rem'
      cursor='pointer'
      onClick={() => setSelected(name)}
    >
      {icon}
      <Text textTransform='capitalize'>{name}</Text>
    </Flex>
  );
};
export default SingleItem;
