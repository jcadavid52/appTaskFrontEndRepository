import { useForm } from "react-hook-form";
import BasicTextField from "../../../MauiComponents/BasicTextField";
import { FormProps, TaskType } from "../../../Types/TaskInterface";
import { useContext } from "react";
import { TaskContext2 } from "../Context/ContextTask";
import "../../../assets/css/FormComponent.css";
import SaveIcon from "@mui/icons-material/Save";
import BasicButton from "../../../MauiComponents/BasicButton";


export default function FormAdd(props: FormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskType>();

  const data = useContext(TaskContext2);

  const onSubmit = handleSubmit(async (model: TaskType) => {
    data?.createTask(model);
    console.log(model);
    reset();
  });
  return (
    <div className={props.classCss.formContainer}>
      <form onSubmit={onSubmit}>
        <div className={props.classCss.inputContainer}>
          <div className={props.classCss.itemInputContainer}>
            <BasicTextField
              textFieldStyle={data?.textFieldStyle}
              inputProps={{
                ...register("description", {
                  required: {
                    value: true,
                    message: "This field is required",
                  },
                  minLength: {
                    value: 3,
                    message:
                      "the task description, cannot be less or equal to two characters",
                  },
                }),
                type: "text",
                label: "Description",
                id: "description",
              }}
            />
            {errors["description"] && (
              <span>{errors["description"].message}</span>
            )}
          </div>

          <div className={props.classCss.buttonContainer}>
            <BasicButton
              title="Save"
              buttonProps={{
                variant: "outlined",
                startIcon: <SaveIcon color="success" />,
                type: "submit",
                size: "small",
              }}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
