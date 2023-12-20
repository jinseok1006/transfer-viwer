// 복수전공 데이터 추가

import { useEffect } from 'react';
import { useDobuleMajorStore } from '../store/doubleMajor';

export function DoubleTest() {
  const { loading, data, error, fetchData } = useDobuleMajorStore();

  useEffect(() => {
    fetchData();
  }, []);

  if (loading && !data) {
    return <div>로딩중</div>;
  }

  if (error) {
    return <div>에러발생</div>;
  }

  return <div>{JSON.stringify(data)}</div>;
}
