import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { ICollection } from '../../../../../util/types';
import { useState } from 'react';
import CreateTaskModal from '../../../../Modal/CreateTaskModal';
import { MdOutlineCollectionsBookmark } from 'react-icons/md';
import { collectionIcons } from '../../../../../data/icons';

interface CollectionsProps {
  data: ICollection;
  selected: string;
  setSelected: (collectionId: string, collectionName: string) => void;
}

const Collections: React.FC<CollectionsProps> = ({
  data,
  selected,
  setSelected,
}) => {
  const getIcon = (id: number) => {
    const getId = collectionIcons.find((icon) => icon.id === id);
    return getId?.icon;
  };

  return (
    <>
      <Box>
        <Heading paddingX={8} fontSize='1.5rem' marginY={4}>
          All Collections
        </Heading>
        <Flex
          justifyContent='flex-start'
          alignItems='center'
          gap={3}
          flexWrap='wrap'
          paddingTop={4}
          marginX={6}
          marginY={4}
        >
          {data.getAllCollections.map((item) => (
            <Flex
              key={item.id}
              justifyContent='center'
              alignItems='center'
              gap={4}
              background='white'
              rounded='1rem'
              paddingY={2}
              paddingX={4}
              borderWidth='3px'
              borderColor={selected === item.id ? 'brand.100' : 'transparent'}
              cursor='pointer'
              shadow='md'
              onClick={() => setSelected(item.id, item.name)}
            >
              <Text fontSize='1.2rem' fontWeight={600}>
                {item.name}
              </Text>
              <Box
                background={item.color}
                color='white'
                padding={2}
                rounded='lg'
                height={10}
                width={12}
              >
                {getIcon(item.icon)}
              </Box>
            </Flex>
          ))}
        </Flex>
      </Box>
    </>
  );
};
export default Collections;
