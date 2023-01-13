import { ArrayInput, SimpleFormIterator, TextInput } from "react-admin";

const PaymentSection = () => {
  return (
    <ArrayInput
      source="paymentInformation"
      fullWidth
      sx={{ gridColumn: "span 2" }}
    >
      <SimpleFormIterator inline disableReordering>
        <TextInput source="platform" helperText={false} />
        <TextInput source="country" helperText={false} />
        <TextInput source="cbu" label= "ID/Alias/Account Number" helperText={false} />
      </SimpleFormIterator>
    </ArrayInput>
  );
};

export default PaymentSection;
