import * as React from "react";
import {
  Datagrid,
  DateField,
  EditButton,
  NumberField,
  ReferenceField,
  ShowButton,
  TextField,
  FunctionField,
} from "react-admin";
import { IconButton, Tooltip } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { HasPermissions } from "../layout/CustomActions";

const ListBuilder = ({
  fieldsList,
  locale,
  hasShowButton,
  resource,
}: {
  fieldsList: any[];
  locale: string;
  hasShowButton: boolean;
  resource: string;
}) => {
  return (
    <Datagrid>
      {fieldsList &&
        fieldsList.map((field, index) => {
          switch (field.type) {
            case "text":
              return (
                <TextField
                  key={index}
                  source={field.name}
                  label={field?.label}
                />
              );
            case "textWithCopy":
              return (
                <FunctionField
                  key={index}
                  source={field.name}
                  label={field?.label}
                  render={(record: any) => {
                    const value = record[field.name];
                    const handleCopy = () => {
                      if (value) {
                        navigator.clipboard.writeText(value);
                      }
                    };
                    return (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                        <span>{value || '-'}</span>
                        {value && (
                          <Tooltip title="Copy to clipboard">
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCopy();
                              }}
                              sx={{ padding: '4px' }}
                            >
                              <ContentCopyIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}
                      </div>
                    );
                  }}
                />
              );
            case "date":
              return (
                <DateField
                  key={index}
                  source={field.name}
                  locales={locale}
                  label={field?.label}
                />
              );
            case "number":
              return (
                <NumberField
                  key={index}
                  source={field.name}
                  label={field?.label}
                />
              );
            case "reference":
              return (
                <ReferenceField
                  key={index}
                  source={field.name + "Id"}
                  reference={field.reference}
                  link="show"
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
