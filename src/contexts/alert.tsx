import { createContext, useContext, useState } from "react";
import { IAlert } from "../data/interfaces/IAlert";
import {IContextProvider as ModalProviderProps} from "../data/interfaces/IContextProvider.interface";
import PatientsContext from "./patients";

const AlertContext = createContext<IAlert>({} as IAlert);

export const AlertProvider: React.FC<ModalProviderProps> = ({children}) => {
    const {deletePatient} = useContext(PatientsContext);
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [buttons, setButtons] = useState([] as JSX.Element[]);
    const handleClose = async () => {
        setOpen(false);
    };
    const handleDelete = async (patientId: string) => {
        setOpen(false);
        deletePatient(patientId);
    };
    const handleOpenAlert = (title: string, content: string, buttons: JSX.Element[]) => {
        setOpen(true);
        setTitle(title);
        setContent(content);
        setButtons(buttons);
    };

    return (
        <AlertContext.Provider value={{title, open, content, buttons, handleClose, handleDelete, handleOpenAlert}}>
            {children}
        </AlertContext.Provider>
    )
} 

export default AlertContext;