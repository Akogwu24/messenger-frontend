import { Box } from '@chakra-ui/react';
import React from 'react';
import { SingleChat } from './SingleChat';
import { ChatState } from '../../../context/chatContext';

export const ChartBox = ({ isMobile, showChatBox, setShowChatBox, refresh, setRefresh }) => {
  const { selectedChat } = ChatState();
  return (
    <Box>
      <SingleChat isMobile={isMobile} setShowChatBox={() => setShowChatBox(!showChatBox)} refresh={refresh} setRefresh={setRefresh} />
    </Box>
  );
};
