import { Box, Button, ButtonGroup, IconButton, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useContext, useState } from "react";
import PatientsContext from "../../contexts/patients";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { searchPatients } = useContext(PatientsContext);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        searchPatients(search);
      }}
    >
      <Box className="box" sx={{ display: "flex", alignItems: "flex-end" }}>
        <ButtonGroup className="button-group" variant="outlined">
          <Button
            className="button-input"
            disableRipple
            variant="text"
            sx={{ p: 0 }}
          >
            <TextField
              hiddenLabel
              className="input"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              placeholder="Search by name or e-mail."
              variant="outlined"
              size="small"
              fullWidth
            />
          </Button>
          <Button type="submit" size="small" sx={{ p: 0 }} variant="contained">
            <SearchIcon sx={{ color: "white" }} />
          </Button>
        </ButtonGroup>
      </Box>
    </form>
  );
};

export default SearchInput;
