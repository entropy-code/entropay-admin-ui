import React from "react";
import {
  ArrayInput,
  NumberInput,
  SelectInput,
  SimpleFormIterator,
  TextInput,
  AutocompleteInput,
  useRecordContext,
  required,
} from "react-admin";
import { useFormContext } from "react-hook-form";

const PaymentPlatform = [
  { name: 'Banco USA' },
  { name: 'Banco internacional' },
  { name: 'Mural' },
];

const validateRequiredField = (value: any, allValues: any) => {
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return 'This field is required';
  }
  return undefined;
};

const validatePaymentArray = (value: any) => {
  console.log('validatePaymentArray called with:', value);
  
  if (!value || !Array.isArray(value) || value.length === 0) {
    console.log('No payment array found');
    return undefined; // Permitir array vacío
  }
  
  const firstPayment = value[0];
  if (!firstPayment) {
    console.log('No first payment found');
    return undefined;
  }
  
  // Verificar si el primer elemento tiene algún dato
  const hasAnyValue = firstPayment.platform || firstPayment.country || firstPayment.cbu || firstPayment.routingNumber;
  
  if (!hasAnyValue) {
    console.log('First payment is completely empty');
    return undefined; // Permitir primer elemento vacío
  }
  
  // Si tiene algún dato, validar que platform y country estén presentes
  if (!firstPayment.platform || (typeof firstPayment.platform === 'string' && firstPayment.platform.trim() === '')) {
    console.log('Platform is missing or empty');
    return 'Platform is required when payment information is provided';
  }
  
  if (!firstPayment.country || (typeof firstPayment.country === 'string' && firstPayment.country.trim() === '')) {
    console.log('Country is missing or empty');
    return 'Country is required when payment information is provided';
  }
  
  console.log('Payment validation passed');
  return undefined;
};

const PaymentSection = (type: {
  type: "paymentInformation" | "paymentSettlement";
}) => {
  const record = useRecordContext();
  const { clearErrors } = useFormContext();
  
  // Siempre inicializar con un elemento para forzar validación
  const defaultPaymentInfo = (!record || !record.paymentInformation || record.paymentInformation.length === 0)
    ? [{ platform: '', country: '', cbu: '', routingNumber: '' }]
    : undefined;

  return (
    <>
      {type.type === "paymentInformation" && (
        <ArrayInput
          source="paymentInformation"
          fullWidth
          sx={{ gridColumn: "span 2" }}
          defaultValue={defaultPaymentInfo}
        >
          <SimpleFormIterator inline disableReordering>
            <AutocompleteInput
              source="platform"
              choices={PaymentPlatform}
              optionText="name"
              optionValue="name"
              validate={required('Platform is required')}
              onChange={() => clearErrors('paymentInformation.0.platform')}
            />
            <TextInput 
              source="country" 
              helperText={false} 
              validate={required('Country is required')}
              onChange={() => clearErrors('paymentInformation.0.country')}
            />
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
