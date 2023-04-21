import { Box, Input, InputGroup, InputRightElement, Stack, Text } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { PrimaryButton } from '../../../components/CustomButtons';
import { useForm } from 'react-hook-form';
import { login } from '../service';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export const LoginForm = ({ currentTab }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState } = useForm({ defaultValues: { email: '', password: '' } });
  const [loading, setLoading] = useState(false);
  const emailRef = useRef(null);
  const navigate = useNavigate()

  useEffect(() => {
    !currentTab && emailRef?.current?.focus();
  }, [currentTab]);

  const onSubmit = (data) => {
    login(setLoading, data, navigate);
  };

  return (
    <Stack spacing='8' as='form' onSubmit={handleSubmit(onSubmit)}>
      <Text fontSize={'1.5rem'}>Sign in with your E-mail.</Text>
      <Box>
        <Input ref={emailRef} {...register('email', { required: 'Please Enter your Email' })} placeholder='Enter Email' fontSize='12px' />
        <Text as='small' color='crimson'>
          {formState?.errors?.email?.message}
        </Text>
      </Box>

      <Box>
        <InputGroup>
          <Input
            {...register('password', { required: 'Password is Required' })}
            placeholder='Password'
            type={showPassword ? 'text' : 'password'}
            fontSize='12px'
          />

          <InputRightElement width='4.5rem'>
            <Box as='span' cursor='pointer' onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash size={15} color='white' /> : <FaEye size={15} color='white' />}
            </Box>
          </InputRightElement>
        </InputGroup>
        <Text as='small' color='crimson'>
          {formState?.errors?.password?.message}
        </Text>
      </Box>

      <PrimaryButton isLoading={loading} type='submit'>
        Login
      </PrimaryButton>
    </Stack>
  );
};
