import axios from 'axios';
import { useAsync } from '../hooks/useAsyncCreate';

interface ISemasterRate {
  semaster: number;
  year: number;
  division: string;
  capacity: number;
  applicants: number;
  rate: number;
}

interface ISemasterScore {
  semaster: number;
  year: number;
  division: string;
  capacity: number;
  avgScore: number;
  minScore: number;
}
type ISemaster = ISemasterRate | ISemasterScore;

interface DobuleMajorData {
  division: string;
  semastersData: Omit<ISemaster, 'division'>[];
}

const fetchDoubleMajorList = async (): Promise<DobuleMajorData[]> => {
  const { protocol, host } = window.location;
  return (await axios.get(`${protocol}//${host}/double.json`)).data;
};

export const useDobuleMajorStore = useAsync(fetchDoubleMajorList);
