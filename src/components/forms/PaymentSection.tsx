import React from "react";
import {
  ArrayInput,
  NumberInput,
  SelectInput,
  SimpleFormIterator,
  TextInput,
} from "react-admin";

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
            <TextInput source="platform" helperText={false} />
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
