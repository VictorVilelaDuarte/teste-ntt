import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { PlaylistRepository } from "../playlist-repository";

export class PrismaPlaylistRepository implements PlaylistRepository {
  async findById(playlistId: string) {
    const playlist = await prisma.playlist.findUnique({
      where: {
        id: playlistId,
      },
      include: {
        tracks: {
          include: {
            track: true,
          },
        },
      },
    });

    if (!playlist) {
      return null;
    }

    return playlist;
  }
  async list(userId: string) {
    const playlists = await prisma.playlist.findMany({
      where: {
        userId,
      },
    });

    return playlists;
  }
  async delete(data: Prisma.PlaylistDeleteArgs) {
    const playlist = await prisma.playlist.delete({
      where: {
        id: data.where.id,
      },
    });

    return playlist;
  }

  async create(data: Prisma.PlaylistCreateInput) {
    const playlist = await prisma.playlist.create({
      data,
    });

    return playlist;
  }
}
