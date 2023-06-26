import * as React from "react";
import { Chip } from "@mui/material";
import { IQuickFilterModel } from "../../types";

const QuickFilter: React.FC<IQuickFilterModel> = ({ label }) => {
  return <Chip sx={{ marginBottom: 1 }} label={label} />;
};

export default QuickFilter;
