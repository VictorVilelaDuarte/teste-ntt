import { PlaylistRepository } from "@/repositories/playlist-repository";

interface ListPlaylistUseCaseRequest {
  userId: string;
}

export class ListPlaylistUseCase {
  constructor(private playlistRepository: PlaylistRepository) {}

  async execute({ userId }: ListPlaylistUseCaseRequest) {
    const playlists = await this.playlistRepository.list(userId);

    return playlists;
  }
}
