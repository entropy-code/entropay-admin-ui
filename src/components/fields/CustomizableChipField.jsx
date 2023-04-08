import { useRecordContext } from "react-admin";
import Chip from "@mui/material/Chip";
import PropTypes from "prop-types";

export const CustomizableChipField = (props) => {
  const record = useRecordContext(props);
  const {
    children: getLabel,
    variant,
    color,
    size,
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
  ) : null;
};

CustomizableChipField.defaultProps = {
  variant: "outlined",
  color: "info",
  size: "small",
};
CustomizableChipField.propTypes = {
  children: PropTypes.func.isRequired,
  variant: PropTypes.string,
  color: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string,
};
