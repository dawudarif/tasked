import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { ICollection } from '../../../../../util/types';
import { useState } from 'react';
import CreateTaskModal from '../../../../Modal/CreateTaskModal';
import { MdOutlineCollectionsBookmark } from 'react-icons/md';

interface CollectionsProps {
  data: ICollection;
}

const Collections: React.FC<CollectionsProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('');

  const size = 30;

  return (
    <>
      <Box>
        <Heading paddingX={8} fontSize='1.5rem'>
          All Collections
        </Heading>
        <Flex
          justifyContent='flex-start'
          alignItems='center'
          gap={4}
          flexWrap='wrap'
        >
          {data.getAllCollections.map((item) => (
            <Flex
              justifyContent='center'
              alignItems='center'
              gap={4}
              background='white'
              borderRadius='1.5rem'
              marginX={6}
              marginY={4}
              paddingX={6}
              paddingY={8}
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

      {/* 
                <button onClick={() => setIsOpen(true)}>create task</button> */}
      {/* <CreateTaskModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        collectionId={item.id}
      /> */}
    </>
  );
};
export default Collections;
