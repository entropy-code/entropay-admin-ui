import * as React from "react";
import { Button, useGetList } from "react-admin";
import FileDownloadIcon from '@rsuite/icons/FileDownload';
import { exporter } from "../../utils/exporter";

const icons = {
  downloadIcon: <FileDownloadIcon />,
};


const extractKeyFromReportName = (reportName) => {
  return reportName.slice(0, -4);
}

export const PtosReportsExportButton = ({ reportName, headers, headersRename }) => {
    const key = extractKeyFromReportName(reportName)
    const filterKey = `RaStore.reports/ptos/${key}.listParams`;
    const storedParams = localStorage.getItem(filterKey);
    const params = JSON.parse(storedParams);
    const yearFilter = params?.filter;
    const { data: details } = useGetList(
      'reports/ptos/all-details',
      { 
        filter: yearFilter 
      }
    );
    
      const handleExportClick = () => {
        if (details) {
          exporter(reportName, headers, headersRename)(details);
        }
      };

    return (
      <Button variant="text" startIcon={icons.downloadIcon} onClick={handleExportClick} alignIcon="right" label="Export"/>
    );
};

export default PtosReportsExportButton;