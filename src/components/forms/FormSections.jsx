import { TextInput, DateInput, NumberInput, SelectInput } from "react-admin";
import { Box, Typography, useMediaQuery } from "@mui/material";
import ReferenceInputItem from "./ReferenceInputItem";
import PaymentSection from "./PaymentSection";
import MultiSelectInput from "./MultiSelectInput";

const FormSection = ({ formSectionTitle, inputsList, customSections }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  return (
    <Box>
      <Typography variant="h6" color={"#2196F3"}>
        {formSectionTitle}
      </Typography>
      <Box
        m="0.5px"
        display="grid"
        gap="5px"
        gridTemplateColumns="repeat(2, minmax(0,1fr))"
        sx={{
          "& > div": {
            gridColumn: isNonMobile ? undefined : "span 4",
          },
        }}
      >
        {inputsList &&
          inputsList.map((listItem, listIndex) => {
            return (
              <Box>
                {listItem.type === "date" ? (
                  <DateInput
                    source={listItem.name}
                    label={listItem.label}
                    key={formSectionTitle + listItem.name + listIndex}
                    fullWidth
                    sx={{ gridColumn: "span 2" }}
                    required={listItem.required}
                  />
                ) : undefined}
                {listItem.type === "string" ? (
                  <TextInput
                    source={listItem.name}
                    label={listItem.label}
                    key={formSectionTitle + listItem.name + listIndex}
                    fullWidth
                    sx={{ gridColumn: "span 2" }}
                    required={listItem.required}
                  />
                ) : undefined}
                {listItem.type === "email" ? (
                  <TextInput
                    source={listItem.name}
                    label={listItem.label}
                    key={formSectionTitle + listItem.name + listIndex}
                    fullWidth
                    sx={{ gridColumn: "span 2" }}
                    type="email"
                    required={listItem.required}
                  />
                ) : undefined}
                {listItem.type === "number" ? (
                  <NumberInput
                    source={listItem.name}
                    label={listItem.label}
                    key={formSectionTitle + listItem.name + listIndex}
                    fullWidth
                    sx={{ gridColumn: "span 2" }}
                    required={listItem.required}
                  />
                ) : undefined}
                {listItem.type === "selectList" ? (
                  <SelectInput
                    source={listItem.name}
                    choices={listItem.choices}
                    fullWidth
                    sx={{ gridColumn: "span 2" }}
                    required={listItem.required}
                  />
                ) : undefined}
                {listItem.type === "multiSelect" ? (
                  <MultiSelectInput
                    referenceValues={listItem.referenceValues}
                    required={listItem.required}
                  />
                ) : undefined}
                {listItem.type === "selectInput" ? (
                  <ReferenceInputItem
                    referenceValues={listItem.referenceValues}
                  />
                ) : undefined}
              </Box>
            );
          })}
        {customSections &&
          customSections.includes("paymentInformationSection") && (
            <PaymentSection type="paymentInformation" />
          )}
        {customSections &&
          customSections.includes("paymentSettlementSection") && (
            <PaymentSection type="paymentSettlement" />
          )}
        {customSections && customSections.includes("notesSection") && (
          <TextInput multiline source="notes" fullWidth />
        )}
      </Box>
    </Box>
  );
};

export default FormSection;
