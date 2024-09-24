import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { InputProps } from "../Types/TaskInterface";
import { Button } from "@mui/material";


interface FormularioProps<T> {
  agregarElemento: (nuevoElemento: { description: string }) => void;
  inputProps: InputProps[];
  handleSubmitData:(data:T) => void;
}
const FormPrueba = <T,>({
  agregarElemento,
  inputProps,
  handleSubmitData
}: FormularioProps<T>) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<T>();

  const onSubmit = handleSubmit(async (data: T) => {
   
    handleSubmitData(data)

    reset()
    
  });
  return (
    <div style={{ color: "white" }}>
      <form onSubmit={onSubmit}>
        {inputProps.length > 0 ? (
          <div>
            {inputProps.map((item, index) => (
              <div key={index}>
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
          </div>
        ) : (
          <div>no hay inputs para mostrar</div>
        )}

        <Button
          variant="contained"
          type="submit"
          size="small"
          
        >
          Save
        </Button>
      </form>
    </div>
  );
};

export default FormPrueba;
