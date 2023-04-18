import { Avatar, Box, HStack, Stack, Text } from '@chakra-ui/react';
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
            <HStack key={chat._id} p='2' cursor='pointer' color='white' borderRadius='4px' bg={selectedChat === chat ? 'bluishGreen' : 'primary'}>
              <Avatar src={!chat.isGroupChat && chat.users[1].pic} name={chat?.chatName} />
              <Box onClick={() => setSelectedChat(chat)}>
                <Text fontWeight={600} fontSize={'1.2rem'}>
                  {chat.isGroupChat ? chat?.chatName : getSender(loggedUser, chat.users)}
                </Text>
                <Text as='small'>{chat?.lastMessage || 'Last Message'}</Text>
              </Box>
            </HStack>
          ))
        ) : (
          <SkeletonLoader />
        )}
      </Stack>
    </Box>
  );
};
