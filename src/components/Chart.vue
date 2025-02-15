<template>
  <div>
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>

<script setup>
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';


const store = useStore();



const chartOptions = computed(() => ({
  title: {
    text: 'Sample Chart'
  },
  series: [{
    data: store.getters.getChartData
  }],
  accessibility: {
    enabled: false
  }
}
));

</script>
