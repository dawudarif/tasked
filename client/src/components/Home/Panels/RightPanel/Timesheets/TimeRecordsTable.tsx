import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React from 'react';
import { IAllTimeRecords } from '../../../../../util/types';
import SingleRecord from './SingleRecord';

type TimeRecordsTableProps = {
  data: IAllTimeRecords;
};

const TimeRecordsTable: React.FC<TimeRecordsTableProps> = ({ data }) => {
  const sortedDataDescending = data.getAllTimeRecords.sort(
    (a, b) => Number(b.createdAt) - Number(a.createdAt),
  );

  return (
    <TableContainer width='70%'>
      <Table variant='unstyled'>
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
            <SingleRecord index={i} item={item} key={i} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
export default TimeRecordsTable;
