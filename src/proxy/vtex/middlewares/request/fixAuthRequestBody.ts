import { RequestMiddleware } from '$src/proxy/vtex/middlewares/request.ts'

/**
 * @description Fixes search params and request body when requested url path is '/api/vtexid/pub/authentication/start', avoiding login popup errors
 */
export const fixAuthRequestBody: RequestMiddleware = (request) => {
	const requestURL = new URL(request.url)

	if (!requestURL.pathname.startsWith('/api/vtexid/pub/authentication/start')) {
		// Clear search
		requestURL.searchParams.forEach((value, key) => {
			requestURL.searchParams.delete(key, value)
		})

		return new Request(requestURL, { ...request, body: request.body ? '' : null })
	}
}
