import { Avatar, Box, Button, Center, Flex, FormControl, HStack, Heading, Input, Spinner, Stack, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { createGroupChat, searchUser } from '../service';
import useDebounce from '../../../hooks/useDebounce';
import { PrimaryButton } from '../../../components/CustomButtons';
import { EmptyState } from '../../../components/EmptyState';
import { InfoToast } from '../../../components/NotificationHandler';
import { SelectedUserBadgeItem } from './SelectedUserBadgeItem';

export const CreateGroupChatModal = ({ onClose, setRefresh }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  const [loading, setLoading] = useState(false);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [selectedUsersList, setSelectedUsersList] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [creatingGroup, setCreatingGroup] = useState(false);

  useEffect(() => {
    searchUser(debouncedSearchTerm, setLoading, setSearchedUsers);
  }, [debouncedSearchTerm]);

  const addMember = (userToAdd) => {
    if (selectedUsersList.includes(userToAdd)) return InfoToast('User already added');
    setSelectedUsersList([...selectedUsersList, userToAdd]);
  };

  const handleCreateGroup = () => {
    if (!groupName) return InfoToast('Enter the name of the Group');
    if (selectedUsersList.length < 2) return InfoToast('Groups Must 2 or more other Participants');
    const payload = { groupName, usersList: JSON.stringify(selectedUsersList?.map((user) => user._id)) };

    createGroupChat(payload, setCreatingGroup, onClose).then(setRefresh);
  };
  return (
    <Stack p='5'>
      <HStack justify='space-between'>
        <Heading fontSize='1.5rem'>Create Group Chat</Heading>
        <Button onClick={onClose} size='xs' color='crimson' _hover={{ bg: 'null' }} bg='red.100'>
          Close
        </Button>
      </HStack>

      <FormControl pt='10' pb='5'>
        <Box mb='5'>
          <Input
            fontSize='13px'
            autoFocus
            onChange={(e) => setGroupName(e.target.value)}
            placeholder='Enter the Group Chat Name e.g JavaScript Connect'
          />
        </Box>

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
          <Center py='10'>
            <Spinner speed='0.6s' thickness='4px' />
          </Center>
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
        <PrimaryButton isLoading={creatingGroup} onClick={handleCreateGroup} mt='5' w='full'>
          Create Group
        </PrimaryButton>
      </FormControl>
    </Stack>
  );
};
