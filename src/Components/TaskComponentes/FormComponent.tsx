import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import "../../assets/css/FormComponent.css";
import SaveIcon from "@mui/icons-material/Save";
import { InputProps, InputSelectProps } from "../../Types/TaskInterface";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

interface FormularioProps {
  titleForm?: string;
  inputProps?: InputProps[];
  sendElement?: (model: any) => void;
  handleChange?: (event: SelectChangeEvent) => void;
  classCss: {
    formContainer?: string;
    inputContainer?: string;
    itemInputContainer?: string;
    buttonContainer?: string;
    
  };

  inputSelectProps?: InputSelectProps[];
}
export function FormComponent(props: FormularioProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<any>();

  const onSubmit = handleSubmit(async (model: any) => {
    props.sendElement(model);

    reset();
  });

  return (
    <div className={props.classCss.formContainer}>
      <h3>{props.titleForm}</h3>
      <form onSubmit={onSubmit}>
        <div className={props.classCss.inputContainer}>
          {props.inputProps &&
            props.inputProps.map((item, index) => (
              <div
                className={props.classCss.itemInputContainer}
                key={index}
                hidden={item.hidden}
              >
                <TextField
                  fullWidth
                  sx={item.cssTextField}
                  id={item.id}
                  type={item.type}
                  label={item.label}
                  variant={item.variant}
                  color={item.color}
                  {...register(item.name, {
                    required: {
                      value: item.required,
                      message: "This field is required",
                    },
                    minLength: {
                      value: item.minLength,
                      message: item.messageMinLength,
                    },
                  })}
                  defaultValue={item.defaultValue}
                />

                {errors[item.name] && <span>{errors[item.name].message}</span>}
              </div>
            ))}

          {props.inputSelectProps &&
            props.inputSelectProps.map((item, index) => (
              <div key={index} className={props.classCss.itemInputContainer}>
                <FormControl sx={{  minWidth: 1 }}>
                  <InputLabel id="demo-simple-select-label">
                    {item.label}
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id={item.id}
                    value={item.value}
                    label={item.label}
                    {...register(item.name, {
                      required: {
                        value: item.required,
                        message: "This field is required",
                      },
                      onChange: props.handleChange,
                    })}
                    
                  >
                    <MenuItem value={"in-progress"} >In-Progress</MenuItem>
                    <MenuItem value={"done"}>Done</MenuItem>
                    <MenuItem value={"todo"}>Todo</MenuItem>
                    
                  </Select>
                </FormControl>

                {errors[item.name] && <span>{errors[item.name].message}</span>}
              </div>
            ))}

          <div className={props.classCss.buttonContainer}>
            <Button
              variant="contained"
              type="submit"
              size="small"
              startIcon={<SaveIcon color="success" />}
            >
              Save
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
