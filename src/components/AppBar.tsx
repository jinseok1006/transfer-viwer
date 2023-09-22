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
} from '@chakra-ui/react';
import { HamburgerIcon, ExternalLinkIcon } from '@chakra-ui/icons';

export default function AppBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box maxW="md" mx="auto" mb={3} bgColor="white" boxShadow="xs">
        <Flex justify="space-between" alignItems="center" py={2} px={6}>
          <Heading fontWeight="bold" size="md">
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
      <Drawer isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Misc</DrawerHeader>
          <Divider />
          <DrawerBody>
            <Box>
              <Heading size="md">허가 중 특이사항</Heading>
              <Text>간호학과 전과허용</Text>
              <Text>수의대 전과허용</Text>
              <Text>수학교육과 일부허용</Text>
              <Text>2022년부터 4학년 전과허용</Text>
            </Box>
            <Box>
              <Heading size="md">사전 시험</Heading>
              <Text>컴퓨터공학과 지필시험</Text>
            </Box>
            <Box>
              <Heading size="md">추가사항</Heading>
              <Text>복수/부 전공 추가 예정(일정 미정)</Text>
            </Box>
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
                href="/disclaimer.html"
                textDecoration="underline"
                target="_blank"
              >
                면책 조항
                <ExternalLinkIcon />
              </Link>
              에 동의한 것으로 간주됩니다.
            </Text>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
