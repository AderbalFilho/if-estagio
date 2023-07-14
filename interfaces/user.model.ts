import { Dayjs } from 'dayjs';

export interface IUser {
  name: string;
  course: string;
  semester: string;
  class: string;
  company: string;
  internshipBegin: Dayjs | null;
  internshipEnd: Dayjs | null;
  workload: string;
  internshipArea: string;
  teacherAdvisor: string;
  internshipSupervisor: string;
}
