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
import { HasPermissions } from "../layout/CustomActions";
import { EntityCreateEditActions } from "../layout/CustomActions";

const GetRedirectPathAfterEdit = (resource, data) => {
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
    case "ptos":
      redirectPath = `/employees/${data.employeeId}/show/4`;
      break;
      case "overtime":
        redirectPath = `/employees/${data.employeeId}/show/5`;
        break;
    default:
      redirectPath = `/${resource}`;
      break;
  }
  return redirectPath;
};

const GetRedirectPathAfterDelete = (resource, data) => {
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
    case "vacations":
      redirectPath = `/employees/${data.employeeId}/show/3`;
      break;
    case "ptos":
      redirectPath = `/employees/${data.employeeId}/show/4`;
      break;
      case "overtimes":
        redirectPath = `/employees/${data.employeeId}/show/5`;
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
    const redirectPath = GetRedirectPathAfterDelete(resource, data);
    redirect(redirectPath);
    refresh();
  };
  return (
    <Toolbar
      {...props}
      sx={{ display: "flex", justifyContent: "space-between" }}
    >
      <SaveButton />
      {HasPermissions(resource, "delete") && (
        <DeleteButton
          mutationMode="pessimistic"
          onClick={handleClick}
          confirmTitle="Deletion confirmation"
        />
      )}
    </Toolbar>
  );
};

const EditForm = ({ formData, title, resource }) => {
  const refresh = useRefresh();
  const redirect = useRedirect();
  const onSuccess = (data) => {
    let redirectPath = GetRedirectPathAfterEdit(resource, data);
    redirect(redirectPath);
    refresh();
  };

  return (
    <Box m="10px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title={title} subtitle="Edit" />
      </Box>
      <Edit actions={<EntityCreateEditActions />} mutationMode="pessimistic" mutationOptions={{ onSuccess }}>
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
