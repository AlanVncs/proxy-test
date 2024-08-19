import { changeOrigin } from './request/changeOrigin.ts'
import { removeCFHeaders } from './request/removeCFHeaders.ts'
import { removeHopHeaders } from './request/removeHopHeaders.ts'
import { fixAuthRequestBody } from './request/fixAuthRequestBody.ts'

export type RequestMiddlewareReturn = Request | undefined | void
export type RequestMiddleware = (request: Request) => Promise<RequestMiddlewareReturn> | RequestMiddlewareReturn

const middlewares: RequestMiddleware[] = [
	// INSERT MIDDLEWARES HERE
	changeOrigin,
	removeCFHeaders,
	removeHopHeaders,
	fixAuthRequestBody,
]

export const buildRequest: RequestMiddleware = async (request) => {
	let newRequest = new Request(request)

	for (const middleware of middlewares) {
		// Updates or keeps current request if middleware return undefined/void
		newRequest = (await middleware(newRequest)) ?? newRequest
	}

	return newRequest
}
