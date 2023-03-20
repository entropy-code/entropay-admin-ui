import { Button } from "@mui/material";
import { useRedirect } from "react-admin";

const RedirectButton = ({ form, resource, text, recordId, source }) => {
  const redirect = useRedirect();
  const handleClick = () => {
    redirect(form, resource, 1, {}, { record: { employeeId: recordId, source: source } });
  };
  return (
    <Button variant="text" onClick={handleClick}>
      {text}
    </Button>
  );
};

export default RedirectButton;
