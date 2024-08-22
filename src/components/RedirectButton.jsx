import { Button } from "@mui/material";
import { useRedirect } from "react-admin";

const RedirectButton = ({ form, resource, text, recordId, record, source }) => {
  let recordToDisplay;
  const redirect = useRedirect();
  const handleClick = () => {
    if (record !== undefined && resource === "contracts") {
      recordToDisplay = {
        employeeId: recordId,
        companyId: record.companyId,
        contractType: record.contractType,
        startDate: record.startDate,
        endDate: record.endDate,
        roleId: record.roleId,
        seniorityId: record.seniorityId,
        hoursPerMonth: record.hoursPerMonth,
        vacations: record.vacations,
        benefits: record.benefits,
        paymentSettlement: record.paymentSettlement,
        endReason: record.endReason,
        notes: record.notes,
        source: source,
      };
    } else if (record !== undefined && resource === "assignments") {
      recordToDisplay = {
        employeeId: recordId,
        billableRate: record.billableRate,
        currency: record.currency,
        startDate: record.startDate,
        hoursPerMonth: record.hoursPerMonth,
        endDate: record.endDate,
        labourHours: record.labourHours,
        projectId: record.projectId,
        roleId: record.roleId,
        seniorityId: record.seniorityId,
        endReason: record.endReason,
<<<<<<< HEAD
        source: source,
      };
    } else if (record !== undefined && resource === "overtime") {
      recordToDisplay = {
        id: record.id,
        date: record.date,
        hours: record.hours,
        details: record.details,
        employeeId: recordId,
=======
>>>>>>> 4cdc267fbd1d0b57ac9297ed6ed9403a0a340caa
        source: source,
      };
    } else {
      recordToDisplay = {
        employeeId: recordId,
        source: source,
      };
    }
    redirect(form, resource, 1, {}, { record: recordToDisplay });
  };
  return (
    <Button variant="text" onClick={handleClick}>
      {text}
    </Button>
  );
};

export default RedirectButton;
