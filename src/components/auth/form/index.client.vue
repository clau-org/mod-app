<script setup>

const {
    isLoading,
    setupMagic,
    watchMagicToken,
    userMagicToken,
} = useStoreAuthMagic()

const {
    isLoggedIn,
    isLoadingAuth
} = useStoreAuth()

onMounted(async () =>  await setupMagic())
watch([userMagicToken], watchMagicToken)

const { app} = useAppConfig()
</script>

<template>
    <div class="">
        <UiLoading :loading="isLoading || isLoadingAuth">

            <div class="flex m-auto flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div class="sm:mx-auto sm:w-full sm:max-w-md">
                    <img class="mx-auto h-20 border border-gray-200 rounded-lg w-auto" :src="app.logo" alt="Your Company" />
                    <h2 class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        {{ app.name.toUpperCase() }}
                    </h2>
                </div>

                <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                    <div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                        <div v-if="!isLoggedIn">
                            <div class="space-y-6">

                                <AuthFormEmail />

                                <div class="relative mt-10">
                                    <div class="absolute inset-0 flex items-center" aria-hidden="true">
                                        <div class="w-full border-t border-gray-200" />
                                    </div>
                                    <div class="relative flex justify-center text-sm font-medium leading-6">
                                        <span class="bg-white px-6 text-gray-900">O continua con</span>
                                    </div>
                                </div>

                                <AuthFormPhone />
                            </div>
                            <div>
                                <div class="relative mt-10">
                                    <div class="absolute inset-0 flex items-center" aria-hidden="true">
                                        <div class="w-full border-t border-gray-200" />
                                    </div>
                                    <div class="relative flex justify-center text-sm font-medium leading-6">
                                        <span class="bg-white px-6 text-gray-900">O continua con</span>
                                    </div>
                                </div>

                                <div class="mt-6 grid grid-cols-1 gap-4">

                                    <AuthFormOauthGithub />

                                </div>
                            </div>
                        </div>
                        <div v-else>
                            <AuthFormLogout />
                        </div>
                    </div>


                </div>

                <p v-if="!isLoggedIn" class="mt-10 text-center text-gray-500">
                    No eres miembro?
                    {{ ' ' }}
                    <span class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Te crearemos una
                        cuenta nueva</span>
                </p>
            </div>
        </UiLoading>
    </div>
</template>

