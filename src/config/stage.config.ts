export default defineAppConfig({
    app: {
        name: "clau",
        environment: "stage",
        version: "0.0.0",
        logLevel: "debug",
        logo: "https://bucket.clau-dev.com/logo.png",
    },
    platform: {
        name: "clau",
        logo: "https://bucket.clau-dev.com/logo.png"
    },
    keys: {
        magicKey: "pk_live_3537E2E4D3D38899"
    },
    api: {
        clau: {
            host: "https://mod-clau.deno.dev",
            auth: {
                sessions: {
                    create: "/auth/sessions/create",
                    delete: "/auth/sessions/delete",
                    verify: "/auth/sessions/verify"
                }
            },
            users: {
                create: "/users/create",
                read: "/users/create",
                update: "/users/create",
                delete: "/users/create"
            }
        }
    },
    auth: {
        oauth: {
            redirect: "https://mod-clau.deno.dev/auth/sessions/oauth"
        }
    }
})

declare module 'nuxt/schema' {
    interface AppConfigInput {
        app: {
            name?: string
        },
        platform: any,
        keys: any,
        api: any
    }
}
