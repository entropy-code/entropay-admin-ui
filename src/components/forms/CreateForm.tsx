import React from "react";
import { Box } from "@mui/material";
import { Create, SimpleForm, Toolbar, useRedirect, SaveButton, useNotify } from "react-admin";
import { useFormContext } from "react-hook-form";
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
      case "contracts":
        redirect(`/employees/${data.employeeId}/show/1`);
        break;
      case "assignments":
        redirect(`/employees/${data.employeeId}/show/2`);
        break;
      case "skills":
        redirect(`/employees/${data.employeeId}/show/3`);
        break;
      case "vacations":
        redirect(`/employees/${data.employeeId}/show/4`);
        break;
      case "ptos":
        redirect(`/employees/${data.employeeId}/show/5`);
        break;
      case "overtimes":
        redirect(`/employees/${data.employeeId}/show/6`);
        break;
      case "feedback/employee":
        redirect(`/employees/${data.employeeId}/show/7`);
        break;
      case "reimbursements":
        redirect(`/employees/${data.employeeId}/show/8`);
        break;
      case "employees":
        redirect(`/employees/${data.id}/show`);
        break;
      default:
        redirect(`/${resource}`);
    }
  };

  const CustomCreateToolbar = () => {
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
    
    return (
      <Toolbar>
        <SaveButton onClick={handleClick} />
      </Toolbar>
    );
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
              <CustomCreateToolbar />
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
