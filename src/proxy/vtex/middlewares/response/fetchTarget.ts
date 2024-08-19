import { copyDomain } from '$src/sdk/url.ts'
import { ResponseMiddleware } from '$src/proxy/vtex/middlewares/response.ts'
import { TARGET_ORIGIN } from '$src/services/env-loader/mod.ts'

/**
 * @title Change cookies domain
 * @description Changes cookies domain to the same of requested url (normally 'localhost') */
export const fetchTarget: ResponseMiddleware = async (request) => {
	const targetUrl = copyDomain(TARGET_ORIGIN, request.url)

	const response = await fetch(targetUrl, request)

	return new Response(response.body as BodyInit, response)
}
