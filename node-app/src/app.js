import initializeServer from "./server/server.js";

const server = initializeServer();
const port = process.env.PORT || 3001;

server.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
