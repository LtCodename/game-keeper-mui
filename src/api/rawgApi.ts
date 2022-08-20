import axios from "axios";

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
export async function getGameInformation(name: string) {
  try {
    const { data } = await axios.get(
      `https://api.rawg.io/api/games/${name}?key=${"81d6a9bfb35d4a1c8fa5b2ad3b3b97fb"}`,
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
