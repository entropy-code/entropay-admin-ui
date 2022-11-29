import * as React from "react"
import { Datagrid, DateField, EmailField, List, TextField, ShowButton, EditButton, Show, TabbedShowLayout, Tab, SimpleShowLayout, FunctionField} from 'react-admin';
import { Avatar, Box, Divider, Grid} from "@mui/material";
import CreateEntityLayout from "./components/forms/CreateEntityLayout";
import EditEntityLayout from "./components/forms/EditEntityLayout";

const inputsList = [
    {name: "firstName", type: "string"},
    {name: "lastName", type: "string"},
    {name: "internalId", type: "string"},
    {name: "personalEmail", type: "string"},
    {name: "phone", type: "string"},
    {name: "birthDate", type: "date"},
    {name: "taxId", type: "string"},
    {name: "personalNumber", type: "string"},
    {name: "address", type: "string"},
    {name: "state", type: "string"},
    {name: "zip", type: "string"},
    {name: "country", type: "string"},
    {name: "city", type: "string"},
    {name: "emergencyContactFullName", type: "string"},
    {name: "emergencyContactPhone", type: "string"}
]
const referenceValues = {
    source: 'profile',
    reference: 'roles',
    optionText: 'name',
    multiselect: true
}

export const EmployeeList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="internalId" label="Internal Id"/>
            <TextField source="firstName" />
            <TextField source="lastName" />  
            <EmailField source="personalEmail" />
            <TextField source="phone" />
            <TextField source="address" />
            <TextField source="city" />
            <TextField source="state" />
            <TextField source="zip" />
            <TextField source="country" />
            <DateField source="birthDate" />
            <DateField source="createdAt" />
            <DateField source="modifiedAt" />
            <EditButton variant="outlined" />
            <ShowButton variant="outlined" />
        </Datagrid>
    </List>
);

export const EmployeeEdit = () => (
    <EditEntityLayout inputsList={inputsList} referenceValues={referenceValues} />
);

export const EmployeeCreate = () => (
    <CreateEntityLayout inputsList={inputsList} referenceValues={referenceValues} />
);

export const EmployeeProfile = () => (
    <Show title="Show employee" emptyWhileLoading>     
        <Grid container direction="row" justifyContent="flex-start" alignItems="center">      
            <Grid item>
                <Box m={2}>
                    <Avatar alt="Employee" src="" sx={{ width: 100, height: 100 }}  />
                </Box>
            </Grid>
            <Grid item>                  
                <SimpleShowLayout divider={<Divider flexItem />}>            
                    <FunctionField label="" render={record => `${record.firstName} ${record.lastName}`} />
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