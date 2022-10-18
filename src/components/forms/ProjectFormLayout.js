import * as React from "react";
import { DateInput, SimpleForm, TextInput } from "react-admin";
import { Grid } from "@mui/material";
import ReferenceInputItem from "./ReferenceInputItem";

const ProjectFormLayout = ({ referenceValuesC, referenceValuesP }) => {
  return (
    <SimpleForm>
      <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} sm={6} md={5}>
          <ReferenceInputItem referenceValues={referenceValuesC} />
        </Grid>
        <Grid item xs={12} sm={6} md={5}>
          <ReferenceInputItem referenceValues={referenceValuesP} />
        </Grid>
        <Grid item xs={12} sm={6} md={10}>
          <TextInput source="name" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6} md={5}>
          <DateInput source="startDate" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6} md={5}>
          <DateInput source="endDate" fullWidth />
        </Grid>
        <Grid item xs={12} sm={12} md={10}>
          <TextInput source="notes" multiline fullWidth />
        </Grid>
      </Grid>
    </SimpleForm>
  );
};

export default ProjectFormLayout;
