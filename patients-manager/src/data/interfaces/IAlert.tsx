export interface IAlert {
    open: boolean,
    title: string,
    content: string,
    buttons: JSX.Element[],
    handleClose: () => void,
    handleDelete: (id: string) => void,
    handleOpenAlert: (title: string, content: string, buttons: JSX.Element[]) => void,
}