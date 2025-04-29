import { CreatePlaylistUseCase } from "../playlist/create";
import { PrismaPlaylistRepository } from "@/repositories/prisma/prisma-playlist-repository";

export function makeCreatePlaylistUseCase() {
  const playlistRepository = new PrismaPlaylistRepository();
  const createPlaylistUseCase = new CreatePlaylistUseCase(playlistRepository);

  return createPlaylistUseCase;
}
