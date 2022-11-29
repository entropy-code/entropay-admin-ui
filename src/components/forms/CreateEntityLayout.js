import * as React from "react";
import { SimpleForm, Create } from "react-admin";
import { Grid } from "@mui/material";
import { InputsGroup } from "./InputsGroup";
import ReferenceSelectArrayInputItem from "./ReferenceSelectArrayInputItem";
import ReferenceInputItem from "./ReferenceInputItem";

const CreateEntityLayout = ({ inputsList, referenceValues }) => {
  return (
    <Create>
      <SimpleForm>
        <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <InputsGroup inputsList={inputsList} />
          {referenceValues && referenceValues.multiselect && (
            <Grid item xs={12} sm={6} md={4}>
              <ReferenceSelectArrayInputItem referenceValues={referenceValues} />
            </Grid>
          )}
          {referenceValues && !referenceValues.multiselect && (
            <Grid item xs={12} sm={6} md={4}>
              <ReferenceInputItem referenceValues={referenceValues} />
            </Grid>
          )}
        </Grid>
      </SimpleForm>
    </Create>
  );
};

export default CreateEntityLayout;
