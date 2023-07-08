export interface IUser {
  name: string;
  course: string;
  semester: string;
  class: string;
  company: string;
  internshipBegin: Date | null;
  internshipEnd: Date | null;
  workload: number;
  internshipArea: string;
  teacherAdvisor: string;
  internshipSupervisor: string;
}
