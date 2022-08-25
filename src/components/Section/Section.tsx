/**
 * Copyright (c) 2022 Yevhen Chernenko.
 * All rights reserved.
 *
 * https://github.com/LtCodename/game-keeper-mui
 * https://gamekeeper.ltcodename.com
 * https://www.linkedin.com/in/yevhen-chernenko
 * https://ltcodename.com
 */

import React, { useState } from "react";

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

import { useSelector } from "react-redux";

import { ISnackbar, IStore, IUserBlock, IUserSection } from "types";

import AddBlockDialog from "components/AddDialogs/AddBlockDialog/AddBlockDialog";
import Block from "components/Block/Block";
import EditSectionDialog from "components/Section/EditSectionDialog";
import Toast from "components/Toast";

import { grey } from "@mui/material/colors";

import { SHADE_OF_GREY } from "config";

interface Props {
  section: IUserSection;
  listId: string | undefined;
  deleteSectionCallback: (isError: boolean, message: string) => void;
}

const Section = ({ section, listId, deleteSectionCallback }: Props) => {
  const { name, id } = section;

  const [isSectionExpanded, setIsSectionExpanded] = useState<boolean>(true);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);

  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);

  const [snackbarState, setSnackbarState] = useState<ISnackbar>({
    open: false,
    isError: false,
    message: "",
  });

  const blocks: IUserBlock[] =
    useSelector((state: IStore) => state.userBlocks).filter(
      (block: IUserBlock) => block.sectionId === id
    ) || [];

  const toggleSection = () => {
    setIsSectionExpanded((previousState: boolean) => !previousState);
  };

  return (
    <Accordion
      expanded={isSectionExpanded}
      onChange={toggleSection}
      sx={{ backgroundColor: grey[SHADE_OF_GREY] }}
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
          <Typography>{name}</Typography>
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
            .sort((blockA: IUserBlock, blockB: IUserBlock) => {
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
            .map((block: IUserBlock) => (
              <Block
                key={block.id}
                block={block}
                listId={listId}
                deleteBlockCallback={(isError, message) =>
                  setSnackbarState({
                    isError,
                    message,
                    open: true,
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
            setSnackbarState({
              isError,
              message,
              open: true,
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
          callback={(isError, message) =>
            deleteSectionCallback(isError, message)
          }
        />
      )}

      <Toast
        isError={snackbarState.isError}
        message={snackbarState.message}
        open={snackbarState.open}
        onClose={() =>
          setSnackbarState((previousState: ISnackbar) => ({
            ...previousState,
            open: false,
          }))
        }
      />
    </Accordion>
  );
};

export default Section;
