import { PrismaPlaylistTrackRepository } from "@/repositories/prisma/prisma-playlist-track-repository";
import { removeTrackToPlaylistUseCase } from "../playlist/remove-track";

export function makeRemoveTrackOnPlaylistUseCase() {
  const playlistTrackRepository = new PrismaPlaylistTrackRepository();
  const playlistTrackUseCase = new removeTrackToPlaylistUseCase(
    playlistTrackRepository
  );

  return playlistTrackUseCase;
}
