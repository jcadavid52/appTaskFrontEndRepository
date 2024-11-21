import "../assets/css/TableComponent.css";
import "../assets/css/indexPage.css";
import AlertComponent from "../MauiComponents/AlertComponent";
import ModalEditStatus from "../Modules/TaskModule/Components/ModalEditStatus";
import FormAdd from "../Modules/TaskModule/Components/FormAdd";
import { TableComponent2 } from "../Modules/TaskModule/Components/Table";
import ModalEdit from "../Modules/TaskModule/Components/ModalEdit";

export default function PageIndex() {

  return (
    <>
      <div className="alert-container">
        <AlertComponent />
      </div>
      <div className="pageIndex-container">
      
        <FormAdd classCss={{
            formContainer: "form-container-add",
            inputContainer: "input-container-add",
            itemInputContainer: "item-input-container-add",
            buttonContainer: "button-container-add",
          }}/>
        
        <TableComponent2/>

       
        <ModalEdit/>
        <ModalEditStatus/>
        <ModalEditStatus/>
      </div>
    </>
  );
}
