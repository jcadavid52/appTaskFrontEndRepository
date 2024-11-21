import Button, { ButtonProps } from "@mui/material/Button";

interface BasicButtonProps{
    title:string;
    buttonProps:ButtonProps
}

export default function BasicButton(props:BasicButtonProps){
    return(
        <Button
              {...props.buttonProps}
            >
              {props.title}
        </Button>
    )
}