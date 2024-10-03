import { TableComponent } from "../Components/TaskComponentes/TableComponent";
import "../assets/css/TableComponent.css";
import "../assets/css/indexPage.css";
import { FormComponent } from "../Components/TaskComponentes/FormComponent";
import { TaskContext } from "../Context/TaskContext";
import { useContext } from "react";
import ModalComponent from "../Components/TaskComponentes/ModalComponent";
import ModalComponentEditStatusTask from "../Components/TaskComponentes/ModalComponentEditStatusTask";
import AlertComponent from "../Components/TaskComponentes/AlertComponent";

export default function PageIndex() {
  const data = useContext(TaskContext);

  return (
    <>
      <div className="alert-container">
        <AlertComponent />
      </div>
      <div className="pageIndex-container">
        <FormComponent
          titleForm={"Add Task"}
          inputProps={data?.inputPropsAdd}
          sendElement={data?.createTask}
          classCss={{
            formContainer: "form-container-add",
            inputContainer: "input-container-add",
            itemInputContainer: "item-input-container-add",
            buttonContainer: "button-container-add",
          }}
        />
        <TableComponent title="Task List" />

        <ModalComponent />
        <ModalComponentEditStatusTask />
      </div>
    </>
  );
}
