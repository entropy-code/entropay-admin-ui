export interface IAssignment {
  id: string;
  projectId: string;
  employeeId: string;
  roleId: string;
  seniorityId: string;
  hoursPerMonth: number;
  labourHours: string;
  billableRate: number;
  currency: string;
  startDate: Date;
  endDate: null | Date;
  deleted: boolean;
  active: boolean;
  createdAt: Date;
  modifiedAt: Date; 
}
