import { selectRapSongs } from "../../database/queries/dbHomeQueries";
import { errorMessage } from "../../util/utilFunctions";

export async function handler(req, res) {
  try {
    const songs = await selectRapSongs();
    if (songs !== false) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(songs));
    } else {
      errorMessage(res, "Error fetching rap songs", "Error");
    }
  } catch (error) {
    errorMessage(res, error, "Error fetching rap songs");
  }
}
