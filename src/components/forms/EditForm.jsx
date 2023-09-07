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
} from "react-admin";
import Header from "../Header";
import FormSection from "./FormSections";
import validateEntity from "./Validations";

const GetRedirectPath = (resource, data) => {
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
    case "vacations":
      redirectPath = `/employees/${data.employeeId}/show/3`;
      break;
    default:
      redirectPath = `/${resource}`;
      break;
  }
  return redirectPath;
};

const CustomToolbar = (props) => {
  const { resource } = props;
  const data = useRecordContext();
  const refresh = useRefresh();
  const redirect = useRedirect();
  const handleClick = () => {
    let redirectPath = GetRedirectPath(resource, data);
    redirect(redirectPath);
    refresh();
  };
  return (
    <Toolbar
      {...props}
      sx={{ display: "flex", justifyContent: "space-between" }}
    >
      <SaveButton />
      <DeleteButton mutationMode="pessimistic" onClick={handleClick} />
    </Toolbar>
  );
};

const EditForm = ({ formData, title, resource }) => {
  const refresh = useRefresh();
  const redirect = useRedirect();
  const onSuccess = (data) => {
    let redirectPath = GetRedirectPath(resource, data);
    redirect(redirectPath);
    refresh();
  };

  return (
    <Box m="10px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title={title} subtitle="Edit" />
      </Box>
      <Edit mutationMode="pessimistic" mutationOptions={{ onSuccess }}>
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
                    referenceValues={item.referenceValues}
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
