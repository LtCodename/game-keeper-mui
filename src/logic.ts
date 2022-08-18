import moment from "moment";

const formatReleaseDate = (releaseDate: string): string =>
  moment(releaseDate).format("MMMM D YYYY");

export default formatReleaseDate;
