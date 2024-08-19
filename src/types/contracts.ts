export interface IContract {
  id: string;
  companyId: string;
  employeeId: string;
  roleId: string;
  seniorityId: string;
  hoursPerMonth: number;
  vacations: number;
  startDate: Date;
  endDate: Date;
  benefits: string;
  notes: string;
  contractType: string;
  paymentSettlement: IPaymentSettlement[];
  endReasonId: string;
  deleted: boolean;
  active: boolean;
  createdAt: Date;
  modifiedAt: Date;
}

export interface IPaymentSettlement {
  id: string;
  salary: number;
  currency: string;
  modality: string;
  contractId: string;
  deleted: boolean;
}
