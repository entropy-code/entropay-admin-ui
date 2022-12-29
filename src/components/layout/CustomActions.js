import { 
    useListContext,
    TopToolbar,
    CreateButton,
    ExportButton,
} from 'react-admin';

export const ListActions = ({entity}) => {
    const { total, isLoading } = useListContext();
    return (
        <TopToolbar>
            {HasPermissions(entity, "create") && <CreateButton/>}
            <ExportButton disabled={isLoading || total === 0} />
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

export default ListActions
