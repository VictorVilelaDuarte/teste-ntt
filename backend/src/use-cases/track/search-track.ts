import { DeezerProvider } from "@/lib/deezer-provider";
import { TrackRepository } from "@/repositories/track-repository";
import { Track } from "@prisma/client";

export class SearchTrackUseCase {
  constructor(
    private provider: DeezerProvider,
    private trackRepository: TrackRepository
  ) {}

  async execute(query: string) {
    const response = await this.provider.searchMusic({ query });

    await response.forEach(async (track: Track) => {
      const trackExists = await this.trackRepository.findById(String(track.id));

      if (!trackExists) {
        await this.trackRepository.save({
          id: String(track.id),
          title: track.title,
          artist: track.artist,
          previewUrl: track.previewUrl,
          album: track.album,
          coverUrl: track.coverUrl,
          duration: Number(track.duration),
        });
      }
    });

    return response;
  }
}
