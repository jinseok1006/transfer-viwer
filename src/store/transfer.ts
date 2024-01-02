import transferData from '../assets/transferData.json';
import { create } from 'zustand';

export interface TransferStat {
  division: string;
  data: TransferData[];
}

export type TransferData = [Year, Grade, Capacity, Applicants];
type Year = number;
type Grade = 0 | 1 | 2;
type Applicants = number;
type Capacity = number;

export const useTransferStore = create<TransferStat[]>()(
  () => transferData as TransferStat[]
);
