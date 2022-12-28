import * as React from "react";
import { ReferenceManyField, SimpleShowLayout, TextField} from "react-admin";

const ShowEntityForm = () => {    
    return (
        <SimpleShowLayout>
            <ReferenceManyField label="Contract" reference="contracts" target="employee_id">
                <TextField source="employee" />
                <TextField source="company" />
            </ReferenceManyField>
        </SimpleShowLayout>
    );
};

export default ShowEntityForm;