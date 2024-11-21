import { useContext, useState } from "react";
import BasicTextField from "../../../MauiComponents/BasicTextField";
import { TaskContext2 } from "../Context/ContextTask";
import BasicButton from "../../../MauiComponents/BasicButton";
import { useForm } from "react-hook-form";
import { FormProps, TaskType } from "../../../Types/TaskInterface";
import BasicSelect from "../../../MauiComponents/BasicSelect";

export default function FormEditStatus(props: FormProps) {

    const [status, setStatus] = useState('');

    const handleChange = (event:string) => {
        setStatus(event);
    };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskType>();

  const data = useContext(TaskContext2);

  const onSubmit = handleSubmit(async (model: TaskType) => {
    
   
    data?.updateStatusTask(model);
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
            <BasicSelect selectProps={{
                ...register("status",{
                  required:{
                    value:true,
                    message: "This field is required"
                  }
                }),
                label:"Status",
               labelId:"demo-simple-select-label",
               id:data?.modelUpdate?.id,
               value:status != '' ? status: data?.modelUpdate?.status,
               onChange:(event) => handleChange(event.target.value as string),
               name:"status"
               
            }}/>
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
