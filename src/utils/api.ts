export const apiClau = (
    url: string,
    body?: any
) => {
    const { api } = useAppConfig()
    return $fetch(url, {
        baseURL: api.clau.host,
        method: "POST",
        body,
    })
}

export const pathApiClau = () => {
    const { api } = useAppConfig()
    return api.clau
}