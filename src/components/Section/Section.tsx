import React, { useState } from "react";

import {
  Accordion,
  Typography,
  AccordionSummary,
  AccordionDetails,
  Stack,
  Button,
  Box,
} from "@mui/material/";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useSelector } from "react-redux";

import { ISnackbar, IStore, IUserBlock, IUserSection } from "types";

import { yellow } from "@mui/material/colors";

import Toast from "components/Toast";
import Block from "../Block/Block";
import AddBlockDialog from "../AddDialogs/AddBlockDialog/AddBlockDialog";
import EditSectionDialog from "./EditSectionDialog";

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
      sx={{ backgroundColor: yellow[400] }}
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
