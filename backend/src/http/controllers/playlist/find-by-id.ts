import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeFindByIdPlaylistUseCase } from "@/use-cases/factories/make-find-by-id-playlist-use-case";

export async function findByIdPlaylist(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const findQuerySchema = z.object({
    id: z.string(),
  });

  const { id } = findQuerySchema.parse(request.query);

  try {
    const findByIdPlaylistUseCase = makeFindByIdPlaylistUseCase();

    const playlist = await findByIdPlaylistUseCase.execute({ id });

    reply.status(200).send({
      playlist,
    });
  } catch (err) {
    throw err;
  }
}
