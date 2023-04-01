/**
 * Copyright (c) 2022 Yevhen Chernenko.
 * All rights reserved.
 *
 * https://github.com/LtCodename/game-keeper-mui
 * https://gamekeeper.ltcodename.com
 * https://www.linkedin.com/in/yevhen-chernenko
 * https://ltcodename.com
 */

export interface SpeedDialItem {
  icon: React.ReactElement;
  name: string;
}

export interface SnackbarMessage {
  message: string;
  severity: "error" | "warning" | "info" | "success";
}

export interface GameMeta {
  developers: string;
  releaseDate: string;
  name: string;
}

export enum Theme {
  Light = "light",
  Dark = "dark",
}
