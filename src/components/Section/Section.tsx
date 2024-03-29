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

import { useSelector } from "react-redux";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material/";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import type { Store, UserSection } from "types";

import AddBlockDialog from "components/AddDialogs/AddBlockDialog/AddBlockDialog";
import Block from "components/Block/Block";
import EditSectionDialog from "components/Section/EditSectionDialog";

import { useTheme } from "@mui/material/styles";

import { useSnackbar } from "components/Snackbar/SnackbarContext";

interface Props {
  section: UserSection;
  listId: string;
  deleteSectionCallback: (isError: boolean, message: string) => void;
}

const Section = ({ section, listId, deleteSectionCallback }: Props) => {
  const [isSectionExpanded, setIsSectionExpanded] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const theme = useTheme();
  const snackbar = useSnackbar();
  const { name, id } = section;

  const blocks =
    useSelector((state: Store) => state.userBlocks).filter(
      (block) => block.sectionId === id
    ) || [];

  const toggleSection = () => {
    setIsSectionExpanded((previousState) => !previousState);
  };

  useEffect(() => {
    setIsSectionExpanded(!section?.collapsed);
  }, []);

  return (
    <Accordion
      expanded={isSectionExpanded}
      onChange={toggleSection}
      sx={{
        backgroundColor: theme.palette.secondary.light,
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Typography
            color={theme.palette.text.primary}
            fontSize="1.25rem"
            fontWeight={600}
          >
            {name}
          </Typography>
          <Box>
            <Button
              variant="contained"
              onClick={(event: React.MouseEvent<HTMLElement>) => {
                event.stopPropagation();
                setIsAddDialogOpen(true);
              }}
              sx={{ mr: 2 }}
            >
              Add Game
            </Button>
            <Button
              variant="contained"
              onClick={(event: React.MouseEvent<HTMLElement>) => {
                event.stopPropagation();
                setIsEditDialogOpen(true);
              }}
              sx={{ mr: 2 }}
            >
              Edit
            </Button>
          </Box>
        </Box>
      </AccordionSummary>

      <AccordionDetails sx={{ pt: 0 }}>
        <Stack direction="row" sx={{ flexWrap: "wrap" }}>
          {blocks
            .sort((blockA, blockB) => {
              const releaseDateA: string = blockA.releaseDate || "";
              const releaseDateB: string = blockB.releaseDate || "";

              if (releaseDateA < releaseDateB) {
                return -1;
              }
              if (releaseDateA > releaseDateB) {
                return 1;
              }
              return 0;
            })
            .map((block) => (
              <Block
                key={block.id}
                block={block}
                listId={listId}
                deleteBlockCallback={(isError, message) =>
                  snackbar.setMessage({
                    severity: isError ? "error" : "success",
                    message,
                  })
                }
              />
            ))}
        </Stack>
      </AccordionDetails>

      {isAddDialogOpen && (
        <AddBlockDialog
          open={isAddDialogOpen}
          handleClose={() => setIsAddDialogOpen(false)}
          sectionId={id}
          callback={(isError, message) =>
            snackbar.setMessage({
              severity: isError ? "error" : "success",
              message,
            })
          }
        />
      )}

      {isEditDialogOpen && (
        <EditSectionDialog
          open={isEditDialogOpen}
          handleClose={() => setIsEditDialogOpen(false)}
          sectionId={id}
          listId={listId}
          deleteSectionCallback={deleteSectionCallback}
        />
      )}
    </Accordion>
  );
};

export default Section;
