import { PrismaPlaylistRepository } from "@/repositories/prisma/prisma-playlist-repository";
import { ListPlaylistUseCase } from "../playlist/list";

export function makeListPlaylistUseCase() {
  const playlistRepository = new PrismaPlaylistRepository();
  const listPlaylistUseCase = new ListPlaylistUseCase(playlistRepository);

  return listPlaylistUseCase;
}
