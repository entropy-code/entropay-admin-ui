import React from "react";
import {
  TextInput,
  ReferenceInput,
  SelectInput,
  FormDataConsumer,
  useRecordContext,
  useGetList,
  Labeled,
} from "react-admin";
import { Box, Typography } from "@mui/material";


const EducationSection = () => {
  const { data: educationLevels = [] } = useGetList("education-levels");

  return (
    <>
      <ReferenceInput
        source="education.educationLevelId"
        reference="education-levels"
        label="Education Level"
      >
        <SelectInput 
          optionText="name" 
          helperText={false}
          required
        />
      </ReferenceInput>
      <FormDataConsumer>
        {({ formData }) => {
          const selectedLevel = educationLevels.find(
            (level) => level.id === formData?.education?.educationLevelId
          );

          return (
            selectedLevel?.name === "Other (Optional)" && (
              <TextInput
                source="education.levelOther"
                label="Other (specify)"
                helperText={false}
              />
            )
          );
        }}
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
  );
};

export const EducationLevelField = () => {
  const record = useRecordContext();
  const { data: educationLevels = [] } = useGetList("education-levels");
  
  const educationLevelId = record?.education?.educationLevelId;
  const selectedLevel = educationLevels.find((level) => level.id === educationLevelId);
  const levelName = selectedLevel?.name;
  
  if (!educationLevelId) {
    return <span>-</span>;
  }
  
  if (levelName === "Other (Optional)" && record?.education?.levelOther) {
    return <span>Other: {record.education.levelOther}</span>;
  }
  
  return <span>{levelName || "-"}</span>;
};

export const EducationInstitutionField = () => {
  const record = useRecordContext();
  return <span>{record?.education?.institution || "-"}</span>;
};

export const EducationDegreeField = () => {
  const record = useRecordContext();
  return <span>{record?.education?.degree || "-"}</span>;
};

export const EducationIterator = () => {
  const record = useRecordContext();
  const education = record?.education;

  if (!education) {
    return null;
  }

  return (
    <>
      <Box sx={{ gridColumn: "span 2", mb: 3, pb: 2, borderBottom: "1px solid #e0e0e0" }}>
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 2 }}>
          <Labeled label="Education Level">
            <Typography variant="body2">
              {education.educationLevelId || "-"}
            </Typography>
          </Labeled>
          {education.levelOther && (
            <Labeled label="Other">
              <Typography variant="body2">{education.levelOther}</Typography>
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
