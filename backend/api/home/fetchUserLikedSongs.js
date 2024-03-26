import { selectTopSongs } from "../../database/queries/dbHomeQueries";
import { errorMessage } from "../../util/utilFunctions";

export default async function handler(req, res) {
  try {
    // TODO
    if (true) {
    } else {
      errorMessage(res, "Error fetching user liked songs", "Error");
    }
  } catch (error) {
    errorMessage(res, error, "Error fetching user liked songs");
  }
}
