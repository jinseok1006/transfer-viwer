import { Text, Stack, Card, CardBody } from '@chakra-ui/react';
import { COLLEGE_INDEX } from '../../assets/collegeIndex';
import { Link } from 'react-router-dom';
export default function InterviewIndex() {
  const divisions = COLLEGE_INDEX.map((col) => col.divisions).reduce(
    (pre, divs) => [...pre, ...divs],
    [] as string[]
  );

  return (
    <Stack direction='column' spacing={4} mt={3}>
      {divisions.map((div) => (
        <Link to={div}>
          <Card>
            <CardBody>
              <Text fontWeight='bold'>{div}</Text>
            </CardBody>
          </Card>
        </Link>
      ))}
    </Stack>
  );
}
