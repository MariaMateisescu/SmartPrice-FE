import { ak as h, bt as createComponent, av as onBeforeUnmount, cb as History, cc as preventScroll, y as ref, a1 as computed, b0 as watch, ba as Transition, bF as hSlot, ah as getCurrentInstance, bR as childHasFocus } from "./index.0ce84b9b.js";
import { a as useTimeout, u as useTick } from "./use-timeout.0140a5e1.js";
import { u as useModelToggleProps, a as useTransitionProps, b as useModelToggleEmits, c as useTransition, e as usePortal, d as useModelToggle, r as removeFocusout, g as removeEscapeKey, f as addFocusout, i as addEscapeKey } from "./ClosePopup.fcd43a0a.js";
import { a as addFocusFn } from "./focus-manager.d6507951.js";
const space = h("div", { class: "q-space" });
var QSpace = createComponent({
  name: "QSpace",
  setup() {
    return () => space;
  }
});
function useHistory(showing, hide, hideOnRouteChange) {
  let historyEntry;
  function removeFromHistory() {
    if (historyEntry !== void 0) {
      History.remove(historyEntry);
      historyEntry = void 0;
    }
  }
  onBeforeUnmount(() => {
    showing.value === true && removeFromHistory();
  });
  return {
    removeFromHistory,
    addToHistory() {
      historyEntry = {
        condition: () => hideOnRouteChange.value === true,
        handler: hide
      };
      History.add(historyEntry);
    }
  };
}
function usePreventScroll() {
  let currentState;
  return {
    preventBodyScroll(state) {
      if (state !== currentState && (currentState !== void 0 || state === true)) {
        currentState = state;
        preventScroll(state);
      }
    }
  };
}
let maximizedModals = 0;
const positionClass = {
  standard: "fixed-full flex-center",
  top: "fixed-top justify-center",
  bottom: "fixed-bottom justify-center",
  right: "fixed-right items-center",
  left: "fixed-left items-center"
};
const defaultTransitions = {
  standard: ["scale", "scale"],
  top: ["slide-down", "slide-up"],
  bottom: ["slide-up", "slide-down"],
  right: ["slide-left", "slide-right"],
  left: ["slide-right", "slide-left"]
};
var QDialog = createComponent({
  name: "QDialog",
  inheritAttrs: false,
  props: {
    ...useModelToggleProps,
    ...useTransitionProps,
    transitionShow: String,
    transitionHide: String,
    persistent: Boolean,
    autoClose: Boolean,
    allowFocusOutside: Boolean,
    noEscDismiss: Boolean,
    noBackdropDismiss: Boolean,
    noRouteDismiss: Boolean,
    noRefocus: Boolean,
    noFocus: Boolean,
    noShake: Boolean,
    seamless: Boolean,
    maximized: Boolean,
    fullWidth: Boolean,
    fullHeight: Boolean,
    square: Boolean,
    position: {
      type: String,
      default: "standard",
      validator: (val) => val === "standard" || ["top", "bottom", "left", "right"].includes(val)
    }
  },
  emits: [
    ...useModelToggleEmits,
    "shake",
    "click",
    "escapeKey"
  ],
  setup(props, { slots, emit, attrs }) {
    const vm = getCurrentInstance();
    const innerRef = ref(null);
    const showing = ref(false);
    const animating = ref(false);
    let shakeTimeout = null, refocusTarget = null, isMaximized, avoidAutoClose;
    const hideOnRouteChange = computed(
      () => props.persistent !== true && props.noRouteDismiss !== true && props.seamless !== true
    );
    const { preventBodyScroll } = usePreventScroll();
    const { registerTimeout } = useTimeout();
    const { registerTick, removeTick } = useTick();
    const { transitionProps, transitionStyle } = useTransition(
      props,
      () => defaultTransitions[props.position][0],
      () => defaultTransitions[props.position][1]
    );
    const { showPortal, hidePortal, portalIsAccessible, renderPortal } = usePortal(
      vm,
      innerRef,
      renderPortalContent,
      "dialog"
    );
    const { hide } = useModelToggle({
      showing,
      hideOnRouteChange,
      handleShow,
      handleHide,
      processOnMount: true
    });
    const { addToHistory, removeFromHistory } = useHistory(showing, hide, hideOnRouteChange);
    const classes = computed(
      () => `q-dialog__inner flex no-pointer-events q-dialog__inner--${props.maximized === true ? "maximized" : "minimized"} q-dialog__inner--${props.position} ${positionClass[props.position]}` + (animating.value === true ? " q-dialog__inner--animating" : "") + (props.fullWidth === true ? " q-dialog__inner--fullwidth" : "") + (props.fullHeight === true ? " q-dialog__inner--fullheight" : "") + (props.square === true ? " q-dialog__inner--square" : "")
    );
    const useBackdrop = computed(() => showing.value === true && props.seamless !== true);
    const onEvents = computed(() => props.autoClose === true ? { onClick: onAutoClose } : {});
    const rootClasses = computed(() => [
      `q-dialog fullscreen no-pointer-events q-dialog--${useBackdrop.value === true ? "modal" : "seamless"}`,
      attrs.class
    ]);
    watch(() => props.maximized, (state) => {
      showing.value === true && updateMaximized(state);
    });
    watch(useBackdrop, (val) => {
      preventBodyScroll(val);
      if (val === true) {
        addFocusout(onFocusChange);
        addEscapeKey(onEscapeKey);
      } else {
        removeFocusout(onFocusChange);
        removeEscapeKey(onEscapeKey);
      }
    });
    function handleShow(evt) {
      addToHistory();
      refocusTarget = props.noRefocus === false && document.activeElement !== null ? document.activeElement : null;
      updateMaximized(props.maximized);
      showPortal();
      animating.value = true;
      if (props.noFocus !== true) {
        document.activeElement !== null && document.activeElement.blur();
        registerTick(focus);
      } else {
        removeTick();
      }
      registerTimeout(() => {
        if (vm.proxy.$q.platform.is.ios === true) {
          if (props.seamless !== true && document.activeElement) {
            const { top, bottom } = document.activeElement.getBoundingClientRect(), { innerHeight } = window, height = window.visualViewport !== void 0 ? window.visualViewport.height : innerHeight;
            if (top > 0 && bottom > height / 2) {
              document.scrollingElement.scrollTop = Math.min(
                document.scrollingElement.scrollHeight - height,
                bottom >= innerHeight ? Infinity : Math.ceil(document.scrollingElement.scrollTop + bottom - height / 2)
              );
            }
            document.activeElement.scrollIntoView();
          }
          avoidAutoClose = true;
          innerRef.value.click();
          avoidAutoClose = false;
        }
        showPortal(true);
        animating.value = false;
        emit("show", evt);
      }, props.transitionDuration);
    }
    function handleHide(evt) {
      removeTick();
      removeFromHistory();
      cleanup(true);
      animating.value = true;
      hidePortal();
      if (refocusTarget !== null) {
        ((evt && evt.type.indexOf("key") === 0 ? refocusTarget.closest('[tabindex]:not([tabindex^="-"])') : void 0) || refocusTarget).focus();
        refocusTarget = null;
      }
      registerTimeout(() => {
        hidePortal(true);
        animating.value = false;
        emit("hide", evt);
      }, props.transitionDuration);
    }
    function focus(selector) {
      addFocusFn(() => {
        let node = innerRef.value;
        if (node === null || node.contains(document.activeElement) === true) {
          return;
        }
        node = (selector !== "" ? node.querySelector(selector) : null) || node.querySelector("[autofocus][tabindex], [data-autofocus][tabindex]") || node.querySelector("[autofocus] [tabindex], [data-autofocus] [tabindex]") || node.querySelector("[autofocus], [data-autofocus]") || node;
        node.focus({ preventScroll: true });
      });
    }
    function shake(focusTarget) {
      if (focusTarget && typeof focusTarget.focus === "function") {
        focusTarget.focus({ preventScroll: true });
      } else {
        focus();
      }
      emit("shake");
      const node = innerRef.value;
      if (node !== null) {
        node.classList.remove("q-animate--scale");
        node.classList.add("q-animate--scale");
        shakeTimeout !== null && clearTimeout(shakeTimeout);
        shakeTimeout = setTimeout(() => {
          shakeTimeout = null;
          if (innerRef.value !== null) {
            node.classList.remove("q-animate--scale");
            focus();
          }
        }, 170);
      }
    }
    function onEscapeKey() {
      if (props.seamless !== true) {
        if (props.persistent === true || props.noEscDismiss === true) {
          props.maximized !== true && props.noShake !== true && shake();
        } else {
          emit("escapeKey");
          hide();
        }
      }
    }
    function cleanup(hiding) {
      if (shakeTimeout !== null) {
        clearTimeout(shakeTimeout);
        shakeTimeout = null;
      }
      if (hiding === true || showing.value === true) {
        updateMaximized(false);
        if (props.seamless !== true) {
          preventBodyScroll(false);
          removeFocusout(onFocusChange);
          removeEscapeKey(onEscapeKey);
        }
      }
      if (hiding !== true) {
        refocusTarget = null;
      }
    }
    function updateMaximized(active) {
      if (active === true) {
        if (isMaximized !== true) {
          maximizedModals < 1 && document.body.classList.add("q-body--dialog");
          maximizedModals++;
          isMaximized = true;
        }
      } else if (isMaximized === true) {
        if (maximizedModals < 2) {
          document.body.classList.remove("q-body--dialog");
        }
        maximizedModals--;
        isMaximized = false;
      }
    }
    function onAutoClose(e) {
      if (avoidAutoClose !== true) {
        hide(e);
        emit("click", e);
      }
    }
    function onBackdropClick(e) {
      if (props.persistent !== true && props.noBackdropDismiss !== true) {
        hide(e);
      } else if (props.noShake !== true) {
        shake();
      }
    }
    function onFocusChange(evt) {
      if (props.allowFocusOutside !== true && portalIsAccessible.value === true && childHasFocus(innerRef.value, evt.target) !== true) {
        focus('[tabindex]:not([tabindex="-1"])');
      }
    }
    Object.assign(vm.proxy, {
      focus,
      shake,
      __updateRefocusTarget(target) {
        refocusTarget = target || null;
      }
    });
    onBeforeUnmount(cleanup);
    function renderPortalContent() {
      return h("div", {
        role: "dialog",
        "aria-modal": useBackdrop.value === true ? "true" : "false",
        ...attrs,
        class: rootClasses.value
      }, [
        h(Transition, {
          name: "q-transition--fade",
          appear: true
        }, () => useBackdrop.value === true ? h("div", {
          class: "q-dialog__backdrop fixed-full",
          style: transitionStyle.value,
          "aria-hidden": "true",
          tabindex: -1,
          onClick: onBackdropClick
        }) : null),
        h(
          Transition,
          transitionProps.value,
          () => showing.value === true ? h("div", {
            ref: innerRef,
            class: classes.value,
            style: transitionStyle.value,
            tabindex: -1,
            ...onEvents.value
          }, hSlot(slots.default)) : null
        )
      ]);
    }
    return renderPortal;
  }
});
export { QSpace as Q, QDialog as a, usePreventScroll as b, useHistory as u };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUURpYWxvZy4yN2UyNTVjZC5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9zcGFjZS9RU3BhY2UuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1oaXN0b3J5LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtcHJldmVudC1zY3JvbGwuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2RpYWxvZy9RRGlhbG9nLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGggfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuXG5jb25zdCBzcGFjZSA9IGgoJ2RpdicsIHsgY2xhc3M6ICdxLXNwYWNlJyB9KVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUVNwYWNlJyxcblxuICBzZXR1cCAoKSB7XG4gICAgcmV0dXJuICgpID0+IHNwYWNlXG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBvbkJlZm9yZVVubW91bnQgfSBmcm9tICd2dWUnXG5cbmltcG9ydCBIaXN0b3J5IGZyb20gJy4uLy4uL2hpc3RvcnkuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzaG93aW5nLCBoaWRlLCBoaWRlT25Sb3V0ZUNoYW5nZSkge1xuICBsZXQgaGlzdG9yeUVudHJ5XG5cbiAgZnVuY3Rpb24gcmVtb3ZlRnJvbUhpc3RvcnkgKCkge1xuICAgIGlmIChoaXN0b3J5RW50cnkgIT09IHZvaWQgMCkge1xuICAgICAgSGlzdG9yeS5yZW1vdmUoaGlzdG9yeUVudHJ5KVxuICAgICAgaGlzdG9yeUVudHJ5ID0gdm9pZCAwXG4gICAgfVxuICB9XG5cbiAgb25CZWZvcmVVbm1vdW50KCgpID0+IHtcbiAgICBzaG93aW5nLnZhbHVlID09PSB0cnVlICYmIHJlbW92ZUZyb21IaXN0b3J5KClcbiAgfSlcblxuICByZXR1cm4ge1xuICAgIHJlbW92ZUZyb21IaXN0b3J5LFxuXG4gICAgYWRkVG9IaXN0b3J5ICgpIHtcbiAgICAgIGhpc3RvcnlFbnRyeSA9IHtcbiAgICAgICAgY29uZGl0aW9uOiAoKSA9PiBoaWRlT25Sb3V0ZUNoYW5nZS52YWx1ZSA9PT0gdHJ1ZSxcbiAgICAgICAgaGFuZGxlcjogaGlkZVxuICAgICAgfVxuXG4gICAgICBIaXN0b3J5LmFkZChoaXN0b3J5RW50cnkpXG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgcHJldmVudFNjcm9sbCBmcm9tICcuLi8uLi91dGlscy9wcmV2ZW50LXNjcm9sbC5qcydcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICBsZXQgY3VycmVudFN0YXRlXG5cbiAgcmV0dXJuIHtcbiAgICBwcmV2ZW50Qm9keVNjcm9sbCAoc3RhdGUpIHtcbiAgICAgIGlmIChcbiAgICAgICAgc3RhdGUgIT09IGN1cnJlbnRTdGF0ZVxuICAgICAgICAmJiAoY3VycmVudFN0YXRlICE9PSB2b2lkIDAgfHwgc3RhdGUgPT09IHRydWUpXG4gICAgICApIHtcbiAgICAgICAgY3VycmVudFN0YXRlID0gc3RhdGVcbiAgICAgICAgcHJldmVudFNjcm9sbChzdGF0ZSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IGgsIHJlZiwgY29tcHV0ZWQsIHdhdGNoLCBvbkJlZm9yZVVubW91bnQsIFRyYW5zaXRpb24sIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHVzZUhpc3RvcnkgZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtaGlzdG9yeS5qcydcbmltcG9ydCB1c2VUaW1lb3V0IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLXRpbWVvdXQuanMnXG5pbXBvcnQgdXNlVGljayBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS10aWNrLmpzJ1xuaW1wb3J0IHVzZU1vZGVsVG9nZ2xlLCB7IHVzZU1vZGVsVG9nZ2xlUHJvcHMsIHVzZU1vZGVsVG9nZ2xlRW1pdHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1tb2RlbC10b2dnbGUuanMnXG5pbXBvcnQgdXNlVHJhbnNpdGlvbiwgeyB1c2VUcmFuc2l0aW9uUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS10cmFuc2l0aW9uLmpzJ1xuaW1wb3J0IHVzZVBvcnRhbCBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1wb3J0YWwuanMnXG5pbXBvcnQgdXNlUHJldmVudFNjcm9sbCBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1wcmV2ZW50LXNjcm9sbC5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBjaGlsZEhhc0ZvY3VzIH0gZnJvbSAnLi4vLi4vdXRpbHMvZG9tLmpzJ1xuaW1wb3J0IHsgaFNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcbmltcG9ydCB7IGFkZEVzY2FwZUtleSwgcmVtb3ZlRXNjYXBlS2V5IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9lc2NhcGUta2V5LmpzJ1xuaW1wb3J0IHsgYWRkRm9jdXNvdXQsIHJlbW92ZUZvY3Vzb3V0IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9mb2N1c291dC5qcydcbmltcG9ydCB7IGFkZEZvY3VzRm4gfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2ZvY3VzLW1hbmFnZXIuanMnXG5cbmxldCBtYXhpbWl6ZWRNb2RhbHMgPSAwXG5cbmNvbnN0IHBvc2l0aW9uQ2xhc3MgPSB7XG4gIHN0YW5kYXJkOiAnZml4ZWQtZnVsbCBmbGV4LWNlbnRlcicsXG4gIHRvcDogJ2ZpeGVkLXRvcCBqdXN0aWZ5LWNlbnRlcicsXG4gIGJvdHRvbTogJ2ZpeGVkLWJvdHRvbSBqdXN0aWZ5LWNlbnRlcicsXG4gIHJpZ2h0OiAnZml4ZWQtcmlnaHQgaXRlbXMtY2VudGVyJyxcbiAgbGVmdDogJ2ZpeGVkLWxlZnQgaXRlbXMtY2VudGVyJ1xufVxuXG5jb25zdCBkZWZhdWx0VHJhbnNpdGlvbnMgPSB7XG4gIHN0YW5kYXJkOiBbICdzY2FsZScsICdzY2FsZScgXSxcbiAgdG9wOiBbICdzbGlkZS1kb3duJywgJ3NsaWRlLXVwJyBdLFxuICBib3R0b206IFsgJ3NsaWRlLXVwJywgJ3NsaWRlLWRvd24nIF0sXG4gIHJpZ2h0OiBbICdzbGlkZS1sZWZ0JywgJ3NsaWRlLXJpZ2h0JyBdLFxuICBsZWZ0OiBbICdzbGlkZS1yaWdodCcsICdzbGlkZS1sZWZ0JyBdXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRRGlhbG9nJyxcblxuICBpbmhlcml0QXR0cnM6IGZhbHNlLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlTW9kZWxUb2dnbGVQcm9wcyxcbiAgICAuLi51c2VUcmFuc2l0aW9uUHJvcHMsXG5cbiAgICB0cmFuc2l0aW9uU2hvdzogU3RyaW5nLCAvLyBvdmVycmlkZSB1c2VUcmFuc2l0aW9uUHJvcHNcbiAgICB0cmFuc2l0aW9uSGlkZTogU3RyaW5nLCAvLyBvdmVycmlkZSB1c2VUcmFuc2l0aW9uUHJvcHNcblxuICAgIHBlcnNpc3RlbnQ6IEJvb2xlYW4sXG4gICAgYXV0b0Nsb3NlOiBCb29sZWFuLFxuICAgIGFsbG93Rm9jdXNPdXRzaWRlOiBCb29sZWFuLFxuXG4gICAgbm9Fc2NEaXNtaXNzOiBCb29sZWFuLFxuICAgIG5vQmFja2Ryb3BEaXNtaXNzOiBCb29sZWFuLFxuICAgIG5vUm91dGVEaXNtaXNzOiBCb29sZWFuLFxuICAgIG5vUmVmb2N1czogQm9vbGVhbixcbiAgICBub0ZvY3VzOiBCb29sZWFuLFxuICAgIG5vU2hha2U6IEJvb2xlYW4sXG5cbiAgICBzZWFtbGVzczogQm9vbGVhbixcblxuICAgIG1heGltaXplZDogQm9vbGVhbixcbiAgICBmdWxsV2lkdGg6IEJvb2xlYW4sXG4gICAgZnVsbEhlaWdodDogQm9vbGVhbixcblxuICAgIHNxdWFyZTogQm9vbGVhbixcblxuICAgIHBvc2l0aW9uOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnc3RhbmRhcmQnLFxuICAgICAgdmFsaWRhdG9yOiB2YWwgPT4gdmFsID09PSAnc3RhbmRhcmQnXG4gICAgICAgIHx8IFsgJ3RvcCcsICdib3R0b20nLCAnbGVmdCcsICdyaWdodCcgXS5pbmNsdWRlcyh2YWwpXG4gICAgfVxuICB9LFxuXG4gIGVtaXRzOiBbXG4gICAgLi4udXNlTW9kZWxUb2dnbGVFbWl0cyxcbiAgICAnc2hha2UnLCAnY2xpY2snLCAnZXNjYXBlS2V5J1xuICBdLFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cywgZW1pdCwgYXR0cnMgfSkge1xuICAgIGNvbnN0IHZtID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICAgIGNvbnN0IGlubmVyUmVmID0gcmVmKG51bGwpXG4gICAgY29uc3Qgc2hvd2luZyA9IHJlZihmYWxzZSlcbiAgICBjb25zdCBhbmltYXRpbmcgPSByZWYoZmFsc2UpXG5cbiAgICBsZXQgc2hha2VUaW1lb3V0ID0gbnVsbCwgcmVmb2N1c1RhcmdldCA9IG51bGwsIGlzTWF4aW1pemVkLCBhdm9pZEF1dG9DbG9zZVxuXG4gICAgY29uc3QgaGlkZU9uUm91dGVDaGFuZ2UgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgcHJvcHMucGVyc2lzdGVudCAhPT0gdHJ1ZVxuICAgICAgJiYgcHJvcHMubm9Sb3V0ZURpc21pc3MgIT09IHRydWVcbiAgICAgICYmIHByb3BzLnNlYW1sZXNzICE9PSB0cnVlXG4gICAgKVxuXG4gICAgY29uc3QgeyBwcmV2ZW50Qm9keVNjcm9sbCB9ID0gdXNlUHJldmVudFNjcm9sbCgpXG4gICAgY29uc3QgeyByZWdpc3RlclRpbWVvdXQgfSA9IHVzZVRpbWVvdXQoKVxuICAgIGNvbnN0IHsgcmVnaXN0ZXJUaWNrLCByZW1vdmVUaWNrIH0gPSB1c2VUaWNrKClcblxuICAgIGNvbnN0IHsgdHJhbnNpdGlvblByb3BzLCB0cmFuc2l0aW9uU3R5bGUgfSA9IHVzZVRyYW5zaXRpb24oXG4gICAgICBwcm9wcyxcbiAgICAgICgpID0+IGRlZmF1bHRUcmFuc2l0aW9uc1sgcHJvcHMucG9zaXRpb24gXVsgMCBdLFxuICAgICAgKCkgPT4gZGVmYXVsdFRyYW5zaXRpb25zWyBwcm9wcy5wb3NpdGlvbiBdWyAxIF1cbiAgICApXG5cbiAgICBjb25zdCB7IHNob3dQb3J0YWwsIGhpZGVQb3J0YWwsIHBvcnRhbElzQWNjZXNzaWJsZSwgcmVuZGVyUG9ydGFsIH0gPSB1c2VQb3J0YWwoXG4gICAgICB2bSwgaW5uZXJSZWYsIHJlbmRlclBvcnRhbENvbnRlbnQsICdkaWFsb2cnXG4gICAgKVxuXG4gICAgY29uc3QgeyBoaWRlIH0gPSB1c2VNb2RlbFRvZ2dsZSh7XG4gICAgICBzaG93aW5nLFxuICAgICAgaGlkZU9uUm91dGVDaGFuZ2UsXG4gICAgICBoYW5kbGVTaG93LFxuICAgICAgaGFuZGxlSGlkZSxcbiAgICAgIHByb2Nlc3NPbk1vdW50OiB0cnVlXG4gICAgfSlcblxuICAgIGNvbnN0IHsgYWRkVG9IaXN0b3J5LCByZW1vdmVGcm9tSGlzdG9yeSB9ID0gdXNlSGlzdG9yeShzaG93aW5nLCBoaWRlLCBoaWRlT25Sb3V0ZUNoYW5nZSlcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3EtZGlhbG9nX19pbm5lciBmbGV4IG5vLXBvaW50ZXItZXZlbnRzJ1xuICAgICAgKyBgIHEtZGlhbG9nX19pbm5lci0tJHsgcHJvcHMubWF4aW1pemVkID09PSB0cnVlID8gJ21heGltaXplZCcgOiAnbWluaW1pemVkJyB9YFxuICAgICAgKyBgIHEtZGlhbG9nX19pbm5lci0tJHsgcHJvcHMucG9zaXRpb24gfSAkeyBwb3NpdGlvbkNsYXNzWyBwcm9wcy5wb3NpdGlvbiBdIH1gXG4gICAgICArIChhbmltYXRpbmcudmFsdWUgPT09IHRydWUgPyAnIHEtZGlhbG9nX19pbm5lci0tYW5pbWF0aW5nJyA6ICcnKVxuICAgICAgKyAocHJvcHMuZnVsbFdpZHRoID09PSB0cnVlID8gJyBxLWRpYWxvZ19faW5uZXItLWZ1bGx3aWR0aCcgOiAnJylcbiAgICAgICsgKHByb3BzLmZ1bGxIZWlnaHQgPT09IHRydWUgPyAnIHEtZGlhbG9nX19pbm5lci0tZnVsbGhlaWdodCcgOiAnJylcbiAgICAgICsgKHByb3BzLnNxdWFyZSA9PT0gdHJ1ZSA/ICcgcS1kaWFsb2dfX2lubmVyLS1zcXVhcmUnIDogJycpXG4gICAgKVxuXG4gICAgY29uc3QgdXNlQmFja2Ryb3AgPSBjb21wdXRlZCgoKSA9PiBzaG93aW5nLnZhbHVlID09PSB0cnVlICYmIHByb3BzLnNlYW1sZXNzICE9PSB0cnVlKVxuXG4gICAgY29uc3Qgb25FdmVudHMgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBwcm9wcy5hdXRvQ2xvc2UgPT09IHRydWVcbiAgICAgICAgPyB7IG9uQ2xpY2s6IG9uQXV0b0Nsb3NlIH1cbiAgICAgICAgOiB7fVxuICAgICkpXG5cbiAgICBjb25zdCByb290Q2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+IFtcbiAgICAgICdxLWRpYWxvZyBmdWxsc2NyZWVuIG5vLXBvaW50ZXItZXZlbnRzICdcbiAgICAgICAgKyBgcS1kaWFsb2ctLSR7IHVzZUJhY2tkcm9wLnZhbHVlID09PSB0cnVlID8gJ21vZGFsJyA6ICdzZWFtbGVzcycgfWAsXG4gICAgICBhdHRycy5jbGFzc1xuICAgIF0pXG5cbiAgICB3YXRjaCgoKSA9PiBwcm9wcy5tYXhpbWl6ZWQsIHN0YXRlID0+IHtcbiAgICAgIHNob3dpbmcudmFsdWUgPT09IHRydWUgJiYgdXBkYXRlTWF4aW1pemVkKHN0YXRlKVxuICAgIH0pXG5cbiAgICB3YXRjaCh1c2VCYWNrZHJvcCwgdmFsID0+IHtcbiAgICAgIHByZXZlbnRCb2R5U2Nyb2xsKHZhbClcblxuICAgICAgaWYgKHZhbCA9PT0gdHJ1ZSkge1xuICAgICAgICBhZGRGb2N1c291dChvbkZvY3VzQ2hhbmdlKVxuICAgICAgICBhZGRFc2NhcGVLZXkob25Fc2NhcGVLZXkpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgcmVtb3ZlRm9jdXNvdXQob25Gb2N1c0NoYW5nZSlcbiAgICAgICAgcmVtb3ZlRXNjYXBlS2V5KG9uRXNjYXBlS2V5KVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBmdW5jdGlvbiBoYW5kbGVTaG93IChldnQpIHtcbiAgICAgIGFkZFRvSGlzdG9yeSgpXG5cbiAgICAgIHJlZm9jdXNUYXJnZXQgPSBwcm9wcy5ub1JlZm9jdXMgPT09IGZhbHNlICYmIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgIT09IG51bGxcbiAgICAgICAgPyBkb2N1bWVudC5hY3RpdmVFbGVtZW50XG4gICAgICAgIDogbnVsbFxuXG4gICAgICB1cGRhdGVNYXhpbWl6ZWQocHJvcHMubWF4aW1pemVkKVxuICAgICAgc2hvd1BvcnRhbCgpXG4gICAgICBhbmltYXRpbmcudmFsdWUgPSB0cnVlXG5cbiAgICAgIGlmIChwcm9wcy5ub0ZvY3VzICE9PSB0cnVlKSB7XG4gICAgICAgIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgIT09IG51bGwgJiYgZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5ibHVyKClcbiAgICAgICAgcmVnaXN0ZXJUaWNrKGZvY3VzKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHJlbW92ZVRpY2soKVxuICAgICAgfVxuXG4gICAgICAvLyBzaG91bGQgcmVtb3ZlVGltZW91dCgpIGlmIHRoaXMgZ2V0cyByZW1vdmVkXG4gICAgICByZWdpc3RlclRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBpZiAodm0ucHJveHkuJHEucGxhdGZvcm0uaXMuaW9zID09PSB0cnVlKSB7XG4gICAgICAgICAgaWYgKHByb3BzLnNlYW1sZXNzICE9PSB0cnVlICYmIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIGNvbnN0XG4gICAgICAgICAgICAgIHsgdG9wLCBib3R0b20gfSA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG4gICAgICAgICAgICAgIHsgaW5uZXJIZWlnaHQgfSA9IHdpbmRvdyxcbiAgICAgICAgICAgICAgaGVpZ2h0ID0gd2luZG93LnZpc3VhbFZpZXdwb3J0ICE9PSB2b2lkIDBcbiAgICAgICAgICAgICAgICA/IHdpbmRvdy52aXN1YWxWaWV3cG9ydC5oZWlnaHRcbiAgICAgICAgICAgICAgICA6IGlubmVySGVpZ2h0XG5cbiAgICAgICAgICAgIGlmICh0b3AgPiAwICYmIGJvdHRvbSA+IGhlaWdodCAvIDIpIHtcbiAgICAgICAgICAgICAgZG9jdW1lbnQuc2Nyb2xsaW5nRWxlbWVudC5zY3JvbGxUb3AgPSBNYXRoLm1pbihcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5zY3JvbGxpbmdFbGVtZW50LnNjcm9sbEhlaWdodCAtIGhlaWdodCxcbiAgICAgICAgICAgICAgICBib3R0b20gPj0gaW5uZXJIZWlnaHRcbiAgICAgICAgICAgICAgICAgID8gSW5maW5pdHlcbiAgICAgICAgICAgICAgICAgIDogTWF0aC5jZWlsKGRvY3VtZW50LnNjcm9sbGluZ0VsZW1lbnQuc2Nyb2xsVG9wICsgYm90dG9tIC0gaGVpZ2h0IC8gMilcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkb2N1bWVudC5hY3RpdmVFbGVtZW50LnNjcm9sbEludG9WaWV3KClcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyByZXF1aXJlZCBpbiBvcmRlciB0byBhdm9pZCB0aGUgXCJkb3VibGUtdGFwIG5lZWRlZFwiIGlzc3VlXG4gICAgICAgICAgYXZvaWRBdXRvQ2xvc2UgPSB0cnVlXG4gICAgICAgICAgaW5uZXJSZWYudmFsdWUuY2xpY2soKVxuICAgICAgICAgIGF2b2lkQXV0b0Nsb3NlID0gZmFsc2VcbiAgICAgICAgfVxuXG4gICAgICAgIHNob3dQb3J0YWwodHJ1ZSkgLy8gZG9uZSBzaG93aW5nIHBvcnRhbFxuICAgICAgICBhbmltYXRpbmcudmFsdWUgPSBmYWxzZVxuICAgICAgICBlbWl0KCdzaG93JywgZXZ0KVxuICAgICAgfSwgcHJvcHMudHJhbnNpdGlvbkR1cmF0aW9uKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZUhpZGUgKGV2dCkge1xuICAgICAgcmVtb3ZlVGljaygpXG4gICAgICByZW1vdmVGcm9tSGlzdG9yeSgpXG4gICAgICBjbGVhbnVwKHRydWUpXG4gICAgICBhbmltYXRpbmcudmFsdWUgPSB0cnVlXG4gICAgICBoaWRlUG9ydGFsKClcblxuICAgICAgaWYgKHJlZm9jdXNUYXJnZXQgIT09IG51bGwpIHtcbiAgICAgICAgKChldnQgJiYgZXZ0LnR5cGUuaW5kZXhPZigna2V5JykgPT09IDBcbiAgICAgICAgICA/IHJlZm9jdXNUYXJnZXQuY2xvc2VzdCgnW3RhYmluZGV4XTpub3QoW3RhYmluZGV4Xj1cIi1cIl0pJylcbiAgICAgICAgICA6IHZvaWQgMFxuICAgICAgICApIHx8IHJlZm9jdXNUYXJnZXQpLmZvY3VzKClcbiAgICAgICAgcmVmb2N1c1RhcmdldCA9IG51bGxcbiAgICAgIH1cblxuICAgICAgLy8gc2hvdWxkIHJlbW92ZVRpbWVvdXQoKSBpZiB0aGlzIGdldHMgcmVtb3ZlZFxuICAgICAgcmVnaXN0ZXJUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgaGlkZVBvcnRhbCh0cnVlKSAvLyBkb25lIGhpZGluZywgbm93IGRlc3Ryb3lcbiAgICAgICAgYW5pbWF0aW5nLnZhbHVlID0gZmFsc2VcbiAgICAgICAgZW1pdCgnaGlkZScsIGV2dClcbiAgICAgIH0sIHByb3BzLnRyYW5zaXRpb25EdXJhdGlvbilcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmb2N1cyAoc2VsZWN0b3IpIHtcbiAgICAgIGFkZEZvY3VzRm4oKCkgPT4ge1xuICAgICAgICBsZXQgbm9kZSA9IGlubmVyUmVmLnZhbHVlXG5cbiAgICAgICAgaWYgKG5vZGUgPT09IG51bGwgfHwgbm9kZS5jb250YWlucyhkb2N1bWVudC5hY3RpdmVFbGVtZW50KSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgbm9kZSA9IChzZWxlY3RvciAhPT0gJycgPyBub2RlLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpIDogbnVsbClcbiAgICAgICAgICB8fCBub2RlLnF1ZXJ5U2VsZWN0b3IoJ1thdXRvZm9jdXNdW3RhYmluZGV4XSwgW2RhdGEtYXV0b2ZvY3VzXVt0YWJpbmRleF0nKVxuICAgICAgICAgIHx8IG5vZGUucXVlcnlTZWxlY3RvcignW2F1dG9mb2N1c10gW3RhYmluZGV4XSwgW2RhdGEtYXV0b2ZvY3VzXSBbdGFiaW5kZXhdJylcbiAgICAgICAgICB8fCBub2RlLnF1ZXJ5U2VsZWN0b3IoJ1thdXRvZm9jdXNdLCBbZGF0YS1hdXRvZm9jdXNdJylcbiAgICAgICAgICB8fCBub2RlXG4gICAgICAgIG5vZGUuZm9jdXMoeyBwcmV2ZW50U2Nyb2xsOiB0cnVlIH0pXG4gICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNoYWtlIChmb2N1c1RhcmdldCkge1xuICAgICAgaWYgKGZvY3VzVGFyZ2V0ICYmIHR5cGVvZiBmb2N1c1RhcmdldC5mb2N1cyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBmb2N1c1RhcmdldC5mb2N1cyh7IHByZXZlbnRTY3JvbGw6IHRydWUgfSlcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBmb2N1cygpXG4gICAgICB9XG5cbiAgICAgIGVtaXQoJ3NoYWtlJylcblxuICAgICAgY29uc3Qgbm9kZSA9IGlubmVyUmVmLnZhbHVlXG5cbiAgICAgIGlmIChub2RlICE9PSBudWxsKSB7XG4gICAgICAgIG5vZGUuY2xhc3NMaXN0LnJlbW92ZSgncS1hbmltYXRlLS1zY2FsZScpXG4gICAgICAgIG5vZGUuY2xhc3NMaXN0LmFkZCgncS1hbmltYXRlLS1zY2FsZScpXG4gICAgICAgIHNoYWtlVGltZW91dCAhPT0gbnVsbCAmJiBjbGVhclRpbWVvdXQoc2hha2VUaW1lb3V0KVxuICAgICAgICBzaGFrZVRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBzaGFrZVRpbWVvdXQgPSBudWxsXG4gICAgICAgICAgaWYgKGlubmVyUmVmLnZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgICAgICBub2RlLmNsYXNzTGlzdC5yZW1vdmUoJ3EtYW5pbWF0ZS0tc2NhbGUnKVxuICAgICAgICAgICAgLy8gc29tZSBwbGF0Zm9ybXMgKGxpa2UgZGVza3RvcCBDaHJvbWUpXG4gICAgICAgICAgICAvLyByZXF1aXJlIGNhbGxpbmcgZm9jdXMoKSBhZ2FpblxuICAgICAgICAgICAgZm9jdXMoKVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgMTcwKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uRXNjYXBlS2V5ICgpIHtcbiAgICAgIGlmIChwcm9wcy5zZWFtbGVzcyAhPT0gdHJ1ZSkge1xuICAgICAgICBpZiAocHJvcHMucGVyc2lzdGVudCA9PT0gdHJ1ZSB8fCBwcm9wcy5ub0VzY0Rpc21pc3MgPT09IHRydWUpIHtcbiAgICAgICAgICBwcm9wcy5tYXhpbWl6ZWQgIT09IHRydWUgJiYgcHJvcHMubm9TaGFrZSAhPT0gdHJ1ZSAmJiBzaGFrZSgpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgZW1pdCgnZXNjYXBlS2V5JylcbiAgICAgICAgICBoaWRlKClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsZWFudXAgKGhpZGluZykge1xuICAgICAgaWYgKHNoYWtlVGltZW91dCAhPT0gbnVsbCkge1xuICAgICAgICBjbGVhclRpbWVvdXQoc2hha2VUaW1lb3V0KVxuICAgICAgICBzaGFrZVRpbWVvdXQgPSBudWxsXG4gICAgICB9XG5cbiAgICAgIGlmIChoaWRpbmcgPT09IHRydWUgfHwgc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICB1cGRhdGVNYXhpbWl6ZWQoZmFsc2UpXG5cbiAgICAgICAgaWYgKHByb3BzLnNlYW1sZXNzICE9PSB0cnVlKSB7XG4gICAgICAgICAgcHJldmVudEJvZHlTY3JvbGwoZmFsc2UpXG4gICAgICAgICAgcmVtb3ZlRm9jdXNvdXQob25Gb2N1c0NoYW5nZSlcbiAgICAgICAgICByZW1vdmVFc2NhcGVLZXkob25Fc2NhcGVLZXkpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGhpZGluZyAhPT0gdHJ1ZSkge1xuICAgICAgICByZWZvY3VzVGFyZ2V0ID0gbnVsbFxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZU1heGltaXplZCAoYWN0aXZlKSB7XG4gICAgICBpZiAoYWN0aXZlID09PSB0cnVlKSB7XG4gICAgICAgIGlmIChpc01heGltaXplZCAhPT0gdHJ1ZSkge1xuICAgICAgICAgIG1heGltaXplZE1vZGFscyA8IDEgJiYgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdxLWJvZHktLWRpYWxvZycpXG4gICAgICAgICAgbWF4aW1pemVkTW9kYWxzKytcblxuICAgICAgICAgIGlzTWF4aW1pemVkID0gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChpc01heGltaXplZCA9PT0gdHJ1ZSkge1xuICAgICAgICBpZiAobWF4aW1pemVkTW9kYWxzIDwgMikge1xuICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgncS1ib2R5LS1kaWFsb2cnKVxuICAgICAgICB9XG5cbiAgICAgICAgbWF4aW1pemVkTW9kYWxzLS1cbiAgICAgICAgaXNNYXhpbWl6ZWQgPSBmYWxzZVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uQXV0b0Nsb3NlIChlKSB7XG4gICAgICBpZiAoYXZvaWRBdXRvQ2xvc2UgIT09IHRydWUpIHtcbiAgICAgICAgaGlkZShlKVxuICAgICAgICBlbWl0KCdjbGljaycsIGUpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25CYWNrZHJvcENsaWNrIChlKSB7XG4gICAgICBpZiAocHJvcHMucGVyc2lzdGVudCAhPT0gdHJ1ZSAmJiBwcm9wcy5ub0JhY2tkcm9wRGlzbWlzcyAhPT0gdHJ1ZSkge1xuICAgICAgICBoaWRlKGUpXG4gICAgICB9XG4gICAgICBlbHNlIGlmIChwcm9wcy5ub1NoYWtlICE9PSB0cnVlKSB7XG4gICAgICAgIHNoYWtlKClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkZvY3VzQ2hhbmdlIChldnQpIHtcbiAgICAgIC8vIHRoZSBmb2N1cyBpcyBub3QgaW4gYSB2dWUgY2hpbGQgY29tcG9uZW50XG4gICAgICBpZiAoXG4gICAgICAgIHByb3BzLmFsbG93Rm9jdXNPdXRzaWRlICE9PSB0cnVlXG4gICAgICAgICYmIHBvcnRhbElzQWNjZXNzaWJsZS52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAmJiBjaGlsZEhhc0ZvY3VzKGlubmVyUmVmLnZhbHVlLCBldnQudGFyZ2V0KSAhPT0gdHJ1ZVxuICAgICAgKSB7XG4gICAgICAgIGZvY3VzKCdbdGFiaW5kZXhdOm5vdChbdGFiaW5kZXg9XCItMVwiXSknKVxuICAgICAgfVxuICAgIH1cblxuICAgIE9iamVjdC5hc3NpZ24odm0ucHJveHksIHtcbiAgICAgIC8vIGV4cG9zZSBwdWJsaWMgbWV0aG9kc1xuICAgICAgZm9jdXMsIHNoYWtlLFxuXG4gICAgICAvLyBwcml2YXRlIGJ1dCBuZWVkZWQgYnkgUVNlbGVjdFxuICAgICAgX191cGRhdGVSZWZvY3VzVGFyZ2V0ICh0YXJnZXQpIHtcbiAgICAgICAgcmVmb2N1c1RhcmdldCA9IHRhcmdldCB8fCBudWxsXG4gICAgICB9XG4gICAgfSlcblxuICAgIG9uQmVmb3JlVW5tb3VudChjbGVhbnVwKVxuXG4gICAgZnVuY3Rpb24gcmVuZGVyUG9ydGFsQ29udGVudCAoKSB7XG4gICAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgICByb2xlOiAnZGlhbG9nJyxcbiAgICAgICAgJ2FyaWEtbW9kYWwnOiB1c2VCYWNrZHJvcC52YWx1ZSA9PT0gdHJ1ZSA/ICd0cnVlJyA6ICdmYWxzZScsXG4gICAgICAgIC4uLmF0dHJzLFxuICAgICAgICBjbGFzczogcm9vdENsYXNzZXMudmFsdWVcbiAgICAgIH0sIFtcbiAgICAgICAgaChUcmFuc2l0aW9uLCB7XG4gICAgICAgICAgbmFtZTogJ3EtdHJhbnNpdGlvbi0tZmFkZScsXG4gICAgICAgICAgYXBwZWFyOiB0cnVlXG4gICAgICAgIH0sICgpID0+IChcbiAgICAgICAgICB1c2VCYWNrZHJvcC52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAgICAgPyBoKCdkaXYnLCB7XG4gICAgICAgICAgICAgIGNsYXNzOiAncS1kaWFsb2dfX2JhY2tkcm9wIGZpeGVkLWZ1bGwnLFxuICAgICAgICAgICAgICBzdHlsZTogdHJhbnNpdGlvblN0eWxlLnZhbHVlLFxuICAgICAgICAgICAgICAnYXJpYS1oaWRkZW4nOiAndHJ1ZScsXG4gICAgICAgICAgICAgIHRhYmluZGV4OiAtMSxcbiAgICAgICAgICAgICAgb25DbGljazogb25CYWNrZHJvcENsaWNrXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgOiBudWxsXG4gICAgICAgICkpLFxuXG4gICAgICAgIGgoXG4gICAgICAgICAgVHJhbnNpdGlvbixcbiAgICAgICAgICB0cmFuc2l0aW9uUHJvcHMudmFsdWUsXG4gICAgICAgICAgKCkgPT4gKFxuICAgICAgICAgICAgc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAgICAgICA/IGgoJ2RpdicsIHtcbiAgICAgICAgICAgICAgICByZWY6IGlubmVyUmVmLFxuICAgICAgICAgICAgICAgIGNsYXNzOiBjbGFzc2VzLnZhbHVlLFxuICAgICAgICAgICAgICAgIHN0eWxlOiB0cmFuc2l0aW9uU3R5bGUudmFsdWUsXG4gICAgICAgICAgICAgICAgdGFiaW5kZXg6IC0xLFxuICAgICAgICAgICAgICAgIC4uLm9uRXZlbnRzLnZhbHVlXG4gICAgICAgICAgICAgIH0sIGhTbG90KHNsb3RzLmRlZmF1bHQpKVxuICAgICAgICAgICAgICA6IG51bGxcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgIF0pXG4gICAgfVxuXG4gICAgcmV0dXJuIHJlbmRlclBvcnRhbFxuICB9XG59KVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFJQSxNQUFNLFFBQVEsRUFBRSxPQUFPLEVBQUUsT0FBTyxVQUFTLENBQUU7QUFFM0MsSUFBQSxTQUFlLGdCQUFnQjtBQUFBLEVBQzdCLE1BQU07QUFBQSxFQUVOLFFBQVM7QUFDUCxXQUFPLE1BQU07QUFBQSxFQUNkO0FBQ0gsQ0FBQztBQ1JjLFNBQUEsV0FBVSxTQUFTLE1BQU0sbUJBQW1CO0FBQ3pELE1BQUk7QUFFSixXQUFTLG9CQUFxQjtBQUM1QixRQUFJLGlCQUFpQixRQUFRO0FBQzNCLGNBQVEsT0FBTyxZQUFZO0FBQzNCLHFCQUFlO0FBQUEsSUFDaEI7QUFBQSxFQUNGO0FBRUQsa0JBQWdCLE1BQU07QUFDcEIsWUFBUSxVQUFVLFFBQVEsa0JBQW1CO0FBQUEsRUFDakQsQ0FBRztBQUVELFNBQU87QUFBQSxJQUNMO0FBQUEsSUFFQSxlQUFnQjtBQUNkLHFCQUFlO0FBQUEsUUFDYixXQUFXLE1BQU0sa0JBQWtCLFVBQVU7QUFBQSxRQUM3QyxTQUFTO0FBQUEsTUFDVjtBQUVELGNBQVEsSUFBSSxZQUFZO0FBQUEsSUFDekI7QUFBQSxFQUNGO0FBQ0g7QUM1QmUsU0FBQSxtQkFBWTtBQUN6QixNQUFJO0FBRUosU0FBTztBQUFBLElBQ0wsa0JBQW1CLE9BQU87QUFDeEIsVUFDRSxVQUFVLGlCQUNOLGlCQUFpQixVQUFVLFVBQVUsT0FDekM7QUFDQSx1QkFBZTtBQUNmLHNCQUFjLEtB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
