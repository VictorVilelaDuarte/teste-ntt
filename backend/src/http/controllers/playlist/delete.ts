import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeDeletePlaylistUseCase } from "@/use-cases/factories/make-delete-playlist-use-case";

export async function deletePlaylist(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createQuerySchema = z.object({
    id: z.string(),
  });

  const { id } = createQuerySchema.parse(request.query);

  try {
    const deletePlaylistUseCase = makeDeletePlaylistUseCase();

    await deletePlaylistUseCase.execute({ id });
  } catch (err) {
    throw err;
  }
  return reply.status(204).send();
}
