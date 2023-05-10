<template>
  <div id="chart" v-if="categoryFreqSum">
    <apexchart
      type="pie"
      width="500"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
export default {
  name: "PieChart",
  computed: {
    series() {
      if (this.categoryFreqSum) {
        return Object.values(this.categoryFreqSum);
      }
      return [];
    },

    chartOptions() {
      if (this.categoryFreqSum) {
        return {
          chart: {
            width: 380,
            type: "pie",
          },
          labels: Object.keys(this.categoryFreqSum),
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: "100%",
                },
                legend: {
                  position: "bottom",
                },
              },
            },
          ],
        };
      }
      return null;
    },
  },
  data() {
    return {
      categoryFreqSum: null,
    };
  },
  async mounted() {
    const res = await this.$api.get("/shopping-lists/get-category-statistics");
    this.categoryFreqSum = res.data.data.compressedCategoryFreqSum;
  },
};
</script>

<style scoped>
#chart {
  margin-bottom: 20px;
}
* >>> span.apexcharts-legend-text {
  color: #26a69a !important;
}
</style>
