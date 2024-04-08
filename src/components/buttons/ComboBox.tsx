import React from "react";
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export interface Props {
  title: string;
  value: "employees" | "clients";
  handleChange: (event: SelectChangeEvent) => void;
  options: ViewOptions[];
}

interface ViewOptions {
  id: number;
  label: string;
  value: "employees" | "clients";
}

const ComboBox = ({
  title,
  value,
  handleChange,
  options,
}: Props) => {
  return (
    <FormControl>
        <InputLabel id="combobox-helper-label">{title}</InputLabel>
        <Select
        aria-labelledby="combobox-label"
        name="comboBox"
        value={value}
        label={title}
        onChange={handleChange}
      >
        {options.map((option) => {
          return (
            <MenuItem value={option.value} key={option.id}>{option.label}</MenuItem>
          );
        })}
      </Select>
      </FormControl>
  );
};

export default ComboBox;
