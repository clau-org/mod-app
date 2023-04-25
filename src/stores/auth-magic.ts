import { defineStore } from 'pinia'
import { Magic } from 'magic-sdk'
import { OAuthExtension, OAuthProvider, } from '@magic-ext/oauth'

const _useStoreAuthMagic = defineStore('AuthMagic', () => {
    const { keys } = useAppConfig()
    const { isLoggedIn, session, refreshSession, user } = useStoreAuth()

    const magicKey = keys.magicKey

    let authMagic: any = null
    const userMagicToken = ref("")

    const isLoading = ref(true)

    async function logout() {
        isLoading.value = true
        try {
            await authMagic.user.logout()
            userMagicToken.value = ""
        } catch (e) { }
        isLoading.value = false
    }

    async function setupMagic() {
        isLoading.value = true
        try {
            authMagic = new Magic(magicKey, { extensions: [new OAuthExtension()] })

            if (!isLoggedIn.value) {
                await getJwt()
                await refreshUserMagicToken()
            } else {
                await refreshSession()
            }
        } catch (error) { logger.error({ error }) }

        isLoading.value = false
    }

    async function getJwt() {
        const route = useRoute()
        const { jwt } = route.query
        if (!jwt) return

        session.value = { jwt }
        logger.debug('[getJwt]', "jwt found")

        await refreshSession()
        navigateTo(route.path)
    }

    const watchMagicToken = async () => {
        if (userMagicToken.value && !isLoggedIn.value) {
            isLoading.value = true
            const { session: _session, user: _user } = await createSession(userMagicToken.value)
            user.value = _user
            session.value = _session
            isLoading.value = false
        }
    }

    async function refreshUserMagicToken() {
        if (isLoggedIn.value) return
        try {
            userMagicToken.value = await authMagic.user.getIdToken();
            logger.debug("[refreshUser]", { userMagicToken: userMagicToken.value })
        } catch (e) { }
    }

    function useLoginWithEmailOTP() {
        return useAsyncFn(async ({ email }: any) => {
            isLoading.value = true
            let response = null
            try {
                response = await authMagic.auth.loginWithEmailOTP({ email, showUI: true })
                await refreshUserMagicToken()
            } catch { }
            isLoading.value = false
            return response
        })
    }

    function useLoginWithSMS() {
        return useAsyncFn(async ({ phoneNumber }: any) => {
            isLoading.value = true
            let response = null
            try {
                response = await authMagic.auth.loginWithSMS({ phoneNumber })
                await refreshUserMagicToken()
            } catch { }
            isLoading.value = false
            return response
        })
    }

    function useLoginOAuth(provider: string) {
        return useAsyncFn(async () => {
            const { auth } = useAppConfig()

            isLoading.value = true

            const host = window?.location?.host;
            const protocol = window.location.protocol;
            const redirect = auth.oauth.redirect ?? `${protocol}//${host}/auth`

            try {
                await authMagic.oauth.loginWithRedirect({
                    provider,
                    redirectURI: redirect,
                });
                await refreshUserMagicToken();
                setTimeout(() => {
                    isLoading.value = true
                }, 3000)
            } catch {
                isLoading.value = false
            }

        })
    }

    function useLogout() {
        return useAsyncFn(async () => await logout())
    }

    return {
        userMagicToken,
        isLoading,

        setupMagic,
        watchMagicToken,
        refreshUserMagicToken,

        useLoginWithEmailOTP,
        useLoginWithSMS,
        useLoginOAuth,
        useLogout,
        logout,
    }
}, {
    persist: {
        storage: persistedState.localStorage,
    }
}
)

export const useStoreAuthMagic = () => useCustomStore(_useStoreAuthMagic())


