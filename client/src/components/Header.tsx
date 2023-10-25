import { useMutation } from '@apollo/client';
import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { LOGOUT_USER } from '../graphql/User/mutations';
import HelpModal from './Modal/HelpModal';
import { useState, useEffect } from 'react';
import { ILogoutUser } from '../../types/types';

interface IHeader {
  name?: string;
  email?: string;
}

const Header: React.FC<IHeader> = ({ name, email }) => {
  const router = useNavigate();
  const toast = useToast();

  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState<string | undefined>('?');
  const [userEmail, setUserEmail] = useState<string | undefined>('');

  const [logoutUser, { data }] = useMutation<ILogoutUser, {}>(LOGOUT_USER);

  const handleLogout = async () => {
    await logoutUser();
    router('/login');
  };

  useEffect(() => {
    if (data?.logoutUser.success) {
      toast({
        title: 'Logout User',
        description: "You've been logged out successfully",
        status: 'success',
        duration: 1000,
        isClosable: true,
        position: 'top-right',
      });

      setUserEmail(undefined);
      setUserName('?');
    }
  }, [data?.logoutUser]);

  useEffect(() => {
    const nameInitials = name?.substring(0, 2).toUpperCase();
    setUserEmail(email);
    setUserName(nameInitials);
  }, [email, name]);

  return (
    <>
      <Flex
        justifyContent='space-between'
        alignItems='center'
        height='4rem'
        paddingX={{ lg: '3rem', base: '1rem' }}
        paddingY='1rem'
        background='white'
      >
        <Flex
          justifyContent='center'
          alignItems='center'
          color='black'
          opacity={0.9}
        >
          <Heading fontSize={{ lg: '1.8rem', base: '1.3rem' }}>TASK</Heading>
          <Heading
            color='brand.100'
            fontSize={{ lg: '1.8rem', base: '1.3rem' }}
          >
            ED.
          </Heading>
        </Flex>
        <Popover>
          <PopoverTrigger>
            <Button
              borderRadius='50%'
              background='blackAlpha.800'
              fontSize='1.2rem'
              fontWeight='bold'
              color='white'
              height={10}
              width={10}
              _hover={{ boxShadow: 'md', transition: 'all .5s' }}
              cursor='pointer'
            >
              {userName === undefined ? '?' : userName}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverBody>
              <Stack>
                <Box>
                  {userName && (
                    <>
                      <Text fontWeight={700} fontSize='1rem' padding='.7rem'>
                        {userEmail}
                      </Text>
                      <Link
                        href='/?menu=dashboard'
                        textDecoration='none'
                        _hover={{ textDecoration: 'none' }}
                      >
                        <Text
                          padding='.5rem'
                          _hover={{ bg: 'brand.300' }}
                          borderRadius={10}
                          fontWeight={600}
                        >
                          Home
                        </Text>
                      </Link>
                    </>
                  )}
                  <Text
                    onClick={() => setIsOpen(true)}
                    padding='.7rem'
                    _hover={{ bg: 'brand.300' }}
                    borderRadius={10}
                    fontWeight={600}
                    cursor='pointer'
                  >
                    Help
                  </Text>

                  {userName ? (
                    <Text
                      onClick={handleLogout}
                      padding='.7rem'
                      _hover={{ bg: 'brand.300' }}
                      borderRadius={10}
                      fontWeight={600}
                      cursor='pointer'
                    >
                      Logout
                    </Text>
                  ) : (
                    <>
                      <Link
                        href='/login'
                        textDecoration='none'
                        _hover={{ textDecoration: 'none' }}
                      >
                        <Text
                          padding='.5rem'
                          _hover={{ bg: 'brand.300' }}
                          borderRadius={10}
                          fontWeight={600}
                        >
                          Login
                        </Text>
                      </Link>
                      <Link
                        href='/register'
                        textDecoration='none'
                        _hover={{ textDecoration: 'none' }}
                      >
                        <Text
                          padding='.5rem'
                          _hover={{ bg: 'brand.300' }}
                          borderRadius={10}
                          fontWeight={600}
                        >
                          Register
                        </Text>
                      </Link>
                    </>
                  )}
                </Box>
              </Stack>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>
      <HelpModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default Header;
