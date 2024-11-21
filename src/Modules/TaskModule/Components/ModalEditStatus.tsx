import {  Dialog, DialogActions, DialogContent, DialogProps, DialogTitle } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { TaskContext2 } from "../Context/ContextTask";
import BasicButton from "../../../MauiComponents/BasicButton";
import "../../../assets/css/FormEdit.css"
import FormEditStatus from "./FormEditStatus";

const ModalEditStatus = () => {
  const [scroll,] = useState<DialogProps["scroll"]>("paper");

  const data = useContext(TaskContext2);

  const descriptionElementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (data?.openModalEditStatus) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [data?.openModalEditStatus]);


  return (
    <div>
      <Dialog
        open={data?.openModalEditStatus || false}
        onClose={data?.closeModalEditStatus}
        scroll={scroll}
        aria-describedby="scroll-dialog-description"
        maxWidth={"xs"}
        fullWidth
      >
        <DialogTitle id="scroll-dialog-title">Edit Task Status</DialogTitle>
        <DialogContent  dividers={scroll === "paper"}>

          <FormEditStatus classCss={{
            formContainer:"form-container-update",
            inputContainer:"input-container-update",
            itemInputContainer:"item-input-container-update",
            buttonContainer:"button-container-update"
          }}/>
        </DialogContent>
        <DialogActions>
          <BasicButton title="Close" buttonProps={{
            type:"button",
            onClick:data?.closeModalEditStatus
          }}/>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default ModalEditStatus;