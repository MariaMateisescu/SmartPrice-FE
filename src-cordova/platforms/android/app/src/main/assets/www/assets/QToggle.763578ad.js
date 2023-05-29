import { bt as createComponent, a1 as computed, ak as h, bC as QIcon } from "./index.0ce84b9b.js";
import { u as useCheckboxProps, a as useCheckboxEmits, b as useCheckbox } from "./use-checkbox.bf2f6301.js";
var QToggle = createComponent({
  name: "QToggle",
  props: {
    ...useCheckboxProps,
    icon: String,
    iconColor: String
  },
  emits: useCheckboxEmits,
  setup(props) {
    function getInner(isTrue, isIndeterminate) {
      const icon = computed(
        () => (isTrue.value === true ? props.checkedIcon : isIndeterminate.value === true ? props.indeterminateIcon : props.uncheckedIcon) || props.icon
      );
      const color = computed(() => isTrue.value === true ? props.iconColor : null);
      return () => [
        h("div", { class: "q-toggle__track" }),
        h(
          "div",
          {
            class: "q-toggle__thumb absolute flex flex-center no-wrap"
          },
          icon.value !== void 0 ? [
            h(QIcon, {
              name: icon.value,
              color: color.value
            })
          ] : void 0
        )
      ];
    }
    return useCheckbox("toggle", getInner);
  }
});
export { QToggle as Q };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUVRvZ2dsZS43NjM1NzhhZC5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy90b2dnbGUvUVRvZ2dsZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBoLCBjb21wdXRlZCB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IFFJY29uIGZyb20gJy4uL2ljb24vUUljb24uanMnXG5cbmltcG9ydCB1c2VDaGVja2JveCwgeyB1c2VDaGVja2JveFByb3BzLCB1c2VDaGVja2JveEVtaXRzIH0gZnJvbSAnLi4vY2hlY2tib3gvdXNlLWNoZWNrYm94LmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FUb2dnbGUnLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlQ2hlY2tib3hQcm9wcyxcblxuICAgIGljb246IFN0cmluZyxcbiAgICBpY29uQ29sb3I6IFN0cmluZ1xuICB9LFxuXG4gIGVtaXRzOiB1c2VDaGVja2JveEVtaXRzLFxuXG4gIHNldHVwIChwcm9wcykge1xuICAgIGZ1bmN0aW9uIGdldElubmVyIChpc1RydWUsIGlzSW5kZXRlcm1pbmF0ZSkge1xuICAgICAgY29uc3QgaWNvbiA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAgIChpc1RydWUudmFsdWUgPT09IHRydWVcbiAgICAgICAgICA/IHByb3BzLmNoZWNrZWRJY29uXG4gICAgICAgICAgOiAoaXNJbmRldGVybWluYXRlLnZhbHVlID09PSB0cnVlID8gcHJvcHMuaW5kZXRlcm1pbmF0ZUljb24gOiBwcm9wcy51bmNoZWNrZWRJY29uKVxuICAgICAgICApIHx8IHByb3BzLmljb25cbiAgICAgIClcblxuICAgICAgY29uc3QgY29sb3IgPSBjb21wdXRlZCgoKSA9PiAoaXNUcnVlLnZhbHVlID09PSB0cnVlID8gcHJvcHMuaWNvbkNvbG9yIDogbnVsbCkpXG5cbiAgICAgIHJldHVybiAoKSA9PiBbXG4gICAgICAgIGgoJ2RpdicsIHsgY2xhc3M6ICdxLXRvZ2dsZV9fdHJhY2snIH0pLFxuXG4gICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICBjbGFzczogJ3EtdG9nZ2xlX190aHVtYiBhYnNvbHV0ZSBmbGV4IGZsZXgtY2VudGVyIG5vLXdyYXAnXG4gICAgICAgIH0sIGljb24udmFsdWUgIT09IHZvaWQgMFxuICAgICAgICAgID8gW1xuICAgICAgICAgICAgICBoKFFJY29uLCB7XG4gICAgICAgICAgICAgICAgbmFtZTogaWNvbi52YWx1ZSxcbiAgICAgICAgICAgICAgICBjb2xvcjogY29sb3IudmFsdWVcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF1cbiAgICAgICAgICA6IHZvaWQgMFxuICAgICAgICApXG4gICAgICBdXG4gICAgfVxuXG4gICAgcmV0dXJuIHVzZUNoZWNrYm94KCd0b2dnbGUnLCBnZXRJbm5lcilcbiAgfVxufSlcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQVFBLElBQUEsVUFBZSxnQkFBZ0I7QUFBQSxFQUM3QixNQUFNO0FBQUEsRUFFTixPQUFPO0FBQUEsSUFDTCxHQUFHO0FBQUEsSUFFSCxNQUFNO0FBQUEsSUFDTixXQUFXO0FBQUEsRUFDWjtBQUFBLEVBRUQsT0FBTztBQUFBLEVBRVAsTUFBTyxPQUFPO0FBQ1osYUFBUyxTQUFVLFFBQVEsaUJBQWlCO0FBQzFDLFlBQU0sT0FBTztBQUFBLFFBQVMsT0FDbkIsT0FBTyxVQUFVLE9BQ2QsTUFBTSxjQUNMLGdCQUFnQixVQUFVLE9BQU8sTUFBTSxvQkFBb0IsTUFBTSxrQkFDakUsTUFBTTtBQUFBLE1BQ1o7QUFFRCxZQUFNLFFBQVEsU0FBUyxNQUFPLE9BQU8sVUFBVSxPQUFPLE1BQU0sWUFBWSxJQUFLO0FBRTdFLGFBQU8sTUFBTTtBQUFBLFFBQ1gsRUFBRSxPQUFPLEVBQUUsT0FBTyxrQkFBaUIsQ0FBRTtBQUFBLFFBRXJDO0FBQUEsVUFBRTtBQUFBLFVBQU87QUFBQSxZQUNQLE9BQU87QUFBQSxVQUNqQjtBQUFBLFVBQVcsS0FBSyxVQUFVLFNBQ2Q7QUFBQSxZQUNFLEVBQUUsT0FBTztBQUFBLGNBQ1AsTUFBTSxLQUFLO0FBQUEsY0FDWCxPQUFPLE1BQU07QUFBQSxZQUM3QixDQUFlO0FBQUEsVUFDRixJQUNEO0FBQUEsUUFDSDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBRUQsV0FBTyxZQUFZLFVBQVUsUUFBUTtBQUFBLEVBQ3RDO0FBQ0gsQ0FBQzs7In0=
