import { Box } from "@mui/material";
import { Create, SimpleForm, useRedirect } from "react-admin";
import Header from "../Header";
import FormSection from "./FormSections";

const CreateForm = ({ formData, title, resource }) => {
  
  const redirect = useRedirect();  
  const onSuccess = (data) => {
    switch(resource) {
      case "vacations":
        redirect(`/employees/${data.employeeId}/show/3`);
        break;
      case "contracts":
        redirect(`/employees/${data.employeeId}/show/1`);
        break;
      case "assignments":
          redirect(`/employees/${data.employeeId}/show/2`);
          break;
      case "employees":
        redirect(`/employees/${data.id}/show`)
        break;
      default:
        redirect(`/${resource}`)
    }    
};

const validateEntity = async (values) => {
  const errors = {};
  if(values.endDate <= values.startDate && values.endDate){
    errors.endDate = "End Date can't be previous or equals to Start Date";
  }
  return errors;
}

  return (
    <Box m="10px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title={title} subtitle="Create" />
      </Box>

      <Create mutationOptions={{ onSuccess }}>
        <SimpleForm validate={validateEntity}>
          <Box width="100%">
            {formData.map((item, index) => {
              return (
                <Box
                  sx={{
                    borderLeft: 3,
                    borderColor: "#2196F3",
                    marginBottom: 3,
                    paddingLeft: 2,
                  }}
                >
                  <FormSection
                    formSectionTitle={item.title}
                    inputsList={item.inputsList}
                    referenceValues={item.referenceValues}
                    customSections={item.customSections}
                    key={index + item.title}
                  />
                </Box>
              );
            })}
          </Box>
        </SimpleForm>
      </Create>
    </Box>
  );
};

export default CreateForm;
