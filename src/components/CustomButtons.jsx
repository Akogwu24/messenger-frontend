import { Button } from '@chakra-ui/react';

export const PrimaryButton = ({ children, ...props }) => {
  return (
    <Button color='#fff' bg='secondary' _hover={{ bg: 'brand.400' }} {...props}>
      {children}
    </Button>
  );
};

export const OutlinedButton = ({ children, ...props }) => {
  return (
    <Button variant='outline' color='brand.500' _hover={{ color: 'brand.400' }} {...props}>
      {children}
    </Button>
  );
};
