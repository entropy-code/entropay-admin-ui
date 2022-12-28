import { Button } from '@mui/material';
import { useRedirect } from 'react-admin';

const RedirectButton = ({ form, resource, text }) => {
    const redirect = useRedirect();
    const handleClick = () => {
        redirect(form,resource);
    }
    return <Button variant="text" onClick={handleClick} >{text}</Button>;
};

export default RedirectButton;