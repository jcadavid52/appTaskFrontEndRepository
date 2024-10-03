import * as React from "react";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TaskContext } from "../../Context/TaskContext";
import { useContext } from "react";
import { FormComponent } from "./FormComponent";


const ModalComponentEditStatusTask = () => {
    const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper");

    const data = useContext(TaskContext);
  
  
    const descriptionElementRef = React.useRef<HTMLElement>(null);
  
    React.useEffect(() => {
      if (data?.openModalEditStatus) {
        const { current: descriptionElement } = descriptionElementRef;
        if (descriptionElement !== null) {
          descriptionElement.focus();
        }
      }
    }, [data?.openModalEditStatus]);
  
   
  
    return (
      <div>
        {/* <Button onClick={handleClickOpen("paper")}>scroll=paper</Button> */}
  
        <Dialog
          open={data?.openModalEditStatus}
          onClose={data?.closeModalEditStatus}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
          maxWidth={"xs"}
          fullWidth
        
          
        >
          <DialogTitle id="scroll-dialog-title">Edit Status Task</DialogTitle>
          <DialogContent dividers={scroll === "paper"}>
          <FormComponent
            inputSelectProps={data?.inputPropsSelectEditStatus}
            sendElement={data?.updateStatusTask}
            handleChange={data?.onChangeSelect}
            inputProps={data?.inputPropsEditStatus}
            classCss={{
              formContainer: "form-container-update",
              inputContainer: "input-container-update",
              itemInputContainer: "item-input-container-update",
              buttonContainer:"button-container-update"
            }}
          />
              
           
          </DialogContent>
          <DialogActions>
            <Button onClick={data?.closeModalEditStatus} color="error">Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}

export default ModalComponentEditStatusTask;