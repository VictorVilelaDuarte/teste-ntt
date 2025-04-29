import { PlaylistTrack, Prisma } from "@prisma/client";

export interface PlaylistTrackRepository {
  save(data: Prisma.PlaylistTrackCreateInput): Promise<PlaylistTrack>;
  remove(relationId: string): Promise<PlaylistTrack>;
  findByRelation(
    playlistId: string,
    trackId: string
  ): Promise<PlaylistTrack | null>;
}
