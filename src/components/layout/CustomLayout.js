import { Layout } from 'react-admin';
import { CustomMenu } from './CustomMenu';
                      

export const CustomLayout = (props) => {
    return (<Layout {...props} menu={CustomMenu} />)
};                                                                                          