import { copyDomain } from '$src/sdk/url.ts'
import { RequestMiddleware } from '$src/proxy/vtex/middlewares/request.ts'
import { TARGET_ORIGIN } from '$src/services/env-loader/mod.ts'

export const changeOrigin: RequestMiddleware = (request) => {
	const { host: localHost } = new URL(request.url)
	const targetUrl = copyDomain(TARGET_ORIGIN, request.url)

	request.headers.set('origin', targetUrl.origin)
	request.headers.set('host', targetUrl.host)
	request.headers.set('referer', targetUrl.toString())
	request.headers.set('x-forwarded-host', localHost)
}
