// export const ApiClauBase = "http://localhost:8000"
export const ApiClauBase = "https://mod-clau.deno.dev"
export const apiClau = (
    url: string,
    body?: any
) => $fetch(url, {
    baseURL: ApiClauBase,
    method: "POST",
    body,
})