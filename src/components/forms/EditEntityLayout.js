import * as React from "react";
import { TextInput, Edit, SimpleForm, DateInput } from "react-admin";
import { Grid } from "@mui/material";
import { TextInputGroup } from "./TextInputGroup";
import ReferenceInputItem from "./ReferenceInputItem";

const EditEntityLayout = ({ inputsList, birthDate, referenceValues }) => {
  return (
    <Edit>
      <SimpleForm>
        <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {referenceValues && (
            <Grid item xs={12} sm={6} md={4}>
              <ReferenceInputItem referenceValues={referenceValues} />
            </Grid>
          )}
          <Grid item xs={12} sm={6} md={4}>
            <TextInput disabled source="id" fullWidth />
          </Grid>
          <TextInputGroup list={inputsList} />
          {birthDate && (
            <Grid item xs={12} sm={6} md={4}>
              <DateInput source="birthDate" fullWidth />
            </Grid>
          )}
        </Grid>
      </SimpleForm>
    </Edit>
  );
};

export default EditEntityLayout;
