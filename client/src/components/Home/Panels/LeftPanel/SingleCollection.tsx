import { Box, Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { collectionIcons } from '../../../../data/icons';
import { ICollectionItem } from '../../../../util/types';
import EditCollectionModal from '../../../Modal/EditCollectionModal';

interface ISingleCollection {
  collection: ICollectionItem;
}

const SingleCollection: React.FC<ISingleCollection> = ({ collection }) => {
  const [isOpen, setIsOpen] = useState(false);

  const router = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const list = params.get('list');

  const getIcon = (id: number) => {
    const getId = collectionIcons.find((icon) => icon.id === id);
    return getId?.icon;
  };

  return (
    <Flex
      justifyContent='flex-start'
      alignItems='center'
      gap={2}
      background={list === collection.id ? '#333333' : 'white'}
      paddingY={2}
      paddingX={4}
      cursor='pointer'
      key={collection.id}
      onClick={() => router(`/?list=${collection.id}&name=${collection.name}`)}
      onDoubleClick={() => setIsOpen(true)}
    >
      <Box
        background={collection.color}
        color='white'
        padding={2}
        rounded='md'
        height={10}
        width={10}
      >
        {getIcon(collection.icon)}
      </Box>
      <Text
        fontSize='1rem'
        fontWeight={600}
        color={list === collection.id ? 'white' : '#333333'}
      >
        {collection.name}
      </Text>
      <EditCollectionModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        collection={collection}
      />
    </Flex>
  );
};
export default SingleCollection;
