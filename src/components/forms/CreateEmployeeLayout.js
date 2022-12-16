import * as React from "react";
import { SimpleForm, Create, ArrayInput, SimpleFormIterator, TextInput, Button } from "react-admin";
import { Grid } from "@mui/material";
import { InputsGroup } from "./InputsGroup";
import ReferenceSelectArrayInputItem from "./ReferenceSelectArrayInputItem";
import ReferenceInputItem from "./ReferenceInputItem";

const CreateEmployeeLayout = ({ inputsList, referenceValues }) => {
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
        <ArrayInput source="paymentInformation">
          <SimpleFormIterator inline disableReordering>
            <TextInput source="platform" helperText={false} />
            <TextInput source="country" helperText={false} />
            <TextInput source="cbu" helperText={false} />
          </SimpleFormIterator>
        </ArrayInput>  
        <TextInput multiline source="notes" fullWidth />
        <Grid container direction="column" justifyContent="center" alignItems="flex-end">
          <Button label="+ New Contract" alignIcon="right"/>
          <Button label="+ New Assigment" alignIcon="right"/>
        </Grid>
      </SimpleForm>
    </Create>
  );
};

export default CreateEmployeeLayout;