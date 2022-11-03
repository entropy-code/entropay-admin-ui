import * as React from "react";
import { SimpleForm, Create } from "react-admin";
import { Grid } from "@mui/material";
import { TextInputGroup } from "./TextInputGroup";
import ReferenceInputItem from "./ReferenceInputItem";

const CreateEntityLayout = ({ inputsList, referenceValues }) => {
  return (
    <Create>
      <SimpleForm>
        <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {referenceValues && (
            <Grid item xs={12} sm={6} md={4}>
              <ReferenceInputItem referenceValues={referenceValues} />
            </Grid>
          )}
          <TextInputGroup inputsList={inputsList} />
        </Grid>
      </SimpleForm>
    </Create>
  );
};

export default CreateEntityLayout;
