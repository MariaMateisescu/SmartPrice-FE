import { _ as _export_sfc, bB as useDashHeaderStore, o as openBlock, c as createElementBlock, a as createBaseVNode } from "./index.404ce4fc.js";
const _sfc_main = {
  name: "CategorisedProductsPage",
  components: {},
  data() {
    return {
      name: null
    };
  },
  async mounted() {
    const res = await this.$api.get(
      `/categories/${this.$route.params.categoryId}`
    );
    const dashHeader = useDashHeaderStore();
    dashHeader.$patch({
      title: res.data.data.category.name,
      showBackIcon: true
    });
  }
};
const _hoisted_1 = /* @__PURE__ */ createBaseVNode("div", { class: "product-card__list" }, " asdfghjk ", -1);
const _hoisted_2 = [
  _hoisted_1
];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, _hoisted_2);
}
var CategorisedProductsPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "CategorisedProductsPage.vue"]]);
export { CategorisedProductsPage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2F0ZWdvcmlzZWRQcm9kdWN0c1BhZ2UuMmYzN2Y1NDUuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYWdlcy9DYXRlZ29yaXNlZFByb2R1Y3RzUGFnZS52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxyXG4gIDxkaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwicHJvZHVjdC1jYXJkX19saXN0XCI+XHJcbiAgICAgIDwhLS0gPFByb2R1Y3RDYXJkXHJcbiAgICAgICAgdi1mb3I9XCJwcm9kdWN0IGluIGxvY2F0aW9uLnByb2R1Y3RzTGlzdFwiXHJcbiAgICAgICAgOmtleT1cInByb2R1Y3QuX2lkXCJcclxuICAgICAgICA6cHJvZHVjdEluZm89XCJwcm9kdWN0XCJcclxuICAgICAgICBAZWRpdFByb2R1Y3RTdWNjZXNzPVwiZmV0Y2hMb2NhdGlvblwiXHJcbiAgICAgICAgQGRlbGV0ZVByb2R1Y3RTdWNjZXNzPVwiZmV0Y2hMb2NhdGlvblwiXHJcbiAgICAgIC8+IC0tPlxyXG4gICAgICBhc2RmZ2hqa1xyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG4vLyBpbXBvcnQgUHJvZHVjdENhcmQgZnJvbSBcInNyYy9jb21wb25lbnRzL2FkbWluaXN0cmF0aW9uL1Byb2R1Y3RDYXJkLnZ1ZVwiO1xyXG5pbXBvcnQgeyB1c2VEYXNoSGVhZGVyU3RvcmUgfSBmcm9tIFwic3JjL3N0b3Jlcy9kYXNoLWhlYWRlclwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIG5hbWU6IFwiQ2F0ZWdvcmlzZWRQcm9kdWN0c1BhZ2VcIixcclxuICBjb21wb25lbnRzOiB7XHJcbiAgICAvLyBQcm9kdWN0Q2FyZCxcclxuICB9LFxyXG4gIGRhdGEoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuYW1lOiBudWxsLFxyXG4gICAgfTtcclxuICB9LFxyXG4gIGFzeW5jIG1vdW50ZWQoKSB7XHJcbiAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLiRhcGkuZ2V0KFxyXG4gICAgICBgL2NhdGVnb3JpZXMvJHt0aGlzLiRyb3V0ZS5wYXJhbXMuY2F0ZWdvcnlJZH1gXHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IGRhc2hIZWFkZXIgPSB1c2VEYXNoSGVhZGVyU3RvcmUoKTtcclxuICAgIGRhc2hIZWFkZXIuJHBhdGNoKHtcclxuICAgICAgdGl0bGU6IHJlcy5kYXRhLmRhdGEuY2F0ZWdvcnkubmFtZSxcclxuICAgICAgc2hvd0JhY2tJY29uOiB0cnVlLFxyXG4gICAgfSk7XHJcbiAgfSxcclxufTtcclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGUgc2NvcGVkPjwvc3R5bGU+XHJcbiJdLCJuYW1lcyI6WyJfY3JlYXRlRWxlbWVudFZOb2RlIiwiX2NyZWF0ZUVsZW1lbnRCbG9jayJdLCJtYXBwaW5ncyI6IjtBQW1CQSxNQUFLLFlBQVU7QUFBQSxFQUNiLE1BQU07QUFBQSxFQUNOLFlBQVksQ0FFWDtBQUFBLEVBQ0QsT0FBTztBQUNMLFdBQU87QUFBQSxNQUNMLE1BQU07QUFBQTtFQUVUO0FBQUEsRUFDRCxNQUFNLFVBQVU7QUFDZCxVQUFNLE1BQU0sTUFBTSxLQUFLLEtBQUs7QUFBQSxNQUMxQixlQUFlLEtBQUssT0FBTyxPQUFPO0FBQUE7QUFHcEMsVUFBTSxhQUFhO0FBQ25CLGVBQVcsT0FBTztBQUFBLE1BQ2hCLE9BQU8sSUFBSSxLQUFLLEtBQUssU0FBUztBQUFBLE1BQzlCLGNBQWM7QUFBQSxJQUNoQixDQUFDO0FBQUEsRUFDRjtBQUNIO0FBdENJLE1BQUEsYUFBQUEsZ0NBU00sT0FURCxFQUFBLE9BQU0sd0JBT0gsY0FFUixFQUFBOztFQVRBOzs7c0JBREZDLG1CQVdNLE9BQUEsTUFBQSxVQUFBOzs7OyJ9
