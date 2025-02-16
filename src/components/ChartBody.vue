<template>
  <div>
    <div v-if="loading" class="flex justify-center items-center my-4">
      <div
        class="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500">
      </div>
    </div>
    <div v-if="fetchError" class="text-red-500 my-4">
      <p>Error loading sales data: {{ fetchError }}</p>
    </div>
    <div id="sales-chart-container"
      v-if="!loading && !fetchError && salesData.length > 0">
    </div>
  </div>
</template>

<script setup>
import Highcharts from 'highcharts';
import { computed, onMounted, watch } from 'vue';

const props = defineProps({
  salesData: {
    type: Array,
    required: true
  },
  loading: {
    type: Boolean,
    required: true
  },
  fetchError: {
    type: String,
    default: ''
  },
  currency: {
    type: String,
    default: '$'
  }
});

const chartOptions = computed(() => {
  return {
    chart: { type: 'column' },
    title: { text: '' },
    xAxis: { categories: props.salesData.map(item => item.category) },
    yAxis: {
      min: 0,
      title: { text: `Amount (${props.currency})` },
      stackLabels: {
        enabled: true,
        style: {
          color: 'purple',
          textOutline: '0px'
        },
        y: -16,
        rotation: 270,
        align: 'center',
        formatter: function () {
          //removing minus dataLabels from the chart
          return this.total > 0 ? this.total : '';
        }
      }
    },
    tooltip: {
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        stacking: 'normal',
        dataLabels: {
          enabled: false,
          align: 'right',
          color: '#FFFFFF',
          x: 0
        },
        pointPadding: 0.1,
        groupPadding: 0
      }
    },
    series: [
      {
        name: 'FBA Sales',
        data: props.salesData.map(item => item.fbaAmount),
      },
      {
        name: 'FBM Sales',
        data: props.salesData.map(item => item.fbmAmount),
      },
      {
        name: 'Profit',
        data: props.salesData.map(item => item.profit),
      }
    ],
    accessibility: {
      enabled: false
    }
  };
});

onMounted(() => {
  Highcharts.chart('sales-chart-container', chartOptions.value);
});

</script>
