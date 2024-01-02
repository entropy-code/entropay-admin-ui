import * as React from "react";
import { useDataProvider, Button, useNotify, useRefresh } from "react-admin";
import { IPto } from "../../types";
import CloseIcon from "@rsuite/icons/Close";
import { Confirm } from "react-admin";

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
  const [showConfirm, setShowConfirm] = React.useState(false);

  const cancelPto = async () => {
    const endpoint: string = `ptos/${id}/cancel`;
    const updatedPto = await dataProvider.create(endpoint, {
      data: { ...record, status: "CANCELLED" },
    });
    notify("PTO has been cancelled");
    refresh();
    setShowConfirm(false);
  };

  return (
    <>
      <Button
        startIcon={icons.cancelIcon}
        label="Cancel"
        onClick={() => setShowConfirm(true)}
        disabled={record.status === "CANCELLED"}
        style={{
          color: record.status === "CANCELLED" ? "gray" : "red",
          opacity: record.status === "CANCELLED" ? 0.5 : 1,
        }}
      />
      <Confirm
        isOpen={showConfirm}
        title="Confirm Cancel"
        content="Are you sure you want to cancel this PTO?"
        onConfirm={cancelPto}
        onClose={() => setShowConfirm(false)}
      />
    </>
  );
};

export default CancelPtoButton;
