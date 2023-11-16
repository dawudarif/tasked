import { useMutation } from '@apollo/client';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { DELETE_RECORD } from '../../graphql/Timesheets/mutation';
import { ALL_TIME_RECORDS } from '../../graphql/Timesheets/query';
import { ITime } from '../../../types/types';

interface DeleteTimeRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  recordId: string;
  recordName: string;
}

const DeleteTimeRecordModal: React.FC<DeleteTimeRecordModalProps> = ({
  isOpen,
  onClose,
  recordId,
  recordName,
}) => {
  const [deleteRecord] = useMutation(DELETE_RECORD, {
    optimisticResponse: {
      __typename: 'Mutation',
      deleteRecord: {
        id: recordId,
        __typename: 'Time',
      },
    },
    update: (cache, mutationResult) => {
      const deletedRecord = mutationResult?.data?.deleteTimeRecord;

      if (mutationResult) {
        const { getAllTimeRecords } = cache.readQuery<any>({
          query: ALL_TIME_RECORDS,
        });

        const updatedTimeRecords = getAllTimeRecords.filter(
          (r: ITime) => r.id !== deletedRecord.id,
        );

        cache.writeQuery({
          query: ALL_TIME_RECORDS,

          data: {
            getAllTimeRecords: updatedTimeRecords,
          },
        });
      }
    },
  });

  const deleteTimeRecord = () => {
    deleteRecord({
      variables: {
        input: recordId,
      },
    });
    onClose();
  };

  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalCloseButton />
        <ModalOverlay />
        <ModalContent mx={1} bg='white' color='black'>
          <ModalHeader>Delete Record</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Do you want to delete the record "{recordName}"?</Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={deleteTimeRecord} bg='#fabb18'>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default DeleteTimeRecordModal;
