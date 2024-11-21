import { useEffect } from 'react';
import { useContext } from "react";
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { TaskContext2 } from '../Modules/TaskModule/Context/ContextTask';



export default function AlertComponent(){
    const data = useContext(TaskContext2);
    useEffect(() => {
 
        const timer = setTimeout(() => {
          data?.handleVisibleAlert(false)
        }, 3000);
    
        
        return () => clearTimeout(timer);
      });
   
  
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