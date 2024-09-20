import "./FormComponent.css";
import BasicTextField from "./BasicTextField";
import BasicButton from "./Button";
import { useForm } from "react-hook-form";

const FormComponent: React.FC = () => {

  const {register} = useForm();

  const registerField = (name: string) => {
    return register(name);
  };

  return (
    <div className="form-container">
      <h3>Add Task</h3>
      <BasicTextField labelValue="Description Task" registerField={registerField}  />
      <BasicButton/>
    </div>
  );
};

export default FormComponent;
