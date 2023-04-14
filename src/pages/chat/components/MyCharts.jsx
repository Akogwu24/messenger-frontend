import { Box, HStack, Stack, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { ChatState } from '../../../context/chatContext';
import { getChats } from '../service';
import { HiUserGroup } from 'react-icons/hi';
import { SkeletonLoader } from '../../../components/SkeletonLoader';
import { getSender } from '../../../utils/utils';
import CustomModal from '../../../components/CustomModal';
import { CreateGroupChatModal } from './CreateGroupChatModal';

export const MyChats = ({ setShowChatBox, showChatBox, refresh, setRefresh }) => {
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  const [loggedUser, setLoggedUser] = useState();
  const [loadingChats, setLoadingChats] = useState(false);

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem('userInfo')));
    getChats(setLoadingChats, setChats);
  }, [setChats, refresh]);

  return (
    <Box onClick={() => setShowChatBox(!showChatBox)}>
      <HStack py='5' justify='space-between'>
        <Text>MyChats</Text>
        <CustomModal btnTitle='Create Group Chat' buttonProps={{ bg: 'bluishGreen', leftIcon: <HiUserGroup />, fontSize: '12px' }}>
          <CreateGroupChatModal setRefresh={() => setRefresh()} />
        </CustomModal>
      </HStack>
      <Stack h='80vh' pt='3vh' spacing='5' overflowY={'auto'}>
        {chats?.length ? (
          chats?.map((chat) => (
            <Box
              key={chat._id}
              onClick={() => setSelectedChat(chat)}
              cursor='pointer'
              bg={selectedChat === chat ? 'bluishGreen' : 'primary'}
              color='white'
              p='2'
              borderRadius='4px'
            >
              <Text fontWeight={600} fontSize={'1.2rem'}>
                {chat.isGroupChat ? chat?.chatName : getSender(loggedUser, chat.users)}
              </Text>
              <Text as='small'>{chat?.lastMessage || 'Last Message'}</Text>
            </Box>
          ))
        ) : (
          <SkeletonLoader />
        )}
      </Stack>
    </Box>
  );
};
