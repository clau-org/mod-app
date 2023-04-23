import { ref, reactive } from 'vue'

export function useAsyncFn(_fn: Function) {

    const input = reactive({})
    const data = ref<any>(null)
    const error = ref<any>(null)
    const isLoading = ref<Boolean>(false)

    async function fn() {
        isLoading.value = true
        try {
            data.value = await _fn(input)
        } catch (e) {
            error.value = e
        }
        isLoading.value = false
    }

    return {
        input,
        data,
        error,
        isLoading,
        fn,
    }
}