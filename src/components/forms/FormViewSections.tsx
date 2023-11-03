import * as React from "react";
import {
  useLocaleState,
  DateField,
  NumberField,
  TextField,
  ReferenceField,
  ArrayField,
  SingleFieldList,
  Labeled
} from "react-admin";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { CustomizableChipField } from "../fields";
import { IPaymentSettlement } from "../../types";

const FormViewSections = (config: any) => {
  const [locale] = useLocaleState();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  return (
    <Box>
      <Typography variant="h6" color={"#2196F3"}>
        {config.formSectionTitle}
        
      </Typography>
      <Box
        m="0.5px"
        display="grid"
        gap="5px"
        gridTemplateColumns="repeat(2, minmax(0,1fr))"
        sx={{
          "& > div": {
            gridColumn: isNonMobile ? undefined : "span 4",
          },
        }}
      >
        {config.inputsList && config.inputsList.map((listItem: any, listIndex: any) => {
            return (
              <Box>      
                {listItem.type === "date" ? (
                  <Labeled label={listItem.label}>
                    <DateField
                      source={listItem.name}
                      sx={{ gridColumn: "span 2" }}
                      locales={locale}
                    />
                  </Labeled>
                ) : undefined}
                {listItem.type === "string" ? (
                  <Labeled>
                    <TextField
                      source={listItem.name}
                      sx={{ gridColumn: "span 2" }}
                    />
                  </Labeled>
                ) : undefined}
                {listItem.type === "email" ? (
                  <Labeled>
                    <TextField
                      source={listItem.name}
                      sx={{ gridColumn: "span 2" }}
                    />
                  </Labeled>
                ) : undefined}
                {listItem.type === "number" ? (
                  <Labeled>
                    <NumberField
                      source={listItem.name}
                      sx={{ gridColumn: "span 2" }}
                    />
                  </Labeled>
                ) : undefined}
                
                {listItem.type === "selectList" ? (
                  <Labeled>
                    <TextField source={listItem.name} />
                  </Labeled>
                ) : undefined}
                {listItem.type === "selectInput" && !listItem.referenceValues.optionText ? (
                  <Labeled>
                    <ReferenceField 
                      source={listItem.referenceValues.source} 
                      reference={listItem.referenceValues.reference} 
                      />
                  </Labeled>
                  ) : undefined}

                {listItem.type === "selectInput" && listItem.referenceValues.optionText ? (
                  <Labeled>
                    <ReferenceField 
                      source={listItem.referenceValues.source} 
                      reference={listItem.referenceValues.reference} 
                      >
                        <TextField source={listItem.referenceValues.optionText}></TextField>
                    </ReferenceField> 
                        
                  </Labeled>
                  ) : undefined}
              </Box>
            );
          })}
        {config.customSections &&
          config.customSections.includes("paymentSettlementSection") && (
            <Box>
            <Labeled>
              <ArrayField source="paymentSettlement" label="Salary">
                <SingleFieldList linkType={false}>
                  <CustomizableChipField<IPaymentSettlement>>
                    {(record) => {
                      if (record) {
                        const salary =
                          `${record.salary}` === "null" ? "-" : `${record.salary}`;
                        const label = `${record.currency} ${salary}/${record.modality
                          .charAt(0)
                          .toLowerCase()}`;
                        return label;
                      }
                    }}
                  </CustomizableChipField>
                </SingleFieldList>
              </ArrayField>
            </Labeled>
            </Box>
          )}
        {config.customSections && config.customSections.includes("notesSection") && (
          <Labeled>
            <TextField source="notes" />
          </Labeled>
        )}
      </Box>
    </Box>
  );
};

export default FormViewSections;
