import { Box, Center, Flex, Img, Stack, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { RegisterForm } from './components/RegisterForm';
import { LoginForm } from './components/LoginForm';
import { useState } from 'react';

export const HomePage = () => {
  const [currentTab, setCurrentTab] = useState(0);
  return (
    <Flex bg='primary' minH='100vh' color='white'>
      <Flex justify='center' pt='15vh' flex={1}>
        <Tabs w='400px' isFitted variant='soft-rounded' onChange={(t) => setCurrentTab(t)}>
          <TabList>
            <Tab color='white'>Login</Tab>
            <Tab color='white'>Register</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <LoginForm currentTab={currentTab} />
            </TabPanel>
            <TabPanel>
              <RegisterForm currentTab={currentTab} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>

      <Box flex={1} display={['none', 'none', 'block']}>
        <Img w='100%' objectFit={'cover'} h='100%' src='/images/chatter.jpg' alt='home page image' />
      </Box>
    </Flex>
  );
};
