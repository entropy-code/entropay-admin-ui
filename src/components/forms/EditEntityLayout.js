import * as React from "react";
import { TextInput, Edit, SimpleForm } from "react-admin";
import { Grid } from "@mui/material";
import { InputsGroup } from "./InputsGroup";
import ReferenceSelectArrayInputItem from "./ReferenceSelectArrayInputItem";

const EditEntityLayout = ({ inputsList, referenceValues }) => {
  return (
    <Edit>
      <SimpleForm>
        <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {referenceValues && (
            <Grid item xs={12} sm={6} md={4}>
              <ReferenceSelectArrayInputItem referenceValues={referenceValues} />
            </Grid>
          )}
          <Grid item xs={12} sm={6} md={4}>
            <TextInput disabled source="id" fullWidth />
          </Grid>
          <InputsGroup inputsList={inputsList} />
        </Grid>
      </SimpleForm>
    </Edit>
  );
};

export default EditEntityLayout;
