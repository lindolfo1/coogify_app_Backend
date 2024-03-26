import { VercelRequest, VercelResponse } from "@vercel/node";
import { selectNewestSongs } from "../../database/queries/dbHomeQueries";
import { errorMessage } from "../../util/utilFunctions";

export default async function handler(req, res) {
  try {
    const songs = await selectNewestSongs();
    if (songs !== false) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(songs));
    } else {
      errorMessage(res, "Error fetching newest songs", "Error");
    }
  } catch (error) {
    errorMessage(res, error, "Error fetching newest songs");
  }
}
