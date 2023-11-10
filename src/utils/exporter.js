import jsonExport from "jsonexport/dist";

export const exporter = (fieldsList, resource) => (records) => {
  const recordsForExport = records.map((record) => {
    return fieldsList.reduce((acc, field) => {
      acc[field.name] = record[field.name];
      return acc;
    }, {});
  });

  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split("T")[0];

  const fileName = `${resource}_${formattedDate}.csv`;
  const headers = ['Internal ID', 'First Name', 'Last Name', 'Labour Email', 'Country', 'City', 'Role', 'Seniority', 
  'Client', 'Project', 'Start Date', 'End Date', 'USD Payment', 'ARS Payment', 'Profile', 'Technologies']

  jsonExport(recordsForExport,  { rowDelimiter: ';', rename: headers, arrayPathString: " - "},   (err, csv) => {
    const blob = new Blob([csv], { type: "application/vnd.ms-excel" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  });
};
