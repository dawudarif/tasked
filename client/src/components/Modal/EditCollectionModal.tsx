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
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { colors } from '../../data/colors';
import { collectionIcons } from '../../data/icons';
import {
  DELETE_COLLECTION,
  UPDATE_COLLECTION,
} from '../../graphql/Collection/mutations';
import { GET_ALL_COLLECTIONS } from '../../graphql/Collection/queries';
import { ICollectionItem, INewCollection } from '../../util/types';
import { useNavigate } from 'react-router-dom';

interface EditCollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  collection: ICollectionItem;
}

const EditCollectionModal: React.FC<EditCollectionModalProps> = ({
  isOpen,
  onClose,
  collection,
}) => {
  const toast = useToast();
  const router = useNavigate();
  const [text, setText] = useState(collection.name);
  const [color, setColor] = useState(collection.color);
  const [icon, setIcon] = useState(collection.icon);

  const [updateCollection] = useMutation(UPDATE_COLLECTION, {
    variables: {
      input: {
        id: collection.id,
        name: text,
        color,
        icon,
      },
    },
    optimisticResponse: {
      __typename: 'Mutation',
      updateCollection: {
        __typename: 'Collection',
        id: collection.id,
        name: text,
        color,
        icon,
        updatedAt: new Date().toISOString(),
        createdAt: collection.createdAt,
      },
    } as any,
    update: (cache, mutationResult) => {
      const updateCollection = mutationResult.data?.updateCollection;
      if (updateCollection) {
        const { getAllCollections } = cache.readQuery<any>({
          query: GET_ALL_COLLECTIONS,
        });
        cache.writeQuery({
          query: GET_ALL_COLLECTIONS,
          data: {
            getAllCollections: [...getAllCollections, updateCollection],
          },
        });
      }
    },
  });

  const [deleteCollection] = useMutation(DELETE_COLLECTION, {
    optimisticResponse: {
      __typename: 'Mutation',
      deleteTask: {
        id: collection.id,
        __typename: 'Task',
      },
    },
    update: (cache, mutationResult) => {
      const deletedCollection = mutationResult?.data?.deleteCollection;

      if (mutationResult) {
        const { getAllCollections } = cache.readQuery<any>({
          query: GET_ALL_COLLECTIONS,
          variables: {
            input: {
              collectionId: deletedCollection.id,
            },
          },
        });

        const updatedCollections = getAllCollections.filter(
          (c: INewCollection) => c.id !== deletedCollection.id,
        );

        cache.writeQuery({
          query: GET_ALL_COLLECTIONS,
          variables: {
            input: {
              collectionId: deletedCollection.id,
            },
          },
          data: {
            getAllCollections: updatedCollections,
          },
        });
      }
    },
    onCompleted: () => {
      router('/?menu=todo');
    },
  });

  const handleEditCollection = () => {
    if (text === '') return;
    updateCollection();
    onClose();
  };

  const handleDeleteCollection = () => {
    deleteCollection({
      variables: {
        input: collection.id,
      },
    });
    onClose();
  };

  return (
    <>
      <Modal size='2xl' isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bgColor='blackAlpha.100' />
        <ModalContent>
          <ModalHeader>Edit Collection</ModalHeader>
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
            <Button
              border='2px'
              borderColor='red.900'
              color='red.900'
              background='white'
              mx={2}
              onClick={() => handleDeleteCollection()}
            >
              <RiDeleteBin6Line color='red.900' size={25} />
            </Button>
            <Button
              onClick={handleEditCollection}
              background='brand.100'
              color='white'
              _hover={{ color: 'black' }}
            >
              Update Collection
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditCollectionModal;
