import { Box } from "@mui/material";
import { Create, SimpleForm, useRedirect } from "react-admin";
import Header from "../Header";
import FormSection from "./FormSections";
import validateEntity from "./Validations";
import { EntityCreateEditActions } from "../layout/CustomActions";


const CreateForm = ({ formData, title, resource }) => {
  const redirect = useRedirect();
  const onSuccess = (data) => {
    switch (resource) {
      case "ptos":
        redirect(`/employees/${data.employeeId}/show/4`);
        break;
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
        redirect(`/employees/${data.id}/show`);
        break;
      default:
        redirect(`/${resource}`);
    }
  };

  console.log(formData)

  return (
    <Box m="10px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title={title} subtitle="Create" />
      </Box>

      <Create actions={<EntityCreateEditActions />} mutationOptions={{ onSuccess }}>
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
