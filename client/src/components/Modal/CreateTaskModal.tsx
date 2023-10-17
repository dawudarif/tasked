import { useMutation } from '@apollo/client';
import {
  Button,
  Checkbox,
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

interface CreateTaskModalProps {
  collectionId: string;
  isOpen: boolean;
  onClose: () => void;
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [text, setText] = useState('');
  const [checked, setChecked] = useState(false);
  console.log(checked);

  const [createTask, { data, loading, error }] = useMutation(CREATE_COLLECTION);

  const handleCreateTask = () => {
    createTask({
      variables: {
        input: {
          name: text,
        },
      },
    });
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
              placeholder='Task'
              onChange={(e) => setText(e.target.value)}
              border='2px'
              fontWeight={600}
              fontSize='1.1rem'
              borderColor='#5555'
            />
            <Checkbox onChange={(e) => setChecked(!checked)}>
              Completed
            </Checkbox>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleCreateTask} background='brand.100'>
              Create Collection
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default CreateTaskModal;
