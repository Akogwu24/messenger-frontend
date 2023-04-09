import { Box, Grid, GridItem, useMediaQuery } from '@chakra-ui/react';
import { SideDrawer } from './components/SideDrawer';
import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { MyCharts } from './components/MyCharts';
import { ChartBox } from './components/ChartBox';
import { useGetWindowSize } from '../../hooks/useGetWindowSize';

export const ChatPage = () => {
  const [showChatBox, setShowChatBox] = useState(false);
  // const [isMobile] = useMediaQuery('(max-width:760px)');
  const windowSize = useGetWindowSize();
  const [isMobile, setisMobile] = useState();

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
          <MyCharts showChatBox={showChatBox} setShowChatBox={setShowChatBox} />
        </GridItem>
      ) : (
        <GridItem bg={'secondary'} gridColumn={['1/13', '1/13', '5/13']} gridRow={'2/13'} px={padding}>
          <ChartBox showChatBox={showChatBox} setShowChatBox={setShowChatBox} />
        </GridItem>
      )}

      {!isMobile && (
        <>
          <GridItem bg={'secondary'} gridColumn={['1/5']} gridRow={'2/13'} px={padding}>
            <MyCharts showChatBox={showChatBox} setShowChatBox={setShowChatBox} />
          </GridItem>
          <GridItem bg={'secondary'} gridColumn={['5/13']} gridRow={'2/13'} px={padding}>
            <ChartBox showChatBox={showChatBox} setShowChatBox={setShowChatBox} />
          </GridItem>
        </>
      )}
    </Grid>
  );
};
