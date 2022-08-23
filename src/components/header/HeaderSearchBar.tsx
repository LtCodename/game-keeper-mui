import React, { useState, useEffect } from "react";

import SearchIcon from "@mui/icons-material/Search";

import { IUserBlock, IStore, IUserSection, IUserList } from "types";

import { useSelector } from "react-redux";

import SearchResultItem from "components/SearchResultItem";

import { Box, Stack } from "@mui/material";

import { grey } from "@mui/material/colors";

import { useNavigate } from "react-router-dom";

import { Search, SearchIconWrapper, StyledInputBase } from "./styles";

const HeaderSearchBar = () => {
  const navigate = useNavigate();

  const [searchResults, setSearchResults] = useState<IUserBlock[]>([]);
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const [isResultDisplayed, setIsResultDisplayed] = useState<boolean>(false);

  const userBlocks: IUserBlock[] =
    useSelector((state: IStore) => state.userBlocks) || [];

  const userSections: IUserSection[] =
    useSelector((state: IStore) => state.userSections) || [];

  const userLists: IUserList[] =
    useSelector((state: IStore) => state.userLists) || [];

  const filter = (): void => {
    const filtered: IUserBlock[] = userBlocks
      .filter(
        (game: IUserBlock) =>
          game.name.toLowerCase().indexOf(searchInputValue.toLowerCase()) > -1
      )
      .map((game: IUserBlock) => {
        const section: IUserSection | undefined = userSections.find(
          (section: IUserSection) => section.id === game.sectionId
        );

        const list: IUserList | undefined = userLists.find(
          (list: IUserList) => list.id === section?.listId
        );

        return {
          ...game,
          listName: list?.name,
          sectionName: section?.name,
        };
      });

    setSearchResults(filtered);
  };

  const onGameSelect = (id: string): void => {
    const block: IUserBlock | undefined = userBlocks.find(
      (block: IUserBlock) => block.id === id
    );

    const section: IUserSection | undefined = userSections.find(
      (section: IUserSection) => section.id === block?.sectionId
    );

    navigate(`/${section?.listId}`, { replace: true });
  };

  useEffect(() => {
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
            {searchResults.map((block: IUserBlock) => (
              <Box
                key={block.id}
                sx={{
                  "&:last-child": {
                    mb: 1,
                  },
                }}
              >
                <SearchResultItem
                  onClick={() => onGameSelect(block.id)}
                  name={block.name}
                  listName={block.listName}
                  sectionName={block.sectionName}
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
