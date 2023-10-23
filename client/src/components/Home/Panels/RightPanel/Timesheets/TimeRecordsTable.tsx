import React from 'react';
import { IAllTimeRecords } from '../../../../../util/types';
import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
} from '@chakra-ui/react';
import {
  formatDateLong,
  formatTime,
} from '../../../../../util/formatDateAndTime';

type TimeRecordsTableProps = {
  data: IAllTimeRecords;
};

const TimeRecordsTable: React.FC<TimeRecordsTableProps> = ({ data }) => {
  const sortedDataDescending = data.getAllTimeRecords.sort(
    (a, b) => Number(b.createdAt) - Number(a.createdAt),
  );

  return (
    <TableContainer>
      <Table variant='simple'>
        <TableCaption>Time Records</TableCaption>
        <Thead>
          <Tr color='white' bg='#333333' fontSize='1.1rem' fontWeight={600}>
            <Th px={10} py={6}>
              sr.
            </Th>
            <Th px={10} py={6}>
              Note
            </Th>
            <Th px={10} py={6}>
              Time Record
            </Th>
            <Th px={10} py={6}>
              Created At
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {sortedDataDescending.map((item, i) => (
            <Tr
              key={i}
              borderBottom='2px'
              borderColor='#333333'
              fontSize='1rem'
              fontWeight={600}
              _hover={{ bg: '#333333', color: 'white' }}
            >
              <Td px={10} py={6}>
                {i + 1}
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
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
export default TimeRecordsTable;
