
export const apiClau = async (url: string, body?: any): Promise<any> => {
    const { api } = useAppConfig()
    return await $fetch(url, {
        baseURL: api.clau.host,
        method: "POST",
        body,
    })
}
