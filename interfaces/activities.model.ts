import { Dayjs } from 'dayjs';

export interface IActivity {
  date: Dayjs | null;
  hourBegin1: Dayjs | null;
  hourEnd1: Dayjs | null;
  hourBegin2?: Dayjs | null;
  hourEnd2?: Dayjs | null;
  description: string;
}

export interface IActivityLocalStorage {
  date: string | null;
  hourBegin1: string | null;
  hourEnd1: string | null;
  hourBegin2?: string | null;
  hourEnd2?: string | null;
  description: string;
}
