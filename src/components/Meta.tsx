import { Helmet } from 'react-helmet-async';

interface Metadata {
  title: string;
  description?: string;
}

export default function Meta({ title, description }: Metadata) {
  const desc = description ?? '';
  return (
    <Helmet>
      <title>{title}</title>
      <meta
        name="keywords"
        content="전북대학교, JBNU, 전학, 전과, 복수전공, 부전공"
      />
      <meta name="description" content={desc} />
      <meta name="og:site_name" content="inging" />
      <meta name="og:title" content={title} />
      <meta name="og:description" content={desc} />
    </Helmet>
  );
}
