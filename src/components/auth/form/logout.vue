<script setup>
const {
    user,
    isLoggedIn,
    useLogout,
} = useStoreAuthMagic()

const {
    data,
    error,
    isLoading,
    fn: logout,
} = useLogout()

</script>

<template>
    <div class="w-full">
        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">
            Bienvenido {{ user.name }}
        </label>
        <div class="flex">
            <div class="mt-2 w-full mr-5">
                <input required="" :value="user.email ?? user.phone" disabled
                    class="text-gray-400 block w-full px-2 rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <button @click="logout" :disabled="isLoading || !isLoggedIn"
                class="block  w-[100px] mt-2 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                <UiSpinner v-if="isLoading" class="ml-auto mr-auto" />
                <span v-else :class="{
                        'text-gray-400': isLoading || !isLoggedIn
                    }">
                    Salir
                </span>
            </button>
        </div>
    </div>
</template>

<style scoped></style>