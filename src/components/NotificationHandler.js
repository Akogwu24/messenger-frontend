import { createStandaloneToast } from '@chakra-ui/toast';
const { toast } = createStandaloneToast();

export const successToast = (msg) => {
  toast({
    title: 'Success',
    description: msg,
    status: 'success',
    duration: 5000,
    isClosable: true,
    position: 'top-right',
  });
};

export const errorToast = (msg) => {
  toast({
    title: 'Error',
    description: msg ?? 'SOMETHING WENT WRONG',
    status: 'error',
    duration: 5000,
    isClosable: true,
    position: 'top-right',
  });
};

export const InfoToast = (msg) => {
  toast({
    title: 'Info',
    description: msg,
    status: 'info',
    duration: 5000,
    isClosable: true,
    position: 'top-right',
  });
};

export const warningToast = (msg) => {
  toast({
    title: 'Warning',
    description: msg,
    status: 'warning',
    duration: 5000,
    isClosable: true,
    position: 'top-right',
  });
};
