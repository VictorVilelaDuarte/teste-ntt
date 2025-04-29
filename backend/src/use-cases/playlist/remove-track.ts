import { PlaylistTrackRepository } from "@/repositories/playlist-track-repository";

interface removeTrackToPlaylistUseCaseRequest {
  relationId: string;
}

export class removeTrackToPlaylistUseCase {
  constructor(private playlistTrackRepository: PlaylistTrackRepository) {}

  async execute({ relationId }: removeTrackToPlaylistUseCaseRequest) {
    await this.playlistTrackRepository.remove(relationId);
  }
}
