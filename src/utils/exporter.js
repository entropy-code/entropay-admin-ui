import { downloadCSV } from "react-admin";
import jsonExport from "jsonexport/dist";

export const reportExporter = (entity, headers, headersRename) => (records) => {
  const recordsForExport = records.map((record) => {
    return headers.reduce((recordForExport, field) => {
      recordForExport[field] = record[field];
      return recordForExport;
    }, {});
  });

  const fileName = `${entity}_${new Date().toISOString().split('T')[0]}`;

  jsonExport(recordsForExport,  {rowDelimiter: ';', rename: headersRename, 
  arrayPathString: " - ", headers: headers, booleanTrueString: "Active", 
  booleanFalseString: "Inactive"},   (err, csv) => {
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


export const listExporter = (entity, headers, headersRename) => (records) => {
  const recordsForExport = records.map((record) => {
    return headers.reduce((recordForExport, field) => {
      recordForExport[field] = record[field];
      return recordForExport;
    }, {});
  });

  const fileName = `${entity}_${new Date().toISOString().split('T')[0]}`;
  
  jsonExport(recordsForExport, {headers: headers, rename: headersRename}, 
    (err, csv) => {
      downloadCSV(csv, fileName);
  });
};


/* const toPlural = (word) => {
  const lastChar = word[word.length - 1];
  let pluralizedWord = lastChar === 'y' ? `${word.slice(0, -1)}ies` : `${word}s`;

  if (/[A-Z]/.test(pluralizedWord.slice(1))) {
    // Group uppercase letters with following lowercase letters
    const wordParts = pluralizedWord.match(/[a-z]+|[A-Z][a-z]+/g).map(part => part.toLowerCase());
    pluralizedWord = wordParts.join("-");
  }
  return pluralizedWord;
};

export const genericExporter = (records, fetchRelatedRecords, fileName) => {
  console.log(records);
  const unwantedFields = new Set(['id']);
  const relatedFields = Object.keys(records[0]).filter(
    field => field.endsWith('Id'));
  
  relatedFields.map(field => unwantedFields.add(field));

  console.log(relatedFields);

  return Promise.all(
    relatedFields.map(field => {
      const relatedEntityName = toPlural(field.substring(0, field.indexOf('Id')));
      return fetchRelatedRecords(records, field, relatedEntityName);
    })
  ).then(relatedRecordsArrays => {
    const data = records.map(record => {
      const filteredRecord = Object.fromEntries(
        Object.keys(record)
          .filter(key => !unwantedFields.has(key))
          .map(key => [key, record[key]])
      );

      const relatedRecordValues = relatedFields.reduce((acc, field) => {
        const relatedEntityName = field.substring(0, field.indexOf('Id'));
        const relatedRecords = relatedRecordsArrays[relatedFields.indexOf(field)];
        const relatedRecord = relatedRecords[record[field]];
        return {
          ...acc,
          [`${relatedEntityName}`]: relatedRecord ? relatedRecord.name ? relatedRecord.name : `${relatedRecord.firstName} ${relatedRecord.lastName}` : null,
        };
      }, {});

      return { ...filteredRecord, ...relatedRecordValues };
    });
    console.log(data);
    return jsonExport(data, {
      headers: [
        ...relatedFields.map(field => field.substring(0, field.indexOf('Id'))),
      ],
    }, (err, csv) => {
      downloadCSV(csv, fileName);
    });
  });
}; */


