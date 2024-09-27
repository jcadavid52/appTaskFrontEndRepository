import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import "../../assets/css/FormComponent.css";
import SaveIcon from "@mui/icons-material/Save";
import { TaskContext } from "../../Context/TaskContext";
import { useContext } from "react";
import { InputProps } from "../../Types/TaskInterface";
import { styled } from '@mui/material/styles';
import { SxProps, Theme } from '@mui/system';



interface FormularioProps {
  titleForm?: string;
  inputProps: InputProps[];
  sendElement: (model: any) => void;
  classCss: {
    formContainer: string;
    inputContainer: string;
    itemInputContainer: string;
    buttonContainer:string

  };
  
}
export function FormComponent(props: FormularioProps) {

  const CssTextField:SxProps<Theme> = {

    '& label.MuiInputLabel-root': {
      color: '#dc7633',
    },
    
     '& label.Mui': {
      color: 'blue',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'red',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'blue',
        
      },
      '&:hover fieldset': {
        borderColor: 'yellow',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'red',
      },
      
    },

    'input':{
      color:"red"
    }
  }



  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<any>();

  const data = useContext(TaskContext);

  const onSubmit = handleSubmit(async (model: any) => {
    props.sendElement(model);

    reset();
  });

  return (
    <div className={props.classCss.formContainer}>
      <h3>{props.titleForm}</h3>
      <form onSubmit={onSubmit}>
        <div className={props.classCss.inputContainer}>
          {props.inputProps.map((item, index) => (
            <div
              className={props.classCss.itemInputContainer}
              key={index}
              hidden={item.hidden}
            >
              <TextField
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
