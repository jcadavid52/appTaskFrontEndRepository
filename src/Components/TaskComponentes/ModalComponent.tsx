import FormComponent from "./FormComponent";
import { UpdateTask, InputProps } from "../../Types/TaskInterface";

const ModalComponent = () => {
  const HandleSubmitEditTask = (data: UpdateTask) => {
    console.log(data);
  };

  const inputProps: InputProps[] = [
    {
      id: "id",
      type: "text",
      label: "ID",
      variant: "filled",
      color: "secondary",
      name: "id",
      hidden: true,
      defaultValue: "",
    },
    {
      id: "description",
      type: "text",
      label: "Description Task",
      variant: "filled",
      color: "secondary",
      messageMinLength:
        "the task description, cannot be less or equal to two characters",
      minLength: 2,
      name: "description",
      required: true,
      focused: true,
      defaultValue: "",
    },
  ];
  return (
    
      <div>
        <FormComponent
          inputProps={inputProps}
          handleSubmitData={HandleSubmitEditTask}
          titleForm="Edit Task"
        />
      </div>
    
  );
};

export default ModalComponent;
