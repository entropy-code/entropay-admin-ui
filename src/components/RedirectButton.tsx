import React from "react";
import { Button } from "@mui/material";
import { useRedirect } from "react-admin";

const RedirectButton = ({
  form,
  resource,
  text,
  recordId,
  record,
  source,
}: {
  form: string;
  resource: string;
  text: string;
  recordId: string;
  record?: any | undefined;
  source: string;
}) => {
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
