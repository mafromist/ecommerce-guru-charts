<template>
  <div class="chart-container bg-gray-10 border-purple-100 shadow-lg p-2 rounded-lg">
    <ChartHeader 
      :dayRange="selectedDayRange"
      @dayRangeChanged="changeDayRange" />
    <ChartBody v-if="!loading && salesData.length > 0" 
      :key="salesData.length"
      :salesData="salesData" 
      :loading="loading" 
      :fetchError="fetchError"
      :currency="storeCurrency"
      @updateSelectedDate="update-selected-date" />
  </div>
</template>

<script setup>
import ChartBody from './ChartBody.vue';
import ChartHeader from './ChartHeader.vue';

import { computed, watch } from "vue";
import { useStore } from "vuex";

const emit = defineEmits(['update-selected-date']);

const store = useStore();

const userStore = computed(() => store.state.user.store);
const salesStore = computed(() => store.state.sales);

const selectedDayRange = computed(() => salesStore.value?.selectedDayRange || 60);
const salesData = computed(() => salesStore.value?.salesData[selectedDayRange.value] || []);
const fetchError = computed(() => salesStore.value?.fetchDataError);
const loading = computed(() => salesStore.value?.loading);
const storeCurrency = computed(() => salesStore.value?.currency || '$');

//This is to prevent undefined marketplaceName and storeId when userStore is not yet loaded

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