import { getSetCookies, setCookie } from 'std/http/cookie.ts'

const HOP_BY_HOP = [
    'Keep-Alive',
    'Transfer-Encoding',
    'TE',
    'Connection',
    'Trailer',
    'Upgrade',
    'Proxy-Authorization',
    'Proxy-Authenticate',
]

const removeCFHeaders = (headers: Headers) => {
    headers.forEach((_value, key) => {
        if (key.startsWith('cf-')) {
            headers.delete(key)
        }
    })
}

export interface Props {
    request: Request
}

export default async function proxy({ request }: Props) {
    const url = new URL(request.url)
    const { pathname, search, hash } = new URL(request.url)
    const requestHeaders = new Headers(request.headers)

    // PROXY
    const targetOrigin = 'https://www.mundodoenxoval.com.br'
    const targetURL = new URL(`${pathname}${search}${hash}`, targetOrigin)
    const targetHost = targetURL.host

    HOP_BY_HOP.forEach((h) => requestHeaders.delete(h))

    removeCFHeaders(requestHeaders) // cf-headers are not ASCII-compliant

    requestHeaders.set('origin', targetOrigin)
    requestHeaders.set('host', targetHost)
    requestHeaders.set('x-forwarded-host', targetHost)

    const response = await fetch(targetURL, {
        headers: requestHeaders,
        redirect: 'manual',
        signal: request.signal,
        method: request.method,
        body: request.body,
    })

    // Change cookies domain
    const responseHeaders = new Headers(response.headers)
    responseHeaders.delete('set-cookie')

    proxySetCookie(response.headers, responseHeaders, url)

    const newBody = response.body

    return new Response(newBody, {
        status: response.status,
        headers: responseHeaders,
    })
}

export const proxySetCookie = (
    from: Headers,
    to: Headers,
    toDomain: URL | string = 'https://localhost',
) => {
    const newDomain = toDomain && new URL(toDomain)

    for (const cookie of getSetCookies(from)) {
        const newCookie = newDomain
            ? {
                ...cookie,
                domain: newDomain.hostname,
            }
            : cookie

        setCookie(to, newCookie)
    }
}
