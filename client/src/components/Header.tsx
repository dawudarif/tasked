import { useMutation } from '@apollo/client';
import {
  Box,
  Flex,
  Heading,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { LOGOUT_USER } from '../graphql/User/mutations';

interface IHeader {
  name?: string;
}

const Header: React.FC<IHeader> = ({ name }) => {
  const [logoutUser] = useMutation(LOGOUT_USER);

  const router = useNavigate();
  const nameInitials = name?.substring(0, 2).toUpperCase();

  const handleLogout = () => {
    logoutUser();
    router('/login');
  };

  return (
    <Flex
      justifyContent='space-between'
      alignItems='center'
      height='4rem'
      paddingX='3rem'
      paddingY='1rem'
      background='white'
    >
      <Flex
        justifyContent='center'
        alignItems='center'
        color='black'
        opacity={0.9}
      >
        <Heading fontSize='1.8rem'>TASK</Heading>
        <Heading color='brand.100' fontSize='1.8rem'>
          ED.
        </Heading>
      </Flex>
      <Popover>
        <PopoverTrigger>
          <Text
            borderRadius='50%'
            padding='.7rem'
            background='blackAlpha.800'
            fontSize='1.2rem'
            fontWeight='bold'
            color='white'
            _hover={{ boxShadow: '2px 2px 10px black', transition: 'all .5s' }}
            cursor='pointer'
          >
            {nameInitials}
          </Text>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverBody>
            <Stack>
              <Box>
                <button onClick={handleLogout}>Logout</button>
              </Box>
            </Stack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  );
};

export default Header;
