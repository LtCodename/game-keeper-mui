import React, { useState, useEffect } from "react";

import SearchIcon from "@mui/icons-material/Search";

import { IUserBlock, IStore } from "types";

import { useSelector } from "react-redux";

import SearchResultItem from "components/SearchResultItem";

import { Box, Stack } from "@mui/material";

import { grey } from "@mui/material/colors";

import { Search, SearchIconWrapper, StyledInputBase } from "./styles";

const HeaderSearchBar = () => {
  const [searchResults, setSearchResults] = useState<IUserBlock[]>([]);
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const [isResultDisplayed, setIsResultDisplayed] = useState<boolean>(false);

  const userBlocks: IUserBlock[] =
    useSelector((state: IStore) => state.userBlocks) || [];

  const filter = (): void => {
    const filtered: IUserBlock[] = userBlocks.filter(
      (game: IUserBlock) =>
        game.name.toLowerCase().indexOf(searchInputValue.toLowerCase()) > -1
    );
    setSearchResults(filtered);
  };

  const onGameSelect = (id: string): void => {
    console.log(id);
  };

  useEffect(() => {
    Boolean(searchResults.length);
    setIsResultDisplayed(Boolean(searchResults.length));
  }, [searchResults]);

  useEffect(() => {
    if (searchInputValue.length) {
      filter();
    } else {
      setIsResultDisplayed(false);
    }
  }, [searchInputValue]);

  return (
    <Search sx={{ minWidth: { xs: "auto", sm: "300px" } }}>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search games"
        inputProps={{ "aria-label": "search" }}
        onChange={(
          event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => {
          setSearchInputValue(event.currentTarget.value);
        }}
      />

      {isResultDisplayed && (
        <Box
          sx={{
            position: "absolute",
            zIndex: 9999,
            px: 2,
            pt: 2,
            pb: 1,
            backgroundColor: grey[300],
            borderRadius: "4px",
            minWidth: { xs: "auto", sm: "350px" },
            left: "-40px",
            top: "45px",
            right: 0,
            my: 0,
            mx: "auto",
          }}
        >
          <Stack
            direction="column"
            spacing={1}
            sx={{
              overflowY: "auto",
              maxHeight: 600,
            }}
          >
            {searchResults.map((game: IUserBlock) => (
              <Box
                sx={{
                  "&:last-child": {
                    mb: 1,
                  },
                }}
              >
                <SearchResultItem
                  key={game.id}
                  onClick={() => onGameSelect(game.id)}
                  name={game.name}
                />
              </Box>
            ))}
          </Stack>
        </Box>
      )}
    </Search>
  );
};

export default HeaderSearchBar;
