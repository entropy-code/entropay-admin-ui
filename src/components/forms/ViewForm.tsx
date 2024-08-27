import React from "react";
import { Box } from "@mui/material";
import { Show, SimpleShowLayout } from "react-admin";
import Header from "../Header";
import FormViewSections from "./FormViewSections";
import { EntityViewActions } from "../layout/CustomActions";

const ViewForm = ({
  formData,
  title,
  resource,
}: {
  formData: any[];
  title: string;
  resource: string;
}) => {
  return (
    <Box m="10px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title={title} subtitle="View" />
      </Box>
      <Show actions={<EntityViewActions entity={resource} />}>
        <SimpleShowLayout>
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
                    <FormViewSections
                      formSectionTitle={item.title}
                      inputsList={item.inputsList}
                      customSections={item.customSections}
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
