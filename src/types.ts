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
 * @member {string} type User list type.
 */
export interface IUserSection {
  id: string;
  name: string;
  listId: string;
  type?: string;
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

/**
 * Speed dial interface.
 * @member {any} icon Icon name for a speed dial action.
 * @member {string} name Name for a speed dial action.
 */
export interface ISpeedDialAction {
  icon: any;
  name: string;
}

/**
 * RAWG api idividual search result.
 * @member {string} id RAWG game id.
 * @member {string} name RAWG game name.
 */
export interface IRawgSearchResult {
  name: string;
  id: string;
}

/**
 * RRAWG api search result responce.
 * @member {string} count RAWG api search results total count.
 * @member {string} next RAWG api search results next page number.
 * @member {string} previous RAWG api search results prevoius page number.
 * @member {string} results RAWG api search actual result (array of games).
 */
export interface IRawgSearchResponce {
  count: string;
  next: number | null;
  previous: number | null;
  results: IRawgSearchResult[];
}
