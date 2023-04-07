import { Box, Grid, GridItem, useMediaQuery } from '@chakra-ui/react';
import { SideDrawer } from './components/SideDrawer';
import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { MyCharts } from './components/MyCharts';
import { ChartBox } from './components/ChartBox';

export const ChatPage = () => {
  const [showChatBox, setShowChatBox] = useState(false);
  const [isMobile] = useMediaQuery('(max-width:760px)');

  return (
    <Grid gridTemplateColumns='repeat(12, 1fr)' gridTemplateRows='repeat(12, 1fr)' gap='1rem' color='white' bg='primary' minH='100vh'>
      <GridItem bg='blue' gridColumn='1/13'>
        <Header />
      </GridItem>
      {isMobile && !showChatBox ? (
        <GridItem bg='teal' gridColumn={['1/13', '1/13', '1/5']} gridRow={'2/13'}>
          <MyCharts showChatBox={showChatBox} setShowChatBox={setShowChatBox} />
        </GridItem>
      ) : (
        <GridItem bg='red' gridColumn={['1/13', '1/13', '5/13']} gridRow={'2/13'}>
          <ChartBox showChatBox={showChatBox} setShowChatBox={setShowChatBox} />
        </GridItem>
      )}

      {!isMobile && (
        <>
          <GridItem bg='teal' gridColumn={['1/5']} gridRow={'2/13'}>
            <MyCharts showChatBox={showChatBox} setShowChatBox={setShowChatBox} />
          </GridItem>
          <GridItem bg='red' gridColumn={['5/13']} gridRow={'2/13'}>
            <ChartBox showChatBox={showChatBox} setShowChatBox={setShowChatBox} />
          </GridItem>
        </>
      )}
    </Grid>
  );
};
