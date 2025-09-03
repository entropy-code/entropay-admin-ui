import React from "react";
import {
  ArrayInput,
  NumberInput,
  SelectInput,
  SimpleFormIterator,
  TextInput,
  AutocompleteInput,
} from "react-admin";

const PaymentPlatform = [
  { name: 'Bitwage' },
  { name: 'Dolares en Tucuman' },
  { name: 'Mixto ars y usd en Tuc' },
  { name: 'Banco USA' },
  { name: 'Banco internacional' },
  { name: 'Mural' },
  { name: 'Dólares en BA' },
  { name: 'Payoneer' },
];
const PaymentSection = (type: {
  type: "paymentInformation" | "paymentSettlement";
}) => {
  return (
    <>
      {type.type === "paymentInformation" && (
        <ArrayInput
          source="paymentInformation"
          fullWidth
          sx={{ gridColumn: "span 2" }}
        >
          <SimpleFormIterator inline disableReordering>
            <AutocompleteInput
              source="platform"
              choices={PaymentPlatform}
              optionText="name"
              optionValue="name"
            />
            <TextInput source="country" helperText={false} />
            <TextInput
              source="cbu"
              label="ID/Alias/Account Number"
              helperText={false}
            />
            <TextInput
              source="routingNumber"
              label="Routing number"
              helperText={false}
            />
          </SimpleFormIterator>
        </ArrayInput>
      )}
      {type.type === "paymentSettlement" && (
        <ArrayInput
          source="paymentSettlement"
          fullWidth
          sx={{ gridColumn: "span 2" }}
        >
          <SimpleFormIterator inline disableReordering>
            <SelectInput
              source="modality"
              choices={[
                { id: "HOUR", name: "Hour" },
                { id: "MONTHLY", name: "Monthly" },
              ]}
              required={true}
            />
            <NumberInput source="salary" required={true} />
            <SelectInput
              source="currency"
              choices={[
                { id: "USD", name: "USD - United States dollar" },
                { id: "ARS", name: "ARS - Argentine peso" },
              ]}
              required={true}
            />
          </SimpleFormIterator>
        </ArrayInput>
      )}
    </>
  );
};
export default PaymentSection;
