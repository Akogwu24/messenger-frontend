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
import { EmptyState } from '../../../components/EmptyState';

export const SearchUser = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [search, setSearch] = useState('');
  const debouncedSearchTerm = useDebounce(search, 1000);
  const [loading, setLoading] = useState(false);
  const [searchedUsers, setSearchedUsers] = useState([]);

  useEffect(() => {
    searchUser(debouncedSearchTerm, setLoading, setSearchedUsers);
  }, [debouncedSearchTerm]);

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
              <Input
                fontSize='13px'
                autoFocus
                placeholder='Search by name or email'
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Flex>
            <Stack spacing='5'>
              {loading && searchedUsers?.length < 1 && <SkeletonLoader />}

              {!loading && searchedUsers?.length && searchedUsers?.map((user, i) => <UserCard onClose={onClose} user={user} key={i} />)}

              {!loading && !searchedUsers?.length && <EmptyState caption='No User Found' />}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
