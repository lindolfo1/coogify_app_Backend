import { VercelRequest, VercelResponse } from "@vercel/node";
import { selectTopSongs } from "../../database/queries/dbHomeQueries";
import { errorMessage } from "../../util/utilFunctions";
import jsonParserMiddleware from "../../middlewares/jsonParser.js";
import hashPasswordMiddleware from "../../middlewares/hashPassword.js";
import authenticateMiddleware from "../../middlewares/authenticate.js";

export default async function handler(req, res) {
  jsonParserMiddleware(req, res);
  hashPasswordMiddleware(req, res);
  authenticateMiddleware(req, res);
  try {
    const songs = await selectTopSongs();
    if (songs !== false) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(songs));
    } else {
      errorMessage(res, "Error fetching top songs", "Error");
    }
  } catch (error) {
    errorMessage(res, error, "Error fetching top songs");
  }
}
