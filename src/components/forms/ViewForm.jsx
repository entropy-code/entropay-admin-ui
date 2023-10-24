import { Box, Button } from "@mui/material";
import {
  Toolbar,
  SimpleForm,
  useRedirect,
  useRefresh,
  useRecordContext,
  Show,
  SimpleShowLayout,
} from "react-admin";
import Header from "../Header";
import FormViewSection from "./FormViewSection";

const GetRedirectPath = (resource, data) => {
  let redirectPath = "";
  switch (resource) {
    case "contracts":
      redirectPath = `/employees/${data.employeeId}/show/1`;
      break;
    case "assignments":
      redirectPath = `/employees/${data.employeeId}/show/2`;
      break;
    case "vacations":
    default:
      redirectPath = `/${resource}`;
      break;
  }
  return redirectPath;
};

const CustomToolbar = (props) => {
  const { resource } = props;
  const data = useRecordContext();
  const redirect = useRedirect();

  const handleBackClick = () => {
    let redirectPath = GetRedirectPath(resource, data);
    redirect(redirectPath);
  };

  return (
    <Toolbar
      {...props}
      sx={{ display: "flex", justifyContent: "space-between" }}
    >
      <Button color="primary" onClick={() => handleBackClick()}>
        Back
      </Button>
    </Toolbar>
  );
};

const ViewForm = ({ formData, title, resource }) => {
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
        <Header title={title} subtitle="View" />
      </Box>
      <Show>
        <SimpleShowLayout toolbar={<CustomToolbar resource={resource} />}>
          <Box width="100%">
            {formData &&
              formData.map((item, index) => {
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
                    <FormViewSection
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
        </SimpleShowLayout>
      </Show>
    </Box>
  );
};

export default ViewForm;
