import { useAsync } from '../hooks/useAsync';
import transferData from '../assets/transfer.min.json';

export interface TransferStat {
  division: string;
  data: TransferData[];
}

type TransferData = [Year, Grade, Capacity, Applicants];
type Year = number;
type Grade = 0 | 1 | 2;
type Applicants = number;
type Capacity = number;

const fetchTrasnferList = async () => transferData as TransferStat[];

export const useTransferStore = useAsync(fetchTrasnferList);
