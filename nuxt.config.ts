// import { defineNuxtConfig } from "nuxt/config"

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  imports: {
    dirs: ['stores']
  },
  nitro: {
    preset: "deno"
  },
  srcDir: "src",
  modules: [
    ['@nuxtjs/tailwindcss', {
      config: {
        content: ['**/**.vue'],
      },
    }],
    '@pinia/nuxt',
    '@vueuse/nuxt',
    'nuxt-icon',
    'nuxt-headlessui',
    '@nuxtjs/device',
    ['nuxt-schema-org', {
      host: 'https://example.com',
    }],
    'magic-regexp/nuxt',
    'nuxt-swiper',
    'nuxt-typed-router',
    '@nuxtjs/partytown',
    '@vue-macros/nuxt',
    'nuxt-viewport',
    '@sidebase/nuxt-pdf',

    /** WAIT */
    '@pinia-plugin-persistedstate/nuxt',
    // "nuxt-security",

    /** DONT WORK ON DENO */
    // "@nuxtjs/i18n",
    // "@nuxt/image-edge",
  ],
})
