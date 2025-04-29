import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeRemoveTrackOnPlaylistUseCase } from "@/use-cases/factories/make-remove-track-on-playlist-use-case";

export async function removeTrackOnPlaylist(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createBodySchema = z.object({
    relationId: z.string(),
  });

  const { relationId } = createBodySchema.parse(request.body);

  try {
    const removeTrackOnPlaylistUseCase = makeRemoveTrackOnPlaylistUseCase();

    await removeTrackOnPlaylistUseCase.execute({ relationId });

    return reply.status(200).send();
  } catch (err) {
    throw err;
  }
}
