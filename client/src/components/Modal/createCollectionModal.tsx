import { useMutation } from '@apollo/client';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { useState } from 'react';
import { CREATE_COLLECTION } from '../../graphql/Collection/mutations';

interface CreateCollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateCollectionModal: React.FC<CreateCollectionModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [text, setText] = useState('');
  const [createCollection, { data, loading, error }] =
    useMutation(CREATE_COLLECTION);

  const handleCreateCollection = () => {
    if (text === '') return;
    createCollection({
      variables: {
        input: {
          name: text,
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
