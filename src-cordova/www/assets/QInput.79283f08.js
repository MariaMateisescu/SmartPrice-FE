import { b0 as watch, az as onMounted, av as onBeforeUnmount, an as inject, ah as getCurrentInstance, cf as formKey, y as ref, a1 as computed, cg as debounce, bZ as injectProp, aw as onBeforeUpdate, bI as stopAndPrevent, as as nextTick, ax as onDeactivated, at as onActivated, bx as isRuntimeSsrPreHydration, ak as h, bJ as prevent, bC as QIcon, ch as QSpinner, bF as hSlot, ba as Transition, bU as shouldIgnoreKey, bN as client, bt as createComponent, ce as stop } from "./index.404ce4fc.js";
import { u as useDarkProps, a as useDark } from "./use-dark.efa419b2.js";
import { u as uid } from "./uid.7f2d5a47.js";
import { a as addFocusFn, c as removeFocusFn } from "./focus-manager.d00a4595.js";
import { u as useFormProps, c as useFormInputNameAttr } from "./use-form.74a30394.js";
function useFormChild({ validate, resetValidation, requiresQForm }) {
  const $form = inject(formKey, false);
  if ($form !== false) {
    const { props, proxy } = getCurrentInstance();
    Object.assign(proxy, { validate, resetValidation });
    watch(() => props.disable, (val) => {
      if (val === true) {
        typeof resetValidation === "function" && resetValidation();
        $form.unbindComponent(proxy);
      } else {
        $form.bindComponent(proxy);
      }
    });
    onMounted(() => {
      props.disable !== true && $form.bindComponent(proxy);
    });
    onBeforeUnmount(() => {
      props.disable !== true && $form.unbindComponent(proxy);
    });
  } else if (requiresQForm === true) {
    console.error("Parent QForm not found on useFormChild()!");
  }
}
const hex = /^#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/, hexa = /^#[0-9a-fA-F]{4}([0-9a-fA-F]{4})?$/, hexOrHexa = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/, rgb = /^rgb\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5])\)$/, rgba = /^rgba\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),(0|0\.[0-9]+[1-9]|0\.[1-9]+|1)\)$/;
const testPattern = {
  date: (v) => /^-?[\d]+\/[0-1]\d\/[0-3]\d$/.test(v),
  time: (v) => /^([0-1]?\d|2[0-3]):[0-5]\d$/.test(v),
  fulltime: (v) => /^([0-1]?\d|2[0-3]):[0-5]\d:[0-5]\d$/.test(v),
  timeOrFulltime: (v) => /^([0-1]?\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/.test(v),
  email: (v) => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v),
  hexColor: (v) => hex.test(v),
  hexaColor: (v) => hexa.test(v),
  hexOrHexaColor: (v) => hexOrHexa.test(v),
  rgbColor: (v) => rgb.test(v),
  rgbaColor: (v) => rgba.test(v),
  rgbOrRgbaColor: (v) => rgb.test(v) || rgba.test(v),
  hexOrRgbColor: (v) => hex.test(v) || rgb.test(v),
  hexaOrRgbaColor: (v) => hexa.test(v) || rgba.test(v),
  anyColor: (v) => hexOrHexa.test(v) || rgb.test(v) || rgba.test(v)
};
const lazyRulesValues = [true, false, "ondemand"];
const useValidateProps = {
  modelValue: {},
  error: {
    type: Boolean,
    default: null
  },
  errorMessage: String,
  noErrorIcon: Boolean,
  rules: Array,
  reactiveRules: Boolean,
  lazyRules: {
    type: [Boolean, String],
    validator: (v) => lazyRulesValues.includes(v)
  }
};
function useValidate(focused, innerLoading) {
  const { props, proxy } = getCurrentInstance();
  const innerError = ref(false);
  const innerErrorMessage = ref(null);
  const isDirtyModel = ref(null);
  useFormChild({ validate, resetValidation });
  let validateIndex = 0, unwatchRules;
  const hasRules = computed(
    () => props.rules !== void 0 && props.rules !== null && props.rules.length > 0
  );
  const hasActiveRules = computed(
    () => props.disable !== true && hasRules.value === true
  );
  const hasError = computed(
    () => props.error === true || innerError.value === true
  );
  const errorMessage = computed(() => typeof props.errorMessage === "string" && props.errorMessage.length > 0 ? props.errorMessage : innerErrorMessage.value);
  watch(() => props.modelValue, () => {
    validateIfNeeded();
  });
  watch(() => props.reactiveRules, (val) => {
    if (val === true) {
      if (unwatchRules === void 0) {
        unwatchRules = watch(() => props.rules, () => {
          validateIfNeeded(true);
        });
      }
    } else if (unwatchRules !== void 0) {
      unwatchRules();
      unwatchRules = void 0;
    }
  }, { immediate: true });
  watch(focused, (val) => {
    if (val === true) {
      if (isDirtyModel.value === null) {
        isDirtyModel.value = false;
      }
    } else if (isDirtyModel.value === false) {
      isDirtyModel.value = true;
      if (hasActiveRules.value === true && props.lazyRules !== "ondemand" && innerLoading.value === false) {
        debouncedValidate();
      }
    }
  });
  function resetValidation() {
    validateIndex++;
    innerLoading.value = false;
    isDirtyModel.value = null;
    innerError.value = false;
    innerErrorMessage.value = null;
    debouncedValidate.cancel();
  }
  function validate(val = props.modelValue) {
    if (hasActiveRules.value !== true) {
      return true;
    }
    const index = ++validateIndex;
    const setDirty = innerLoading.value !== true ? () => {
      isDirtyModel.value = true;
    } : () => {
    };
    const update = (err, msg) => {
      err === true && setDirty();
      innerError.value = err;
      innerErrorMessage.value = msg || null;
      innerLoading.value = false;
    };
    const promises = [];
    for (let i = 0; i < props.rules.length; i++) {
      const rule = props.rules[i];
      let res;
      if (typeof rule === "function") {
        res = rule(val, testPattern);
      } else if (typeof rule === "string" && testPattern[rule] !== void 0) {
        res = testPattern[rule](val);
      }
      if (res === false || typeof res === "string") {
        update(true, res);
        return false;
      } else if (res !== true && res !== void 0) {
        promises.push(res);
      }
    }
    if (promises.length === 0) {
      update(false);
      return true;
    }
    innerLoading.value = true;
    return Promise.all(promises).then(
      (res) => {
        if (res === void 0 || Array.isArray(res) === false || res.length === 0) {
          index === validateIndex && update(false);
          return true;
        }
        const msg = res.find((r) => r === false || typeof r === "string");
        index === validateIndex && update(msg !== void 0, msg);
        return msg === void 0;
      },
      (e) => {
        if (index === validateIndex) {
          console.error(e);
          update(true);
        }
        return false;
      }
    );
  }
  function validateIfNeeded(changedRules) {
    if (hasActiveRules.value === true && props.lazyRules !== "ondemand" && (isDirtyModel.value === true || props.lazyRules !== true && changedRules !== true)) {
      debouncedValidate();
    }
  }
  const debouncedValidate = debounce(validate, 0);
  onBeforeUnmount(() => {
    unwatchRules !== void 0 && unwatchRules();
    debouncedValidate.cancel();
  });
  Object.assign(proxy, { resetValidation, validate });
  injectProp(proxy, "hasError", () => hasError.value);
  return {
    isDirtyModel,
    hasRules,
    hasError,
    errorMessage,
    validate,
    resetValidation
  };
}
const listenerRE = /^on[A-Z]/;
function useSplitAttrs(attrs, vnode) {
  const acc = {
    listeners: ref({}),
    attributes: ref({})
  };
  function update() {
    const attributes = {};
    const listeners = {};
    for (const key in attrs) {
      if (key !== "class" && key !== "style" && listenerRE.test(key) === false) {
        attributes[key] = attrs[key];
      }
    }
    for (const key in vnode.props) {
      if (listenerRE.test(key) === true) {
        listeners[key] = vnode.props[key];
      }
    }
    acc.attributes.value = attributes;
    acc.listeners.value = listeners;
  }
  onBeforeUpdate(update);
  update();
  return acc;
}
function getTargetUid(val) {
  return val === void 0 ? `f_${uid()}` : val;
}
function fieldValueIsFilled(val) {
  return val !== void 0 && val !== null && ("" + val).length > 0;
}
const useFieldProps = {
  ...useDarkProps,
  ...useValidateProps,
  label: String,
  stackLabel: Boolean,
  hint: String,
  hideHint: Boolean,
  prefix: String,
  suffix: String,
  labelColor: String,
  color: String,
  bgColor: String,
  filled: Boolean,
  outlined: Boolean,
  borderless: Boolean,
  standout: [Boolean, String],
  square: Boolean,
  loading: Boolean,
  labelSlot: Boolean,
  bottomSlots: Boolean,
  hideBottomSpace: Boolean,
  rounded: Boolean,
  dense: Boolean,
  itemAligned: Boolean,
  counter: Boolean,
  clearable: Boolean,
  clearIcon: String,
  disable: Boolean,
  readonly: Boolean,
  autofocus: Boolean,
  for: String,
  maxlength: [Number, String]
};
const useFieldEmits = ["update:modelValue", "clear", "focus", "blur", "popupShow", "popupHide"];
function useFieldState() {
  const { props, attrs, proxy, vnode } = getCurrentInstance();
  const isDark = useDark(props, proxy.$q);
  return {
    isDark,
    editable: computed(
      () => props.disable !== true && props.readonly !== true
    ),
    innerLoading: ref(false),
    focused: ref(false),
    hasPopupOpen: false,
    splitAttrs: useSplitAttrs(attrs, vnode),
    targetUid: ref(getTargetUid(props.for)),
    rootRef: ref(null),
    targetRef: ref(null),
    controlRef: ref(null)
  };
}
function useField(state) {
  const { props, emit, slots, attrs, proxy } = getCurrentInstance();
  const { $q } = proxy;
  let focusoutTimer = null;
  if (state.hasValue === void 0) {
    state.hasValue = computed(() => fieldValueIsFilled(props.modelValue));
  }
  if (state.emitValue === void 0) {
    state.emitValue = (value) => {
      emit("update:modelValue", value);
    };
  }
  if (state.controlEvents === void 0) {
    state.controlEvents = {
      onFocusin: onControlFocusin,
      onFocusout: onControlFocusout
    };
  }
  Object.assign(state, {
    clearValue,
    onControlFocusin,
    onControlFocusout,
    focus
  });
  if (state.computedCounter === void 0) {
    state.computedCounter = computed(() => {
      if (props.counter !== false) {
        const len = typeof props.modelValue === "string" || typeof props.modelValue === "number" ? ("" + props.modelValue).length : Array.isArray(props.modelValue) === true ? props.modelValue.length : 0;
        const max = props.maxlength !== void 0 ? props.maxlength : props.maxValues;
        return len + (max !== void 0 ? " / " + max : "");
      }
    });
  }
  const {
    isDirtyModel,
    hasRules,
    hasError,
    errorMessage,
    resetValidation
  } = useValidate(state.focused, state.innerLoading);
  const floatingLabel = state.floatingLabel !== void 0 ? computed(() => props.stackLabel === true || state.focused.value === true || state.floatingLabel.value === true) : computed(() => props.stackLabel === true || state.focused.value === true || state.hasValue.value === true);
  const shouldRenderBottom = computed(
    () => props.bottomSlots === true || props.hint !== void 0 || hasRules.value === true || props.counter === true || props.error !== null
  );
  const styleType = computed(() => {
    if (props.filled === true) {
      return "filled";
    }
    if (props.outlined === true) {
      return "outlined";
    }
    if (props.borderless === true) {
      return "borderless";
    }
    if (props.standout) {
      return "standout";
    }
    return "standard";
  });
  const classes = computed(
    () => `q-field row no-wrap items-start q-field--${styleType.value}` + (state.fieldClass !== void 0 ? ` ${state.fieldClass.value}` : "") + (props.rounded === true ? " q-field--rounded" : "") + (props.square === true ? " q-field--square" : "") + (floatingLabel.value === true ? " q-field--float" : "") + (hasLabel.value === true ? " q-field--labeled" : "") + (props.dense === true ? " q-field--dense" : "") + (props.itemAligned === true ? " q-field--item-aligned q-item-type" : "") + (state.isDark.value === true ? " q-field--dark" : "") + (state.getControl === void 0 ? " q-field--auto-height" : "") + (state.focused.value === true ? " q-field--focused" : "") + (hasError.value === true ? " q-field--error" : "") + (hasError.value === true || state.focused.value === true ? " q-field--highlighted" : "") + (props.hideBottomSpace !== true && shouldRenderBottom.value === true ? " q-field--with-bottom" : "") + (props.disable === true ? " q-field--disabled" : props.readonly === true ? " q-field--readonly" : "")
  );
  const contentClass = computed(
    () => "q-field__control relative-position row no-wrap" + (props.bgColor !== void 0 ? ` bg-${props.bgColor}` : "") + (hasError.value === true ? " text-negative" : typeof props.standout === "string" && props.standout.length > 0 && state.focused.value === true ? ` ${props.standout}` : props.color !== void 0 ? ` text-${props.color}` : "")
  );
  const hasLabel = computed(
    () => props.labelSlot === true || props.label !== void 0
  );
  const labelClass = computed(
    () => "q-field__label no-pointer-events absolute ellipsis" + (props.labelColor !== void 0 && hasError.value !== true ? ` text-${props.labelColor}` : "")
  );
  const controlSlotScope = computed(() => ({
    id: state.targetUid.value,
    editable: state.editable.value,
    focused: state.focused.value,
    floatingLabel: floatingLabel.value,
    modelValue: props.modelValue,
    emitValue: state.emitValue
  }));
  const attributes = computed(() => {
    const acc = {
      for: state.targetUid.value
    };
    if (props.disable === true) {
      acc["aria-disabled"] = "true";
    } else if (props.readonly === true) {
      acc["aria-readonly"] = "true";
    }
    return acc;
  });
  watch(() => props.for, (val) => {
    state.targetUid.value = getTargetUid(val);
  });
  function focusHandler() {
    const el = document.activeElement;
    let target = state.targetRef !== void 0 && state.targetRef.value;
    if (target && (el === null || el.id !== state.targetUid.value)) {
      target.hasAttribute("tabindex") === true || (target = target.querySelector("[tabindex]"));
      if (target && target !== el) {
        target.focus({ preventScroll: true });
      }
    }
  }
  function focus() {
    addFocusFn(focusHandler);
  }
  function blur() {
    removeFocusFn(focusHandler);
    const el = document.activeElement;
    if (el !== null && state.rootRef.value.contains(el)) {
      el.blur();
    }
  }
  function onControlFocusin(e) {
    if (focusoutTimer !== null) {
      clearTimeout(focusoutTimer);
      focusoutTimer = null;
    }
    if (state.editable.value === true && state.focused.value === false) {
      state.focused.value = true;
      emit("focus", e);
    }
  }
  function onControlFocusout(e, then) {
    focusoutTimer !== null && clearTimeout(focusoutTimer);
    focusoutTimer = setTimeout(() => {
      focusoutTimer = null;
      if (document.hasFocus() === true && (state.hasPopupOpen === true || state.controlRef === void 0 || state.controlRef.value === null || state.controlRef.value.contains(document.activeElement) !== false)) {
        return;
      }
      if (state.focused.value === true) {
        state.focused.value = false;
        emit("blur", e);
      }
      then !== void 0 && then();
    });
  }
  function clearValue(e) {
    stopAndPrevent(e);
    if ($q.platform.is.mobile !== true) {
      const el = state.targetRef !== void 0 && state.targetRef.value || state.rootRef.value;
      el.focus();
    } else if (state.rootRef.value.contains(document.activeElement) === true) {
      document.activeElement.blur();
    }
    if (props.type === "file") {
      state.inputRef.value.value = null;
    }
    emit("update:modelValue", null);
    emit("clear", props.modelValue);
    nextTick(() => {
      resetValidation();
      if ($q.platform.is.mobile !== true) {
        isDirtyModel.value = false;
      }
    });
  }
  function getContent() {
    const node = [];
    slots.prepend !== void 0 && node.push(
      h("div", {
        class: "q-field__prepend q-field__marginal row no-wrap items-center",
        key: "prepend",
        onClick: prevent
      }, slots.prepend())
    );
    node.push(
      h("div", {
        class: "q-field__control-container col relative-position row no-wrap q-anchor--skip"
      }, getControlContainer())
    );
    hasError.value === true && props.noErrorIcon === false && node.push(
      getInnerAppendNode("error", [
        h(QIcon, { name: $q.iconSet.field.error, color: "negative" })
      ])
    );
    if (props.loading === true || state.innerLoading.value === true) {
      node.push(
        getInnerAppendNode(
          "inner-loading-append",
          slots.loading !== void 0 ? slots.loading() : [h(QSpinner, { color: props.color })]
        )
      );
    } else if (props.clearable === true && state.hasValue.value === true && state.editable.value === true) {
      node.push(
        getInnerAppendNode("inner-clearable-append", [
          h(QIcon, {
            class: "q-field__focusable-action",
            tag: "button",
            name: props.clearIcon || $q.iconSet.field.clear,
            tabindex: 0,
            type: "button",
            "aria-hidden": null,
            role: null,
            onClick: clearValue
          })
        ])
      );
    }
    slots.append !== void 0 && node.push(
      h("div", {
        class: "q-field__append q-field__marginal row no-wrap items-center",
        key: "append",
        onClick: prevent
      }, slots.append())
    );
    state.getInnerAppend !== void 0 && node.push(
      getInnerAppendNode("inner-append", state.getInnerAppend())
    );
    state.getControlChild !== void 0 && node.push(
      state.getControlChild()
    );
    return node;
  }
  function getControlContainer() {
    const node = [];
    props.prefix !== void 0 && props.prefix !== null && node.push(
      h("div", {
        class: "q-field__prefix no-pointer-events row items-center"
      }, props.prefix)
    );
    if (state.getShadowControl !== void 0 && state.hasShadow.value === true) {
      node.push(
        state.getShadowControl()
      );
    }
    if (state.getControl !== void 0) {
      node.push(state.getControl());
    } else if (slots.rawControl !== void 0) {
      node.push(slots.rawControl());
    } else if (slots.control !== void 0) {
      node.push(
        h("div", {
          ref: state.targetRef,
          class: "q-field__native row",
          tabindex: -1,
          ...state.splitAttrs.attributes.value,
          "data-autofocus": props.autofocus === true || void 0
        }, slots.control(controlSlotScope.value))
      );
    }
    hasLabel.value === true && node.push(
      h("div", {
        class: labelClass.value
      }, hSlot(slots.label, props.label))
    );
    props.suffix !== void 0 && props.suffix !== null && node.push(
      h("div", {
        class: "q-field__suffix no-pointer-events row items-center"
      }, props.suffix)
    );
    return node.concat(hSlot(slots.default));
  }
  function getBottom() {
    let msg, key;
    if (hasError.value === true) {
      if (errorMessage.value !== null) {
        msg = [h("div", { role: "alert" }, errorMessage.value)];
        key = `q--slot-error-${errorMessage.value}`;
      } else {
        msg = hSlot(slots.error);
        key = "q--slot-error";
      }
    } else if (props.hideHint !== true || state.focused.value === true) {
      if (props.hint !== void 0) {
        msg = [h("div", props.hint)];
        key = `q--slot-hint-${props.hint}`;
      } else {
        msg = hSlot(slots.hint);
        key = "q--slot-hint";
      }
    }
    const hasCounter = props.counter === true || slots.counter !== void 0;
    if (props.hideBottomSpace === true && hasCounter === false && msg === void 0) {
      return;
    }
    const main = h("div", {
      key,
      class: "q-field__messages col"
    }, msg);
    return h("div", {
      class: "q-field__bottom row items-start q-field__bottom--" + (props.hideBottomSpace !== true ? "animated" : "stale"),
      onClick: prevent
    }, [
      props.hideBottomSpace === true ? main : h(Transition, { name: "q-transition--field-message" }, () => main),
      hasCounter === true ? h("div", {
        class: "q-field__counter"
      }, slots.counter !== void 0 ? slots.counter() : state.computedCounter.value) : null
    ]);
  }
  function getInnerAppendNode(key, content) {
    return content === null ? null : h("div", {
      key,
      class: "q-field__append q-field__marginal row no-wrap items-center q-anchor--skip"
    }, content);
  }
  let shouldActivate = false;
  onDeactivated(() => {
    shouldActivate = true;
  });
  onActivated(() => {
    shouldActivate === true && props.autofocus === true && proxy.focus();
  });
  onMounted(() => {
    if (isRuntimeSsrPreHydration.value === true && props.for === void 0) {
      state.targetUid.value = getTargetUid();
    }
    props.autofocus === true && proxy.focus();
  });
  onBeforeUnmount(() => {
    focusoutTimer !== null && clearTimeout(focusoutTimer);
  });
  Object.assign(proxy, { focus, blur });
  return function renderField() {
    const labelAttrs = state.getControl === void 0 && slots.control === void 0 ? {
      ...state.splitAttrs.attributes.value,
      "data-autofocus": props.autofocus === true || void 0,
      ...attributes.value
    } : attributes.value;
    return h("label", {
      ref: state.rootRef,
      class: [
        classes.value,
        attrs.class
      ],
      style: attrs.style,
      ...labelAttrs
    }, [
      slots.before !== void 0 ? h("div", {
        class: "q-field__before q-field__marginal row no-wrap items-center",
        onClick: prevent
      }, slots.before()) : null,
      h("div", {
        class: "q-field__inner relative-position col self-stretch"
      }, [
        h("div", {
          ref: state.controlRef,
          class: contentClass.value,
          tabindex: -1,
          ...state.controlEvents
        }, getContent()),
        shouldRenderBottom.value === true ? getBottom() : null
      ]),
      slots.after !== void 0 ? h("div", {
        class: "q-field__after q-field__marginal row no-wrap items-center",
        onClick: prevent
      }, slots.after()) : null
    ]);
  };
}
const NAMED_MASKS = {
  date: "####/##/##",
  datetime: "####/##/## ##:##",
  time: "##:##",
  fulltime: "##:##:##",
  phone: "(###) ### - ####",
  card: "#### #### #### ####"
};
const TOKENS = {
  "#": { pattern: "[\\d]", negate: "[^\\d]" },
  S: { pattern: "[a-zA-Z]", negate: "[^a-zA-Z]" },
  N: { pattern: "[0-9a-zA-Z]", negate: "[^0-9a-zA-Z]" },
  A: { pattern: "[a-zA-Z]", negate: "[^a-zA-Z]", transform: (v) => v.toLocaleUpperCase() },
  a: { pattern: "[a-zA-Z]", negate: "[^a-zA-Z]", transform: (v) => v.toLocaleLowerCase() },
  X: { pattern: "[0-9a-zA-Z]", negate: "[^0-9a-zA-Z]", transform: (v) => v.toLocaleUpperCase() },
  x: { pattern: "[0-9a-zA-Z]", negate: "[^0-9a-zA-Z]", transform: (v) => v.toLocaleLowerCase() }
};
const KEYS = Object.keys(TOKENS);
KEYS.forEach((key) => {
  TOKENS[key].regex = new RegExp(TOKENS[key].pattern);
});
const tokenRegexMask = new RegExp("\\\\([^.*+?^${}()|([\\]])|([.*+?^${}()|[\\]])|([" + KEYS.join("") + "])|(.)", "g"), escRegex = /[.*+?^${}()|[\]\\]/g;
const MARKER = String.fromCharCode(1);
const useMaskProps = {
  mask: String,
  reverseFillMask: Boolean,
  fillMask: [Boolean, String],
  unmaskedValue: Boolean
};
function useMask(props, emit, emitValue, inputRef) {
  let maskMarked, maskReplaced, computedMask, computedUnmask, pastedTextStart, selectionAnchor;
  const hasMask = ref(null);
  const innerValue = ref(getInitialMaskedValue());
  function getIsTypeText() {
    return props.autogrow === true || ["textarea", "text", "search", "url", "tel", "password"].includes(props.type);
  }
  watch(() => props.type + props.autogrow, updateMaskInternals);
  watch(() => props.mask, (v) => {
    if (v !== void 0) {
      updateMaskValue(innerValue.value, true);
    } else {
      const val = unmaskValue(innerValue.value);
      updateMaskInternals();
      props.modelValue !== val && emit("update:modelValue", val);
    }
  });
  watch(() => props.fillMask + props.reverseFillMask, () => {
    hasMask.value === true && updateMaskValue(innerValue.value, true);
  });
  watch(() => props.unmaskedValue, () => {
    hasMask.value === true && updateMaskValue(innerValue.value);
  });
  function getInitialMaskedValue() {
    updateMaskInternals();
    if (hasMask.value === true) {
      const masked = maskValue(unmaskValue(props.modelValue));
      return props.fillMask !== false ? fillWithMask(masked) : masked;
    }
    return props.modelValue;
  }
  function getPaddedMaskMarked(size) {
    if (size < maskMarked.length) {
      return maskMarked.slice(-size);
    }
    let pad = "", localMaskMarked = maskMarked;
    const padPos = localMaskMarked.indexOf(MARKER);
    if (padPos > -1) {
      for (let i = size - localMaskMarked.length; i > 0; i--) {
        pad += MARKER;
      }
      localMaskMarked = localMaskMarked.slice(0, padPos) + pad + localMaskMarked.slice(padPos);
    }
    return localMaskMarked;
  }
  function updateMaskInternals() {
    hasMask.value = props.mask !== void 0 && props.mask.length > 0 && getIsTypeText();
    if (hasMask.value === false) {
      computedUnmask = void 0;
      maskMarked = "";
      maskReplaced = "";
      return;
    }
    const localComputedMask = NAMED_MASKS[props.mask] === void 0 ? props.mask : NAMED_MASKS[props.mask], fillChar = typeof props.fillMask === "string" && props.fillMask.length > 0 ? props.fillMask.slice(0, 1) : "_", fillCharEscaped = fillChar.replace(escRegex, "\\$&"), unmask = [], extract = [], mask = [];
    let firstMatch = props.reverseFillMask === true, unmaskChar = "", negateChar = "";
    localComputedMask.replace(tokenRegexMask, (_, char1, esc, token, char2) => {
      if (token !== void 0) {
        const c = TOKENS[token];
        mask.push(c);
        negateChar = c.negate;
        if (firstMatch === true) {
          extract.push("(?:" + negateChar + "+)?(" + c.pattern + "+)?(?:" + negateChar + "+)?(" + c.pattern + "+)?");
          firstMatch = false;
        }
        extract.push("(?:" + negateChar + "+)?(" + c.pattern + ")?");
      } else if (esc !== void 0) {
        unmaskChar = "\\" + (esc === "\\" ? "" : esc);
        mask.push(esc);
        unmask.push("([^" + unmaskChar + "]+)?" + unmaskChar + "?");
      } else {
        const c = char1 !== void 0 ? char1 : char2;
        unmaskChar = c === "\\" ? "\\\\\\\\" : c.replace(escRegex, "\\\\$&");
        mask.push(c);
        unmask.push("([^" + unmaskChar + "]+)?" + unmaskChar + "?");
      }
    });
    const unmaskMatcher = new RegExp(
      "^" + unmask.join("") + "(" + (unmaskChar === "" ? "." : "[^" + unmaskChar + "]") + "+)?" + (unmaskChar === "" ? "" : "[" + unmaskChar + "]*") + "$"
    ), extractLast = extract.length - 1, extractMatcher = extract.map((re, index) => {
      if (index === 0 && props.reverseFillMask === true) {
        return new RegExp("^" + fillCharEscaped + "*" + re);
      } else if (index === extractLast) {
        return new RegExp(
          "^" + re + "(" + (negateChar === "" ? "." : negateChar) + "+)?" + (props.reverseFillMask === true ? "$" : fillCharEscaped + "*")
        );
      }
      return new RegExp("^" + re);
    });
    computedMask = mask;
    computedUnmask = (val) => {
      const unmaskMatch = unmaskMatcher.exec(props.reverseFillMask === true ? val : val.slice(0, mask.length + 1));
      if (unmaskMatch !== null) {
        val = unmaskMatch.slice(1).join("");
      }
      const extractMatch = [], extractMatcherLength = extractMatcher.length;
      for (let i = 0, str = val; i < extractMatcherLength; i++) {
        const m = extractMatcher[i].exec(str);
        if (m === null) {
          break;
        }
        str = str.slice(m.shift().length);
        extractMatch.push(...m);
      }
      if (extractMatch.length > 0) {
        return extractMatch.join("");
      }
      return val;
    };
    maskMarked = mask.map((v) => typeof v === "string" ? v : MARKER).join("");
    maskReplaced = maskMarked.split(MARKER).join(fillChar);
  }
  function updateMaskValue(rawVal, updateMaskInternalsFlag, inputType) {
    const inp = inputRef.value, end = inp.selectionEnd, endReverse = inp.value.length - end, unmasked = unmaskValue(rawVal);
    updateMaskInternalsFlag === true && updateMaskInternals();
    const preMasked = maskValue(unmasked), masked = props.fillMask !== false ? fillWithMask(preMasked) : preMasked, changed = innerValue.value !== masked;
    inp.value !== masked && (inp.value = masked);
    changed === true && (innerValue.value = masked);
    document.activeElement === inp && nextTick(() => {
      if (masked === maskReplaced) {
        const cursor = props.reverseFillMask === true ? maskReplaced.length : 0;
        inp.setSelectionRange(cursor, cursor, "forward");
        return;
      }
      if (inputType === "insertFromPaste" && props.reverseFillMask !== true) {
        const maxEnd = inp.selectionEnd;
        let cursor = end - 1;
        for (let i = pastedTextStart; i <= cursor && i < maxEnd; i++) {
          if (maskMarked[i] !== MARKER) {
            cursor++;
          }
        }
        moveCursor.right(inp, cursor);
        return;
      }
      if (["deleteContentBackward", "deleteContentForward"].indexOf(inputType) > -1) {
        const cursor = props.reverseFillMask === true ? end === 0 ? masked.length > preMasked.length ? 1 : 0 : Math.max(0, masked.length - (masked === maskReplaced ? 0 : Math.min(preMasked.length, endReverse) + 1)) + 1 : end;
        inp.setSelectionRange(cursor, cursor, "forward");
        return;
      }
      if (props.reverseFillMask === true) {
        if (changed === true) {
          const cursor = Math.max(0, masked.length - (masked === maskReplaced ? 0 : Math.min(preMasked.length, endReverse + 1)));
          if (cursor === 1 && end === 1) {
            inp.setSelectionRange(cursor, cursor, "forward");
          } else {
            moveCursor.rightReverse(inp, cursor);
          }
        } else {
          const cursor = masked.length - endReverse;
          inp.setSelectionRange(cursor, cursor, "backward");
        }
      } else {
        if (changed === true) {
          const cursor = Math.max(0, maskMarked.indexOf(MARKER), Math.min(preMasked.length, end) - 1);
          moveCursor.right(inp, cursor);
        } else {
          const cursor = end - 1;
          moveCursor.right(inp, cursor);
        }
      }
    });
    const val = props.unmaskedValue === true ? unmaskValue(masked) : masked;
    String(props.modelValue) !== val && emitValue(val, true);
  }
  function moveCursorForPaste(inp, start, end) {
    const preMasked = maskValue(unmaskValue(inp.value));
    start = Math.max(0, maskMarked.indexOf(MARKER), Math.min(preMasked.length, start));
    pastedTextStart = start;
    inp.setSelectionRange(start, end, "forward");
  }
  const moveCursor = {
    left(inp, cursor) {
      const noMarkBefore = maskMarked.slice(cursor - 1).indexOf(MARKER) === -1;
      let i = Math.max(0, cursor - 1);
      for (; i >= 0; i--) {
        if (maskMarked[i] === MARKER) {
          cursor = i;
          noMarkBefore === true && cursor++;
          break;
        }
      }
      if (i < 0 && maskMarked[cursor] !== void 0 && maskMarked[cursor] !== MARKER) {
        return moveCursor.right(inp, 0);
      }
      cursor >= 0 && inp.setSelectionRange(cursor, cursor, "backward");
    },
    right(inp, cursor) {
      const limit = inp.value.length;
      let i = Math.min(limit, cursor + 1);
      for (; i <= limit; i++) {
        if (maskMarked[i] === MARKER) {
          cursor = i;
          break;
        } else if (maskMarked[i - 1] === MARKER) {
          cursor = i;
        }
      }
      if (i > limit && maskMarked[cursor - 1] !== void 0 && maskMarked[cursor - 1] !== MARKER) {
        return moveCursor.left(inp, limit);
      }
      inp.setSelectionRange(cursor, cursor, "forward");
    },
    leftReverse(inp, cursor) {
      const localMaskMarked = getPaddedMaskMarked(inp.value.length);
      let i = Math.max(0, cursor - 1);
      for (; i >= 0; i--) {
        if (localMaskMarked[i - 1] === MARKER) {
          cursor = i;
          break;
        } else if (localMaskMarked[i] === MARKER) {
          cursor = i;
          if (i === 0) {
            break;
          }
        }
      }
      if (i < 0 && localMaskMarked[cursor] !== void 0 && localMaskMarked[cursor] !== MARKER) {
        return moveCursor.rightReverse(inp, 0);
      }
      cursor >= 0 && inp.setSelectionRange(cursor, cursor, "backward");
    },
    rightReverse(inp, cursor) {
      const limit = inp.value.length, localMaskMarked = getPaddedMaskMarked(limit), noMarkBefore = localMaskMarked.slice(0, cursor + 1).indexOf(MARKER) === -1;
      let i = Math.min(limit, cursor + 1);
      for (; i <= limit; i++) {
        if (localMaskMarked[i - 1] === MARKER) {
          cursor = i;
          cursor > 0 && noMarkBefore === true && cursor--;
          break;
        }
      }
      if (i > limit && localMaskMarked[cursor - 1] !== void 0 && localMaskMarked[cursor - 1] !== MARKER) {
        return moveCursor.leftReverse(inp, limit);
      }
      inp.setSelectionRange(cursor, cursor, "forward");
    }
  };
  function onMaskedClick(e) {
    emit("click", e);
    selectionAnchor = void 0;
  }
  function onMaskedKeydown(e) {
    emit("keydown", e);
    if (shouldIgnoreKey(e) === true) {
      return;
    }
    const inp = inputRef.value, start = inp.selectionStart, end = inp.selectionEnd;
    if (!e.shiftKey) {
      selectionAnchor = void 0;
    }
    if (e.keyCode === 37 || e.keyCode === 39) {
      if (e.shiftKey && selectionAnchor === void 0) {
        selectionAnchor = inp.selectionDirection === "forward" ? start : end;
      }
      const fn = moveCursor[(e.keyCode === 39 ? "right" : "left") + (props.reverseFillMask === true ? "Reverse" : "")];
      e.preventDefault();
      fn(inp, selectionAnchor === start ? end : start);
      if (e.shiftKey) {
        const cursor = inp.selectionStart;
        inp.setSelectionRange(Math.min(selectionAnchor, cursor), Math.max(selectionAnchor, cursor), "forward");
      }
    } else if (e.keyCode === 8 && props.reverseFillMask !== true && start === end) {
      moveCursor.left(inp, start);
      inp.setSelectionRange(inp.selectionStart, end, "backward");
    } else if (e.keyCode === 46 && props.reverseFillMask === true && start === end) {
      moveCursor.rightReverse(inp, end);
      inp.setSelectionRange(start, inp.selectionEnd, "forward");
    }
  }
  function maskValue(val) {
    if (val === void 0 || val === null || val === "") {
      return "";
    }
    if (props.reverseFillMask === true) {
      return maskValueReverse(val);
    }
    const mask = computedMask;
    let valIndex = 0, output = "";
    for (let maskIndex = 0; maskIndex < mask.length; maskIndex++) {
      const valChar = val[valIndex], maskDef = mask[maskIndex];
      if (typeof maskDef === "string") {
        output += maskDef;
        valChar === maskDef && valIndex++;
      } else if (valChar !== void 0 && maskDef.regex.test(valChar)) {
        output += maskDef.transform !== void 0 ? maskDef.transform(valChar) : valChar;
        valIndex++;
      } else {
        return output;
      }
    }
    return output;
  }
  function maskValueReverse(val) {
    const mask = computedMask, firstTokenIndex = maskMarked.indexOf(MARKER);
    let valIndex = val.length - 1, output = "";
    for (let maskIndex = mask.length - 1; maskIndex >= 0 && valIndex > -1; maskIndex--) {
      const maskDef = mask[maskIndex];
      let valChar = val[valIndex];
      if (typeof maskDef === "string") {
        output = maskDef + output;
        valChar === maskDef && valIndex--;
      } else if (valChar !== void 0 && maskDef.regex.test(valChar)) {
        do {
          output = (maskDef.transform !== void 0 ? maskDef.transform(valChar) : valChar) + output;
          valIndex--;
          valChar = val[valIndex];
        } while (firstTokenIndex === maskIndex && valChar !== void 0 && maskDef.regex.test(valChar));
      } else {
        return output;
      }
    }
    return output;
  }
  function unmaskValue(val) {
    return typeof val !== "string" || computedUnmask === void 0 ? typeof val === "number" ? computedUnmask("" + val) : val : computedUnmask(val);
  }
  function fillWithMask(val) {
    if (maskReplaced.length - val.length <= 0) {
      return val;
    }
    return props.reverseFillMask === true && val.length > 0 ? maskReplaced.slice(0, -val.length) + val : val + maskReplaced.slice(val.length);
  }
  return {
    innerValue,
    hasMask,
    moveCursorForPaste,
    updateMaskValue,
    onMaskedKeydown,
    onMaskedClick
  };
}
function useFileFormDomProps(props, typeGuard) {
  function getFormDomProps() {
    const model = props.modelValue;
    try {
      const dt = "DataTransfer" in window ? new DataTransfer() : "ClipboardEvent" in window ? new ClipboardEvent("").clipboardData : void 0;
      if (Object(model) === model) {
        ("length" in model ? Array.from(model) : [model]).forEach((file) => {
          dt.items.add(file);
        });
      }
      return {
        files: dt.files
      };
    } catch (e) {
      return {
        files: void 0
      };
    }
  }
  return typeGuard === true ? computed(() => {
    if (props.type !== "file") {
      return;
    }
    return getFormDomProps();
  }) : computed(getFormDomProps);
}
const isJapanese = /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/;
const isChinese = /[\u4e00-\u9fff\u3400-\u4dbf\u{20000}-\u{2a6df}\u{2a700}-\u{2b73f}\u{2b740}-\u{2b81f}\u{2b820}-\u{2ceaf}\uf900-\ufaff\u3300-\u33ff\ufe30-\ufe4f\uf900-\ufaff\u{2f800}-\u{2fa1f}]/u;
const isKorean = /[\u3131-\u314e\u314f-\u3163\uac00-\ud7a3]/;
const isPlainText = /[a-z0-9_ -]$/i;
function useKeyComposition(onInput) {
  return function onComposition(e) {
    if (e.type === "compositionend" || e.type === "change") {
      if (e.target.qComposing !== true) {
        return;
      }
      e.target.qComposing = false;
      onInput(e);
    } else if (e.type === "compositionupdate" && e.target.qComposing !== true && typeof e.data === "string") {
      const isComposing = client.is.firefox === true ? isPlainText.test(e.data) === false : isJapanese.test(e.data) === true || isChinese.test(e.data) === true || isKorean.test(e.data) === true;
      if (isComposing === true) {
        e.target.qComposing = true;
      }
    }
  };
}
var QInput = createComponent({
  name: "QInput",
  inheritAttrs: false,
  props: {
    ...useFieldProps,
    ...useMaskProps,
    ...useFormProps,
    modelValue: { required: false },
    shadowText: String,
    type: {
      type: String,
      default: "text"
    },
    debounce: [String, Number],
    autogrow: Boolean,
    inputClass: [Array, String, Object],
    inputStyle: [Array, String, Object]
  },
  emits: [
    ...useFieldEmits,
    "paste",
    "change",
    "keydown",
    "click",
    "animationend"
  ],
  setup(props, { emit, attrs }) {
    const { proxy } = getCurrentInstance();
    const { $q } = proxy;
    const temp = {};
    let emitCachedValue = NaN, typedNumber, stopValueWatcher, emitTimer = null, emitValueFn;
    const inputRef = ref(null);
    const nameProp = useFormInputNameAttr(props);
    const {
      innerValue,
      hasMask,
      moveCursorForPaste,
      updateMaskValue,
      onMaskedKeydown,
      onMaskedClick
    } = useMask(props, emit, emitValue, inputRef);
    const formDomProps = useFileFormDomProps(props, true);
    const hasValue = computed(() => fieldValueIsFilled(innerValue.value));
    const onComposition = useKeyComposition(onInput);
    const state = useFieldState();
    const isTextarea = computed(
      () => props.type === "textarea" || props.autogrow === true
    );
    const isTypeText = computed(
      () => isTextarea.value === true || ["text", "search", "url", "tel", "password"].includes(props.type)
    );
    const onEvents = computed(() => {
      const evt = {
        ...state.splitAttrs.listeners.value,
        onInput,
        onPaste,
        onChange,
        onBlur: onFinishEditing,
        onFocus: stop
      };
      evt.onCompositionstart = evt.onCompositionupdate = evt.onCompositionend = onComposition;
      if (hasMask.value === true) {
        evt.onKeydown = onMaskedKeydown;
        evt.onClick = onMaskedClick;
      }
      if (props.autogrow === true) {
        evt.onAnimationend = onAnimationend;
      }
      return evt;
    });
    const inputAttrs = computed(() => {
      const attrs2 = {
        tabindex: 0,
        "data-autofocus": props.autofocus === true || void 0,
        rows: props.type === "textarea" ? 6 : void 0,
        "aria-label": props.label,
        name: nameProp.value,
        ...state.splitAttrs.attributes.value,
        id: state.targetUid.value,
        maxlength: props.maxlength,
        disabled: props.disable === true,
        readonly: props.readonly === true
      };
      if (isTextarea.value === false) {
        attrs2.type = props.type;
      }
      if (props.autogrow === true) {
        attrs2.rows = 1;
      }
      return attrs2;
    });
    watch(() => props.type, () => {
      if (inputRef.value) {
        inputRef.value.value = props.modelValue;
      }
    });
    watch(() => props.modelValue, (v) => {
      if (hasMask.value === true) {
        if (stopValueWatcher === true) {
          stopValueWatcher = false;
          if (String(v) === emitCachedValue) {
            return;
          }
        }
        updateMaskValue(v);
      } else if (innerValue.value !== v) {
        innerValue.value = v;
        if (props.type === "number" && temp.hasOwnProperty("value") === true) {
          if (typedNumber === true) {
            typedNumber = false;
          } else {
            delete temp.value;
          }
        }
      }
      props.autogrow === true && nextTick(adjustHeight);
    });
    watch(() => props.autogrow, (val) => {
      if (val === true) {
        nextTick(adjustHeight);
      } else if (inputRef.value !== null && attrs.rows > 0) {
        inputRef.value.style.height = "auto";
      }
    });
    watch(() => props.dense, () => {
      props.autogrow === true && nextTick(adjustHeight);
    });
    function focus() {
      addFocusFn(() => {
        const el = document.activeElement;
        if (inputRef.value !== null && inputRef.value !== el && (el === null || el.id !== state.targetUid.value)) {
          inputRef.value.focus({ preventScroll: true });
        }
      });
    }
    function select() {
      inputRef.value !== null && inputRef.value.select();
    }
    function onPaste(e) {
      if (hasMask.value === true && props.reverseFillMask !== true) {
        const inp = e.target;
        moveCursorForPaste(inp, inp.selectionStart, inp.selectionEnd);
      }
      emit("paste", e);
    }
    function onInput(e) {
      if (!e || !e.target) {
        return;
      }
      if (props.type === "file") {
        emit("update:modelValue", e.target.files);
        return;
      }
      const val = e.target.value;
      if (e.target.qComposing === true) {
        temp.value = val;
        return;
      }
      if (hasMask.value === true) {
        updateMaskValue(val, false, e.inputType);
      } else {
        emitValue(val);
        if (isTypeText.value === true && e.target === document.activeElement) {
          const { selectionStart, selectionEnd } = e.target;
          if (selectionStart !== void 0 && selectionEnd !== void 0) {
            nextTick(() => {
              if (e.target === document.activeElement && val.indexOf(e.target.value) === 0) {
                e.target.setSelectionRange(selectionStart, selectionEnd);
              }
            });
          }
        }
      }
      props.autogrow === true && adjustHeight();
    }
    function onAnimationend(e) {
      emit("animationend", e);
      adjustHeight();
    }
    function emitValue(val, stopWatcher) {
      emitValueFn = () => {
        emitTimer = null;
        if (props.type !== "number" && temp.hasOwnProperty("value") === true) {
          delete temp.value;
        }
        if (props.modelValue !== val && emitCachedValue !== val) {
          emitCachedValue = val;
          stopWatcher === true && (stopValueWatcher = true);
          emit("update:modelValue", val);
          nextTick(() => {
            emitCachedValue === val && (emitCachedValue = NaN);
          });
        }
        emitValueFn = void 0;
      };
      if (props.type === "number") {
        typedNumber = true;
        temp.value = val;
      }
      if (props.debounce !== void 0) {
        emitTimer !== null && clearTimeout(emitTimer);
        temp.value = val;
        emitTimer = setTimeout(emitValueFn, props.debounce);
      } else {
        emitValueFn();
      }
    }
    function adjustHeight() {
      requestAnimationFrame(() => {
        const inp = inputRef.value;
        if (inp !== null) {
          const parentStyle = inp.parentNode.style;
          const { scrollTop } = inp;
          const { overflowY, maxHeight } = $q.platform.is.firefox === true ? {} : window.getComputedStyle(inp);
          const changeOverflow = overflowY !== void 0 && overflowY !== "scroll";
          changeOverflow === true && (inp.style.overflowY = "hidden");
          parentStyle.marginBottom = inp.scrollHeight - 1 + "px";
          inp.style.height = "1px";
          inp.style.height = inp.scrollHeight + "px";
          changeOverflow === true && (inp.style.overflowY = parseInt(maxHeight, 10) < inp.scrollHeight ? "auto" : "hidden");
          parentStyle.marginBottom = "";
          inp.scrollTop = scrollTop;
        }
      });
    }
    function onChange(e) {
      onComposition(e);
      if (emitTimer !== null) {
        clearTimeout(emitTimer);
        emitTimer = null;
      }
      emitValueFn !== void 0 && emitValueFn();
      emit("change", e.target.value);
    }
    function onFinishEditing(e) {
      e !== void 0 && stop(e);
      if (emitTimer !== null) {
        clearTimeout(emitTimer);
        emitTimer = null;
      }
      emitValueFn !== void 0 && emitValueFn();
      typedNumber = false;
      stopValueWatcher = false;
      delete temp.value;
      props.type !== "file" && setTimeout(() => {
        if (inputRef.value !== null) {
          inputRef.value.value = innerValue.value !== void 0 ? innerValue.value : "";
        }
      });
    }
    function getCurValue() {
      return temp.hasOwnProperty("value") === true ? temp.value : innerValue.value !== void 0 ? innerValue.value : "";
    }
    onBeforeUnmount(() => {
      onFinishEditing();
    });
    onMounted(() => {
      props.autogrow === true && adjustHeight();
    });
    Object.assign(state, {
      innerValue,
      fieldClass: computed(
        () => `q-${isTextarea.value === true ? "textarea" : "input"}` + (props.autogrow === true ? " q-textarea--autogrow" : "")
      ),
      hasShadow: computed(
        () => props.type !== "file" && typeof props.shadowText === "string" && props.shadowText.length > 0
      ),
      inputRef,
      emitValue,
      hasValue,
      floatingLabel: computed(
        () => hasValue.value === true && (props.type !== "number" || isNaN(innerValue.value) === false) || fieldValueIsFilled(props.displayValue)
      ),
      getControl: () => {
        return h(isTextarea.value === true ? "textarea" : "input", {
          ref: inputRef,
          class: [
            "q-field__native q-placeholder",
            props.inputClass
          ],
          style: props.inputStyle,
          ...inputAttrs.value,
          ...onEvents.value,
          ...props.type !== "file" ? { value: getCurValue() } : formDomProps.value
        });
      },
      getShadowControl: () => {
        return h("div", {
          class: "q-field__native q-field__shadow absolute-bottom no-pointer-events" + (isTextarea.value === true ? "" : " text-no-wrap")
        }, [
          h("span", { class: "invisible" }, getCurValue()),
          h("span", props.shadowText)
        ]);
      }
    });
    const renderFn = useField(state);
    Object.assign(proxy, {
      focus,
      select,
      getNativeElement: () => inputRef.value
    });
    injectProp(proxy, "nativeEl", () => inputRef.value);
    return renderFn;
  }
});
export { QInput as Q, useFieldEmits as a, useField as b, useFieldState as c, useKeyComposition as d, useFileFormDomProps as e, fieldValueIsFilled as f, useFieldProps as u };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUUlucHV0Ljc5MjgzZjA4LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy91c2UtZm9ybS1jaGlsZC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL3V0aWxzL3BhdHRlcm5zLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtdmFsaWRhdGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1zcGxpdC1hdHRycy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWZpZWxkLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9pbnB1dC91c2UtbWFzay5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWZpbGUtZG9tLXByb3BzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvcHJpdmF0ZS91c2Uta2V5LWNvbXBvc2l0aW9uLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9pbnB1dC9RSW5wdXQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaW5qZWN0LCB3YXRjaCwgZ2V0Q3VycmVudEluc3RhbmNlLCBvbk1vdW50ZWQsIG9uQmVmb3JlVW5tb3VudCB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgZm9ybUtleSB9IGZyb20gJy4uL3V0aWxzL3ByaXZhdGUvc3ltYm9scy5qcydcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHsgdmFsaWRhdGUsIHJlc2V0VmFsaWRhdGlvbiwgcmVxdWlyZXNRRm9ybSB9KSB7XG4gIGNvbnN0ICRmb3JtID0gaW5qZWN0KGZvcm1LZXksIGZhbHNlKVxuXG4gIGlmICgkZm9ybSAhPT0gZmFsc2UpIHtcbiAgICBjb25zdCB7IHByb3BzLCBwcm94eSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICAgIC8vIGV4cG9ydCBwdWJsaWMgbWV0aG9kIChzbyBpdCBjYW4gYmUgdXNlZCBpbiBRRm9ybSlcbiAgICBPYmplY3QuYXNzaWduKHByb3h5LCB7IHZhbGlkYXRlLCByZXNldFZhbGlkYXRpb24gfSlcblxuICAgIHdhdGNoKCgpID0+IHByb3BzLmRpc2FibGUsIHZhbCA9PiB7XG4gICAgICBpZiAodmFsID09PSB0cnVlKSB7XG4gICAgICAgIHR5cGVvZiByZXNldFZhbGlkYXRpb24gPT09ICdmdW5jdGlvbicgJiYgcmVzZXRWYWxpZGF0aW9uKClcbiAgICAgICAgJGZvcm0udW5iaW5kQ29tcG9uZW50KHByb3h5KVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgICRmb3JtLmJpbmRDb21wb25lbnQocHJveHkpXG4gICAgICB9XG4gICAgfSlcblxuICAgIG9uTW91bnRlZCgoKSA9PiB7XG4gICAgICAvLyByZWdpc3RlciB0byBwYXJlbnQgUUZvcm1cbiAgICAgIHByb3BzLmRpc2FibGUgIT09IHRydWUgJiYgJGZvcm0uYmluZENvbXBvbmVudChwcm94eSlcbiAgICB9KVxuXG4gICAgb25CZWZvcmVVbm1vdW50KCgpID0+IHtcbiAgICAgIC8vIHVuLXJlZ2lzdGVyIGZyb20gcGFyZW50IFFGb3JtXG4gICAgICBwcm9wcy5kaXNhYmxlICE9PSB0cnVlICYmICRmb3JtLnVuYmluZENvbXBvbmVudChwcm94eSlcbiAgICB9KVxuICB9XG4gIGVsc2UgaWYgKHJlcXVpcmVzUUZvcm0gPT09IHRydWUpIHtcbiAgICBjb25zb2xlLmVycm9yKCdQYXJlbnQgUUZvcm0gbm90IGZvdW5kIG9uIHVzZUZvcm1DaGlsZCgpIScpXG4gIH1cbn1cbiIsIi8vIGZpbGUgcmVmZXJlbmNlZCBmcm9tIGRvY3NcblxuY29uc3RcbiAgaGV4ID0gL14jWzAtOWEtZkEtRl17M30oWzAtOWEtZkEtRl17M30pPyQvLFxuICBoZXhhID0gL14jWzAtOWEtZkEtRl17NH0oWzAtOWEtZkEtRl17NH0pPyQvLFxuICBoZXhPckhleGEgPSAvXiMoWzAtOWEtZkEtRl17M318WzAtOWEtZkEtRl17NH18WzAtOWEtZkEtRl17Nn18WzAtOWEtZkEtRl17OH0pJC8sXG4gIHJnYiA9IC9ecmdiXFwoKCgwfFsxLTldW1xcZF0/fDFbXFxkXXswLDJ9fDJbXFxkXT98MlswLTRdW1xcZF18MjVbMC01XSksKXsyfSgwfFsxLTldW1xcZF0/fDFbXFxkXXswLDJ9fDJbXFxkXT98MlswLTRdW1xcZF18MjVbMC01XSlcXCkkLyxcbiAgcmdiYSA9IC9ecmdiYVxcKCgoMHxbMS05XVtcXGRdP3wxW1xcZF17MCwyfXwyW1xcZF0/fDJbMC00XVtcXGRdfDI1WzAtNV0pLCl7Mn0oMHxbMS05XVtcXGRdP3wxW1xcZF17MCwyfXwyW1xcZF0/fDJbMC00XVtcXGRdfDI1WzAtNV0pLCgwfDBcXC5bMC05XStbMS05XXwwXFwuWzEtOV0rfDEpXFwpJC9cblxuLy8gS2VlcCBpbiBzeW5jIHdpdGggdWkvdHlwZXMvYXBpL3ZhbGlkYXRpb24uZC50c1xuZXhwb3J0IGNvbnN0IHRlc3RQYXR0ZXJuID0ge1xuICBkYXRlOiB2ID0+IC9eLT9bXFxkXStcXC9bMC0xXVxcZFxcL1swLTNdXFxkJC8udGVzdCh2KSxcbiAgdGltZTogdiA9PiAvXihbMC0xXT9cXGR8MlswLTNdKTpbMC01XVxcZCQvLnRlc3QodiksXG4gIGZ1bGx0aW1lOiB2ID0+IC9eKFswLTFdP1xcZHwyWzAtM10pOlswLTVdXFxkOlswLTVdXFxkJC8udGVzdCh2KSxcbiAgdGltZU9yRnVsbHRpbWU6IHYgPT4gL14oWzAtMV0/XFxkfDJbMC0zXSk6WzAtNV1cXGQoOlswLTVdXFxkKT8kLy50ZXN0KHYpLFxuXG4gIC8vIC0tIFJGQyA1MzIyIC0tXG4gIC8vIC0tIEFkZGVkIGluIHYyLjYuNiAtLVxuICAvLyBUaGlzIGlzIGEgYmFzaWMgaGVscGVyIHZhbGlkYXRpb24uXG4gIC8vIEZvciBzb21ldGhpbmcgbW9yZSBjb21wbGV4IChsaWtlIFJGQyA4MjIpIHlvdSBzaG91bGQgd3JpdGUgYW5kIHVzZSB5b3VyIG93biBydWxlLlxuICAvLyBXZSB3b24ndCBiZSBhY2NlcHRpbmcgUFJzIHRvIGVuaGFuY2UgdGhlIG9uZSBiZWxvdyBiZWNhdXNlIG9mIHRoZSByZWFzb24gYWJvdmUuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICBlbWFpbDogdiA9PiAvXigoW148PigpXFxbXFxdXFxcXC4sOzpcXHNAXCJdKyhcXC5bXjw+KClcXFtcXF1cXFxcLiw7Olxcc0BcIl0rKSopfChcIi4rXCIpKUAoKFxcW1swLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31dKXwoKFthLXpBLVpcXC0wLTldK1xcLikrW2EtekEtWl17Mix9KSkkLy50ZXN0KHYpLFxuXG4gIGhleENvbG9yOiB2ID0+IGhleC50ZXN0KHYpLFxuICBoZXhhQ29sb3I6IHYgPT4gaGV4YS50ZXN0KHYpLFxuICBoZXhPckhleGFDb2xvcjogdiA9PiBoZXhPckhleGEudGVzdCh2KSxcblxuICByZ2JDb2xvcjogdiA9PiByZ2IudGVzdCh2KSxcbiAgcmdiYUNvbG9yOiB2ID0+IHJnYmEudGVzdCh2KSxcbiAgcmdiT3JSZ2JhQ29sb3I6IHYgPT4gcmdiLnRlc3QodikgfHwgcmdiYS50ZXN0KHYpLFxuXG4gIGhleE9yUmdiQ29sb3I6IHYgPT4gaGV4LnRlc3QodikgfHwgcmdiLnRlc3QodiksXG4gIGhleGFPclJnYmFDb2xvcjogdiA9PiBoZXhhLnRlc3QodikgfHwgcmdiYS50ZXN0KHYpLFxuICBhbnlDb2xvcjogdiA9PiBoZXhPckhleGEudGVzdCh2KSB8fCByZ2IudGVzdCh2KSB8fCByZ2JhLnRlc3Qodilcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICB0ZXN0UGF0dGVyblxufVxuIiwiaW1wb3J0IHsgcmVmLCBjb21wdXRlZCwgd2F0Y2gsIG9uQmVmb3JlVW5tb3VudCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgdXNlRm9ybUNoaWxkIGZyb20gJy4uL3VzZS1mb3JtLWNoaWxkLmpzJ1xuaW1wb3J0IHsgdGVzdFBhdHRlcm4gfSBmcm9tICcuLi8uLi91dGlscy9wYXR0ZXJucy5qcydcbmltcG9ydCBkZWJvdW5jZSBmcm9tICcuLi8uLi91dGlscy9kZWJvdW5jZS5qcydcbmltcG9ydCB7IGluamVjdFByb3AgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2luamVjdC1vYmotcHJvcC5qcydcblxuY29uc3QgbGF6eVJ1bGVzVmFsdWVzID0gWyB0cnVlLCBmYWxzZSwgJ29uZGVtYW5kJyBdXG5cbmV4cG9ydCBjb25zdCB1c2VWYWxpZGF0ZVByb3BzID0ge1xuICBtb2RlbFZhbHVlOiB7fSxcblxuICBlcnJvcjoge1xuICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgZGVmYXVsdDogbnVsbFxuICB9LFxuICBlcnJvck1lc3NhZ2U6IFN0cmluZyxcbiAgbm9FcnJvckljb246IEJvb2xlYW4sXG5cbiAgcnVsZXM6IEFycmF5LFxuICByZWFjdGl2ZVJ1bGVzOiBCb29sZWFuLFxuICBsYXp5UnVsZXM6IHtcbiAgICB0eXBlOiBbIEJvb2xlYW4sIFN0cmluZyBdLFxuICAgIHZhbGlkYXRvcjogdiA9PiBsYXp5UnVsZXNWYWx1ZXMuaW5jbHVkZXModilcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoZm9jdXNlZCwgaW5uZXJMb2FkaW5nKSB7XG4gIGNvbnN0IHsgcHJvcHMsIHByb3h5IH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuXG4gIGNvbnN0IGlubmVyRXJyb3IgPSByZWYoZmFsc2UpXG4gIGNvbnN0IGlubmVyRXJyb3JNZXNzYWdlID0gcmVmKG51bGwpXG4gIGNvbnN0IGlzRGlydHlNb2RlbCA9IHJlZihudWxsKVxuXG4gIHVzZUZvcm1DaGlsZCh7IHZhbGlkYXRlLCByZXNldFZhbGlkYXRpb24gfSlcblxuICBsZXQgdmFsaWRhdGVJbmRleCA9IDAsIHVud2F0Y2hSdWxlc1xuXG4gIGNvbnN0IGhhc1J1bGVzID0gY29tcHV0ZWQoKCkgPT5cbiAgICBwcm9wcy5ydWxlcyAhPT0gdm9pZCAwXG4gICAgJiYgcHJvcHMucnVsZXMgIT09IG51bGxcbiAgICAmJiBwcm9wcy5ydWxlcy5sZW5ndGggPiAwXG4gIClcblxuICBjb25zdCBoYXNBY3RpdmVSdWxlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgcHJvcHMuZGlzYWJsZSAhPT0gdHJ1ZVxuICAgICYmIGhhc1J1bGVzLnZhbHVlID09PSB0cnVlXG4gIClcblxuICBjb25zdCBoYXNFcnJvciA9IGNvbXB1dGVkKCgpID0+XG4gICAgcHJvcHMuZXJyb3IgPT09IHRydWUgfHwgaW5uZXJFcnJvci52YWx1ZSA9PT0gdHJ1ZVxuICApXG5cbiAgY29uc3QgZXJyb3JNZXNzYWdlID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgIHR5cGVvZiBwcm9wcy5lcnJvck1lc3NhZ2UgPT09ICdzdHJpbmcnICYmIHByb3BzLmVycm9yTWVzc2FnZS5sZW5ndGggPiAwXG4gICAgICA/IHByb3BzLmVycm9yTWVzc2FnZVxuICAgICAgOiBpbm5lckVycm9yTWVzc2FnZS52YWx1ZVxuICApKVxuXG4gIHdhdGNoKCgpID0+IHByb3BzLm1vZGVsVmFsdWUsICgpID0+IHtcbiAgICB2YWxpZGF0ZUlmTmVlZGVkKClcbiAgfSlcblxuICB3YXRjaCgoKSA9PiBwcm9wcy5yZWFjdGl2ZVJ1bGVzLCB2YWwgPT4ge1xuICAgIGlmICh2YWwgPT09IHRydWUpIHtcbiAgICAgIGlmICh1bndhdGNoUnVsZXMgPT09IHZvaWQgMCkge1xuICAgICAgICB1bndhdGNoUnVsZXMgPSB3YXRjaCgoKSA9PiBwcm9wcy5ydWxlcywgKCkgPT4ge1xuICAgICAgICAgIHZhbGlkYXRlSWZOZWVkZWQodHJ1ZSlcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAodW53YXRjaFJ1bGVzICE9PSB2b2lkIDApIHtcbiAgICAgIHVud2F0Y2hSdWxlcygpXG4gICAgICB1bndhdGNoUnVsZXMgPSB2b2lkIDBcbiAgICB9XG4gIH0sIHsgaW1tZWRpYXRlOiB0cnVlIH0pXG5cbiAgd2F0Y2goZm9jdXNlZCwgdmFsID0+IHtcbiAgICBpZiAodmFsID09PSB0cnVlKSB7XG4gICAgICBpZiAoaXNEaXJ0eU1vZGVsLnZhbHVlID09PSBudWxsKSB7XG4gICAgICAgIGlzRGlydHlNb2RlbC52YWx1ZSA9IGZhbHNlXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzRGlydHlNb2RlbC52YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgIGlzRGlydHlNb2RlbC52YWx1ZSA9IHRydWVcblxuICAgICAgaWYgKFxuICAgICAgICBoYXNBY3RpdmVSdWxlcy52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAmJiBwcm9wcy5sYXp5UnVsZXMgIT09ICdvbmRlbWFuZCdcbiAgICAgICAgLy8gRG9uJ3QgcmUtdHJpZ2dlciBpZiBpdCdzIGFscmVhZHkgaW4gcHJvZ3Jlc3M7XG4gICAgICAgIC8vIEl0IG1pZ2h0IG1lYW4gdGhhdCBmb2N1cyBzd2l0Y2hlZCB0byBzdWJtaXQgYnRuIGFuZFxuICAgICAgICAvLyBRRm9ybSdzIHN1Ym1pdCgpIGhhcyBiZWVuIGNhbGxlZCBhbHJlYWR5IChFTlRFUiBrZXkpXG4gICAgICAgICYmIGlubmVyTG9hZGluZy52YWx1ZSA9PT0gZmFsc2VcbiAgICAgICkge1xuICAgICAgICBkZWJvdW5jZWRWYWxpZGF0ZSgpXG4gICAgICB9XG4gICAgfVxuICB9KVxuXG4gIGZ1bmN0aW9uIHJlc2V0VmFsaWRhdGlvbiAoKSB7XG4gICAgdmFsaWRhdGVJbmRleCsrXG4gICAgaW5uZXJMb2FkaW5nLnZhbHVlID0gZmFsc2VcbiAgICBpc0RpcnR5TW9kZWwudmFsdWUgPSBudWxsXG4gICAgaW5uZXJFcnJvci52YWx1ZSA9IGZhbHNlXG4gICAgaW5uZXJFcnJvck1lc3NhZ2UudmFsdWUgPSBudWxsXG4gICAgZGVib3VuY2VkVmFsaWRhdGUuY2FuY2VsKClcbiAgfVxuXG4gIC8qXG4gICAqIFJldHVybiB2YWx1ZVxuICAgKiAgIC0gdHJ1ZSAodmFsaWRhdGlvbiBzdWNjZWVkZWQpXG4gICAqICAgLSBmYWxzZSAodmFsaWRhdGlvbiBmYWlsZWQpXG4gICAqICAgLSBQcm9taXNlIChwZW5kaW5nIGFzeW5jIHZhbGlkYXRpb24pXG4gICAqL1xuICBmdW5jdGlvbiB2YWxpZGF0ZSAodmFsID0gcHJvcHMubW9kZWxWYWx1ZSkge1xuICAgIGlmIChoYXNBY3RpdmVSdWxlcy52YWx1ZSAhPT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG5cbiAgICBjb25zdCBpbmRleCA9ICsrdmFsaWRhdGVJbmRleFxuXG4gICAgY29uc3Qgc2V0RGlydHkgPSBpbm5lckxvYWRpbmcudmFsdWUgIT09IHRydWVcbiAgICAgID8gKCkgPT4geyBpc0RpcnR5TW9kZWwudmFsdWUgPSB0cnVlIH1cbiAgICAgIDogKCkgPT4ge31cblxuICAgIGNvbnN0IHVwZGF0ZSA9IChlcnIsIG1zZykgPT4ge1xuICAgICAgZXJyID09PSB0cnVlICYmIHNldERpcnR5KClcblxuICAgICAgaW5uZXJFcnJvci52YWx1ZSA9IGVyclxuICAgICAgaW5uZXJFcnJvck1lc3NhZ2UudmFsdWUgPSBtc2cgfHwgbnVsbFxuICAgICAgaW5uZXJMb2FkaW5nLnZhbHVlID0gZmFsc2VcbiAgICB9XG5cbiAgICBjb25zdCBwcm9taXNlcyA9IFtdXG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb3BzLnJ1bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBydWxlID0gcHJvcHMucnVsZXNbIGkgXVxuICAgICAgbGV0IHJlc1xuXG4gICAgICBpZiAodHlwZW9mIHJ1bGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmVzID0gcnVsZSh2YWwsIHRlc3RQYXR0ZXJuKVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAodHlwZW9mIHJ1bGUgPT09ICdzdHJpbmcnICYmIHRlc3RQYXR0ZXJuWyBydWxlIF0gIT09IHZvaWQgMCkge1xuICAgICAgICByZXMgPSB0ZXN0UGF0dGVyblsgcnVsZSBdKHZhbClcbiAgICAgIH1cblxuICAgICAgaWYgKHJlcyA9PT0gZmFsc2UgfHwgdHlwZW9mIHJlcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdXBkYXRlKHRydWUsIHJlcylcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgICBlbHNlIGlmIChyZXMgIT09IHRydWUgJiYgcmVzICE9PSB2b2lkIDApIHtcbiAgICAgICAgcHJvbWlzZXMucHVzaChyZXMpXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHByb21pc2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdXBkYXRlKGZhbHNlKVxuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG5cbiAgICBpbm5lckxvYWRpbmcudmFsdWUgPSB0cnVlXG5cbiAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oXG4gICAgICByZXMgPT4ge1xuICAgICAgICBpZiAocmVzID09PSB2b2lkIDAgfHwgQXJyYXkuaXNBcnJheShyZXMpID09PSBmYWxzZSB8fCByZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgaW5kZXggPT09IHZhbGlkYXRlSW5kZXggJiYgdXBkYXRlKGZhbHNlKVxuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtc2cgPSByZXMuZmluZChyID0+IHIgPT09IGZhbHNlIHx8IHR5cGVvZiByID09PSAnc3RyaW5nJylcbiAgICAgICAgaW5kZXggPT09IHZhbGlkYXRlSW5kZXggJiYgdXBkYXRlKG1zZyAhPT0gdm9pZCAwLCBtc2cpXG4gICAgICAgIHJldHVybiBtc2cgPT09IHZvaWQgMFxuICAgICAgfSxcbiAgICAgIGUgPT4ge1xuICAgICAgICBpZiAoaW5kZXggPT09IHZhbGlkYXRlSW5kZXgpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGUpXG4gICAgICAgICAgdXBkYXRlKHRydWUpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICApXG4gIH1cblxuICBmdW5jdGlvbiB2YWxpZGF0ZUlmTmVlZGVkIChjaGFuZ2VkUnVsZXMpIHtcbiAgICBpZiAoXG4gICAgICBoYXNBY3RpdmVSdWxlcy52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgJiYgcHJvcHMubGF6eVJ1bGVzICE9PSAnb25kZW1hbmQnXG4gICAgICAmJiAoaXNEaXJ0eU1vZGVsLnZhbHVlID09PSB0cnVlIHx8IChwcm9wcy5sYXp5UnVsZXMgIT09IHRydWUgJiYgY2hhbmdlZFJ1bGVzICE9PSB0cnVlKSlcbiAgICApIHtcbiAgICAgIGRlYm91bmNlZFZhbGlkYXRlKClcbiAgICB9XG4gIH1cblxuICBjb25zdCBkZWJvdW5jZWRWYWxpZGF0ZSA9IGRlYm91bmNlKHZhbGlkYXRlLCAwKVxuXG4gIG9uQmVmb3JlVW5tb3VudCgoKSA9PiB7XG4gICAgdW53YXRjaFJ1bGVzICE9PSB2b2lkIDAgJiYgdW53YXRjaFJ1bGVzKClcbiAgICBkZWJvdW5jZWRWYWxpZGF0ZS5jYW5jZWwoKVxuICB9KVxuXG4gIC8vIGV4cG9zZSBwdWJsaWMgbWV0aG9kcyAmIHByb3BzXG4gIE9iamVjdC5hc3NpZ24ocHJveHksIHsgcmVzZXRWYWxpZGF0aW9uLCB2YWxpZGF0ZSB9KVxuICBpbmplY3RQcm9wKHByb3h5LCAnaGFzRXJyb3InLCAoKSA9PiBoYXNFcnJvci52YWx1ZSlcblxuICByZXR1cm4ge1xuICAgIGlzRGlydHlNb2RlbCxcbiAgICBoYXNSdWxlcyxcbiAgICBoYXNFcnJvcixcbiAgICBlcnJvck1lc3NhZ2UsXG5cbiAgICB2YWxpZGF0ZSxcbiAgICByZXNldFZhbGlkYXRpb25cbiAgfVxufVxuIiwiaW1wb3J0IHsgcmVmLCBvbkJlZm9yZVVwZGF0ZSB9IGZyb20gJ3Z1ZSdcblxuY29uc3QgbGlzdGVuZXJSRSA9IC9eb25bQS1aXS9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKGF0dHJzLCB2bm9kZSkge1xuICBjb25zdCBhY2MgPSB7XG4gICAgbGlzdGVuZXJzOiByZWYoe30pLFxuICAgIGF0dHJpYnV0ZXM6IHJlZih7fSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZSAoKSB7XG4gICAgY29uc3QgYXR0cmlidXRlcyA9IHt9XG4gICAgY29uc3QgbGlzdGVuZXJzID0ge31cblxuICAgIGZvciAoY29uc3Qga2V5IGluIGF0dHJzKSB7XG4gICAgICBpZiAoa2V5ICE9PSAnY2xhc3MnICYmIGtleSAhPT0gJ3N0eWxlJyAmJiBsaXN0ZW5lclJFLnRlc3Qoa2V5KSA9PT0gZmFsc2UpIHtcbiAgICAgICAgYXR0cmlidXRlc1sga2V5IF0gPSBhdHRyc1sga2V5IF1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IGtleSBpbiB2bm9kZS5wcm9wcykge1xuICAgICAgaWYgKGxpc3RlbmVyUkUudGVzdChrZXkpID09PSB0cnVlKSB7XG4gICAgICAgIGxpc3RlbmVyc1sga2V5IF0gPSB2bm9kZS5wcm9wc1sga2V5IF1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBhY2MuYXR0cmlidXRlcy52YWx1ZSA9IGF0dHJpYnV0ZXNcbiAgICBhY2MubGlzdGVuZXJzLnZhbHVlID0gbGlzdGVuZXJzXG4gIH1cblxuICBvbkJlZm9yZVVwZGF0ZSh1cGRhdGUpXG5cbiAgdXBkYXRlKClcblxuICByZXR1cm4gYWNjXG59XG4iLCJpbXBvcnQgeyBoLCByZWYsIGNvbXB1dGVkLCB3YXRjaCwgVHJhbnNpdGlvbiwgbmV4dFRpY2ssIG9uQWN0aXZhdGVkLCBvbkRlYWN0aXZhdGVkLCBvbkJlZm9yZVVubW91bnQsIG9uTW91bnRlZCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyBpc1J1bnRpbWVTc3JQcmVIeWRyYXRpb24gfSBmcm9tICcuLi8uLi9wbHVnaW5zL1BsYXRmb3JtLmpzJ1xuXG5pbXBvcnQgUUljb24gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9pY29uL1FJY29uLmpzJ1xuaW1wb3J0IFFTcGlubmVyIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvc3Bpbm5lci9RU3Bpbm5lci5qcydcblxuaW1wb3J0IHVzZURhcmssIHsgdXNlRGFya1Byb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtZGFyay5qcydcbmltcG9ydCB1c2VWYWxpZGF0ZSwgeyB1c2VWYWxpZGF0ZVByb3BzIH0gZnJvbSAnLi91c2UtdmFsaWRhdGUuanMnXG5pbXBvcnQgdXNlU3BsaXRBdHRycyBmcm9tICcuL3VzZS1zcGxpdC1hdHRycy5qcydcblxuaW1wb3J0IHsgaFNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcbmltcG9ydCB1aWQgZnJvbSAnLi4vLi4vdXRpbHMvdWlkLmpzJ1xuaW1wb3J0IHsgcHJldmVudCwgc3RvcEFuZFByZXZlbnQgfSBmcm9tICcuLi8uLi91dGlscy9ldmVudC5qcydcbmltcG9ydCB7IGFkZEZvY3VzRm4sIHJlbW92ZUZvY3VzRm4gfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2ZvY3VzLW1hbmFnZXIuanMnXG5cbmZ1bmN0aW9uIGdldFRhcmdldFVpZCAodmFsKSB7XG4gIHJldHVybiB2YWwgPT09IHZvaWQgMCA/IGBmXyR7IHVpZCgpIH1gIDogdmFsXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaWVsZFZhbHVlSXNGaWxsZWQgKHZhbCkge1xuICByZXR1cm4gdmFsICE9PSB2b2lkIDBcbiAgICAmJiB2YWwgIT09IG51bGxcbiAgICAmJiAoJycgKyB2YWwpLmxlbmd0aCA+IDBcbn1cblxuZXhwb3J0IGNvbnN0IHVzZUZpZWxkUHJvcHMgPSB7XG4gIC4uLnVzZURhcmtQcm9wcyxcbiAgLi4udXNlVmFsaWRhdGVQcm9wcyxcblxuICBsYWJlbDogU3RyaW5nLFxuICBzdGFja0xhYmVsOiBCb29sZWFuLFxuICBoaW50OiBTdHJpbmcsXG4gIGhpZGVIaW50OiBCb29sZWFuLFxuICBwcmVmaXg6IFN0cmluZyxcbiAgc3VmZml4OiBTdHJpbmcsXG5cbiAgbGFiZWxDb2xvcjogU3RyaW5nLFxuICBjb2xvcjogU3RyaW5nLFxuICBiZ0NvbG9yOiBTdHJpbmcsXG5cbiAgZmlsbGVkOiBCb29sZWFuLFxuICBvdXRsaW5lZDogQm9vbGVhbixcbiAgYm9yZGVybGVzczogQm9vbGVhbixcbiAgc3RhbmRvdXQ6IFsgQm9vbGVhbiwgU3RyaW5nIF0sXG5cbiAgc3F1YXJlOiBCb29sZWFuLFxuXG4gIGxvYWRpbmc6IEJvb2xlYW4sXG5cbiAgbGFiZWxTbG90OiBCb29sZWFuLFxuXG4gIGJvdHRvbVNsb3RzOiBCb29sZWFuLFxuICBoaWRlQm90dG9tU3BhY2U6IEJvb2xlYW4sXG5cbiAgcm91bmRlZDogQm9vbGVhbixcbiAgZGVuc2U6IEJvb2xlYW4sXG4gIGl0ZW1BbGlnbmVkOiBCb29sZWFuLFxuXG4gIGNvdW50ZXI6IEJvb2xlYW4sXG5cbiAgY2xlYXJhYmxlOiBCb29sZWFuLFxuICBjbGVhckljb246IFN0cmluZyxcblxuICBkaXNhYmxlOiBCb29sZWFuLFxuICByZWFkb25seTogQm9vbGVhbixcblxuICBhdXRvZm9jdXM6IEJvb2xlYW4sXG5cbiAgZm9yOiBTdHJpbmcsXG5cbiAgbWF4bGVuZ3RoOiBbIE51bWJlciwgU3RyaW5nIF1cbn1cblxuZXhwb3J0IGNvbnN0IHVzZUZpZWxkRW1pdHMgPSBbICd1cGRhdGU6bW9kZWxWYWx1ZScsICdjbGVhcicsICdmb2N1cycsICdibHVyJywgJ3BvcHVwU2hvdycsICdwb3B1cEhpZGUnIF1cblxuZXhwb3J0IGZ1bmN0aW9uIHVzZUZpZWxkU3RhdGUgKCkge1xuICBjb25zdCB7IHByb3BzLCBhdHRycywgcHJveHksIHZub2RlIH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuXG4gIGNvbnN0IGlzRGFyayA9IHVzZURhcmsocHJvcHMsIHByb3h5LiRxKVxuXG4gIHJldHVybiB7XG4gICAgaXNEYXJrLFxuXG4gICAgZWRpdGFibGU6IGNvbXB1dGVkKCgpID0+XG4gICAgICBwcm9wcy5kaXNhYmxlICE9PSB0cnVlICYmIHByb3BzLnJlYWRvbmx5ICE9PSB0cnVlXG4gICAgKSxcblxuICAgIGlubmVyTG9hZGluZzogcmVmKGZhbHNlKSxcbiAgICBmb2N1c2VkOiByZWYoZmFsc2UpLFxuICAgIGhhc1BvcHVwT3BlbjogZmFsc2UsXG5cbiAgICBzcGxpdEF0dHJzOiB1c2VTcGxpdEF0dHJzKGF0dHJzLCB2bm9kZSksXG4gICAgdGFyZ2V0VWlkOiByZWYoZ2V0VGFyZ2V0VWlkKHByb3BzLmZvcikpLFxuXG4gICAgcm9vdFJlZjogcmVmKG51bGwpLFxuICAgIHRhcmdldFJlZjogcmVmKG51bGwpLFxuICAgIGNvbnRyb2xSZWY6IHJlZihudWxsKVxuXG4gICAgLyoqXG4gICAgICogdXNlciBzdXBwbGllZCBhZGRpdGlvbmFsczpcblxuICAgICAqIGlubmVyVmFsdWUgLSBjb21wdXRlZFxuICAgICAqIGZsb2F0aW5nTGFiZWwgLSBjb21wdXRlZFxuICAgICAqIGlucHV0UmVmIC0gY29tcHV0ZWRcblxuICAgICAqIGZpZWxkQ2xhc3MgLSBjb21wdXRlZFxuICAgICAqIGhhc1NoYWRvdyAtIGNvbXB1dGVkXG5cbiAgICAgKiBjb250cm9sRXZlbnRzIC0gT2JqZWN0IHdpdGggZm4oZSlcblxuICAgICAqIGdldENvbnRyb2wgLSBmblxuICAgICAqIGdldElubmVyQXBwZW5kIC0gZm5cbiAgICAgKiBnZXRDb250cm9sQ2hpbGQgLSBmblxuICAgICAqIGdldFNoYWRvd0NvbnRyb2wgLSBmblxuICAgICAqIHNob3dQb3B1cCAtIGZuXG4gICAgICovXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHN0YXRlKSB7XG4gIGNvbnN0IHsgcHJvcHMsIGVtaXQsIHNsb3RzLCBhdHRycywgcHJveHkgfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gIGNvbnN0IHsgJHEgfSA9IHByb3h5XG5cbiAgbGV0IGZvY3Vzb3V0VGltZXIgPSBudWxsXG5cbiAgaWYgKHN0YXRlLmhhc1ZhbHVlID09PSB2b2lkIDApIHtcbiAgICBzdGF0ZS5oYXNWYWx1ZSA9IGNvbXB1dGVkKCgpID0+IGZpZWxkVmFsdWVJc0ZpbGxlZChwcm9wcy5tb2RlbFZhbHVlKSlcbiAgfVxuXG4gIGlmIChzdGF0ZS5lbWl0VmFsdWUgPT09IHZvaWQgMCkge1xuICAgIHN0YXRlLmVtaXRWYWx1ZSA9IHZhbHVlID0+IHtcbiAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgdmFsdWUpXG4gICAgfVxuICB9XG5cbiAgaWYgKHN0YXRlLmNvbnRyb2xFdmVudHMgPT09IHZvaWQgMCkge1xuICAgIHN0YXRlLmNvbnRyb2xFdmVudHMgPSB7XG4gICAgICBvbkZvY3VzaW46IG9uQ29udHJvbEZvY3VzaW4sXG4gICAgICBvbkZvY3Vzb3V0OiBvbkNvbnRyb2xGb2N1c291dFxuICAgIH1cbiAgfVxuXG4gIE9iamVjdC5hc3NpZ24oc3RhdGUsIHtcbiAgICBjbGVhclZhbHVlLFxuICAgIG9uQ29udHJvbEZvY3VzaW4sXG4gICAgb25Db250cm9sRm9jdXNvdXQsXG4gICAgZm9jdXNcbiAgfSlcblxuICBpZiAoc3RhdGUuY29tcHV0ZWRDb3VudGVyID09PSB2b2lkIDApIHtcbiAgICBzdGF0ZS5jb21wdXRlZENvdW50ZXIgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBpZiAocHJvcHMuY291bnRlciAhPT0gZmFsc2UpIHtcbiAgICAgICAgY29uc3QgbGVuID0gdHlwZW9mIHByb3BzLm1vZGVsVmFsdWUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBwcm9wcy5tb2RlbFZhbHVlID09PSAnbnVtYmVyJ1xuICAgICAgICAgID8gKCcnICsgcHJvcHMubW9kZWxWYWx1ZSkubGVuZ3RoXG4gICAgICAgICAgOiAoQXJyYXkuaXNBcnJheShwcm9wcy5tb2RlbFZhbHVlKSA9PT0gdHJ1ZSA/IHByb3BzLm1vZGVsVmFsdWUubGVuZ3RoIDogMClcblxuICAgICAgICBjb25zdCBtYXggPSBwcm9wcy5tYXhsZW5ndGggIT09IHZvaWQgMFxuICAgICAgICAgID8gcHJvcHMubWF4bGVuZ3RoXG4gICAgICAgICAgOiBwcm9wcy5tYXhWYWx1ZXNcblxuICAgICAgICByZXR1cm4gbGVuICsgKG1heCAhPT0gdm9pZCAwID8gJyAvICcgKyBtYXggOiAnJylcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgY29uc3Qge1xuICAgIGlzRGlydHlNb2RlbCxcbiAgICBoYXNSdWxlcyxcbiAgICBoYXNFcnJvcixcbiAgICBlcnJvck1lc3NhZ2UsXG4gICAgcmVzZXRWYWxpZGF0aW9uXG4gIH0gPSB1c2VWYWxpZGF0ZShzdGF0ZS5mb2N1c2VkLCBzdGF0ZS5pbm5lckxvYWRpbmcpXG5cbiAgY29uc3QgZmxvYXRpbmdMYWJlbCA9IHN0YXRlLmZsb2F0aW5nTGFiZWwgIT09IHZvaWQgMFxuICAgID8gY29tcHV0ZWQoKCkgPT4gcHJvcHMuc3RhY2tMYWJlbCA9PT0gdHJ1ZSB8fCBzdGF0ZS5mb2N1c2VkLnZhbHVlID09PSB0cnVlIHx8IHN0YXRlLmZsb2F0aW5nTGFiZWwudmFsdWUgPT09IHRydWUpXG4gICAgOiBjb21wdXRlZCgoKSA9PiBwcm9wcy5zdGFja0xhYmVsID09PSB0cnVlIHx8IHN0YXRlLmZvY3VzZWQudmFsdWUgPT09IHRydWUgfHwgc3RhdGUuaGFzVmFsdWUudmFsdWUgPT09IHRydWUpXG5cbiAgY29uc3Qgc2hvdWxkUmVuZGVyQm90dG9tID0gY29tcHV0ZWQoKCkgPT5cbiAgICBwcm9wcy5ib3R0b21TbG90cyA9PT0gdHJ1ZVxuICAgIHx8IHByb3BzLmhpbnQgIT09IHZvaWQgMFxuICAgIHx8IGhhc1J1bGVzLnZhbHVlID09PSB0cnVlXG4gICAgfHwgcHJvcHMuY291bnRlciA9PT0gdHJ1ZVxuICAgIHx8IHByb3BzLmVycm9yICE9PSBudWxsXG4gIClcblxuICBjb25zdCBzdHlsZVR5cGUgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgaWYgKHByb3BzLmZpbGxlZCA9PT0gdHJ1ZSkgeyByZXR1cm4gJ2ZpbGxlZCcgfVxuICAgIGlmIChwcm9wcy5vdXRsaW5lZCA9PT0gdHJ1ZSkgeyByZXR1cm4gJ291dGxpbmVkJyB9XG4gICAgaWYgKHByb3BzLmJvcmRlcmxlc3MgPT09IHRydWUpIHsgcmV0dXJuICdib3JkZXJsZXNzJyB9XG4gICAgaWYgKHByb3BzLnN0YW5kb3V0KSB7IHJldHVybiAnc3RhbmRvdXQnIH1cbiAgICByZXR1cm4gJ3N0YW5kYXJkJ1xuICB9KVxuXG4gIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgIGBxLWZpZWxkIHJvdyBuby13cmFwIGl0ZW1zLXN0YXJ0IHEtZmllbGQtLSR7IHN0eWxlVHlwZS52YWx1ZSB9YFxuICAgICsgKHN0YXRlLmZpZWxkQ2xhc3MgIT09IHZvaWQgMCA/IGAgJHsgc3RhdGUuZmllbGRDbGFzcy52YWx1ZSB9YCA6ICcnKVxuICAgICsgKHByb3BzLnJvdW5kZWQgPT09IHRydWUgPyAnIHEtZmllbGQtLXJvdW5kZWQnIDogJycpXG4gICAgKyAocHJvcHMuc3F1YXJlID09PSB0cnVlID8gJyBxLWZpZWxkLS1zcXVhcmUnIDogJycpXG4gICAgKyAoZmxvYXRpbmdMYWJlbC52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1maWVsZC0tZmxvYXQnIDogJycpXG4gICAgKyAoaGFzTGFiZWwudmFsdWUgPT09IHRydWUgPyAnIHEtZmllbGQtLWxhYmVsZWQnIDogJycpXG4gICAgKyAocHJvcHMuZGVuc2UgPT09IHRydWUgPyAnIHEtZmllbGQtLWRlbnNlJyA6ICcnKVxuICAgICsgKHByb3BzLml0ZW1BbGlnbmVkID09PSB0cnVlID8gJyBxLWZpZWxkLS1pdGVtLWFsaWduZWQgcS1pdGVtLXR5cGUnIDogJycpXG4gICAgKyAoc3RhdGUuaXNEYXJrLnZhbHVlID09PSB0cnVlID8gJyBxLWZpZWxkLS1kYXJrJyA6ICcnKVxuICAgICsgKHN0YXRlLmdldENvbnRyb2wgPT09IHZvaWQgMCA/ICcgcS1maWVsZC0tYXV0by1oZWlnaHQnIDogJycpXG4gICAgKyAoc3RhdGUuZm9jdXNlZC52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1maWVsZC0tZm9jdXNlZCcgOiAnJylcbiAgICArIChoYXNFcnJvci52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1maWVsZC0tZXJyb3InIDogJycpXG4gICAgKyAoaGFzRXJyb3IudmFsdWUgPT09IHRydWUgfHwgc3RhdGUuZm9jdXNlZC52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1maWVsZC0taGlnaGxpZ2h0ZWQnIDogJycpXG4gICAgKyAocHJvcHMuaGlkZUJvdHRvbVNwYWNlICE9PSB0cnVlICYmIHNob3VsZFJlbmRlckJvdHRvbS52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1maWVsZC0td2l0aC1ib3R0b20nIDogJycpXG4gICAgKyAocHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZSA/ICcgcS1maWVsZC0tZGlzYWJsZWQnIDogKHByb3BzLnJlYWRvbmx5ID09PSB0cnVlID8gJyBxLWZpZWxkLS1yZWFkb25seScgOiAnJykpXG4gIClcblxuICBjb25zdCBjb250ZW50Q2xhc3MgPSBjb21wdXRlZCgoKSA9PlxuICAgICdxLWZpZWxkX19jb250cm9sIHJlbGF0aXZlLXBvc2l0aW9uIHJvdyBuby13cmFwJ1xuICAgICsgKHByb3BzLmJnQ29sb3IgIT09IHZvaWQgMCA/IGAgYmctJHsgcHJvcHMuYmdDb2xvciB9YCA6ICcnKVxuICAgICsgKFxuICAgICAgaGFzRXJyb3IudmFsdWUgPT09IHRydWVcbiAgICAgICAgPyAnIHRleHQtbmVnYXRpdmUnXG4gICAgICAgIDogKFxuICAgICAgICAgICAgdHlwZW9mIHByb3BzLnN0YW5kb3V0ID09PSAnc3RyaW5nJyAmJiBwcm9wcy5zdGFuZG91dC5sZW5ndGggPiAwICYmIHN0YXRlLmZvY3VzZWQudmFsdWUgPT09IHRydWVcbiAgICAgICAgICAgICAgPyBgICR7IHByb3BzLnN0YW5kb3V0IH1gXG4gICAgICAgICAgICAgIDogKHByb3BzLmNvbG9yICE9PSB2b2lkIDAgPyBgIHRleHQtJHsgcHJvcHMuY29sb3IgfWAgOiAnJylcbiAgICAgICAgICApXG4gICAgKVxuICApXG5cbiAgY29uc3QgaGFzTGFiZWwgPSBjb21wdXRlZCgoKSA9PlxuICAgIHByb3BzLmxhYmVsU2xvdCA9PT0gdHJ1ZSB8fCBwcm9wcy5sYWJlbCAhPT0gdm9pZCAwXG4gIClcblxuICBjb25zdCBsYWJlbENsYXNzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAncS1maWVsZF9fbGFiZWwgbm8tcG9pbnRlci1ldmVudHMgYWJzb2x1dGUgZWxsaXBzaXMnXG4gICAgKyAocHJvcHMubGFiZWxDb2xvciAhPT0gdm9pZCAwICYmIGhhc0Vycm9yLnZhbHVlICE9PSB0cnVlID8gYCB0ZXh0LSR7IHByb3BzLmxhYmVsQ29sb3IgfWAgOiAnJylcbiAgKVxuXG4gIGNvbnN0IGNvbnRyb2xTbG90U2NvcGUgPSBjb21wdXRlZCgoKSA9PiAoe1xuICAgIGlkOiBzdGF0ZS50YXJnZXRVaWQudmFsdWUsXG4gICAgZWRpdGFibGU6IHN0YXRlLmVkaXRhYmxlLnZhbHVlLFxuICAgIGZvY3VzZWQ6IHN0YXRlLmZvY3VzZWQudmFsdWUsXG4gICAgZmxvYXRpbmdMYWJlbDogZmxvYXRpbmdMYWJlbC52YWx1ZSxcbiAgICBtb2RlbFZhbHVlOiBwcm9wcy5tb2RlbFZhbHVlLFxuICAgIGVtaXRWYWx1ZTogc3RhdGUuZW1pdFZhbHVlXG4gIH0pKVxuXG4gIGNvbnN0IGF0dHJpYnV0ZXMgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgY29uc3QgYWNjID0ge1xuICAgICAgZm9yOiBzdGF0ZS50YXJnZXRVaWQudmFsdWVcbiAgICB9XG5cbiAgICBpZiAocHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZSkge1xuICAgICAgYWNjWyAnYXJpYS1kaXNhYmxlZCcgXSA9ICd0cnVlJ1xuICAgIH1cbiAgICBlbHNlIGlmIChwcm9wcy5yZWFkb25seSA9PT0gdHJ1ZSkge1xuICAgICAgYWNjWyAnYXJpYS1yZWFkb25seScgXSA9ICd0cnVlJ1xuICAgIH1cblxuICAgIHJldHVybiBhY2NcbiAgfSlcblxuICB3YXRjaCgoKSA9PiBwcm9wcy5mb3IsIHZhbCA9PiB7XG4gICAgLy8gZG9uJ3QgdHJhbnNmb3JtIHRhcmdldFVpZCBpbnRvIGEgY29tcHV0ZWRcbiAgICAvLyBwcm9wIGFzIGl0IHdpbGwgYnJlYWsgU1NSXG4gICAgc3RhdGUudGFyZ2V0VWlkLnZhbHVlID0gZ2V0VGFyZ2V0VWlkKHZhbClcbiAgfSlcblxuICBmdW5jdGlvbiBmb2N1c0hhbmRsZXIgKCkge1xuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudFxuICAgIGxldCB0YXJnZXQgPSBzdGF0ZS50YXJnZXRSZWYgIT09IHZvaWQgMCAmJiBzdGF0ZS50YXJnZXRSZWYudmFsdWVcblxuICAgIGlmICh0YXJnZXQgJiYgKGVsID09PSBudWxsIHx8IGVsLmlkICE9PSBzdGF0ZS50YXJnZXRVaWQudmFsdWUpKSB7XG4gICAgICB0YXJnZXQuaGFzQXR0cmlidXRlKCd0YWJpbmRleCcpID09PSB0cnVlIHx8ICh0YXJnZXQgPSB0YXJnZXQucXVlcnlTZWxlY3RvcignW3RhYmluZGV4XScpKVxuICAgICAgaWYgKHRhcmdldCAmJiB0YXJnZXQgIT09IGVsKSB7XG4gICAgICAgIHRhcmdldC5mb2N1cyh7IHByZXZlbnRTY3JvbGw6IHRydWUgfSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBmb2N1cyAoKSB7XG4gICAgYWRkRm9jdXNGbihmb2N1c0hhbmRsZXIpXG4gIH1cblxuICBmdW5jdGlvbiBibHVyICgpIHtcbiAgICByZW1vdmVGb2N1c0ZuKGZvY3VzSGFuZGxlcilcbiAgICBjb25zdCBlbCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnRcbiAgICBpZiAoZWwgIT09IG51bGwgJiYgc3RhdGUucm9vdFJlZi52YWx1ZS5jb250YWlucyhlbCkpIHtcbiAgICAgIGVsLmJsdXIoKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uQ29udHJvbEZvY3VzaW4gKGUpIHtcbiAgICBpZiAoZm9jdXNvdXRUaW1lciAhPT0gbnVsbCkge1xuICAgICAgY2xlYXJUaW1lb3V0KGZvY3Vzb3V0VGltZXIpXG4gICAgICBmb2N1c291dFRpbWVyID0gbnVsbFxuICAgIH1cblxuICAgIGlmIChzdGF0ZS5lZGl0YWJsZS52YWx1ZSA9PT0gdHJ1ZSAmJiBzdGF0ZS5mb2N1c2VkLnZhbHVlID09PSBmYWxzZSkge1xuICAgICAgc3RhdGUuZm9jdXNlZC52YWx1ZSA9IHRydWVcbiAgICAgIGVtaXQoJ2ZvY3VzJywgZSlcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvbkNvbnRyb2xGb2N1c291dCAoZSwgdGhlbikge1xuICAgIGZvY3Vzb3V0VGltZXIgIT09IG51bGwgJiYgY2xlYXJUaW1lb3V0KGZvY3Vzb3V0VGltZXIpXG4gICAgZm9jdXNvdXRUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgZm9jdXNvdXRUaW1lciA9IG51bGxcblxuICAgICAgaWYgKFxuICAgICAgICBkb2N1bWVudC5oYXNGb2N1cygpID09PSB0cnVlICYmIChcbiAgICAgICAgICBzdGF0ZS5oYXNQb3B1cE9wZW4gPT09IHRydWVcbiAgICAgICAgICB8fCBzdGF0ZS5jb250cm9sUmVmID09PSB2b2lkIDBcbiAgICAgICAgICB8fCBzdGF0ZS5jb250cm9sUmVmLnZhbHVlID09PSBudWxsXG4gICAgICAgICAgfHwgc3RhdGUuY29udHJvbFJlZi52YWx1ZS5jb250YWlucyhkb2N1bWVudC5hY3RpdmVFbGVtZW50KSAhPT0gZmFsc2VcbiAgICAgICAgKVxuICAgICAgKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdGUuZm9jdXNlZC52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBzdGF0ZS5mb2N1c2VkLnZhbHVlID0gZmFsc2VcbiAgICAgICAgZW1pdCgnYmx1cicsIGUpXG4gICAgICB9XG5cbiAgICAgIHRoZW4gIT09IHZvaWQgMCAmJiB0aGVuKClcbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gY2xlYXJWYWx1ZSAoZSkge1xuICAgIC8vIHByZXZlbnQgYWN0aXZhdGluZyB0aGUgZmllbGQgYnV0IGtlZXAgZm9jdXMgb24gZGVza3RvcFxuICAgIHN0b3BBbmRQcmV2ZW50KGUpXG5cbiAgICBpZiAoJHEucGxhdGZvcm0uaXMubW9iaWxlICE9PSB0cnVlKSB7XG4gICAgICBjb25zdCBlbCA9IChzdGF0ZS50YXJnZXRSZWYgIT09IHZvaWQgMCAmJiBzdGF0ZS50YXJnZXRSZWYudmFsdWUpIHx8IHN0YXRlLnJvb3RSZWYudmFsdWVcbiAgICAgIGVsLmZvY3VzKClcbiAgICB9XG4gICAgZWxzZSBpZiAoc3RhdGUucm9vdFJlZi52YWx1ZS5jb250YWlucyhkb2N1bWVudC5hY3RpdmVFbGVtZW50KSA9PT0gdHJ1ZSkge1xuICAgICAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5ibHVyKClcbiAgICB9XG5cbiAgICBpZiAocHJvcHMudHlwZSA9PT0gJ2ZpbGUnKSB7IC8vIFRPRE8gdnVlM1xuICAgICAgLy8gZG8gbm90IGxldCBmb2N1cyBiZSB0cmlnZ2VyZWRcbiAgICAgIC8vIGFzIGl0IHdpbGwgbWFrZSB0aGUgbmF0aXZlIGZpbGUgZGlhbG9nXG4gICAgICAvLyBhcHBlYXIgZm9yIGFub3RoZXIgc2VsZWN0aW9uXG4gICAgICBzdGF0ZS5pbnB1dFJlZi52YWx1ZS52YWx1ZSA9IG51bGxcbiAgICB9XG5cbiAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIG51bGwpXG4gICAgZW1pdCgnY2xlYXInLCBwcm9wcy5tb2RlbFZhbHVlKVxuXG4gICAgbmV4dFRpY2soKCkgPT4ge1xuICAgICAgcmVzZXRWYWxpZGF0aW9uKClcblxuICAgICAgaWYgKCRxLnBsYXRmb3JtLmlzLm1vYmlsZSAhPT0gdHJ1ZSkge1xuICAgICAgICBpc0RpcnR5TW9kZWwudmFsdWUgPSBmYWxzZVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiBnZXRDb250ZW50ICgpIHtcbiAgICBjb25zdCBub2RlID0gW11cblxuICAgIHNsb3RzLnByZXBlbmQgIT09IHZvaWQgMCAmJiBub2RlLnB1c2goXG4gICAgICBoKCdkaXYnLCB7XG4gICAgICAgIGNsYXNzOiAncS1maWVsZF9fcHJlcGVuZCBxLWZpZWxkX19tYXJnaW5hbCByb3cgbm8td3JhcCBpdGVtcy1jZW50ZXInLFxuICAgICAgICBrZXk6ICdwcmVwZW5kJyxcbiAgICAgICAgb25DbGljazogcHJldmVudFxuICAgICAgfSwgc2xvdHMucHJlcGVuZCgpKVxuICAgIClcblxuICAgIG5vZGUucHVzaChcbiAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgY2xhc3M6ICdxLWZpZWxkX19jb250cm9sLWNvbnRhaW5lciBjb2wgcmVsYXRpdmUtcG9zaXRpb24gcm93IG5vLXdyYXAgcS1hbmNob3ItLXNraXAnXG4gICAgICB9LCBnZXRDb250cm9sQ29udGFpbmVyKCkpXG4gICAgKVxuXG4gICAgaGFzRXJyb3IudmFsdWUgPT09IHRydWUgJiYgcHJvcHMubm9FcnJvckljb24gPT09IGZhbHNlICYmIG5vZGUucHVzaChcbiAgICAgIGdldElubmVyQXBwZW5kTm9kZSgnZXJyb3InLCBbXG4gICAgICAgIGgoUUljb24sIHsgbmFtZTogJHEuaWNvblNldC5maWVsZC5lcnJvciwgY29sb3I6ICduZWdhdGl2ZScgfSlcbiAgICAgIF0pXG4gICAgKVxuXG4gICAgaWYgKHByb3BzLmxvYWRpbmcgPT09IHRydWUgfHwgc3RhdGUuaW5uZXJMb2FkaW5nLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICBub2RlLnB1c2goXG4gICAgICAgIGdldElubmVyQXBwZW5kTm9kZShcbiAgICAgICAgICAnaW5uZXItbG9hZGluZy1hcHBlbmQnLFxuICAgICAgICAgIHNsb3RzLmxvYWRpbmcgIT09IHZvaWQgMFxuICAgICAgICAgICAgPyBzbG90cy5sb2FkaW5nKClcbiAgICAgICAgICAgIDogWyBoKFFTcGlubmVyLCB7IGNvbG9yOiBwcm9wcy5jb2xvciB9KSBdXG4gICAgICAgIClcbiAgICAgIClcbiAgICB9XG4gICAgZWxzZSBpZiAocHJvcHMuY2xlYXJhYmxlID09PSB0cnVlICYmIHN0YXRlLmhhc1ZhbHVlLnZhbHVlID09PSB0cnVlICYmIHN0YXRlLmVkaXRhYmxlLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICBub2RlLnB1c2goXG4gICAgICAgIGdldElubmVyQXBwZW5kTm9kZSgnaW5uZXItY2xlYXJhYmxlLWFwcGVuZCcsIFtcbiAgICAgICAgICBoKFFJY29uLCB7XG4gICAgICAgICAgICBjbGFzczogJ3EtZmllbGRfX2ZvY3VzYWJsZS1hY3Rpb24nLFxuICAgICAgICAgICAgdGFnOiAnYnV0dG9uJyxcbiAgICAgICAgICAgIG5hbWU6IHByb3BzLmNsZWFySWNvbiB8fCAkcS5pY29uU2V0LmZpZWxkLmNsZWFyLFxuICAgICAgICAgICAgdGFiaW5kZXg6IDAsXG4gICAgICAgICAgICB0eXBlOiAnYnV0dG9uJyxcbiAgICAgICAgICAgICdhcmlhLWhpZGRlbic6IG51bGwsXG4gICAgICAgICAgICByb2xlOiBudWxsLFxuICAgICAgICAgICAgb25DbGljazogY2xlYXJWYWx1ZVxuICAgICAgICAgIH0pXG4gICAgICAgIF0pXG4gICAgICApXG4gICAgfVxuXG4gICAgc2xvdHMuYXBwZW5kICE9PSB2b2lkIDAgJiYgbm9kZS5wdXNoKFxuICAgICAgaCgnZGl2Jywge1xuICAgICAgICBjbGFzczogJ3EtZmllbGRfX2FwcGVuZCBxLWZpZWxkX19tYXJnaW5hbCByb3cgbm8td3JhcCBpdGVtcy1jZW50ZXInLFxuICAgICAgICBrZXk6ICdhcHBlbmQnLFxuICAgICAgICBvbkNsaWNrOiBwcmV2ZW50XG4gICAgICB9LCBzbG90cy5hcHBlbmQoKSlcbiAgICApXG5cbiAgICBzdGF0ZS5nZXRJbm5lckFwcGVuZCAhPT0gdm9pZCAwICYmIG5vZGUucHVzaChcbiAgICAgIGdldElubmVyQXBwZW5kTm9kZSgnaW5uZXItYXBwZW5kJywgc3RhdGUuZ2V0SW5uZXJBcHBlbmQoKSlcbiAgICApXG5cbiAgICBzdGF0ZS5nZXRDb250cm9sQ2hpbGQgIT09IHZvaWQgMCAmJiBub2RlLnB1c2goXG4gICAgICBzdGF0ZS5nZXRDb250cm9sQ2hpbGQoKVxuICAgIClcblxuICAgIHJldHVybiBub2RlXG4gIH1cblxuICBmdW5jdGlvbiBnZXRDb250cm9sQ29udGFpbmVyICgpIHtcbiAgICBjb25zdCBub2RlID0gW11cblxuICAgIHByb3BzLnByZWZpeCAhPT0gdm9pZCAwICYmIHByb3BzLnByZWZpeCAhPT0gbnVsbCAmJiBub2RlLnB1c2goXG4gICAgICBoKCdkaXYnLCB7XG4gICAgICAgIGNsYXNzOiAncS1maWVsZF9fcHJlZml4IG5vLXBvaW50ZXItZXZlbnRzIHJvdyBpdGVtcy1jZW50ZXInXG4gICAgICB9LCBwcm9wcy5wcmVmaXgpXG4gICAgKVxuXG4gICAgaWYgKHN0YXRlLmdldFNoYWRvd0NvbnRyb2wgIT09IHZvaWQgMCAmJiBzdGF0ZS5oYXNTaGFkb3cudmFsdWUgPT09IHRydWUpIHtcbiAgICAgIG5vZGUucHVzaChcbiAgICAgICAgc3RhdGUuZ2V0U2hhZG93Q29udHJvbCgpXG4gICAgICApXG4gICAgfVxuXG4gICAgaWYgKHN0YXRlLmdldENvbnRyb2wgIT09IHZvaWQgMCkge1xuICAgICAgbm9kZS5wdXNoKHN0YXRlLmdldENvbnRyb2woKSlcbiAgICB9XG4gICAgLy8gaW50ZXJuYWwgdXNhZ2Ugb25seTpcbiAgICBlbHNlIGlmIChzbG90cy5yYXdDb250cm9sICE9PSB2b2lkIDApIHtcbiAgICAgIG5vZGUucHVzaChzbG90cy5yYXdDb250cm9sKCkpXG4gICAgfVxuICAgIGVsc2UgaWYgKHNsb3RzLmNvbnRyb2wgIT09IHZvaWQgMCkge1xuICAgICAgbm9kZS5wdXNoKFxuICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgcmVmOiBzdGF0ZS50YXJnZXRSZWYsXG4gICAgICAgICAgY2xhc3M6ICdxLWZpZWxkX19uYXRpdmUgcm93JyxcbiAgICAgICAgICB0YWJpbmRleDogLTEsXG4gICAgICAgICAgLi4uc3RhdGUuc3BsaXRBdHRycy5hdHRyaWJ1dGVzLnZhbHVlLFxuICAgICAgICAgICdkYXRhLWF1dG9mb2N1cyc6IHByb3BzLmF1dG9mb2N1cyA9PT0gdHJ1ZSB8fCB2b2lkIDBcbiAgICAgICAgfSwgc2xvdHMuY29udHJvbChjb250cm9sU2xvdFNjb3BlLnZhbHVlKSlcbiAgICAgIClcbiAgICB9XG5cbiAgICBoYXNMYWJlbC52YWx1ZSA9PT0gdHJ1ZSAmJiBub2RlLnB1c2goXG4gICAgICBoKCdkaXYnLCB7XG4gICAgICAgIGNsYXNzOiBsYWJlbENsYXNzLnZhbHVlXG4gICAgICB9LCBoU2xvdChzbG90cy5sYWJlbCwgcHJvcHMubGFiZWwpKVxuICAgIClcblxuICAgIHByb3BzLnN1ZmZpeCAhPT0gdm9pZCAwICYmIHByb3BzLnN1ZmZpeCAhPT0gbnVsbCAmJiBub2RlLnB1c2goXG4gICAgICBoKCdkaXYnLCB7XG4gICAgICAgIGNsYXNzOiAncS1maWVsZF9fc3VmZml4IG5vLXBvaW50ZXItZXZlbnRzIHJvdyBpdGVtcy1jZW50ZXInXG4gICAgICB9LCBwcm9wcy5zdWZmaXgpXG4gICAgKVxuXG4gICAgcmV0dXJuIG5vZGUuY29uY2F0KGhTbG90KHNsb3RzLmRlZmF1bHQpKVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Qm90dG9tICgpIHtcbiAgICBsZXQgbXNnLCBrZXlcblxuICAgIGlmIChoYXNFcnJvci52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgaWYgKGVycm9yTWVzc2FnZS52YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICBtc2cgPSBbIGgoJ2RpdicsIHsgcm9sZTogJ2FsZXJ0JyB9LCBlcnJvck1lc3NhZ2UudmFsdWUpIF1cbiAgICAgICAga2V5ID0gYHEtLXNsb3QtZXJyb3ItJHsgZXJyb3JNZXNzYWdlLnZhbHVlIH1gXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgbXNnID0gaFNsb3Qoc2xvdHMuZXJyb3IpXG4gICAgICAgIGtleSA9ICdxLS1zbG90LWVycm9yJ1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChwcm9wcy5oaWRlSGludCAhPT0gdHJ1ZSB8fCBzdGF0ZS5mb2N1c2VkLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICBpZiAocHJvcHMuaGludCAhPT0gdm9pZCAwKSB7XG4gICAgICAgIG1zZyA9IFsgaCgnZGl2JywgcHJvcHMuaGludCkgXVxuICAgICAgICBrZXkgPSBgcS0tc2xvdC1oaW50LSR7IHByb3BzLmhpbnQgfWBcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBtc2cgPSBoU2xvdChzbG90cy5oaW50KVxuICAgICAgICBrZXkgPSAncS0tc2xvdC1oaW50J1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGhhc0NvdW50ZXIgPSBwcm9wcy5jb3VudGVyID09PSB0cnVlIHx8IHNsb3RzLmNvdW50ZXIgIT09IHZvaWQgMFxuXG4gICAgaWYgKHByb3BzLmhpZGVCb3R0b21TcGFjZSA9PT0gdHJ1ZSAmJiBoYXNDb3VudGVyID09PSBmYWxzZSAmJiBtc2cgPT09IHZvaWQgMCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3QgbWFpbiA9IGgoJ2RpdicsIHtcbiAgICAgIGtleSxcbiAgICAgIGNsYXNzOiAncS1maWVsZF9fbWVzc2FnZXMgY29sJ1xuICAgIH0sIG1zZylcblxuICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICBjbGFzczogJ3EtZmllbGRfX2JvdHRvbSByb3cgaXRlbXMtc3RhcnQgcS1maWVsZF9fYm90dG9tLS0nXG4gICAgICAgICsgKHByb3BzLmhpZGVCb3R0b21TcGFjZSAhPT0gdHJ1ZSA/ICdhbmltYXRlZCcgOiAnc3RhbGUnKSxcbiAgICAgIG9uQ2xpY2s6IHByZXZlbnRcbiAgICB9LCBbXG4gICAgICBwcm9wcy5oaWRlQm90dG9tU3BhY2UgPT09IHRydWVcbiAgICAgICAgPyBtYWluXG4gICAgICAgIDogaChUcmFuc2l0aW9uLCB7IG5hbWU6ICdxLXRyYW5zaXRpb24tLWZpZWxkLW1lc3NhZ2UnIH0sICgpID0+IG1haW4pLFxuXG4gICAgICBoYXNDb3VudGVyID09PSB0cnVlXG4gICAgICAgID8gaCgnZGl2Jywge1xuICAgICAgICAgIGNsYXNzOiAncS1maWVsZF9fY291bnRlcidcbiAgICAgICAgfSwgc2xvdHMuY291bnRlciAhPT0gdm9pZCAwID8gc2xvdHMuY291bnRlcigpIDogc3RhdGUuY29tcHV0ZWRDb3VudGVyLnZhbHVlKVxuICAgICAgICA6IG51bGxcbiAgICBdKVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0SW5uZXJBcHBlbmROb2RlIChrZXksIGNvbnRlbnQpIHtcbiAgICByZXR1cm4gY29udGVudCA9PT0gbnVsbFxuICAgICAgPyBudWxsXG4gICAgICA6IGgoJ2RpdicsIHtcbiAgICAgICAga2V5LFxuICAgICAgICBjbGFzczogJ3EtZmllbGRfX2FwcGVuZCBxLWZpZWxkX19tYXJnaW5hbCByb3cgbm8td3JhcCBpdGVtcy1jZW50ZXIgcS1hbmNob3ItLXNraXAnXG4gICAgICB9LCBjb250ZW50KVxuICB9XG5cbiAgbGV0IHNob3VsZEFjdGl2YXRlID0gZmFsc2VcblxuICBvbkRlYWN0aXZhdGVkKCgpID0+IHtcbiAgICBzaG91bGRBY3RpdmF0ZSA9IHRydWVcbiAgfSlcblxuICBvbkFjdGl2YXRlZCgoKSA9PiB7XG4gICAgc2hvdWxkQWN0aXZhdGUgPT09IHRydWUgJiYgcHJvcHMuYXV0b2ZvY3VzID09PSB0cnVlICYmIHByb3h5LmZvY3VzKClcbiAgfSlcblxuICBvbk1vdW50ZWQoKCkgPT4ge1xuICAgIGlmIChpc1J1bnRpbWVTc3JQcmVIeWRyYXRpb24udmFsdWUgPT09IHRydWUgJiYgcHJvcHMuZm9yID09PSB2b2lkIDApIHtcbiAgICAgIHN0YXRlLnRhcmdldFVpZC52YWx1ZSA9IGdldFRhcmdldFVpZCgpXG4gICAgfVxuXG4gICAgcHJvcHMuYXV0b2ZvY3VzID09PSB0cnVlICYmIHByb3h5LmZvY3VzKClcbiAgfSlcblxuICBvbkJlZm9yZVVubW91bnQoKCkgPT4ge1xuICAgIGZvY3Vzb3V0VGltZXIgIT09IG51bGwgJiYgY2xlYXJUaW1lb3V0KGZvY3Vzb3V0VGltZXIpXG4gIH0pXG5cbiAgLy8gZXhwb3NlIHB1YmxpYyBtZXRob2RzXG4gIE9iamVjdC5hc3NpZ24ocHJveHksIHsgZm9jdXMsIGJsdXIgfSlcblxuICByZXR1cm4gZnVuY3Rpb24gcmVuZGVyRmllbGQgKCkge1xuICAgIGNvbnN0IGxhYmVsQXR0cnMgPSBzdGF0ZS5nZXRDb250cm9sID09PSB2b2lkIDAgJiYgc2xvdHMuY29udHJvbCA9PT0gdm9pZCAwXG4gICAgICA/IHtcbiAgICAgICAgICAuLi5zdGF0ZS5zcGxpdEF0dHJzLmF0dHJpYnV0ZXMudmFsdWUsXG4gICAgICAgICAgJ2RhdGEtYXV0b2ZvY3VzJzogcHJvcHMuYXV0b2ZvY3VzID09PSB0cnVlIHx8IHZvaWQgMCxcbiAgICAgICAgICAuLi5hdHRyaWJ1dGVzLnZhbHVlXG4gICAgICAgIH1cbiAgICAgIDogYXR0cmlidXRlcy52YWx1ZVxuXG4gICAgcmV0dXJuIGgoJ2xhYmVsJywge1xuICAgICAgcmVmOiBzdGF0ZS5yb290UmVmLFxuICAgICAgY2xhc3M6IFtcbiAgICAgICAgY2xhc3Nlcy52YWx1ZSxcbiAgICAgICAgYXR0cnMuY2xhc3NcbiAgICAgIF0sXG4gICAgICBzdHlsZTogYXR0cnMuc3R5bGUsXG4gICAgICAuLi5sYWJlbEF0dHJzXG4gICAgfSwgW1xuICAgICAgc2xvdHMuYmVmb3JlICE9PSB2b2lkIDBcbiAgICAgICAgPyBoKCdkaXYnLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLWZpZWxkX19iZWZvcmUgcS1maWVsZF9fbWFyZ2luYWwgcm93IG5vLXdyYXAgaXRlbXMtY2VudGVyJyxcbiAgICAgICAgICBvbkNsaWNrOiBwcmV2ZW50XG4gICAgICAgIH0sIHNsb3RzLmJlZm9yZSgpKVxuICAgICAgICA6IG51bGwsXG5cbiAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgY2xhc3M6ICdxLWZpZWxkX19pbm5lciByZWxhdGl2ZS1wb3NpdGlvbiBjb2wgc2VsZi1zdHJldGNoJ1xuICAgICAgfSwgW1xuICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgcmVmOiBzdGF0ZS5jb250cm9sUmVmLFxuICAgICAgICAgIGNsYXNzOiBjb250ZW50Q2xhc3MudmFsdWUsXG4gICAgICAgICAgdGFiaW5kZXg6IC0xLFxuICAgICAgICAgIC4uLnN0YXRlLmNvbnRyb2xFdmVudHNcbiAgICAgICAgfSwgZ2V0Q29udGVudCgpKSxcblxuICAgICAgICBzaG91bGRSZW5kZXJCb3R0b20udmFsdWUgPT09IHRydWVcbiAgICAgICAgICA/IGdldEJvdHRvbSgpXG4gICAgICAgICAgOiBudWxsXG4gICAgICBdKSxcblxuICAgICAgc2xvdHMuYWZ0ZXIgIT09IHZvaWQgMFxuICAgICAgICA/IGgoJ2RpdicsIHtcbiAgICAgICAgICBjbGFzczogJ3EtZmllbGRfX2FmdGVyIHEtZmllbGRfX21hcmdpbmFsIHJvdyBuby13cmFwIGl0ZW1zLWNlbnRlcicsXG4gICAgICAgICAgb25DbGljazogcHJldmVudFxuICAgICAgICB9LCBzbG90cy5hZnRlcigpKVxuICAgICAgICA6IG51bGxcbiAgICBdKVxuICB9XG59XG4iLCJpbXBvcnQgeyByZWYsIHdhdGNoLCBuZXh0VGljayB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgc2hvdWxkSWdub3JlS2V5IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9rZXktY29tcG9zaXRpb24uanMnXG5cbi8vIGxlYXZlIE5BTUVEX01BU0tTIGF0IHRvcCBvZiBmaWxlIChjb2RlIHJlZmVyZW5jZWQgZnJvbSBkb2NzKVxuY29uc3QgTkFNRURfTUFTS1MgPSB7XG4gIGRhdGU6ICcjIyMjLyMjLyMjJyxcbiAgZGF0ZXRpbWU6ICcjIyMjLyMjLyMjICMjOiMjJyxcbiAgdGltZTogJyMjOiMjJyxcbiAgZnVsbHRpbWU6ICcjIzojIzojIycsXG4gIHBob25lOiAnKCMjIykgIyMjIC0gIyMjIycsXG4gIGNhcmQ6ICcjIyMjICMjIyMgIyMjIyAjIyMjJ1xufVxuXG5jb25zdCBUT0tFTlMgPSB7XG4gICcjJzogeyBwYXR0ZXJuOiAnW1xcXFxkXScsIG5lZ2F0ZTogJ1teXFxcXGRdJyB9LFxuXG4gIFM6IHsgcGF0dGVybjogJ1thLXpBLVpdJywgbmVnYXRlOiAnW15hLXpBLVpdJyB9LFxuICBOOiB7IHBhdHRlcm46ICdbMC05YS16QS1aXScsIG5lZ2F0ZTogJ1teMC05YS16QS1aXScgfSxcblxuICBBOiB7IHBhdHRlcm46ICdbYS16QS1aXScsIG5lZ2F0ZTogJ1teYS16QS1aXScsIHRyYW5zZm9ybTogdiA9PiB2LnRvTG9jYWxlVXBwZXJDYXNlKCkgfSxcbiAgYTogeyBwYXR0ZXJuOiAnW2EtekEtWl0nLCBuZWdhdGU6ICdbXmEtekEtWl0nLCB0cmFuc2Zvcm06IHYgPT4gdi50b0xvY2FsZUxvd2VyQ2FzZSgpIH0sXG5cbiAgWDogeyBwYXR0ZXJuOiAnWzAtOWEtekEtWl0nLCBuZWdhdGU6ICdbXjAtOWEtekEtWl0nLCB0cmFuc2Zvcm06IHYgPT4gdi50b0xvY2FsZVVwcGVyQ2FzZSgpIH0sXG4gIHg6IHsgcGF0dGVybjogJ1swLTlhLXpBLVpdJywgbmVnYXRlOiAnW14wLTlhLXpBLVpdJywgdHJhbnNmb3JtOiB2ID0+IHYudG9Mb2NhbGVMb3dlckNhc2UoKSB9XG59XG5cbmNvbnN0IEtFWVMgPSBPYmplY3Qua2V5cyhUT0tFTlMpXG5LRVlTLmZvckVhY2goa2V5ID0+IHtcbiAgVE9LRU5TWyBrZXkgXS5yZWdleCA9IG5ldyBSZWdFeHAoVE9LRU5TWyBrZXkgXS5wYXR0ZXJuKVxufSlcblxuY29uc3RcbiAgdG9rZW5SZWdleE1hc2sgPSBuZXcgUmVnRXhwKCdcXFxcXFxcXChbXi4qKz9eJHt9KCl8KFtcXFxcXV0pfChbLiorP14ke30oKXxbXFxcXF1dKXwoWycgKyBLRVlTLmpvaW4oJycpICsgJ10pfCguKScsICdnJyksXG4gIGVzY1JlZ2V4ID0gL1suKis/XiR7fSgpfFtcXF1cXFxcXS9nXG5cbmNvbnN0IE1BUktFUiA9IFN0cmluZy5mcm9tQ2hhckNvZGUoMSlcblxuZXhwb3J0IGNvbnN0IHVzZU1hc2tQcm9wcyA9IHtcbiAgbWFzazogU3RyaW5nLFxuICByZXZlcnNlRmlsbE1hc2s6IEJvb2xlYW4sXG4gIGZpbGxNYXNrOiBbIEJvb2xlYW4sIFN0cmluZyBdLFxuICB1bm1hc2tlZFZhbHVlOiBCb29sZWFuXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgZW1pdCwgZW1pdFZhbHVlLCBpbnB1dFJlZikge1xuICBsZXQgbWFza01hcmtlZCwgbWFza1JlcGxhY2VkLCBjb21wdXRlZE1hc2ssIGNvbXB1dGVkVW5tYXNrLCBwYXN0ZWRUZXh0U3RhcnQsIHNlbGVjdGlvbkFuY2hvclxuXG4gIGNvbnN0IGhhc01hc2sgPSByZWYobnVsbClcbiAgY29uc3QgaW5uZXJWYWx1ZSA9IHJlZihnZXRJbml0aWFsTWFza2VkVmFsdWUoKSlcblxuICBmdW5jdGlvbiBnZXRJc1R5cGVUZXh0ICgpIHtcbiAgICByZXR1cm4gcHJvcHMuYXV0b2dyb3cgPT09IHRydWVcbiAgICAgIHx8IFsgJ3RleHRhcmVhJywgJ3RleHQnLCAnc2VhcmNoJywgJ3VybCcsICd0ZWwnLCAncGFzc3dvcmQnIF0uaW5jbHVkZXMocHJvcHMudHlwZSlcbiAgfVxuXG4gIHdhdGNoKCgpID0+IHByb3BzLnR5cGUgKyBwcm9wcy5hdXRvZ3JvdywgdXBkYXRlTWFza0ludGVybmFscylcblxuICB3YXRjaCgoKSA9PiBwcm9wcy5tYXNrLCB2ID0+IHtcbiAgICBpZiAodiAhPT0gdm9pZCAwKSB7XG4gICAgICB1cGRhdGVNYXNrVmFsdWUoaW5uZXJWYWx1ZS52YWx1ZSwgdHJ1ZSlcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBjb25zdCB2YWwgPSB1bm1hc2tWYWx1ZShpbm5lclZhbHVlLnZhbHVlKVxuICAgICAgdXBkYXRlTWFza0ludGVybmFscygpXG4gICAgICBwcm9wcy5tb2RlbFZhbHVlICE9PSB2YWwgJiYgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCB2YWwpXG4gICAgfVxuICB9KVxuXG4gIHdhdGNoKCgpID0+IHByb3BzLmZpbGxNYXNrICsgcHJvcHMucmV2ZXJzZUZpbGxNYXNrLCAoKSA9PiB7XG4gICAgaGFzTWFzay52YWx1ZSA9PT0gdHJ1ZSAmJiB1cGRhdGVNYXNrVmFsdWUoaW5uZXJWYWx1ZS52YWx1ZSwgdHJ1ZSlcbiAgfSlcblxuICB3YXRjaCgoKSA9PiBwcm9wcy51bm1hc2tlZFZhbHVlLCAoKSA9PiB7XG4gICAgaGFzTWFzay52YWx1ZSA9PT0gdHJ1ZSAmJiB1cGRhdGVNYXNrVmFsdWUoaW5uZXJWYWx1ZS52YWx1ZSlcbiAgfSlcblxuICBmdW5jdGlvbiBnZXRJbml0aWFsTWFza2VkVmFsdWUgKCkge1xuICAgIHVwZGF0ZU1hc2tJbnRlcm5hbHMoKVxuXG4gICAgaWYgKGhhc01hc2sudmFsdWUgPT09IHRydWUpIHtcbiAgICAgIGNvbnN0IG1hc2tlZCA9IG1hc2tWYWx1ZSh1bm1hc2tWYWx1ZShwcm9wcy5tb2RlbFZhbHVlKSlcblxuICAgICAgcmV0dXJuIHByb3BzLmZpbGxNYXNrICE9PSBmYWxzZVxuICAgICAgICA/IGZpbGxXaXRoTWFzayhtYXNrZWQpXG4gICAgICAgIDogbWFza2VkXG4gICAgfVxuXG4gICAgcmV0dXJuIHByb3BzLm1vZGVsVmFsdWVcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFBhZGRlZE1hc2tNYXJrZWQgKHNpemUpIHtcbiAgICBpZiAoc2l6ZSA8IG1hc2tNYXJrZWQubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gbWFza01hcmtlZC5zbGljZSgtc2l6ZSlcbiAgICB9XG5cbiAgICBsZXQgcGFkID0gJycsIGxvY2FsTWFza01hcmtlZCA9IG1hc2tNYXJrZWRcbiAgICBjb25zdCBwYWRQb3MgPSBsb2NhbE1hc2tNYXJrZWQuaW5kZXhPZihNQVJLRVIpXG5cbiAgICBpZiAocGFkUG9zID4gLTEpIHtcbiAgICAgIGZvciAobGV0IGkgPSBzaXplIC0gbG9jYWxNYXNrTWFya2VkLmxlbmd0aDsgaSA+IDA7IGktLSkge1xuICAgICAgICBwYWQgKz0gTUFSS0VSXG4gICAgICB9XG5cbiAgICAgIGxvY2FsTWFza01hcmtlZCA9IGxvY2FsTWFza01hcmtlZC5zbGljZSgwLCBwYWRQb3MpICsgcGFkICsgbG9jYWxNYXNrTWFya2VkLnNsaWNlKHBhZFBvcylcbiAgICB9XG5cbiAgICByZXR1cm4gbG9jYWxNYXNrTWFya2VkXG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVNYXNrSW50ZXJuYWxzICgpIHtcbiAgICBoYXNNYXNrLnZhbHVlID0gcHJvcHMubWFzayAhPT0gdm9pZCAwXG4gICAgICAmJiBwcm9wcy5tYXNrLmxlbmd0aCA+IDBcbiAgICAgICYmIGdldElzVHlwZVRleHQoKVxuXG4gICAgaWYgKGhhc01hc2sudmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICBjb21wdXRlZFVubWFzayA9IHZvaWQgMFxuICAgICAgbWFza01hcmtlZCA9ICcnXG4gICAgICBtYXNrUmVwbGFjZWQgPSAnJ1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3RcbiAgICAgIGxvY2FsQ29tcHV0ZWRNYXNrID0gTkFNRURfTUFTS1NbIHByb3BzLm1hc2sgXSA9PT0gdm9pZCAwXG4gICAgICAgID8gcHJvcHMubWFza1xuICAgICAgICA6IE5BTUVEX01BU0tTWyBwcm9wcy5tYXNrIF0sXG4gICAgICBmaWxsQ2hhciA9IHR5cGVvZiBwcm9wcy5maWxsTWFzayA9PT0gJ3N0cmluZycgJiYgcHJvcHMuZmlsbE1hc2subGVuZ3RoID4gMFxuICAgICAgICA/IHByb3BzLmZpbGxNYXNrLnNsaWNlKDAsIDEpXG4gICAgICAgIDogJ18nLFxuICAgICAgZmlsbENoYXJFc2NhcGVkID0gZmlsbENoYXIucmVwbGFjZShlc2NSZWdleCwgJ1xcXFwkJicpLFxuICAgICAgdW5tYXNrID0gW10sXG4gICAgICBleHRyYWN0ID0gW10sXG4gICAgICBtYXNrID0gW11cblxuICAgIGxldFxuICAgICAgZmlyc3RNYXRjaCA9IHByb3BzLnJldmVyc2VGaWxsTWFzayA9PT0gdHJ1ZSxcbiAgICAgIHVubWFza0NoYXIgPSAnJyxcbiAgICAgIG5lZ2F0ZUNoYXIgPSAnJ1xuXG4gICAgbG9jYWxDb21wdXRlZE1hc2sucmVwbGFjZSh0b2tlblJlZ2V4TWFzaywgKF8sIGNoYXIxLCBlc2MsIHRva2VuLCBjaGFyMikgPT4ge1xuICAgICAgaWYgKHRva2VuICE9PSB2b2lkIDApIHtcbiAgICAgICAgY29uc3QgYyA9IFRPS0VOU1sgdG9rZW4gXVxuICAgICAgICBtYXNrLnB1c2goYylcbiAgICAgICAgbmVnYXRlQ2hhciA9IGMubmVnYXRlXG4gICAgICAgIGlmIChmaXJzdE1hdGNoID09PSB0cnVlKSB7XG4gICAgICAgICAgZXh0cmFjdC5wdXNoKCcoPzonICsgbmVnYXRlQ2hhciArICcrKT8oJyArIGMucGF0dGVybiArICcrKT8oPzonICsgbmVnYXRlQ2hhciArICcrKT8oJyArIGMucGF0dGVybiArICcrKT8nKVxuICAgICAgICAgIGZpcnN0TWF0Y2ggPSBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIGV4dHJhY3QucHVzaCgnKD86JyArIG5lZ2F0ZUNoYXIgKyAnKyk/KCcgKyBjLnBhdHRlcm4gKyAnKT8nKVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAoZXNjICE9PSB2b2lkIDApIHtcbiAgICAgICAgdW5tYXNrQ2hhciA9ICdcXFxcJyArIChlc2MgPT09ICdcXFxcJyA/ICcnIDogZXNjKVxuICAgICAgICBtYXNrLnB1c2goZXNjKVxuICAgICAgICB1bm1hc2sucHVzaCgnKFteJyArIHVubWFza0NoYXIgKyAnXSspPycgKyB1bm1hc2tDaGFyICsgJz8nKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGNvbnN0IGMgPSBjaGFyMSAhPT0gdm9pZCAwID8gY2hhcjEgOiBjaGFyMlxuICAgICAgICB1bm1hc2tDaGFyID0gYyA9PT0gJ1xcXFwnID8gJ1xcXFxcXFxcXFxcXFxcXFwnIDogYy5yZXBsYWNlKGVzY1JlZ2V4LCAnXFxcXFxcXFwkJicpXG4gICAgICAgIG1hc2sucHVzaChjKVxuICAgICAgICB1bm1hc2sucHVzaCgnKFteJyArIHVubWFza0NoYXIgKyAnXSspPycgKyB1bm1hc2tDaGFyICsgJz8nKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBjb25zdFxuICAgICAgdW5tYXNrTWF0Y2hlciA9IG5ldyBSZWdFeHAoXG4gICAgICAgICdeJ1xuICAgICAgICArIHVubWFzay5qb2luKCcnKVxuICAgICAgICArICcoJyArICh1bm1hc2tDaGFyID09PSAnJyA/ICcuJyA6ICdbXicgKyB1bm1hc2tDaGFyICsgJ10nKSArICcrKT8nXG4gICAgICAgICsgKHVubWFza0NoYXIgPT09ICcnID8gJycgOiAnWycgKyB1bm1hc2tDaGFyICsgJ10qJykgKyAnJCdcbiAgICAgICksXG4gICAgICBleHRyYWN0TGFzdCA9IGV4dHJhY3QubGVuZ3RoIC0gMSxcbiAgICAgIGV4dHJhY3RNYXRjaGVyID0gZXh0cmFjdC5tYXAoKHJlLCBpbmRleCkgPT4ge1xuICAgICAgICBpZiAoaW5kZXggPT09IDAgJiYgcHJvcHMucmV2ZXJzZUZpbGxNYXNrID09PSB0cnVlKSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoJ14nICsgZmlsbENoYXJFc2NhcGVkICsgJyonICsgcmUpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaW5kZXggPT09IGV4dHJhY3RMYXN0KSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoXG4gICAgICAgICAgICAnXicgKyByZVxuICAgICAgICAgICAgKyAnKCcgKyAobmVnYXRlQ2hhciA9PT0gJycgPyAnLicgOiBuZWdhdGVDaGFyKSArICcrKT8nXG4gICAgICAgICAgICArIChwcm9wcy5yZXZlcnNlRmlsbE1hc2sgPT09IHRydWUgPyAnJCcgOiBmaWxsQ2hhckVzY2FwZWQgKyAnKicpXG4gICAgICAgICAgKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoJ14nICsgcmUpXG4gICAgICB9KVxuXG4gICAgY29tcHV0ZWRNYXNrID0gbWFza1xuICAgIGNvbXB1dGVkVW5tYXNrID0gdmFsID0+IHtcbiAgICAgIGNvbnN0IHVubWFza01hdGNoID0gdW5tYXNrTWF0Y2hlci5leGVjKHByb3BzLnJldmVyc2VGaWxsTWFzayA9PT0gdHJ1ZSA/IHZhbCA6IHZhbC5zbGljZSgwLCBtYXNrLmxlbmd0aCArIDEpKVxuICAgICAgaWYgKHVubWFza01hdGNoICE9PSBudWxsKSB7XG4gICAgICAgIHZhbCA9IHVubWFza01hdGNoLnNsaWNlKDEpLmpvaW4oJycpXG4gICAgICB9XG5cbiAgICAgIGNvbnN0XG4gICAgICAgIGV4dHJhY3RNYXRjaCA9IFtdLFxuICAgICAgICBleHRyYWN0TWF0Y2hlckxlbmd0aCA9IGV4dHJhY3RNYXRjaGVyLmxlbmd0aFxuXG4gICAgICBmb3IgKGxldCBpID0gMCwgc3RyID0gdmFsOyBpIDwgZXh0cmFjdE1hdGNoZXJMZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBtID0gZXh0cmFjdE1hdGNoZXJbIGkgXS5leGVjKHN0cilcblxuICAgICAgICBpZiAobSA9PT0gbnVsbCkge1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cblxuICAgICAgICBzdHIgPSBzdHIuc2xpY2UobS5zaGlmdCgpLmxlbmd0aClcbiAgICAgICAgZXh0cmFjdE1hdGNoLnB1c2goLi4ubSlcbiAgICAgIH1cbiAgICAgIGlmIChleHRyYWN0TWF0Y2gubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm4gZXh0cmFjdE1hdGNoLmpvaW4oJycpXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB2YWxcbiAgICB9XG4gICAgbWFza01hcmtlZCA9IG1hc2subWFwKHYgPT4gKHR5cGVvZiB2ID09PSAnc3RyaW5nJyA/IHYgOiBNQVJLRVIpKS5qb2luKCcnKVxuICAgIG1hc2tSZXBsYWNlZCA9IG1hc2tNYXJrZWQuc3BsaXQoTUFSS0VSKS5qb2luKGZpbGxDaGFyKVxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlTWFza1ZhbHVlIChyYXdWYWwsIHVwZGF0ZU1hc2tJbnRlcm5hbHNGbGFnLCBpbnB1dFR5cGUpIHtcbiAgICBjb25zdFxuICAgICAgaW5wID0gaW5wdXRSZWYudmFsdWUsXG4gICAgICBlbmQgPSBpbnAuc2VsZWN0aW9uRW5kLFxuICAgICAgZW5kUmV2ZXJzZSA9IGlucC52YWx1ZS5sZW5ndGggLSBlbmQsXG4gICAgICB1bm1hc2tlZCA9IHVubWFza1ZhbHVlKHJhd1ZhbClcblxuICAgIC8vIFVwZGF0ZSBoZXJlIHNvIHVubWFzayB1c2VzIHRoZSBvcmlnaW5hbCBmaWxsQ2hhclxuICAgIHVwZGF0ZU1hc2tJbnRlcm5hbHNGbGFnID09PSB0cnVlICYmIHVwZGF0ZU1hc2tJbnRlcm5hbHMoKVxuXG4gICAgY29uc3RcbiAgICAgIHByZU1hc2tlZCA9IG1hc2tWYWx1ZSh1bm1hc2tlZCksXG4gICAgICBtYXNrZWQgPSBwcm9wcy5maWxsTWFzayAhPT0gZmFsc2VcbiAgICAgICAgPyBmaWxsV2l0aE1hc2socHJlTWFza2VkKVxuICAgICAgICA6IHByZU1hc2tlZCxcbiAgICAgIGNoYW5nZWQgPSBpbm5lclZhbHVlLnZhbHVlICE9PSBtYXNrZWRcblxuICAgIC8vIFdlIHdhbnQgdG8gYXZvaWQgXCJmbGlja2VyaW5nXCIgc28gd2Ugc2V0IHZhbHVlIGltbWVkaWF0ZWx5XG4gICAgaW5wLnZhbHVlICE9PSBtYXNrZWQgJiYgKGlucC52YWx1ZSA9IG1hc2tlZClcblxuICAgIGNoYW5nZWQgPT09IHRydWUgJiYgKGlubmVyVmFsdWUudmFsdWUgPSBtYXNrZWQpXG5cbiAgICBkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBpbnAgJiYgbmV4dFRpY2soKCkgPT4ge1xuICAgICAgaWYgKG1hc2tlZCA9PT0gbWFza1JlcGxhY2VkKSB7XG4gICAgICAgIGNvbnN0IGN1cnNvciA9IHByb3BzLnJldmVyc2VGaWxsTWFzayA9PT0gdHJ1ZSA/IG1hc2tSZXBsYWNlZC5sZW5ndGggOiAwXG4gICAgICAgIGlucC5zZXRTZWxlY3Rpb25SYW5nZShjdXJzb3IsIGN1cnNvciwgJ2ZvcndhcmQnKVxuXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpZiAoaW5wdXRUeXBlID09PSAnaW5zZXJ0RnJvbVBhc3RlJyAmJiBwcm9wcy5yZXZlcnNlRmlsbE1hc2sgIT09IHRydWUpIHtcbiAgICAgICAgY29uc3QgbWF4RW5kID0gaW5wLnNlbGVjdGlvbkVuZFxuICAgICAgICBsZXQgY3Vyc29yID0gZW5kIC0gMVxuICAgICAgICAvLyBlYWNoIG5vbi1tYXJrZXIgY2hhciBtZWFucyB3ZSBtb3ZlIG9uY2UgdG8gcmlnaHRcbiAgICAgICAgZm9yIChsZXQgaSA9IHBhc3RlZFRleHRTdGFydDsgaSA8PSBjdXJzb3IgJiYgaSA8IG1heEVuZDsgaSsrKSB7XG4gICAgICAgICAgaWYgKG1hc2tNYXJrZWRbIGkgXSAhPT0gTUFSS0VSKSB7XG4gICAgICAgICAgICBjdXJzb3IrK1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBtb3ZlQ3Vyc29yLnJpZ2h0KGlucCwgY3Vyc29yKVxuXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpZiAoWyAnZGVsZXRlQ29udGVudEJhY2t3YXJkJywgJ2RlbGV0ZUNvbnRlbnRGb3J3YXJkJyBdLmluZGV4T2YoaW5wdXRUeXBlKSA+IC0xKSB7XG4gICAgICAgIGNvbnN0IGN1cnNvciA9IHByb3BzLnJldmVyc2VGaWxsTWFzayA9PT0gdHJ1ZVxuICAgICAgICAgID8gKFxuICAgICAgICAgICAgICBlbmQgPT09IDBcbiAgICAgICAgICAgICAgICA/IChtYXNrZWQubGVuZ3RoID4gcHJlTWFza2VkLmxlbmd0aCA/IDEgOiAwKVxuICAgICAgICAgICAgICAgIDogTWF0aC5tYXgoMCwgbWFza2VkLmxlbmd0aCAtIChtYXNrZWQgPT09IG1hc2tSZXBsYWNlZCA/IDAgOiBNYXRoLm1pbihwcmVNYXNrZWQubGVuZ3RoLCBlbmRSZXZlcnNlKSArIDEpKSArIDFcbiAgICAgICAgICAgIClcbiAgICAgICAgICA6IGVuZFxuXG4gICAgICAgIGlucC5zZXRTZWxlY3Rpb25SYW5nZShjdXJzb3IsIGN1cnNvciwgJ2ZvcndhcmQnKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKHByb3BzLnJldmVyc2VGaWxsTWFzayA9PT0gdHJ1ZSkge1xuICAgICAgICBpZiAoY2hhbmdlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGNvbnN0IGN1cnNvciA9IE1hdGgubWF4KDAsIG1hc2tlZC5sZW5ndGggLSAobWFza2VkID09PSBtYXNrUmVwbGFjZWQgPyAwIDogTWF0aC5taW4ocHJlTWFza2VkLmxlbmd0aCwgZW5kUmV2ZXJzZSArIDEpKSlcblxuICAgICAgICAgIGlmIChjdXJzb3IgPT09IDEgJiYgZW5kID09PSAxKSB7XG4gICAgICAgICAgICBpbnAuc2V0U2VsZWN0aW9uUmFuZ2UoY3Vyc29yLCBjdXJzb3IsICdmb3J3YXJkJylcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBtb3ZlQ3Vyc29yLnJpZ2h0UmV2ZXJzZShpbnAsIGN1cnNvcilcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgY29uc3QgY3Vyc29yID0gbWFza2VkLmxlbmd0aCAtIGVuZFJldmVyc2VcbiAgICAgICAgICBpbnAuc2V0U2VsZWN0aW9uUmFuZ2UoY3Vyc29yLCBjdXJzb3IsICdiYWNrd2FyZCcpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBpZiAoY2hhbmdlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGNvbnN0IGN1cnNvciA9IE1hdGgubWF4KDAsIG1hc2tNYXJrZWQuaW5kZXhPZihNQVJLRVIpLCBNYXRoLm1pbihwcmVNYXNrZWQubGVuZ3RoLCBlbmQpIC0gMSlcbiAgICAgICAgICBtb3ZlQ3Vyc29yLnJpZ2h0KGlucCwgY3Vyc29yKVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGNvbnN0IGN1cnNvciA9IGVuZCAtIDFcbiAgICAgICAgICBtb3ZlQ3Vyc29yLnJpZ2h0KGlucCwgY3Vyc29yKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcblxuICAgIGNvbnN0IHZhbCA9IHByb3BzLnVubWFza2VkVmFsdWUgPT09IHRydWVcbiAgICAgID8gdW5tYXNrVmFsdWUobWFza2VkKVxuICAgICAgOiBtYXNrZWRcblxuICAgIFN0cmluZyhwcm9wcy5tb2RlbFZhbHVlKSAhPT0gdmFsICYmIGVtaXRWYWx1ZSh2YWwsIHRydWUpXG4gIH1cblxuICBmdW5jdGlvbiBtb3ZlQ3Vyc29yRm9yUGFzdGUgKGlucCwgc3RhcnQsIGVuZCkge1xuICAgIGNvbnN0IHByZU1hc2tlZCA9IG1hc2tWYWx1ZSh1bm1hc2tWYWx1ZShpbnAudmFsdWUpKVxuXG4gICAgc3RhcnQgPSBNYXRoLm1heCgwLCBtYXNrTWFya2VkLmluZGV4T2YoTUFSS0VSKSwgTWF0aC5taW4ocHJlTWFza2VkLmxlbmd0aCwgc3RhcnQpKVxuICAgIHBhc3RlZFRleHRTdGFydCA9IHN0YXJ0XG5cbiAgICBpbnAuc2V0U2VsZWN0aW9uUmFuZ2Uoc3RhcnQsIGVuZCwgJ2ZvcndhcmQnKVxuICB9XG5cbiAgY29uc3QgbW92ZUN1cnNvciA9IHtcbiAgICBsZWZ0IChpbnAsIGN1cnNvcikge1xuICAgICAgY29uc3Qgbm9NYXJrQmVmb3JlID0gbWFza01hcmtlZC5zbGljZShjdXJzb3IgLSAxKS5pbmRleE9mKE1BUktFUikgPT09IC0xXG4gICAgICBsZXQgaSA9IE1hdGgubWF4KDAsIGN1cnNvciAtIDEpXG5cbiAgICAgIGZvciAoOyBpID49IDA7IGktLSkge1xuICAgICAgICBpZiAobWFza01hcmtlZFsgaSBdID09PSBNQVJLRVIpIHtcbiAgICAgICAgICBjdXJzb3IgPSBpXG4gICAgICAgICAgbm9NYXJrQmVmb3JlID09PSB0cnVlICYmIGN1cnNvcisrXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoXG4gICAgICAgIGkgPCAwXG4gICAgICAgICYmIG1hc2tNYXJrZWRbIGN1cnNvciBdICE9PSB2b2lkIDBcbiAgICAgICAgJiYgbWFza01hcmtlZFsgY3Vyc29yIF0gIT09IE1BUktFUlxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBtb3ZlQ3Vyc29yLnJpZ2h0KGlucCwgMClcbiAgICAgIH1cblxuICAgICAgY3Vyc29yID49IDAgJiYgaW5wLnNldFNlbGVjdGlvblJhbmdlKGN1cnNvciwgY3Vyc29yLCAnYmFja3dhcmQnKVxuICAgIH0sXG5cbiAgICByaWdodCAoaW5wLCBjdXJzb3IpIHtcbiAgICAgIGNvbnN0IGxpbWl0ID0gaW5wLnZhbHVlLmxlbmd0aFxuICAgICAgbGV0IGkgPSBNYXRoLm1pbihsaW1pdCwgY3Vyc29yICsgMSlcblxuICAgICAgZm9yICg7IGkgPD0gbGltaXQ7IGkrKykge1xuICAgICAgICBpZiAobWFza01hcmtlZFsgaSBdID09PSBNQVJLRVIpIHtcbiAgICAgICAgICBjdXJzb3IgPSBpXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChtYXNrTWFya2VkWyBpIC0gMSBdID09PSBNQVJLRVIpIHtcbiAgICAgICAgICBjdXJzb3IgPSBpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICBpID4gbGltaXRcbiAgICAgICAgJiYgbWFza01hcmtlZFsgY3Vyc29yIC0gMSBdICE9PSB2b2lkIDBcbiAgICAgICAgJiYgbWFza01hcmtlZFsgY3Vyc29yIC0gMSBdICE9PSBNQVJLRVJcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gbW92ZUN1cnNvci5sZWZ0KGlucCwgbGltaXQpXG4gICAgICB9XG5cbiAgICAgIGlucC5zZXRTZWxlY3Rpb25SYW5nZShjdXJzb3IsIGN1cnNvciwgJ2ZvcndhcmQnKVxuICAgIH0sXG5cbiAgICBsZWZ0UmV2ZXJzZSAoaW5wLCBjdXJzb3IpIHtcbiAgICAgIGNvbnN0XG4gICAgICAgIGxvY2FsTWFza01hcmtlZCA9IGdldFBhZGRlZE1hc2tNYXJrZWQoaW5wLnZhbHVlLmxlbmd0aClcbiAgICAgIGxldCBpID0gTWF0aC5tYXgoMCwgY3Vyc29yIC0gMSlcblxuICAgICAgZm9yICg7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIGlmIChsb2NhbE1hc2tNYXJrZWRbIGkgLSAxIF0gPT09IE1BUktFUikge1xuICAgICAgICAgIGN1cnNvciA9IGlcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGxvY2FsTWFza01hcmtlZFsgaSBdID09PSBNQVJLRVIpIHtcbiAgICAgICAgICBjdXJzb3IgPSBpXG4gICAgICAgICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgaSA8IDBcbiAgICAgICAgJiYgbG9jYWxNYXNrTWFya2VkWyBjdXJzb3IgXSAhPT0gdm9pZCAwXG4gICAgICAgICYmIGxvY2FsTWFza01hcmtlZFsgY3Vyc29yIF0gIT09IE1BUktFUlxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBtb3ZlQ3Vyc29yLnJpZ2h0UmV2ZXJzZShpbnAsIDApXG4gICAgICB9XG5cbiAgICAgIGN1cnNvciA+PSAwICYmIGlucC5zZXRTZWxlY3Rpb25SYW5nZShjdXJzb3IsIGN1cnNvciwgJ2JhY2t3YXJkJylcbiAgICB9LFxuXG4gICAgcmlnaHRSZXZlcnNlIChpbnAsIGN1cnNvcikge1xuICAgICAgY29uc3RcbiAgICAgICAgbGltaXQgPSBpbnAudmFsdWUubGVuZ3RoLFxuICAgICAgICBsb2NhbE1hc2tNYXJrZWQgPSBnZXRQYWRkZWRNYXNrTWFya2VkKGxpbWl0KSxcbiAgICAgICAgbm9NYXJrQmVmb3JlID0gbG9jYWxNYXNrTWFya2VkLnNsaWNlKDAsIGN1cnNvciArIDEpLmluZGV4T2YoTUFSS0VSKSA9PT0gLTFcbiAgICAgIGxldCBpID0gTWF0aC5taW4obGltaXQsIGN1cnNvciArIDEpXG5cbiAgICAgIGZvciAoOyBpIDw9IGxpbWl0OyBpKyspIHtcbiAgICAgICAgaWYgKGxvY2FsTWFza01hcmtlZFsgaSAtIDEgXSA9PT0gTUFSS0VSKSB7XG4gICAgICAgICAgY3Vyc29yID0gaVxuICAgICAgICAgIGN1cnNvciA+IDAgJiYgbm9NYXJrQmVmb3JlID09PSB0cnVlICYmIGN1cnNvci0tXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoXG4gICAgICAgIGkgPiBsaW1pdFxuICAgICAgICAmJiBsb2NhbE1hc2tNYXJrZWRbIGN1cnNvciAtIDEgXSAhPT0gdm9pZCAwXG4gICAgICAgICYmIGxvY2FsTWFza01hcmtlZFsgY3Vyc29yIC0gMSBdICE9PSBNQVJLRVJcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gbW92ZUN1cnNvci5sZWZ0UmV2ZXJzZShpbnAsIGxpbWl0KVxuICAgICAgfVxuXG4gICAgICBpbnAuc2V0U2VsZWN0aW9uUmFuZ2UoY3Vyc29yLCBjdXJzb3IsICdmb3J3YXJkJylcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvbk1hc2tlZENsaWNrIChlKSB7XG4gICAgZW1pdCgnY2xpY2snLCBlKVxuXG4gICAgc2VsZWN0aW9uQW5jaG9yID0gdm9pZCAwXG4gIH1cblxuICBmdW5jdGlvbiBvbk1hc2tlZEtleWRvd24gKGUpIHtcbiAgICBlbWl0KCdrZXlkb3duJywgZSlcblxuICAgIGlmIChzaG91bGRJZ25vcmVLZXkoZSkgPT09IHRydWUpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0XG4gICAgICBpbnAgPSBpbnB1dFJlZi52YWx1ZSxcbiAgICAgIHN0YXJ0ID0gaW5wLnNlbGVjdGlvblN0YXJ0LFxuICAgICAgZW5kID0gaW5wLnNlbGVjdGlvbkVuZFxuXG4gICAgaWYgKCFlLnNoaWZ0S2V5KSB7XG4gICAgICBzZWxlY3Rpb25BbmNob3IgPSB2b2lkIDBcbiAgICB9XG5cbiAgICBpZiAoZS5rZXlDb2RlID09PSAzNyB8fCBlLmtleUNvZGUgPT09IDM5KSB7IC8vIExlZnQgLyBSaWdodFxuICAgICAgaWYgKGUuc2hpZnRLZXkgJiYgc2VsZWN0aW9uQW5jaG9yID09PSB2b2lkIDApIHtcbiAgICAgICAgc2VsZWN0aW9uQW5jaG9yID0gaW5wLnNlbGVjdGlvbkRpcmVjdGlvbiA9PT0gJ2ZvcndhcmQnID8gc3RhcnQgOiBlbmRcbiAgICAgIH1cblxuICAgICAgY29uc3QgZm4gPSBtb3ZlQ3Vyc29yWyAoZS5rZXlDb2RlID09PSAzOSA/ICdyaWdodCcgOiAnbGVmdCcpICsgKHByb3BzLnJldmVyc2VGaWxsTWFzayA9PT0gdHJ1ZSA/ICdSZXZlcnNlJyA6ICcnKSBdXG5cbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgZm4oaW5wLCBzZWxlY3Rpb25BbmNob3IgPT09IHN0YXJ0ID8gZW5kIDogc3RhcnQpXG5cbiAgICAgIGlmIChlLnNoaWZ0S2V5KSB7XG4gICAgICAgIGNvbnN0IGN1cnNvciA9IGlucC5zZWxlY3Rpb25TdGFydFxuICAgICAgICBpbnAuc2V0U2VsZWN0aW9uUmFuZ2UoTWF0aC5taW4oc2VsZWN0aW9uQW5jaG9yLCBjdXJzb3IpLCBNYXRoLm1heChzZWxlY3Rpb25BbmNob3IsIGN1cnNvciksICdmb3J3YXJkJylcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoXG4gICAgICBlLmtleUNvZGUgPT09IDggLy8gQmFja3NwYWNlXG4gICAgICAmJiBwcm9wcy5yZXZlcnNlRmlsbE1hc2sgIT09IHRydWVcbiAgICAgICYmIHN0YXJ0ID09PSBlbmRcbiAgICApIHtcbiAgICAgIG1vdmVDdXJzb3IubGVmdChpbnAsIHN0YXJ0KVxuICAgICAgaW5wLnNldFNlbGVjdGlvblJhbmdlKGlucC5zZWxlY3Rpb25TdGFydCwgZW5kLCAnYmFja3dhcmQnKVxuICAgIH1cbiAgICBlbHNlIGlmIChcbiAgICAgIGUua2V5Q29kZSA9PT0gNDYgLy8gRGVsZXRlXG4gICAgICAmJiBwcm9wcy5yZXZlcnNlRmlsbE1hc2sgPT09IHRydWVcbiAgICAgICYmIHN0YXJ0ID09PSBlbmRcbiAgICApIHtcbiAgICAgIG1vdmVDdXJzb3IucmlnaHRSZXZlcnNlKGlucCwgZW5kKVxuICAgICAgaW5wLnNldFNlbGVjdGlvblJhbmdlKHN0YXJ0LCBpbnAuc2VsZWN0aW9uRW5kLCAnZm9yd2FyZCcpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gbWFza1ZhbHVlICh2YWwpIHtcbiAgICBpZiAodmFsID09PSB2b2lkIDAgfHwgdmFsID09PSBudWxsIHx8IHZhbCA9PT0gJycpIHsgcmV0dXJuICcnIH1cblxuICAgIGlmIChwcm9wcy5yZXZlcnNlRmlsbE1hc2sgPT09IHRydWUpIHtcbiAgICAgIHJldHVybiBtYXNrVmFsdWVSZXZlcnNlKHZhbClcbiAgICB9XG5cbiAgICBjb25zdCBtYXNrID0gY29tcHV0ZWRNYXNrXG5cbiAgICBsZXQgdmFsSW5kZXggPSAwLCBvdXRwdXQgPSAnJ1xuXG4gICAgZm9yIChsZXQgbWFza0luZGV4ID0gMDsgbWFza0luZGV4IDwgbWFzay5sZW5ndGg7IG1hc2tJbmRleCsrKSB7XG4gICAgICBjb25zdFxuICAgICAgICB2YWxDaGFyID0gdmFsWyB2YWxJbmRleCBdLFxuICAgICAgICBtYXNrRGVmID0gbWFza1sgbWFza0luZGV4IF1cblxuICAgICAgaWYgKHR5cGVvZiBtYXNrRGVmID09PSAnc3RyaW5nJykge1xuICAgICAgICBvdXRwdXQgKz0gbWFza0RlZlxuICAgICAgICB2YWxDaGFyID09PSBtYXNrRGVmICYmIHZhbEluZGV4KytcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHZhbENoYXIgIT09IHZvaWQgMCAmJiBtYXNrRGVmLnJlZ2V4LnRlc3QodmFsQ2hhcikpIHtcbiAgICAgICAgb3V0cHV0ICs9IG1hc2tEZWYudHJhbnNmb3JtICE9PSB2b2lkIDBcbiAgICAgICAgICA/IG1hc2tEZWYudHJhbnNmb3JtKHZhbENoYXIpXG4gICAgICAgICAgOiB2YWxDaGFyXG4gICAgICAgIHZhbEluZGV4KytcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gb3V0cHV0XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dHB1dFxuICB9XG5cbiAgZnVuY3Rpb24gbWFza1ZhbHVlUmV2ZXJzZSAodmFsKSB7XG4gICAgY29uc3RcbiAgICAgIG1hc2sgPSBjb21wdXRlZE1hc2ssXG4gICAgICBmaXJzdFRva2VuSW5kZXggPSBtYXNrTWFya2VkLmluZGV4T2YoTUFSS0VSKVxuXG4gICAgbGV0IHZhbEluZGV4ID0gdmFsLmxlbmd0aCAtIDEsIG91dHB1dCA9ICcnXG5cbiAgICBmb3IgKGxldCBtYXNrSW5kZXggPSBtYXNrLmxlbmd0aCAtIDE7IG1hc2tJbmRleCA+PSAwICYmIHZhbEluZGV4ID4gLTE7IG1hc2tJbmRleC0tKSB7XG4gICAgICBjb25zdCBtYXNrRGVmID0gbWFza1sgbWFza0luZGV4IF1cblxuICAgICAgbGV0IHZhbENoYXIgPSB2YWxbIHZhbEluZGV4IF1cblxuICAgICAgaWYgKHR5cGVvZiBtYXNrRGVmID09PSAnc3RyaW5nJykge1xuICAgICAgICBvdXRwdXQgPSBtYXNrRGVmICsgb3V0cHV0XG4gICAgICAgIHZhbENoYXIgPT09IG1hc2tEZWYgJiYgdmFsSW5kZXgtLVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAodmFsQ2hhciAhPT0gdm9pZCAwICYmIG1hc2tEZWYucmVnZXgudGVzdCh2YWxDaGFyKSkge1xuICAgICAgICBkbyB7XG4gICAgICAgICAgb3V0cHV0ID0gKG1hc2tEZWYudHJhbnNmb3JtICE9PSB2b2lkIDAgPyBtYXNrRGVmLnRyYW5zZm9ybSh2YWxDaGFyKSA6IHZhbENoYXIpICsgb3V0cHV0XG4gICAgICAgICAgdmFsSW5kZXgtLVxuICAgICAgICAgIHZhbENoYXIgPSB2YWxbIHZhbEluZGV4IF1cbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVubW9kaWZpZWQtbG9vcC1jb25kaXRpb25cbiAgICAgICAgfSB3aGlsZSAoZmlyc3RUb2tlbkluZGV4ID09PSBtYXNrSW5kZXggJiYgdmFsQ2hhciAhPT0gdm9pZCAwICYmIG1hc2tEZWYucmVnZXgudGVzdCh2YWxDaGFyKSlcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gb3V0cHV0XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dHB1dFxuICB9XG5cbiAgZnVuY3Rpb24gdW5tYXNrVmFsdWUgKHZhbCkge1xuICAgIHJldHVybiB0eXBlb2YgdmFsICE9PSAnc3RyaW5nJyB8fCBjb21wdXRlZFVubWFzayA9PT0gdm9pZCAwXG4gICAgICA/ICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJyA/IGNvbXB1dGVkVW5tYXNrKCcnICsgdmFsKSA6IHZhbClcbiAgICAgIDogY29tcHV0ZWRVbm1hc2sodmFsKVxuICB9XG5cbiAgZnVuY3Rpb24gZmlsbFdpdGhNYXNrICh2YWwpIHtcbiAgICBpZiAobWFza1JlcGxhY2VkLmxlbmd0aCAtIHZhbC5sZW5ndGggPD0gMCkge1xuICAgICAgcmV0dXJuIHZhbFxuICAgIH1cblxuICAgIHJldHVybiBwcm9wcy5yZXZlcnNlRmlsbE1hc2sgPT09IHRydWUgJiYgdmFsLmxlbmd0aCA+IDBcbiAgICAgID8gbWFza1JlcGxhY2VkLnNsaWNlKDAsIC12YWwubGVuZ3RoKSArIHZhbFxuICAgICAgOiB2YWwgKyBtYXNrUmVwbGFjZWQuc2xpY2UodmFsLmxlbmd0aClcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgaW5uZXJWYWx1ZSxcbiAgICBoYXNNYXNrLFxuICAgIG1vdmVDdXJzb3JGb3JQYXN0ZSxcbiAgICB1cGRhdGVNYXNrVmFsdWUsXG4gICAgb25NYXNrZWRLZXlkb3duLFxuICAgIG9uTWFza2VkQ2xpY2tcbiAgfVxufVxuIiwiaW1wb3J0IHsgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgdHlwZUd1YXJkKSB7XG4gIGZ1bmN0aW9uIGdldEZvcm1Eb21Qcm9wcyAoKSB7XG4gICAgY29uc3QgbW9kZWwgPSBwcm9wcy5tb2RlbFZhbHVlXG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgZHQgPSAnRGF0YVRyYW5zZmVyJyBpbiB3aW5kb3dcbiAgICAgICAgPyBuZXcgRGF0YVRyYW5zZmVyKClcbiAgICAgICAgOiAoJ0NsaXBib2FyZEV2ZW50JyBpbiB3aW5kb3dcbiAgICAgICAgICAgID8gbmV3IENsaXBib2FyZEV2ZW50KCcnKS5jbGlwYm9hcmREYXRhXG4gICAgICAgICAgICA6IHZvaWQgMFxuICAgICAgICAgIClcblxuICAgICAgaWYgKE9iamVjdChtb2RlbCkgPT09IG1vZGVsKSB7XG4gICAgICAgICgnbGVuZ3RoJyBpbiBtb2RlbFxuICAgICAgICAgID8gQXJyYXkuZnJvbShtb2RlbClcbiAgICAgICAgICA6IFsgbW9kZWwgXVxuICAgICAgICApLmZvckVhY2goZmlsZSA9PiB7XG4gICAgICAgICAgZHQuaXRlbXMuYWRkKGZpbGUpXG4gICAgICAgIH0pXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGZpbGVzOiBkdC5maWxlc1xuICAgICAgfVxuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZmlsZXM6IHZvaWQgMFxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0eXBlR3VhcmQgPT09IHRydWVcbiAgICA/IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGlmIChwcm9wcy50eXBlICE9PSAnZmlsZScpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBnZXRGb3JtRG9tUHJvcHMoKVxuICAgIH0pXG4gICAgOiBjb21wdXRlZChnZXRGb3JtRG9tUHJvcHMpXG59XG4iLCJpbXBvcnQgeyBjbGllbnQgfSBmcm9tICcuLi8uLi9wbHVnaW5zL1BsYXRmb3JtLmpzJ1xuXG5jb25zdCBpc0phcGFuZXNlID0gL1tcXHUzMDAwLVxcdTMwM2ZcXHUzMDQwLVxcdTMwOWZcXHUzMGEwLVxcdTMwZmZcXHVmZjAwLVxcdWZmOWZcXHU0ZTAwLVxcdTlmYWZcXHUzNDAwLVxcdTRkYmZdL1xuY29uc3QgaXNDaGluZXNlID0gL1tcXHU0ZTAwLVxcdTlmZmZcXHUzNDAwLVxcdTRkYmZcXHV7MjAwMDB9LVxcdXsyYTZkZn1cXHV7MmE3MDB9LVxcdXsyYjczZn1cXHV7MmI3NDB9LVxcdXsyYjgxZn1cXHV7MmI4MjB9LVxcdXsyY2VhZn1cXHVmOTAwLVxcdWZhZmZcXHUzMzAwLVxcdTMzZmZcXHVmZTMwLVxcdWZlNGZcXHVmOTAwLVxcdWZhZmZcXHV7MmY4MDB9LVxcdXsyZmExZn1dL3VcbmNvbnN0IGlzS29yZWFuID0gL1tcXHUzMTMxLVxcdTMxNGVcXHUzMTRmLVxcdTMxNjNcXHVhYzAwLVxcdWQ3YTNdL1xuY29uc3QgaXNQbGFpblRleHQgPSAvW2EtejAtOV8gLV0kL2lcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKG9uSW5wdXQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIG9uQ29tcG9zaXRpb24gKGUpIHtcbiAgICBpZiAoZS50eXBlID09PSAnY29tcG9zaXRpb25lbmQnIHx8IGUudHlwZSA9PT0gJ2NoYW5nZScpIHtcbiAgICAgIGlmIChlLnRhcmdldC5xQ29tcG9zaW5nICE9PSB0cnVlKSB7IHJldHVybiB9XG4gICAgICBlLnRhcmdldC5xQ29tcG9zaW5nID0gZmFsc2VcbiAgICAgIG9uSW5wdXQoZSlcbiAgICB9XG4gICAgZWxzZSBpZiAoXG4gICAgICBlLnR5cGUgPT09ICdjb21wb3NpdGlvbnVwZGF0ZSdcbiAgICAgICYmIGUudGFyZ2V0LnFDb21wb3NpbmcgIT09IHRydWVcbiAgICAgICYmIHR5cGVvZiBlLmRhdGEgPT09ICdzdHJpbmcnXG4gICAgKSB7XG4gICAgICBjb25zdCBpc0NvbXBvc2luZyA9IGNsaWVudC5pcy5maXJlZm94ID09PSB0cnVlXG4gICAgICAgID8gaXNQbGFpblRleHQudGVzdChlLmRhdGEpID09PSBmYWxzZVxuICAgICAgICA6IGlzSmFwYW5lc2UudGVzdChlLmRhdGEpID09PSB0cnVlIHx8IGlzQ2hpbmVzZS50ZXN0KGUuZGF0YSkgPT09IHRydWUgfHwgaXNLb3JlYW4udGVzdChlLmRhdGEpID09PSB0cnVlXG5cbiAgICAgIGlmIChpc0NvbXBvc2luZyA9PT0gdHJ1ZSkge1xuICAgICAgICBlLnRhcmdldC5xQ29tcG9zaW5nID0gdHJ1ZVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgaCwgcmVmLCBjb21wdXRlZCwgd2F0Y2gsIG9uQmVmb3JlVW5tb3VudCwgb25Nb3VudGVkLCBuZXh0VGljaywgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgdXNlRmllbGQsIHsgdXNlRmllbGRTdGF0ZSwgdXNlRmllbGRQcm9wcywgdXNlRmllbGRFbWl0cywgZmllbGRWYWx1ZUlzRmlsbGVkIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtZmllbGQuanMnXG5pbXBvcnQgdXNlTWFzaywgeyB1c2VNYXNrUHJvcHMgfSBmcm9tICcuL3VzZS1tYXNrLmpzJ1xuaW1wb3J0IHsgdXNlRm9ybVByb3BzLCB1c2VGb3JtSW5wdXROYW1lQXR0ciB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWZvcm0uanMnXG5pbXBvcnQgdXNlRmlsZUZvcm1Eb21Qcm9wcyBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1maWxlLWRvbS1wcm9wcy5qcydcbmltcG9ydCB1c2VLZXlDb21wb3NpdGlvbiBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1rZXktY29tcG9zaXRpb24uanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgc3RvcCB9IGZyb20gJy4uLy4uL3V0aWxzL2V2ZW50LmpzJ1xuaW1wb3J0IHsgYWRkRm9jdXNGbiB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvZm9jdXMtbWFuYWdlci5qcydcbmltcG9ydCB7IGluamVjdFByb3AgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2luamVjdC1vYmotcHJvcC5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FJbnB1dCcsXG5cbiAgaW5oZXJpdEF0dHJzOiBmYWxzZSxcblxuICBwcm9wczoge1xuICAgIC4uLnVzZUZpZWxkUHJvcHMsXG4gICAgLi4udXNlTWFza1Byb3BzLFxuICAgIC4uLnVzZUZvcm1Qcm9wcyxcblxuICAgIG1vZGVsVmFsdWU6IHsgcmVxdWlyZWQ6IGZhbHNlIH0sXG5cbiAgICBzaGFkb3dUZXh0OiBTdHJpbmcsXG5cbiAgICB0eXBlOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAndGV4dCdcbiAgICB9LFxuXG4gICAgZGVib3VuY2U6IFsgU3RyaW5nLCBOdW1iZXIgXSxcblxuICAgIGF1dG9ncm93OiBCb29sZWFuLCAvLyBtYWtlcyBhIHRleHRhcmVhXG5cbiAgICBpbnB1dENsYXNzOiBbIEFycmF5LCBTdHJpbmcsIE9iamVjdCBdLFxuICAgIGlucHV0U3R5bGU6IFsgQXJyYXksIFN0cmluZywgT2JqZWN0IF1cbiAgfSxcblxuICBlbWl0czogW1xuICAgIC4uLnVzZUZpZWxkRW1pdHMsXG4gICAgJ3Bhc3RlJywgJ2NoYW5nZScsXG4gICAgJ2tleWRvd24nLCAnY2xpY2snLCAnYW5pbWF0aW9uZW5kJ1xuICBdLFxuXG4gIHNldHVwIChwcm9wcywgeyBlbWl0LCBhdHRycyB9KSB7XG4gICAgY29uc3QgeyBwcm94eSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgICBjb25zdCB7ICRxIH0gPSBwcm94eVxuXG4gICAgY29uc3QgdGVtcCA9IHt9XG4gICAgbGV0IGVtaXRDYWNoZWRWYWx1ZSA9IE5hTiwgdHlwZWROdW1iZXIsIHN0b3BWYWx1ZVdhdGNoZXIsIGVtaXRUaW1lciA9IG51bGwsIGVtaXRWYWx1ZUZuXG5cbiAgICBjb25zdCBpbnB1dFJlZiA9IHJlZihudWxsKVxuICAgIGNvbnN0IG5hbWVQcm9wID0gdXNlRm9ybUlucHV0TmFtZUF0dHIocHJvcHMpXG5cbiAgICBjb25zdCB7XG4gICAgICBpbm5lclZhbHVlLFxuICAgICAgaGFzTWFzayxcbiAgICAgIG1vdmVDdXJzb3JGb3JQYXN0ZSxcbiAgICAgIHVwZGF0ZU1hc2tWYWx1ZSxcbiAgICAgIG9uTWFza2VkS2V5ZG93bixcbiAgICAgIG9uTWFza2VkQ2xpY2tcbiAgICB9ID0gdXNlTWFzayhwcm9wcywgZW1pdCwgZW1pdFZhbHVlLCBpbnB1dFJlZilcblxuICAgIGNvbnN0IGZvcm1Eb21Qcm9wcyA9IHVzZUZpbGVGb3JtRG9tUHJvcHMocHJvcHMsIC8qIHR5cGUgZ3VhcmQgKi8gdHJ1ZSlcbiAgICBjb25zdCBoYXNWYWx1ZSA9IGNvbXB1dGVkKCgpID0+IGZpZWxkVmFsdWVJc0ZpbGxlZChpbm5lclZhbHVlLnZhbHVlKSlcblxuICAgIGNvbnN0IG9uQ29tcG9zaXRpb24gPSB1c2VLZXlDb21wb3NpdGlvbihvbklucHV0KVxuXG4gICAgY29uc3Qgc3RhdGUgPSB1c2VGaWVsZFN0YXRlKClcblxuICAgIGNvbnN0IGlzVGV4dGFyZWEgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgcHJvcHMudHlwZSA9PT0gJ3RleHRhcmVhJyB8fCBwcm9wcy5hdXRvZ3JvdyA9PT0gdHJ1ZVxuICAgIClcblxuICAgIGNvbnN0IGlzVHlwZVRleHQgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgaXNUZXh0YXJlYS52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgfHwgWyAndGV4dCcsICdzZWFyY2gnLCAndXJsJywgJ3RlbCcsICdwYXNzd29yZCcgXS5pbmNsdWRlcyhwcm9wcy50eXBlKVxuICAgIClcblxuICAgIGNvbnN0IG9uRXZlbnRzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3QgZXZ0ID0ge1xuICAgICAgICAuLi5zdGF0ZS5zcGxpdEF0dHJzLmxpc3RlbmVycy52YWx1ZSxcbiAgICAgICAgb25JbnB1dCxcbiAgICAgICAgb25QYXN0ZSxcbiAgICAgICAgLy8gU2FmYXJpIDwgMTAuMiAmIFVJV2ViVmlldyBkb2Vzbid0IGZpcmUgY29tcG9zaXRpb25lbmQgd2hlblxuICAgICAgICAvLyBzd2l0Y2hpbmcgZm9jdXMgYmVmb3JlIGNvbmZpcm1pbmcgY29tcG9zaXRpb24gY2hvaWNlXG4gICAgICAgIC8vIHRoaXMgYWxzbyBmaXhlcyB0aGUgaXNzdWUgd2hlcmUgc29tZSBicm93c2VycyBlLmcuIGlPUyBDaHJvbWVcbiAgICAgICAgLy8gZmlyZXMgXCJjaGFuZ2VcIiBpbnN0ZWFkIG9mIFwiaW5wdXRcIiBvbiBhdXRvY29tcGxldGUuXG4gICAgICAgIG9uQ2hhbmdlLFxuICAgICAgICBvbkJsdXI6IG9uRmluaXNoRWRpdGluZyxcbiAgICAgICAgb25Gb2N1czogc3RvcFxuICAgICAgfVxuXG4gICAgICBldnQub25Db21wb3NpdGlvbnN0YXJ0ID0gZXZ0Lm9uQ29tcG9zaXRpb251cGRhdGUgPSBldnQub25Db21wb3NpdGlvbmVuZCA9IG9uQ29tcG9zaXRpb25cblxuICAgICAgaWYgKGhhc01hc2sudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgZXZ0Lm9uS2V5ZG93biA9IG9uTWFza2VkS2V5ZG93blxuICAgICAgICAvLyByZXNldCBzZWxlY3Rpb24gYW5jaG9yIG9uIHBvaW50ZXIgc2VsZWN0aW9uXG4gICAgICAgIGV2dC5vbkNsaWNrID0gb25NYXNrZWRDbGlja1xuICAgICAgfVxuXG4gICAgICBpZiAocHJvcHMuYXV0b2dyb3cgPT09IHRydWUpIHtcbiAgICAgICAgZXZ0Lm9uQW5pbWF0aW9uZW5kID0gb25BbmltYXRpb25lbmRcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGV2dFxuICAgIH0pXG5cbiAgICBjb25zdCBpbnB1dEF0dHJzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3QgYXR0cnMgPSB7XG4gICAgICAgIHRhYmluZGV4OiAwLFxuICAgICAgICAnZGF0YS1hdXRvZm9jdXMnOiBwcm9wcy5hdXRvZm9jdXMgPT09IHRydWUgfHwgdm9pZCAwLFxuICAgICAgICByb3dzOiBwcm9wcy50eXBlID09PSAndGV4dGFyZWEnID8gNiA6IHZvaWQgMCxcbiAgICAgICAgJ2FyaWEtbGFiZWwnOiBwcm9wcy5sYWJlbCxcbiAgICAgICAgbmFtZTogbmFtZVByb3AudmFsdWUsXG4gICAgICAgIC4uLnN0YXRlLnNwbGl0QXR0cnMuYXR0cmlidXRlcy52YWx1ZSxcbiAgICAgICAgaWQ6IHN0YXRlLnRhcmdldFVpZC52YWx1ZSxcbiAgICAgICAgbWF4bGVuZ3RoOiBwcm9wcy5tYXhsZW5ndGgsXG4gICAgICAgIGRpc2FibGVkOiBwcm9wcy5kaXNhYmxlID09PSB0cnVlLFxuICAgICAgICByZWFkb25seTogcHJvcHMucmVhZG9ubHkgPT09IHRydWVcbiAgICAgIH1cblxuICAgICAgaWYgKGlzVGV4dGFyZWEudmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICAgIGF0dHJzLnR5cGUgPSBwcm9wcy50eXBlXG4gICAgICB9XG5cbiAgICAgIGlmIChwcm9wcy5hdXRvZ3JvdyA9PT0gdHJ1ZSkge1xuICAgICAgICBhdHRycy5yb3dzID0gMVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gYXR0cnNcbiAgICB9KVxuXG4gICAgLy8gc29tZSBicm93c2VycyBsb3NlIHRoZSBuYXRpdmUgaW5wdXQgdmFsdWVcbiAgICAvLyBzbyB3ZSBuZWVkIHRvIHJlYXR0YWNoIGl0IGR5bmFtaWNhbGx5XG4gICAgLy8gKGxpa2UgdHlwZT1cInBhc3N3b3JkXCIgPC0+IHR5cGU9XCJ0ZXh0XCI7IHNlZSAjMTIwNzgpXG4gICAgd2F0Y2goKCkgPT4gcHJvcHMudHlwZSwgKCkgPT4ge1xuICAgICAgaWYgKGlucHV0UmVmLnZhbHVlKSB7XG4gICAgICAgIGlucHV0UmVmLnZhbHVlLnZhbHVlID0gcHJvcHMubW9kZWxWYWx1ZVxuICAgICAgfVxuICAgIH0pXG5cbiAgICB3YXRjaCgoKSA9PiBwcm9wcy5tb2RlbFZhbHVlLCB2ID0+IHtcbiAgICAgIGlmIChoYXNNYXNrLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIGlmIChzdG9wVmFsdWVXYXRjaGVyID09PSB0cnVlKSB7XG4gICAgICAgICAgc3RvcFZhbHVlV2F0Y2hlciA9IGZhbHNlXG5cbiAgICAgICAgICBpZiAoU3RyaW5nKHYpID09PSBlbWl0Q2FjaGVkVmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHVwZGF0ZU1hc2tWYWx1ZSh2KVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAoaW5uZXJWYWx1ZS52YWx1ZSAhPT0gdikge1xuICAgICAgICBpbm5lclZhbHVlLnZhbHVlID0gdlxuXG4gICAgICAgIGlmIChcbiAgICAgICAgICBwcm9wcy50eXBlID09PSAnbnVtYmVyJ1xuICAgICAgICAgICYmIHRlbXAuaGFzT3duUHJvcGVydHkoJ3ZhbHVlJykgPT09IHRydWVcbiAgICAgICAgKSB7XG4gICAgICAgICAgaWYgKHR5cGVkTnVtYmVyID09PSB0cnVlKSB7XG4gICAgICAgICAgICB0eXBlZE51bWJlciA9IGZhbHNlXG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZGVsZXRlIHRlbXAudmFsdWVcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gdGV4dGFyZWEgb25seVxuICAgICAgcHJvcHMuYXV0b2dyb3cgPT09IHRydWUgJiYgbmV4dFRpY2soYWRqdXN0SGVpZ2h0KVxuICAgIH0pXG5cbiAgICB3YXRjaCgoKSA9PiBwcm9wcy5hdXRvZ3JvdywgdmFsID0+IHtcbiAgICAgIC8vIHRleHRhcmVhIG9ubHlcbiAgICAgIGlmICh2YWwgPT09IHRydWUpIHtcbiAgICAgICAgbmV4dFRpY2soYWRqdXN0SGVpZ2h0KVxuICAgICAgfVxuICAgICAgLy8gaWYgaXQgaGFzIGEgbnVtYmVyIG9mIHJvd3Mgc2V0IHJlc3BlY3QgaXRcbiAgICAgIGVsc2UgaWYgKGlucHV0UmVmLnZhbHVlICE9PSBudWxsICYmIGF0dHJzLnJvd3MgPiAwKSB7XG4gICAgICAgIGlucHV0UmVmLnZhbHVlLnN0eWxlLmhlaWdodCA9ICdhdXRvJ1xuICAgICAgfVxuICAgIH0pXG5cbiAgICB3YXRjaCgoKSA9PiBwcm9wcy5kZW5zZSwgKCkgPT4ge1xuICAgICAgcHJvcHMuYXV0b2dyb3cgPT09IHRydWUgJiYgbmV4dFRpY2soYWRqdXN0SGVpZ2h0KVxuICAgIH0pXG5cbiAgICBmdW5jdGlvbiBmb2N1cyAoKSB7XG4gICAgICBhZGRGb2N1c0ZuKCgpID0+IHtcbiAgICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50XG4gICAgICAgIGlmIChcbiAgICAgICAgICBpbnB1dFJlZi52YWx1ZSAhPT0gbnVsbFxuICAgICAgICAgICYmIGlucHV0UmVmLnZhbHVlICE9PSBlbFxuICAgICAgICAgICYmIChlbCA9PT0gbnVsbCB8fCBlbC5pZCAhPT0gc3RhdGUudGFyZ2V0VWlkLnZhbHVlKVxuICAgICAgICApIHtcbiAgICAgICAgICBpbnB1dFJlZi52YWx1ZS5mb2N1cyh7IHByZXZlbnRTY3JvbGw6IHRydWUgfSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZWxlY3QgKCkge1xuICAgICAgaW5wdXRSZWYudmFsdWUgIT09IG51bGwgJiYgaW5wdXRSZWYudmFsdWUuc2VsZWN0KClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblBhc3RlIChlKSB7XG4gICAgICBpZiAoaGFzTWFzay52YWx1ZSA9PT0gdHJ1ZSAmJiBwcm9wcy5yZXZlcnNlRmlsbE1hc2sgIT09IHRydWUpIHtcbiAgICAgICAgY29uc3QgaW5wID0gZS50YXJnZXRcbiAgICAgICAgbW92ZUN1cnNvckZvclBhc3RlKGlucCwgaW5wLnNlbGVjdGlvblN0YXJ0LCBpbnAuc2VsZWN0aW9uRW5kKVxuICAgICAgfVxuXG4gICAgICBlbWl0KCdwYXN0ZScsIGUpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25JbnB1dCAoZSkge1xuICAgICAgaWYgKCFlIHx8ICFlLnRhcmdldCkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKHByb3BzLnR5cGUgPT09ICdmaWxlJykge1xuICAgICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIGUudGFyZ2V0LmZpbGVzKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgY29uc3QgdmFsID0gZS50YXJnZXQudmFsdWVcblxuICAgICAgaWYgKGUudGFyZ2V0LnFDb21wb3NpbmcgPT09IHRydWUpIHtcbiAgICAgICAgdGVtcC52YWx1ZSA9IHZhbFxuXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpZiAoaGFzTWFzay52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICB1cGRhdGVNYXNrVmFsdWUodmFsLCBmYWxzZSwgZS5pbnB1dFR5cGUpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgZW1pdFZhbHVlKHZhbClcblxuICAgICAgICBpZiAoaXNUeXBlVGV4dC52YWx1ZSA9PT0gdHJ1ZSAmJiBlLnRhcmdldCA9PT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkge1xuICAgICAgICAgIGNvbnN0IHsgc2VsZWN0aW9uU3RhcnQsIHNlbGVjdGlvbkVuZCB9ID0gZS50YXJnZXRcblxuICAgICAgICAgIGlmIChzZWxlY3Rpb25TdGFydCAhPT0gdm9pZCAwICYmIHNlbGVjdGlvbkVuZCAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICBuZXh0VGljaygoKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChlLnRhcmdldCA9PT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAmJiB2YWwuaW5kZXhPZihlLnRhcmdldC52YWx1ZSkgPT09IDApIHtcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5zZXRTZWxlY3Rpb25SYW5nZShzZWxlY3Rpb25TdGFydCwgc2VsZWN0aW9uRW5kKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyB3ZSBuZWVkIHRvIHRyaWdnZXIgaXQgaW1tZWRpYXRlbHkgdG9vLFxuICAgICAgLy8gdG8gYXZvaWQgXCJmbGlja2VyaW5nXCJcbiAgICAgIHByb3BzLmF1dG9ncm93ID09PSB0cnVlICYmIGFkanVzdEhlaWdodCgpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25BbmltYXRpb25lbmQgKGUpIHtcbiAgICAgIGVtaXQoJ2FuaW1hdGlvbmVuZCcsIGUpXG4gICAgICBhZGp1c3RIZWlnaHQoKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVtaXRWYWx1ZSAodmFsLCBzdG9wV2F0Y2hlcikge1xuICAgICAgZW1pdFZhbHVlRm4gPSAoKSA9PiB7XG4gICAgICAgIGVtaXRUaW1lciA9IG51bGxcblxuICAgICAgICBpZiAoXG4gICAgICAgICAgcHJvcHMudHlwZSAhPT0gJ251bWJlcidcbiAgICAgICAgICAmJiB0ZW1wLmhhc093blByb3BlcnR5KCd2YWx1ZScpID09PSB0cnVlXG4gICAgICAgICkge1xuICAgICAgICAgIGRlbGV0ZSB0ZW1wLnZhbHVlXG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvcHMubW9kZWxWYWx1ZSAhPT0gdmFsICYmIGVtaXRDYWNoZWRWYWx1ZSAhPT0gdmFsKSB7XG4gICAgICAgICAgZW1pdENhY2hlZFZhbHVlID0gdmFsXG5cbiAgICAgICAgICBzdG9wV2F0Y2hlciA9PT0gdHJ1ZSAmJiAoc3RvcFZhbHVlV2F0Y2hlciA9IHRydWUpXG4gICAgICAgICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCB2YWwpXG5cbiAgICAgICAgICBuZXh0VGljaygoKSA9PiB7XG4gICAgICAgICAgICBlbWl0Q2FjaGVkVmFsdWUgPT09IHZhbCAmJiAoZW1pdENhY2hlZFZhbHVlID0gTmFOKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICBlbWl0VmFsdWVGbiA9IHZvaWQgMFxuICAgICAgfVxuXG4gICAgICBpZiAocHJvcHMudHlwZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgdHlwZWROdW1iZXIgPSB0cnVlXG4gICAgICAgIHRlbXAudmFsdWUgPSB2YWxcbiAgICAgIH1cblxuICAgICAgaWYgKHByb3BzLmRlYm91bmNlICE9PSB2b2lkIDApIHtcbiAgICAgICAgZW1pdFRpbWVyICE9PSBudWxsICYmIGNsZWFyVGltZW91dChlbWl0VGltZXIpXG4gICAgICAgIHRlbXAudmFsdWUgPSB2YWxcbiAgICAgICAgZW1pdFRpbWVyID0gc2V0VGltZW91dChlbWl0VmFsdWVGbiwgcHJvcHMuZGVib3VuY2UpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgZW1pdFZhbHVlRm4oKVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHRleHRhcmVhIG9ubHlcbiAgICBmdW5jdGlvbiBhZGp1c3RIZWlnaHQgKCkge1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgY29uc3QgaW5wID0gaW5wdXRSZWYudmFsdWVcbiAgICAgICAgaWYgKGlucCAhPT0gbnVsbCkge1xuICAgICAgICAgIGNvbnN0IHBhcmVudFN0eWxlID0gaW5wLnBhcmVudE5vZGUuc3R5bGVcbiAgICAgICAgICAvLyBjaHJvbWUgZG9lcyBub3Qga2VlcCBzY3JvbGwgIzE1NDk4XG4gICAgICAgICAgY29uc3QgeyBzY3JvbGxUb3AgfSA9IGlucFxuICAgICAgICAgIC8vIGNocm9tZSBjYWxjdWxhdGVzIGEgc21hbGxlciBzY3JvbGxIZWlnaHQgd2hlbiBpbiBhIC5jb2x1bW4gY29udGFpbmVyXG4gICAgICAgICAgY29uc3QgeyBvdmVyZmxvd1ksIG1heEhlaWdodCB9ID0gJHEucGxhdGZvcm0uaXMuZmlyZWZveCA9PT0gdHJ1ZVxuICAgICAgICAgICAgPyB7fVxuICAgICAgICAgICAgOiB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShpbnApXG4gICAgICAgICAgLy8gb24gZmlyZWZveCBvciBpZiBvdmVyZmxvd1kgaXMgc3BlY2lmaWVkIGFzIHNjcm9sbCAjMTQyNjMsICMxNDM0NFxuICAgICAgICAgIC8vIHdlIGRvbid0IHRvdWNoIG92ZXJmbG93XG4gICAgICAgICAgLy8gZmlyZWZveCBpcyBub3Qgc28gYmFkIGluIHRoZSBlbmRcbiAgICAgICAgICBjb25zdCBjaGFuZ2VPdmVyZmxvdyA9IG92ZXJmbG93WSAhPT0gdm9pZCAwICYmIG92ZXJmbG93WSAhPT0gJ3Njcm9sbCdcblxuICAgICAgICAgIC8vIHJlc2V0IGhlaWdodCBvZiB0ZXh0YXJlYSB0byBhIHNtYWxsIHNpemUgdG8gZGV0ZWN0IHRoZSByZWFsIGhlaWdodFxuICAgICAgICAgIC8vIGJ1dCBrZWVwIHRoZSB0b3RhbCBjb250cm9sIHNpemUgdGhlIHNhbWVcbiAgICAgICAgICBjaGFuZ2VPdmVyZmxvdyA9PT0gdHJ1ZSAmJiAoaW5wLnN0eWxlLm92ZXJmbG93WSA9ICdoaWRkZW4nKVxuICAgICAgICAgIHBhcmVudFN0eWxlLm1hcmdpbkJvdHRvbSA9IChpbnAuc2Nyb2xsSGVpZ2h0IC0gMSkgKyAncHgnXG4gICAgICAgICAgaW5wLnN0eWxlLmhlaWdodCA9ICcxcHgnXG5cbiAgICAgICAgICBpbnAuc3R5bGUuaGVpZ2h0ID0gaW5wLnNjcm9sbEhlaWdodCArICdweCdcbiAgICAgICAgICAvLyB3ZSBzaG91bGQgYWxsb3cgc2Nyb2xsYmFycyBvbmx5XG4gICAgICAgICAgLy8gaWYgdGhlcmUgaXMgbWF4SGVpZ2h0IGFuZCBjb250ZW50IGlzIHRhbGxlciB0aGFuIG1heEhlaWdodFxuICAgICAgICAgIGNoYW5nZU92ZXJmbG93ID09PSB0cnVlICYmIChpbnAuc3R5bGUub3ZlcmZsb3dZID0gcGFyc2VJbnQobWF4SGVpZ2h0LCAxMCkgPCBpbnAuc2Nyb2xsSGVpZ2h0ID8gJ2F1dG8nIDogJ2hpZGRlbicpXG4gICAgICAgICAgcGFyZW50U3R5bGUubWFyZ2luQm90dG9tID0gJydcbiAgICAgICAgICBpbnAuc2Nyb2xsVG9wID0gc2Nyb2xsVG9wXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25DaGFuZ2UgKGUpIHtcbiAgICAgIG9uQ29tcG9zaXRpb24oZSlcblxuICAgICAgaWYgKGVtaXRUaW1lciAhPT0gbnVsbCkge1xuICAgICAgICBjbGVhclRpbWVvdXQoZW1pdFRpbWVyKVxuICAgICAgICBlbWl0VGltZXIgPSBudWxsXG4gICAgICB9XG5cbiAgICAgIGVtaXRWYWx1ZUZuICE9PSB2b2lkIDAgJiYgZW1pdFZhbHVlRm4oKVxuXG4gICAgICBlbWl0KCdjaGFuZ2UnLCBlLnRhcmdldC52YWx1ZSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkZpbmlzaEVkaXRpbmcgKGUpIHtcbiAgICAgIGUgIT09IHZvaWQgMCAmJiBzdG9wKGUpXG5cbiAgICAgIGlmIChlbWl0VGltZXIgIT09IG51bGwpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KGVtaXRUaW1lcilcbiAgICAgICAgZW1pdFRpbWVyID0gbnVsbFxuICAgICAgfVxuXG4gICAgICBlbWl0VmFsdWVGbiAhPT0gdm9pZCAwICYmIGVtaXRWYWx1ZUZuKClcblxuICAgICAgdHlwZWROdW1iZXIgPSBmYWxzZVxuICAgICAgc3RvcFZhbHVlV2F0Y2hlciA9IGZhbHNlXG4gICAgICBkZWxldGUgdGVtcC52YWx1ZVxuXG4gICAgICAvLyB3ZSBuZWVkIHRvIHVzZSBzZXRUaW1lb3V0IGluc3RlYWQgb2YgdGhpcy4kbmV4dFRpY2tcbiAgICAgIC8vIHRvIGF2b2lkIGEgYnVnIHdoZXJlIGZvY3Vzb3V0IGlzIG5vdCBlbWl0dGVkIGZvciB0eXBlIGRhdGUvdGltZS93ZWVrLy4uLlxuICAgICAgcHJvcHMudHlwZSAhPT0gJ2ZpbGUnICYmIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBpZiAoaW5wdXRSZWYudmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgICBpbnB1dFJlZi52YWx1ZS52YWx1ZSA9IGlubmVyVmFsdWUudmFsdWUgIT09IHZvaWQgMCA/IGlubmVyVmFsdWUudmFsdWUgOiAnJ1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEN1clZhbHVlICgpIHtcbiAgICAgIHJldHVybiB0ZW1wLmhhc093blByb3BlcnR5KCd2YWx1ZScpID09PSB0cnVlXG4gICAgICAgID8gdGVtcC52YWx1ZVxuICAgICAgICA6IChpbm5lclZhbHVlLnZhbHVlICE9PSB2b2lkIDAgPyBpbm5lclZhbHVlLnZhbHVlIDogJycpXG4gICAgfVxuXG4gICAgb25CZWZvcmVVbm1vdW50KCgpID0+IHtcbiAgICAgIG9uRmluaXNoRWRpdGluZygpXG4gICAgfSlcblxuICAgIG9uTW91bnRlZCgoKSA9PiB7XG4gICAgICAvLyB0ZXh0YXJlYSBvbmx5XG4gICAgICBwcm9wcy5hdXRvZ3JvdyA9PT0gdHJ1ZSAmJiBhZGp1c3RIZWlnaHQoKVxuICAgIH0pXG5cbiAgICBPYmplY3QuYXNzaWduKHN0YXRlLCB7XG4gICAgICBpbm5lclZhbHVlLFxuXG4gICAgICBmaWVsZENsYXNzOiBjb21wdXRlZCgoKSA9PlxuICAgICAgICBgcS0keyBpc1RleHRhcmVhLnZhbHVlID09PSB0cnVlID8gJ3RleHRhcmVhJyA6ICdpbnB1dCcgfWBcbiAgICAgICAgKyAocHJvcHMuYXV0b2dyb3cgPT09IHRydWUgPyAnIHEtdGV4dGFyZWEtLWF1dG9ncm93JyA6ICcnKVxuICAgICAgKSxcblxuICAgICAgaGFzU2hhZG93OiBjb21wdXRlZCgoKSA9PlxuICAgICAgICBwcm9wcy50eXBlICE9PSAnZmlsZSdcbiAgICAgICAgJiYgdHlwZW9mIHByb3BzLnNoYWRvd1RleHQgPT09ICdzdHJpbmcnXG4gICAgICAgICYmIHByb3BzLnNoYWRvd1RleHQubGVuZ3RoID4gMFxuICAgICAgKSxcblxuICAgICAgaW5wdXRSZWYsXG5cbiAgICAgIGVtaXRWYWx1ZSxcblxuICAgICAgaGFzVmFsdWUsXG5cbiAgICAgIGZsb2F0aW5nTGFiZWw6IGNvbXB1dGVkKCgpID0+XG4gICAgICAgIChcbiAgICAgICAgICBoYXNWYWx1ZS52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAgICYmIChwcm9wcy50eXBlICE9PSAnbnVtYmVyJyB8fCBpc05hTihpbm5lclZhbHVlLnZhbHVlKSA9PT0gZmFsc2UpXG4gICAgICAgIClcbiAgICAgICAgfHwgZmllbGRWYWx1ZUlzRmlsbGVkKHByb3BzLmRpc3BsYXlWYWx1ZSlcbiAgICAgICksXG5cbiAgICAgIGdldENvbnRyb2w6ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIGgoaXNUZXh0YXJlYS52YWx1ZSA9PT0gdHJ1ZSA/ICd0ZXh0YXJlYScgOiAnaW5wdXQnLCB7XG4gICAgICAgICAgcmVmOiBpbnB1dFJlZixcbiAgICAgICAgICBjbGFzczogW1xuICAgICAgICAgICAgJ3EtZmllbGRfX25hdGl2ZSBxLXBsYWNlaG9sZGVyJyxcbiAgICAgICAgICAgIHByb3BzLmlucHV0Q2xhc3NcbiAgICAgICAgICBdLFxuICAgICAgICAgIHN0eWxlOiBwcm9wcy5pbnB1dFN0eWxlLFxuICAgICAgICAgIC4uLmlucHV0QXR0cnMudmFsdWUsXG4gICAgICAgICAgLi4ub25FdmVudHMudmFsdWUsXG4gICAgICAgICAgLi4uKFxuICAgICAgICAgICAgcHJvcHMudHlwZSAhPT0gJ2ZpbGUnXG4gICAgICAgICAgICAgID8geyB2YWx1ZTogZ2V0Q3VyVmFsdWUoKSB9XG4gICAgICAgICAgICAgIDogZm9ybURvbVByb3BzLnZhbHVlXG4gICAgICAgICAgKVxuICAgICAgICB9KVxuICAgICAgfSxcblxuICAgICAgZ2V0U2hhZG93Q29udHJvbDogKCkgPT4ge1xuICAgICAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgICAgIGNsYXNzOiAncS1maWVsZF9fbmF0aXZlIHEtZmllbGRfX3NoYWRvdyBhYnNvbHV0ZS1ib3R0b20gbm8tcG9pbnRlci1ldmVudHMnXG4gICAgICAgICAgICArIChpc1RleHRhcmVhLnZhbHVlID09PSB0cnVlID8gJycgOiAnIHRleHQtbm8td3JhcCcpXG4gICAgICAgIH0sIFtcbiAgICAgICAgICBoKCdzcGFuJywgeyBjbGFzczogJ2ludmlzaWJsZScgfSwgZ2V0Q3VyVmFsdWUoKSksXG4gICAgICAgICAgaCgnc3BhbicsIHByb3BzLnNoYWRvd1RleHQpXG4gICAgICAgIF0pXG4gICAgICB9XG4gICAgfSlcblxuICAgIGNvbnN0IHJlbmRlckZuID0gdXNlRmllbGQoc3RhdGUpXG5cbiAgICAvLyBleHBvc2UgcHVibGljIG1ldGhvZHNcbiAgICBPYmplY3QuYXNzaWduKHByb3h5LCB7XG4gICAgICBmb2N1cyxcbiAgICAgIHNlbGVjdCxcbiAgICAgIGdldE5hdGl2ZUVsZW1lbnQ6ICgpID0+IGlucHV0UmVmLnZhbHVlIC8vIGRlcHJlY2F0ZWRcbiAgICB9KVxuXG4gICAgaW5qZWN0UHJvcChwcm94eSwgJ25hdGl2ZUVsJywgKCkgPT4gaW5wdXRSZWYudmFsdWUpXG5cbiAgICByZXR1cm4gcmVuZGVyRm5cbiAgfVxufSlcbiJdLCJuYW1lcyI6WyJhdHRycyJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFJZSxTQUFRLGFBQUUsRUFBRSxVQUFVLGlCQUFpQixpQkFBaUI7QUFDckUsUUFBTSxRQUFRLE9BQU8sU0FBUyxLQUFLO0FBRW5DLE1BQUksVUFBVSxPQUFPO0FBQ25CLFVBQU0sRUFBRSxPQUFPLE1BQU8sSUFBRyxtQkFBb0I7QUFHN0MsV0FBTyxPQUFPLE9BQU8sRUFBRSxVQUFVLGdCQUFlLENBQUU7QUFFbEQsVUFBTSxNQUFNLE1BQU0sU0FBUyxTQUFPO0FBQ2hDLFVBQUksUUFBUSxNQUFNO0FBQ2hCLGVBQU8sb0JBQW9CLGNBQWMsZ0JBQWlCO0FBQzFELGNBQU0sZ0JBQWdCLEtBQUs7QUFBQSxNQUM1QixPQUNJO0FBQ0gsY0FBTSxjQUFjLEtBQUs7QUFBQSxNQUMxQjtBQUFBLElBQ1AsQ0FBSztBQUVELGNBQVUsTUFBTTtBQUVkLFlBQU0sWUFBWSxRQUFRLE1BQU0sY0FBYyxLQUFLO0FBQUEsSUFDekQsQ0FBSztBQUVELG9CQUFnQixNQUFNO0FBRXBCLFlBQU0sWUFBWSxRQUFRLE1BQU0sZ0JBQWdCLEtBQUs7QUFBQSxJQUMzRCxDQUFLO0FBQUEsRUFDRixXQUNRLGtCQUFrQixNQUFNO0FBQy9CLFlB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
