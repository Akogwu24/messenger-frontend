import { isValidElement, Children, cloneElement } from 'react';
import { Modal as ChakraModal, ModalOverlay, ModalContent, ModalBody, useDisclosure, Box, Button } from '@chakra-ui/react';

export default function CustomModal({ children, btnTitle, buttonProps, div, ...props }) {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const childrenWithProps = Children.map(children, (child) => {
    // Checking isValidElement is the safe way and avoids a TS error too.
    if (isValidElement(child)) {
      return cloneElement(child, { onClose });
    }

    return child;
  });

  return (
    <>
      {div ? (
        <Box onClick={onOpen} cursor='pointer' {...buttonProps}>
          {btnTitle}
        </Box>
      ) : (
        <Button _focus={{ border: 'none' }} onClick={onOpen} color='#fff' bg='primary' _hover={{ opacity: 0.8 }} {...buttonProps}>
          {btnTitle}
        </Button>
      )}
      <ChakraModal isOpen={isOpen} onClose={onClose} isCentered motionPreset='slideInBottom' {...props}>
        <ModalOverlay />
        <ModalContent borderRadius='3px'>
          {/* <ModalHeader size='sm'>{ModalTitle}</ModalHeader> */}

          {/* <ModalCloseButton /> */}
          <ModalBody p='0'>{childrenWithProps}</ModalBody>
        </ModalContent>
      </ChakraModal>
    </>
  );
}
