import { Box, Grid, GridItem, useMediaQuery } from '@chakra-ui/react';
import { SideDrawer } from './components/SideDrawer';
import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { MyChats } from './components/MyCharts';
import { ChartBox } from './components/ChartBox';
import { useGetWindowSize } from '../../hooks/useGetWindowSize';

export const ChatPage = () => {
  const [showChatBox, setShowChatBox] = useState(false);
  // const [isMobile] = useMediaQuery('(max-width:760px)');
  const windowSize = useGetWindowSize();
  const [isMobile, setisMobile] = useState();
  const [refresh, setRefresh] = useState({});

  const padding = '5%';
  useEffect(() => {
    if (windowSize <= 768) {
      setisMobile(true);
    } else {
      setisMobile(false);
    }
  }, [windowSize]);

  return (
    <Grid gridTemplateColumns='repeat(12, 1fr)' gridTemplateRows='repeat(12, 1fr)' gap='1rem' color='white' bg='primary' minH='100vh'>
      <GridItem bg={'secondary'} gridColumn='1/13' px='4%'>
        <Header />
      </GridItem>
      {isMobile && !showChatBox ? (
        <GridItem bg={'secondary'} gridColumn={['1/13', '1/13', '1/5']} gridRow={'2/13'} px={padding}>
          <MyChats isMobile={isMobile} showChatBox={showChatBox} setShowChatBox={setShowChatBox} refresh={refresh} setRefresh={setRefresh} />
        </GridItem>
      ) : (
        <GridItem bg={'secondary'} gridColumn={['1/13', '1/13', '5/13']} gridRow={'2/13'} px={padding}>
          <ChartBox isMobile={isMobile} showChatBox={showChatBox} setShowChatBox={setShowChatBox} refresh={refresh} setRefresh={setRefresh} />
        </GridItem>
      )}

      {!isMobile && (
        <>
          <GridItem bg={'secondary'} gridColumn={['1/5']} gridRow={'2/13'} px={padding}>
            <MyChats showChatBox={showChatBox} setShowChatBox={setShowChatBox} refresh={refresh} setRefresh={setRefresh} />
          </GridItem>
          <GridItem bg={'secondary'} gridColumn={['5/13']} gridRow={'2/13'} px={padding}>
            <ChartBox showChatBox={showChatBox} setShowChatBox={setShowChatBox} refresh={refresh} setRefresh={setRefresh} />
          </GridItem>
        </>
      )}
    </Grid>
  );
};
