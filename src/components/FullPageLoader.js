import { Flex, Spinner } from '@chakra-ui/react';

export function FullPageLoader() {
  return (
    <Flex bg='lightGray' justifyContent='center' alignItems='center' height='100vh' width='100%'>
      <Spinner color='brand.500' w='30px' h='50px' speed='0.6s' thickness='5px' />
    </Flex>
  );
}
