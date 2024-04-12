import { selectTopSongs } from '../../database/queries/dbHomeQueries.js';
import { errorMessage } from '../../util/utilFunctions.js';
import jsonParserMiddleware from '../../middlewares/jsonParser.js';
import { corsMiddleware } from '../middlewares/corsMiddleware.js';
import authenticateMiddleware from '../../middlewares/authenticate.js';

export default async function handler(req, res) {
  await corsMiddleware(req, res, async () => {
    jsonParserMiddleware(req, res, async () => {
      authenticateMiddleware(req, res, async () => {
        try {
          const songs = await selectTopSongs();
          if (songs !== false) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(songs));
          } else {
            errorMessage(res, 'Error fetching top songs', 'Error');
          }
        } catch (error) {
          errorMessage(res, error, 'Error fetching top songs');
        }
      });
    });
  });
}
