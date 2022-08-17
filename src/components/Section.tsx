import React, { useState } from "react";

import {
  Accordion,
  Typography,
  AccordionSummary,
  AccordionDetails,
  Stack,
} from "@mui/material/";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useSelector } from "react-redux";

import { IStore, IUserBlock, IUserSection } from "types";

import { yellow } from "@mui/material/colors";

import Block from "./Block";

const Section = ({ name, id }: IUserSection) => {
  const [isSectionExpanded, setIsSectionExpanded] = useState<boolean>(false);
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
        <Typography>{name === "No Section" ? "Roster" : name}</Typography>
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
              <Block key={block.id} {...block} />
            ))}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default Section;
