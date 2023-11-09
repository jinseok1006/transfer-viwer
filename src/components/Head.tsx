import { Helmet } from 'react-helmet-async';

interface HeadProps {
  title: string;
}

export default function Head({ title }: HeadProps) {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
}
