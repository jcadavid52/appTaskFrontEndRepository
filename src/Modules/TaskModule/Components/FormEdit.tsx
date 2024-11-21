import { useContext } from "react";
import BasicTextField from "../../../MauiComponents/BasicTextField";
import { TaskContext2 } from "../Context/ContextTask";
import BasicButton from "../../../MauiComponents/BasicButton";
import { useForm } from "react-hook-form";
import { FormProps, TaskType } from "../../../Types/TaskInterface";

export default function FormEdit(props: FormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskType>();

  const data = useContext(TaskContext2);

  const onSubmit = handleSubmit(async (model: TaskType) => {
    data?.updateTask(model);
  });
  return (
    <div className={props.classCss.formContainer}>
      <form onSubmit={onSubmit}>
        <div className={props.classCss.inputContainer}>
          <div hidden>
            <BasicTextField
              inputProps={{
                defaultValue: data?.modelUpdate?.id,
                ...register("id"),
              }}
            />
          </div>
          <div className={props.classCss.itemInputContainer}>
            <BasicTextField
              inputProps={{
                fullWidth: true,
                defaultValue: data?.modelUpdate?.description,
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
              }}
            />
          </div>
          {errors["description"] && (
            <span>{errors["description"].message}</span>
          )}
          <div className={props.classCss.buttonContainer}>
            <BasicButton
              title="Edit"
              buttonProps={{
                type: "submit",
                color: "success",
                variant: "outlined",
              }}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
