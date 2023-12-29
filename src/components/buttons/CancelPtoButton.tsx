import * as React from "react";
import { useDataProvider, Button, useNotify, useRefresh } from "react-admin";
import { IPto } from "../../types";
import CloseIcon from "@rsuite/icons/Close";

const icons = {
  cancelIcon: <CloseIcon />,
};

const CancelPtoButton: React.FC<{ id: string; record: IPto }> = ({
  id,
  record,
}) => {
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const refresh = useRefresh();

  const cancelPto = async () => {
    const endpoint: string = `ptos/${id}/cancel`;
    const updatedPto = await dataProvider.create(endpoint, {
      data: { ...record, status: "CANCELLED" },
    });
    notify("PTO has been cancelled");
    refresh();
  };

  return (
    <Button
      startIcon={icons.cancelIcon}
      label="Cancel"
      onClick={cancelPto}
      disabled={record.status === "CANCELLED"}
      style={{
        color: record.status === "CANCELLED" ? "gray" : "red",
        opacity: record.status === "CANCELLED" ? 0.5 : 1,
      }}
    />
  );
};

export default CancelPtoButton;
