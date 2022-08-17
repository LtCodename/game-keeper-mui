/**
 * Platform interface.
 * @member {string} iconName The name of the icon for the platform.
 * @member {string} name The name of the platform.
 */
export interface IPlatform {
  id: string;
  name: string;
}

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
 * @member {IPlatform[]} platforms A list of platforms you can select in a game details modal.
 * @member {IUserList[]} userLists A list of lists created by a user.
 * @member {IUserSection[]} userSections A list of sections created by a user.
 */
export interface IStore {
  platforms: IPlatform[];
  userLists: IUserList[];
  userSections: IUserSection[];
}
