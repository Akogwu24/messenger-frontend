import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createStandaloneToast } from '@chakra-ui/toast';
import { ChatContextProvider } from './context/chatContext';

const { ToastContainer } = createStandaloneToast();

const theme = extendTheme({
  colors: {
    primary: 'rgba(7, 30, 61,1)',
    secondary: 'rgba(31, 66, 135, 1)',
    bluishGreen: '#278ea5',
    themeGreen: '#21e6c1',

    colorSheme: {
      primary: '#071e3d',
    },

    styles: {
      global: {
        body: {
          fontSize: '15px',
          fontWeight: 400,
          color: 'white',
          fontFamily: "'Inter', sans-serif",
        },
      },
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChatContextProvider>
        <ChakraProvider theme={theme}>
          <Routes>
            <Route element={<App />} path='/*' />
          </Routes>
          <ToastContainer />
        </ChakraProvider>
      </ChatContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
