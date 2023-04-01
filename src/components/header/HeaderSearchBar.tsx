/**
 * Copyright (c) 2022 Yevhen Chernenko.
 * All rights reserved.
 *
 * https://github.com/LtCodename/game-keeper-mui
 * https://gamekeeper.ltcodename.com
 * https://www.linkedin.com/in/yevhen-chernenko
 * https://ltcodename.com
 */

import React, { useEffect, useState } from "react";

import SearchIcon from "@mui/icons-material/Search";

import type { Store, UserBlock } from "types";

import { useSelector } from "react-redux";

import SearchResultItem from "components/SearchResultItem";

import { Box, Stack } from "@mui/material";

import { grey } from "@mui/material/colors";

import { useNavigate } from "react-router-dom";

import { SHADE_OF_GREY } from "config";

import { Search, SearchIconWrapper, StyledInputBase } from "./styles";

const HeaderSearchBar = () => {
  const navigate = useNavigate();

  const [searchResults, setSearchResults] = useState<UserBlock[]>([]);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [isResultDisplayed, setIsResultDisplayed] = useState(false);

  const userBlocks = useSelector((state: Store) => state.userBlocks) || [];
  const userSections = useSelector((state: Store) => state.userSections) || [];
  const userLists = useSelector((state: Store) => state.userLists) || [];

  const filter = () => {
    const filtered = userBlocks
      .filter(
        (game) =>
          game.name.toLowerCase().indexOf(searchInputValue.toLowerCase()) > -1
      )
      .map((game) => {
        const section = userSections.find(
          (section) => section.id === game.sectionId
        );

        const list = userLists.find((list) => list.id === section?.listId);

        return {
          ...game,
          listName: list?.name,
          sectionName: section?.name,
        };
      });

    setSearchResults(filtered);
  };

  const onGameSelect = (id: string) => {
    const block = userBlocks.find((block) => block.id === id);
    const section = userSections.find(
      (section) => section.id === block?.sectionId
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
    <Search
      sx={{
        position: "relative",
        minWidth: { xs: "auto", sm: "300px" },
        "& .MuiInputBase-root": {
          width: "100%",
        },
      }}
    >
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
        value={searchInputValue}
      />

      {isResultDisplayed && (
        <Stack
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();

            setSearchInputValue("");
            setIsResultDisplayed(false);
          }}
          sx={{
            position: "fixed",
            cursor: "pointer",
            top: 0,
            left: 0,
            width: 1,
            height: 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              pl: 2,
              pt: 2,
              pb: 1,
              backgroundColor: grey[SHADE_OF_GREY],
              borderRadius: "4px",
              width: 400,
              left: 100,
              top: 50,
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
                pr: 2,
              }}
            >
              {searchResults.map((block) => (
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
        </Stack>
      )}
    </Search>
  );
};

export default HeaderSearchBar;
