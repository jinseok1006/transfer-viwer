import React, { useCallback } from 'react';
import {
  Box,
  useDisclosure,
  Flex,
  Heading,
  Spacer,
  IconButton,
  Image,
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
      <Box
        maxW='md'
        mx='auto'
        bgColor='white'
        boxShadow='xs'
        borderRadius='0px 0px 8px 8px'
      >
        <Flex justify='space-between' alignItems='center' py={2} px={6}>
          <RouterLink to='/'>
            <Flex alignItems='center' gap={1}>
              <Image src='/logo.png' w='24px' />
              <Heading fontWeight='bold' size='md'>
                전북대 전학/전과 현황
              </Heading>
            </Flex>
          </RouterLink>
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
