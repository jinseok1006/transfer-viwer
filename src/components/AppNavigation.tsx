import React, { useCallback } from 'react';
import {
  Box,
  useDisclosure,
  Flex,
  Heading,
  Spacer,
  IconButton,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { HamburgerIcon } from '@chakra-ui/icons';

import SidebarContainer from './Sidebar';

function AppNavigation() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const memoizedOnOpen = useCallback(onOpen, []);
  const memoizedOnClose = useCallback(onClose, []);

  return (
    <>
      <AppBar onOpen={memoizedOnOpen} />
      <SidebarContainer isOpen={isOpen} onClose={memoizedOnClose} />
    </>
  );
}
export default AppNavigation;

interface AppBarProps {
  onOpen: () => void;
}

const AppBar = React.memo(function AppBar({ onOpen }: AppBarProps) {
  return (
    <>
      <Box maxW='md' mx='auto' mb={3} bgColor='white' boxShadow='xs'>
        <Flex justify='space-between' alignItems='center' py={2} px={6}>
          <Heading fontWeight='bold' size='md' as={RouterLink} to='/'>
            🔥 전북대 전학/전과 현황
          </Heading>
          <Spacer />
          <IconButton
            icon={<HamburgerIcon />}
            variant='ghost'
            onClick={onOpen}
            aria-label='sidebar-menu'
          />
        </Flex>
      </Box>
    </>
  );
});
