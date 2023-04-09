import { Flex, Img, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { PrimaryButton } from '../../../components/CustomButtons';

export const UserProfileModal = ({ user, onClose }) => {
  return (
    <Stack p='2rem'>
      <Flex justify='center'>
        <Img shadow='sm' src={user?.pic} h='220px' w='250px' objectFit={'cover'} alt='user image' />
      </Flex>
      <SimpleGrid columns={2} rowGap={'10px'} fontWeight={600} py='2rem'>
        <Text color='gray.500'>Name:</Text>
        <Text>{user.name}</Text>
        <Text color='gray.500'>Email:</Text>
        <Text>{user.email}</Text>
        <Text color='gray.500'>Phone number:</Text>
        <Text>{user.phoneNumber || 'Unknown'}</Text>
      </SimpleGrid>

      <PrimaryButton bg='primary' onClick={onClose}>Close Profile</PrimaryButton>
    </Stack>
  );
};
