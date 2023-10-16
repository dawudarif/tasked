import { useLazyQuery, useMutation } from '@apollo/client';
import logo from '../assets/logo.png';
import {
  Flex,
  Image,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Button,
  Stack,
  Box,
} from '@chakra-ui/react';
import { LOGOUT_USER } from '../graphql/User/mutations';
import { GET_USER_PROFILE } from '../graphql/User/queries';
import { IUserProfile } from '../util/types';
import { useNavigate } from 'react-router-dom';

interface IHeader {
  name?: string;
  updateName: (name: string) => void;
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
      justifyContent={'space-between'}
      alignItems={'center'}
      height={'4rem'}
      paddingX={'3rem'}
      paddingY={'1rem'}
      background='white'
    >
      <Image src={logo} alt='logo' height={'3rem'} />
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
