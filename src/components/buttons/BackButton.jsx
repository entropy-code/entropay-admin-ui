import { Button } from "@mui/material";
import { useNavigate, useLocation } from 'react-router-dom';
import { useRedirect } from "react-admin";
import ArowBackIcon from '@rsuite/icons/ArowBack';

const icons = {
    backIcon: <ArowBackIcon/>,
  };

const BackButton = () => {
    const navigate = useNavigate();
    const redirect = useRedirect();
    const { pathname } = useLocation();
    const uuid = pathname.split('/')[2];

    const handleBack = () => {
        if(pathname.startsWith(`/employees/${uuid}/`)){
            redirect(`/employees`);
        }
        else{
            navigate(-1);
        }
    };
  
    return(
        <Button variant="text" startIcon={icons.backIcon} onClick={handleBack}>
        {"Back"}
        </Button>
    );
  };

  export default BackButton;