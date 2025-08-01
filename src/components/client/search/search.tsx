import { TextField } from "@mui/material";
import React from "react";

interface SearchProps {
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search = ({ onSearchChange }: SearchProps) => {
  return (
    <TextField
      id="standard-search"
      label="suchen"
      type="search"
      variant="standard"
      onChange={onSearchChange}
    />
  );
};

export default Search;
