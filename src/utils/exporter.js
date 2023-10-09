import jsonExport from "jsonexport/dist";
export const exporter = (fieldsList, resource) => (records) => {
  const recordsForExport = records.map((record) => {
    return fieldsList.reduce((acc, field) => {
      acc[field.name] = record[field.name];
      return acc;
    }, {});
  });
  jsonExport(recordsForExport, (err, csv) => {
    const blob = new Blob([csv], { type: "application/vnd.ms-excel" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = `${resource}.xls`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  });
};
