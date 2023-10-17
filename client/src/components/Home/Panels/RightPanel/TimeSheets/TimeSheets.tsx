import { Box } from '@chakra-ui/react';
import React from 'react';
import Today from '../../../../common/Today';

type TimeSheetsProps = {};

const TimeSheets: React.FC<TimeSheetsProps> = () => {
  return (
    <Box
      background='brand.300'
      borderTopLeftRadius='1rem'
      border='2px'
      borderColor='red'
      height='100%'
      width='100%'
    >
      <Today />
    </Box>
  );
};
export default TimeSheets;
