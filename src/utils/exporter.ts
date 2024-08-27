// TODO: Replace with a better library typescript compatible
// @ts-ignore
import * as jsonExport from "jsonexport/dist";

export const exporter =
  (entity: string, headers: any[], headersRename: any) => (records: any[]) => {
    const recordsForExport = records.map((record) => {
      return headers.reduce((recordForExport, field) => {
        recordForExport[field] = record[field];
        return recordForExport;
      }, {});
    });

    const fileName = `${entity}_${new Date().toISOString().split("T")[0]}.csv`;

    jsonExport(
      recordsForExport,
      {
        headers: headers,
        rename: headersRename,
        arrayPathString: " - ",
        booleanTrueString: "Active",
        booleanFalseString: "Inactive",
      },
      (err: any, csv: any) => {
        // Export to xls
        const blob = new Blob([csv], { type: "application/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        // Export to csv
        //downloadCSV(csv, fileName);
      }
    );
  };
