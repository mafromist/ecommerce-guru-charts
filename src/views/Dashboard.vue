<template>
  <div class="p-4">
    <h1 class="text-xl font-bold mb-4">Dashboard</h1>
    <p v-if="marketplaceName">Welcome! Your marketplace is {{ marketplaceName }}.</p>
    <p v-else>Loading marketplace information...</p>
    <p v-if="storeId">Your store ID is {{ storeId }}.</p>
  </div>
  <Chart />
</template>

<script setup>
import { onMounted, computed } from "vue";
import { useStore } from "vuex";
import Chart from '@/components/Chart.vue';


// Vuex store
const store = useStore();

// Fetch user information when the dashboard is mounted
onMounted(async () => {
  await store.dispatch("user/fetchUserInfo");
});

// Map user information from the Vuex store
const marketplaceName = computed(() => store.state.user.marketplaceName);
const storeId = computed(() => store.state.user.storeId);
</script>