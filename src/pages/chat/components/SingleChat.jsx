import { Center, HStack, Stack, Text } from '@chakra-ui/react';
import { SiCodereview } from 'react-icons/si';
import { BiArrowBack } from 'react-icons/bi';
import { ChatState } from '../../../context/chatContext';
import { getSenderFullInfo, isObjectEmpty } from '../../../utils/utils';
import CustomModal from '../../../components/CustomModal';
import { UserProfileModal } from './UserProfileModal';
import { Messages } from './Messages';
import { UpdateGroupChat } from './UpdateGroupChat';

export const SingleChat = ({ isMobile, setShowChatBox, setRefresh, refresh }) => {
  const { selectedChat, user } = ChatState();

  return (
    <Stack py='5'>
      <HStack justify='space-between'>
        {isMobile && (
          <Center p='1' bg='bluishGreen' borderRadius='5px' onClick={setShowChatBox}>
            <BiArrowBack size={20} />
          </Center>
        )}
        <Text fontSize={'1.2rem'}>{selectedChat?.chatName}</Text>

        {!isObjectEmpty(selectedChat) && (
          <CustomModal buttonProps={{ bg: 'bluishGreen', p: 1 }} btnTitle={<SiCodereview />}>
            {!selectedChat?.isGroupChat ? (
              <UserProfileModal user={getSenderFullInfo(user, selectedChat?.users)} />
            ) : (
              <UpdateGroupChat setRefresh={setRefresh} />
            )}
          </CustomModal>
        )}
        {/* {!isObjectEmpty(selectedChat) && selectedChat.isGroupChat && <Text>{selectedChat?.chatName}</Text>} */}
      </HStack>
      <Messages />
    </Stack>
  );
};
