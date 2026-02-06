import React, { useEffect } from "react";
import {
  ArrayInput,
  NumberInput,
  SelectInput,
  SimpleFormIterator,
  TextInput,
  AutocompleteInput,
  useRecordContext,
} from "react-admin";
import { useFormContext } from "react-hook-form";

const PaymentPlatform = [
  { name: 'Banco USA' },
  { name: 'Banco internacional' },
  { name: 'Mural' },
];

const PaymentSettlementSection = () => {
  const record = useRecordContext();
  const { watch, setValue, getValues } = useFormContext();
  const paymentSettlement = watch('paymentSettlement');
  
  // Initialize on mount if empty
  useEffect(() => {
    const currentValue = getValues('paymentSettlement');
    if (!currentValue || currentValue.length === 0) {
      // Use setTimeout to ensure the form is fully initialized
      setTimeout(() => {
        setValue('paymentSettlement', [{}], { shouldValidate: false, shouldDirty: false });
      }, 0);
    }
  }, [record?.id]); // Re-run when record id changes (edit mode)
  
  // Ensure at least one item remains after clear
  useEffect(() => {
    if (paymentSettlement && paymentSettlement.length === 0) {
      setValue('paymentSettlement', [{}], { shouldValidate: false, shouldDirty: false });
    }
  }, [paymentSettlement, setValue]);
  
  const currentLength = paymentSettlement?.length || 0;
  
  return (
    <ArrayInput
      source="paymentSettlement"
      fullWidth
      sx={{ gridColumn: "span 2" }}
    >
      <SimpleFormIterator 
        inline 
        disableReordering 
        disableRemove={currentLength <= 1}
      >
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
  );
};

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
        <PaymentSettlementSection />
      )}
    </>
  );
};
export default PaymentSection;
