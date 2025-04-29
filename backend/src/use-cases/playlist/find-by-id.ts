import { PlaylistRepository } from "@/repositories/playlist-repository";

interface FindByIdPlaylistUseCaseRequest {
  id: string;
}

export class FindByIdPlaylistUseCase {
  constructor(private playlistRepository: PlaylistRepository) {}

  async execute({ id }: FindByIdPlaylistUseCaseRequest) {
    const playlist = await this.playlistRepository.findById(id);

    return playlist;
  }
}
