export interface IPto {
    id: string;
    ptoStartDate: Date;
    ptoEndDate: Date;
    status: string;
    details: string;
    employeeId: string;
    leaveType: string;
    days: number;
    labourHours: number;
    createdAt: Date;
    modifiedAt: Date;
  }

export interface IHoliday {
  id: string | number;
  date: Date | string;
  countryId: string | number;
}

export interface IEmployeeCountry {
  id: string | number;
  countryId?: string | number;
}

export const EMPTY_HOLIDAYS = new Set<string>();