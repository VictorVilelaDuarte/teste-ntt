export class TrackAlreadyExistsOnPlaylistError extends Error {
  constructor() {
    super("This track is already on the playlist");
  }
}
