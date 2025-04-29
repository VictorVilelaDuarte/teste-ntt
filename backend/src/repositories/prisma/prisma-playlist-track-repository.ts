import { PlaylistTrack, Prisma } from "@prisma/client";
import { PlaylistTrackRepository } from "../playlist-track-repository";
import { prisma } from "@/lib/prisma";

export class PrismaPlaylistTrackRepository implements PlaylistTrackRepository {
  async findByRelation(playlistId: string, trackId: string) {
    const playlistTrack = await prisma.playlistTrack.findFirst({
      where: {
        playlistId,
        trackId,
      },
    });
    return playlistTrack;
  }
  async remove(relationId: string) {
    const playlistTrack = await prisma.playlistTrack.delete({
      where: {
        id: relationId,
      },
    });
    return playlistTrack;
  }
  async save(data: Prisma.PlaylistTrackCreateInput) {
    const playlistTrack = await prisma.playlistTrack.create({
      data,
    });

    return playlistTrack;
  }
}
