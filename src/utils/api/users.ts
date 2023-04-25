export async function createUser(userData: any) {
    const { api: { clau } } = useAppConfig()
    const { data: { user } } = await apiClau(clau.users.create, { userData })
    return user
}

export async function readUsers({ uuid, page = 1, pageSize = 12}:{ uuid?: string, page: number, pageSize: number}) {
    const { api: { clau } } = useAppConfig()
    const { data: { user, users, maxPages } } = await apiClau(clau.users.create, { uuid, page, pageSize })
    return { user, users, maxPages }
}

export async function updateUser(userData: any) {
    const { api: { clau } } = useAppConfig()
    const { data: { user } } = await apiClau(clau.users.update, { userData })
    return user
}

export async function deleteUser(uuid: string) {
    const { api: { clau } } = useAppConfig()
    const { data: confirmation } = await apiClau(clau.users.delete, { uuid })
    return confirmation
}