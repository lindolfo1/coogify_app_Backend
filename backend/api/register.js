import * as logregq from '../database/queries/dbLoginRegQueries.js';
import { createSession } from '../Session/sessionManager.js';
import { getUserFromEmail } from '../database/queries/dbUserQueries.js';
import jsonParserMiddleware from '../middlewares/jsonParser.js';
import hashPasswordMiddleware from '../middlewares/hashPassword.js';
import authenticateMiddleware from '../middlewares/authenticate.js';

export default async function handler(req, res) {
  // // Set CORS headers
  // console.log('testing');
  // res.setHeader('Access-Control-Allow-Origin', '*');
  // res.setHeader(
  //   'Access-Control-Allow-Methods',
  //   'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  // );
  // res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight OPTIONS request
  try {
    if (req.method === 'OPTIONS') {
      console.log(req.headers);
      res.statusCode = 204;
      res.end();
      return;
    }
    jsonParserMiddleware(req, res, async () => {
      hashPasswordMiddleware(res, req, async () => {
        authenticateMiddleware(req, res, async () => {
          console.log('registering');
          const { firstName, lastName, email, password } = req.body;
          if (
            email === undefined ||
            password === undefined ||
            firstName === undefined ||
            lastName === undefined
          ) {
            console.log(
              `one or more parameters are undefined: [${email}, ${password}, ${firstName}, ${lastName}]`
            );
            res.statusCode = 400;
            res.end(
              JSON.stringify({ error: 'One or more parameters are missing.' })
            );
            return;
          }

          try {
            const registered = await logregq.registerUser(
              email,
              password,
              firstName,
              lastName
            );
            if (registered) {
              const session = await createSession(getUserFromEmail(email));
              const hashedPasswordFromDB = await logregq.getPasswordByEmail(
                email
              );
              console.log('db hashed password: ', hashedPasswordFromDB);
              console.log('og hashed password: ', password);
              res.statusCode = 200;
              res.end(
                JSON.stringify({
                  message: 'User registered successfully.',
                  sessionID: session,
                })
              );
            } else {
              res.statusCode = 409;
              res.end(
                JSON.stringify({
                  error: 'Email already exists for another account.',
                })
              );
            }
          } catch (error) {
            console.error('Error registering user:', error);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
          }
        });
      });
    });
  } catch (e) {
    console.log(e);
  }
}
