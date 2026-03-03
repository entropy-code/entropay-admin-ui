import * as React from "react";
import { Button, useNotify, useRefresh, useDataProvider } from "react-admin";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

export const FeedbackSummaryButton = ({ employeeId }: { employeeId: string }) => {
  const notify = useNotify();
  const refresh = useRefresh();
  const dataProvider = useDataProvider();
  const [loading, setLoading] = React.useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!employeeId) {
      notify('Cannot generate summary: employee not found', { type: 'error' });
      return;
    }

    setLoading(true);
    
    try {
      await dataProvider.create('feedback-summary/employee/' + employeeId + '/generate', {
        data: {},
      });
      
      notify('Summary generated successfully', { type: 'success' });
      refresh();
    } catch (error: any) {
      notify(
        error?.message || 'Error generating summary',
        { type: 'error' }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      label="Generate Summary"
      onClick={handleClick}
      disabled={loading}
    >
      <AutoAwesomeIcon />
    </Button>
  );
};
