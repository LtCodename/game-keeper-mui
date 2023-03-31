/**
 * Copyright (c) 2022 Yevhen Chernenko.
 * All rights reserved.
 *
 * https://github.com/LtCodename/game-keeper-mui
 * https://gamekeeper.ltcodename.com
 * https://www.linkedin.com/in/yevhen-chernenko
 * https://ltcodename.com
 */

import { User } from "firebase/auth";

export interface IUserList {
  id: string;
  name: string;
}
export interface IUserSection {
  id: string;
  name: string;
  listId: string;
  type?: string;
  collapsed?: boolean;
}
export interface IUserBlock {
  id: string;
  apiId: number;
  developers: string;
  name: string;
  releaseDate: string;
  sectionId: string;
  listName?: string;
  sectionName?: string;
}
export interface IAction {
  type: string;
  payload: IUserList[] | IUserSection[] | IUserBlock[] | User;
}
export interface IStore {
  userLists: IUserList[];
  userSections: IUserSection[];
  userBlocks: IUserBlock[];
  userData: User;
}
export interface ISpeedDialAction {
  icon: React.ReactElement;
  name: string;
}
export interface IRawgSearchResult {
  name: string;
  id: string;
}
export interface IRawgSearchResponse {
  count: string;
  next: number | null;
  previous: number | null;
  results: IRawgSearchResult[];
}
export interface ISnackbar {
  message: string;
  isError: boolean;
  open: boolean;
}

export interface ILoginForm {
  email: string;
  password: string;
}

export interface IAddListForm {
  listName: string;
}

export interface IAddSectionForm {
  sectionName: string;
}

export interface IEditListForm {
  name: string;
}

export interface IEditSectionForm {
  name: string;
}

export interface IRawgGame {
  name: string;
  released: string;
  id: number;
  developers: IRawgDeveloper[];
}

export interface IRawgDeveloper {
  name: string;
  id: number;
}
