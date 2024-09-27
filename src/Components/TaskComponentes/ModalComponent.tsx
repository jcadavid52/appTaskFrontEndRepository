import { FormComponent } from "./FormComponent";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { InputProps } from "../../Types/TaskInterface";
import { TaskContext } from "../../Context/TaskContext";
import { useContext } from "react";

const ModalComponent = () => {
  
  const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper");

  const data = useContext(TaskContext);


  // const handleClickOpen = (scrollType: DialogProps["scroll"]) => () => {
  //   setOpen(true);
  //   setScroll(scrollType);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  const descriptionElementRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (data?.openModal) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [data?.openModal]);

 

  return (
    <div>
      {/* <Button onClick={handleClickOpen("paper")}>scroll=paper</Button> */}

      <Dialog
        open={data?.openModal}
        onClose={data?.closeModal}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        
      >
        <DialogTitle id="scroll-dialog-title">Edit Task</DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
        <FormComponent
          titleForm="Edit Task"
          inputProps={data?.inputPropsEdit}
          sendElement={data?.updateTask}
          classCss={{
            formContainer: "form-container-update",
            inputContainer: "input-container-update",
            itemInputContainer: "item-input-container-update",
            buttonContainer:"button-container-update"
          }}
        />
            
         
        </DialogContent>
        <DialogActions>
          <Button onClick={data?.closeModal} color="error">Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ModalComponent;
