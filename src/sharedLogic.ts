/**
 * Copyright (c) 2022 Yevhen Chernenko.
 * All rights reserved.
 *
 * https://github.com/LtCodename/game-keeper-mui
 * https://gamekeeper.ltcodename.com
 * https://www.linkedin.com/in/yevhen-chernenko
 * https://ltcodename.com
 */

import moment from "moment";

export const formatReleaseDate = (releaseDate: string | undefined): string =>
  moment(releaseDate).format("MMMM D YYYY");

export const processDevelopers = (developers: any): string => {
  if (!developers.length) return "";

  return developers.map((developer: any) => developer.name).join(", ");
};
