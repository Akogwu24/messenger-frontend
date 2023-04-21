import { Avatar, Box, Button, Flex, HStack, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { OutlinedButton } from '../../../components/CustomButtons';
import { FaRegBell } from 'react-icons/fa';
import { ChatState } from '../../../context/chatContext';
import { SearchUser } from './SearchUser';
import CustomModal from '../../../components/CustomModal';
import { UserProfileModal } from './UserProfileModal';
import { useNavigate } from 'react-router-dom';

export const Header = ({ refresh, setRefresh }) => {
  const { user, setUser } = ChatState();
  const navigate = useNavigate();

  useEffect(() => {}, [refresh]);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
    navigate('/');
  };

  return (
    <Flex h='100%' justify='space-between' align='center'>
      <SearchUser />
      <HStack gap='2rem'>
        <FaRegBell size={20} />
        <Menu>
          <MenuButton size='sm' as={Button}>
            <Avatar size='sm' name={user?.name} src={user?.pic} />
          </MenuButton>
          <MenuList color='#333'>
            <MenuItem>
              <CustomModal div buttonProps={{ w: 'full' }} btnTitle={'My Profile'}>
                <UserProfileModal user={user} />
              </CustomModal>
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  );
};
