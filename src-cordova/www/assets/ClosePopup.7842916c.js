import { b0 as watch, bX as vmHasRouter, az as onMounted, ah as getCurrentInstance, as as nextTick, bY as getParentProxy, y as ref, aD as onUnmounted, bZ as injectProp, ak as h, V as Teleport, b_ as createGlobalNode, b$ as removeGlobalNode, a1 as computed, bH as isKeyCode, bN as client, c0 as createDirective } from "./index.404ce4fc.js";
import { r as removeFocusWaitFlag, b as addFocusWaitFlag } from "./focus-manager.d00a4595.js";
const useModelToggleProps = {
  modelValue: {
    type: Boolean,
    default: null
  },
  "onUpdate:modelValue": [Function, Array]
};
const useModelToggleEmits = [
  "beforeShow",
  "show",
  "beforeHide",
  "hide"
];
function useModelToggle({
  showing,
  canShow,
  hideOnRouteChange,
  handleShow,
  handleHide,
  processOnMount
}) {
  const vm = getCurrentInstance();
  const { props, emit, proxy } = vm;
  let payload;
  function toggle(evt) {
    if (showing.value === true) {
      hide(evt);
    } else {
      show(evt);
    }
  }
  function show(evt) {
    if (props.disable === true || evt !== void 0 && evt.qAnchorHandled === true || canShow !== void 0 && canShow(evt) !== true) {
      return;
    }
    const listener = props["onUpdate:modelValue"] !== void 0;
    if (listener === true && true) {
      emit("update:modelValue", true);
      payload = evt;
      nextTick(() => {
        if (payload === evt) {
          payload = void 0;
        }
      });
    }
    if (props.modelValue === null || listener === false || false) {
      processShow(evt);
    }
  }
  function processShow(evt) {
    if (showing.value === true) {
      return;
    }
    showing.value = true;
    emit("beforeShow", evt);
    if (handleShow !== void 0) {
      handleShow(evt);
    } else {
      emit("show", evt);
    }
  }
  function hide(evt) {
    if (props.disable === true) {
      return;
    }
    const listener = props["onUpdate:modelValue"] !== void 0;
    if (listener === true && true) {
      emit("update:modelValue", false);
      payload = evt;
      nextTick(() => {
        if (payload === evt) {
          payload = void 0;
        }
      });
    }
    if (props.modelValue === null || listener === false || false) {
      processHide(evt);
    }
  }
  function processHide(evt) {
    if (showing.value === false) {
      return;
    }
    showing.value = false;
    emit("beforeHide", evt);
    if (handleHide !== void 0) {
      handleHide(evt);
    } else {
      emit("hide", evt);
    }
  }
  function processModelChange(val) {
    if (props.disable === true && val === true) {
      if (props["onUpdate:modelValue"] !== void 0) {
        emit("update:modelValue", false);
      }
    } else if (val === true !== showing.value) {
      const fn = val === true ? processShow : processHide;
      fn(payload);
    }
  }
  watch(() => props.modelValue, processModelChange);
  if (hideOnRouteChange !== void 0 && vmHasRouter(vm) === true) {
    watch(() => proxy.$route.fullPath, () => {
      if (hideOnRouteChange.value === true && showing.value === true) {
        hide();
      }
    });
  }
  processOnMount === true && onMounted(() => {
    processModelChange(props.modelValue);
  });
  const publicMethods = { show, hide, toggle };
  Object.assign(proxy, publicMethods);
  return publicMethods;
}
const portalProxyList = [];
function getPortalProxy(el) {
  return portalProxyList.find(
    (proxy) => proxy.contentEl !== null && proxy.contentEl.contains(el)
  );
}
function closePortalMenus(proxy, evt) {
  do {
    if (proxy.$options.name === "QMenu") {
      proxy.hide(evt);
      if (proxy.$props.separateClosePopup === true) {
        return getParentProxy(proxy);
      }
    } else if (proxy.__qPortal === true) {
      const parent = getParentProxy(proxy);
      if (parent !== void 0 && parent.$options.name === "QPopupProxy") {
        proxy.hide(evt);
        return parent;
      } else {
        return proxy;
      }
    }
    proxy = getParentProxy(proxy);
  } while (proxy !== void 0 && proxy !== null);
}
function closePortals(proxy, evt, depth) {
  while (depth !== 0 && proxy !== void 0 && proxy !== null) {
    if (proxy.__qPortal === true) {
      depth--;
      if (proxy.$options.name === "QMenu") {
        proxy = closePortalMenus(proxy, evt);
        continue;
      }
      proxy.hide(evt);
    }
    proxy = getParentProxy(proxy);
  }
}
function isOnGlobalDialog(vm) {
  vm = vm.parent;
  while (vm !== void 0 && vm !== null) {
    if (vm.type.name === "QGlobalDialog") {
      return true;
    }
    if (vm.type.name === "QDialog" || vm.type.name === "QMenu") {
      return false;
    }
    vm = vm.parent;
  }
  return false;
}
function usePortal(vm, innerRef, renderPortalContent, type) {
  const portalIsActive = ref(false);
  const portalIsAccessible = ref(false);
  let portalEl = null;
  const focusObj = {};
  const onGlobalDialog = type === "dialog" && isOnGlobalDialog(vm);
  function showPortal(isReady) {
    if (isReady === true) {
      removeFocusWaitFlag(focusObj);
      portalIsAccessible.value = true;
      return;
    }
    portalIsAccessible.value = false;
    if (portalIsActive.value === false) {
      if (onGlobalDialog === false && portalEl === null) {
        portalEl = createGlobalNode(false, type);
      }
      portalIsActive.value = true;
      portalProxyList.push(vm.proxy);
      addFocusWaitFlag(focusObj);
    }
  }
  function hidePortal(isReady) {
    portalIsAccessible.value = false;
    if (isReady !== true) {
      return;
    }
    removeFocusWaitFlag(focusObj);
    portalIsActive.value = false;
    const index = portalProxyList.indexOf(vm.proxy);
    if (index !== -1) {
      portalProxyList.splice(index, 1);
    }
    if (portalEl !== null) {
      removeGlobalNode(portalEl);
      portalEl = null;
    }
  }
  onUnmounted(() => {
    hidePortal(true);
  });
  vm.proxy.__qPortal = true;
  injectProp(vm.proxy, "contentEl", () => innerRef.value);
  return {
    showPortal,
    hidePortal,
    portalIsActive,
    portalIsAccessible,
    renderPortal: () => onGlobalDialog === true ? renderPortalContent() : portalIsActive.value === true ? [h(Teleport, { to: portalEl }, renderPortalContent())] : void 0
  };
}
const useTransitionProps = {
  transitionShow: {
    type: String,
    default: "fade"
  },
  transitionHide: {
    type: String,
    default: "fade"
  },
  transitionDuration: {
    type: [String, Number],
    default: 300
  }
};
function useTransition(props, defaultShowFn = () => {
}, defaultHideFn = () => {
}) {
  return {
    transitionProps: computed(() => {
      const show = `q-transition--${props.transitionShow || defaultShowFn()}`;
      const hide = `q-transition--${props.transitionHide || defaultHideFn()}`;
      return {
        appear: true,
        enterFromClass: `${show}-enter-from`,
        enterActiveClass: `${show}-enter-active`,
        enterToClass: `${show}-enter-to`,
        leaveFromClass: `${hide}-leave-from`,
        leaveActiveClass: `${hide}-leave-active`,
        leaveToClass: `${hide}-leave-to`
      };
    }),
    transitionStyle: computed(() => `--q-transition-duration: ${props.transitionDuration}ms`)
  };
}
const handlers$1 = [];
let escDown;
function onKeydown(evt) {
  escDown = evt.keyCode === 27;
}
function onBlur() {
  if (escDown === true) {
    escDown = false;
  }
}
function onKeyup(evt) {
  if (escDown === true) {
    escDown = false;
    if (isKeyCode(evt, 27) === true) {
      handlers$1[handlers$1.length - 1](evt);
    }
  }
}
function update(action) {
  window[action]("keydown", onKeydown);
  window[action]("blur", onBlur);
  window[action]("keyup", onKeyup);
  escDown = false;
}
function addEscapeKey(fn) {
  if (client.is.desktop === true) {
    handlers$1.push(fn);
    if (handlers$1.length === 1) {
      update("addEventListener");
    }
  }
}
function removeEscapeKey(fn) {
  const index = handlers$1.indexOf(fn);
  if (index > -1) {
    handlers$1.splice(index, 1);
    if (handlers$1.length === 0) {
      update("removeEventListener");
    }
  }
}
const handlers = [];
function trigger(e) {
  handlers[handlers.length - 1](e);
}
function addFocusout(fn) {
  if (client.is.desktop === true) {
    handlers.push(fn);
    if (handlers.length === 1) {
      document.body.addEventListener("focusin", trigger);
    }
  }
}
function removeFocusout(fn) {
  const index = handlers.indexOf(fn);
  if (index > -1) {
    handlers.splice(index, 1);
    if (handlers.length === 0) {
      document.body.removeEventListener("focusin", trigger);
    }
  }
}
function getDepth(value) {
  if (value === false) {
    return 0;
  }
  if (value === true || value === void 0) {
    return 1;
  }
  const depth = parseInt(value, 10);
  return isNaN(depth) ? 0 : depth;
}
var ClosePopup = createDirective(
  {
    name: "close-popup",
    beforeMount(el, { value }) {
      const ctx = {
        depth: getDepth(value),
        handler(evt) {
          ctx.depth !== 0 && setTimeout(() => {
            const proxy = getPortalProxy(el);
            if (proxy !== void 0) {
              closePortals(proxy, evt, ctx.depth);
            }
          });
        },
        handlerKey(evt) {
          isKeyCode(evt, 13) === true && ctx.handler(evt);
        }
      };
      el.__qclosepopup = ctx;
      el.addEventListener("click", ctx.handler);
      el.addEventListener("keyup", ctx.handlerKey);
    },
    updated(el, { value, oldValue }) {
      if (value !== oldValue) {
        el.__qclosepopup.depth = getDepth(value);
      }
    },
    beforeUnmount(el) {
      const ctx = el.__qclosepopup;
      el.removeEventListener("click", ctx.handler);
      el.removeEventListener("keyup", ctx.handlerKey);
      delete el.__qclosepopup;
    }
  }
);
export { ClosePopup as C, useTransitionProps as a, useModelToggleEmits as b, useTransition as c, useModelToggle as d, usePortal as e, addFocusout as f, removeEscapeKey as g, closePortalMenus as h, addEscapeKey as i, portalProxyList as p, removeFocusout as r, useModelToggleProps as u };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2xvc2VQb3B1cC43ODQyOTE2Yy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtbW9kZWwtdG9nZ2xlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvdXRpbHMvcHJpdmF0ZS9wb3J0YWwuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1wb3J0YWwuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS10cmFuc2l0aW9uLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvdXRpbHMvcHJpdmF0ZS9lc2NhcGUta2V5LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvdXRpbHMvcHJpdmF0ZS9mb2N1c291dC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2RpcmVjdGl2ZXMvQ2xvc2VQb3B1cC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB3YXRjaCwgbmV4dFRpY2ssIG9uTW91bnRlZCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyB2bUhhc1JvdXRlciB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvdm0uanMnXG5cbmV4cG9ydCBjb25zdCB1c2VNb2RlbFRvZ2dsZVByb3BzID0ge1xuICBtb2RlbFZhbHVlOiB7XG4gICAgdHlwZTogQm9vbGVhbixcbiAgICBkZWZhdWx0OiBudWxsXG4gIH0sXG5cbiAgJ29uVXBkYXRlOm1vZGVsVmFsdWUnOiBbIEZ1bmN0aW9uLCBBcnJheSBdXG59XG5cbmV4cG9ydCBjb25zdCB1c2VNb2RlbFRvZ2dsZUVtaXRzID0gW1xuICAnYmVmb3JlU2hvdycsICdzaG93JywgJ2JlZm9yZUhpZGUnLCAnaGlkZSdcbl1cblxuLy8gaGFuZGxlU2hvdy9oYW5kbGVIaWRlIC0+IHJlbW92ZVRpY2soKSwgc2VsZiAoJiBlbWl0IHNob3cpXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICh7XG4gIHNob3dpbmcsXG4gIGNhblNob3csIC8vIG9wdGlvbmFsXG4gIGhpZGVPblJvdXRlQ2hhbmdlLCAvLyBvcHRpb25hbFxuICBoYW5kbGVTaG93LCAvLyBvcHRpb25hbFxuICBoYW5kbGVIaWRlLCAvLyBvcHRpb25hbFxuICBwcm9jZXNzT25Nb3VudCAvLyBvcHRpb25hbFxufSkge1xuICBjb25zdCB2bSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gIGNvbnN0IHsgcHJvcHMsIGVtaXQsIHByb3h5IH0gPSB2bVxuXG4gIGxldCBwYXlsb2FkXG5cbiAgZnVuY3Rpb24gdG9nZ2xlIChldnQpIHtcbiAgICBpZiAoc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgaGlkZShldnQpXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgc2hvdyhldnQpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2hvdyAoZXZ0KSB7XG4gICAgaWYgKFxuICAgICAgcHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZVxuICAgICAgfHwgKGV2dCAhPT0gdm9pZCAwICYmIGV2dC5xQW5jaG9ySGFuZGxlZCA9PT0gdHJ1ZSlcbiAgICAgIHx8IChjYW5TaG93ICE9PSB2b2lkIDAgJiYgY2FuU2hvdyhldnQpICE9PSB0cnVlKVxuICAgICkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3QgbGlzdGVuZXIgPSBwcm9wc1sgJ29uVXBkYXRlOm1vZGVsVmFsdWUnIF0gIT09IHZvaWQgMFxuXG4gICAgaWYgKGxpc3RlbmVyID09PSB0cnVlICYmIF9fUVVBU0FSX1NTUl9TRVJWRVJfXyAhPT0gdHJ1ZSkge1xuICAgICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCB0cnVlKVxuICAgICAgcGF5bG9hZCA9IGV2dFxuICAgICAgbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICBpZiAocGF5bG9hZCA9PT0gZXZ0KSB7XG4gICAgICAgICAgcGF5bG9hZCA9IHZvaWQgMFxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICAgIGlmIChwcm9wcy5tb2RlbFZhbHVlID09PSBudWxsIHx8IGxpc3RlbmVyID09PSBmYWxzZSB8fCBfX1FVQVNBUl9TU1JfU0VSVkVSX18pIHtcbiAgICAgIHByb2Nlc3NTaG93KGV2dClcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBwcm9jZXNzU2hvdyAoZXZ0KSB7XG4gICAgaWYgKHNob3dpbmcudmFsdWUgPT09IHRydWUpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHNob3dpbmcudmFsdWUgPSB0cnVlXG5cbiAgICBlbWl0KCdiZWZvcmVTaG93JywgZXZ0KVxuXG4gICAgaWYgKGhhbmRsZVNob3cgIT09IHZvaWQgMCkge1xuICAgICAgaGFuZGxlU2hvdyhldnQpXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgZW1pdCgnc2hvdycsIGV2dClcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBoaWRlIChldnQpIHtcbiAgICBpZiAoX19RVUFTQVJfU1NSX1NFUlZFUl9fIHx8IHByb3BzLmRpc2FibGUgPT09IHRydWUpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0IGxpc3RlbmVyID0gcHJvcHNbICdvblVwZGF0ZTptb2RlbFZhbHVlJyBdICE9PSB2b2lkIDBcblxuICAgIGlmIChsaXN0ZW5lciA9PT0gdHJ1ZSAmJiBfX1FVQVNBUl9TU1JfU0VSVkVSX18gIT09IHRydWUpIHtcbiAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgZmFsc2UpXG4gICAgICBwYXlsb2FkID0gZXZ0XG4gICAgICBuZXh0VGljaygoKSA9PiB7XG4gICAgICAgIGlmIChwYXlsb2FkID09PSBldnQpIHtcbiAgICAgICAgICBwYXlsb2FkID0gdm9pZCAwXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgaWYgKHByb3BzLm1vZGVsVmFsdWUgPT09IG51bGwgfHwgbGlzdGVuZXIgPT09IGZhbHNlIHx8IF9fUVVBU0FSX1NTUl9TRVJWRVJfXykge1xuICAgICAgcHJvY2Vzc0hpZGUoZXZ0KVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHByb2Nlc3NIaWRlIChldnQpIHtcbiAgICBpZiAoc2hvd2luZy52YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHNob3dpbmcudmFsdWUgPSBmYWxzZVxuXG4gICAgZW1pdCgnYmVmb3JlSGlkZScsIGV2dClcblxuICAgIGlmIChoYW5kbGVIaWRlICE9PSB2b2lkIDApIHtcbiAgICAgIGhhbmRsZUhpZGUoZXZ0KVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGVtaXQoJ2hpZGUnLCBldnQpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcHJvY2Vzc01vZGVsQ2hhbmdlICh2YWwpIHtcbiAgICBpZiAocHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZSAmJiB2YWwgPT09IHRydWUpIHtcbiAgICAgIGlmIChwcm9wc1sgJ29uVXBkYXRlOm1vZGVsVmFsdWUnIF0gIT09IHZvaWQgMCkge1xuICAgICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIGZhbHNlKVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICgodmFsID09PSB0cnVlKSAhPT0gc2hvd2luZy52YWx1ZSkge1xuICAgICAgY29uc3QgZm4gPSB2YWwgPT09IHRydWUgPyBwcm9jZXNzU2hvdyA6IHByb2Nlc3NIaWRlXG4gICAgICBmbihwYXlsb2FkKVxuICAgIH1cbiAgfVxuXG4gIHdhdGNoKCgpID0+IHByb3BzLm1vZGVsVmFsdWUsIHByb2Nlc3NNb2RlbENoYW5nZSlcblxuICBpZiAoaGlkZU9uUm91dGVDaGFuZ2UgIT09IHZvaWQgMCAmJiB2bUhhc1JvdXRlcih2bSkgPT09IHRydWUpIHtcbiAgICB3YXRjaCgoKSA9PiBwcm94eS4kcm91dGUuZnVsbFBhdGgsICgpID0+IHtcbiAgICAgIGlmIChoaWRlT25Sb3V0ZUNoYW5nZS52YWx1ZSA9PT0gdHJ1ZSAmJiBzaG93aW5nLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIGhpZGUoKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBwcm9jZXNzT25Nb3VudCA9PT0gdHJ1ZSAmJiBvbk1vdW50ZWQoKCkgPT4ge1xuICAgIHByb2Nlc3NNb2RlbENoYW5nZShwcm9wcy5tb2RlbFZhbHVlKVxuICB9KVxuXG4gIC8vIGV4cG9zZSBwdWJsaWMgbWV0aG9kc1xuICBjb25zdCBwdWJsaWNNZXRob2RzID0geyBzaG93LCBoaWRlLCB0b2dnbGUgfVxuICBPYmplY3QuYXNzaWduKHByb3h5LCBwdWJsaWNNZXRob2RzKVxuXG4gIHJldHVybiBwdWJsaWNNZXRob2RzXG59XG4iLCJpbXBvcnQgeyBnZXRQYXJlbnRQcm94eSB9IGZyb20gJy4vdm0uanMnXG5cbmV4cG9ydCBjb25zdCBwb3J0YWxQcm94eUxpc3QgPSBbXVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UG9ydGFsUHJveHkgKGVsKSB7XG4gIHJldHVybiBwb3J0YWxQcm94eUxpc3QuZmluZChwcm94eSA9PlxuICAgIHByb3h5LmNvbnRlbnRFbCAhPT0gbnVsbFxuICAgICYmIHByb3h5LmNvbnRlbnRFbC5jb250YWlucyhlbClcbiAgKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xvc2VQb3J0YWxNZW51cyAocHJveHksIGV2dCkge1xuICBkbyB7XG4gICAgaWYgKHByb3h5LiRvcHRpb25zLm5hbWUgPT09ICdRTWVudScpIHtcbiAgICAgIHByb3h5LmhpZGUoZXZ0KVxuXG4gICAgICAvLyBpcyB0aGlzIGEgcG9pbnQgb2Ygc2VwYXJhdGlvbj9cbiAgICAgIGlmIChwcm94eS4kcHJvcHMuc2VwYXJhdGVDbG9zZVBvcHVwID09PSB0cnVlKSB7XG4gICAgICAgIHJldHVybiBnZXRQYXJlbnRQcm94eShwcm94eSlcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAocHJveHkuX19xUG9ydGFsID09PSB0cnVlKSB7XG4gICAgICAvLyB0cmVhdCBpdCBhcyBwb2ludCBvZiBzZXBhcmF0aW9uIGlmIHBhcmVudCBpcyBRUG9wdXBQcm94eVxuICAgICAgLy8gKHNvIG1vYmlsZSBtYXRjaGVzIGRlc2t0b3AgYmVoYXZpb3IpXG4gICAgICAvLyBhbmQgaGlkZSBpdCB0b29cbiAgICAgIGNvbnN0IHBhcmVudCA9IGdldFBhcmVudFByb3h5KHByb3h5KVxuXG4gICAgICBpZiAocGFyZW50ICE9PSB2b2lkIDAgJiYgcGFyZW50LiRvcHRpb25zLm5hbWUgPT09ICdRUG9wdXBQcm94eScpIHtcbiAgICAgICAgcHJveHkuaGlkZShldnQpXG4gICAgICAgIHJldHVybiBwYXJlbnRcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gcHJveHlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBwcm94eSA9IGdldFBhcmVudFByb3h5KHByb3h5KVxuICB9IHdoaWxlIChwcm94eSAhPT0gdm9pZCAwICYmIHByb3h5ICE9PSBudWxsKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xvc2VQb3J0YWxzIChwcm94eSwgZXZ0LCBkZXB0aCkge1xuICB3aGlsZSAoZGVwdGggIT09IDAgJiYgcHJveHkgIT09IHZvaWQgMCAmJiBwcm94eSAhPT0gbnVsbCkge1xuICAgIGlmIChwcm94eS5fX3FQb3J0YWwgPT09IHRydWUpIHtcbiAgICAgIGRlcHRoLS1cblxuICAgICAgaWYgKHByb3h5LiRvcHRpb25zLm5hbWUgPT09ICdRTWVudScpIHtcbiAgICAgICAgcHJveHkgPSBjbG9zZVBvcnRhbE1lbnVzKHByb3h5LCBldnQpXG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIHByb3h5LmhpZGUoZXZ0KVxuICAgIH1cblxuICAgIHByb3h5ID0gZ2V0UGFyZW50UHJveHkocHJveHkpXG4gIH1cbn1cbiIsImltcG9ydCB7IGgsIHJlZiwgb25Vbm1vdW50ZWQsIFRlbGVwb3J0IH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyBub29wIH0gZnJvbSAnLi4vLi4vdXRpbHMvZXZlbnQuanMnXG5pbXBvcnQgeyBhZGRGb2N1c1dhaXRGbGFnLCByZW1vdmVGb2N1c1dhaXRGbGFnIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9mb2N1cy1tYW5hZ2VyLmpzJ1xuaW1wb3J0IHsgY3JlYXRlR2xvYmFsTm9kZSwgcmVtb3ZlR2xvYmFsTm9kZSB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvZ2xvYmFsLW5vZGVzLmpzJ1xuaW1wb3J0IHsgcG9ydGFsUHJveHlMaXN0IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9wb3J0YWwuanMnXG5pbXBvcnQgeyBpbmplY3RQcm9wIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9pbmplY3Qtb2JqLXByb3AuanMnXG5cbmZ1bmN0aW9uIGlzT25HbG9iYWxEaWFsb2cgKHZtKSB7XG4gIHZtID0gdm0ucGFyZW50XG5cbiAgd2hpbGUgKHZtICE9PSB2b2lkIDAgJiYgdm0gIT09IG51bGwpIHtcbiAgICBpZiAodm0udHlwZS5uYW1lID09PSAnUUdsb2JhbERpYWxvZycpIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICAgIGlmICh2bS50eXBlLm5hbWUgPT09ICdRRGlhbG9nJyB8fCB2bS50eXBlLm5hbWUgPT09ICdRTWVudScpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIHZtID0gdm0ucGFyZW50XG4gIH1cblxuICByZXR1cm4gZmFsc2Vcbn1cblxuLy8gV2FybmluZyFcbi8vIFlvdSBNVVNUIHNwZWNpZnkgXCJpbmhlcml0QXR0cnM6IGZhbHNlXCIgaW4geW91ciBjb21wb25lbnRcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHZtLCBpbm5lclJlZiwgcmVuZGVyUG9ydGFsQ29udGVudCwgdHlwZSkge1xuICAvLyBzaG93aW5nLCBpbmNsdWRpbmcgd2hpbGUgaW4gc2hvdy9oaWRlIHRyYW5zaXRpb25cbiAgY29uc3QgcG9ydGFsSXNBY3RpdmUgPSByZWYoZmFsc2UpXG5cbiAgLy8gc2hvd2luZyAmIG5vdCBpbiBhbnkgc2hvdy9oaWRlIHRyYW5zaXRpb25cbiAgY29uc3QgcG9ydGFsSXNBY2Nlc3NpYmxlID0gcmVmKGZhbHNlKVxuXG4gIGlmIChfX1FVQVNBUl9TU1JfU0VSVkVSX18pIHtcbiAgICByZXR1cm4ge1xuICAgICAgcG9ydGFsSXNBY3RpdmUsXG4gICAgICBwb3J0YWxJc0FjY2Vzc2libGUsXG5cbiAgICAgIHNob3dQb3J0YWw6IG5vb3AsXG4gICAgICBoaWRlUG9ydGFsOiBub29wLFxuICAgICAgcmVuZGVyUG9ydGFsOiBub29wXG4gICAgfVxuICB9XG5cbiAgbGV0IHBvcnRhbEVsID0gbnVsbFxuICBjb25zdCBmb2N1c09iaiA9IHt9XG4gIGNvbnN0IG9uR2xvYmFsRGlhbG9nID0gdHlwZSA9PT0gJ2RpYWxvZycgJiYgaXNPbkdsb2JhbERpYWxvZyh2bSlcblxuICBmdW5jdGlvbiBzaG93UG9ydGFsIChpc1JlYWR5KSB7XG4gICAgaWYgKGlzUmVhZHkgPT09IHRydWUpIHtcbiAgICAgIHJlbW92ZUZvY3VzV2FpdEZsYWcoZm9jdXNPYmopXG4gICAgICBwb3J0YWxJc0FjY2Vzc2libGUudmFsdWUgPSB0cnVlXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBwb3J0YWxJc0FjY2Vzc2libGUudmFsdWUgPSBmYWxzZVxuXG4gICAgaWYgKHBvcnRhbElzQWN0aXZlLnZhbHVlID09PSBmYWxzZSkge1xuICAgICAgaWYgKG9uR2xvYmFsRGlhbG9nID09PSBmYWxzZSAmJiBwb3J0YWxFbCA9PT0gbnVsbCkge1xuICAgICAgICBwb3J0YWxFbCA9IGNyZWF0ZUdsb2JhbE5vZGUoZmFsc2UsIHR5cGUpXG4gICAgICB9XG5cbiAgICAgIHBvcnRhbElzQWN0aXZlLnZhbHVlID0gdHJ1ZVxuXG4gICAgICAvLyByZWdpc3RlciBwb3J0YWxcbiAgICAgIHBvcnRhbFByb3h5TGlzdC5wdXNoKHZtLnByb3h5KVxuXG4gICAgICBhZGRGb2N1c1dhaXRGbGFnKGZvY3VzT2JqKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGhpZGVQb3J0YWwgKGlzUmVhZHkpIHtcbiAgICBwb3J0YWxJc0FjY2Vzc2libGUudmFsdWUgPSBmYWxzZVxuXG4gICAgaWYgKGlzUmVhZHkgIT09IHRydWUpIHsgcmV0dXJuIH1cblxuICAgIHJlbW92ZUZvY3VzV2FpdEZsYWcoZm9jdXNPYmopXG4gICAgcG9ydGFsSXNBY3RpdmUudmFsdWUgPSBmYWxzZVxuXG4gICAgLy8gdW5yZWdpc3RlciBwb3J0YWxcbiAgICBjb25zdCBpbmRleCA9IHBvcnRhbFByb3h5TGlzdC5pbmRleE9mKHZtLnByb3h5KVxuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgIHBvcnRhbFByb3h5TGlzdC5zcGxpY2UoaW5kZXgsIDEpXG4gICAgfVxuXG4gICAgaWYgKHBvcnRhbEVsICE9PSBudWxsKSB7XG4gICAgICByZW1vdmVHbG9iYWxOb2RlKHBvcnRhbEVsKVxuICAgICAgcG9ydGFsRWwgPSBudWxsXG4gICAgfVxuICB9XG5cbiAgb25Vbm1vdW50ZWQoKCkgPT4geyBoaWRlUG9ydGFsKHRydWUpIH0pXG5cbiAgLy8gbmVlZGVkIGZvciBwb3J0YWwgdm0gZGV0ZWN0aW9uXG4gIHZtLnByb3h5Ll9fcVBvcnRhbCA9IHRydWVcblxuICAvLyBwdWJsaWMgd2F5IG9mIGFjY2Vzc2luZyB0aGUgcmVuZGVyZWQgY29udGVudFxuICBpbmplY3RQcm9wKHZtLnByb3h5LCAnY29udGVudEVsJywgKCkgPT4gaW5uZXJSZWYudmFsdWUpXG5cbiAgcmV0dXJuIHtcbiAgICBzaG93UG9ydGFsLFxuICAgIGhpZGVQb3J0YWwsXG5cbiAgICBwb3J0YWxJc0FjdGl2ZSxcbiAgICBwb3J0YWxJc0FjY2Vzc2libGUsXG5cbiAgICByZW5kZXJQb3J0YWw6ICgpID0+IChcbiAgICAgIG9uR2xvYmFsRGlhbG9nID09PSB0cnVlXG4gICAgICAgID8gcmVuZGVyUG9ydGFsQ29udGVudCgpXG4gICAgICAgIDogKFxuICAgICAgICAgICAgcG9ydGFsSXNBY3RpdmUudmFsdWUgPT09IHRydWVcbiAgICAgICAgICAgICAgPyBbIGgoVGVsZXBvcnQsIHsgdG86IHBvcnRhbEVsIH0sIHJlbmRlclBvcnRhbENvbnRlbnQoKSkgXVxuICAgICAgICAgICAgICA6IHZvaWQgMFxuICAgICAgICAgIClcbiAgICApXG4gIH1cbn1cbiIsImltcG9ydCB7IGNvbXB1dGVkIH0gZnJvbSAndnVlJ1xuXG5leHBvcnQgY29uc3QgdXNlVHJhbnNpdGlvblByb3BzID0ge1xuICB0cmFuc2l0aW9uU2hvdzoge1xuICAgIHR5cGU6IFN0cmluZyxcbiAgICBkZWZhdWx0OiAnZmFkZSdcbiAgfSxcblxuICB0cmFuc2l0aW9uSGlkZToge1xuICAgIHR5cGU6IFN0cmluZyxcbiAgICBkZWZhdWx0OiAnZmFkZSdcbiAgfSxcblxuICB0cmFuc2l0aW9uRHVyYXRpb246IHtcbiAgICB0eXBlOiBbIFN0cmluZywgTnVtYmVyIF0sXG4gICAgZGVmYXVsdDogMzAwXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCBkZWZhdWx0U2hvd0ZuID0gKCkgPT4ge30sIGRlZmF1bHRIaWRlRm4gPSAoKSA9PiB7fSkge1xuICByZXR1cm4ge1xuICAgIHRyYW5zaXRpb25Qcm9wczogY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3Qgc2hvdyA9IGBxLXRyYW5zaXRpb24tLSR7IHByb3BzLnRyYW5zaXRpb25TaG93IHx8IGRlZmF1bHRTaG93Rm4oKSB9YFxuICAgICAgY29uc3QgaGlkZSA9IGBxLXRyYW5zaXRpb24tLSR7IHByb3BzLnRyYW5zaXRpb25IaWRlIHx8IGRlZmF1bHRIaWRlRm4oKSB9YFxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBhcHBlYXI6IHRydWUsXG5cbiAgICAgICAgZW50ZXJGcm9tQ2xhc3M6IGAkeyBzaG93IH0tZW50ZXItZnJvbWAsXG4gICAgICAgIGVudGVyQWN0aXZlQ2xhc3M6IGAkeyBzaG93IH0tZW50ZXItYWN0aXZlYCxcbiAgICAgICAgZW50ZXJUb0NsYXNzOiBgJHsgc2hvdyB9LWVudGVyLXRvYCxcblxuICAgICAgICBsZWF2ZUZyb21DbGFzczogYCR7IGhpZGUgfS1sZWF2ZS1mcm9tYCxcbiAgICAgICAgbGVhdmVBY3RpdmVDbGFzczogYCR7IGhpZGUgfS1sZWF2ZS1hY3RpdmVgLFxuICAgICAgICBsZWF2ZVRvQ2xhc3M6IGAkeyBoaWRlIH0tbGVhdmUtdG9gXG4gICAgICB9XG4gICAgfSksXG5cbiAgICB0cmFuc2l0aW9uU3R5bGU6IGNvbXB1dGVkKCgpID0+IGAtLXEtdHJhbnNpdGlvbi1kdXJhdGlvbjogJHsgcHJvcHMudHJhbnNpdGlvbkR1cmF0aW9uIH1tc2ApXG4gIH1cbn1cbiIsImltcG9ydCB7IGNsaWVudCB9IGZyb20gJy4uLy4uL3BsdWdpbnMvUGxhdGZvcm0uanMnXG5pbXBvcnQgeyBpc0tleUNvZGUgfSBmcm9tICcuL2tleS1jb21wb3NpdGlvbi5qcydcblxuY29uc3QgaGFuZGxlcnMgPSBbXVxubGV0IGVzY0Rvd25cblxuZnVuY3Rpb24gb25LZXlkb3duIChldnQpIHtcbiAgZXNjRG93biA9IGV2dC5rZXlDb2RlID09PSAyN1xufVxuXG5mdW5jdGlvbiBvbkJsdXIgKCkge1xuICBpZiAoZXNjRG93biA9PT0gdHJ1ZSkge1xuICAgIGVzY0Rvd24gPSBmYWxzZVxuICB9XG59XG5cbmZ1bmN0aW9uIG9uS2V5dXAgKGV2dCkge1xuICBpZiAoZXNjRG93biA9PT0gdHJ1ZSkge1xuICAgIGVzY0Rvd24gPSBmYWxzZVxuXG4gICAgaWYgKGlzS2V5Q29kZShldnQsIDI3KSA9PT0gdHJ1ZSkge1xuICAgICAgaGFuZGxlcnNbIGhhbmRsZXJzLmxlbmd0aCAtIDEgXShldnQpXG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZSAoYWN0aW9uKSB7XG4gIHdpbmRvd1sgYWN0aW9uIF0oJ2tleWRvd24nLCBvbktleWRvd24pXG4gIHdpbmRvd1sgYWN0aW9uIF0oJ2JsdXInLCBvbkJsdXIpXG4gIHdpbmRvd1sgYWN0aW9uIF0oJ2tleXVwJywgb25LZXl1cClcbiAgZXNjRG93biA9IGZhbHNlXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRFc2NhcGVLZXkgKGZuKSB7XG4gIGlmIChjbGllbnQuaXMuZGVza3RvcCA9PT0gdHJ1ZSkge1xuICAgIGhhbmRsZXJzLnB1c2goZm4pXG5cbiAgICBpZiAoaGFuZGxlcnMubGVuZ3RoID09PSAxKSB7XG4gICAgICB1cGRhdGUoJ2FkZEV2ZW50TGlzdGVuZXInKVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlRXNjYXBlS2V5IChmbikge1xuICBjb25zdCBpbmRleCA9IGhhbmRsZXJzLmluZGV4T2YoZm4pXG4gIGlmIChpbmRleCA+IC0xKSB7XG4gICAgaGFuZGxlcnMuc3BsaWNlKGluZGV4LCAxKVxuXG4gICAgaWYgKGhhbmRsZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdXBkYXRlKCdyZW1vdmVFdmVudExpc3RlbmVyJylcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IGNsaWVudCB9IGZyb20gJy4uLy4uL3BsdWdpbnMvUGxhdGZvcm0uanMnXG5cbmNvbnN0IGhhbmRsZXJzID0gW11cblxuZnVuY3Rpb24gdHJpZ2dlciAoZSkge1xuICBoYW5kbGVyc1sgaGFuZGxlcnMubGVuZ3RoIC0gMSBdKGUpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRGb2N1c291dCAoZm4pIHtcbiAgaWYgKGNsaWVudC5pcy5kZXNrdG9wID09PSB0cnVlKSB7XG4gICAgaGFuZGxlcnMucHVzaChmbilcblxuICAgIGlmIChoYW5kbGVycy5sZW5ndGggPT09IDEpIHtcbiAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNpbicsIHRyaWdnZXIpXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVGb2N1c291dCAoZm4pIHtcbiAgY29uc3QgaW5kZXggPSBoYW5kbGVycy5pbmRleE9mKGZuKVxuICBpZiAoaW5kZXggPiAtMSkge1xuICAgIGhhbmRsZXJzLnNwbGljZShpbmRleCwgMSlcblxuICAgIGlmIChoYW5kbGVycy5sZW5ndGggPT09IDApIHtcbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcignZm9jdXNpbicsIHRyaWdnZXIpXG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBjcmVhdGVEaXJlY3RpdmUgfSBmcm9tICcuLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGNsb3NlUG9ydGFscywgZ2V0UG9ydGFsUHJveHkgfSBmcm9tICcuLi91dGlscy9wcml2YXRlL3BvcnRhbC5qcydcbmltcG9ydCB7IGlzS2V5Q29kZSB9IGZyb20gJy4uL3V0aWxzL3ByaXZhdGUva2V5LWNvbXBvc2l0aW9uLmpzJ1xuaW1wb3J0IGdldFNTUlByb3BzIGZyb20gJy4uL3V0aWxzL3ByaXZhdGUvbm9vcC1zc3ItZGlyZWN0aXZlLXRyYW5zZm9ybS5qcydcblxuLypcbiAqIGRlcHRoXG4gKiAgIDwgMCAgLS0+IGNsb3NlIGFsbCBjaGFpblxuICogICAwICAgIC0tPiBkaXNhYmxlZFxuICogICA+IDAgIC0tPiBjbG9zZSBjaGFpbiB1cCB0byBOIHBhcmVudFxuICovXG5cbmZ1bmN0aW9uIGdldERlcHRoICh2YWx1ZSkge1xuICBpZiAodmFsdWUgPT09IGZhbHNlKSB7XG4gICAgcmV0dXJuIDBcbiAgfVxuICBpZiAodmFsdWUgPT09IHRydWUgfHwgdmFsdWUgPT09IHZvaWQgMCkge1xuICAgIHJldHVybiAxXG4gIH1cblxuICBjb25zdCBkZXB0aCA9IHBhcnNlSW50KHZhbHVlLCAxMClcbiAgcmV0dXJuIGlzTmFOKGRlcHRoKSA/IDAgOiBkZXB0aFxufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVEaXJlY3RpdmUoX19RVUFTQVJfU1NSX1NFUlZFUl9fXG4gID8geyBuYW1lOiAnY2xvc2UtcG9wdXAnLCBnZXRTU1JQcm9wcyB9XG4gIDoge1xuICAgICAgbmFtZTogJ2Nsb3NlLXBvcHVwJyxcblxuICAgICAgYmVmb3JlTW91bnQgKGVsLCB7IHZhbHVlIH0pIHtcbiAgICAgICAgY29uc3QgY3R4ID0ge1xuICAgICAgICAgIGRlcHRoOiBnZXREZXB0aCh2YWx1ZSksXG5cbiAgICAgICAgICBoYW5kbGVyIChldnQpIHtcbiAgICAgICAgICAgIC8vIGFsbG93IEBjbGljayB0byBiZSBlbWl0dGVkXG4gICAgICAgICAgICBjdHguZGVwdGggIT09IDAgJiYgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHByb3h5ID0gZ2V0UG9ydGFsUHJveHkoZWwpXG4gICAgICAgICAgICAgIGlmIChwcm94eSAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgICAgY2xvc2VQb3J0YWxzKHByb3h5LCBldnQsIGN0eC5kZXB0aClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgaGFuZGxlcktleSAoZXZ0KSB7XG4gICAgICAgICAgICBpc0tleUNvZGUoZXZ0LCAxMykgPT09IHRydWUgJiYgY3R4LmhhbmRsZXIoZXZ0KVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGVsLl9fcWNsb3NlcG9wdXAgPSBjdHhcblxuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGN0eC5oYW5kbGVyKVxuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGN0eC5oYW5kbGVyS2V5KVxuICAgICAgfSxcblxuICAgICAgdXBkYXRlZCAoZWwsIHsgdmFsdWUsIG9sZFZhbHVlIH0pIHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSBvbGRWYWx1ZSkge1xuICAgICAgICAgIGVsLl9fcWNsb3NlcG9wdXAuZGVwdGggPSBnZXREZXB0aCh2YWx1ZSlcbiAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgYmVmb3JlVW5tb3VudCAoZWwpIHtcbiAgICAgICAgY29uc3QgY3R4ID0gZWwuX19xY2xvc2Vwb3B1cFxuICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGN0eC5oYW5kbGVyKVxuICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXl1cCcsIGN0eC5oYW5kbGVyS2V5KVxuICAgICAgICBkZWxldGUgZWwuX19xY2xvc2Vwb3B1cFxuICAgICAgfVxuICAgIH1cbilcbiJdLCJuYW1lcyI6WyJoYW5kbGVycyJdLCJtYXBwaW5ncyI6Ijs7QUFJWSxNQUFDLHNCQUFzQjtBQUFBLEVBQ2pDLFlBQVk7QUFBQSxJQUNWLE1BQU07QUFBQSxJQUNOLFNBQVM7QUFBQSxFQUNWO0FBQUEsRUFFRCx1QkFBdUIsQ0FBRSxVQUFVLEtBQU87QUFDNUM7QUFFWSxNQUFDLHNCQUFzQjtBQUFBLEVBQ2pDO0FBQUEsRUFBYztBQUFBLEVBQVE7QUFBQSxFQUFjO0FBQ3RDO0FBSWUsU0FBQSxlQUFVO0FBQUEsRUFDdkI7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNGLEdBQUc7QUFDRCxRQUFNLEtBQUssbUJBQW9CO0FBQy9CLFFBQU0sRUFBRSxPQUFPLE1BQU0sTUFBTyxJQUFHO0FBRS9CLE1BQUk7QUFFSixXQUFTLE9BQVEsS0FBSztBQUNwQixRQUFJLFFBQVEsVUFBVSxNQUFNO0FBQzFCLFdBQUssR0FBRztBQUFBLElBQ1QsT0FDSTtBQUNILFdBQUssR0FBRztBQUFBLElBQ1Q7QUFBQSxFQUNGO0FBRUQsV0FBUyxLQUFNLEtBQUs7QUFDbEIsUUFDRSxNQUFNLFlBQVksUUFDZCxRQUFRLFVBQVUsSUFBSSxtQkFBbUIsUUFDekMsWUFBWSxVQUFVLFFBQVEsR0FBRyxNQUFNLE1BQzNDO0FBQ0E7QUFBQSxJQUNEO0FBRUQsVUFBTSxXQUFXLE1BQU8sMkJBQTRCO0FBRXBELFFBQUksYUFBYSxRQUFRLE1BQWdDO0FBQ3ZELFdBQUsscUJBQXFCLElBQUk7QUFDOUIsZ0JBQVU7QUFDVixlQUFTLE1BQU07QUFDYixZQUFJLFlBQVksS0FBSztBQUNuQixvQkFBVTtBQUFBLFFB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
