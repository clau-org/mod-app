export default defineAppConfig({
    app: {
        name: "clau",
        environment: "dev",
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
            host: "http://localhost:8000",
            auth: {
                sessions: {
                    create: "/auth/sessions/create",
                    delete: "/auth/sessions/delete",
                    verify: "/auth/sessions/verify"
                }
            }
        }
    },
    auth: {
        oauth: {
            redirect: "http://localhost:8000/auth/sessions/oauth"
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
