import { Box } from "@mui/material";
import { Edit, SimpleForm } from "react-admin";
import Header from "../Header";
import FormSection from "./FormSections";

const EditForm = ({ formData, title }) => {
  return (
    <Box m="10px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title={title} subtitle="Edit" />
      </Box>

      <Edit redirect="list">
        <SimpleForm>
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
