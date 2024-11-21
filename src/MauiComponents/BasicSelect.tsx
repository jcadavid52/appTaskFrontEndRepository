import { MenuItem, Select, SelectProps } from "@mui/material";
interface BasicSelectProps {
  selectProps: SelectProps;
}
export default function BasicSelect(props: BasicSelectProps) {
  return (
    <Select {...props.selectProps}>
      <MenuItem value={"in-progress"}>In-Progress</MenuItem>
      <MenuItem value={"done"}>Done</MenuItem>
      <MenuItem value={"todo"}>Todo</MenuItem>
    </Select>
  );
}
