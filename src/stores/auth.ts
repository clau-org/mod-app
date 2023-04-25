import { defineStore } from 'pinia'

const _useStoreAuth = defineStore('Auth', () => {

    const user = ref<any>(null)
    const session = ref<any>(null)
    const isLoggedIn = computed(() => !!user.value)
    const isLoading = ref(true)

    async function logout() {
        isLoading.value = true
        try {
            await deleteSession(session.value!.jwt)
            user.value = null
            session.value = null

        } catch (e) { }
        isLoading.value = false
    }

    async function refreshSession() {
        try {
            const { session: _session, user: _user } = await verifySession(session.value!.jwt)
            user.value = _user
            session.value = _session

            logger.debug("[refreshSession]", { user: _user, session: _session })
        } catch (e) {
            logger.error({ error: e })
            user.value = null
            session.value = null
        }
    }

    function useLogout() {
        return useAsyncFn(async () => await logout())
    }

    return {
        user,
        session,
        isLoggedIn,
        isLoading,

        refreshSession,
        logout,
        useLogout,
    }
}, {
    persist: {
        storage: persistedState.localStorage,
    }
}
)

export const useStoreAuth = () => useCustomStore(_useStoreAuth())


