import { 
    TopToolbar,
    CreateButton,
    ListButton,
} from 'react-admin';

import ArowBackIcon from '@rsuite/icons/ArowBack';

const icons = {
    backIcon: <ArowBackIcon />,
  };

export const EntityViewActions = ({ entity }) => {
    return (
      <TopToolbar sx={{ justifyContent: "space-between" }}>
        <div style={{ display: "flex" }}>
          <ListButton label='back' icon={icons.backIcon}/>
        </div>
        {HasPermissions(entity, "create") && <CreateButton />}
      </TopToolbar>
    );
  };  
  
export const HasPermissions = (entity, action) => {
    const config = JSON.parse(localStorage.getItem('config')) || {}
    const permissions = config.permissions || []
    const getPermissions = (action) => { return permissions.some(element => {
        if (element.entity === entity) {
            return element.actions.includes(action);
        } 
    
        return false;
      })};
    return permissions && getPermissions(action)
    
};

export default EntityViewActions
