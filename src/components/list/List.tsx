import React, { useEffect } from "react";

import { useLocation } from "react-router-dom";

import { useSelector } from "react-redux";

import { IStore, IUserList, IUserSection } from "types";

const List = () => {
  const location: any = useLocation();
  const listId: string = location.pathname.replace(/[/]/, "");

  const userLists: IUserList[] =
    useSelector((state: IStore) => state.userLists) || [];

  const userSections: IUserSection[] =
    useSelector((state: IStore) => state.userSections).filter(
      (section: IUserSection) => section.listId === listId
    ) || [];

  useEffect(() => {
    console.log(listId);
  }, [listId]);

  useEffect(() => {
    console.log(userLists);
  }, [userLists]);

  useEffect(() => {
    console.log(userSections);
  }, [userSections]);

  return (
    <div>
      <div>List</div>
    </div>
  );
};

export default List;
