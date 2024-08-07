

import { Heading, Button, Card, CardBody, Link ,Text, Box ,} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";



// create data source array using following data
// 2023: https://www.jbnu.ac.kr/kor/?menuID=139&mode=view&no=51967
// 2024: https://www.jbnu.ac.kr/kor/?menuID=139&mode=view&no=55295
// 2022: https://www.jbnu.ac.kr/kor/?menuID=139&mode=view&no=48899
// 2021: https://www.jbnu.ac.kr/kor/?menuID=139&mode=view&no=45562
// 2020:https://www.jbnu.ac.kr/kor/?menuID=139&mode=view&no=42549
const dataSource = [
  {
    year: 2024,
    link: "https://www.jbnu.ac.kr/kor/?menuID=139&mode=view&no=55295",
  },
  {
    year: 2023,
    link: "https://www.jbnu.ac.kr/kor/?menuID=139&mode=view&no=51967",
  },
  {
    year: 2022,
    link: "https://www.jbnu.ac.kr/kor/?menuID=139&mode=view&no=48899",
  },
  {
    year: 2021,
    link: "https://www.jbnu.ac.kr/kor/?menuID=139&mode=view&no=45562",
  },
  {
    year: 2020,
    link: "https://www.jbnu.ac.kr/kor/?menuID=139&mode=view&no=42549",
  },
];


export default function DataSource() {
  return (
    <Box mt={4}>
      <Heading as='h1' size='lg' mb='4'>
        데이터 출처
      </Heading>
      {/* <Text mb='4'>전북대학교 전학/전과 현황 데이터 출처입니다.</Text> */}
      {dataSource.map((data) => (
        <DataSourceCard key={data.year} year={data.year} link={data.link} />
      ))}
    </Box>
  );
}

// data source card component
function DataSourceCard({ year, link }: { year: number; link: string }) {
  return (
    <Card mb={4}>
      <CardBody>
        <Heading as='h3' size='sm'>{year}학년도</Heading>
        <Link href={link} isExternal>
          {link}
          <ExternalLinkIcon mx='2px' />
        </Link>
      </CardBody>
    </Card>
  );
}
