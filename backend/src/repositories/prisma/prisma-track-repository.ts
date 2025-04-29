import { prisma } from "@/lib/prisma";
import { Prisma, Track } from "@prisma/client";
import { TrackRepository } from "../track-repository";

export class PrismaTrackRepository implements TrackRepository {
  async findById(id: string) {
    const track = await prisma.track.findUnique({
      where: {
        id,
      },
    });

    if (!track) {
      return null;
    }

    return track;
  }
  async save(data: Prisma.TrackCreateInput): Promise<Track> {
    const track = await prisma.track.create({
      data,
    });

    return track;
  }
}
