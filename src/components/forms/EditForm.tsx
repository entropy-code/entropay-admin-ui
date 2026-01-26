import React from "react";
import { Box } from "@mui/material";
import {
  DeleteButton,
  Edit,
  SaveButton,
  SimpleForm,
  Toolbar,
  useRecordContext,
  useRedirect,
  useRefresh,
  useNotify,
} from "react-admin";
import { useFormContext } from "react-hook-form";
import Header from "../Header";
import FormSection from "./FormSections";
import validateEntity from "./Validations";
import { HasPermissions } from "../layout/CustomActions";
import { EntityCreateEditActions } from "../layout/CustomActions";

const GetRedirectPathAfterEdit = (
  resource: string,
  data: { id: string; employeeId: string }
) => {
  let redirectPath = "";
  switch (resource) {
    case "employees":
      redirectPath = `/employees/${data.id}/show`;
      break;
    case "contracts":
      redirectPath = `/employees/${data.employeeId}/show/1`;
      break;
    case "assignments":
      redirectPath = `/employees/${data.employeeId}/show/2`;
      break;
    case "skills":
      redirectPath = `/employees/${data.employeeId}/show/3`;
      break;
    case "vacations":
      redirectPath = `/employees/${data.employeeId}/show/4`;
      break;
    case "ptos":
      redirectPath = `/employees/${data.employeeId}/show/5`;
    break;
    case "overtimes":
      redirectPath = `/employees/${data.employeeId}/show/6`;
    break;
    case "feedback/employee":
      redirectPath = `/employees/${data.employeeId}/show/7`;
    break;
    case "reimbursements":
      redirectPath = `/employees/${data.employeeId}/show/8`;
    break;
    default:
      redirectPath = `/${resource}`;
      break;
  }
  return redirectPath;
};

const GetRedirectPathAfterDelete = (
  resource: string,
  data: {
    employeeId: string;
    id: string;
  }
) => {
  let redirectPath = "";
  switch (resource) {
    case "employees":
      redirectPath = `/employees`;
      break;
    case "contracts":
      redirectPath = `/employees/${data.employeeId}/show/1`;
      break;
    case "assignments":
      redirectPath = `/employees/${data.employeeId}/show/2`;
      break;
    case "skills":
      redirectPath = `/employees/${data.employeeId}/show/3`;
      break;
    case "vacations":
      redirectPath = `/employees/${data.employeeId}/show/4`;
      break;
    case "ptos":
      redirectPath = `/employees/${data.employeeId}/show/5`;
      break;
    case "overtimes":
      redirectPath = `/employees/${data.employeeId}/show/6`;
      break;
    case "feedback/employee":
      redirectPath = `/employees/${data.employeeId}/show/7`;
      break;
    case "reimbursements":
      redirectPath = `/employees/${data.employeeId}/show/8`;
      break;
    default:
      redirectPath = `/${resource}`;
      break;
  }
  return redirectPath;
};

const CustomToolbar = (props: { resource: string }) => {
  const { resource } = props;
  const data = useRecordContext();
  const refresh = useRefresh();
  const redirect = useRedirect();
  
  const onSuccess = () => {
    const redirectPath = GetRedirectPathAfterDelete(
      resource,
      data as { employeeId: string; id: string }
    );
    redirect(redirectPath);
    refresh();
  };
  
  const CustomSaveButton = () => {
    const { getValues, setError, trigger } = useFormContext();
    const notify = useNotify();
    
    const handleClick = async (e: any) => {
      // Primero ejecutar todas las validaciones del formulario
      const isValid = await trigger();
      
      // Si hay errores en otros campos, detener aquí
      if (!isValid) {
        e.stopPropagation();
        e.preventDefault();
        return false;
      }
      
      // Ahora validar paymentInformation
      const values = getValues();
      if (values && values.paymentInformation && values.paymentInformation.length > 0) {
        const firstPayment = values.paymentInformation[0];
        if (firstPayment) {
          const platformEmpty = !firstPayment.platform || firstPayment.platform === '' || 
                                (typeof firstPayment.platform === 'string' && firstPayment.platform.trim() === '');
          const countryEmpty = !firstPayment.country || firstPayment.country === '' || 
                              (typeof firstPayment.country === 'string' && firstPayment.country.trim() === '');
          
          if (platformEmpty || countryEmpty) {
            e.stopPropagation();
            e.preventDefault();
            
            const errors = [];
            if (platformEmpty) {
              setError('paymentInformation.0.platform', {
                type: 'manual',
                message: 'Platform is required'
              });
              errors.push('Platform');
            }
            if (countryEmpty) {
              setError('paymentInformation.0.country', {
                type: 'manual',
                message: 'Country is required'
              });
              errors.push('Country');
            }
            
            notify(`${errors.join(' and ')} ${errors.length > 1 ? 'are' : 'is'} required`, { type: 'error' });
            return false;
          }
        }
      }
    };
    
    return <SaveButton onClick={handleClick} />;
  };
  
  return (
    <Toolbar
      {...props}
      sx={{ display: "flex", justifyContent: "space-between" }}
    >
      <CustomSaveButton />
      {HasPermissions(resource, "delete") && (
        <DeleteButton
          mutationMode="pessimistic"
          confirmTitle="Deletion confirmation"
          mutationOptions={{onSuccess}}
        />
      )}
    </Toolbar>
  );
};

const EditForm = ({
  formData,
  title,
  resource,
}: {
  formData: any[];
  title: string;
  resource: string;
}) => {
  const refresh = useRefresh();
  const redirect = useRedirect();
  
  const onSuccess = (data: any) => {
    let redirectPath = GetRedirectPathAfterEdit(resource, data);
    redirect(redirectPath);
    refresh();
  };

  return (
    <Box m="10px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title={title} subtitle="Edit" />
      </Box>
      <Edit
        actions={<EntityCreateEditActions />}
        mutationMode="pessimistic"
        mutationOptions={{ onSuccess }}
      >
        <SimpleForm
          validate={validateEntity}
          toolbar={<CustomToolbar resource={resource} />}
        >
          <Box width="100%">
            {formData.map((item, index) => {
              const keyName = item?.inputsList
                ? item.title
                : item.customSections.toString;
              return (
                <Box
                  key={keyName + index}
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
      </Edit>
    </Box>
  );
};

export default EditForm;
