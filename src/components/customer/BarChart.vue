<template>
  <div class="asd">
    <!-- <div>{{ calculatedTimeSpent }}</div>
    <div>{{ calculatedDates }}</div> -->
    <apexchart
      type="bar"
      class="apex-chart-time"
      height="300"
      width="90%"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
export default {
  name: "BarChart",
  props: ["completedLists"],
  computed: {
    calculatedTimeSpent() {
      let timeSpentArray = [];
      let time = 0;
      this.completedLists.forEach((list) => {
        time = list.timeEnded - list.timeStarted;
        let hours = new Date(time).getUTCHours();
        let minutes = new Date(time).getUTCMinutes();
        let seconds = new Date(time).getUTCSeconds();
        if (seconds > 30) minutes++;
        timeSpentArray.push(hours ? hours * 60 + minutes : minutes);
      });
      return timeSpentArray;
    },

    calculatedDates() {
      let datesArray = [];
      this.completedLists.forEach((list) => {
        datesArray.push(new Date(list.timeEnded).toLocaleDateString("fr-FR"));
      });
      return datesArray;
    },

    series() {
      return [
        {
          name: "Time spent",
          data: this.calculatedTimeSpent,
        },
      ];
    },

    chartOptions() {
      return {
        chart: {
          height: 350,
          type: "bar",
          //   toolbar: {
          //     show: false,
          //   },
        },
        plotOptions: {
          bar: {
            borderRadius: 2,
            dataLabels: {
              position: "top", // top, center, bottom
            },
          },
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val >= 60
              ? `${Math.floor(val / 60)}h ` + (val % 60) + "'"
              : val + "'";
          },
          offsetY: -20,
          style: {
            fontSize: "12px",
            colors: ["#304758"],
          },
        },

        xaxis: {
          range: 9,
          categories: this.calculatedDates,
          position: "bottom",
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: true,
          },
          tickPlacement: "on",
          tickAmount: 8,
          crosshairs: {
            fill: {
              type: "gradient",
              gradient: {
                colorFrom: "#D8E3F0",
                colorTo: "#BED1E6",
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5,
              },
            },
          },
          tooltip: {
            enabled: false,
          },
        },
        yaxis: {
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
            formatter: function (val) {
              return val >= 60
                ? `${Math.floor(val / 60)}h ` + (val % 60) + "'"
                : val + "'";
            },
          },
        },
        title: {
          text: "Time Spent Shopping",
          floating: true,
          offsetY: 330,
          align: "center",
          style: {
            color: "#444",
          },
        },
      };
    },
  },
};
</script>

<style scoped>
.apex-chart-time {
  display: flex;
  justify-content: center;
}
</style>
