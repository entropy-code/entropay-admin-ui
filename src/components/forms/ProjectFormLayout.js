import * as React from "react";
import { SimpleForm } from "react-admin";
import { Grid } from "@mui/material";
import ReferenceInputItem from "./ReferenceInputItem";
import { TextInputGroup } from "./TextInputGroup";

const ProjectFormLayout = ({ inputsList, clientReferences, projectReferences }) => {
  return (
    <SimpleForm>
      <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} sm={6} md={6}>
          <ReferenceInputItem referenceValues={clientReferences} />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <ReferenceInputItem referenceValues={projectReferences} />
        </Grid>
        <TextInputGroup inputsList={inputsList} />
      </Grid>
    </SimpleForm>
  );
};

export default ProjectFormLayout;
