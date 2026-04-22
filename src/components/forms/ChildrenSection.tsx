import React from "react";
import {
  BooleanInput,
} from "react-admin";
import { Box, Typography } from "@mui/material";

const ChildrenSection = (props: { type: "children" }) => {
  return (
    <Box sx={{ gridColumn: "span 2", display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
      <Typography color={"rgba(0, 0, 0, 0.6)"} sx={{ fontSize: "12px" }}>
        Children
      </Typography>
      <BooleanInput 
        source="hasChildren"
        label="Yes"
        helperText={false}
      />
    </Box>
  );
};

export default ChildrenSection;
