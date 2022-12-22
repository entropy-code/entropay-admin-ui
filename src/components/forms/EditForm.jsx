import { Box } from "@mui/material";
import { Edit, SimpleForm, TextInput } from "react-admin";
import Header from "../Header";
import FormSection from "./FormSection";

const EditForm = ({ formData, title }) => {
  return (
    <Box m="10px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title={title} subtitle="Edit" />
      </Box>

      <Edit>
        <SimpleForm>
          <Box width="100%">
            {formData.map((item, index) => {
              return (
                <Box
                  sx={{
                    borderLeft: 3,
                    borderColor: "#70d8bd",
                    marginBottom: 3,
                    paddingLeft: 2,
                  }}
                >
                  <FormSection
                    formSectionTitle={item.title}
                    inputsList={item.inputsList}
                    referenceValues={item.referenceValues}
                    key={index + item.title}
                  />
                </Box>
              );
            })}
            <TextInput multiline source="notes" fullWidth />
          </Box>
        </SimpleForm>
      </Edit>
    </Box>
  );
};

export default EditForm;
