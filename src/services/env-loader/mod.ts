import { z } from '$zod/mod.ts'

const EnvSchema = z.object({
    TARGET_ORIGIN: z.string({ message: 'TARGET_ORIGIN precisa ser uma string!' }).url({ message: 'TARGET_ORIGIN precisa ser uma URL!' }),
    DENO_ENV: z.enum(['development', 'production']).default('production'),
})

export type EnvType = ReturnType<typeof EnvSchema.parse>
export type EnvKey = keyof EnvType

export const { TARGET_ORIGIN, DENO_ENV }: EnvType = EnvSchema.parse({
    TARGET_ORIGIN: Deno.env.get('TARGET_ORIGIN'),
    DENO_ENV: Deno.env.get('DENO_ENV'),
})

export function setEnvVar<T extends EnvKey>(key: T, value: EnvType[T]) {
    Deno.env.set(key, String(value))
}
