// TODO: Replace with a better library typescript compatible
// @ts-ignore
import * as jsonExport from "jsonexport/dist";

export const exporter =
  (entity: string, headers: any[], headersRename: any, dataProvider?: any, booleanString?: boolean) => async (records: any[]) => {
        
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

      // Fetch related client data
      const clientIds = [...new Set(records.map(record => record.clientId))].filter(Boolean);
      const clients = clientIds.length > 0
        ? await dataProvider.getMany('clients', { ids: clientIds })
        : { data: [] };

      // Fetch related country data (NEW)
      const countryIds = [...new Set(records.map(record => record.countryId))].filter(Boolean);
      const countries = countryIds.length > 0
        ? await dataProvider.getMany('countries', { ids: countryIds })
        : { data: [] };

      // Fetch related technology data
      const technologyIds = [...new Set(records.map(record => record.technologyId))].filter(Boolean);
      const technologies = technologyIds.length > 0
        ? await dataProvider.getMany('technologies', { ids: technologyIds })
        : { data: [] };

      // Fetch related assignment and project data
      const assignmentIds = [...new Set(records.map(record => record.assignmentId))].filter(Boolean);
      const assignments = assignmentIds.length > 0
        ? await dataProvider.getMany('assignments', { ids: assignmentIds })
        : { data: [] };

      const projectIds = [...new Set(assignments.data.map((assignment: any) => assignment.projectId))].filter(Boolean);
      const projects = projectIds.length > 0
        ? await dataProvider.getMany('projects', { ids: projectIds })
        : { data: [] };

      // Fetch clients from projects (merge with existing client fetching)
      const projectClientIds = [...new Set(projects.data.map((project: any) => project.clientId))].filter(Boolean);
      const allClientIds = [...new Set([...clientIds, ...projectClientIds])];
      const allClients = allClientIds.length > 0
        ? await dataProvider.getMany('clients', { ids: allClientIds })
        : clients;

      // Create maps for quick access
      const employeeMap = new Map(employees.data.map((emp: any) => [emp.id, emp]));
      const categoryMap = new Map(categories.data.map((cat: any) => [cat.id, cat]));
      const clientMap = new Map(allClients.data.map((client: any) => [client.id, client]));
      const countryMap = new Map(countries.data.map((country: any) => [country.id, country]));
      const assignmentMap = new Map(assignments.data.map((assignment: any) => [assignment.id, assignment]));
      const projectMap = new Map(projects.data.map((project: any) => [project.id, project]));

      recordsForExport = records.map((record) => {
        const employee: any = employeeMap.get(record.employeeId);
        const category: any = categoryMap.get(record.categoryId);
        const country: any = countryMap.get(record.countryId);
        const assignment: any = assignmentMap.get(record.assignmentId);
        const project: any = assignment ? projectMap.get(assignment.projectId) : null;
        const client: any = project ? clientMap.get(project.clientId) : (record.clientId ? clientMap.get(record.clientId) : null);

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
            case 'client.name':
              recordForExport[field] = client?.name || '';
              break;
            case 'category.name':
              recordForExport[field] = category?.name || '';
              break;
            case 'category.description':
              recordForExport[field] = category?.description || '';
              break;
            case 'country.name':
              recordForExport[field] = country?.name || '';
              break;
            case 'country.code':
              recordForExport[field] = country?.code || '';
              break;
            case 'technology.name':
              const technology = technologies.data.find((tech: any) => tech.id === record.technologyId);
              recordForExport[field] = technology?.name || '';
              break;
            case 'technology.technologyType':
              const tech = technologies.data.find((tech: any) => tech.id === record.technologyId);
              recordForExport[field] = tech?.technologyType || '';
              break;
            case 'project.name':
              recordForExport[field] = project?.name || '';
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

        // Apply boolean conversion only for specific entities
        ...(booleanString === true ? {
          booleanTrueString: "True",
          booleanFalseString: "False"
        } : {
          booleanTrueString: "Active",
          booleanFalseString: "Inactive",
        }),
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