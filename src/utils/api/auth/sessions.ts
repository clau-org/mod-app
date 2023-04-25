import { apiClau } from "../api"

export async function createSession(magicToken: string) {
    const { api: { clau } } = useAppConfig()
    const { data: { session, user } } = await apiClau(clau.auth.sessions.create, { magicToken })
    return { session, user }
}

export async function deleteSession(jwt: string) {
    const { api: { clau } } = useAppConfig()
    const { data: confirmation } = await apiClau(clau.auth.sessions.delete, { jwt })
    return confirmation
}

export async function verifySession(jwt: string, { withUser = true} : { withUser?: boolean } = {}) {
    const { api: { clau } } = useAppConfig()
    const { data: { session, user } }  = await apiClau(clau.auth.sessions.verify, { jwt, withUser })
    return { session, user }
}

