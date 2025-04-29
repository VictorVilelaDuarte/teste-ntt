import { PrismaPlaylistTrackRepository } from "@/repositories/prisma/prisma-playlist-track-repository";
import { addTrackToPlaylistUseCase } from "../playlist/add-track";

export function makeAddTrackOnPlaylistUseCase() {
  const playlistTrackRepository = new PrismaPlaylistTrackRepository();
  const playlistTrackUseCase = new addTrackToPlaylistUseCase(
    playlistTrackRepository
  );

  return playlistTrackUseCase;
}
