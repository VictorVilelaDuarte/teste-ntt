"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { withAuth } from "@/app/components/withAuth";
import api from "@/lib/api";

type Track = {
  id: string;
  track: {
    id: string;
    title: string;
    artist: string;
    previewUrl: string;
    coverUrl: string;
  };
};

type SearchResults = {
  id: string;
  title: string;
  artist: string;
  previewUrl: string;
  album: string;
  coverUrl: string;
  duration: number;
};

function PlaylistPage() {
  const { id } = useParams();
  const [tracks, setTracks] = useState<Track[]>([]);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResults[]>([]);

  const fetchPlaylist = async () => {
    try {
      const res = await api.get(`/playlist`, { params: { id } });
      setTracks(res.data.playlist.tracks);
    } catch (err) {
      console.error("Erro ao buscar playlist:", err);
    }
  };

  const removeTrack = async (trackId: string) => {
    try {
      await api.delete("/playlists/track", {
        data: { relationId: trackId },
      });
      fetchPlaylist();
    } catch (err) {
      console.error("Erro ao remover faixa:", err);
    }
  };

  const addTrack = async (track: SearchResults) => {
    try {
      await api.post("/playlists/track", {
        playlistId: id,
        trackId: track.id,
      });
      fetchPlaylist();
    } catch (err) {
      console.error("Erro ao adicionar faixa:", err);
    }
  };

  const searchTrack = async () => {
    try {
      const res = await api.get("/searchTrack", {
        params: { track: query },
      });
      setSearchResults(res.data);
    } catch (err) {
      console.error("Erro ao buscar faixas:", err);
    }
  };

  useEffect(() => {
    fetchPlaylist();
  }, []);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-3xl mx-auto space-y-10">
        <h1 className="text-3xl font-bold text-center">Sua Playlist</h1>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-700">Faixas</h2>
          <ul className="space-y-4">
            {tracks.length > 0 ? (
              tracks.map((track) => (
                <li
                  key={track.id}
                  className="bg-gray-100 rounded shadow-2xl p-4 items-center justify-between flex gap-2"
                >
                  <Image
                    src={track.track.coverUrl}
                    alt={track.track.title}
                    width={128}
                    height={128}
                    className="rounded mb-2"
                  />
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="text-lg font-medium text-gray-800">
                      {track.track.title} -{" "}
                      <span className="text-gray-500">
                        {track.track.artist}
                      </span>
                    </div>
                    {track.track.previewUrl && (
                      <audio controls src={track.track.previewUrl}></audio>
                    )}
                  </div>
                  <button
                    onClick={() => removeTrack(track.id)}
                    className="self-center text-sm text-red-600 hover:underline cursor-pointer"
                  >
                    Remover
                  </button>
                </li>
              ))
            ) : (
              <p className="text-gray-500">Nenhuma faixa na playlist.</p>
            )}
          </ul>
        </div>

        <hr className="border-gray-300" />

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-700">
            Buscar músicas
          </h2>
          <div className="flex gap-2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Nome da música"
              className="flex-1 p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={searchTrack}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Buscar
            </button>
          </div>
          <ul className="space-y-4">
            {searchResults.map((track) => (
              <li
                key={track.id}
                className="bg-gray-100 rounded shadow-2xl p-4 items-center justify-between flex gap-2"
              >
                <Image
                  src={track.coverUrl}
                  alt={track.title}
                  width={128}
                  height={128}
                  className="rounded mb-2"
                />

                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="text-lg font-medium text-gray-800">
                    {track.title} -{" "}
                    <span className="text-gray-500">{track.artist}</span>
                  </div>
                  {track.previewUrl && (
                    <audio controls src={track.previewUrl}></audio>
                  )}
                </div>
                <button
                  onClick={() => addTrack(track)}
                  className="self-center text-sm text-blue-600 hover:underline"
                >
                  Adicionar
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default withAuth(PlaylistPage);
