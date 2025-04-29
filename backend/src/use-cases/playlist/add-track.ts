import { PlaylistTrackRepository } from "@/repositories/playlist-track-repository";
import { TrackAlreadyExistsOnPlaylistError } from "../errors/track-already-on-playlist-error";

interface addTrackToPlaylistUseCaseRequest {
  playlistId: string;
  trackId: string;
}

export class addTrackToPlaylistUseCase {
  constructor(private playlistTrackRepository: PlaylistTrackRepository) {}

  async execute({ playlistId, trackId }: addTrackToPlaylistUseCaseRequest) {
    const playlistTrackAlreadyExists =
      await this.playlistTrackRepository.findByRelation(playlistId, trackId);

    if (playlistTrackAlreadyExists) {
      throw new TrackAlreadyExistsOnPlaylistError();
    }
    await this.playlistTrackRepository.save({
      playlist: { connect: { id: playlistId } },
      track: { connect: { id: trackId } },
    });
  }
}
