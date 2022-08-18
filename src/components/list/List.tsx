import React, { useState, useEffect } from "react";

import { useLocation, Navigate } from "react-router-dom";

import { useSelector } from "react-redux";

import { IStore, IUserList, IUserSection } from "types";

import { Box, Typography, Stack } from "@mui/material/";

import Section from "components/Section";

const List = () => {
  const [isUserPresent, setIsUserPresent] = useState<boolean>(false);

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
    setIsUserPresent(!!userData);
  }, []);

  if (!isUserPresent) {
    return <Navigate to="/login" />;
  }

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
    </Box>
  );
};

export default List;
