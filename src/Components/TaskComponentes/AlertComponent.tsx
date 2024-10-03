import React, { useState, useEffect } from 'react';
import { TaskContext } from "../../Context/TaskContext";
import { useContext } from "react";
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';



export default function AlertComponent(){
    const data = useContext(TaskContext);
    useEffect(() => {
 
        const timer = setTimeout(() => {
          data?.handleVisibleAlert(false)
        }, 3000);
    
        
        return () => clearTimeout(timer);
      }, [data?.isVisibleAlert]);
   
  
    return (
      <div>
        {data?.isVisibleAlert && (
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
          {data.messageAlert}
        </Alert>
        )}
      </div>
    );
}