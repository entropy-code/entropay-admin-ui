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

const CustomToolbar = (props) => {
  const { resource } = props;
  const record = useRecordContext();
  const refresh = useRefresh();
  const redirect = useRedirect();
  const handleClick = () => {
    switch (resource) {
      case "vacations":
        redirect(`/employees/${record.employeeId}/show/3`);
        refresh();
        break;
      default:
        redirect(`/${resource}`);
        refresh();
        break;
    }
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
  let redirectPath = `/${resource}`;

  const onSuccess = (data) => {
    switch (resource) {
      case "vacations":
        redirectPath = `/employees/${data.employeeId}/show/3`;
        redirect(redirectPath);
        refresh();
        break;
      default:
        redirect(redirectPath);
        refresh();
    }
  };

  const validateEntity = async (values) => {
    const errors = {};
    if (values.endDate <= values.startDate && values.endDate) {
      errors.endDate = "End Date can't be previous or equals to Start Date";
    }
    return errors;
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
      </Edit>
    </Box>
  );
};

export default EditForm;
