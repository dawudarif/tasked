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
import { CREATE_COLLECTION } from '../../graphql/Collection/mutations';
import { colors } from '../../data/colors';
import { collectionIcons } from '../../data/icons';

interface CreateCollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateCollectionModal: React.FC<CreateCollectionModalProps> = ({
  isOpen,
  onClose,
}) => {
  const size = 30;

  const [text, setText] = useState('');
  const [color, setColor] = useState('#ffd40c');
  const [icon, setIcon] = useState(4);
  const [createCollection, { data, loading, error }] =
    useMutation(CREATE_COLLECTION);

  const handleCreateCollection = () => {
    if (text === '') return;
    createCollection({
      variables: {
        input: {
          name: text,
          color,
          icon,
        },
      },
    });
    onClose();
  };

  const OverlayOne = () => (
    <ModalOverlay
      bg='blackAlpha.300'
      backdropFilter='blur(10px) hue-rotate(90deg)'
    />
  );
  const [overlay, setOverlay] = useState(<OverlayOne />);

  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
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
                  borderColor={icon === item.id ? 'black' : 'white'}
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
