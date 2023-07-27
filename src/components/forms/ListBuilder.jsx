import * as React from "react";
import {
  Datagrid,
  DateField,
  EditButton,
  NumberField,
  ReferenceField,
  ShowButton,
  TextField,
} from "react-admin";
import { HasPermissions } from "../layout/CustomActions";

const ListBuilder = ({ fieldsList, locale, hasShowButton, resource }) => {
  return (
    <Datagrid>
      {fieldsList &&
        fieldsList.map((field, index) => {
          switch (field.type) {
            case "text":
              return (
                <TextField key={index} source={field.name} label={field?.label}/>
              );
            case "date":
              return (
                <DateField key={index} source={field.name} locale={locale} label={field?.label}/>
              );
            case "number":
              return (
                <NumberField key={index} source={field.name} label={field?.label}/>
              );
            case "reference":
              return (
                <ReferenceField
                  key={index}
                  source={field.name}
                  reference={field.reference}
                >
                  <TextField source="name" />
                </ReferenceField>
              );
            case "referenceNested":
              return (
                <ReferenceField
                  key={index}
                  source={field.name}
                  reference={field.reference}
                >
                  {field.children}
                </ReferenceField>
              );
            default:
              return undefined;
          }
        })}
      {hasShowButton && <ShowButton />}
      {HasPermissions(resource, "update") && <EditButton />}
    </Datagrid>
  );
};

export default ListBuilder;
