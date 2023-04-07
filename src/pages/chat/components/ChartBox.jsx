import { Box } from '@chakra-ui/react';
import React from 'react';

export const ChartBox = ({ showChatBox, setShowChatBox }) => {
  return (
    <Box bg='red' onClick={() => setShowChatBox(!showChatBox)}>
      ChartBox
    </Box>
  );
};
