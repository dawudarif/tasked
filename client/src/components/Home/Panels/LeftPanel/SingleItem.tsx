import { Flex, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface SingleItemProps {
  name: string;
  icon: JSX.Element;
}

const SingleItem: React.FC<SingleItemProps> = ({ name, icon }) => {
  const router = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const menu = params.get('menu');

  useEffect(() => {
    if (menu === '' || !menu) {
      router(`/?menu=dashboard`);
    }
  }, []);

  return (
    <Flex
      _hover={{ background: 'black', color: 'white' }}
      color={menu === name ? 'white' : 'black'}
      background={menu === name ? 'black' : 'white'}
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
      onClick={() => router(`/?menu=${name}`)}
    >
      {icon}
      <Text textTransform='capitalize'>{name}</Text>
    </Flex>
  );
};
export default SingleItem;
