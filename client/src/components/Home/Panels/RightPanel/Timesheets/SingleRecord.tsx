import { useState } from 'react';
import DeleteTimeRecordModal from '../../../../Modal/DeleteTimeRecordModal';
import { Tr, Td } from '@chakra-ui/react';
import {
  formatTime,
  formatDateLong,
} from '../../../../../util/formatDateAndTime';
import { ITimeRecord } from '../../../../../../types/types';

type SingleRecordProps = {
  item: ITimeRecord;
  index: number;
};

const SingleRecord: React.FC<SingleRecordProps> = ({ item, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Tr
        borderBottom='2px'
        borderColor='#333333'
        fontSize={{ lg: '1rem', base: '.8rem' }}
        fontWeight={600}
        _hover={{ bg: '#333333', color: 'white' }}
        onDoubleClick={() => setIsOpen(true)}
      >
        <Td px={{ lg: '10', base: '5' }} py={{ lg: '6', base: '3' }}>
          {index + 1}
        </Td>
        <Td px={{ lg: '10', base: '5' }} py={{ lg: '6', base: '3' }}>
          {item.note}
        </Td>
        <Td px={{ lg: '10', base: '5' }} py={{ lg: '6', base: '3' }} isNumeric>
          {formatTime(item.time)}
        </Td>
        <Td px={{ lg: '10', base: '5' }} py={{ lg: '6', base: '3' }}>
          {formatDateLong(item.createdAt)}
        </Td>
      </Tr>
      <DeleteTimeRecordModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        recordName={item.note}
        recordId={item.id}
      />
    </>
  );
};
export default SingleRecord;
