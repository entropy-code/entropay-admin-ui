import React from "react";
import {
  TextInput,
  SelectInput,
  FormDataConsumer,
  useRecordContext,
  Labeled,
  FunctionField,
} from "react-admin";
import { Box, Typography } from "@mui/material";

const educationLevelChoices = [
  { id: "High School Completed", name: "High School Completed" },
  { id: "University Degree Completed", name: "University Degree Completed" },
  { id: "University Incompleted", name: "University Incompleted" },
  { id: "University In Progress", name: "University In Progress" },
  { id: "Postgraduate / Master's / PhD", name: "Postgraduate / Master's / PhD" },
  { id: "Other (Optional)", name: "Other (Optional)" },
];

// Componente para editar educación en formularios
const EducationSection = (props: { type: "education" }) => {
  return (
    <>
      {props.type === "education" && (
        <>
          <SelectInput
            source="education.level"
            label="Education Level"
            choices={educationLevelChoices}
            helperText={false}
            required
            parse={(value) => {
              // Ensure education object exists
              if (value) {
                return value;
              }
              return null;
            }}
          />
          <FormDataConsumer>
            {({ formData }) =>
              formData?.education?.level === "Other (Optional)" ? (
                <TextInput
                  source="education.levelOther"
                  label="Other (specify)"
                  helperText={false}
                />
              ) : null
            }
          </FormDataConsumer>
          <TextInput
            source="education.institution"
            label="Institution Name"
            helperText={false}
            required
          />
          <TextInput
            source="education.degree"
            label="Degree Obtained"
            helperText={false}
            required
          />
        </>
      )}
    </>
  );
};

// Componentes para visualizar educación en componentes de vista (employeeProfiles)
export const EducationLevelField = () => {
  const record = useRecordContext();
  const level = record?.education?.level;
  const levelOther = record?.education?.levelOther;
  const displayLevel = educationLevelChoices.find((choice) => choice.id === level)?.name || level || "-";
  const displayWithOther = level === "Other (Optional)" && levelOther ? `Other: ${levelOther}` : displayLevel;
  
  return (
    <FunctionField render={() => displayWithOther} />
  );
};

export const EducationInstitutionField = () => {
  const record = useRecordContext();
  return (
    <FunctionField render={() => record?.education?.institution || "-"} />
  );
};

export const EducationDegreeField = () => {
  const record = useRecordContext();
  return (
    <FunctionField render={() => record?.education?.degree || "-"} />
  );
};

// Componente para visualizar educación en formularios de vista (FormViewSections)
export const EducationIterator = () => {
  const record = useRecordContext();
  const education = record?.education;

  if (!education) {
    return null;
  }

  let displayLevel = educationLevelChoices.find((choice) => choice.id === education.level)?.name || education.level || "-";
  
  if (displayLevel === "Other (Optional)") {
    displayLevel = "Other:";
  }

  return (
    <>
      <Box sx={{ gridColumn: "span 2", mb: 3, pb: 2, borderBottom: "1px solid #e0e0e0" }}>
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 2 }}>
          <Labeled label="Education Level">
            <Typography variant="body2">
              {displayLevel === "Other:" && education.levelOther ? `${displayLevel} ${education.levelOther}` : displayLevel}
            </Typography>
          </Labeled>
          {displayLevel !== "Other:" && (
            <Labeled label="Other">
              <Typography variant="body2">{education.levelOther || "-"}</Typography>
            </Labeled>
          )}
          <Labeled label="Institution Name">
            <Typography variant="body2">{education.institution || "-"}</Typography>
          </Labeled>
          <Labeled label="Degree Obtained">
            <Typography variant="body2">{education.degree || "-"}</Typography>
          </Labeled>
        </Box>
      </Box>
    </>
  );
};

export default EducationSection;
