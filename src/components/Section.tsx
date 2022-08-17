import React, { useEffect, useState } from "react";

import {
  Accordion,
  Typography,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material/";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { IUserSection } from "types";

const Section = ({ name, id, listId }: IUserSection) => {
  const [isSectionExpanded, setIsSectionExpanded] = useState<boolean>(true);

  useEffect(() => {}, [id, listId]);

  const toggleSection = () => {
    setIsSectionExpanded((previousState: boolean) => !previousState);
  };

  return (
    <Accordion expanded={isSectionExpanded} onChange={toggleSection}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>Game blocks will be rendered here.</Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default Section;
