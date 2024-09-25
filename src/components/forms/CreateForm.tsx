import React from "react";
import { Box } from "@mui/material";
import { Create, SimpleForm, Toolbar, useRedirect } from "react-admin";
import Header from "../Header";
import FormSection from "./FormSections";
import validateEntity from "./Validations";
import { EntityCreateEditActions } from "../layout/CustomActions";
import VacationValidation from "./VacationValidation";

const CreateForm = ({
  formData,
  title,
  resource,
}: {
  formData: any[];
  title: string;
  resource: string;
}) => {
  const redirect = useRedirect();
  const onSuccess = (data: { id: string; employeeId: string }) => {
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
        case "overtimes":
          redirect(`/employees/${data.employeeId}/show/5`);
          break;
      default:
        redirect(`/${resource}`);
    }
  };

  return (
    <Box m="10px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title={title} subtitle="Create" />
      </Box>

      <Create
        actions={<EntityCreateEditActions />}
        mutationOptions={{ onSuccess }}
      >
        <SimpleForm
          validate={validateEntity}
          toolbar={
            window.location.href.includes("ptos/create") ? (
              <VacationValidation />
            ) : (
              <Toolbar />
            )
          }
        >
          <Box width="100%">
            {formData.map((item, index) => {
              return (
                <Box
                  key={`create-box-${index}`}
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
