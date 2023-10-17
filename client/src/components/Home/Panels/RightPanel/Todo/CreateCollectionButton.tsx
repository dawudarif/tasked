import { Box, Flex, Heading } from '@chakra-ui/react';
import React, { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import CreateCollectionModal from '../../../../Modal/CreateCollectionModal';

type CreateCollectionButtonProps = {};

const CreateCollectionButton: React.FC<CreateCollectionButtonProps> = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Flex
        justifyContent='center'
        alignItems='center'
        gap={4}
        background='white'
        borderRadius='1.5rem'
        width='max-content'
        marginX={6}
        paddingX={6}
        paddingY={8}
      >
        <Heading fontSize='1.5rem'>Create a new Collection</Heading>
        <Box
          background='brand.100'
          borderRadius='50%'
          padding={2}
          onClick={() => setIsOpen(true)}
        >
          <AiOutlinePlus size={35} />
        </Box>
      </Flex>
      <CreateCollectionModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
export default CreateCollectionButton;
