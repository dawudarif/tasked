import { useMutation } from '@apollo/client';
import {
  Box,
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { colors } from '../../data/colors';
import { collectionIcons } from '../../data/icons';
import { CREATE_COLLECTION } from '../../graphql/Collection/mutations';
import { GET_ALL_COLLECTIONS } from '../../graphql/Collection/queries';
import { ICreateCollection, ICreateCollectionArgs } from '../../util/types';

interface CreateCollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateCollectionModal: React.FC<CreateCollectionModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [text, setText] = useState('');
  const [color, setColor] = useState('#ffd40c');
  const [icon, setIcon] = useState(1);

  const [createCollection] = useMutation<
    ICreateCollection,
    ICreateCollectionArgs
  >(CREATE_COLLECTION, {
    variables: {
      input: {
        name: text,
        color,
        icon,
      },
    },
    optimisticResponse: {
      __typename: 'Mutation',
      createCollection: {
        __typename: 'Collection',
        id: `temp-id-${Math.random().toString(36).substr(2, 9)}`,
        name: text,
        color,
        icon,
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      },
    } as any,
    update: (cache, mutationResult) => {
      const createCollection = mutationResult.data?.createCollection;
      if (createCollection) {
        const { getAllCollections } = cache.readQuery<any>({
          query: GET_ALL_COLLECTIONS,
        });
        cache.writeQuery({
          query: GET_ALL_COLLECTIONS,
          data: {
            getAllCollections: [...getAllCollections, createCollection],
          },
        });
      }
    },
  });

  const handleCreateCollection = () => {
    if (text === '') return;
    createCollection();
    onClose();
  };

  return (
    <>
      <Modal size='2xl' isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Collection</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              type='text'
              value={text}
              onChange={(e) => setText(e.target.value)}
              border='2px'
              fontWeight={600}
              fontSize='1.1rem'
              borderColor='#5555'
            />
            <Text fontSize='1.2rem' fontWeight={600} px={4} mt={4}>
              Select Color
            </Text>
            <Flex padding={4} flexWrap='wrap' gap={2}>
              {colors.map((item, i) => (
                <Button
                  key={i}
                  background={item}
                  borderRadius='50%'
                  width={8}
                  height={6}
                  _hover={{ background: item }}
                  padding={6}
                  onClick={() => setColor(item)}
                >
                  {color === item && (
                    <Text fontSize='1.8rem' color='white'>
                      &#10003;
                    </Text>
                  )}
                </Button>
              ))}
            </Flex>
            <Text fontSize='1.2rem' fontWeight={600} px={4}>
              Select Icon
            </Text>
            <Flex padding={4} flexWrap='wrap' gap={2}>
              {collectionIcons.map((item) => (
                <Box
                  key={item.id}
                  background='blackAlpha.100'
                  borderRadius='50%'
                  _hover={{ background: 'blackAlpha.100' }}
                  border='2px'
                  borderColor={icon === item.id ? '#5555' : 'white'}
                  padding={3}
                  onClick={() => setIcon(item.id)}
                  height={14}
                  width={14}
                >
                  {item.icon}
                </Box>
              ))}
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleCreateCollection} background='brand.100'>
              Create Collection
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateCollectionModal;
