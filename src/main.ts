import proxy from './proxy.ts'

const PORT = 443

// const cert = Deno.readTextFileSync('ssl/cert.pem')
// const key = Deno.readTextFileSync('ssl/key.pem')

const port = Number(Deno.env.get('PORT') ?? PORT)

Deno.serve({ port }, (request) => {
	return proxy({ request })
	// const { pathname, search, hash } = new URL(req.url)

	// // PROXY
	// const targetOrigin = 'https://www.mundodoenxoval.com.br'
	// const targetURL = new URL(`${pathname}${search}${hash}`, targetOrigin)
	// const targetHost = targetURL.host

	// const targetRequestHeaders = new Headers(req.headers)

	// targetRequestHeaders.set('origin', targetOrigin)
	// targetRequestHeaders.set('host', targetHost)
	// targetRequestHeaders.set('x-forwarded-host', targetHost)

	// for (const [key, value] of targetRequestHeaders) {
	// 	if (value.match(/localhost/)) {
	// 		const newValue = value.replace(/localhost/g, targetHost)
	// 		targetRequestHeaders.set(key, newValue)

	// 		console.log(`Changed ${key}: "${value}" -> "${newValue}"`)
	// 	}
	// }

	// // for (const [key, value] of targetRequestHeaders) {
	// // 	console.log({ [key]: value })
	// // }

	// const targetRequest = new Request(targetURL.toString(), {
	// 	...req,
	// 	headers: targetRequestHeaders,
	// 	redirect: 'manual',
	// })

	// // FETCH
	// const response = await fetch(targetRequest)

	// const responseHeaders = new Headers(response.headers)
	// responseHeaders.set('access-control-allow-origin', '*')

	// responseHeaders.delete('set-cookie')
	// // proxySetCookie(response.headers, responseHeaders)

	// // for (const [key, value] of responseHeaders) {
	// // 	if (value.match(/mundodoenxoval.com.br/)) {
	// // 		const newValue = value.replaceAll('www.mundodoenxoval.com.br', 'localhost').replaceAll('.mundodoenxoval.com.br', 'localhost')
	// // 			.replaceAll('mundodoenxoval.com.br', 'localhost')

	// // 		responseHeaders.set(key, newValue)

	// // 		console.log(`Changed ${key}: "${value}" -> "${newValue}"`)
	// // 	}
	// // }

	// return new Response(response.body, {
	// 	headers: responseHeaders,
	// 	status: response.status,
	// 	statusText: response.statusText,
	// })
})

// import { getSetCookies, setCookie } from 'std/http/cookie.ts'

// export const proxySetCookie = (
// 	from: Headers,
// 	to: Headers,
// 	toDomain: URL | string = 'https://localhost',
// ) => {
// 	const newDomain = toDomain && new URL(toDomain)

// 	for (const cookie of getSetCookies(from)) {
// 		const newCookie = newDomain
// 			? {
// 				...cookie,
// 				domain: newDomain.hostname,
// 			}
// 			: cookie

// 		setCookie(to, newCookie)
// 	}
// }
