import { Box } from "@mui/material";
import { Create, SimpleForm, TextInput, useRedirect } from "react-admin";
import Header from "../Header";
import FormSection from "./FormSection";

const CreateForm = ({ formData, title, resource }) => {
  
  const redirect = useRedirect();  
  const onSuccess = (data) => {
    switch(resource) {
      case "contracts":
        redirect(`/employees/${data.employeeId}/show/1`);
        break;
      case "assigments":
        redirect(`/employees/${data.employeeId}/show/2`);
        break;
      case "employees":
        redirect(`/employees/${data.id}/show`)
        break;
      default:
        redirect(`${resource}`)
    }    
};

  return (
    <Box m="10px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title={title} subtitle="Create" />
      </Box>

      <Create mutationOptions={{ onSuccess }}>
        <SimpleForm>
          <Box width="100%">
            {formData.map((item, index) => {
              return (
                <Box
                  sx={{
                    borderLeft: 3,
                    borderColor: "#70d8bd",
                    marginBottom: 3,
                    paddingLeft: 2,
                  }}
                >
                  <FormSection
                    formSectionTitle={item.title}
                    inputsList={item.inputsList}
                    referenceValues={item.referenceValues}
                    paymentInformation={item.paymentInformation}
                    key={index + item.title}
                  />
                </Box>
              );
            })}
            <TextInput multiline source="notes" fullWidth />
          </Box>
        </SimpleForm>
      </Create>
    </Box>
  );
};

export default CreateForm;
