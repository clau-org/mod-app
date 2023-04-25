<script setup>
const {
    useLoginWithSMS,
} = useStoreAuthMagic()

const {
    input,
    isLoading,
    fn: login,
} = useLoginWithSMS()

const {
    isLoggedIn,
} = useStoreAuth()

</script>

<template>
    <div class="w-full">
        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">
            Numero telefonico
        </label>
        <div class="flex">
            <div class="mt-2 w-full mr-5">
                <input id="phone" name="phone" type="tel" autocomplete="tel" required="" v-model="input.phoneNumber"
                    :disabled="isLoading || isLoggedIn"
                    :class="{
                        'text-gray-400': isLoggedIn
                    }"
                    class="block w-full px-2 rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <button @click="login" :disabled="isLoading || isLoggedIn"
                class="block  w-[100px] mt-2 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                <UiSpinner v-if="isLoading" class="ml-auto mr-auto" />
                <span v-else :class="{
                        'text-gray-400': isLoggedIn
                    }">
                    Entrar
                </span>
            </button>
        </div>
    </div>
</template>

<style scoped></style>