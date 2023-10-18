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
  const size = 30;

  return (
    <>
      <Box>
        <Heading paddingX={8} fontSize='1.5rem' marginY={4}>
          All Collections
        </Heading>
        <Flex
          justifyContent='flex-start'
          alignItems='center'
          gap={2}
          flexWrap='wrap'
          paddingTop={4}
          marginX={6}
        >
          {data.getAllCollections.map((item) => (
            <Flex
              key={item.id}
              justifyContent='center'
              alignItems='center'
              gap={4}
              background='white'
              borderRadius='1.5rem'
              paddingX={4}
              paddingY={6}
              borderWidth='3px'
              borderColor={selected === item.id ? item.color : 'transparent'}
              cursor='pointer'
              shadow='md'
              onClick={() => setSelected(item.id, item.name)}
            >
              <Text fontSize='1.2rem' fontWeight={600}>
                {item.name}
              </Text>
              <Box color={item.color} height={8} width={8}>
                {collectionIcons[item.icon].icon}
              </Box>
            </Flex>
          ))}
        </Flex>
      </Box>
    </>
  );
};
export default Collections;
