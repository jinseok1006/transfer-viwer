import { Container, Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

import AppNavigation from '../components/AppNavigation';

export default function Layout() {
  return (
    <>
      <AppNavigation />
      <Container maxW='md'>
        <Outlet />
        <Box h='85px' />
      </Container>
    </>
  );
}
