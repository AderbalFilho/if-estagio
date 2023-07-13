import { Dayjs } from 'dayjs';

export interface IActivity {
  date: Dayjs | null;
  hourBegin1: Dayjs | null;
  hourEnd1: Dayjs | null;
  hourBegin2?: Dayjs | null;
  hourEnd2?: Dayjs | null;
  description: string;
}
