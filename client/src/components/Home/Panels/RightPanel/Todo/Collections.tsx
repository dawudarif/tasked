import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { ICollection } from '../../../../../util/types';
import { useState } from 'react';
import CreateTaskModal from '../../../../Modal/CreateTaskModal';
import { MdOutlineCollectionsBookmark } from 'react-icons/md';

interface CollectionsProps {
  data: ICollection;
  selected: string;
  setSelected: (name: string) => void;
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
              borderColor={selected === item.id ? 'brand.100' : 'transparent'} // Added borderColor
              cursor='pointer'
              onClick={() => setSelected(item.id)}
            >
              <Text fontSize='1.2rem' fontWeight={600}>
                {item.name}
              </Text>
              <MdOutlineCollectionsBookmark size={size} color='#fabb18' />
            </Flex>
          ))}
        </Flex>
      </Box>
    </>
  );
};
export default Collections;
