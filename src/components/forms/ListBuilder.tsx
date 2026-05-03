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
import { IconButton, Tooltip, Box } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { HasPermissions } from "../layout/CustomActions";
import { STATUS_COLOR_LEGEND } from "../../utils/constants";

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
            case "turnoverRisk":
              return (
                <FunctionField
                  key={index}
                  label={field?.label}
                  render={() => {
                    //const statusColor = record.statusColor || "SILVER";
                    const statusColor = "GREEN"; // Example VAR, to be replaced by record.statusColor
                    const semaphore = STATUS_COLOR_LEGEND.find(l => l.statusColor === statusColor);
                    const isDefault = !semaphore;
                    return (
                      <Tooltip
                        title={isDefault ? "No Status" : semaphore.label}
                        placement="right"
                        arrow
                      >
                        <Box
                          sx={{
                            width: 24,
                            height: 24,
                            borderRadius: "50%",
                            bgcolor: isDefault ? "#bdbdbd" : semaphore.bgcolor,
                            border: "2px solid #fff",
                            boxShadow: 1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        />
                      </Tooltip>
                    );
                  }}
                />
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
