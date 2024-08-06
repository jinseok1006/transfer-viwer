import { Helmet } from 'react-helmet-async';

interface HeadProps {
  title: string;
}

export default function Head({ title }: HeadProps) {
  return (
    <Helmet>
      <title>{title} - 전북대학교 전학/전과 현황</title>
    </Helmet>
  );
}
