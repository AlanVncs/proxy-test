import proxy from '$src/proxy/vtex/index.ts'
import { DENO_ENV } from '$src/services/env-loader/mod.ts'

const PORT = 443

const port = Number(Deno.env.get('PORT') ?? PORT)

const cert = DENO_ENV === 'development' ? Deno.readTextFileSync('ssl/cert.pem') : undefined
const key = DENO_ENV === 'development' ? Deno.readTextFileSync('ssl/key.pem') : undefined

Deno.serve({ port, cert, key }, async (request) => {
	const response = await proxy(request)

	if (response) return response

	return new Response('ERRO AO CARREGAR O PROXY')
})
