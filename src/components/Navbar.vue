<template>
  <nav class="navbar">
    <div
      class="navbar relative flex items-center justify-center capitalize text-base py-2 text-white border-white-200 bg-purple-700">
      <router-link v-if="!isAuthenticated" class="navbar-link inline pr-5" to="/" active-class="active">Login</router-link>

      <div v-else class="flex justify-between w-full px-4 pb-4">
        <div>
          <p class="inline text-base flex gap-2">Welcome,
            <span class="font-bold">{{ firstName + " " + lastName }}</span>
          </p>
        </div>
        <div class="flex gap-4 ">
          <router-link class="navbar-link inline" to="/dashboard" active-class="active">Dashboard</router-link>
          <router-link class="navbar-link inline" to="/" @click.prevent="logout" active-class="active">Logout</router-link>
        </div>
      </div>
    </div>
    <div v-if="isAuthenticated"
      class="navbar relative flex items-center justify-around text-base text-purple-500 py-2 border-b-2 bg-purple-200 border-gray-200 shadow-lg">
      <p><span class="font-bold">Marketplace:</span> {{ marketplaceName }}</p>
      <p><span class="font-bold">UserId:</span> {{ userId }}</p>
      <p><span class="font-bold">StoreId:</span> {{ storeId }}</p>
    </div>


  </nav>
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

<style lang="scss">
.navbar
{
  &-link.active
  {
    &::after
    {
      @apply block w-full bg-green-500;
      content: '';
      height: 1px;
    }
  }
}
</style>
