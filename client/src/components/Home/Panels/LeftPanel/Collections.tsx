import { useQuery } from '@apollo/client';
import { Box, Flex, Stack, Text } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { collectionIcons } from '../../../../data/icons';
import { GET_ALL_COLLECTIONS } from '../../../../graphql/Collection/queries';
import { ICollection } from '../../../../util/types';

const Collections: React.FC = () => {
  const { data } = useQuery<ICollection>(GET_ALL_COLLECTIONS);

  const router = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const list = params.get('list');

  const getIcon = (id: number) => {
    const getId = collectionIcons.find((icon) => icon.id === id);
    return getId?.icon;
  };

  return (
    <Stack>
      {data?.getAllCollections.map((item) => (
        <Flex
          key={item.id}
          justifyContent='flex-start'
          alignItems='center'
          gap={2}
          background={list === item.id ? '#333333' : 'white'}
          paddingY={2}
          paddingX={4}
          cursor='pointer'
          onClick={() => router(`/?list=${item.id}&name=${item.name}`)}
        >
          <Box
            background={item.color}
            color='white'
            padding={2}
            rounded='md'
            height={10}
            width={10}
          >
            {getIcon(item.icon)}
          </Box>
          <Text
            fontSize='1rem'
            fontWeight={600}
            color={list === item.id ? 'white' : '#333333'}
          >
            {item.name}
          </Text>
        </Flex>
      ))}
    </Stack>
  );
};
export default Collections;
