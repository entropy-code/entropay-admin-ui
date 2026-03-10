import * as React from "react";
import { Button, useNotify, useRefresh, useDataProvider } from "react-admin";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

export const FeedbackSummaryButton = ({ employeeId }: { employeeId: string }) => {
  const notify = useNotify();
  const refresh = useRefresh();
  const dataProvider = useDataProvider();

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();

    await dataProvider.create(`feedback-summary/employee/${employeeId}/generate`, {
      data: {},
    });

    notify("Summary generated successfully", { type: "success" });
    refresh();
  };

  return (
    <Button
      label="Generate Summary"
      onClick={handleClick}
    >
      <AutoAwesomeIcon />
    </Button>
  );
};