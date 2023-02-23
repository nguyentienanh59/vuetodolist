<template>
  <q-layout view="hHh lpR fFf" v-if="!isLoading">
    <q-page-container>
      <div
        class="window-height window-width tw-flex tw-justify-center
        tw-items-center md:tw-bg-white"
      >
        <div
          class="md:tw-border-2 md:tw-rounded-lg tw-px-5 md:tw-px-10 md:tw-pt-10 tw-w-96 bg-white"
        >
          <div class="tw-text-center q-pa-sm">
            <p class="tw-text-xl">Takumi Match</p>
          </div>
          <div class="tw-mt-2">
            <span class="tw-font-bold tw-text-sm tw-text-[#4B5C6B]">Mail</span>
            <q-input
              outlined
              v-model.trim="formData.email"
              autocomplete="off"
              lazy-rules
              maxlength="24"
              :error="!!errors.email"
              :error-message="errors.email"
            >
              <template v-slot:prepend>
                <q-icon color="" name="person" />
              </template>
            </q-input>
          </div>
          <div class="tw-mt-2">
            <span class="tw-font-bold tw-text-sm tw-text-[#4B5C6B]"
              >Password</span
            >
            <q-input
              outlined
              v-model="formData.password"
              autocomplete="off"
              :type="showPassword ? 'text' : 'password'"
              lazy-rules
              maxlength="16"
              :error="!!errors.password"
              :error-message="errors.password"
            >
              <template v-slot:prepend>
                <q-icon color="" name="lock" />
              </template>
              <template v-slot:append>
                <q-icon
                  color=""
                  :name="showPassword ? 'visibility_off' : 'visibility'"
                  @click="showPassword = !showPassword"
                  left
                />
              </template>
            </q-input>
          </div>
          <div class="text-center">
            <q-btn
              class="tw-w-full md:tw-w-32 q-mt-md tw-py-2"
              label="Login"
              type="button"
              color="primary"
              size="md"
              @click="login"
            />
          </div>
          <div class="row tw-mt-10"></div>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import useValidate from 'composables/validate';
import loginSchema from 'schemas/auth/login';
import toast from 'utilities/toast';
import { useAuthStore } from 'stores/auth-store';
import { useAppStore } from 'stores/app-store';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import userService from 'services/user.service';

// 1) ======= INITIALIZATION ========
const { errors, validate } = useValidate();
// ==> 1.1) state and getters
const { isLoading } = storeToRefs(useAppStore());
// ==> 1.2) actions
const { signIn } = useAuthStore();
const { setLoading } = useAppStore();
// ==> 1.3) Others
const router = useRouter();

// 2) ======= VARIABLE REF ========
const formData = ref({
  email: '',
  password: '',
});
const showPassword = ref(false);

// 3) ======= METHOD/FUNCTION ========

const login = async () => {
  const isValid = validate(loginSchema, formData.value);
  if (!isValid) {
    return;
  }
  setLoading(true);
  // send login request
  const result = await userService.login(formData.value);

  if (result) {
    localStorage.setItem('__TOKEN', JSON.stringify(result));
    signIn(result);
    toast.success('Login successfully');
    router.push('/');
  }
  setLoading(false);
};

// 4) ======= VUEJS LIFECYCLE ========

// onMounted
onMounted(() => {});
</script>
