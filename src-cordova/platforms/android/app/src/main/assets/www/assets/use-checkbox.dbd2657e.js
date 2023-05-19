import { a as useDark, u as useDarkProps } from "./use-dark.efa419b2.js";
import { y as ref, a1 as computed, ak as h, cj as useSize, by as hMergeSlot, bF as hSlot, ck as useSizeProps, ah as getCurrentInstance, D as toRaw, bI as stopAndPrevent } from "./index.404ce4fc.js";
import { u as useFormProps, a as useFormInject } from "./use-form.74a30394.js";
function useRefocusTarget(props, rootRef) {
  const refocusRef = ref(null);
  const refocusTargetEl = computed(() => {
    if (props.disable === true) {
      return null;
    }
    return h("span", {
      ref: refocusRef,
      class: "no-outline",
      tabindex: -1
    });
  });
  function refocusTarget(e) {
    const root = rootRef.value;
    if (e !== void 0 && e.type.indexOf("key") === 0) {
      if (root !== null && document.activeElement !== root && root.contains(document.activeElement) === true) {
        root.focus();
      }
    } else if (refocusRef.value !== null && (e === void 0 || root !== null && root.contains(e.target) === true)) {
      refocusRef.value.focus();
    }
  }
  return {
    refocusTargetEl,
    refocusTarget
  };
}
var optionSizes = {
  xs: 30,
  sm: 35,
  md: 40,
  lg: 50,
  xl: 60
};
const useCheckboxProps = {
  ...useDarkProps,
  ...useSizeProps,
  ...useFormProps,
  modelValue: {
    required: true,
    default: null
  },
  val: {},
  trueValue: { default: true },
  falseValue: { default: false },
  indeterminateValue: { default: null },
  checkedIcon: String,
  uncheckedIcon: String,
  indeterminateIcon: String,
  toggleOrder: {
    type: String,
    validator: (v) => v === "tf" || v === "ft"
  },
  toggleIndeterminate: Boolean,
  label: String,
  leftLabel: Boolean,
  color: String,
  keepColor: Boolean,
  dense: Boolean,
  disable: Boolean,
  tabindex: [String, Number]
};
const useCheckboxEmits = ["update:modelValue"];
function useCheckbox(type, getInner) {
  const { props, slots, emit, proxy } = getCurrentInstance();
  const { $q } = proxy;
  const isDark = useDark(props, $q);
  const rootRef = ref(null);
  const { refocusTargetEl, refocusTarget } = useRefocusTarget(props, rootRef);
  const sizeStyle = useSize(props, optionSizes);
  const modelIsArray = computed(
    () => props.val !== void 0 && Array.isArray(props.modelValue)
  );
  const index = computed(() => {
    const val = toRaw(props.val);
    return modelIsArray.value === true ? props.modelValue.findIndex((opt) => toRaw(opt) === val) : -1;
  });
  const isTrue = computed(() => modelIsArray.value === true ? index.value > -1 : toRaw(props.modelValue) === toRaw(props.trueValue));
  const isFalse = computed(() => modelIsArray.value === true ? index.value === -1 : toRaw(props.modelValue) === toRaw(props.falseValue));
  const isIndeterminate = computed(
    () => isTrue.value === false && isFalse.value === false
  );
  const tabindex = computed(() => props.disable === true ? -1 : props.tabindex || 0);
  const classes = computed(
    () => `q-${type} cursor-pointer no-outline row inline no-wrap items-center` + (props.disable === true ? " disabled" : "") + (isDark.value === true ? ` q-${type}--dark` : "") + (props.dense === true ? ` q-${type}--dense` : "") + (props.leftLabel === true ? " reverse" : "")
  );
  const innerClass = computed(() => {
    const state = isTrue.value === true ? "truthy" : isFalse.value === true ? "falsy" : "indet";
    const color = props.color !== void 0 && (props.keepColor === true || (type === "toggle" ? isTrue.value === true : isFalse.value !== true)) ? ` text-${props.color}` : "";
    return `q-${type}__inner relative-position non-selectable q-${type}__inner--${state}${color}`;
  });
  const formAttrs = computed(() => {
    const prop = { type: "checkbox" };
    props.name !== void 0 && Object.assign(prop, {
      ".checked": isTrue.value,
      "^checked": isTrue.value === true ? "checked" : void 0,
      name: props.name,
      value: modelIsArray.value === true ? props.val : props.trueValue
    });
    return prop;
  });
  const injectFormInput = useFormInject(formAttrs);
  const attributes = computed(() => {
    const attrs = {
      tabindex: tabindex.value,
      role: type === "toggle" ? "switch" : "checkbox",
      "aria-label": props.label,
      "aria-checked": isIndeterminate.value === true ? "mixed" : isTrue.value === true ? "true" : "false"
    };
    if (props.disable === true) {
      attrs["aria-disabled"] = "true";
    }
    return attrs;
  });
  function onClick(e) {
    if (e !== void 0) {
      stopAndPrevent(e);
      refocusTarget(e);
    }
    if (props.disable !== true) {
      emit("update:modelValue", getNextValue(), e);
    }
  }
  function getNextValue() {
    if (modelIsArray.value === true) {
      if (isTrue.value === true) {
        const val = props.modelValue.slice();
        val.splice(index.value, 1);
        return val;
      }
      return props.modelValue.concat([props.val]);
    }
    if (isTrue.value === true) {
      if (props.toggleOrder !== "ft" || props.toggleIndeterminate === false) {
        return props.falseValue;
      }
    } else if (isFalse.value === true) {
      if (props.toggleOrder === "ft" || props.toggleIndeterminate === false) {
        return props.trueValue;
      }
    } else {
      return props.toggleOrder !== "ft" ? props.trueValue : props.falseValue;
    }
    return props.indeterminateValue;
  }
  function onKeydown(e) {
    if (e.keyCode === 13 || e.keyCode === 32) {
      stopAndPrevent(e);
    }
  }
  function onKeyup(e) {
    if (e.keyCode === 13 || e.keyCode === 32) {
      onClick(e);
    }
  }
  const getInnerContent = getInner(isTrue, isIndeterminate);
  Object.assign(proxy, { toggle: onClick });
  return () => {
    const inner = getInnerContent();
    props.disable !== true && injectFormInput(
      inner,
      "unshift",
      ` q-${type}__native absolute q-ma-none q-pa-none`
    );
    const child = [
      h("div", {
        class: innerClass.value,
        style: sizeStyle.value,
        "aria-hidden": "true"
      }, inner)
    ];
    if (refocusTargetEl.value !== null) {
      child.push(refocusTargetEl.value);
    }
    const label = props.label !== void 0 ? hMergeSlot(slots.default, [props.label]) : hSlot(slots.default);
    label !== void 0 && child.push(
      h("div", {
        class: `q-${type}__label q-anchor--skip`
      }, label)
    );
    return h("div", {
      ref: rootRef,
      class: classes.value,
      ...attributes.value,
      onClick,
      onKeydown,
      onKeyup
    }, child);
  };
}
export { useCheckboxEmits as a, useCheckbox as b, useRefocusTarget as c, optionSizes as o, useCheckboxProps as u };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlLWNoZWNrYm94LmRiZDI2NTdlLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1yZWZvY3VzLXRhcmdldC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL3V0aWxzL3ByaXZhdGUvb3B0aW9uLXNpemVzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9jaGVja2JveC91c2UtY2hlY2tib3guanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaCwgY29tcHV0ZWQsIHJlZiB9IGZyb20gJ3Z1ZSdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCByb290UmVmKSB7XG4gIGNvbnN0IHJlZm9jdXNSZWYgPSByZWYobnVsbClcblxuICBjb25zdCByZWZvY3VzVGFyZ2V0RWwgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgaWYgKHByb3BzLmRpc2FibGUgPT09IHRydWUpIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuXG4gICAgcmV0dXJuIGgoJ3NwYW4nLCB7XG4gICAgICByZWY6IHJlZm9jdXNSZWYsXG4gICAgICBjbGFzczogJ25vLW91dGxpbmUnLFxuICAgICAgdGFiaW5kZXg6IC0xXG4gICAgfSlcbiAgfSlcblxuICBmdW5jdGlvbiByZWZvY3VzVGFyZ2V0IChlKSB7XG4gICAgY29uc3Qgcm9vdCA9IHJvb3RSZWYudmFsdWVcblxuICAgIGlmIChlICE9PSB2b2lkIDAgJiYgZS50eXBlLmluZGV4T2YoJ2tleScpID09PSAwKSB7XG4gICAgICBpZiAoXG4gICAgICAgIHJvb3QgIT09IG51bGxcbiAgICAgICAgJiYgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAhPT0gcm9vdFxuICAgICAgICAmJiByb290LmNvbnRhaW5zKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpID09PSB0cnVlXG4gICAgICApIHtcbiAgICAgICAgcm9vdC5mb2N1cygpXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKFxuICAgICAgcmVmb2N1c1JlZi52YWx1ZSAhPT0gbnVsbFxuICAgICAgJiYgKGUgPT09IHZvaWQgMCB8fCAocm9vdCAhPT0gbnVsbCAmJiByb290LmNvbnRhaW5zKGUudGFyZ2V0KSA9PT0gdHJ1ZSkpXG4gICAgKSB7XG4gICAgICByZWZvY3VzUmVmLnZhbHVlLmZvY3VzKClcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHJlZm9jdXNUYXJnZXRFbCxcbiAgICByZWZvY3VzVGFyZ2V0XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IHtcbiAgeHM6IDMwLFxuICBzbTogMzUsXG4gIG1kOiA0MCxcbiAgbGc6IDUwLFxuICB4bDogNjBcbn1cbiIsImltcG9ydCB7IGgsIHJlZiwgY29tcHV0ZWQsIGdldEN1cnJlbnRJbnN0YW5jZSwgdG9SYXcgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB1c2VEYXJrLCB7IHVzZURhcmtQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWRhcmsuanMnXG5pbXBvcnQgdXNlU2l6ZSwgeyB1c2VTaXplUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1zaXplLmpzJ1xuaW1wb3J0IHVzZVJlZm9jdXNUYXJnZXQgZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtcmVmb2N1cy10YXJnZXQuanMnXG5pbXBvcnQgeyB1c2VGb3JtSW5qZWN0LCB1c2VGb3JtUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1mb3JtLmpzJ1xuXG5pbXBvcnQgb3B0aW9uU2l6ZXMgZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9vcHRpb24tc2l6ZXMuanMnXG5pbXBvcnQgeyBzdG9wQW5kUHJldmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL2V2ZW50LmpzJ1xuaW1wb3J0IHsgaFNsb3QsIGhNZXJnZVNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcblxuZXhwb3J0IGNvbnN0IHVzZUNoZWNrYm94UHJvcHMgPSB7XG4gIC4uLnVzZURhcmtQcm9wcyxcbiAgLi4udXNlU2l6ZVByb3BzLFxuICAuLi51c2VGb3JtUHJvcHMsXG5cbiAgbW9kZWxWYWx1ZToge1xuICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgIGRlZmF1bHQ6IG51bGxcbiAgfSxcbiAgdmFsOiB7fSxcblxuICB0cnVlVmFsdWU6IHsgZGVmYXVsdDogdHJ1ZSB9LFxuICBmYWxzZVZhbHVlOiB7IGRlZmF1bHQ6IGZhbHNlIH0sXG4gIGluZGV0ZXJtaW5hdGVWYWx1ZTogeyBkZWZhdWx0OiBudWxsIH0sXG5cbiAgY2hlY2tlZEljb246IFN0cmluZyxcbiAgdW5jaGVja2VkSWNvbjogU3RyaW5nLFxuICBpbmRldGVybWluYXRlSWNvbjogU3RyaW5nLFxuXG4gIHRvZ2dsZU9yZGVyOiB7XG4gICAgdHlwZTogU3RyaW5nLFxuICAgIHZhbGlkYXRvcjogdiA9PiB2ID09PSAndGYnIHx8IHYgPT09ICdmdCdcbiAgfSxcbiAgdG9nZ2xlSW5kZXRlcm1pbmF0ZTogQm9vbGVhbixcblxuICBsYWJlbDogU3RyaW5nLFxuICBsZWZ0TGFiZWw6IEJvb2xlYW4sXG5cbiAgY29sb3I6IFN0cmluZyxcbiAga2VlcENvbG9yOiBCb29sZWFuLFxuICBkZW5zZTogQm9vbGVhbixcblxuICBkaXNhYmxlOiBCb29sZWFuLFxuICB0YWJpbmRleDogWyBTdHJpbmcsIE51bWJlciBdXG59XG5cbmV4cG9ydCBjb25zdCB1c2VDaGVja2JveEVtaXRzID0gWyAndXBkYXRlOm1vZGVsVmFsdWUnIF1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHR5cGUsIGdldElubmVyKSB7XG4gIGNvbnN0IHsgcHJvcHMsIHNsb3RzLCBlbWl0LCBwcm94eSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgY29uc3QgeyAkcSB9ID0gcHJveHlcblxuICBjb25zdCBpc0RhcmsgPSB1c2VEYXJrKHByb3BzLCAkcSlcblxuICBjb25zdCByb290UmVmID0gcmVmKG51bGwpXG4gIGNvbnN0IHsgcmVmb2N1c1RhcmdldEVsLCByZWZvY3VzVGFyZ2V0IH0gPSB1c2VSZWZvY3VzVGFyZ2V0KHByb3BzLCByb290UmVmKVxuICBjb25zdCBzaXplU3R5bGUgPSB1c2VTaXplKHByb3BzLCBvcHRpb25TaXplcylcblxuICBjb25zdCBtb2RlbElzQXJyYXkgPSBjb21wdXRlZCgoKSA9PlxuICAgIHByb3BzLnZhbCAhPT0gdm9pZCAwICYmIEFycmF5LmlzQXJyYXkocHJvcHMubW9kZWxWYWx1ZSlcbiAgKVxuXG4gIGNvbnN0IGluZGV4ID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgIGNvbnN0IHZhbCA9IHRvUmF3KHByb3BzLnZhbClcbiAgICByZXR1cm4gbW9kZWxJc0FycmF5LnZhbHVlID09PSB0cnVlXG4gICAgICA/IHByb3BzLm1vZGVsVmFsdWUuZmluZEluZGV4KG9wdCA9PiB0b1JhdyhvcHQpID09PSB2YWwpXG4gICAgICA6IC0xXG4gIH0pXG5cbiAgY29uc3QgaXNUcnVlID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgIG1vZGVsSXNBcnJheS52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgPyBpbmRleC52YWx1ZSA+IC0xXG4gICAgICA6IHRvUmF3KHByb3BzLm1vZGVsVmFsdWUpID09PSB0b1Jhdyhwcm9wcy50cnVlVmFsdWUpXG4gICkpXG5cbiAgY29uc3QgaXNGYWxzZSA9IGNvbXB1dGVkKCgpID0+IChcbiAgICBtb2RlbElzQXJyYXkudmFsdWUgPT09IHRydWVcbiAgICAgID8gaW5kZXgudmFsdWUgPT09IC0xXG4gICAgICA6IHRvUmF3KHByb3BzLm1vZGVsVmFsdWUpID09PSB0b1Jhdyhwcm9wcy5mYWxzZVZhbHVlKVxuICApKVxuXG4gIGNvbnN0IGlzSW5kZXRlcm1pbmF0ZSA9IGNvbXB1dGVkKCgpID0+XG4gICAgaXNUcnVlLnZhbHVlID09PSBmYWxzZSAmJiBpc0ZhbHNlLnZhbHVlID09PSBmYWxzZVxuICApXG5cbiAgY29uc3QgdGFiaW5kZXggPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgcHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZSA/IC0xIDogcHJvcHMudGFiaW5kZXggfHwgMFxuICApKVxuXG4gIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgIGBxLSR7IHR5cGUgfSBjdXJzb3ItcG9pbnRlciBuby1vdXRsaW5lIHJvdyBpbmxpbmUgbm8td3JhcCBpdGVtcy1jZW50ZXJgXG4gICAgKyAocHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZSA/ICcgZGlzYWJsZWQnIDogJycpXG4gICAgKyAoaXNEYXJrLnZhbHVlID09PSB0cnVlID8gYCBxLSR7IHR5cGUgfS0tZGFya2AgOiAnJylcbiAgICArIChwcm9wcy5kZW5zZSA9PT0gdHJ1ZSA/IGAgcS0keyB0eXBlIH0tLWRlbnNlYCA6ICcnKVxuICAgICsgKHByb3BzLmxlZnRMYWJlbCA9PT0gdHJ1ZSA/ICcgcmV2ZXJzZScgOiAnJylcbiAgKVxuXG4gIGNvbnN0IGlubmVyQ2xhc3MgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgY29uc3Qgc3RhdGUgPSBpc1RydWUudmFsdWUgPT09IHRydWUgPyAndHJ1dGh5JyA6IChpc0ZhbHNlLnZhbHVlID09PSB0cnVlID8gJ2ZhbHN5JyA6ICdpbmRldCcpXG4gICAgY29uc3QgY29sb3IgPSBwcm9wcy5jb2xvciAhPT0gdm9pZCAwICYmIChcbiAgICAgIHByb3BzLmtlZXBDb2xvciA9PT0gdHJ1ZVxuICAgICAgfHwgKHR5cGUgPT09ICd0b2dnbGUnID8gaXNUcnVlLnZhbHVlID09PSB0cnVlIDogaXNGYWxzZS52YWx1ZSAhPT0gdHJ1ZSlcbiAgICApXG4gICAgICA/IGAgdGV4dC0keyBwcm9wcy5jb2xvciB9YFxuICAgICAgOiAnJ1xuXG4gICAgcmV0dXJuIGBxLSR7IHR5cGUgfV9faW5uZXIgcmVsYXRpdmUtcG9zaXRpb24gbm9uLXNlbGVjdGFibGUgcS0keyB0eXBlIH1fX2lubmVyLS0keyBzdGF0ZSB9JHsgY29sb3IgfWBcbiAgfSlcblxuICBjb25zdCBmb3JtQXR0cnMgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgY29uc3QgcHJvcCA9IHsgdHlwZTogJ2NoZWNrYm94JyB9XG5cbiAgICBwcm9wcy5uYW1lICE9PSB2b2lkIDAgJiYgT2JqZWN0LmFzc2lnbihwcm9wLCB7XG4gICAgICAvLyBzZWUgaHR0cHM6Ly92dWVqcy5vcmcvZ3VpZGUvZXh0cmFzL3JlbmRlci1mdW5jdGlvbi5odG1sI2NyZWF0aW5nLXZub2RlcyAoLnByb3ApXG4gICAgICAnLmNoZWNrZWQnOiBpc1RydWUudmFsdWUsXG4gICAgICAnXmNoZWNrZWQnOiBpc1RydWUudmFsdWUgPT09IHRydWUgPyAnY2hlY2tlZCcgOiB2b2lkIDAsXG4gICAgICBuYW1lOiBwcm9wcy5uYW1lLFxuICAgICAgdmFsdWU6IG1vZGVsSXNBcnJheS52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICA/IHByb3BzLnZhbFxuICAgICAgICA6IHByb3BzLnRydWVWYWx1ZVxuICAgIH0pXG5cbiAgICByZXR1cm4gcHJvcFxuICB9KVxuXG4gIGNvbnN0IGluamVjdEZvcm1JbnB1dCA9IHVzZUZvcm1JbmplY3QoZm9ybUF0dHJzKVxuXG4gIGNvbnN0IGF0dHJpYnV0ZXMgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgY29uc3QgYXR0cnMgPSB7XG4gICAgICB0YWJpbmRleDogdGFiaW5kZXgudmFsdWUsXG4gICAgICByb2xlOiB0eXBlID09PSAndG9nZ2xlJyA/ICdzd2l0Y2gnIDogJ2NoZWNrYm94JyxcbiAgICAgICdhcmlhLWxhYmVsJzogcHJvcHMubGFiZWwsXG4gICAgICAnYXJpYS1jaGVja2VkJzogaXNJbmRldGVybWluYXRlLnZhbHVlID09PSB0cnVlXG4gICAgICAgID8gJ21peGVkJ1xuICAgICAgICA6IChpc1RydWUudmFsdWUgPT09IHRydWUgPyAndHJ1ZScgOiAnZmFsc2UnKVxuICAgIH1cblxuICAgIGlmIChwcm9wcy5kaXNhYmxlID09PSB0cnVlKSB7XG4gICAgICBhdHRyc1sgJ2FyaWEtZGlzYWJsZWQnIF0gPSAndHJ1ZSdcbiAgICB9XG5cbiAgICByZXR1cm4gYXR0cnNcbiAgfSlcblxuICBmdW5jdGlvbiBvbkNsaWNrIChlKSB7XG4gICAgaWYgKGUgIT09IHZvaWQgMCkge1xuICAgICAgc3RvcEFuZFByZXZlbnQoZSlcbiAgICAgIHJlZm9jdXNUYXJnZXQoZSlcbiAgICB9XG5cbiAgICBpZiAocHJvcHMuZGlzYWJsZSAhPT0gdHJ1ZSkge1xuICAgICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCBnZXROZXh0VmFsdWUoKSwgZSlcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnZXROZXh0VmFsdWUgKCkge1xuICAgIGlmIChtb2RlbElzQXJyYXkudmFsdWUgPT09IHRydWUpIHtcbiAgICAgIGlmIChpc1RydWUudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgY29uc3QgdmFsID0gcHJvcHMubW9kZWxWYWx1ZS5zbGljZSgpXG4gICAgICAgIHZhbC5zcGxpY2UoaW5kZXgudmFsdWUsIDEpXG4gICAgICAgIHJldHVybiB2YWxcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByb3BzLm1vZGVsVmFsdWUuY29uY2F0KFsgcHJvcHMudmFsIF0pXG4gICAgfVxuXG4gICAgaWYgKGlzVHJ1ZS52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgaWYgKHByb3BzLnRvZ2dsZU9yZGVyICE9PSAnZnQnIHx8IHByb3BzLnRvZ2dsZUluZGV0ZXJtaW5hdGUgPT09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiBwcm9wcy5mYWxzZVZhbHVlXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzRmFsc2UudmFsdWUgPT09IHRydWUpIHtcbiAgICAgIGlmIChwcm9wcy50b2dnbGVPcmRlciA9PT0gJ2Z0JyB8fCBwcm9wcy50b2dnbGVJbmRldGVybWluYXRlID09PSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gcHJvcHMudHJ1ZVZhbHVlXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuIHByb3BzLnRvZ2dsZU9yZGVyICE9PSAnZnQnXG4gICAgICAgID8gcHJvcHMudHJ1ZVZhbHVlXG4gICAgICAgIDogcHJvcHMuZmFsc2VWYWx1ZVxuICAgIH1cblxuICAgIHJldHVybiBwcm9wcy5pbmRldGVybWluYXRlVmFsdWVcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uS2V5ZG93biAoZSkge1xuICAgIGlmIChlLmtleUNvZGUgPT09IDEzIHx8IGUua2V5Q29kZSA9PT0gMzIpIHtcbiAgICAgIHN0b3BBbmRQcmV2ZW50KGUpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gb25LZXl1cCAoZSkge1xuICAgIGlmIChlLmtleUNvZGUgPT09IDEzIHx8IGUua2V5Q29kZSA9PT0gMzIpIHtcbiAgICAgIG9uQ2xpY2soZSlcbiAgICB9XG4gIH1cblxuICBjb25zdCBnZXRJbm5lckNvbnRlbnQgPSBnZXRJbm5lcihpc1RydWUsIGlzSW5kZXRlcm1pbmF0ZSlcblxuICAvLyBleHBvc2UgcHVibGljIG1ldGhvZHNcbiAgT2JqZWN0LmFzc2lnbihwcm94eSwgeyB0b2dnbGU6IG9uQ2xpY2sgfSlcblxuICByZXR1cm4gKCkgPT4ge1xuICAgIGNvbnN0IGlubmVyID0gZ2V0SW5uZXJDb250ZW50KClcblxuICAgIHByb3BzLmRpc2FibGUgIT09IHRydWUgJiYgaW5qZWN0Rm9ybUlucHV0KFxuICAgICAgaW5uZXIsXG4gICAgICAndW5zaGlmdCcsXG4gICAgICBgIHEtJHsgdHlwZSB9X19uYXRpdmUgYWJzb2x1dGUgcS1tYS1ub25lIHEtcGEtbm9uZWBcbiAgICApXG5cbiAgICBjb25zdCBjaGlsZCA9IFtcbiAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgY2xhc3M6IGlubmVyQ2xhc3MudmFsdWUsXG4gICAgICAgIHN0eWxlOiBzaXplU3R5bGUudmFsdWUsXG4gICAgICAgICdhcmlhLWhpZGRlbic6ICd0cnVlJ1xuICAgICAgfSwgaW5uZXIpXG4gICAgXVxuXG4gICAgaWYgKHJlZm9jdXNUYXJnZXRFbC52YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgY2hpbGQucHVzaChyZWZvY3VzVGFyZ2V0RWwudmFsdWUpXG4gICAgfVxuXG4gICAgY29uc3QgbGFiZWwgPSBwcm9wcy5sYWJlbCAhPT0gdm9pZCAwXG4gICAgICA/IGhNZXJnZVNsb3Qoc2xvdHMuZGVmYXVsdCwgWyBwcm9wcy5sYWJlbCBdKVxuICAgICAgOiBoU2xvdChzbG90cy5kZWZhdWx0KVxuXG4gICAgbGFiZWwgIT09IHZvaWQgMCAmJiBjaGlsZC5wdXNoKFxuICAgICAgaCgnZGl2Jywge1xuICAgICAgICBjbGFzczogYHEtJHsgdHlwZSB9X19sYWJlbCBxLWFuY2hvci0tc2tpcGBcbiAgICAgIH0sIGxhYmVsKVxuICAgIClcblxuICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICByZWY6IHJvb3RSZWYsXG4gICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZSxcbiAgICAgIC4uLmF0dHJpYnV0ZXMudmFsdWUsXG4gICAgICBvbkNsaWNrLFxuICAgICAgb25LZXlkb3duLFxuICAgICAgb25LZXl1cFxuICAgIH0sIGNoaWxkKVxuICB9XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRWUsU0FBQSxpQkFBVSxPQUFPLFNBQVM7QUFDdkMsUUFBTSxhQUFhLElBQUksSUFBSTtBQUUzQixRQUFNLGtCQUFrQixTQUFTLE1BQU07QUFDckMsUUFBSSxNQUFNLFlBQVksTUFBTTtBQUMxQixhQUFPO0FBQUEsSUFDUjtBQUVELFdBQU8sRUFBRSxRQUFRO0FBQUEsTUFDZixLQUFLO0FBQUEsTUFDTCxPQUFPO0FBQUEsTUFDUCxVQUFVO0FBQUEsSUFDaEIsQ0FBSztBQUFBLEVBQ0wsQ0FBRztBQUVELFdBQVMsY0FBZSxHQUFHO0FBQ3pCLFVBQU0sT0FBTyxRQUFRO0FBRXJCLFFBQUksTUFBTSxVQUFVLEVBQUUsS0FBSyxRQUFRLEtBQUssTUFBTSxHQUFHO0FBQy9DLFVBQ0UsU0FBUyxRQUNOLFNBQVMsa0JBQWtCLFFBQzNCLEtBQUss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
