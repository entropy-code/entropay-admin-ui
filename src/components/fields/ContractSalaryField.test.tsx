import React from "react";
import { render, screen } from "@testing-library/react";
import { RecordContextProvider } from "react-admin";
import {
  ContractSalaryField,
  formatPaymentSettlement,
} from "./ContractSalaryField";
import { IContract, IPaymentSettlement } from "../../types";

const settlement = (
  overrides: Partial<IPaymentSettlement> = {}
): IPaymentSettlement => ({
  id: "ps-1",
  salary: 50000,
  currency: "USD",
  modality: "MONTHLY",
  contractId: "c-1",
  deleted: false,
  ...overrides,
});

const contract = (
  paymentSettlement: IPaymentSettlement[] | undefined
): Partial<IContract> => ({
  id: "c-1",
  paymentSettlement: paymentSettlement as IPaymentSettlement[],
});

describe("formatPaymentSettlement", () => {
  it("formats a monthly salary as currency + amount + modality initial", () => {
    expect(formatPaymentSettlement(settlement())).toBe("USD 50000/m");
  });

  it("formats an hourly salary using the modality initial", () => {
    expect(
      formatPaymentSettlement(
        settlement({ salary: 30, currency: "ARS", modality: "HOUR" })
      )
    ).toBe("ARS 30/h");
  });

  it("shows the empty indicator when the salary is null", () => {
    expect(
      formatPaymentSettlement(settlement({ salary: null as unknown as number }))
    ).toBe("USD -/m");
  });
});

describe("ContractSalaryField", () => {
  it("shows the currency and amount for a contract with a salary", () => {
    render(
      <RecordContextProvider value={contract([settlement()])}>
        <ContractSalaryField label="Salary" />
      </RecordContextProvider>
    );
    expect(screen.getByText("USD 50000/m")).toBeInTheDocument();
  });

  it("shows a clear empty indicator when there is no payment settlement", () => {
    render(
      <RecordContextProvider value={contract([])}>
        <ContractSalaryField label="Salary" />
      </RecordContextProvider>
    );
    expect(screen.getByText("-")).toBeInTheDocument();
  });

  it("shows the empty indicator when payment settlement is missing entirely", () => {
    render(
      <RecordContextProvider value={contract(undefined)}>
        <ContractSalaryField label="Salary" />
      </RecordContextProvider>
    );
    expect(screen.getByText("-")).toBeInTheDocument();
  });

  it("renders one value per settlement when there are multiple currencies", () => {
    render(
      <RecordContextProvider
        value={contract([
          settlement({ id: "ps-1", salary: 50000, currency: "USD" }),
          settlement({
            id: "ps-2",
            salary: 30,
            currency: "ARS",
            modality: "HOUR",
          }),
        ])}
      >
        <ContractSalaryField label="Salary" />
      </RecordContextProvider>
    );
    expect(screen.getByText("USD 50000/m")).toBeInTheDocument();
    expect(screen.getByText("ARS 30/h")).toBeInTheDocument();
  });

  it("shows the empty indicator inside the value when a settlement has no salary", () => {
    render(
      <RecordContextProvider
        value={contract([settlement({ salary: null as unknown as number })])}
      >
        <ContractSalaryField label="Salary" />
      </RecordContextProvider>
    );
    expect(screen.getByText("USD -/m")).toBeInTheDocument();
  });
});
