export default {
  state: {
    chartData: [1, 3, 2, 4] // Sample data for the chart
  },
  getters: {
    getChartData: (state) => state.chartData
  }
}
