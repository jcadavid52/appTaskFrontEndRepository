import { SxProps, TextField, TextFieldProps, Theme } from "@mui/material";
interface TextFieldProps2 {
  // name: string;
  textFieldStyle?: SxProps<Theme>;
  inputProps:TextFieldProps
}
export default function BasicTextField(props: TextFieldProps2) {
  return (
    <TextField
      fullWidth
      {...props.inputProps}
      sx={props.textFieldStyle}
      
    />
  );
}
