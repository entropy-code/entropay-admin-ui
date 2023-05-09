import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export interface Props {
  title: string;
  value: "card" | "list";
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  options: ViewOptions[];
}

interface ViewOptions {
  id: number;
  label: string;
  value: "card" | "list";
}

const RowRadioButtonGroup = ({
  title,
  value,
  handleChange,
  options,
}: Props) => {
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
