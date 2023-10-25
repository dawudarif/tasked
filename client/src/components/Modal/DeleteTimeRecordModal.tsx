import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { ALL_TIME_RECORDS } from '../../graphql/Timesheets/query';
import { DELETE_RECORD } from '../../graphql/Timesheets/mutation';
import { useMutation } from '@apollo/client';
import { ITime } from '../../util/types';

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
  const [deleteRecord, { data }] = useMutation(DELETE_RECORD, {
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
        <ModalContent>
          <ModalHeader>Delete Record</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Do you want to delete the record "{recordName}"?</Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={deleteTimeRecord} colorScheme='red'>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default DeleteTimeRecordModal;
