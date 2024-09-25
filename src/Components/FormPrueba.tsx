import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { InputProps } from "../Types/TaskInterface";
import { Button } from "@mui/material";
import "../assets/css/FormComponent.css";
import SaveIcon from "@mui/icons-material/Save";

interface FormularioProps<T> {
  agregarElemento: (nuevoElemento: { description: string }) => void;
  inputProps: InputProps[];
  handleSubmitData: (data: T) => void;
}
const FormPrueba = <T,>({
  inputProps,
  handleSubmitData,
}: FormularioProps<T>) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<T>();

  const onSubmit = handleSubmit(async (data: T) => {
    handleSubmitData(data);

    reset();
  });
  return (
    <div className="form-container">
      <h3>Add Task</h3>
      <form onSubmit={onSubmit}>
        <div className="input-container">
          {inputProps.map((item, index) => (
            <div className="item-input-container" key={index}>
              <TextField
                id={item.id}
                type={item.type}
                label={item.label}
                variant={item.variant}
                color={item.color}
                focused={item.focused}
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
              />

              {errors[item.name] && <span>{errors[item.name].message}</span>}
            </div>
          ))}
          <div className="item-input-container button-container">
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
};

export default FormPrueba;
