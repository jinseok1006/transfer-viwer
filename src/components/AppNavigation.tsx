import React, { useCallback } from 'react';
import {
  Box,
  useDisclosure,
  Flex,
  Heading,
  Spacer,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerHeader,
  Divider,
  DrawerContent,
  DrawerFooter,
  DrawerBody,
  Text,
  Link,
  Stack,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { HamburgerIcon } from '@chakra-ui/icons';

function AppNavigation() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const memoizedOnOpen = useCallback(onOpen, []);
  const memoizedOnClose = useCallback(onClose, []);

  return (
    <>
      <AppBar onOpen={memoizedOnOpen} />
      <MyDrawer isOpen={isOpen} onClose={memoizedOnClose} />
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
      <Box maxW="md" mx="auto" mb={3} bgColor="white" boxShadow="xs">
        <Flex justify="space-between" alignItems="center" py={2} px={6}>
          <Heading fontWeight="bold" size="md" as={RouterLink} to="/">
            전북대 전학/전과 현황
          </Heading>
          <Spacer />
          <IconButton
            icon={<HamburgerIcon />}
            bgColor="transparent"
            onClick={onOpen}
            aria-label="hamburger"
          />
        </Flex>
      </Box>
    </>
  );
});

interface MyDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

function MyDrawer({ isOpen, onClose }: MyDrawerProps) {
  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>Misc</DrawerHeader>
        <Divider />
        <DrawerBody>
          <Stack spacing={4}>
            <Box>
              <Heading size="md">특이사항</Heading>
              <Text>간호학과 전과허용</Text>
              <Text>수의대 전과허용</Text>
              <Text>2022년부터 4학년 전과허용</Text>
            </Box>
            <Box>
              <Heading size="md">사전시험</Heading>
              <Text>컴퓨터공학부 지필고사</Text>
            </Box>
            <Box>
              <Heading size="md">추가사항</Heading>
              <Text>복수/부전공 추가 예정(일정 미정)</Text>
            </Box>
          </Stack>
        </DrawerBody>
        <Divider />
        <DrawerFooter display="block" color="gray.500">
          <Text fontSize="xs">
            문의사항:{' '}
            <Link href="mailto:invsc@naver.com" textDecoration="underline">
              invsc@naver.com
            </Link>
          </Text>
          <Text fontSize="xs">
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
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
