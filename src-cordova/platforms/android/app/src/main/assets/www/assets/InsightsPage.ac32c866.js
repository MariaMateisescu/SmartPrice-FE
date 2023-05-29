import { _ as _export_sfc, aL as resolveComponent, o as openBlock, c as createElementBlock, aa as createVNode, a3 as createCommentVNode, a2 as createBlock, c6 as useQuasar, bB as useDashHeaderStore, bA as useUserStore, a as createBaseVNode, a9 as createTextVNode, M as toDisplayString, aH as pushScopeId, aF as popScopeId } from "./index.0ce84b9b.js";
import { E as EmptyState } from "./EmptyState.d30d7522.js";
import { E as EmptyData } from "./EmptyData.56f5e511.js";
import "./QDialog.27e255cd.js";
import "./use-timeout.0140a5e1.js";
import "./ClosePopup.fcd43a0a.js";
import "./focus-manager.d6507951.js";
import "./QCard.511536db.js";
import "./use-dark.089fd8b8.js";
import "./QInput.4104ffc2.js";
import "./uid.42677368.js";
import "./use-form.e754bc19.js";
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
  components: { PieChart, BarChart, EmptyState, EmptyData },
  data() {
    return {
      image: "EmptyState.svg",
      title: "Ooops! You are not logged in!",
      message: "Log in to view your insights",
      imageEmptyData: "Void.svg",
      titleEmptyData: "Ooops! Nothing to show",
      messageEmptyData: "Complete lists view your insights",
      lists: [],
      completedLists: [],
      timeSpentArray: [],
      averageTime: null,
      $q: useQuasar()
    };
  },
  async mounted() {
    const dashHeader = useDashHeaderStore();
    dashHeader.$patch({
      title: "Insights",
      showBackIcon: false
    });
    try {
      if (this.userStore.authUser) {
        await this.fetchShoppingLists();
      }
    } catch (err) {
      this.$q.notify({
        type: "negative",
        position: "top",
        message: "Something went wrong!",
        color: "negative",
        timeout: "2500"
      });
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
const _withScopeId = (n) => (pushScopeId("data-v-166e696d"), n = n(), popScopeId(), n);
const _hoisted_1 = { class: "insights-page" };
const _hoisted_2 = { key: 0 };
const _hoisted_3 = { class: "insights-page-title" };
const _hoisted_4 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-h6" }, "See your shopping behaviour", -1));
const _hoisted_5 = { key: 0 };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_BarChart = resolveComponent("BarChart");
  const _component_PieChart = resolveComponent("PieChart");
  const _component_EmptyState = resolveComponent("EmptyState");
  const _component_EmptyData = resolveComponent("EmptyData");
  return openBlock(), createElementBlock("div", _hoisted_1, [
    $setup.userStore.authUser ? (openBlock(), createElementBlock("div", _hoisted_2, [
      createBaseVNode("div", _hoisted_3, [
        _hoisted_4,
        $data.completedLists.length ? (openBlock(), createElementBlock("div", _hoisted_5, [
          createTextVNode(" Average time spent shopping: "),
          createBaseVNode("strong", null, toDisplayString($data.averageTime), 1)
        ])) : createCommentVNode("", true)
      ]),
      $data.completedLists.length ? (openBlock(), createBlock(_component_BarChart, {
        key: 0,
        completedLists: $data.completedLists
      }, null, 8, ["completedLists"])) : createCommentVNode("", true),
      $data.completedLists.length ? (openBlock(), createBlock(_component_PieChart, { key: 1 })) : createCommentVNode("", true)
    ])) : (openBlock(), createBlock(_component_EmptyState, {
      key: 1,
      image: $data.image,
      title: $data.title,
      message: $data.message
    }, null, 8, ["image", "title", "message"])),
    $setup.userStore.authUser && !$data.completedLists.length ? (openBlock(), createBlock(_component_EmptyData, {
      key: 2,
      image: $data.imageEmptyData,
      title: $data.titleEmptyData,
      message: $data.messageEmptyData
    }, null, 8, ["image", "title", "message"])) : createCommentVNode("", true)
  ]);
}
var InsightsPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-166e696d"], ["__file", "InsightsPage.vue"]]);
export { InsightsPage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5zaWdodHNQYWdlLmFjMzJjODY2LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9jdXN0b21lci9QaWVDaGFydC52dWUiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9jdXN0b21lci9CYXJDaGFydC52dWUiLCIuLi8uLi8uLi9zcmMvcGFnZXMvSW5zaWdodHNQYWdlLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XHJcbiAgPGRpdiBpZD1cImNoYXJ0XCIgdi1pZj1cImNhdGVnb3J5RnJlcVN1bVwiPlxyXG4gICAgPGFwZXhjaGFydFxyXG4gICAgICB0eXBlPVwicGllXCJcclxuICAgICAgd2lkdGg9XCI1MDBcIlxyXG4gICAgICA6b3B0aW9ucz1cImNoYXJ0T3B0aW9uc1wiXHJcbiAgICAgIDpzZXJpZXM9XCJzZXJpZXNcIlxyXG4gICAgPjwvYXBleGNoYXJ0PlxyXG4gIDwvZGl2PlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIG5hbWU6IFwiUGllQ2hhcnRcIixcclxuICBjb21wdXRlZDoge1xyXG4gICAgc2VyaWVzKCkge1xyXG4gICAgICBpZiAodGhpcy5jYXRlZ29yeUZyZXFTdW0pIHtcclxuICAgICAgICByZXR1cm4gT2JqZWN0LnZhbHVlcyh0aGlzLmNhdGVnb3J5RnJlcVN1bSk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfSxcclxuXHJcbiAgICBjaGFydE9wdGlvbnMoKSB7XHJcbiAgICAgIGlmICh0aGlzLmNhdGVnb3J5RnJlcVN1bSkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICBjaGFydDoge1xyXG4gICAgICAgICAgICB3aWR0aDogMzgwLFxyXG4gICAgICAgICAgICB0eXBlOiBcInBpZVwiLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGxhYmVsczogT2JqZWN0LmtleXModGhpcy5jYXRlZ29yeUZyZXFTdW0pLFxyXG4gICAgICAgICAgcmVzcG9uc2l2ZTogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDgwLFxyXG4gICAgICAgICAgICAgIG9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgIGNoYXJ0OiB7XHJcbiAgICAgICAgICAgICAgICAgIHdpZHRoOiBcIjEwMCVcIixcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBsZWdlbmQ6IHtcclxuICAgICAgICAgICAgICAgICAgcG9zaXRpb246IFwiYm90dG9tXCIsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICBdLFxyXG4gICAgICAgIH07XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgZGF0YSgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGNhdGVnb3J5RnJlcVN1bTogbnVsbCxcclxuICAgIH07XHJcbiAgfSxcclxuICBhc3luYyBtb3VudGVkKCkge1xyXG4gICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy4kYXBpLmdldChcIi9zaG9wcGluZy1saXN0cy9nZXQtY2F0ZWdvcnktc3RhdGlzdGljc1wiKTtcclxuICAgIHRoaXMuY2F0ZWdvcnlGcmVxU3VtID0gcmVzLmRhdGEuZGF0YS5jb21wcmVzc2VkQ2F0ZWdvcnlGcmVxU3VtO1xyXG4gIH0sXHJcbn07XHJcbjwvc2NyaXB0PlxyXG5cclxuPHN0eWxlIHNjb3BlZD5cclxuI2NoYXJ0IHtcclxuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xyXG59XHJcbiogPj4+IHNwYW4uYXBleGNoYXJ0cy1sZWdlbmQtdGV4dCB7XHJcbiAgY29sb3I6ICMyNmE2OWEgIWltcG9ydGFudDtcclxufVxyXG48L3N0eWxlPlxyXG4iLCI8dGVtcGxhdGU+XHJcbiAgPCEtLSA8ZGl2PiAtLT5cclxuICA8IS0tIDxkaXY+e3sgY2FsY3VsYXRlZFRpbWVTcGVudCB9fTwvZGl2PlxyXG4gICAgPGRpdj57eyBjYWxjdWxhdGVkRGF0ZXMgfX08L2Rpdj4gLS0+XHJcbiAgPGFwZXhjaGFydFxyXG4gICAgdHlwZT1cImJhclwiXHJcbiAgICBjbGFzcz1cImFwZXgtY2hhcnQtdGltZVwiXHJcbiAgICBoZWlnaHQ9XCIzMDBcIlxyXG4gICAgd2lkdGg9XCI5MCVcIlxyXG4gICAgOm9wdGlvbnM9XCJjaGFydE9wdGlvbnNcIlxyXG4gICAgOnNlcmllcz1cInNlcmllc1wiXHJcbiAgPjwvYXBleGNoYXJ0PlxyXG4gIDwhLS0gPC9kaXY+IC0tPlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIG5hbWU6IFwiQmFyQ2hhcnRcIixcclxuICBwcm9wczogW1wiY29tcGxldGVkTGlzdHNcIl0sXHJcbiAgY29tcHV0ZWQ6IHtcclxuICAgIGNhbGN1bGF0ZWRUaW1lU3BlbnQoKSB7XHJcbiAgICAgIGxldCB0aW1lU3BlbnRBcnJheSA9IFtdO1xyXG4gICAgICBsZXQgdGltZSA9IDA7XHJcbiAgICAgIHRoaXMuY29tcGxldGVkTGlzdHMuZm9yRWFjaCgobGlzdCkgPT4ge1xyXG4gICAgICAgIHRpbWUgPSBsaXN0LnRpbWVFbmRlZCAtIGxpc3QudGltZVN0YXJ0ZWQ7XHJcbiAgICAgICAgbGV0IGhvdXJzID0gbmV3IERhdGUodGltZSkuZ2V0VVRDSG91cnMoKTtcclxuICAgICAgICBsZXQgbWludXRlcyA9IG5ldyBEYXRlKHRpbWUpLmdldFVUQ01pbnV0ZXMoKTtcclxuICAgICAgICBsZXQgc2Vjb25kcyA9IG5ldyBEYXRlKHRpbWUpLmdldFVUQ1NlY29uZHMoKTtcclxuICAgICAgICBpZiAoc2Vjb25kcyA+IDMwKSBtaW51dGVzKys7XHJcbiAgICAgICAgdGltZVNwZW50QXJyYXkucHVzaChob3VycyA/IGhvdXJzICogNjAgKyBtaW51dGVzIDogbWludXRlcyk7XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gdGltZVNwZW50QXJyYXk7XHJcbiAgICB9LFxyXG5cclxuICAgIGNhbGN1bGF0ZWREYXRlcygpIHtcclxuICAgICAgbGV0IGRhdGVzQXJyYXkgPSBbXTtcclxuICAgICAgdGhpcy5jb21wbGV0ZWRMaXN0cy5mb3JFYWNoKChsaXN0KSA9PiB7XHJcbiAgICAgICAgZGF0ZXNBcnJheS5wdXNoKG5ldyBEYXRlKGxpc3QudGltZUVuZGVkKS50b0xvY2FsZURhdGVTdHJpbmcoXCJmci1GUlwiKSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gZGF0ZXNBcnJheTtcclxuICAgIH0sXHJcblxyXG4gICAgc2VyaWVzKCkge1xyXG4gICAgICByZXR1cm4gW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIG5hbWU6IFwiVGltZSBzcGVudFwiLFxyXG4gICAgICAgICAgZGF0YTogdGhpcy5jYWxjdWxhdGVkVGltZVNwZW50LFxyXG4gICAgICAgIH0sXHJcbiAgICAgIF07XHJcbiAgICB9LFxyXG5cclxuICAgIGNoYXJ0T3B0aW9ucygpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBjaGFydDoge1xyXG4gICAgICAgICAgaGVpZ2h0OiAzNTAsXHJcbiAgICAgICAgICB0eXBlOiBcImJhclwiLFxyXG4gICAgICAgICAgLy8gdG9vbGJhcjoge1xyXG4gICAgICAgICAgLy8gICBzaG93OiBmYWxzZSxcclxuICAgICAgICAgIC8vIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb2xvcnM6IFtcIiMyNmE2OWFcIl0sXHJcbiAgICAgICAgZXZlbnRzOiBbXCJtb3VzZW1vdmVcIiwgXCJtb3VzZW91dFwiLCBcImNsaWNrXCJdLFxyXG4gICAgICAgIHBsb3RPcHRpb25zOiB7XHJcbiAgICAgICAgICBiYXI6IHtcclxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAyLFxyXG4gICAgICAgICAgICBkYXRhTGFiZWxzOiB7XHJcbiAgICAgICAgICAgICAgcG9zaXRpb246IFwidG9wXCIsIC8vIHRvcCwgY2VudGVyLCBib3R0b21cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBkYXRhTGFiZWxzOiB7XHJcbiAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgZm9ybWF0dGVyOiBmdW5jdGlvbiAodmFsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWwgPj0gNjBcclxuICAgICAgICAgICAgICA/IGAke01hdGguZmxvb3IodmFsIC8gNjApfWggYCArICh2YWwgJSA2MCkgKyBcIidcIlxyXG4gICAgICAgICAgICAgIDogdmFsICsgXCInXCI7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgb2Zmc2V0WTogLTIwLFxyXG4gICAgICAgICAgc3R5bGU6IHtcclxuICAgICAgICAgICAgZm9udFNpemU6IFwiMTJweFwiLFxyXG4gICAgICAgICAgICBjb2xvcnM6IFtcIiMyNmE2OWFcIl0sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHhheGlzOiB7XHJcbiAgICAgICAgICByYW5nZTogOCxcclxuICAgICAgICAgIGNhdGVnb3JpZXM6IHRoaXMuY2FsY3VsYXRlZERhdGVzLFxyXG4gICAgICAgICAgcG9zaXRpb246IFwiYm90dG9tXCIsXHJcbiAgICAgICAgICBheGlzQm9yZGVyOiB7XHJcbiAgICAgICAgICAgIHNob3c6IGZhbHNlLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGF4aXNUaWNrczoge1xyXG4gICAgICAgICAgICBzaG93OiB0cnVlLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHRpY2tQbGFjZW1lbnQ6IFwib25cIixcclxuICAgICAgICAgIHRpY2tBbW91bnQ6IDgsXHJcbiAgICAgICAgICBjcm9zc2hhaXJzOiB7XHJcbiAgICAgICAgICAgIGZpbGw6IHtcclxuICAgICAgICAgICAgICB0eXBlOiBcImdyYWRpZW50XCIsXHJcbiAgICAgICAgICAgICAgZ3JhZGllbnQ6IHtcclxuICAgICAgICAgICAgICAgIGNvbG9yRnJvbTogXCIjRDhFM0YwXCIsXHJcbiAgICAgICAgICAgICAgICBjb2xvclRvOiBcIiNCRUQxRTZcIixcclxuICAgICAgICAgICAgICAgIHN0b3BzOiBbMCwgMTAwXSxcclxuICAgICAgICAgICAgICAgIG9wYWNpdHlGcm9tOiAwLjQsXHJcbiAgICAgICAgICAgICAgICBvcGFjaXR5VG86IDAuNSxcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHRvb2x0aXA6IHtcclxuICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgeWF4aXM6IHtcclxuICAgICAgICAgIGF4aXNCb3JkZXI6IHtcclxuICAgICAgICAgICAgc2hvdzogZmFsc2UsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgYXhpc1RpY2tzOiB7XHJcbiAgICAgICAgICAgIHNob3c6IGZhbHNlLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGxhYmVsczoge1xyXG4gICAgICAgICAgICBzaG93OiBmYWxzZSxcclxuICAgICAgICAgICAgZm9ybWF0dGVyOiBmdW5jdGlvbiAodmFsKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHZhbCA+PSA2MFxyXG4gICAgICAgICAgICAgICAgPyBgJHtNYXRoLmZsb29yKHZhbCAvIDYwKX1oIGAgKyAodmFsICUgNjApICsgXCInXCJcclxuICAgICAgICAgICAgICAgIDogdmFsICsgXCInXCI7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdGl0bGU6IHtcclxuICAgICAgICAgIHRleHQ6IFwiVGltZSBTcGVudCBTaG9wcGluZ1wiLFxyXG4gICAgICAgICAgZmxvYXRpbmc6IHRydWUsXHJcbiAgICAgICAgICBvZmZzZXRZOiAzMzAsXHJcbiAgICAgICAgICBhbGlnbjogXCJjZW50ZXJcIixcclxuICAgICAgICAgIHN0eWxlOiB7XHJcbiAgICAgICAgICAgIGNvbG9yOiBcIiM0NDRcIixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgfTtcclxuICAgIH0sXHJcbiAgfSxcclxufTtcclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGUgc2NvcGVkPlxyXG4uYXBleC1jaGFydC10aW1lIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG59XHJcbiogPj4+IHRzcGFuIHtcclxuICBmaWxsOiAjMjZhNjlhO1xyXG59XHJcbjwvc3R5bGU+XHJcbiIsIjx0ZW1wbGF0ZT5cclxuICA8ZGl2IGNsYXNzPVwiaW5zaWdodHMtcGFnZVwiPlxyXG4gICAgPGRpdiB2LWlmPVwidXNlclN0b3JlLmF1dGhVc2VyXCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJpbnNpZ2h0cy1wYWdlLXRpdGxlXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDZcIj5TZWUgeW91ciBzaG9wcGluZyBiZWhhdmlvdXI8L2Rpdj5cclxuICAgICAgICA8ZGl2IHYtaWY9XCJjb21wbGV0ZWRMaXN0cy5sZW5ndGhcIj5cclxuICAgICAgICAgIEF2ZXJhZ2UgdGltZSBzcGVudCBzaG9wcGluZzpcclxuICAgICAgICAgIDxzdHJvbmc+e3sgYXZlcmFnZVRpbWUgfX08L3N0cm9uZz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxCYXJDaGFydCB2LWlmPVwiY29tcGxldGVkTGlzdHMubGVuZ3RoXCIgOmNvbXBsZXRlZExpc3RzPVwiY29tcGxldGVkTGlzdHNcIiAvPlxyXG4gICAgICA8UGllQ2hhcnQgdi1pZj1cImNvbXBsZXRlZExpc3RzLmxlbmd0aFwiIC8+XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgICA8RW1wdHlTdGF0ZSB2LWVsc2UgOmltYWdlPVwiaW1hZ2VcIiA6dGl0bGU9XCJ0aXRsZVwiIDptZXNzYWdlPVwibWVzc2FnZVwiPlxyXG4gICAgPC9FbXB0eVN0YXRlPlxyXG4gICAgPEVtcHR5RGF0YVxyXG4gICAgICB2LWlmPVwidXNlclN0b3JlLmF1dGhVc2VyICYmICFjb21wbGV0ZWRMaXN0cy5sZW5ndGhcIlxyXG4gICAgICA6aW1hZ2U9XCJpbWFnZUVtcHR5RGF0YVwiXHJcbiAgICAgIDp0aXRsZT1cInRpdGxlRW1wdHlEYXRhXCJcclxuICAgICAgOm1lc3NhZ2U9XCJtZXNzYWdlRW1wdHlEYXRhXCJcclxuICAgID48L0VtcHR5RGF0YT5cclxuICA8L2Rpdj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcbmltcG9ydCB7IHVzZVVzZXJTdG9yZSB9IGZyb20gXCIuLi9zdG9yZXMvVXNlclN0b3JlXCI7XHJcbmltcG9ydCB7IHVzZURhc2hIZWFkZXJTdG9yZSB9IGZyb20gXCJzcmMvc3RvcmVzL2Rhc2gtaGVhZGVyXCI7XHJcbmltcG9ydCB1c2VRdWFzYXIgZnJvbSBcInF1YXNhci9zcmMvY29tcG9zYWJsZXMvdXNlLXF1YXNhci5qc1wiO1xyXG5pbXBvcnQgUGllQ2hhcnQgZnJvbSBcInNyYy9jb21wb25lbnRzL2N1c3RvbWVyL1BpZUNoYXJ0LnZ1ZVwiO1xyXG5pbXBvcnQgQmFyQ2hhcnQgZnJvbSBcInNyYy9jb21wb25lbnRzL2N1c3RvbWVyL0JhckNoYXJ0LnZ1ZVwiO1xyXG5pbXBvcnQgRW1wdHlTdGF0ZSBmcm9tIFwic3JjL2NvbXBvbmVudHMvY3VzdG9tZXIvRW1wdHlTdGF0ZS52dWVcIjtcclxuaW1wb3J0IEVtcHR5RGF0YSBmcm9tIFwic3JjL2NvbXBvbmVudHMvY3VzdG9tZXIvRW1wdHlEYXRhLnZ1ZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIG5hbWU6IFwiSW5zaWdodHNQYWdlXCIsXHJcbiAgY29tcG9uZW50czogeyBQaWVDaGFydCwgQmFyQ2hhcnQsIEVtcHR5U3RhdGUsIEVtcHR5RGF0YSB9LFxyXG4gIGRhdGEoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBpbWFnZTogXCJFbXB0eVN0YXRlLnN2Z1wiLFxyXG4gICAgICB0aXRsZTogXCJPb29wcyEgWW91IGFyZSBub3QgbG9nZ2VkIGluIVwiLFxyXG4gICAgICBtZXNzYWdlOiBcIkxvZyBpbiB0byB2aWV3IHlvdXIgaW5zaWdodHNcIixcclxuICAgICAgaW1hZ2VFbXB0eURhdGE6IFwiVm9pZC5zdmdcIixcclxuICAgICAgdGl0bGVFbXB0eURhdGE6IFwiT29vcHMhIE5vdGhpbmcgdG8gc2hvd1wiLFxyXG4gICAgICBtZXNzYWdlRW1wdHlEYXRhOiBcIkNvbXBsZXRlIGxpc3RzIHZpZXcgeW91ciBpbnNpZ2h0c1wiLFxyXG4gICAgICBsaXN0czogW10sXHJcbiAgICAgIGNvbXBsZXRlZExpc3RzOiBbXSxcclxuICAgICAgdGltZVNwZW50QXJyYXk6IFtdLFxyXG4gICAgICBhdmVyYWdlVGltZTogbnVsbCxcclxuICAgICAgJHE6IHVzZVF1YXNhcigpLFxyXG4gICAgfTtcclxuICB9LFxyXG4gIGFzeW5jIG1vdW50ZWQoKSB7XHJcbiAgICBjb25zdCBkYXNoSGVhZGVyID0gdXNlRGFzaEhlYWRlclN0b3JlKCk7XHJcbiAgICBkYXNoSGVhZGVyLiRwYXRjaCh7XHJcbiAgICAgIHRpdGxlOiBcIkluc2lnaHRzXCIsXHJcbiAgICAgIHNob3dCYWNrSWNvbjogZmFsc2UsXHJcbiAgICB9KTtcclxuICAgIHRyeSB7XHJcbiAgICAgIGlmICh0aGlzLnVzZXJTdG9yZS5hdXRoVXNlcikge1xyXG4gICAgICAgIGF3YWl0IHRoaXMuZmV0Y2hTaG9wcGluZ0xpc3RzKCk7XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICB0aGlzLiRxLm5vdGlmeSh7XHJcbiAgICAgICAgdHlwZTogXCJuZWdhdGl2ZVwiLFxyXG4gICAgICAgIHBvc2l0aW9uOiBcInRvcFwiLFxyXG4gICAgICAgIG1lc3NhZ2U6IFwiU29tZXRoaW5nIHdlbnQgd3JvbmchXCIsXHJcbiAgICAgICAgY29sb3I6IFwibmVnYXRpdmVcIixcclxuICAgICAgICB0aW1lb3V0OiBcIjI1MDBcIixcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBzZXR1cCgpIHtcclxuICAgIGNvbnN0IHVzZXJTdG9yZSA9IHVzZVVzZXJTdG9yZSgpO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdXNlclN0b3JlLFxyXG4gICAgfTtcclxuICB9LFxyXG4gIG1ldGhvZHM6IHtcclxuICAgIGFzeW5jIGZldGNoU2hvcHBpbmdMaXN0cygpIHtcclxuICAgICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy4kYXBpLmdldChcIi9zaG9wcGluZy1saXN0cy9nZXQtc2hvcHBpbmctbGlzdHNcIik7XHJcbiAgICAgIHRoaXMubGlzdHMgPSByZXMuZGF0YS5zaG9wcGluZ0xpc3RzO1xyXG4gICAgICB0aGlzLmNvbXBsZXRlZExpc3RzID0gdGhpcy5saXN0cy5maWx0ZXIoXHJcbiAgICAgICAgKGxpc3QpID0+IGxpc3Quc3RhdHVzID09PSBcImNvbXBsZXRlZFwiXHJcbiAgICAgICk7XHJcbiAgICAgIGxldCB0b3RhbFRpbWUgPSAwO1xyXG4gICAgICB0aGlzLmNvbXBsZXRlZExpc3RzLmZvckVhY2goXHJcbiAgICAgICAgKGxpc3QpID0+ICh0b3RhbFRpbWUgPSB0b3RhbFRpbWUgKyAobGlzdC50aW1lRW5kZWQgLSBsaXN0LnRpbWVTdGFydGVkKSlcclxuICAgICAgKTtcclxuXHJcbiAgICAgIGxldCBhdmdUaW1lID0gdG90YWxUaW1lIC8gdGhpcy5jb21wbGV0ZWRMaXN0cy5sZW5ndGg7XHJcblxyXG4gICAgICBsZXQgaG91cnMgPSBuZXcgRGF0ZShhdmdUaW1lKS5nZXRVVENIb3VycygpO1xyXG4gICAgICBsZXQgbWludXRlcyA9IG5ldyBEYXRlKGF2Z1RpbWUpLmdldFVUQ01pbnV0ZXMoKTtcclxuICAgICAgbGV0IHNlY29uZHMgPSBuZXcgRGF0ZShhdmdUaW1lKS5nZXRVVENTZWNvbmRzKCk7XHJcbiAgICAgIGlmIChzZWNvbmRzID4gMzApIG1pbnV0ZXMrKztcclxuICAgICAgdGhpcy5hdmVyYWdlVGltZSA9IGhvdXJzID8gaG91cnMgKyBcIiBob3VycyBcIiA6IFwiXCIgKyBtaW51dGVzICsgXCIgbWludXRlc1wiO1xyXG4gICAgfSxcclxuICAgIGNhbGN1bGF0ZVRpbWVTcGVudFNob3BwaW5nKGxpc3QpIHtcclxuICAgICAgaWYgKGxpc3Quc3RhdHVzID09PSBcImNvbXBsZXRlZFwiKSB7XHJcbiAgICAgICAgY29uc3QgdGltZSA9IGxpc3QudGltZUVuZGVkIC0gbGlzdC50aW1lU3RhcnRlZDtcclxuICAgICAgICBsZXQgaG91cnMgPSBuZXcgRGF0ZSh0aW1lKS5nZXRVVENIb3VycygpO1xyXG4gICAgICAgIGxldCBtaW51dGVzID0gbmV3IERhdGUodGltZSkuZ2V0VVRDTWludXRlcygpO1xyXG4gICAgICAgIGxldCBzZWNvbmRzID0gbmV3IERhdGUodGltZSkuZ2V0VVRDU2Vjb25kcygpO1xyXG4gICAgICAgIGlmIChzZWNvbmRzID4gMzApIG1pbnV0ZXMrKztcclxuICAgICAgICByZXR1cm4gaG91cnMgPyBob3VycyArIFwiIGhvdXJzIFwiIDogXCJcIiArIG1pbnV0ZXMgKyBcIiBtaW51dGVzXCI7XHJcbiAgICAgIH0gZWxzZSByZXR1cm4gbnVsbDtcclxuICAgIH0sXHJcbiAgfSxcclxufTtcclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGUgc2NvcGVkPlxyXG4uaW5zaWdodHMtcGFnZSB7XHJcbiAgLyogaGVpZ2h0OiAxMDAlOyAqL1xyXG4gIC8qIG92ZXJmbG93LXk6IHNjcm9sbDsgKi9cclxufVxyXG4uaW5zaWdodHMtcGFnZS10aXRsZSB7XHJcbiAgbWFyZ2luOiA4cHggMjBweDtcclxufVxyXG48L3N0eWxlPlxyXG4iXSwibmFtZXMiOlsiX3NmY19tYWluIiwiX29wZW5CbG9jayIsIl9jcmVhdGVFbGVtZW50QmxvY2siLCJfaG9pc3RlZF8xIiwiX2NyZWF0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
