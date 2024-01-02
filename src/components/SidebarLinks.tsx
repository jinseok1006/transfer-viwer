import { Stack, Text } from '@chakra-ui/react';

import { useLocation, Link as RouterLink } from 'react-router-dom';
import { IoBarChartOutline, IoCodeSlashOutline } from 'react-icons/io5';
import { BsShieldExclamation } from 'react-icons/bs';
import { LuMessagesSquare } from 'react-icons/lu';
import { HiOutlineDocumentText } from 'react-icons/hi';

interface SidebarLinksProps {
  onClose: () => void;
}
export default function SidebarLinks({ onClose }: SidebarLinksProps) {
  return (
    <Stack spacing={2}>
      <SidebarLink
        name='경쟁률'
        to='/'
        onClose={onClose}
        icon={<IoBarChartOutline size={20} />}
      />
      <SidebarLink
        name='면접정보'
        to='/interview'
        onClose={onClose}
        icon={<LuMessagesSquare size={20} />}
      />
      <SidebarLink
        name='면책조항'
        to='/disclaimer'
        onClose={onClose}
        icon={<BsShieldExclamation size={20} />}
      />
      <SidebarLink
        name='데이터 출처'
        to='/data-source'
        onClose={onClose}
        icon={<HiOutlineDocumentText size={20} />}
        disabled
      />
      <SidebarLink
        name='오픈소스 라이선스'
        to='/license'
        onClose={onClose}
        icon={<IoCodeSlashOutline size={20} />}
        disabled
      />
    </Stack>
  );
}

interface SidebarLinkProps {
  name: string;
  to: string;
  onClose: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
}
function SidebarLink({
  name,
  to,
  onClose,
  icon,
  disabled = false,
}: SidebarLinkProps) {
  const { pathname } = useLocation();
  const pattern = new RegExp(`^${to}(\/.*)?$`);
  const actived = to === '/' ? pathname === '/' : pathname.match(pattern);

  return (
    <Stack
      direction='row'
      as={RouterLink}
      to={to}
      onClick={onClose}
      bgColor={disabled ? 'inherit' : actived ? 'gray.300' : 'inherit'}
      color={disabled ? 'gray.300' : 'inherit'}
      py={2}
      px={3}
      borderRadius={7}
      _hover={{
        bgColor: 'gray.100',
      }}
      alignItems='center'
      spacing={2}
      pointerEvents={disabled ? 'none' : 'unset'}
      userSelect='none'
    >
      {icon}
      <Text fontSize='md'>{name}</Text>
    </Stack>
  );
}
