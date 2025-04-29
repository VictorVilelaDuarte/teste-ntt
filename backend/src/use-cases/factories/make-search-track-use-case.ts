import { DeezerProvider } from "@/lib/deezer-provider";
import { PrismaTrackRepository } from "@/repositories/prisma/prisma-track-repository";
import { SearchTrackUseCase } from "@/use-cases/track/search-track";

export function makeSearchTrack() {
  const provider = new DeezerProvider();
  const trackRepository = new PrismaTrackRepository();
  return new SearchTrackUseCase(provider, trackRepository);
}
