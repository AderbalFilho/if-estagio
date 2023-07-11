export interface IUser {
  name: string;
  course: string;
  semester: string;
  class: string;
  company: string;
  internshipBegin: Date | null;
  internshipEnd: Date | null;
  workload: string;
  internshipArea: string;
  teacherAdvisor: string;
  internshipSupervisor: string;
}
