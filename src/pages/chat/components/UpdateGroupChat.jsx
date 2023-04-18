import { Avatar, Box, Button, Center, Flex, FormControl, HStack, Heading, Input, Spinner, Stack, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import useDebounce from '../../../hooks/useDebounce';
import { ChatState } from '../../../context/chatContext';
import { SelectedUserBadgeItem } from './SelectedUserBadgeItem';
import { PrimaryButton } from '../../../components/CustomButtons';
import { EmptyState } from '../../../components/EmptyState';
import { searchUser, updateGroupChatName } from '../service';
import { InfoToast } from '../../../components/NotificationHandler';
import { upadateGroupChatName } from '../../../components/CustomButtons';

export const UpdateGroupChat = ({ onClose, setRefresh }) => {
  const { selectedChat, setSelectedChat, user } = ChatState();
  const [groupName, setGroupName] = useState(selectedChat?.chatName);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 800);
  const [loading, setLoading] = useState(false);
  const [updatingGroup, setUpdatingGroup] = useState(false);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [selectedUsersList, setSelectedUsersList] = useState(selectedChat.users);
  const [updatingGroupName, setUpdatingGroupName] = useState(false);

  useEffect(() => {
    searchUser(debouncedSearchTerm, setLoading, setSearchedUsers);
  }, [debouncedSearchTerm]);

  const addMember = (userToAdd) => {
    if (selectedUsersList.some((user) => user._id === userToAdd._id)) return InfoToast('User already added');
    setSelectedUsersList([...selectedUsersList, userToAdd]);
  };

  const handleUpdateGroupChat = () => {};

  const handleUpadateGroupChatName = () => {
    const payload = { chatId: selectedChat._id, newGroupChatName: groupName };
    updateGroupChatName(payload, setUpdatingGroupName, onClose, setRefresh);
  };

  return (
    <Stack p='5'>
      <HStack justify='space-between'>
        <Heading fontSize='1.5rem'>Update Group Chat</Heading>
        <Button onClick={onClose} size='xs' color='crimson' _hover={{ bg: 'null' }} bg='red.100'>
          Close
        </Button>
      </HStack>

      <FormControl pt='10' pb='5'>
        <HStack mb='5'>
          <Input
            fontSize='13px'
            autoFocus
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder='Enter the Group Chat Name e.g JavaScript Connect'
          />
          <PrimaryButton isLoading={updatingGroupName} onClick={handleUpadateGroupChatName}>
            Update
          </PrimaryButton>
        </HStack>

        <Input fontSize='13px' placeholder='Search and add User' onChange={(e) => setSearchTerm(e.target.value)} />
        <Flex wrap='wrap' gap='1rem' pt='5'>
          {selectedUsersList?.map((selectedUser) => (
            <SelectedUserBadgeItem
              setSelectedUsersList={setSelectedUsersList}
              selectedUsersList={selectedUsersList}
              key={selectedUser._id}
              selectedUser={selectedUser}
            />
          ))}
        </Flex>
        {loading && !searchedUsers.length && (
          <center py='10'>
            <Spinner speed='0.6s' thickness='4px' />
          </center>
        )}

        {!loading && searchedUsers.length ? (
          <Stack py='5' spacing='5'>
            <Text as='small'>Click to add Members</Text>
            {searchedUsers?.slice(0, 4)?.map((searchedUser) => (
              <HStack key={searchedUser._id} bg='gray.100' p='2' borderRadius='4px' shadow='md' onClick={() => addMember(searchedUser)}>
                <Avatar mr={2} size='sm' cursor='pointer' name={searchedUser?.name} src={searchedUser?.pic} />
                <Box>
                  <Text>{searchedUser?.name || 'hfcefc'}</Text>
                  <Text fontSize='xs'>
                    <b>Email : </b>
                    {searchedUser?.email || 'dd@dd.com'}
                  </Text>
                </Box>
              </HStack>
            ))}
          </Stack>
        ) : null}

        {!loading && !searchedUsers.length && (
          <Center py='10'>
            <EmptyState w='280px' h='25vh' caption='User not  Found' />
          </Center>
        )}
        <PrimaryButton isLoading={updatingGroup} onClick={handleUpdateGroupChat} mt='5' w='full'>
          Update Group
        </PrimaryButton>
      </FormControl>
    </Stack>
  );
};
