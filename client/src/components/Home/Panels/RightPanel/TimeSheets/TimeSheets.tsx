import { Box } from '@chakra-ui/react';
import React from 'react';
import Today from '../../../../common/Today';

type TimeSheetsProps = {};

const TimeSheets: React.FC<TimeSheetsProps> = () => {
  return (
    <Box height='100%' width='100%'>
      <Today />
    </Box>
  );
};
export default TimeSheets;
