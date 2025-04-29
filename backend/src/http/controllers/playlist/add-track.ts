import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeAddTrackOnPlaylistUseCase } from "@/use-cases/factories/make-add-track-on-playlist-use-case";
import { TrackAlreadyExistsOnPlaylistError } from "@/use-cases/errors/track-already-on-playlist-error";

export async function addTrackOnPlaylist(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createBodySchema = z.object({
    playlistId: z.string(),
    trackId: z.coerce.string(),
  });

  const { playlistId, trackId } = createBodySchema.parse(request.body);

  try {
    const addTrackOnPlaylistUseCase = makeAddTrackOnPlaylistUseCase();

    await addTrackOnPlaylistUseCase.execute({ playlistId, trackId });

    return reply.status(201).send();
  } catch (err) {
    if (err instanceof TrackAlreadyExistsOnPlaylistError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
