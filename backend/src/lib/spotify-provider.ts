import { env } from "@/env";
import axios from "axios";

interface SearchMusicParams {
  query: string;
}

export class SpotifyProvider {
  private accessToken: string | null = null;

  private async authenticate() {
    const spotifyId = env.SPOTIFY_CLIENT_ID;
    const spotifyClient = process.env.SPOTIFY_CLIENT_SECRET;

    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      "grant_type=client_credentials",
      {
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(spotifyId + ":" + spotifyClient).toString("base64"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    this.accessToken = response.data.access_token;
  }

  public async searchMusic({ query }: SearchMusicParams) {
    if (!this.accessToken) await this.authenticate();

    const response = await axios.get(`https://api.spotify.com/v1/search`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
      params: {
        q: query,
        type: "track",
        limit: 10,
      },
    });

    return response.data.tracks.items.map((track: any) => ({
      musicId: track.id,
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      previewUrl: track.preview_url,
      spotifyUrl: track.external_urls.spotify,
    }));
  }
}
