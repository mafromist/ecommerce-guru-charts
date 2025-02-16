<template>

  <footer class="bg-purple-200 text-gray text-center p-2">
    <p class="text-center font-thin">© 2025 - Developed for Eva by Muge</p>
  </footer>

</template>

<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const isAuthenticated = computed(() => store.getters['auth/isAuthenticated']);

const logout = () => {
  store.dispatch('auth/logoutUser');
  router.push('/');
}

const firstName = computed(() => store.state.user.firstName);
const lastName = computed(() => store.state.user.lastName);
const userId = computed(() => store.state.user.userId);
const marketplaceName = computed(() => store.state.user.store.marketplaceName);
const storeId = computed(() => store.state.user.store.storeId);

</script>

<style lang="scss"></style>
