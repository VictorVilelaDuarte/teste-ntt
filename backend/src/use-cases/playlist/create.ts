import { PlaylistRepository } from "@/repositories/playlist-repository";

interface CreatePlaylistUseCaseRequest {
  name: string;
  userId: string;
}

export class CreatePlaylistUseCase {
  constructor(private playlistRepository: PlaylistRepository) {}

  async execute({ name, userId }: CreatePlaylistUseCaseRequest) {
    await this.playlistRepository.create({
      name,
      user: {
        connect: {
          id: userId,
        },
      },
    });
  }
}
