// import { NowRequest, NowResponse } from "@vercel/node";
import * as logregq from "../../database/queries/dbLoginRegQueries.js";
import { hashPassword } from "../middlewares/middleware.js";
import { createSession } from "../Session/sessionManager.js";
import { getUserFromEmail } from "/database/queries/dbUserQueries.js";

export default async function handler(req, res) {
  console.log("registering");
  const { firstName, lastName, email, password } = req.body;
  const hashedInput = await hashPassword(password);
  if (
    email === undefined ||
    hashedInput === undefined ||
    firstName === undefined ||
    lastName === undefined
  ) {
    console.log(
      `one or more parameters are undefined: [${email}, ${password}, ${firstName}, ${lastName}]`
    );
    res.statusCode = 400;
    res.end(JSON.stringify({ error: "One or more parameters are missing." }));
    return;
  }

  try {
    const registered = await logregq.registerUser(
      email,
      hashedInput,
      firstName,
      lastName
    );
    if (registered) {
      const session = await createSession(getUserFromEmail(email));
      res.statusCode = 200;
      res.end(
        JSON.stringify({
          message: "User registered successfully.",
          sessionID: session,
        })
      );
    } else {
      res.statusCode = 409;
      res.end(
        JSON.stringify({ error: "Email already exists for another account." })
      );
    }
  } catch (error) {
    console.error("Error registering user:", error);
    res.statusCode = 500;
    res.end(JSON.stringify({ error: "Internal Server Error" }));
  }
}
