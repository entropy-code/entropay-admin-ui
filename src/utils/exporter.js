import jsonExport from "jsonexport/dist";

export const exporter = (entity, headers, headersRename) => (records) => {
  const recordsForExport = records.map((record) => {
    return headers.reduce((recordForExport, field) => {
      recordForExport[field] = record[field];
      return recordForExport;
    }, {});
  });

  const fileName = `${entity}_${new Date().toISOString().split('T')[0]}`;

  jsonExport(recordsForExport,  {headers: headers, rename: headersRename, 
  arrayPathString: " - ",  booleanTrueString: "Active", 
  booleanFalseString: "Inactive"}, (err, csv) => {
    // Export to xls
    const blob = new Blob([csv], { type: "application/vnd.ms-excel" });
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
  });
};
