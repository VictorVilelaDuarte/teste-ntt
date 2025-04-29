import { FastifyRequest, FastifyReply } from "fastify";
import { makeListPlaylistUseCase } from "@/use-cases/factories/make-list-playlist-use-case";

export async function listPlaylist(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const listPlaylistUseCase = makeListPlaylistUseCase();

    const playlists = await listPlaylistUseCase.execute({
      userId: request.user.sub,
    });

    console.log(request.user.sub);

    reply.status(200).send({
      playlists,
    });
  } catch (err) {
    throw err;
  }
  return reply.status(200).send();
}
