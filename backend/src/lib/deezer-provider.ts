import axios from "axios";

interface SearchMusicParams {
  query: string;
}

export class DeezerProvider {
  public async searchMusic({ query }: SearchMusicParams) {
    const response = await axios.get(`https://api.deezer.com/search`, {
      params: {
        q: query,
      },
    });

    return response.data.data.map((track: any) => ({
      id: track.id,
      title: track.title,
      artist: track.artist.name,
      previewUrl: track.preview,
      album: track.album.title,
      coverUrl: track.album.cover_medium,
      duration: track.duration,
    }));
  }
}
