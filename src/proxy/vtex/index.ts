import { buildRequest } from '$src/proxy/vtex/middlewares/request.ts'
import { buildResponse } from '$src/proxy/vtex/middlewares/response.ts'

export default async function proxy(request: Request) {
	const targetRequest = await buildRequest(request)
	if (!targetRequest) return

	const response = await buildResponse(targetRequest)
	if (!response) return new Response('Erro ao montar a resposta')

	return response
}
