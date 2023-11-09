import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

// TODO: 운영체제별 폰트 어떻게 처리할 것인지 확인
const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: '#fdfdfd',
      },
    },
  },
  fonts: {
    heading: 'pretendard',
    body: 'pretendard',
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
