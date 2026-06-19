import React from "react";
import { useRecordContext } from "react-admin";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { IContract, IPaymentSettlement } from "../../types";

const EMPTY_INDICATOR = "-";

/**
 * Formats a single payment settlement as `currency amount/modalityInitial`,
 * e.g. `USD 50000/m`. Mirrors the salary format used in the main Contracts
 * list so the value reads the same everywhere it is shown. When the salary is
 * not defined it renders the empty indicator (`USD -/m`).
 */
export const formatPaymentSettlement = (
  settlement: IPaymentSettlement
): string => {
  const salary =
    settlement.salary === null || settlement.salary === undefined
      ? EMPTY_INDICATOR
      : `${settlement.salary}`;
  const modality = settlement.modality
    ? `/${settlement.modality.charAt(0).toLowerCase()}`
    : "";
  return `${settlement.currency} ${salary}${modality}`;
};

interface ContractSalaryFieldProps {
  // `label` is consumed by react-admin's Datagrid/Labeled to render the column
  // header; it is intentionally not used inside the component itself.
  label?: string;
  sortable?: boolean;
}

/**
 * Renders a contract's salary by listing each of its payment settlements as a
 * chip. Reuses the currency + amount + modality format from the main Contracts
 * list. Shows a clear empty indicator (`-`) when the contract has no payment
 * settlement at all, without breaking the surrounding layout.
 */
export const ContractSalaryField = (_props: ContractSalaryFieldProps) => {
  const record = useRecordContext<IContract>();
  const settlements = record?.paymentSettlement ?? [];

  if (settlements.length === 0) {
    return <span>{EMPTY_INDICATOR}</span>;
  }

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      {settlements.map((settlement) => (
        <Chip
          key={settlement.id}
          label={formatPaymentSettlement(settlement)}
          variant="outlined"
          color="info"
          size="small"
          sx={{ margin: "4px" }}
        />
      ))}
    </Box>
  );
};
