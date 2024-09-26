import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import "../../assets/css/FormComponent.css";
import SaveIcon from "@mui/icons-material/Save";
import { TaskContext } from "../../Context/TaskContext";
import { useContext } from "react";

interface FormularioProps {
  titleForm?: string;
}
export function FormComponent(props: FormularioProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<any>();

  const data = useContext(TaskContext);

  const onSubmit = handleSubmit(async (model: any) => {
    data?.createElement(model);

    reset();
  });

  return (
    <div className="form-container">
      <h3>{props.titleForm}</h3>
      <form onSubmit={onSubmit}>
        <div className="input-container">
          {data?.inputProps.map((item, index) => (
            <div
              className="item-input-container"
              key={index}
              hidden={item.hidden}
            >
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
                defaultValue={item.defaultValue}
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
}
