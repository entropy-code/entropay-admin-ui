import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const RowRadioButtonGroup = ({ title, value, handleChange, options }) => {
    return (
        <FormControl>
            <FormLabel id="row-radio-buttons-group-label">{title}</FormLabel>
            <RadioGroup
                row
                aria-labelledby="row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={value}
                onChange={handleChange}
            >
                {options.map((option) => {
                    return (
                        <FormControlLabel
                            key={option.id}
                            value={option.value}
                            control={<Radio />}
                            label={option.label}
                        />
                    );
                })}
            </RadioGroup>
        </FormControl>
    );
};

export default RowRadioButtonGroup;
