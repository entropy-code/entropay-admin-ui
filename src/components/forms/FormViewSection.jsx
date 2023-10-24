import React from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";

const renderField = (label, value) => (
  <div key={label}>
    <Typography variant="body1" color="textPrimary">
      {label}:
    </Typography>
    <Typography variant="body2" color="textSecondary">
      {value}
    </Typography>
  </div>
);

const FormViewSection = ({ formSectionTitle, fields }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
    <Box>
      <Typography variant="h6" color="#2196F3">
        {formSectionTitle}
      </Typography>
      <Box
        m="0.5px"
        display="grid"
        gap="5px"
        gridTemplateColumns="repeat(2, minmax(0,1fr))"
        sx={{
          "& > div": {
            gridColumn: isNonMobile ? undefined : "span 4",
          },
        }}
      >
        {fields &&
          fields.map((field, index) => (
            <div key={index}>{renderField(field.label, field.value)}</div>
          ))}
      </Box>
    </Box>
  );
};

export default FormViewSection;
