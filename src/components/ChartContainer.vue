<template>
  <div class="chart-container bg-white shadow-sm p-2 rounded-lg">
    <ChartHeader :dayRange="selectedDayRange"
      @dayRangeChanged="changeDayRange" />
    <ChartBody v-if="!loading && salesData.length > 0" 
      :key="salesData.length"
      :salesData="salesData" 
      :loading="loading" 
      :fetchError="fetchError"
      :currency="storeCurrency" />
  </div>
</template>

<script setup>
import ChartBody from './ChartBody.vue';
import ChartHeader from './ChartHeader.vue';

import { computed, watch } from "vue";
import { useStore } from "vuex";

const store = useStore();

const userStore = computed(() => store.state.user.store);
const salesStore = computed(() => store.state.sales);

const selectedDayRange = computed(() => salesStore.value?.selectedDayRange || 60);
const salesData = computed(() => salesStore.value?.salesData[selectedDayRange.value] || []);
const fetchError = computed(() => salesStore.value?.fetchDataError);
const loading = computed(() => salesStore.value?.loading);
const storeCurrency = computed(() => salesStore.value?.currency || '$');

watch(
  userStore,
  (newUserStore) => {
    if (newUserStore && newUserStore.marketplaceName && newUserStore.storeId) {
      store.dispatch('sales/fetchSalesData', selectedDayRange.value);
    }
  },
  { immediate: true }
);

const changeDayRange = async (newDayRange) => {
  await store.dispatch('sales/updateSelectedDayRange', newDayRange);
};


</script>