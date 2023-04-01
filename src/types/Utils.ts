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
