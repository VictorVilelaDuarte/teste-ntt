import { DeletePlaylistUseCase } from "../playlist/delete";
import { PrismaPlaylistRepository } from "@/repositories/prisma/prisma-playlist-repository";

export function makeDeletePlaylistUseCase() {
  const playlistRepository = new PrismaPlaylistRepository();
  const deletePlaylistUseCase = new DeletePlaylistUseCase(playlistRepository);

  return deletePlaylistUseCase;
}
