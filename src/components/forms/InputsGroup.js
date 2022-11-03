import { Grid } from "@mui/material";
import { TextInput, DateInput } from "react-admin";

export const InputsGroup = ({ inputsList }) => {
  return (
    <>
        {
          inputsList && inputsList.map( (item, index) => {
                return (
                    <Grid item xs={12} sm={6} md={4}>
                      {
                        item.type === "date"  
                        ? <DateInput source={item.name} key={index} fullWidth /> 
                        : <TextInput source={item.name} key={index} multiline fullWidth />
                      }
                    </Grid>
                )
            })
        }
    </>
  );
};
