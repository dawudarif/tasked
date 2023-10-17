import { Flex, Heading, Text } from '@chakra-ui/react';
import React from 'react';

const Footer = () => {
  return (
    <Flex
      justifyContent='center'
      alignItems='center'
      padding={8}
      background='black'
    >
      <Heading fontSize='1.3rem' color='white'>
        &copy; {new Date().getFullYear()} Tasked. - Developed by Dawood A.
      </Heading>
    </Flex>
  );
};

export default Footer;
