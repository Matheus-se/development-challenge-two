import { Items } from "../models/Items.model";
import SearchIcon from "@mui/icons-material/Search";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import EditIcon from "@mui/icons-material/Edit";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

export const items: Items[] = [
    {
      image: <SearchIcon fontSize="large" sx={{ color: "white" }} />,
      title: (
        <>
          SEARCH
          <br />
          PATIENTS
        </>
      ),
      description: "Search patients by name or e-mail.",
    },
    {
      image: <AddReactionIcon fontSize="large" sx={{ color: "white" }} />,
      title: (
        <>
          ADD
          <br />
          PATIENTS
        </>
      ),
      description: "Add a new patient to the list.",
    },
    {
      image: <EditIcon fontSize="large" sx={{ color: "white" }} />,
      title: (
        <>
          UPDATE
          <br />
          PATIENTS
        </>
      ),
      description: "Update patients data.",
    },
    {
      image: <PersonRemoveIcon fontSize="large" sx={{ color: "white" }} />,
      title: (
        <>
          REMOVE
          <br />
          PATIENTS
        </>
      ),
      description: "Remove a patient from the list.",
    },
  ];