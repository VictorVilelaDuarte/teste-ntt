import { PrismaPlaylistRepository } from "@/repositories/prisma/prisma-playlist-repository";
import { FindByIdPlaylistUseCase } from "../playlist/find-by-id";

export function makeFindByIdPlaylistUseCase() {
  const playlistRepository = new PrismaPlaylistRepository();
  const findByIdPlaylistUseCase = new FindByIdPlaylistUseCase(
    playlistRepository
  );

  return findByIdPlaylistUseCase;
}
