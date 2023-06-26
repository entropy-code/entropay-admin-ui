import * as React from "react";
import { Chip } from "@mui/material";
import { IQuickFilterProps } from "../../types";

const QuickFilter: React.FC<IQuickFilterProps> = ({ label }) => {
  return <Chip sx={{ marginBottom: 1 }} label={label} />;
};

export default QuickFilter;
