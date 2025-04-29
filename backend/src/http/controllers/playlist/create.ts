import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeCreatePlaylistUseCase } from "@/use-cases/factories/make-create-playlist-use-case";

export async function createPlaylist(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createBodySchema = z.object({
    name: z.string(),
  });

  const { name } = createBodySchema.parse(request.body);

  try {
    const createPlaylistUseCase = makeCreatePlaylistUseCase();

    await createPlaylistUseCase.execute({ name, userId: request.user.sub });
  } catch (err) {
    throw err;
  }
  return reply.status(201).send();
}
