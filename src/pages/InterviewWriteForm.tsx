import React from 'react';
import {
  Box,
  Stack,
  Select,
  RadioGroup,
  Radio,
  Card,
  CardBody,
  Button,
  Wrap,
  Textarea,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Modal,
} from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';
import NotFound from './NotFound';
import { COLLEGE_INDEX } from '../../assets/collegeIndex';
import { contains } from '../utils';

const YEARS = [2020, 2021, 2022, 2023, 2024];
const GRADES = [2, 3, 4];

export default function InterviewWriteForm() {
  const [searchParams] = useSearchParams();
  const division = searchParams.get('division');

  if (!division) return <NotFound />;
  if (!COLLEGE_INDEX.some((col) => contains(col.divisions, division)))
    return <NotFound />;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const urlSearchParams = new URLSearchParams(
      Array.from(formData) as string[][]
    );

    const resp = await fetch('http://localhost:3000', {
      method: 'post',
      body: urlSearchParams,
    });

    const data = await resp.json();
    console.log(data);
  };

  return (
    <Card mt={5}>
      <CardBody>
        <form onSubmit={onSubmit}>
          <Stack direction='column' spacing={3}>
            <FormControl isRequired>
              <FormLabel fontWeight='bold' mb={2}>
                전공
              </FormLabel>
              <Select name='division'>
                <option>{division}</option>
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontWeight='bold' mb={2}>
                지원정보
              </FormLabel>
              <Wrap>
                <Box w='40%'>
                  <Select placeholder='지원년도' name='year'>
                    <option value='private'>연도 비공개</option>
                    {YEARS.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </Select>
                </Box>
                <Box w='40%'>
                  <Select placeholder='지원학년' name='grade'>
                    {GRADES.map((grade) => (
                      <option key={grade} value={grade}>
                        {grade}학년
                      </option>
                    ))}
                  </Select>
                </Box>
                <Box w='60%'>
                  <Select placeholder='평균평점' name='score'>
                    <option value='private'>평점 비공개</option>
                    <option value='less3'>3점대 미만</option>
                    <option value='early3'>3점대 초반</option>
                    <option value='mid3'>3점대 중반</option>
                    <option value='late3'>3점대 후반</option>
                    <option value='early4'>4점대 초반</option>
                    <option value='late4'>4점대 후반</option>
                  </Select>
                </Box>
              </Wrap>
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontWeight='bold' mb={2}>
                전공 선수강 여부
              </FormLabel>
              <RadioGroup name='takeLecture'>
                <Wrap>
                  <Radio value='true'>수강</Radio>
                  <Radio value='false'>미수강</Radio>
                </Wrap>
              </RadioGroup>
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontWeight='bold' mb={2}>
                면접 전략
              </FormLabel>
              <Textarea
                name='body'
                h='220px'
                placeholder='어떻게 준비하면 좋을까요?'
              ></Textarea>
            </FormControl>
          </Stack>

          <Box pt={3}>
            <Button width='100%' type='submit'>
              등록하기
            </Button>
          </Box>
          {/* 얼럿 다이얼로그 추가 */}
        </form>
      </CardBody>
    </Card>
  );
}
