import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

const fontFactory = (font: string) =>
  `'${font}','Apple SD Gothic Neo', '애플 SD 산돌고딕 Neo', 'Malgun Gothic', '맑은 고딕', sans-serif`;
const globalFontFamily = fontFactory('pretendard');

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: '#fdfdfd',
      },
    },
  },
  fonts: {
    heading: globalFontFamily,
    body: globalFontFamily,
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
