import * as React from "react"
import { Datagrid, List, TextField, ShowButton, EditButton, Show, SimpleShowLayout, FunctionField, DateField, Tab, ArrayField, TopToolbar, CreateButton, ExportButton, TabbedShowLayout, RecordContextProvider, useListContext} from 'react-admin';
import EditEmployeeLayout from "./components/forms/EditEmployeeLayout";
import CreateEmployeeLayout from "./components/forms/CreateEmployeeLayout";
import { Card, CardContent, CardMedia, CardActions, Typography, Avatar, Box, Divider, Grid } from '@mui/material';

const inputsList = [
    {name: "firstName", type: "string"},
    {name: "lastName", type: "string"},
    {name: "internalId", type: "string"},
    {name: "personalEmail", type: "string"},
    {name: "phoneNumber", type: "string"},
    {name: "mobileNumber", type: "string"},
    {name: "birthDate", type: "date"},
    {name: "taxId", type: "string"},
    {name: "personalNumber", type: "string"},
    {name: "address", type: "string"},
    {name: "state", type: "string"},
    {name: "zip", type: "string"},
    {name: "country", type: "string"},
    {name: "city", type: "string"},
    {name: "healthInsurance", type: "string"},
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
    <List sort={{ field: 'internalId', order: 'ASC' }}
        perPage={20}
        pagination={false}
        component="div"
        actions={false}>
        <TopToolbar sx={{ minHeight: { sm: 56 } }}>
            <CreateButton />
            <ExportButton />
        </TopToolbar>
        <EmployeeCards />
    </List>
);

const EmployeeCards = () => {
    const { data, isLoading } = useListContext();
    if (isLoading) {
        return null;
    }
    return (
        <Grid container spacing={1} sx={{ marginTop: '1em' }}>
            {data.map(record => (
                <RecordContextProvider key={record.internalId} value={record}>
                    <Grid
                        xs={2}
                        item
                    >
                        <Card sx={{ maxWidth: 300 }}>
                            {/*Profile image hardcoded until photo upload feature is in palce*/}
                            <CardMedia
                                component="img"
                                height="200"
                                image="https://entropay-assets.s3.amazonaws.com/messi.jpg"
                            />

                            <CardContent sx={{ padding: 1 }}>
                                <Typography
                                    variant="h5"
                                    component="h5"
                                    align="center"
                                >
                                    {`${record.firstName} ${record.lastName} (${record.internalId})`}
                                </Typography>
                                <Typography
                                    align="center"
                                >
                                    {record.personalEmail}
                                </Typography>
                                <CardActions>
                                    <ShowButton />
                                    <EditButton />
                                </CardActions>
                            </CardContent>
                        </Card>
                    </Grid>
                </RecordContextProvider>
            ))}
        </Grid>
    );
};


export const EmployeeEdit = () => (
    <EditEmployeeLayout inputsList={inputsList} referenceValues={referenceValues} />
);

export const EmployeeCreate = () => (
    <CreateEmployeeLayout inputsList={inputsList} referenceValues={referenceValues} />
);

export const EmployeeProfile = () => (
    <Show title="Show employee" emptyWhileLoading>
        <Grid container direction="row" justifyContent="flex-start" alignItems="center">
            <Grid item>
                <Box m={2}>{/*Profile image hardcoded until photo upload feature is in palce*/}
                    <Avatar alt="Employee" src="https://entropay-assets.s3.amazonaws.com/messi.jpg" sx={{ width: 100, height: 100 }} />
                </Box>
            </Grid>
            <Grid item>
                <SimpleShowLayout divider={<Divider flexItem />}>
                    <FunctionField label="" render={record => `${record.firstName} ${record.lastName}`} />
                    <TextField label="" source="personalEmail" />
                </SimpleShowLayout>
            </Grid>
            <Grid item>
                <SimpleShowLayout divider={<Divider flexItem />}>
                    <TextField label="Current assigment" source="" />
                    <DateField label="Hired Date" source="" />
                </SimpleShowLayout>
            </Grid>
        </Grid>
        <TabbedShowLayout>
            <Tab label="Personal and financial information">
                <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start" >
                    <SimpleShowLayout divider={<Divider flexItem />}>
                        <TextField source="taxId" />
                        <TextField source="phoneNumber" />
                        <TextField source="mobileNumber" />
                        <TextField source="address" />
                        <TextField source="city" />
                        <TextField source="notes" />                
                    </SimpleShowLayout>
                    <SimpleShowLayout divider={<Divider flexItem />}>
                        <TextField source="state" />                        
                        <TextField source="zip" />
                        <TextField source="country" />
                        <DateField source="birthDate" />
                        <TextField source="healthInsurance" />
                    </SimpleShowLayout>              
                </Grid>
                <ArrayField source="paymentInformation">
                    <Datagrid>
                        <TextField source="platform"/>
                        <TextField source="country"/>
                        <TextField source="cbu" label="Alias/CBU"/>
                    </Datagrid>
                </ArrayField>
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