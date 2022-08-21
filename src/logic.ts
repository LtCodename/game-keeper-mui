import moment from "moment";

const formatReleaseDate = (releaseDate: string | undefined): string =>
  moment(releaseDate).format("MMMM D YYYY");

export default formatReleaseDate;
