<template>
  <div class="q-pa-md">
    <div v-for="n in 100" :key="n" class="q-py-xs">
          Lorem ipsum dolor sit amet, consectetur adipisicing
          elit, sed do eiusmod tempor incididunt ut labore et
          dolore magna aliqua.
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import UserService from 'services/user.service';

onMounted(() => {
  // UserService.login({ id: 1, name: 'demo' });
  console.log('UserService ', UserService);
});
</script>
