/**
 * User list interface.
 * @member {string} id User list id.
 * @member {string} name User list name.
 */
export interface IUserList {
  id: string;
  name: string;
}

/**
 * User section interface.
 * @member {string} id User section id.
 * @member {string} name User section name.
 * @member {string} listId Id of the list this section belongs to.
 */
export interface IUserSection {
  id: string;
  name: string;
  listId: string;
}

/**
 * User block interface.
 * @member {string} id User block id.
 * @member {string} apiId User block id in RAWG.IO database.
 * @member {string} developers User block developers list.
 * @member {string} releaseDate User block release date.
 * @member {string} sectionId Id of the section this block belongs to.
 */
export interface IUserBlock {
  id: string;
  apiId: string;
  developers: string;
  name: string;
  releaseDate: string;
  sectionId: string;
}

/**
 * Action interface.
 * @member {string} type Action type. Usually looks like this - DO_SOMETHING. A command for a reducer.
 * @member {string} payload Payload of the dispatch. Can be anything.
 */
export interface IAction {
  type: string;
  payload: any;
}

/**
 * Store interface.
 * @member {IUserList[]} userLists A list of lists created by a user.
 * @member {IUserSection[]} userSections A list of sections created by a user.
 * @member {IUserBlock[]} userBlocks A list of blocks created by a user.
 * @member {any} userData Info about current user.
 */
export interface IStore {
  userLists: IUserList[];
  userSections: IUserSection[];
  userBlocks: IUserBlock[];
  userData: any;
}
