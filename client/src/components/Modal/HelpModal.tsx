import {
  Modal,
  ModalCloseButton,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  List,
  ListItem,
} from '@chakra-ui/react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalCloseButton />
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Help</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontWeight={600} fontSize='1rem'>
            1. Double click on any task to edit or delete it.
          </Text>{' '}
          <Text fontWeight={600} fontSize='1rem'>
            2. Double click on any collection to edit or delete it.
          </Text>
          <Text fontWeight={600} fontSize='1rem'>
            3. Double click on any time record to edit or delete it.
          </Text>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default HelpModal;
