import { Box, FormControl, Input, InputGroup, InputRightElement, Stack, Text } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { phoneNumberValidation } from '../../../utils/utils';
import { useEffect, useRef, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { OutlinedButton, PrimaryButton } from '../../../components/CustomButtons';
import axios from 'axios';
import { registerUser } from '../service';

const defaultValues = { email: '', password: '', name: '', phoneNumber: '' };

export const RegisterForm = ({ currentTab }) => {
  const { register, handleSubmit, formState, watch } = useForm({ defaultValues });
  const [showPassword, setShowPassword] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(false);
  const fullnameRef = useRef(null);
  const imageInputRef = useRef(null);
  let imgUrlsFromCloudinary = [];

  useEffect(() => {
    currentTab && fullnameRef?.current?.focus();
  }, [currentTab]);

  const handleImageFile = (e) => {
    e.preventDefault();
    if (!e.target.files) return;

    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);

    reader.onloadend = () => {
      setProfilePic([{ imageUrl: reader.result, name: e.target.files[0].name, file: e.target.files[0] }]);
    };
  };

  const handleRegister = (data) => {
    setLoading(true);
    const formData = new FormData();

    const uploaders = profilePic.map((file) => {
      formData.append('file', file.file);
      formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);

      return axios
        .post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`, formData, {
          headers: { 'X-Requested-With': 'XMLHttpRequest' },
        })
        .then((response) => {
          const fileURL = response.data.secure_url;
          imgUrlsFromCloudinary = fileURL;
        });
    });

    axios.all(uploaders).then(() => {
      const payload = { ...data, pic: imgUrlsFromCloudinary };
      registerUser(setLoading, payload);
    });
  };

  return (
    <Stack spacing='8' as='form' onSubmit={handleSubmit(handleRegister)}>
      <Text fontSize={'1.5rem'}>Register your Account</Text>
      <Box>
        <Input ref={fullnameRef} placeholder='Full Name' {...register('name', { required: 'full Name is Required' })} fontSize='13px' />
        <Text as='small' color='crimson'>
          {formState?.errors?.fullname?.message}
        </Text>
      </Box>

      <Box>
        <Input {...register('email', { required: 'Email is Required' })} fontSize='13px' type='email' placeholder='Enter Email' />
        <Text as='small' color='crimson'>
          {formState?.errors?.email?.message}
        </Text>
      </Box>

      <Box>
        <Input type='number' placeholder='Phone number (0803...)' fontSize='13px' {...register('phoneNumber', phoneNumberValidation)} />
        <Text as='small' color='crimson'>
          {formState?.errors?.phone?.message}
        </Text>
      </Box>

      <Box>
        <InputGroup pos='relative'>
          <Input
            placeholder='Password'
            {...register('password', {
              required: 'Password is Required',
              maxLength: { value: 12, message: 'Password cannot be more than 10 characters' },
              minLength: { value: 4, message: 'Password must be 4 characters' },
            })}
            type={showPassword ? 'text' : 'password'}
            fontSize='13px'
          />

          <InputRightElement width='4.5rem'>
            <Box as='span' cursor='pointer' onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash size={15} /> : <FaEye size={15} />}
            </Box>
          </InputRightElement>
        </InputGroup>
        <Text as='small' color='crimson'>
          {formState?.errors?.password?.message}
        </Text>
      </Box>

      <Box>
        <OutlinedButton bg='bluishGreen' onClick={() => imageInputRef.current.click()}>
          Choose Profile Image
        </OutlinedButton>
        <Input type='file' ref={imageInputRef} accept='image/*' display='none' onChange={handleImageFile} />
        {profilePic && <Text>{profilePic[0]?.name}</Text>}
      </Box>

      <PrimaryButton
        isLoading={loading}
        type='submit'
        //  onClick={(e) => handleRegister(e, profilePic)}
      >
        Register
      </PrimaryButton>
    </Stack>
  );
};
