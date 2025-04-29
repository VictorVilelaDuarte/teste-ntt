import { PlaylistRepository } from "@/repositories/playlist-repository";

interface DeletePlaylistUseCaseRequest {
  id: string;
}

export class DeletePlaylistUseCase {
  constructor(private playlistRepository: PlaylistRepository) {}

  async execute({ id }: DeletePlaylistUseCaseRequest) {
    await this.playlistRepository.delete({
      where: {
        id,
      },
    });
  }
}
