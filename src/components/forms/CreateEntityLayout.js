import * as React from "react";
import { SimpleForm, Create, DateInput } from "react-admin";
import { Grid } from "@mui/material";
import { TextInputGroup } from "./TextInputGroup";
import ReferenceInputItem from "./ReferenceInputItem";

const CreateEntityLayout = ({ inputsList, birthDate, referenceValues }) => {
  return (
    <Create>
      <SimpleForm>
        <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {referenceValues && (
            <Grid item xs={12} sm={6} md={4}>
              <ReferenceInputItem referenceValues={referenceValues} />
            </Grid>
          )}
          <TextInputGroup list={inputsList} />
          {birthDate && (
            <Grid item xs={12} sm={6} md={4}>
              <DateInput source="birthDate" fullWidth />
            </Grid>
          )}
        </Grid>
      </SimpleForm>
    </Create>
  );
};

export default CreateEntityLayout;
