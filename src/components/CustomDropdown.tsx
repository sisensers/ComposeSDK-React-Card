import React from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

interface CustomDropdownProps {
  label: string;
  value: string | null;
  options: string[];
  onChange: (value: string) => void;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  label,
  value,
  options,
  onChange,
}) => {
  return (
    <FormControl
      variant="outlined"
      size="small"
      style={{ minWidth: 120, marginRight: 8 }} 
    >
      <InputLabel style={{ fontSize: 12 }}>{label}</InputLabel>
      <Select
        value={value || ""}
        onChange={(e) => onChange(e.target.value as string)}
        label={label}
        style={{ fontSize: 12 }}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomDropdown;
