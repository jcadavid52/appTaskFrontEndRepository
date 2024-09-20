import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";



interface TextFieldProps {
  labelValue: string;
  
}
export default function BasicTextField(props: TextFieldProps) {
  return (
    <TextField
      id="filled-basic"
      label={props.labelValue}
      variant="filled"
      className="text-field"
      color="secondary"
      focused
     
    />
  );
}
