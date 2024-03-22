import * as React from "react";
import { Button, useGetList } from "react-admin";
import FileDownloadIcon from '@rsuite/icons/FileDownload';
import { exporter } from "../../utils/exporter";

const icons = {
  downloadIcon: <FileDownloadIcon />,
};


export const PtosReportsExportButton = ({ report, headers, headersRename }) => {
    const key = report.slice(0, -4);
    const filterKey = `RaStore.reports/ptos/${key}.listParams`;
    const storedParams = localStorage.getItem(filterKey);
    const params = JSON.parse(storedParams);
    const yearFilter = params?.filter;
    const filter = {
        [report === 'employeesPtos' ? 'employeeId' : 'clientId']: "",
        ...yearFilter,
      };

      const { data: details } = useGetList(
        'reports/ptos/all-details',
        { filter }
      );
    
      const handleExportClick = () => {
        if (details) {
          exporter(report, headers, headersRename)(details);
        }
      };

    return (
    <Button variant="text" startIcon={icons.downloadIcon} onClick={handleExportClick} alignIcon="right">
    <>Export</>
    </Button>
  );
};

export default PtosReportsExportButton;