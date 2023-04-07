import { Box } from '@chakra-ui/react';
import React from 'react';

export const MyCharts = ({ setShowChatBox, showChatBox }) => {
  return (
    <Box bg='teal' onClick={() => setShowChatBox(!showChatBox)}>
      MyCharts
    </Box>
  );
};
