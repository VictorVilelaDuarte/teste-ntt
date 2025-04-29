import { TrackRepository } from "@/repositories/track-repository";

interface saveTrackUseCaseRequest {
  id: string;
  title: string;
  artist: string;
  album: string;
  previewUrl: string;
  coverUrl: string;
  duration: string;
}

export class saveTrackUseCase {
  constructor(private trackRepository: TrackRepository) {}

  async execute({
    id,
    title,
    artist,
    album,
    coverUrl,
    previewUrl,
    duration,
  }: saveTrackUseCaseRequest) {
    await this.trackRepository.save({
      id,
      title,
      artist,
      album,
      coverUrl,
      previewUrl,
      duration: Number(duration),
    });
  }
}
