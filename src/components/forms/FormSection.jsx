import { TextInput, DateInput, NumberInput } from "react-admin";
import { Box, Typography, useMediaQuery } from "@mui/material";
import ReferenceInputItem from "./ReferenceInputItem";
import PaymentSection from "./PaymentSection";

const FormSection = ({
  formSectionTitle,
  inputsList,
  referenceValues,
  paymentInformation,
}) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  return (
    <Box>
      <Typography variant="h6" color={"#70d8bd"}>
        {formSectionTitle}
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
        {referenceValues && (
          <ReferenceInputItem referenceValues={referenceValues} />
        )}
        {inputsList &&
          inputsList.map((listItem, listIndex) => {
            return (
              <Box>
                {listItem.type === "date" ? (
                  <DateInput
                    source={listItem.name}
                    key={formSectionTitle + listItem.name + listIndex}
                    fullWidth
                    sx={{ gridColumn: "span 2" }}
                  />
                ) : undefined}
                {listItem.type === "string" ? (
                  <TextInput
                    source={listItem.name}
                    key={formSectionTitle + listItem.name + listIndex}
                    fullWidth
                    sx={{ gridColumn: "span 2" }}
                  />
                ) : undefined}
                {listItem.type === "number" ? (
                  <NumberInput
                    source={listItem.name}
                    key={formSectionTitle + listItem.name + listIndex}
                    fullWidth
                    sx={{ gridColumn: "span 2" }}
                  />
                ) : undefined}
              </Box>
            );
          })}
        {paymentInformation && <PaymentSection />}
      </Box>
    </Box>
  );
};

export default FormSection;
