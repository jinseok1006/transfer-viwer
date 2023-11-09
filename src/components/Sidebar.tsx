import {
  Drawer,
  DrawerOverlay,
  DrawerHeader,
  Divider,
  DrawerContent,
  DrawerFooter,
  DrawerBody,
  Text,
  Link,
  Heading,
  IconButton,
  Flex,
  Spacer,
  Box,
} from '@chakra-ui/react';

import { Link as RouterLink } from 'react-router-dom';
import { CloseIcon } from '@chakra-ui/icons';

import SidebarLinks from './SidebarLinks';

interface SidebarContainerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SidebarContainer({
  isOpen,
  onClose,
}: SidebarContainerProps) {
  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>
          <SidebarHeader onClose={onClose} />
        </DrawerHeader>
        <Divider />
        <DrawerBody px={4} mt={3}>
          <SidebarLinks onClose={onClose} />
        </DrawerBody>
        <Divider />
        <DrawerFooter>
          <SidebarFooter onClose={onClose} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

interface SidebarHeaderProps {
  onClose: () => void;
}
function SidebarHeader({ onClose }: SidebarHeaderProps) {
  return (
    <Flex alignItems="center">
      <Heading fontWeight="bold" fontSize="xl">
        메뉴
      </Heading>
      <Spacer />
      <IconButton
        icon={<CloseIcon />}
        aria-label="close"
        variant="ghost"
        onClick={onClose}
      />
    </Flex>
  );
}

interface SidebarFooterProps {
  onClose: () => void;
}
function SidebarFooter({ onClose }: SidebarFooterProps) {
  const mailString = `forstackup@gmail.com`;
  return (
    <Box color="gray.500" fontSize="xs">
      <Text>
        Contact:{' '}
        <Link href={`mailto:${mailString}`} textDecoration="underline">
          {mailString}
        </Link>
      </Text>
      {/* <Text>Last updated on {new Date().toString()}</Text> */}
      <Text>
        본 페이지를 이용하는 경우{' '}
        <Link
          as={RouterLink}
          to="/disclaimer"
          textDecoration="underline"
          onClick={onClose}
        >
          면책 조항
        </Link>
        에 동의한 것으로 간주됩니다.
      </Text>
    </Box>
  );
}
