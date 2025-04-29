import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeSearchTrack } from "@/use-cases/factories/make-search-track-use-case";

export async function searchTrack(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const searchTrackQuerySchema = z.object({
    track: z.string(),
  });

  const { track } = searchTrackQuerySchema.parse(request.query);

  try {
    const searchTrackUseCase = makeSearchTrack();

    const response = await searchTrackUseCase.execute(track);

    return reply.status(200).send(response);
  } catch (err) {
    throw err;
  }
}
