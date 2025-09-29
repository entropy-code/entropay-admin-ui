// TODO: Replace with a better library typescript compatible
// @ts-ignore
import * as jsonExport from "jsonexport/dist";

export const exporter =
  (entity: string, headers: any[], headersRename: any, dataProvider?: any) => async (records: any[]) => {
        
    let recordsForExport = records;
    
    // If dataProvider is provided, fetch related data
    if (dataProvider) {
      // Fetch related employee data
      const employeeIds = [...new Set(records.map(record => record.employeeId))].filter(Boolean);
      const employees = employeeIds.length > 0 
        ? await dataProvider.getMany('employees', { ids: employeeIds })
        : { data: [] };
      
      // Fetch related category data
      const categoryIds = [...new Set(records.map(record => record.categoryId))].filter(Boolean);
      const categories = categoryIds.length > 0
        ? await dataProvider.getMany('reimbursement-categories', { ids: categoryIds })
        : { data: [] };

      // Create maps for quick access
      const employeeMap = new Map(employees.data.map((emp: any) => [emp.id, emp]));
      const categoryMap = new Map(categories.data.map((cat: any) => [cat.id, cat]));
      
      recordsForExport = records.map((record) => {
        const employee: any = employeeMap.get(record.employeeId);
        const category: any = categoryMap.get(record.categoryId);
        
        return headers.reduce((recordForExport, field) => {
          // Handle fields from related tables
          switch (field) {
            case 'employee.internalId':
              recordForExport[field] = employee?.internalId || '';
              break;
            case 'employee.firstName':
              recordForExport[field] = employee?.firstName || '';
              break;
            case 'employee.lastName':
              recordForExport[field] = employee?.lastName || '';
              break;
            case 'category.name':
              recordForExport[field] = category?.name || '';
              break;
            case 'category.description':
              recordForExport[field] = category?.description || '';
              break;
            default:
              // Direct field from record
              recordForExport[field] = record[field];
          }
          return recordForExport;
        }, {});
      });
    } else {
      // Default behavior without dataProvider
      recordsForExport = records.map((record) => {
        return headers.reduce((recordForExport, field) => {
          recordForExport[field] = record[field];
          return recordForExport;
        }, {});
      });
    }

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
        // Add BOM for UTF-8 and improve encoding
        const BOM = '\uFEFF';
        const csvWithBOM = BOM + csv;

        // Export to csv
        // Create blob with explicit UTF-8 encoding
        const blob = new Blob([csvWithBOM], { 
          type: "text/csv;charset=utf-8;" 
        });

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        // Export to csv
      }
    );
  };