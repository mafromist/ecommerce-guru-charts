<template>
  <div class="p-4">
    <div v-if="fetchError && storeId"
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      {{ fetchError }}
    </div>

    <div v-if="loading" class="flex items-center justify-center p-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500">
      </div>
    </div>

    <div v-else>
      <ChartContainer v-if="!loading && !fetchError" />
    </div>
  </div>


</template>

<script setup>
import { onMounted, computed } from "vue";
import { useStore } from "vuex";
import ChartContainer from "@/components/ChartContainer.vue";

const store = useStore();

const loading = computed(() => store.state.user.loadingUser);
const fetchError = computed(() => store.state.user.fetchError);

onMounted(async () => {
  try {
    store.commit('user/setLoading', true);
    store.commit('user/setError', null);
   
    await store.dispatch("user/fetchUserInfo");
  } catch (err) {
    store.commit('user/setError',
      'Unable to load user information. Please try again later.'
    );
    console.error("Dashboard loading error:", err);
  } finally {
    store.commit('user/setLoading', false);
  }
});
</script>