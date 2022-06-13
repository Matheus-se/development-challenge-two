export interface ISnackBarlProps {
  body: string;
  open: boolean;
  type: string;
  handleClose: () => void;
  handleOpen: (body: string, type?: string) => void;
}
