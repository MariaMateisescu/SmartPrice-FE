import { _ as _export_sfc, aL as resolveComponent, o as openBlock, c as createElementBlock, aa as createVNode, a3 as createCommentVNode, a2 as createBlock, bB as useDashHeaderStore, bA as useUserStore, a as createBaseVNode, a9 as createTextVNode, M as toDisplayString, aH as pushScopeId, aF as popScopeId } from "./index.5a14f3c4.js";
import { E as EmptyState } from "./EmptyState.4ff5feb6.js";
import "./QDialog.8f997d51.js";
import "./use-timeout.a3a7dc24.js";
import "./ClosePopup.262ce3d8.js";
import "./focus-manager.d6507951.js";
import "./QCard.133f47d5.js";
import "./use-dark.a5d47983.js";
import "./QInput.11495055.js";
import "./uid.42677368.js";
import "./use-form.0026fe71.js";
import "./Login.d1b99dd8.js";
import "./SignUp.0068903c.js";
import "./ForgotPassword.9cb51cc9.js";
var PieChart_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$2 = {
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
            type: "pie"
          },
          labels: Object.keys(this.categoryFreqSum),
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: "100%"
                },
                legend: {
                  position: "bottom"
                }
              }
            }
          ]
        };
      }
      return null;
    }
  },
  data() {
    return {
      categoryFreqSum: null
    };
  },
  async mounted() {
    const res = await this.$api.get("/shopping-lists/get-category-statistics");
    this.categoryFreqSum = res.data.data.compressedCategoryFreqSum;
  }
};
const _hoisted_1$1 = {
  key: 0,
  id: "chart"
};
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_apexchart = resolveComponent("apexchart");
  return $data.categoryFreqSum ? (openBlock(), createElementBlock("div", _hoisted_1$1, [
    createVNode(_component_apexchart, {
      type: "pie",
      width: "500",
      options: $options.chartOptions,
      series: $options.series
    }, null, 8, ["options", "series"])
  ])) : createCommentVNode("", true);
}
var PieChart = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__scopeId", "data-v-32550940"], ["__file", "PieChart.vue"]]);
var BarChart_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$1 = {
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
        if (seconds > 30)
          minutes++;
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
          data: this.calculatedTimeSpent
        }
      ];
    },
    chartOptions() {
      return {
        chart: {
          height: 350,
          type: "bar"
        },
        colors: ["#26a69a"],
        events: ["mousemove", "mouseout", "click"],
        plotOptions: {
          bar: {
            borderRadius: 2,
            dataLabels: {
              position: "top"
            }
          }
        },
        dataLabels: {
          enabled: true,
          formatter: function(val) {
            return val >= 60 ? `${Math.floor(val / 60)}h ` + val % 60 + "'" : val + "'";
          },
          offsetY: -20,
          style: {
            fontSize: "12px",
            colors: ["#26a69a"]
          }
        },
        xaxis: {
          range: 8,
          categories: this.calculatedDates,
          position: "bottom",
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: true
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
                opacityTo: 0.5
              }
            }
          },
          tooltip: {
            enabled: false
          }
        },
        yaxis: {
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          labels: {
            show: false,
            formatter: function(val) {
              return val >= 60 ? `${Math.floor(val / 60)}h ` + val % 60 + "'" : val + "'";
            }
          }
        },
        title: {
          text: "Time Spent Shopping",
          floating: true,
          offsetY: 330,
          align: "center",
          style: {
            color: "#444"
          }
        }
      };
    }
  }
};
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_apexchart = resolveComponent("apexchart");
  return openBlock(), createBlock(_component_apexchart, {
    type: "bar",
    class: "apex-chart-time",
    height: "300",
    width: "90%",
    options: $options.chartOptions,
    series: $options.series
  }, null, 8, ["options", "series"]);
}
var BarChart = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__scopeId", "data-v-4c56bb34"], ["__file", "BarChart.vue"]]);
var InsightsPage_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main = {
  name: "InsightsPage",
  components: { PieChart, BarChart, EmptyState },
  data() {
    return {
      image: "EmptyState.svg",
      title: "Ooops! You are not logged in!",
      message: "Log in to view your insights",
      lists: [],
      completedLists: [],
      timeSpentArray: [],
      averageTime: null
    };
  },
  async mounted() {
    const dashHeader = useDashHeaderStore();
    dashHeader.$patch({
      title: "Insights",
      showBackIcon: false
    });
    if (this.userStore.authUser) {
      await this.fetchShoppingLists();
    }
  },
  setup() {
    const userStore = useUserStore();
    return {
      userStore
    };
  },
  methods: {
    async fetchShoppingLists() {
      const res = await this.$api.get("/shopping-lists/get-shopping-lists");
      this.lists = res.data.shoppingLists;
      this.completedLists = this.lists.filter(
        (list) => list.status === "completed"
      );
      let totalTime = 0;
      this.completedLists.forEach(
        (list) => totalTime = totalTime + (list.timeEnded - list.timeStarted)
      );
      let avgTime = totalTime / this.completedLists.length;
      let hours = new Date(avgTime).getUTCHours();
      let minutes = new Date(avgTime).getUTCMinutes();
      let seconds = new Date(avgTime).getUTCSeconds();
      if (seconds > 30)
        minutes++;
      this.averageTime = hours ? hours + " hours " : "" + minutes + " minutes";
      console.log(this.averageTime);
    },
    calculateTimeSpentShopping(list) {
      if (list.status === "completed") {
        const time = list.timeEnded - list.timeStarted;
        let hours = new Date(time).getUTCHours();
        let minutes = new Date(time).getUTCMinutes();
        let seconds = new Date(time).getUTCSeconds();
        if (seconds > 30)
          minutes++;
        return hours ? hours + " hours " : "" + minutes + " minutes";
      } else
        return null;
    }
  }
};
const _withScopeId = (n) => (pushScopeId("data-v-4e2bc4c6"), n = n(), popScopeId(), n);
const _hoisted_1 = { class: "insights-page" };
const _hoisted_2 = { key: 0 };
const _hoisted_3 = { class: "insights-page-title" };
const _hoisted_4 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-h6" }, "See your shopping behaviour", -1));
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_BarChart = resolveComponent("BarChart");
  const _component_PieChart = resolveComponent("PieChart");
  const _component_EmptyState = resolveComponent("EmptyState");
  return openBlock(), createElementBlock("div", _hoisted_1, [
    $setup.userStore.authUser ? (openBlock(), createElementBlock("div", _hoisted_2, [
      createBaseVNode("div", _hoisted_3, [
        _hoisted_4,
        createBaseVNode("div", null, [
          createTextVNode(" Average time spent shopping: "),
          createBaseVNode("strong", null, toDisplayString($data.averageTime), 1)
        ])
      ]),
      createVNode(_component_BarChart, { completedLists: $data.completedLists }, null, 8, ["completedLists"]),
      createVNode(_component_PieChart)
    ])) : (openBlock(), createBlock(_component_EmptyState, {
      key: 1,
      image: $data.image,
      title: $data.title,
      message: $data.message
    }, null, 8, ["image", "title", "message"]))
  ]);
}
var InsightsPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-4e2bc4c6"], ["__file", "InsightsPage.vue"]]);
export { InsightsPage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5zaWdodHNQYWdlLjE4ZDU5ZWU4LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9jdXN0b21lci9QaWVDaGFydC52dWUiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9jdXN0b21lci9CYXJDaGFydC52dWUiLCIuLi8uLi8uLi9zcmMvcGFnZXMvSW5zaWdodHNQYWdlLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XHJcbiAgPGRpdiBpZD1cImNoYXJ0XCIgdi1pZj1cImNhdGVnb3J5RnJlcVN1bVwiPlxyXG4gICAgPGFwZXhjaGFydFxyXG4gICAgICB0eXBlPVwicGllXCJcclxuICAgICAgd2lkdGg9XCI1MDBcIlxyXG4gICAgICA6b3B0aW9ucz1cImNoYXJ0T3B0aW9uc1wiXHJcbiAgICAgIDpzZXJpZXM9XCJzZXJpZXNcIlxyXG4gICAgPjwvYXBleGNoYXJ0PlxyXG4gIDwvZGl2PlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIG5hbWU6IFwiUGllQ2hhcnRcIixcclxuICBjb21wdXRlZDoge1xyXG4gICAgc2VyaWVzKCkge1xyXG4gICAgICBpZiAodGhpcy5jYXRlZ29yeUZyZXFTdW0pIHtcclxuICAgICAgICByZXR1cm4gT2JqZWN0LnZhbHVlcyh0aGlzLmNhdGVnb3J5RnJlcVN1bSk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfSxcclxuXHJcbiAgICBjaGFydE9wdGlvbnMoKSB7XHJcbiAgICAgIGlmICh0aGlzLmNhdGVnb3J5RnJlcVN1bSkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICBjaGFydDoge1xyXG4gICAgICAgICAgICB3aWR0aDogMzgwLFxyXG4gICAgICAgICAgICB0eXBlOiBcInBpZVwiLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGxhYmVsczogT2JqZWN0LmtleXModGhpcy5jYXRlZ29yeUZyZXFTdW0pLFxyXG4gICAgICAgICAgcmVzcG9uc2l2ZTogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDgwLFxyXG4gICAgICAgICAgICAgIG9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgIGNoYXJ0OiB7XHJcbiAgICAgICAgICAgICAgICAgIHdpZHRoOiBcIjEwMCVcIixcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBsZWdlbmQ6IHtcclxuICAgICAgICAgICAgICAgICAgcG9zaXRpb246IFwiYm90dG9tXCIsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICBdLFxyXG4gICAgICAgIH07XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgZGF0YSgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGNhdGVnb3J5RnJlcVN1bTogbnVsbCxcclxuICAgIH07XHJcbiAgfSxcclxuICBhc3luYyBtb3VudGVkKCkge1xyXG4gICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy4kYXBpLmdldChcIi9zaG9wcGluZy1saXN0cy9nZXQtY2F0ZWdvcnktc3RhdGlzdGljc1wiKTtcclxuICAgIHRoaXMuY2F0ZWdvcnlGcmVxU3VtID0gcmVzLmRhdGEuZGF0YS5jb21wcmVzc2VkQ2F0ZWdvcnlGcmVxU3VtO1xyXG4gIH0sXHJcbn07XHJcbjwvc2NyaXB0PlxyXG5cclxuPHN0eWxlIHNjb3BlZD5cclxuI2NoYXJ0IHtcclxuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xyXG59XHJcbiogPj4+IHNwYW4uYXBleGNoYXJ0cy1sZWdlbmQtdGV4dCB7XHJcbiAgY29sb3I6ICMyNmE2OWEgIWltcG9ydGFudDtcclxufVxyXG48L3N0eWxlPlxyXG4iLCI8dGVtcGxhdGU+XHJcbiAgPCEtLSA8ZGl2PiAtLT5cclxuICA8IS0tIDxkaXY+e3sgY2FsY3VsYXRlZFRpbWVTcGVudCB9fTwvZGl2PlxyXG4gICAgPGRpdj57eyBjYWxjdWxhdGVkRGF0ZXMgfX08L2Rpdj4gLS0+XHJcbiAgPGFwZXhjaGFydFxyXG4gICAgdHlwZT1cImJhclwiXHJcbiAgICBjbGFzcz1cImFwZXgtY2hhcnQtdGltZVwiXHJcbiAgICBoZWlnaHQ9XCIzMDBcIlxyXG4gICAgd2lkdGg9XCI5MCVcIlxyXG4gICAgOm9wdGlvbnM9XCJjaGFydE9wdGlvbnNcIlxyXG4gICAgOnNlcmllcz1cInNlcmllc1wiXHJcbiAgPjwvYXBleGNoYXJ0PlxyXG4gIDwhLS0gPC9kaXY+IC0tPlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIG5hbWU6IFwiQmFyQ2hhcnRcIixcclxuICBwcm9wczogW1wiY29tcGxldGVkTGlzdHNcIl0sXHJcbiAgY29tcHV0ZWQ6IHtcclxuICAgIGNhbGN1bGF0ZWRUaW1lU3BlbnQoKSB7XHJcbiAgICAgIGxldCB0aW1lU3BlbnRBcnJheSA9IFtdO1xyXG4gICAgICBsZXQgdGltZSA9IDA7XHJcbiAgICAgIHRoaXMuY29tcGxldGVkTGlzdHMuZm9yRWFjaCgobGlzdCkgPT4ge1xyXG4gICAgICAgIHRpbWUgPSBsaXN0LnRpbWVFbmRlZCAtIGxpc3QudGltZVN0YXJ0ZWQ7XHJcbiAgICAgICAgbGV0IGhvdXJzID0gbmV3IERhdGUodGltZSkuZ2V0VVRDSG91cnMoKTtcclxuICAgICAgICBsZXQgbWludXRlcyA9IG5ldyBEYXRlKHRpbWUpLmdldFVUQ01pbnV0ZXMoKTtcclxuICAgICAgICBsZXQgc2Vjb25kcyA9IG5ldyBEYXRlKHRpbWUpLmdldFVUQ1NlY29uZHMoKTtcclxuICAgICAgICBpZiAoc2Vjb25kcyA+IDMwKSBtaW51dGVzKys7XHJcbiAgICAgICAgdGltZVNwZW50QXJyYXkucHVzaChob3VycyA/IGhvdXJzICogNjAgKyBtaW51dGVzIDogbWludXRlcyk7XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gdGltZVNwZW50QXJyYXk7XHJcbiAgICB9LFxyXG5cclxuICAgIGNhbGN1bGF0ZWREYXRlcygpIHtcclxuICAgICAgbGV0IGRhdGVzQXJyYXkgPSBbXTtcclxuICAgICAgdGhpcy5jb21wbGV0ZWRMaXN0cy5mb3JFYWNoKChsaXN0KSA9PiB7XHJcbiAgICAgICAgZGF0ZXNBcnJheS5wdXNoKG5ldyBEYXRlKGxpc3QudGltZUVuZGVkKS50b0xvY2FsZURhdGVTdHJpbmcoXCJmci1GUlwiKSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gZGF0ZXNBcnJheTtcclxuICAgIH0sXHJcblxyXG4gICAgc2VyaWVzKCkge1xyXG4gICAgICByZXR1cm4gW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIG5hbWU6IFwiVGltZSBzcGVudFwiLFxyXG4gICAgICAgICAgZGF0YTogdGhpcy5jYWxjdWxhdGVkVGltZVNwZW50LFxyXG4gICAgICAgIH0sXHJcbiAgICAgIF07XHJcbiAgICB9LFxyXG5cclxuICAgIGNoYXJ0T3B0aW9ucygpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBjaGFydDoge1xyXG4gICAgICAgICAgaGVpZ2h0OiAzNTAsXHJcbiAgICAgICAgICB0eXBlOiBcImJhclwiLFxyXG4gICAgICAgICAgLy8gdG9vbGJhcjoge1xyXG4gICAgICAgICAgLy8gICBzaG93OiBmYWxzZSxcclxuICAgICAgICAgIC8vIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb2xvcnM6IFtcIiMyNmE2OWFcIl0sXHJcbiAgICAgICAgZXZlbnRzOiBbXCJtb3VzZW1vdmVcIiwgXCJtb3VzZW91dFwiLCBcImNsaWNrXCJdLFxyXG4gICAgICAgIHBsb3RPcHRpb25zOiB7XHJcbiAgICAgICAgICBiYXI6IHtcclxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAyLFxyXG4gICAgICAgICAgICBkYXRhTGFiZWxzOiB7XHJcbiAgICAgICAgICAgICAgcG9zaXRpb246IFwidG9wXCIsIC8vIHRvcCwgY2VudGVyLCBib3R0b21cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBkYXRhTGFiZWxzOiB7XHJcbiAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgZm9ybWF0dGVyOiBmdW5jdGlvbiAodmFsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWwgPj0gNjBcclxuICAgICAgICAgICAgICA/IGAke01hdGguZmxvb3IodmFsIC8gNjApfWggYCArICh2YWwgJSA2MCkgKyBcIidcIlxyXG4gICAgICAgICAgICAgIDogdmFsICsgXCInXCI7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgb2Zmc2V0WTogLTIwLFxyXG4gICAgICAgICAgc3R5bGU6IHtcclxuICAgICAgICAgICAgZm9udFNpemU6IFwiMTJweFwiLFxyXG4gICAgICAgICAgICBjb2xvcnM6IFtcIiMyNmE2OWFcIl0sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHhheGlzOiB7XHJcbiAgICAgICAgICByYW5nZTogOCxcclxuICAgICAgICAgIGNhdGVnb3JpZXM6IHRoaXMuY2FsY3VsYXRlZERhdGVzLFxyXG4gICAgICAgICAgcG9zaXRpb246IFwiYm90dG9tXCIsXHJcbiAgICAgICAgICBheGlzQm9yZGVyOiB7XHJcbiAgICAgICAgICAgIHNob3c6IGZhbHNlLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGF4aXNUaWNrczoge1xyXG4gICAgICAgICAgICBzaG93OiB0cnVlLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHRpY2tQbGFjZW1lbnQ6IFwib25cIixcclxuICAgICAgICAgIHRpY2tBbW91bnQ6IDgsXHJcbiAgICAgICAgICBjcm9zc2hhaXJzOiB7XHJcbiAgICAgICAgICAgIGZpbGw6IHtcclxuICAgICAgICAgICAgICB0eXBlOiBcImdyYWRpZW50XCIsXHJcbiAgICAgICAgICAgICAgZ3JhZGllbnQ6IHtcclxuICAgICAgICAgICAgICAgIGNvbG9yRnJvbTogXCIjRDhFM0YwXCIsXHJcbiAgICAgICAgICAgICAgICBjb2xvclRvOiBcIiNCRUQxRTZcIixcclxuICAgICAgICAgICAgICAgIHN0b3BzOiBbMCwgMTAwXSxcclxuICAgICAgICAgICAgICAgIG9wYWNpdHlGcm9tOiAwLjQsXHJcbiAgICAgICAgICAgICAgICBvcGFjaXR5VG86IDAuNSxcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHRvb2x0aXA6IHtcclxuICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgeWF4aXM6IHtcclxuICAgICAgICAgIGF4aXNCb3JkZXI6IHtcclxuICAgICAgICAgICAgc2hvdzogZmFsc2UsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgYXhpc1RpY2tzOiB7XHJcbiAgICAgICAgICAgIHNob3c6IGZhbHNlLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGxhYmVsczoge1xyXG4gICAgICAgICAgICBzaG93OiBmYWxzZSxcclxuICAgICAgICAgICAgZm9ybWF0dGVyOiBmdW5jdGlvbiAodmFsKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHZhbCA+PSA2MFxyXG4gICAgICAgICAgICAgICAgPyBgJHtNYXRoLmZsb29yKHZhbCAvIDYwKX1oIGAgKyAodmFsICUgNjApICsgXCInXCJcclxuICAgICAgICAgICAgICAgIDogdmFsICsgXCInXCI7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdGl0bGU6IHtcclxuICAgICAgICAgIHRleHQ6IFwiVGltZSBTcGVudCBTaG9wcGluZ1wiLFxyXG4gICAgICAgICAgZmxvYXRpbmc6IHRydWUsXHJcbiAgICAgICAgICBvZmZzZXRZOiAzMzAsXHJcbiAgICAgICAgICBhbGlnbjogXCJjZW50ZXJcIixcclxuICAgICAgICAgIHN0eWxlOiB7XHJcbiAgICAgICAgICAgIGNvbG9yOiBcIiM0NDRcIixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgfTtcclxuICAgIH0sXHJcbiAgfSxcclxufTtcclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGUgc2NvcGVkPlxyXG4uYXBleC1jaGFydC10aW1lIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG59XHJcbiogPj4+IHRzcGFuIHtcclxuICBmaWxsOiAjMjZhNjlhO1xyXG59XHJcbjwvc3R5bGU+XHJcbiIsIjx0ZW1wbGF0ZT5cclxuICA8ZGl2IGNsYXNzPVwiaW5zaWdodHMtcGFnZVwiPlxyXG4gICAgPGRpdiB2LWlmPVwidXNlclN0b3JlLmF1dGhVc2VyXCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJpbnNpZ2h0cy1wYWdlLXRpdGxlXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDZcIj5TZWUgeW91ciBzaG9wcGluZyBiZWhhdmlvdXI8L2Rpdj5cclxuICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgQXZlcmFnZSB0aW1lIHNwZW50IHNob3BwaW5nOlxyXG4gICAgICAgICAgPHN0cm9uZz57eyBhdmVyYWdlVGltZSB9fTwvc3Ryb25nPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPEJhckNoYXJ0IDpjb21wbGV0ZWRMaXN0cz1cImNvbXBsZXRlZExpc3RzXCIgLz5cclxuICAgICAgPFBpZUNoYXJ0IC8+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxFbXB0eVN0YXRlIHYtZWxzZSA6aW1hZ2U9XCJpbWFnZVwiIDp0aXRsZT1cInRpdGxlXCIgOm1lc3NhZ2U9XCJtZXNzYWdlXCI+XHJcbiAgICA8L0VtcHR5U3RhdGU+XHJcbiAgPC9kaXY+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG5pbXBvcnQgeyB1c2VVc2VyU3RvcmUgfSBmcm9tIFwiLi4vc3RvcmVzL1VzZXJTdG9yZVwiO1xyXG5pbXBvcnQgeyB1c2VEYXNoSGVhZGVyU3RvcmUgfSBmcm9tIFwic3JjL3N0b3Jlcy9kYXNoLWhlYWRlclwiO1xyXG5pbXBvcnQgUGllQ2hhcnQgZnJvbSBcInNyYy9jb21wb25lbnRzL2N1c3RvbWVyL1BpZUNoYXJ0LnZ1ZVwiO1xyXG5pbXBvcnQgQmFyQ2hhcnQgZnJvbSBcInNyYy9jb21wb25lbnRzL2N1c3RvbWVyL0JhckNoYXJ0LnZ1ZVwiO1xyXG5pbXBvcnQgRW1wdHlTdGF0ZSBmcm9tIFwic3JjL2NvbXBvbmVudHMvY3VzdG9tZXIvRW1wdHlTdGF0ZS52dWVcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBuYW1lOiBcIkluc2lnaHRzUGFnZVwiLFxyXG4gIGNvbXBvbmVudHM6IHsgUGllQ2hhcnQsIEJhckNoYXJ0LCBFbXB0eVN0YXRlIH0sXHJcbiAgZGF0YSgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGltYWdlOiBcIkVtcHR5U3RhdGUuc3ZnXCIsXHJcbiAgICAgIHRpdGxlOiBcIk9vb3BzISBZb3UgYXJlIG5vdCBsb2dnZWQgaW4hXCIsXHJcbiAgICAgIG1lc3NhZ2U6IFwiTG9nIGluIHRvIHZpZXcgeW91ciBpbnNpZ2h0c1wiLFxyXG4gICAgICBsaXN0czogW10sXHJcbiAgICAgIGNvbXBsZXRlZExpc3RzOiBbXSxcclxuICAgICAgdGltZVNwZW50QXJyYXk6IFtdLFxyXG4gICAgICBhdmVyYWdlVGltZTogbnVsbCxcclxuICAgIH07XHJcbiAgfSxcclxuICBhc3luYyBtb3VudGVkKCkge1xyXG4gICAgY29uc3QgZGFzaEhlYWRlciA9IHVzZURhc2hIZWFkZXJTdG9yZSgpO1xyXG4gICAgZGFzaEhlYWRlci4kcGF0Y2goe1xyXG4gICAgICB0aXRsZTogXCJJbnNpZ2h0c1wiLFxyXG4gICAgICBzaG93QmFja0ljb246IGZhbHNlLFxyXG4gICAgfSk7XHJcbiAgICBpZiAodGhpcy51c2VyU3RvcmUuYXV0aFVzZXIpIHtcclxuICAgICAgYXdhaXQgdGhpcy5mZXRjaFNob3BwaW5nTGlzdHMoKTtcclxuICAgIH1cclxuICB9LFxyXG4gIHNldHVwKCkge1xyXG4gICAgY29uc3QgdXNlclN0b3JlID0gdXNlVXNlclN0b3JlKCk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB1c2VyU3RvcmUsXHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgbWV0aG9kczoge1xyXG4gICAgYXN5bmMgZmV0Y2hTaG9wcGluZ0xpc3RzKCkge1xyXG4gICAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLiRhcGkuZ2V0KFwiL3Nob3BwaW5nLWxpc3RzL2dldC1zaG9wcGluZy1saXN0c1wiKTtcclxuICAgICAgdGhpcy5saXN0cyA9IHJlcy5kYXRhLnNob3BwaW5nTGlzdHM7XHJcbiAgICAgIHRoaXMuY29tcGxldGVkTGlzdHMgPSB0aGlzLmxpc3RzLmZpbHRlcihcclxuICAgICAgICAobGlzdCkgPT4gbGlzdC5zdGF0dXMgPT09IFwiY29tcGxldGVkXCJcclxuICAgICAgKTtcclxuICAgICAgbGV0IHRvdGFsVGltZSA9IDA7XHJcbiAgICAgIHRoaXMuY29tcGxldGVkTGlzdHMuZm9yRWFjaChcclxuICAgICAgICAobGlzdCkgPT4gKHRvdGFsVGltZSA9IHRvdGFsVGltZSArIChsaXN0LnRpbWVFbmRlZCAtIGxpc3QudGltZVN0YXJ0ZWQpKVxyXG4gICAgICApO1xyXG5cclxuICAgICAgbGV0IGF2Z1RpbWUgPSB0b3RhbFRpbWUgLyB0aGlzLmNvbXBsZXRlZExpc3RzLmxlbmd0aDtcclxuXHJcbiAgICAgIGxldCBob3VycyA9IG5ldyBEYXRlKGF2Z1RpbWUpLmdldFVUQ0hvdXJzKCk7XHJcbiAgICAgIGxldCBtaW51dGVzID0gbmV3IERhdGUoYXZnVGltZSkuZ2V0VVRDTWludXRlcygpO1xyXG4gICAgICBsZXQgc2Vjb25kcyA9IG5ldyBEYXRlKGF2Z1RpbWUpLmdldFVUQ1NlY29uZHMoKTtcclxuICAgICAgaWYgKHNlY29uZHMgPiAzMCkgbWludXRlcysrO1xyXG4gICAgICB0aGlzLmF2ZXJhZ2VUaW1lID0gaG91cnMgPyBob3VycyArIFwiIGhvdXJzIFwiIDogXCJcIiArIG1pbnV0ZXMgKyBcIiBtaW51dGVzXCI7XHJcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuYXZlcmFnZVRpbWUpO1xyXG4gICAgfSxcclxuICAgIGNhbGN1bGF0ZVRpbWVTcGVudFNob3BwaW5nKGxpc3QpIHtcclxuICAgICAgaWYgKGxpc3Quc3RhdHVzID09PSBcImNvbXBsZXRlZFwiKSB7XHJcbiAgICAgICAgY29uc3QgdGltZSA9IGxpc3QudGltZUVuZGVkIC0gbGlzdC50aW1lU3RhcnRlZDtcclxuICAgICAgICBsZXQgaG91cnMgPSBuZXcgRGF0ZSh0aW1lKS5nZXRVVENIb3VycygpO1xyXG4gICAgICAgIGxldCBtaW51dGVzID0gbmV3IERhdGUodGltZSkuZ2V0VVRDTWludXRlcygpO1xyXG4gICAgICAgIGxldCBzZWNvbmRzID0gbmV3IERhdGUodGltZSkuZ2V0VVRDU2Vjb25kcygpO1xyXG4gICAgICAgIGlmIChzZWNvbmRzID4gMzApIG1pbnV0ZXMrKztcclxuICAgICAgICByZXR1cm4gaG91cnMgPyBob3VycyArIFwiIGhvdXJzIFwiIDogXCJcIiArIG1pbnV0ZXMgKyBcIiBtaW51dGVzXCI7XHJcbiAgICAgIH0gZWxzZSByZXR1cm4gbnVsbDtcclxuICAgIH0sXHJcbiAgfSxcclxufTtcclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGUgc2NvcGVkPlxyXG4uaW5zaWdodHMtcGFnZSB7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG4gIG92ZXJmbG93LXk6IHNjcm9sbDtcclxufVxyXG4uaW5zaWdodHMtcGFnZS10aXRsZSB7XHJcbiAgbWFyZ2luOiA4cHggMjBweDtcclxufVxyXG48L3N0eWxlPlxyXG4iXSwibmFtZXMiOlsiX3NmY19tYWluIiwiX29wZW5CbG9jayIsIl9jcmVhdGVFbGVtZW50QmxvY2siLCJfaG9pc3RlZF8xIiwiX2NyZWF0ZVZOb2RlIiwiX2NyZWF0ZUJsb2NrIiwiX2NyZWF0ZUVsZW1lbnRWTm9kZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBWUEsTUFBS0EsY0FBVTtBQUFBLEVBQ2IsTUFBTTtBQUFBLEVBQ04sVUFBVTtBQUFBLElBQ1IsU0FBUztBQUNQLFVBQUksS0FBSyxpQkFBaUI7QUFDeEIsZUFBTyxPQUFPLE9BQU8sS0FBSyxlQUFlO0FBQUEsTUFDM0M7QUFDQSxhQUFPO0lBQ1I7QUFBQSxJQUVELGVBQWU7QUFDYixVQUFJLEtBQUssaUJBQWlCO0FBQ3hCLGVBQU87QUFBQSxVQUNMLE9BQU87QUFBQSxZQUNMLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxVQUNQO0FBQUEsVUFDRCxRQUFRLE9BQU8sS0FBSyxLQUFLLGVBQWU7QUFBQSxVQUN4QyxZQUFZO0FBQUEsWUFDVjtBQUFBLGNBQ0UsWUFBWTtBQUFBLGNBQ1osU0FBUztBQUFBLGdCQUNQLE9BQU87QUFBQSxrQkFDTCxPQUFPO0FBQUEsZ0JBQ1I7QUFBQSxnQkFDRCxRQUFRO0FBQUEsa0JBQ04sVUFBVTtBQUFBLGdCQUNYO0FBQUEsY0FDRjtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUE7TUFFTDtBQUNBLGFBQU87QUFBQSxJQUNSO0FBQUEsRUFDRjtBQUFBLEVBQ0QsT0FBTztBQUNMLFdBQU87QUFBQSxNQUNMLGlCQUFpQjtBQUFBO0VBRXBCO0FBQUEsRUFDRCxNQUFNLFVBQVU7QUFDZCxVQUFNLE1BQU0sTUFBTSxLQUFLLEtBQUssSUFBSSx5Q0FBeUM7QUFDekUsU0FBSyxrQkFBa0IsSUFBSSxLQUFLLEtBQUs7QUFBQSxFQUN0QztBQUNIOzs7RUF4RE8sSUFBRzs7OztTQUFjLE1BQWUsbUJBQXJDQyxhQUFBQyxtQkFPTSxPQVBOQyxjQU9NO0FBQUEsSUFOSkMsWUFLYSxzQkFBQTtBQUFBLE1BSlgsTUFBSztBQUFBLE1BQ0wsT0FBTTtBQUFBLE1BQ0wsU0FBUyxTQUFZO0FBQUEsTUFDckIsUUFB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
