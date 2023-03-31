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

import { useLocation, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

import {
  ISnackbar,
  ISpeedDialAction,
  IStore,
  IUserList,
  IUserSection,
} from "types";

import {
  Box,
  SpeedDial,
  SpeedDialAction,
  Stack,
  Typography,
} from "@mui/material/";

import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import SettingsIcon from "@mui/icons-material/Settings";

import AddSectionDialog from "components/AddDialogs/AddSectionDialog";
import EditListDialog from "components/List/EditListDialog";
import Section from "components/Section/Section";
import Toast from "components/Toast";

const speedDialActions: ISpeedDialAction[] = [
  { icon: <AddIcon />, name: "Add section" },
  { icon: <EditIcon />, name: "Edit list" },
];

const List = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const [snackbarState, setSnackbarState] = useState<ISnackbar>({
    open: false,
    isError: false,
    message: "",
  });

  const userData = useSelector((state: IStore) => state.userData) || null;

  const listId = location.pathname.replace(/[/]/, "");

  const userLists: IUserList[] =
    useSelector((state: IStore) => state.userLists) || [];

  const list: IUserList | undefined = userLists.find(
    (list: IUserList) => list.id === listId
  );

  const sections: IUserSection[] =
    useSelector((state: IStore) => state.userSections).filter(
      (section: IUserSection) => section.listId === listId
    ) || [];

  useEffect(() => {
    if (!userData) {
      navigate("/login", { replace: true });
    }

    if (!list) {
      setSnackbarState({
        open: true,
        isError: true,
        message: "Wrong route or list ID, redirecting...",
      });
      navigate("/", { replace: true });
    }
  }, [userData, list]);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 1 }}>
        {list?.name}
      </Typography>
      <Stack direction="column" spacing={2}>
        {sections.map((section: IUserSection) => (
          <Section
            key={section.id}
            section={section}
            listId={list?.id}
            deleteSectionCallback={(isError, message) =>
              setSnackbarState({
                isError,
                message,
                open: true,
              })
            }
          />
        ))}
      </Stack>
      <SpeedDial
        ariaLabel="list actions"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
        icon={<SettingsIcon />}
        openIcon={<CloseIcon />}
      >
        {speedDialActions.map((action: ISpeedDialAction, index: number) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => {
              switch (index) {
                case 0:
                  setIsAddDialogOpen(true);
                  break;
                case 1:
                  setIsEditDialogOpen(true);
                  break;
                default:
                  setIsAddDialogOpen(true);
              }
            }}
          />
        ))}
      </SpeedDial>

      {isAddDialogOpen && (
        <AddSectionDialog
          open={isAddDialogOpen}
          handleClose={() => setIsAddDialogOpen(false)}
          listId={listId}
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
        <EditListDialog
          open={isEditDialogOpen}
          handleClose={() => setIsEditDialogOpen(false)}
          listId={listId}
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
    </Box>
  );
};

export default List;
