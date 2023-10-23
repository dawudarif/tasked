import { useState } from 'react';
import DeleteTimeRecordModal from '../../../../Modal/DeleteTimeRecordModal';
import { Tr, Td } from '@chakra-ui/react';
import {
  formatTime,
  formatDateLong,
} from '../../../../../util/formatDateAndTime';
import { ITimeRecord } from '../../../../../util/types';

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
        fontSize='1rem'
        fontWeight={600}
        _hover={{ bg: '#333333', color: 'white' }}
        onDoubleClick={() => setIsOpen(true)}
      >
        <Td px={10} py={6}>
          {index + 1}
        </Td>
        <Td px={10} py={6}>
          {item.note}
        </Td>
        <Td px={10} py={6} isNumeric>
          {formatTime(item.time)}
        </Td>
        <Td px={10} py={6}>
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
