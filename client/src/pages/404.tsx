import { Flex, Heading } from '@chakra-ui/react';

const NotFound = () => {
  return (
    <Flex
      justifyContent='center'
      alignItems='center'
      width='100%'
      height='100vh'
    >
      <Heading fontWeight={900} fontSize='3rem'>
        404 | NotFound
      </Heading>
    </Flex>
  );
};

export default NotFound;
