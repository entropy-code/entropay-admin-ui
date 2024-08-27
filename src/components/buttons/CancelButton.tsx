import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@rsuite/icons/Close";

const icons = {
  cancelIcon: <CloseIcon />,
};

const CancelButton = () => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <Button variant="text" startIcon={icons.cancelIcon} onClick={handleCancel}>
      {"Cancel"}
    </Button>
  );
};

export default CancelButton;
