import moment from "moment";

export const formatReleaseDate = (releaseDate: string | undefined): string =>
  moment(releaseDate).format("MMMM D YYYY");

export const processDevelopers = (developers: any): string => {
  if (!developers.length) return "";

  return developers.map((developer: any) => developer.name).join(", ");
};
