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
 * Action interface.
 * @member {string} type Action type. Usually looks like this - DO_SOMETHING. A command for a reducer.
 * @member {string} payload Payload of the dispatch. Can be anything.s
 */
export interface IAction {
  type: string;
  payload: any;
}

/**
 * Store interface.
 * @member {string} type Action type. Usually looks like this - DO_SOMETHING. A command for a reducer.
 * @member {string} payload Payload of the dispatch. Can be anything.s
 */
export interface IStore {
  platforms: IPlatform[];
  userLists: IUserList[];
}
