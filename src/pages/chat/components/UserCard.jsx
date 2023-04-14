import { Avatar, Box, HStack, Spinner, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { createChat } from '../service';
import { ChatState } from '../../../context/chatContext';

export const UserCard = ({ user, onClose }) => {
  const { setSelectedChat, chats, setChats } = ChatState();
  const [loading, setLoading] = useState(false);

  const accessChats = async () => {
    createChat(setLoading, user._id, onClose, setSelectedChat, chats, setChats);
  };
  return loading ? (
    <Spinner />
  ) : (
    <HStack bg='gray.100' p='2' borderRadius='4px' shadow='md' onClick={accessChats}>
      <Avatar mr={2} size='sm' cursor='pointer' name={user?.name} src={user?.pic} />
      <Box>
        <Text>{user?.name || 'hfcefc'}</Text>
        <Text fontSize='xs'>
          <b>Email : </b>
          {user?.email || 'dd@dd.com'}
        </Text>
      </Box>
    </HStack>
  );
};
