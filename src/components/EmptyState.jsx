import { Img, Stack, Text } from '@chakra-ui/react';
import React from 'react';

export const EmptyState = ({ caption, h, w }) => {
  return (
    <Stack justify='center' minH='100%'>
      <Img h={h} w={w} objectFit={'cover'} borderRadius={'10px'} src='/images/not-found-image.jpg' alt='not found' />
      <Text textAlign='center' fontWeight='600' fontSize={'md'}>
        {caption || 'Not Found'}
      </Text>
    </Stack>
  );
};
