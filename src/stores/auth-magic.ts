import { defineStore } from 'pinia'
import { Magic } from 'magic-sdk'
import { OAuthExtension, OAuthProvider, } from '@magic-ext/oauth'

const _useStoreAuthMagic = defineStore('AuthMagic', () => {
  const magicKey = "pk_live_3537E2E4D3D38899"

  let authMagic: any = null
  const user = ref<any>(null)
  const session = ref<any>(null)
  const userMagicToken = ref("")
  const isLoggedIn = computed(() => !!user.value)
  const isLoading = ref(true)


  async function logout() {
    isLoading.value = true
    try {
      try {
        const confirmation: any = await apiClau("/auth/sessions/delete", {
          jwt: session.value!.jwt
        })
        logger.info("[logout]", { confirmation })
      } catch (error) {
        logger.error("[logout]", { error })
      }
      try {
        await authMagic.user.logout()
      } catch (error) {
        logger.error("[logout]", { error })
      }
      user.value = null
      session.value = null
      userMagicToken.value = ""
    } catch (e) { }
    isLoading.value = false
  }

  async function getOAuthResult() {
    try {
      const oauthReponse = await authMagic.oauth.getRedirectResult();
      const { oauth: { userInfo } } = oauthReponse
      // user.value = userInfo
      logger.info({ oauthReponse })
    } catch (e) { }
  }

  async function setupMagic() {
    isLoading.value = true

    try {
      authMagic = new Magic(magicKey, {
        extensions: [new OAuthExtension()],
      })

      logger.debug('[setupMagic]')

      if (!isLoggedIn.value) {
        await getOAuthResult()
        await refreshUserMagicToken()
      } else {
        await refreshSession()
      }

    } catch (error) {
      logger.error({ error })
    }

    isLoading.value = false
  }

  const watchMagicToken = async () => {
    logger.info({
      userMagicToken: !!userMagicToken.value,
      notisLoggedIn: !isLoggedIn.value
    })

    if (userMagicToken.value && !isLoggedIn.value) {
      isLoading.value = true

      const response: any = await apiClau("/auth/sessions/create", {
        magicToken: userMagicToken.value
      })

      const { session: _session, user: _user } = response.data

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

  async function refreshSession() {

    if (!isLoggedIn.value) {
      user.value = null
      session.value = null
      return
    }

    try {
      const { data: { session: _session, user: _user } }: any = await apiClau("/auth/sessions/verify", {
        jwt: session.value!.jwt
      })

      user.value = _user
      session.value = _session

      logger.debug("[refreshSession]", { user: _user, session: _session })
    } catch (e) {
      logger.error({ error: e })
      user.value = null
      session.value = null
    }
  }

  function useLoginWithEmailOTP() {
    return useAsyncFn(async ({ email }: any) => {
      isLoading.value = true

      logger.log("[useLoginWithEmailOTP]", { email })

      let response = null
      try {
        response = await authMagic.auth.loginWithEmailOTP({ email, showUI: true })
        await refreshUserMagicToken()
      } catch { }


      logger.debug("useLoginWithEmailOTP", { isLoading })

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


      logger.debug("useLoginWithSMS", { isLoading })

      isLoading.value = false
      return response
    })
  }

  function useLoginOAuth(provider: string) {
    return useAsyncFn(async () => {

      isLoading.value = true

      const host = window?.location?.host;
      const protocol = window.location.protocol;

      logger.info("provider", provider);
      try {
        await authMagic.oauth.loginWithRedirect({
          provider,
          redirectURI: `${protocol}//${host}/auth`,
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
    user,
    session,
    userMagicToken,
    isLoggedIn,
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


