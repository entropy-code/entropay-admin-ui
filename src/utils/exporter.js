import { downloadCSV } from "react-admin";
import jsonExport from "jsonexport/dist";

export const exporter = (fieldsList) => (records) => {
  const recordsForExport = records.map((record) => {
    return fieldsList.reduce((acc, field) => {
      acc[field.name] = record[field.name];
      return acc;
    }, {});
  });

  console.log(recordsForExport);
  jsonExport(recordsForExport, (err, csv) => {
    downloadCSV(csv, "entities"); // download as 'resource.csv` file
  });
};
