import { Playlist, Prisma } from "@prisma/client";

export interface PlaylistRepository {
  create(data: Prisma.PlaylistCreateInput): Promise<Playlist>;
  delete(data: Prisma.PlaylistDeleteArgs): Promise<Playlist>;
  list(userId: string): Promise<Playlist[]>;
  findById(playlistId: string): Promise<Playlist | null>;
}
