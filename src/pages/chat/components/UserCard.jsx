import { Avatar, Box, HStack, Text } from '@chakra-ui/react';
import React from 'react';

export const UserCard = ({ user }) => {
  console.log('user', user);
  return (
    <HStack bg='gray.100' p='2' borderRadius='4px' shadow='md'>
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
