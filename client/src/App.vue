<template>
  <q-layout v-if="appInit" view="hHh LpR fff">
    <q-page-container>
      <q-page class="column items-center">
        <div class="col row items-center">
          <q-circular-progress indeterminate size="xl" color="light-blue" />
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
  <LoginPage v-else-if="!isLoggedIn"></LoginPage>
  <router-view v-else v-slot="{ Component, route }">
    <transition :name="route.meta?.transition || 'fade'" mode="out-in">
        <component :is="Component" :key="route.fullPath"></component>
    </transition>
    <q-inner-loading :showing="isLoading" class="tw-z-50 tw-fixed tw-top-0">
      <q-spinner-pie size="5.5em" color="deep-orange" />
    </q-inner-loading>
  </router-view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import LoginPage from 'pages/auth/LoginPage.vue';
import { useAppStore } from 'stores/app-store';
import { useAuthStore } from 'stores/auth-store';
import { storeToRefs } from 'pinia';

// 1) ======= INITIALIZATION ========
// ==> 1.1) state and getters
const { isLoading } = storeToRefs(useAppStore());
const { isLoggedIn } = storeToRefs(useAuthStore());
// ==> 1.2) actions
// ==> 1.3) Others

// 2) ======= VARIABLE REF ========
const appInit = ref(true);

// 3) ======= METHOD/FUNCTION ========

// 4) ======= VUEJS LIFECYCLE ========
onMounted(async () => {
  appInit.value = false;
});
</script>
