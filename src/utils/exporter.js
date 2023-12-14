import jsonExport from "jsonexport/dist";

export const exporter = (fieldsList, resource, headers, headersOrder) => (records) => {
  const recordsForExport = records.map((record) => {
    return fieldsList.reduce((acc, field) => {
      acc[field.name] = record[field.name];
      return acc;
    }, {});
  });

  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split("T")[0];

  const fileName = `${resource}_${formattedDate}.csv`;

  jsonExport(recordsForExport,  { rowDelimiter: ';', rename: headers, arrayPathString: " - ", headers: headersOrder,
  booleanTrueString: "Active", booleanFalseString: "Inactive"},   (err, csv) => {
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
