import * as React from "react";
import { Button, useGetList } from "react-admin";
import FileDownloadIcon from '@rsuite/icons/FileDownload';
import { exporter } from "../../utils/exporter";

const icons = {
  downloadIcon: <FileDownloadIcon />,
};


export const PtosReportsExportButton = ({ report, headers, headersRename }) => {
    let filter;
    let reportTitle;
    if(report === "ptosByEmployees") {
        const key = 'RaStore.reports/ptos/employees.listParams';
        const storedParams = localStorage.getItem(key);
        const params = JSON.parse(storedParams);
        const yearFilter = params?.filter;
        filter = {employeeId: "", ...yearFilter};
        reportTitle = "employeesPtosReport";
    }
    else if(report === "ptosByClients") {
        const key = 'RaStore.reports/ptos/clients.listParams';
        const storedParams = localStorage.getItem(key);
        const params = JSON.parse(storedParams);
        const yearFilter = params?.filter;
        filter = {clientId: "", ...yearFilter};
        reportTitle = "clientsPtosReport";
    }
    const { data: details } = useGetList(
        'reports/ptos/all-details',
        {
            filter
        }
    )

    const handleExportClick = () => {
        if(details) {
            exporter(reportTitle, headers, headersRename) (details)
        }
    }

    return (
    <Button variant="text" startIcon={icons.downloadIcon} onClick={handleExportClick} alignIcon="right">
    <>Export</>
    </Button>
  );
};

export default PtosReportsExportButton;