import { useAsync } from '../hooks/useAsync';
import axios from 'axios';

export interface TransferStat {
  division: string;
  data: TransferData[];
}

type TransferData = [Year, Grade, Capacity, Applicants];
type Year = number;
type Grade = 0 | 1 | 2;
type Applicants = number;
type Capacity = number;

const fetchTrasnferList = async (): Promise<TransferStat[]> => {
  const { protocol, host } = window.location;
  return (await axios.get(`${protocol}//${host}/transfer.min.json`)).data;
};

export const useTransferStore = useAsync(fetchTrasnferList);
