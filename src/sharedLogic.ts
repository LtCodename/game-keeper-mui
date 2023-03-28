/**
 * Copyright (c) 2022 Yevhen Chernenko.
 * All rights reserved.
 *
 * https://github.com/LtCodename/game-keeper-mui
 * https://gamekeeper.ltcodename.com
 * https://www.linkedin.com/in/yevhen-chernenko
 * https://ltcodename.com
 */

import { NAME_LENGTH } from "config";

import moment from "moment";

export const formatReleaseDate = (releaseDate: string | undefined): string =>
  releaseDate && releaseDate.length
    ? moment(releaseDate).format("MMMM D YYYY")
    : "TBA";

export const processDevelopers = (developers: any): string => {
  if (!developers.length) return "";

  return developers.map((developer: any) => developer.name).join(", ");
};

export const trimName = (name: string): string => {
  if (!name || !name.length) return "";

  if (name.length >= NAME_LENGTH) {
    return `${name.substring(0, NAME_LENGTH)}...`;
  }

  return name;
};
