"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { withAuth } from "../components/withAuth";
import api from "@/lib/api";

type Playlist = {
  id: string;
  name: string;
};

function Dashboard() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [newPlaylist, setNewPlaylist] = useState("");
  const router = useRouter();

  const fetchPlaylists = async () => {
    try {
      const res = await api.get("/user/playlists");
      setPlaylists(res.data.playlists);
    } catch (err) {
      console.error("Erro ao buscar playlists:", err);
    }
  };

  const createPlaylist = async () => {
    try {
      await api.post("/playlist", { name: newPlaylist });
      setNewPlaylist("");
      fetchPlaylists();
    } catch (err) {
      console.error("Erro ao criar playlist:", err);
    }
  };

  const deletePlaylist = async (id: string) => {
    try {
      await api.delete("/playlist", { params: { id } });
      fetchPlaylists();
    } catch (err) {
      console.error("Erro ao deletar playlist:", err);
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold  mb-6">Suas Playlists</h1>
      <div className="flex gap-2 mb-6 w-full max-w-md">
        <input
          value={newPlaylist}
          onChange={(e) => setNewPlaylist(e.target.value)}
          placeholder="Nova playlist"
          className="flex-1 p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={createPlaylist}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Criar
        </button>
      </div>

      <ul className="w-full max-w-md space-y-4">
        {playlists.length > 0 &&
          playlists.map((p) => (
            <li
              key={p.id}
              className="flex justify-between items-center p-4 bg-white rounded shadow hover:shadow-md transition"
            >
              <span
                className="text-lg text-blue-600 cursor-pointer hover:underline"
                onClick={() => router.push(`/playlist/${p.id}`)}
              >
                {p.name}
              </span>
              <button
                onClick={() => deletePlaylist(p.id)}
                className="text-sm text-red-600 hover:underline"
              >
                Remover
              </button>
            </li>
          ))}
        {playlists.length === 0 && (
          <li className="text-gray-500 text-center">
            Nenhuma playlist encontrada.
          </li>
        )}
      </ul>
    </div>
  );
}

export default withAuth(Dashboard);
