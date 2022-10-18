import { Grid } from "@mui/material";
import { TextInput } from "react-admin";

export const TextInputGroup = ({list}) => {
  return (
    <>
        {
          list && list.map( (item, index) => {
                return (
                    <Grid item xs={12} sm={6} md={4}>
                      <TextInput source={item} key={index} fullWidth />
                    </Grid>
                )
            })
        }
    </>
  );
};
