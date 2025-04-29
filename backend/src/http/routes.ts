import { FastifyInstance } from "fastify";
import { register } from "./controllers/user/register";
import { authenticate } from "./controllers/user/authenticate";
import { searchTrack } from "./controllers/track/search";
import { createPlaylist } from "./controllers/playlist/create";
import { verifyJwt } from "./middlewares/verify-jwt";
import { deletePlaylist } from "./controllers/playlist/delete";
import { listPlaylist } from "./controllers/playlist/list";
import { findByIdPlaylist } from "./controllers/playlist/find-by-id";
import { addTrackOnPlaylist } from "./controllers/playlist/add-track";
import { removeTrackOnPlaylist } from "./controllers/playlist/remove-track";

export async function appRoutes(app: FastifyInstance) {
  app.post("/users", register);
  app.post("/authenticate", authenticate);

  app.get("/searchTrack", searchTrack);

  app.post("/playlist", { onRequest: [verifyJwt] }, createPlaylist);
  app.delete("/playlist", { onRequest: [verifyJwt] }, deletePlaylist);
  app.get("/playlist", { onRequest: [verifyJwt] }, findByIdPlaylist);
  app.get("/user/playlists", { onRequest: [verifyJwt] }, listPlaylist);
  app.post("/playlists/track", { onRequest: [verifyJwt] }, addTrackOnPlaylist);
  app.delete(
    "/playlists/track",
    { onRequest: [verifyJwt] },
    removeTrackOnPlaylist
  );
}
