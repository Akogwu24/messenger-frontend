import { HStack, Text } from '@chakra-ui/react';
import { GrFormClose } from 'react-icons/gr';

export const SelectedUserBadgeItem = ({ setSelectedUsersList, selectedUsersList, selectedUser }) => {
  const removeMember = () => {
    setSelectedUsersList(selectedUsersList.filter((sel) => sel._id !== selectedUser._id));
  };

  return (
    <HStack color='white' gap='0' fontSize='13px' px='3px' borderRadius='3px' cursor='pointer' onClick={removeMember} bg='themeGreen'>
      <Text fontWeight={600} textTransform={'capitalize'}>
        {selectedUser.name}
      </Text>
      {/* {admin === selectedUser._id && <span> (Admin)</span>} */}
      <GrFormClose pl={1} color='white' />
    </HStack>
  );
};
