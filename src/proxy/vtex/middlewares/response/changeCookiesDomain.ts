import { ResponseMiddleware } from '$src/proxy/vtex/middlewares/response.ts'
import { getSetCookies, setCookie } from '$std/http/cookie.ts'

/**
 * @title Change cookies domain
 * @description Changes cookies domain to the same of requested url (normally 'localhost') */
export const changeCookiesDomain: ResponseMiddleware = (request, response) => {
	if (!response) return

	const { host: localDomain } = new URL(request.url)

	const cookies = getSetCookies(response.headers)
	response.headers.delete('set-cookie')

	for (const cookie of cookies) {
		setCookie(response.headers, {
			...cookie,
			domain: localDomain,
		})
	}
}
