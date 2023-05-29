import { bt as createComponent, a1 as computed, ak as h, bF as hSlot, bC as QIcon } from "./index.0ce84b9b.js";
import { u as useCheckboxProps, a as useCheckboxEmits, b as useCheckbox } from "./use-checkbox.bf2f6301.js";
var QItemLabel = createComponent({
  name: "QItemLabel",
  props: {
    overline: Boolean,
    caption: Boolean,
    header: Boolean,
    lines: [Number, String]
  },
  setup(props, { slots }) {
    const parsedLines = computed(() => parseInt(props.lines, 10));
    const classes = computed(
      () => "q-item__label" + (props.overline === true ? " q-item__label--overline text-overline" : "") + (props.caption === true ? " q-item__label--caption text-caption" : "") + (props.header === true ? " q-item__label--header" : "") + (parsedLines.value === 1 ? " ellipsis" : "")
    );
    const style = computed(() => {
      return props.lines !== void 0 && parsedLines.value > 1 ? {
        overflow: "hidden",
        display: "-webkit-box",
        "-webkit-box-orient": "vertical",
        "-webkit-line-clamp": parsedLines.value
      } : null;
    });
    return () => h("div", {
      style: style.value,
      class: classes.value
    }, hSlot(slots.default));
  }
});
const bgNode = h("div", {
  key: "svg",
  class: "q-checkbox__bg absolute"
}, [
  h("svg", {
    class: "q-checkbox__svg fit absolute-full",
    viewBox: "0 0 24 24"
  }, [
    h("path", {
      class: "q-checkbox__truthy",
      fill: "none",
      d: "M1.73,12.91 8.1,19.28 22.79,4.59"
    }),
    h("path", {
      class: "q-checkbox__indet",
      d: "M4,14H20V10H4"
    })
  ])
]);
var QCheckbox = createComponent({
  name: "QCheckbox",
  props: useCheckboxProps,
  emits: useCheckboxEmits,
  setup(props) {
    function getInner(isTrue, isIndeterminate) {
      const icon = computed(
        () => (isTrue.value === true ? props.checkedIcon : isIndeterminate.value === true ? props.indeterminateIcon : props.uncheckedIcon) || null
      );
      return () => icon.value !== null ? [
        h("div", {
          key: "icon",
          class: "q-checkbox__icon-container absolute-full flex flex-center no-wrap"
        }, [
          h(QIcon, {
            class: "q-checkbox__icon",
            name: icon.value
          })
        ])
      ] : [bgNode];
    }
    return useCheckbox("checkbox", getInner);
  }
});
export { QItemLabel as Q, QCheckbox as a };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUUNoZWNrYm94LjdjY2M1OTk4LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2l0ZW0vUUl0ZW1MYWJlbC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvY2hlY2tib3gvUUNoZWNrYm94LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGgsIGNvbXB1dGVkIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGhTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9yZW5kZXIuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRSXRlbUxhYmVsJyxcblxuICBwcm9wczoge1xuICAgIG92ZXJsaW5lOiBCb29sZWFuLFxuICAgIGNhcHRpb246IEJvb2xlYW4sXG4gICAgaGVhZGVyOiBCb29sZWFuLFxuICAgIGxpbmVzOiBbIE51bWJlciwgU3RyaW5nIF1cbiAgfSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMgfSkge1xuICAgIGNvbnN0IHBhcnNlZExpbmVzID0gY29tcHV0ZWQoKCkgPT4gcGFyc2VJbnQocHJvcHMubGluZXMsIDEwKSlcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3EtaXRlbV9fbGFiZWwnXG4gICAgICArIChwcm9wcy5vdmVybGluZSA9PT0gdHJ1ZSA/ICcgcS1pdGVtX19sYWJlbC0tb3ZlcmxpbmUgdGV4dC1vdmVybGluZScgOiAnJylcbiAgICAgICsgKHByb3BzLmNhcHRpb24gPT09IHRydWUgPyAnIHEtaXRlbV9fbGFiZWwtLWNhcHRpb24gdGV4dC1jYXB0aW9uJyA6ICcnKVxuICAgICAgKyAocHJvcHMuaGVhZGVyID09PSB0cnVlID8gJyBxLWl0ZW1fX2xhYmVsLS1oZWFkZXInIDogJycpXG4gICAgICArIChwYXJzZWRMaW5lcy52YWx1ZSA9PT0gMSA/ICcgZWxsaXBzaXMnIDogJycpXG4gICAgKVxuXG4gICAgY29uc3Qgc3R5bGUgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICByZXR1cm4gcHJvcHMubGluZXMgIT09IHZvaWQgMCAmJiBwYXJzZWRMaW5lcy52YWx1ZSA+IDFcbiAgICAgICAgPyB7XG4gICAgICAgICAgICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gICAgICAgICAgICBkaXNwbGF5OiAnLXdlYmtpdC1ib3gnLFxuICAgICAgICAgICAgJy13ZWJraXQtYm94LW9yaWVudCc6ICd2ZXJ0aWNhbCcsXG4gICAgICAgICAgICAnLXdlYmtpdC1saW5lLWNsYW1wJzogcGFyc2VkTGluZXMudmFsdWVcbiAgICAgICAgICB9XG4gICAgICAgIDogbnVsbFxuICAgIH0pXG5cbiAgICByZXR1cm4gKCkgPT4gaCgnZGl2Jywge1xuICAgICAgc3R5bGU6IHN0eWxlLnZhbHVlLFxuICAgICAgY2xhc3M6IGNsYXNzZXMudmFsdWVcbiAgICB9LCBoU2xvdChzbG90cy5kZWZhdWx0KSlcbiAgfVxufSlcbiIsImltcG9ydCB7IGgsIGNvbXB1dGVkIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgUUljb24gZnJvbSAnLi4vaWNvbi9RSWNvbi5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgdXNlQ2hlY2tib3gsIHsgdXNlQ2hlY2tib3hQcm9wcywgdXNlQ2hlY2tib3hFbWl0cyB9IGZyb20gJy4vdXNlLWNoZWNrYm94LmpzJ1xuXG5jb25zdCBiZ05vZGUgPSBoKCdkaXYnLCB7XG4gIGtleTogJ3N2ZycsXG4gIGNsYXNzOiAncS1jaGVja2JveF9fYmcgYWJzb2x1dGUnXG59LCBbXG4gIGgoJ3N2ZycsIHtcbiAgICBjbGFzczogJ3EtY2hlY2tib3hfX3N2ZyBmaXQgYWJzb2x1dGUtZnVsbCcsXG4gICAgdmlld0JveDogJzAgMCAyNCAyNCdcbiAgfSwgW1xuICAgIGgoJ3BhdGgnLCB7XG4gICAgICBjbGFzczogJ3EtY2hlY2tib3hfX3RydXRoeScsXG4gICAgICBmaWxsOiAnbm9uZScsXG4gICAgICBkOiAnTTEuNzMsMTIuOTEgOC4xLDE5LjI4IDIyLjc5LDQuNTknXG4gICAgfSksXG5cbiAgICBoKCdwYXRoJywge1xuICAgICAgY2xhc3M6ICdxLWNoZWNrYm94X19pbmRldCcsXG4gICAgICBkOiAnTTQsMTRIMjBWMTBINCdcbiAgICB9KVxuICBdKVxuXSlcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FDaGVja2JveCcsXG5cbiAgcHJvcHM6IHVzZUNoZWNrYm94UHJvcHMsXG4gIGVtaXRzOiB1c2VDaGVja2JveEVtaXRzLFxuXG4gIHNldHVwIChwcm9wcykge1xuICAgIGZ1bmN0aW9uIGdldElubmVyIChpc1RydWUsIGlzSW5kZXRlcm1pbmF0ZSkge1xuICAgICAgY29uc3QgaWNvbiA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAgIChpc1RydWUudmFsdWUgPT09IHRydWVcbiAgICAgICAgICA/IHByb3BzLmNoZWNrZWRJY29uXG4gICAgICAgICAgOiAoaXNJbmRldGVybWluYXRlLnZhbHVlID09PSB0cnVlXG4gICAgICAgICAgICAgID8gcHJvcHMuaW5kZXRlcm1pbmF0ZUljb25cbiAgICAgICAgICAgICAgOiBwcm9wcy51bmNoZWNrZWRJY29uXG4gICAgICAgICAgICApXG4gICAgICAgICkgfHwgbnVsbFxuICAgICAgKVxuXG4gICAgICByZXR1cm4gKCkgPT4gKFxuICAgICAgICBpY29uLnZhbHVlICE9PSBudWxsXG4gICAgICAgICAgPyBbXG4gICAgICAgICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICAgICAgICBrZXk6ICdpY29uJyxcbiAgICAgICAgICAgICAgICBjbGFzczogJ3EtY2hlY2tib3hfX2ljb24tY29udGFpbmVyIGFic29sdXRlLWZ1bGwgZmxleCBmbGV4LWNlbnRlciBuby13cmFwJ1xuICAgICAgICAgICAgICB9LCBbXG4gICAgICAgICAgICAgICAgaChRSWNvbiwge1xuICAgICAgICAgICAgICAgICAgY2xhc3M6ICdxLWNoZWNrYm94X19pY29uJyxcbiAgICAgICAgICAgICAgICAgIG5hbWU6IGljb24udmFsdWVcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgXVxuICAgICAgICAgIDogWyBiZ05vZGUgXVxuICAgICAgKVxuICAgIH1cblxuICAgIHJldHVybiB1c2VDaGVja2JveCgnY2hlY2tib3gnLCBnZXRJbm5lcilcbiAgfVxufSlcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUtBLElBQUEsYUFBZSxnQkFBZ0I7QUFBQSxFQUM3QixNQUFNO0FBQUEsRUFFTixPQUFPO0FBQUEsSUFDTCxVQUFVO0FBQUEsSUFDVixTQUFTO0FBQUEsSUFDVCxRQUFRO0FBQUEsSUFDUixPQUFPLENBQUUsUUFBUSxNQUFRO0FBQUEsRUFDMUI7QUFBQSxFQUVELE1BQU8sT0FBTyxFQUFFLFNBQVM7QUFDdkIsVUFBTSxjQUFjLFNBQVMsTUFBTSxTQUFTLE1BQU0sT0FBTyxFQUFFLENBQUM7QUFFNUQsVUFBTSxVQUFVO0FBQUEsTUFBUyxNQUN2QixtQkFDRyxNQUFNLGFBQWEsT0FBTywyQ0FBMkMsT0FDckUsTUFBTSxZQUFZLE9BQU8seUNBQXlDLE9BQ2xFLE1BQU0sV0FBVyxPQUFPLDJCQUEyQixPQUNuRCxZQUFZLFVBQVUsSUFBSSxjQUFjO0FBQUEsSUFDNUM7QUFFRCxVQUFNLFFBQVEsU0FBUyxNQUFNO0FBQzNCLGFBQU8sTUFBTSxVQUFVLFVBQVUsWUFBWSxRQUFRLElBQ2pEO0FBQUEsUUFDRSxVQUFVO0FBQUEsUUFDVixTQUFTO0FBQUEsUUFDVCxzQkFBc0I7QUFBQSxRQUN0QixzQkFBc0IsWUFBWTtBQUFBLE1BQ25DLElBQ0Q7QUFBQSxJQUNWLENBQUs7QUFFRCxXQUFPLE1BQU0sRUFBRSxPQUFPO0FBQUEsTUFDcEIsT0FBTyxNQUFNO0FBQUEsTUFDYixPQUFPLFFBQVE7QUFBQSxJQUNyQixHQUFPLE1BQU0sTUFBTSxPQUFPLENBQUM7QUFBQSxFQUN4QjtBQUNILENBQUM7QUNuQ0QsTUFBTSxTQUFTLEVBQUUsT0FBTztBQUFBLEVBQ3RCLEtBQUs7QUFBQSxFQUNMLE9BQU87QUFDVCxHQUFHO0FBQUEsRUFDRCxFQUFFLE9BQU87QUFBQSxJQUNQLE9BQU87QUFBQSxJQUNQLFNBQVM7QUFBQSxFQUNiLEdBQUs7QUFBQSxJQUNELEVBQUUsUUFBUTtBQUFBLE1BQ1IsT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sR0FBRztBQUFBLElBQ1QsQ0FBSztBQUFBLElBRUQsRUFBRSxRQUFRO0FBQUEsTUFDUixPQUFPO0FBQUEsTUFDUCxHQUFHO0FBQUEsSUFDVCxDQUFLO0FBQUEsRUFDTCxDQUFHO0FBQ0gsQ0FBQztBQUVELElBQUEsWUFBZSxnQkFBZ0I7QUFBQSxFQUM3QixNQUFNO0FBQUEsRUFFTixPQUFPO0FBQUEsRUFDUCxPQUFPO0FBQUEsRUFFUCxNQUFPLE9BQU87QUFDWixhQUFTLFNBQVUsUUFBUSxpQkFBaUI7QUFDMUMsWUFBTSxPQUFPO0FBQUEsUUFBUyxPQUNuQixPQUFPLFVBQVUsT0FDZCxNQUFNLGNBQ0wsZ0JBQWdCLFVBQVUsT0FDdkIsTUFBTSxvQkFDTixNQUFNLGtCQUVUO0FBQUEsTUFDTjtBQUVELGFBQU8sTUFDTCxLQUFLLFVBQVUsT0FDWDtBQUFBLFFBQ0UsRUFBRSxPQUFPO0FBQUEsVUFDUCxLQUFLO0FBQUEsVUFDTCxPQUFPO0FBQUEsUUFDdkIsR0FBaUI7QUFBQSxVQUNELEVBQUUsT0FBTztBQUFBLFlBQ1AsT0FBTztBQUFBLFlBQ1AsTUFBTSxLQUFLO0FBQUEsVUFDN0IsQ0FBaUI7QUFBQSxRQUNqQixDQUFlO0FBQUEsTUFDRixJQUNELENBQUUsTUFBUTtBQUFBLElBRWpCO0FBRUQsV0FBTyxZQUFZLFlBQVksUUFBUTtBQUFBLEVBQ3hDO0FBQ0gsQ0FBQzs7In0=
