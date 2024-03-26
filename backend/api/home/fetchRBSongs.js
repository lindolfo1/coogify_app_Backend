import { selectRBSongs } from "../../database/queries/dbHomeQueries";
import { errorMessage } from "../../util/utilFunctions";

export async function handler(req, res) {
  try {
    const songs = await selectRBSongs();
    if (songs !== false) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(songs));
    } else {
      errorMessage(res, "Error fetching r&b songs", "Error");
    }
  } catch (error) {
    errorMessage(res, error, "Error fetching r&b songs");
  }
}
