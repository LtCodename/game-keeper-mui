import React, { useState } from "react";

import SearchIcon from "@mui/icons-material/Search";

import { Search, SearchIconWrapper, StyledInputBase } from "./styles";

const SearchBar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  console.log(isDrawerOpen);
  console.log(setIsDrawerOpen);

  return (
    <Search sx={{ minWidth: { xs: "auto", sm: "300px" } }}>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search games"
        inputProps={{ "aria-label": "search" }}
      />
    </Search>
  );
};

export default SearchBar;
