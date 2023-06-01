import React from "react";
import { useRecordContext } from "react-admin";
import Chip from "@mui/material/Chip";
import { SxProps } from "@mui/material";

interface CustomizableChipFieldProps<T> {
  children: (record: T) => string | undefined;
  variant?: "filled" | "outlined";
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
  size?: "small" | "medium";
  sx?: SxProps;
}

export const CustomizableChipField = <T extends Object>(
  props: CustomizableChipFieldProps<T>
) => {
  const record = useRecordContext<T>(props);
  const {
    children: getLabel,
    variant = "outlined",
    color = "info",
    size = "small",
    sx = { margin: "4px" },
  } = props;
  return record ? (
    <Chip
      label={getLabel(record)}
      variant={variant}
      color={color}
      size={size}
      sx={{ ...sx }}
    />
  ) : (
    <></>
  );
};
