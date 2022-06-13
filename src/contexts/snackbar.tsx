import { createContext, useState } from "react";
import { IContextProvider } from "../data/interfaces/IContextProvider.interface";
import { ISnackBarlProps } from "../data/interfaces/ISnackBarlProps.interface";

const SnackBarContext = createContext<ISnackBarlProps>({} as ISnackBarlProps);

export const SnackBarProvider: React.FC<IContextProvider> = ({children}) => {
    // Snackbar Dialogs
    const [open, setOpen] = useState(false);
    const [body, setBody] = useState("");
    const [type, setType] = useState("");
    const handleClose = () => setOpen(false);
    const handleOpen = (body: string, type?: string) => {
        setBody(body);
        setType(type || "");
        setOpen(true);
    };

    return (
        <SnackBarContext.Provider value={{open, body, type, handleClose, handleOpen}}>
            {children}
        </SnackBarContext.Provider>
    )
} 

export default SnackBarContext;