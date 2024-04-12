import { selectNewestSongs } from '../../database/queries/dbHomeQueries.js';
import { errorMessage } from '../../util/utilFunctions.js';
import jsonParserMiddleware from '../../middlewares/jsonParser.js';
import { corsMiddleware } from '../middlewares/corsMiddleware.js';
import authenticateMiddleware from '../../middlewares/authenticate.js';

export default async function handler(req, res) {
  await corsMiddleware(req, res, async () => {
    jsonParserMiddleware(req, res, async () => {
      await authenticateMiddleware(req, res, async () => {
        try {
          const songs = await selectNewestSongs();
          if (songs !== false) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(songs));
          } else {
            errorMessage(res, 'Error fetching newest songs', 'Error');
          }
        } catch (error) {
          errorMessage(res, error, 'Error fetching newest songs');
        }
      });
    });
  });
}
