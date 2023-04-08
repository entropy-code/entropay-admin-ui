import { useRecordContext } from "react-admin";
import Chip from "@mui/material/Chip";
import PropTypes from "prop-types";

export const CustomizableChipField = (props) => {
  const record = useRecordContext(props);
  const { children: getLabel } = props;
  return record ? <Chip label={getLabel(record)} variant="outlined" /> : null;
};

CustomizableChipField.defaultProps = {};
CustomizableChipField.propTypes = { children: PropTypes.func.isRequired };
