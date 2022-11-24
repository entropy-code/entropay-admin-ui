import { Avatar, Box, Divider, Grid} from "@mui/material";
import * as React from "react";
import { Show, TabbedShowLayout, Tab, TextField, DateField, SimpleShowLayout} from "react-admin";



const ShowEntityLayout = () => {
  return (
    <Show title="Show employee" emptyWhileLoading>     
       <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start">      
          <Grid item>
            <Box m={2}>
              <Avatar alt="Employee" src="" sx={{ width: 85, height: 85 }}  />
            </Box>
          </Grid>
          <Grid item>                  
            <SimpleShowLayout divider={<Divider flexItem />}>            
                <TextField label= "" source="firstName" />
                <TextField label= "" source="lastName" />
                <TextField label= "" source="personalEmail" />                                  
            </SimpleShowLayout>
          </Grid>
          <Grid item>
            <SimpleShowLayout divider={<Divider flexItem />}>
              <TextField label="Current assigment" source="" />
              <DateField label="Hired Date" source=""/>
            </SimpleShowLayout>   
          </Grid>          
        </Grid>
      <TabbedShowLayout>
        <Tab label="Personal and financial information">
            <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start" >
              <SimpleShowLayout divider={<Divider flexItem />}>
                <TextField source="taxId" />
                <TextField source="phone" />
                <TextField source="address" />
                <TextField source="city" />                
              </SimpleShowLayout>
              <SimpleShowLayout divider={<Divider flexItem />}>
                <TextField source="state" />
                <TextField source="zip" />
                <TextField source="country" />
                <DateField source="birthDate" />
              </SimpleShowLayout>              
            </Grid>
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