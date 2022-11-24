import { Avatar, Box, Divider, Grid} from "@mui/material";
import * as React from "react";
import { Show, TabbedShowLayout, Tab, TextField, DateField, SimpleShowLayout} from "react-admin";



const ShowEntityLayout = ({referenceValues }) => {
  const {reference,source} = referenceValues;
  return (
    <Show>     
       <Grid container direction="row" justifyContent="space-evenly" alignItems="center">      
          <Box m={3}>
            <Avatar alt="Employee" src="" sx={{ width: 200, height: 200 }}  />
          </Box>                  
          <SimpleShowLayout>
              <TextField source="firstName" />
              <TextField source="lastName" />
              <TextField source="personalEmail" />
              <TextField label="Current assigment" source="" />
              <DateField label="Last contract Date" source=""/>           
          </SimpleShowLayout>          
        </Grid>
      <TabbedShowLayout spacing={2} divider={<Divider flexItem />}>
        <Tab label="Personal and financial information">
            <TextField source="taxId" />
            <TextField source="phone" />
            <TextField source="address" />
            <TextField source="city" />
            <TextField source="state" />
            <TextField source="zip" />
            <TextField source="country" />
            <DateField source="birthDate" />
        </Tab>
        <Tab label="Contracts">
        </Tab>
        <Tab label="Assigments">
        </Tab>
        <Tab label="Vacations and Licencies">
        </Tab>
        <Tab label="Documents">
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
};
export default ShowEntityLayout;