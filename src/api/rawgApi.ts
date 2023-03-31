/**
 * Copyright (c) 2022 Yevhen Chernenko.
 * All rights reserved.
 *
 * https://github.com/LtCodename/game-keeper-mui
 * https://gamekeeper.ltcodename.com
 * https://www.linkedin.com/in/yevhen-chernenko
 * https://ltcodename.com
 */

import axios from "axios";

import { IRawgGame } from "types";

export async function searchGamesByName(name: string) {
  try {
    const { data } = await axios.get(
      `https://rawg.io/api/games?page_size=20&search=${name}&page=1&key=${"81d6a9bfb35d4a1c8fa5b2ad3b3b97fb"}`,
      {
        headers: {
          /*'User-Agent': 'Game Keeper'*/
        },
      }
    );
    return data;
  } catch (e) {
    throw new Error("Something went wrong!");
  }
}
export async function getGameInformation(id: number | undefined) {
  try {
    const { data } = await axios.get(
      `https://api.rawg.io/api/games/${id}?key=${"81d6a9bfb35d4a1c8fa5b2ad3b3b97fb"}`,
      {
        headers: {
          /*'User-Agent': 'Game Keeper'*/
        },
      }
    );

    const gameData: IRawgGame = data;
    return gameData;
  } catch (e) {
    throw new Error("Something went wrong!");
  }
}
