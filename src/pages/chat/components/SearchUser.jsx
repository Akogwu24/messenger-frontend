import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Input,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import { BiSearchAlt } from 'react-icons/bi';
import { OutlinedButton, PrimaryButton } from '../../../components/CustomButtons';
import { useEffect, useState } from 'react';
import useDebounce from '../../../hooks/useDebounce';
import { searchUser } from '../service';
import { UserCard } from './UserCard';
import { SkeletonLoader } from '../../../components/SkeletonLoader';

export const SearchUser = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [search, setSearch] = useState('');
  const debouncedSearchTerm = useDebounce(search, 1000);
  const [loading, setLoading] = useState(false);
  const [searchedUsers, setSearchedUsers] = useState([]);

  useEffect(() => {
    debouncedSearchTerm && searchUser(debouncedSearchTerm, setLoading, setSearchedUsers);
  }, [debouncedSearchTerm]);

  console.log('searchedUsers', searchedUsers);

  return (
    <>
      <OutlinedButton leftIcon={<BiSearchAlt />} onClick={onOpen} size='sm'>
        Search Users
      </OutlinedButton>

      <Drawer placement='left' isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth='1px'>Search Users</DrawerHeader>

          <DrawerBody>
            <Flex pb={2}>
              <Input autoFocus placeholder='Search by name or email' mr={2} value={search} onChange={(e) => setSearch(e.target.value)} />
            </Flex>
            {loading && searchedUsers.length<1 && <SkeletonLoader />}
            <Stack spacing='5'>{!loading && searchedUsers.length && searchedUsers?.map((user, i) => <UserCard user={user} key={i} />)}</Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
