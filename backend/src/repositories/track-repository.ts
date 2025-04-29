import { Track, Prisma } from "@prisma/client";

export interface TrackRepository {
  save(data: Prisma.TrackCreateInput): Promise<Track>;
  findById(id: string): Promise<Track | null>;
}
