import {
  TextInput,
  DateInput,
  NumberInput,
  SelectInput,
  useLocaleState,
  BooleanInput,
  FormDataConsumer,
  ReferenceInput,
  TextField,
  ReferenceField,
  useDataProvider,
} from "react-admin";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useWatch } from 'react-hook-form';
import ReferenceInputItem from "./ReferenceInputItem";
import PaymentSection from "./PaymentSection";
import MultiSelectInput from "./MultiSelectInput";
import AvailableVacationDays from "./AvailableVacationDays";
import { useGetList } from 'react-admin';
import { useEffect, useState } from "react";

const FormSection = ({ formSectionTitle, inputsList, customSections }) => {
  const [filteredChoices, setFilteredChoices] = useState([]);
  const [locale] = useLocaleState();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const employee = useWatch("Employee");
  const assignmentId = useWatch({ name: "assignmentId" });
  const [projectName, setProjectName] = useState("");
  const dataProvider = useDataProvider();
  const { data: choices, isPending: isPendingChoices } = useGetList('assignments');


  useEffect(() => {
    if (!isPendingChoices && employee?.employeeId && choices) {
      const filtered = choices.filter(item => item.employeeId === employee.employeeId);
      setFilteredChoices(filtered);
    }
  }, [choices, isPendingChoices, employee])

  useEffect(() => {
    if (assignmentId) {
      console.log("Assignment ID:", assignmentId);
      // Consultar el assignment para obtener el projectId
      dataProvider.getOne('assignments', { id: assignmentId })

        .then(({ data }) => {
          console.log("Assignment data:", data)
          // Consultar el proyecto para obtener el nombre
          return dataProvider.getOne('projects', { id: data.projectId });
        })
        .then(({ data }) => {
          console.log("Project Name:", data.name);
          setProjectName(data.name); // Establecer el nombre del proyecto
        })
        .catch(error => {
          console.error("Error fetching project name:", error);
        });
    }
  }, [assignmentId, dataProvider]);


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
                {listItem.type === "date" ? (
                  <DateInput
                    source={listItem.name}
                    label={listItem.label}
                    key={formSectionTitle + listItem.name + listIndex}
                    fullWidth
                    sx={{ gridColumn: "span 2" }}
                    required={listItem.required}
                    locales={locale}
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
                {listItem.type === "selectInputAssignment" ? (
                  <ReferenceInput source="assignmentId" reference="assignments" >
                    <SelectInput
                      choices={filteredChoices}
                      optionText="id"
                      source="assignmentId"
                    />
                  </ReferenceInput>
                ) : undefined}
                {listItem.type === "customProjectNameDisplay" && assignmentId && (
                    <Box sx={{ gridColumn: "span 2", padding: '8px 0' }}>
                    <div style={{ color: '#666', fontSize: '14px' }}>
                      Project Name:
                    </div>
                    <div style={{color: '#666', fontSize: '18px', marginTop: '4px' }}>
                      {projectName || 'Loading...'}
                    </div>
                  </Box>
                )}

                {listItem.type === "boolean" ? (
                  <BooleanInput
                    source={listItem.name}
                    label={listItem.label}
                    defaultValue={listItem.defaultValue ?? true}
                  />
                ) : undefined}
                {listItem.type === "conditionNumberField" ? (
                  <FormDataConsumer>
                    {({ formData, ...rest }) => formData[listItem.conditionField] &&
                      <NumberInput
                        source={listItem.name}
                        label={listItem.label}
                        key={formSectionTitle + listItem.name + listIndex}
                        fullWidth
                        sx={{ gridColumn: "span 2" }}
                        required={listItem.required}
                      />
                    }
                  </FormDataConsumer>
                ) : undefined}
                {formSectionTitle === 'Available Vacation Days' && !employee?.employeeId && <p style={{ paddingLeft: '12px' }}>None user selected</p>}
                {listItem.type === "textField" && employee?.employeeId && (<AvailableVacationDays user={employee} />)}
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
          <TextInput multiline source="notes" />
        )}
        {customSections && customSections.includes("activeSection") && (
          <BooleanInput
            source="active"
            label="Active"
            defaultValue={true}
            sx={{
              "& .MuiFormControlLabel-root": {
                justifyContent: "center",
              },
            }}
          />
        )}
      </Box>

    </Box>
  );
};

export default FormSection;
