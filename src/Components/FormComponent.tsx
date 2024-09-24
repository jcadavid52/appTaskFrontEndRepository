import "../assets/css/FormComponent.css";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { AddTask } from "../Types/TaskInterface";
import { addTask } from "../Api/TasksApi";
import SaveIcon from "@mui/icons-material/Save";

interface FormularioProps {
  agregarElemento: (nuevoElemento: { description: string }) => void;
}

const FormComponent: React.FC<FormularioProps> = ({ agregarElemento }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddTask>();

  

  const onSubmit = handleSubmit(async (data: AddTask) => {
    try {
      let response = await addTask(data);

      if (response == undefined) {
        alert("Hubo un error");
      } else {
      
        agregarElemento(data);

        alert("task add successfully");
      }
    } catch {
      alert("Hubo un error");
    }

    reset();
  });

  return (
    <div className="form-container">
      <h3>Add Task</h3>
      <form onSubmit={onSubmit}>
        <div className="input-container">
          <div className="item-input-container">
            <TextField
              type="text"
              id="filled-basic"
              label={"Description Task"}
              variant="filled"
              color="secondary"
              focused
              {...register("description", {
                required: {
                  value: true,
                  message: "This field is required",
                },
                minLength: {
                  value: 3,
                  message:
                    "the task description, cannot be less or equal to two characters",
                },
              })}
            />
            {errors.description && <span>{errors.description.message}</span>}
          </div>

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

export default FormComponent;
