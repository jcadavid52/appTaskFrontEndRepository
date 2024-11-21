import {  Dialog, DialogActions, DialogContent, DialogProps, DialogTitle } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { TaskContext2 } from "../Context/ContextTask";
import BasicButton from "../../../MauiComponents/BasicButton";
import FormEdit from "./FormEdit";
import "../../../assets/css/FormEdit.css"

const ModalEdit = () => {
  const [scroll,] = useState<DialogProps["scroll"]>("paper");

  const data = useContext(TaskContext2);

  const descriptionElementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (data?.modalEdit) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [data?.modalEdit]);


  return (
    <div>
      <Dialog
        open={data?.modalEdit || false}
        onClose={data?.closeModal}
        scroll={scroll}
        aria-describedby="scroll-dialog-description"
        maxWidth={"xs"}
        fullWidth
      >
        <DialogTitle id="scroll-dialog-title">Edit Task</DialogTitle>
        <DialogContent  dividers={scroll === "paper"}>

          <FormEdit classCss={{
            formContainer:"form-container-update",
            inputContainer:"input-container-update",
            itemInputContainer:"item-input-container-update",
            buttonContainer:"button-container-update"
          }}/>
        </DialogContent>
        <DialogActions>
          <BasicButton title="Close" buttonProps={{
            type:"button",
            onClick:data?.closeModal
          }}/>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default ModalEdit;