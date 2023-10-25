import { Flex, Heading, Text } from '@chakra-ui/react';
import React from 'react';

const Footer = () => {
  return (
    <Flex
      justifyContent='center'
      alignItems='center'
      padding={{ lg: '8', base: '4' }}
      background='black'
    >
      <Heading fontSize={{ lg: '1.3rem', base: '1rem' }} color='white'>
        &copy; {new Date().getFullYear()} Tasked. - Developed by Dawood A.
      </Heading>
    </Flex>
  );
};

export default Footer;
