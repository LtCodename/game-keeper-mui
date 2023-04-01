/**
 * Copyright (c) 2022 Yevhen Chernenko.
 * All rights reserved.
 *
 * https://github.com/LtCodename/game-keeper-mui
 * https://gamekeeper.ltcodename.com
 * https://www.linkedin.com/in/yevhen-chernenko
 * https://ltcodename.com
 */

import type { User } from "firebase/auth";

export interface UserList {
  id: string;
  name: string;
}
export interface UserSection {
  id: string;
  name: string;
  listId: string;
  type?: string;
  collapsed?: boolean;
}
export interface UserBlock {
  id: string;
  apiId: number;
  developers: string;
  name: string;
  releaseDate: string;
  sectionId: string;
  listName?: string;
  sectionName?: string;
}
export interface Action {
  type: string;
  payload: UserList[] | UserSection[] | UserBlock[] | User;
}
export interface Store {
  userLists: UserList[];
  userSections: UserSection[];
  userBlocks: UserBlock[];
  userData: User;
}
