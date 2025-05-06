import React from "react";
import {
  TextInput,
  DateInput,
  NumberInput,
  SelectInput,
  BooleanInput,
  FormDataConsumer,
} from "react-admin";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useWatch } from "react-hook-form";
import ReferenceInputItem from "./ReferenceInputItem";
import PaymentSection from "./PaymentSection";
import ChildrenSection from "./ChildrenSection";
import MultiSelectInput from "./MultiSelectInput";
import AvailableVacationDays from "./AvailableVacationDays";
import NestedReferenceInput from "./NestedReferenceInput";
import { RichTextInput } from 'ra-input-rich-text';

const FormSection = ({
  formSectionTitle,
  inputsList,
  customSections,
}: {
  formSectionTitle: string;
  inputsList: any[];
  customSections: string[];
}) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  // TODO: check this watch
  // @ts-ignore
  const employee = useWatch("Employee");

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
              <Box key={`box-${listIndex}`}>
                {listItem.name === "activeSection" && (
                  <BooleanInput
                    source="active"
                    label="Active"
                    defaultValue={true}
                    sx={{
                      "& .MuiFormControlLabel-root": {
                        justifyContent: "center",
                        padding: "10px 0 0 10px",
                      },
                    }}
                  />
                )}
                {listItem.type === "date" ? (
                  <DateInput
                    source={listItem.name}
                    label={listItem.label}
                    key={formSectionTitle + listItem.name + listIndex}
                    fullWidth
                    sx={{ gridColumn: "span 2" }}
                    required={listItem.required}
                    parse={val => {
                      //Workaround to fix issue with dates when using negative time zones like ARG
                      if(val){
                      const date = new Date(val);
                      return date.toISOString().split('T')[0]; 
                      }
                    }}
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
                {listItem.type === "richString" ? (
                  <RichTextInput
                    source={listItem.name}
                    label={listItem.label}
                    key={formSectionTitle + listItem.name + listIndex}
                    sx={{ gridColumn: "span 2", width: "100%" }}
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
                  />
                ) : undefined}
                {listItem.type === "selectInput" ? (
                  <ReferenceInputItem
                    referenceValues={listItem.referenceValues}
                  />
                ) : undefined}
                {listItem.type === "nestedReferenceInput" ? (
                  <NestedReferenceInput
                    referenceValues={listItem.referenceValues}
                  />
                ) : undefined}
                {listItem.type === "boolean" ? (
                  <BooleanInput
                    source={listItem.name}
                    label={listItem.label}
                    defaultValue={listItem.defaultValue ?? true}
                  />
                ) : undefined}
                {listItem.type === "conditionNumberField" ? (
                  <FormDataConsumer>
                    {({ formData }) =>
                      formData[listItem.conditionField] && (
                        <NumberInput
                          source={listItem.name}
                          label={listItem.label}
                          key={formSectionTitle + listItem.name + listIndex}
                          fullWidth
                          sx={{ gridColumn: "span 2" }}
                          required={listItem.required}
                        />
                      )
                    }
                  </FormDataConsumer>
                ) : undefined}
                {formSectionTitle === "Available Vacation Days" &&
                  !employee?.employeeId && (
                    <p style={{ paddingLeft: "12px" }}>None user selected</p>
                  )}
                {listItem.type === "textField" && employee?.employeeId && (
                  <AvailableVacationDays
                    user={employee as { employeeId: string }}
                  />
                )}
              </Box>
            );
          })}
        {customSections && customSections.includes("childrenSection") && (
          <ChildrenSection type="children" />
        )}
        {customSections &&
          customSections.includes("paymentInformationSection") && (
            <PaymentSection type="paymentInformation" />
          )}
        {customSections &&
          customSections.includes("paymentSettlementSection") && (
            <PaymentSection type="paymentSettlement" />
          )}
        {customSections && customSections.includes("notesSection") && (
          <TextInput multiline source="notes" />
        )}
      </Box>

    </Box>
  );
};

export default FormSection;
