<template>
  <div class="chart-header flex justify-between items-center ">
    <h1 class="text-xl font-bold mb-4">Daily Sales</h1>

    <select v-model.number="selectedDayRange" @change="updateDayRange"
      class="border-none rounded px-2 py-2">
      <option v-for="day in dayRanges" :value="day" :key="day">
        Last {{ day }} days
      </option>
    </select>
  </div>
</template>

<script setup>

const props = defineProps({
  dayRange: Number
});
import { ref } from 'vue';

const dayRanges = [60, 30, 14, 7];

const selectedDayRange = ref(props.dayRange);

const emit = defineEmits(['dayRangeChanged']);

const updateDayRange = async () => {
  emit('dayRangeChanged', selectedDayRange.value);
};

</script>