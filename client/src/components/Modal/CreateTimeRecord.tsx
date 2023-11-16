import { useMutation } from '@apollo/client';
import {
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
  Select,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ICreateTimeRecord, ICreateTimeRecordArgs } from '../../../types/types';
import { CREATE_TIME_RECORD } from '../../graphql/Timesheets/mutation';
import { ALL_TIME_RECORDS } from '../../graphql/Timesheets/query';

interface CreateTimeRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  time: number;
}

const CreateTimeRecordModal: React.FC<CreateTimeRecordModalProps> = ({
  isOpen,
  onClose,
  time,
}) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [text, setText] = useState('');

  const [createTimeRecord] = useMutation<
    ICreateTimeRecord,
    ICreateTimeRecordArgs
  >(CREATE_TIME_RECORD, {
    update: (cache, mutationResult) => {
      const createTimeRecord = mutationResult.data?.createTimeRecord;
      if (createTimeRecord) {
        const { getAllTimeRecords } = cache.readQuery<any>({
          query: ALL_TIME_RECORDS,
        });
        cache.writeQuery({
          query: ALL_TIME_RECORDS,
          data: {
            getAllTimeRecords: [...getAllTimeRecords, createTimeRecord],
          },
        });
      }
    },
  });

  const handleCreateRecord = () => {
    const calculateTime = hours * 60 * 60 + minutes * 60 + seconds;

    createTimeRecord({
      variables: {
        input: {
          note: text,
          time: calculateTime,
        },
      },
      optimisticResponse: {
        __typename: 'Mutation',
        createTimeRecord: {
          __typename: 'Time',
          id: `temp-id-${Math.random().toString(36).substr(2, 9)}`,
          time: calculateTime,
          note: text,
          updatedAt: new Date(),
          createdAt: new Date(),
        },
      } as any,
    });

    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setText('');
    onClose();
  };

  function convertSecondsToTime(seconds: number) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    setHours(hours);
    setMinutes(minutes);
    setSeconds(remainingSeconds);
  }

  useEffect(() => {
    convertSecondsToTime(time);
  }, [isOpen]);

  return (
    <>
      <Modal size='2xl' isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent mx={1} bg='white' color='black'>
          <ModalHeader>Create Time Record</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              type='text'
              placeholder='Note'
              value={text}
              onChange={(e) => setText(e.target.value)}
              border='2px'
              fontWeight={600}
              fontSize='1.1rem'
              borderColor='#5555'
              my={4}
            />
            <Text fontSize='1rem' fontWeight={600} my={2}>
              Enter Time in HH:MM:SS
            </Text>
            <Flex justifyContent='center' alignItems='center' gap={2}>
              <Select
                onChange={(e) => setHours(Number(e.target.value))}
                border='2px'
                fontWeight={600}
                fontSize='1.1rem'
                borderColor='#5555'
                value={hours}
              >
                {[...Array(25).keys()].map((i) => (
                  <option key={i} value={i}>
                    {i < 10 ? '0' + i : i}
                  </option>
                ))}
              </Select>

              <Text fontSize='1.2rem' fontWeight={700}>
                :
              </Text>

              <Select
                onChange={(e) => setMinutes(Number(e.target.value))}
                border='2px'
                fontWeight={600}
                value={minutes}
                fontSize='1.1rem'
                borderColor='#5555'
              >
                {[...Array(60).keys()].map((i) => (
                  <option key={i} value={i}>
                    {i < 10 ? '0' + i : i}
                  </option>
                ))}
              </Select>

              <Text fontSize='1.2rem' fontWeight={700}>
                :
              </Text>

              <Select
                onChange={(e) => setSeconds(Number(e.target.value))}
                border='2px'
                fontWeight={600}
                value={seconds}
                fontSize='1.1rem'
                borderColor='#5555'
              >
                {[...Array(60).keys()].map((i) => (
                  <option key={i} value={i}>
                    {i < 10 ? '0' + i : i}
                  </option>
                ))}
              </Select>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={handleCreateRecord}
              background='brand.100'
              color='white'
              _hover={{ color: 'black' }}
            >
              Create Record
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateTimeRecordModal;
