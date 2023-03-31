/**
 * Copyright (c) 2022 Yevhen Chernenko.
 * All rights reserved.
 *
 * https://github.com/LtCodename/game-keeper-mui
 * https://gamekeeper.ltcodename.com
 * https://www.linkedin.com/in/yevhen-chernenko
 * https://ltcodename.com
 */

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
  payload: any;
}
export interface IStore {
  userLists: IUserList[];
  userSections: IUserSection[];
  userBlocks: IUserBlock[];
  userData: any;
}
export interface ISpeedDialAction {
  icon: any;
  name: string;
}
export interface IRawgSearchResult {
  name: string;
  id: string;
}
export interface IRawgSearchResponce {
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
