import React, { useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

import { ISpeedDialAction, IStore, IUserList, IUserSection } from "types";

import {
  Box,
  Typography,
  Stack,
  SpeedDial,
  SpeedDialAction,
} from "@mui/material/";

import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import AddIcon from "@mui/icons-material/Add";

import Section from "components/Section";
import AddSectionDialog from "components/AddDialogs/AddSectionDialog";

const speedDialActions: ISpeedDialAction[] = [
  { icon: <AddIcon />, name: "Add section" },
];

const List = () => {
  const navigate = useNavigate();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);

  const userData: any = useSelector((state: IStore) => state.userData) || null;

  const location: any = useLocation();

  const listId: string = location.pathname.replace(/[/]/, "");

  const userLists: IUserList[] =
    useSelector((state: IStore) => state.userLists) || [];

  const sections: IUserSection[] =
    useSelector((state: IStore) => state.userSections).filter(
      (section: IUserSection) => section.listId === listId
    ) || [];

  const list: IUserList | undefined = userLists.find(
    (list: IUserList) => list.id === listId
  );

  useEffect(() => {
    if (!userData) {
      navigate("/login", { replace: true });
    }
  }, [userData]);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 1 }}>
        {list?.name}
      </Typography>
      <Stack direction="column" spacing={2} sx={{ flexWrap: "wrap" }}>
        {sections.map((section: IUserSection) => (
          <Section key={section.id} {...section} />
        ))}
      </Stack>
      <SpeedDial
        ariaLabel="list actions"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {speedDialActions.map((action: ISpeedDialAction) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => setIsAddDialogOpen(true)}
          />
        ))}
      </SpeedDial>
      {isAddDialogOpen && (
        <AddSectionDialog
          open={isAddDialogOpen}
          handleClose={() => setIsAddDialogOpen(false)}
          listId={listId}
        />
      )}
    </Box>
  );
};

export default List;
