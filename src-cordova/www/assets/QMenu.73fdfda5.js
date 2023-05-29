import { y as ref, bH as isKeyCode, bJ as prevent, as as nextTick, bK as addEvt, b0 as watch, az as onMounted, av as onBeforeUnmount, ah as getCurrentInstance, bL as cleanEvt, bM as listenOpts, bN as client, bO as getScrollbarWidth, bt as createComponent, a1 as computed, bP as position, bQ as getScrollTarget, ak as h, bF as hSlot, ba as Transition, bR as childHasFocus, bI as stopAndPrevent } from "./index.0ce84b9b.js";
import { c as clearSelection } from "./selection.0c91ca54.js";
import { p as portalProxyList, u as useModelToggleProps, a as useTransitionProps, b as useModelToggleEmits, c as useTransition, d as useModelToggle, e as usePortal, f as addFocusout, r as removeFocusout, g as removeEscapeKey, h as closePortalMenus, i as addEscapeKey } from "./ClosePopup.fcd43a0a.js";
import { u as useDarkProps, a as useDark } from "./use-dark.089fd8b8.js";
import { u as useTick, a as useTimeout } from "./use-timeout.0140a5e1.js";
import { a as addFocusFn } from "./focus-manager.d6507951.js";
const useAnchorProps = {
  target: {
    default: true
  },
  noParentEvent: Boolean,
  contextMenu: Boolean
};
function useAnchor({
  showing,
  avoidEmit,
  configureAnchorEl
}) {
  const { props, proxy, emit } = getCurrentInstance();
  const anchorEl = ref(null);
  let touchTimer = null;
  function canShow(evt) {
    return anchorEl.value === null ? false : evt === void 0 || evt.touches === void 0 || evt.touches.length <= 1;
  }
  const anchorEvents = {};
  if (configureAnchorEl === void 0) {
    Object.assign(anchorEvents, {
      hide(evt) {
        proxy.hide(evt);
      },
      toggle(evt) {
        proxy.toggle(evt);
        evt.qAnchorHandled = true;
      },
      toggleKey(evt) {
        isKeyCode(evt, 13) === true && anchorEvents.toggle(evt);
      },
      contextClick(evt) {
        proxy.hide(evt);
        prevent(evt);
        nextTick(() => {
          proxy.show(evt);
          evt.qAnchorHandled = true;
        });
      },
      prevent,
      mobileTouch(evt) {
        anchorEvents.mobileCleanup(evt);
        if (canShow(evt) !== true) {
          return;
        }
        proxy.hide(evt);
        anchorEl.value.classList.add("non-selectable");
        const target = evt.target;
        addEvt(anchorEvents, "anchor", [
          [target, "touchmove", "mobileCleanup", "passive"],
          [target, "touchend", "mobileCleanup", "passive"],
          [target, "touchcancel", "mobileCleanup", "passive"],
          [anchorEl.value, "contextmenu", "prevent", "notPassive"]
        ]);
        touchTimer = setTimeout(() => {
          touchTimer = null;
          proxy.show(evt);
          evt.qAnchorHandled = true;
        }, 300);
      },
      mobileCleanup(evt) {
        anchorEl.value.classList.remove("non-selectable");
        if (touchTimer !== null) {
          clearTimeout(touchTimer);
          touchTimer = null;
        }
        if (showing.value === true && evt !== void 0) {
          clearSelection();
        }
      }
    });
    configureAnchorEl = function(context = props.contextMenu) {
      if (props.noParentEvent === true || anchorEl.value === null) {
        return;
      }
      let evts;
      if (context === true) {
        if (proxy.$q.platform.is.mobile === true) {
          evts = [
            [anchorEl.value, "touchstart", "mobileTouch", "passive"]
          ];
        } else {
          evts = [
            [anchorEl.value, "mousedown", "hide", "passive"],
            [anchorEl.value, "contextmenu", "contextClick", "notPassive"]
          ];
        }
      } else {
        evts = [
          [anchorEl.value, "click", "toggle", "passive"],
          [anchorEl.value, "keyup", "toggleKey", "passive"]
        ];
      }
      addEvt(anchorEvents, "anchor", evts);
    };
  }
  function unconfigureAnchorEl() {
    cleanEvt(anchorEvents, "anchor");
  }
  function setAnchorEl(el) {
    anchorEl.value = el;
    while (anchorEl.value.classList.contains("q-anchor--skip")) {
      anchorEl.value = anchorEl.value.parentNode;
    }
    configureAnchorEl();
  }
  function pickAnchorEl() {
    if (props.target === false || props.target === "" || proxy.$el.parentNode === null) {
      anchorEl.value = null;
    } else if (props.target === true) {
      setAnchorEl(proxy.$el.parentNode);
    } else {
      let el = props.target;
      if (typeof props.target === "string") {
        try {
          el = document.querySelector(props.target);
        } catch (err) {
          el = void 0;
        }
      }
      if (el !== void 0 && el !== null) {
        anchorEl.value = el.$el || el;
        configureAnchorEl();
      } else {
        anchorEl.value = null;
        console.error(`Anchor: target "${props.target}" not found`);
      }
    }
  }
  watch(() => props.contextMenu, (val) => {
    if (anchorEl.value !== null) {
      unconfigureAnchorEl();
      configureAnchorEl(val);
    }
  });
  watch(() => props.target, () => {
    if (anchorEl.value !== null) {
      unconfigureAnchorEl();
    }
    pickAnchorEl();
  });
  watch(() => props.noParentEvent, (val) => {
    if (anchorEl.value !== null) {
      if (val === true) {
        unconfigureAnchorEl();
      } else {
        configureAnchorEl();
      }
    }
  });
  onMounted(() => {
    pickAnchorEl();
    if (avoidEmit !== true && props.modelValue === true && anchorEl.value === null) {
      emit("update:modelValue", false);
    }
  });
  onBeforeUnmount(() => {
    touchTimer !== null && clearTimeout(touchTimer);
    unconfigureAnchorEl();
  });
  return {
    anchorEl,
    canShow,
    anchorEvents
  };
}
function useScrollTarget(props, configureScrollTarget) {
  const localScrollTarget = ref(null);
  let scrollFn;
  function changeScrollEvent(scrollTarget, fn) {
    const fnProp = `${fn !== void 0 ? "add" : "remove"}EventListener`;
    const fnHandler = fn !== void 0 ? fn : scrollFn;
    if (scrollTarget !== window) {
      scrollTarget[fnProp]("scroll", fnHandler, listenOpts.passive);
    }
    window[fnProp]("scroll", fnHandler, listenOpts.passive);
    scrollFn = fn;
  }
  function unconfigureScrollTarget() {
    if (localScrollTarget.value !== null) {
      changeScrollEvent(localScrollTarget.value);
      localScrollTarget.value = null;
    }
  }
  const noParentEventWatcher = watch(() => props.noParentEvent, () => {
    if (localScrollTarget.value !== null) {
      unconfigureScrollTarget();
      configureScrollTarget();
    }
  });
  onBeforeUnmount(noParentEventWatcher);
  return {
    localScrollTarget,
    unconfigureScrollTarget,
    changeScrollEvent
  };
}
const { notPassiveCapture } = listenOpts, registeredList = [];
function globalHandler(evt) {
  const target = evt.target;
  if (target === void 0 || target.nodeType === 8 || target.classList.contains("no-pointer-events") === true) {
    return;
  }
  let portalIndex = portalProxyList.length - 1;
  while (portalIndex >= 0) {
    const proxy = portalProxyList[portalIndex].$;
    if (proxy.type.name !== "QDialog") {
      break;
    }
    if (proxy.props.seamless !== true) {
      return;
    }
    portalIndex--;
  }
  for (let i = registeredList.length - 1; i >= 0; i--) {
    const state = registeredList[i];
    if ((state.anchorEl.value === null || state.anchorEl.value.contains(target) === false) && (target === document.body || state.innerRef.value !== null && state.innerRef.value.contains(target) === false)) {
      evt.qClickOutside = true;
      state.onClickOutside(evt);
    } else {
      return;
    }
  }
}
function addClickOutside(clickOutsideProps) {
  registeredList.push(clickOutsideProps);
  if (registeredList.length === 1) {
    document.addEventListener("mousedown", globalHandler, notPassiveCapture);
    document.addEventListener("touchstart", globalHandler, notPassiveCapture);
  }
}
function removeClickOutside(clickOutsideProps) {
  const index = registeredList.findIndex((h2) => h2 === clickOutsideProps);
  if (index > -1) {
    registeredList.splice(index, 1);
    if (registeredList.length === 0) {
      document.removeEventListener("mousedown", globalHandler, notPassiveCapture);
      document.removeEventListener("touchstart", globalHandler, notPassiveCapture);
    }
  }
}
let vpLeft, vpTop;
function validatePosition(pos) {
  const parts = pos.split(" ");
  if (parts.length !== 2) {
    return false;
  }
  if (["top", "center", "bottom"].includes(parts[0]) !== true) {
    console.error("Anchor/Self position must start with one of top/center/bottom");
    return false;
  }
  if (["left", "middle", "right", "start", "end"].includes(parts[1]) !== true) {
    console.error("Anchor/Self position must end with one of left/middle/right/start/end");
    return false;
  }
  return true;
}
function validateOffset(val) {
  if (!val) {
    return true;
  }
  if (val.length !== 2) {
    return false;
  }
  if (typeof val[0] !== "number" || typeof val[1] !== "number") {
    return false;
  }
  return true;
}
const horizontalPos = {
  "start#ltr": "left",
  "start#rtl": "right",
  "end#ltr": "right",
  "end#rtl": "left"
};
["left", "middle", "right"].forEach((pos) => {
  horizontalPos[`${pos}#ltr`] = pos;
  horizontalPos[`${pos}#rtl`] = pos;
});
function parsePosition(pos, rtl) {
  const parts = pos.split(" ");
  return {
    vertical: parts[0],
    horizontal: horizontalPos[`${parts[1]}#${rtl === true ? "rtl" : "ltr"}`]
  };
}
function getAnchorProps(el, offset) {
  let { top, left, right, bottom, width, height } = el.getBoundingClientRect();
  if (offset !== void 0) {
    top -= offset[1];
    left -= offset[0];
    bottom += offset[1];
    right += offset[0];
    width += offset[0];
    height += offset[1];
  }
  return {
    top,
    bottom,
    height,
    left,
    right,
    width,
    middle: left + (right - left) / 2,
    center: top + (bottom - top) / 2
  };
}
function getAbsoluteAnchorProps(el, absoluteOffset, offset) {
  let { top, left } = el.getBoundingClientRect();
  top += absoluteOffset.top;
  left += absoluteOffset.left;
  if (offset !== void 0) {
    top += offset[1];
    left += offset[0];
  }
  return {
    top,
    bottom: top + 1,
    height: 1,
    left,
    right: left + 1,
    width: 1,
    middle: left,
    center: top
  };
}
function getTargetProps(el) {
  return {
    top: 0,
    center: el.offsetHeight / 2,
    bottom: el.offsetHeight,
    left: 0,
    middle: el.offsetWidth / 2,
    right: el.offsetWidth
  };
}
function getTopLeftProps(anchorProps, targetProps, cfg) {
  return {
    top: anchorProps[cfg.anchorOrigin.vertical] - targetProps[cfg.selfOrigin.vertical],
    left: anchorProps[cfg.anchorOrigin.horizontal] - targetProps[cfg.selfOrigin.horizontal]
  };
}
function setPosition(cfg) {
  if (client.is.ios === true && window.visualViewport !== void 0) {
    const el = document.body.style;
    const { offsetLeft: left, offsetTop: top } = window.visualViewport;
    if (left !== vpLeft) {
      el.setProperty("--q-pe-left", left + "px");
      vpLeft = left;
    }
    if (top !== vpTop) {
      el.setProperty("--q-pe-top", top + "px");
      vpTop = top;
    }
  }
  const { scrollLeft, scrollTop } = cfg.el;
  const anchorProps = cfg.absoluteOffset === void 0 ? getAnchorProps(cfg.anchorEl, cfg.cover === true ? [0, 0] : cfg.offset) : getAbsoluteAnchorProps(cfg.anchorEl, cfg.absoluteOffset, cfg.offset);
  let elStyle = {
    maxHeight: cfg.maxHeight,
    maxWidth: cfg.maxWidth,
    visibility: "visible"
  };
  if (cfg.fit === true || cfg.cover === true) {
    elStyle.minWidth = anchorProps.width + "px";
    if (cfg.cover === true) {
      elStyle.minHeight = anchorProps.height + "px";
    }
  }
  Object.assign(cfg.el.style, elStyle);
  const targetProps = getTargetProps(cfg.el);
  let props = getTopLeftProps(anchorProps, targetProps, cfg);
  if (cfg.absoluteOffset === void 0 || cfg.offset === void 0) {
    applyBoundaries(props, anchorProps, targetProps, cfg.anchorOrigin, cfg.selfOrigin);
  } else {
    const { top, left } = props;
    applyBoundaries(props, anchorProps, targetProps, cfg.anchorOrigin, cfg.selfOrigin);
    let hasChanged = false;
    if (props.top !== top) {
      hasChanged = true;
      const offsetY = 2 * cfg.offset[1];
      anchorProps.center = anchorProps.top -= offsetY;
      anchorProps.bottom -= offsetY + 2;
    }
    if (props.left !== left) {
      hasChanged = true;
      const offsetX = 2 * cfg.offset[0];
      anchorProps.middle = anchorProps.left -= offsetX;
      anchorProps.right -= offsetX + 2;
    }
    if (hasChanged === true) {
      props = getTopLeftProps(anchorProps, targetProps, cfg);
      applyBoundaries(props, anchorProps, targetProps, cfg.anchorOrigin, cfg.selfOrigin);
    }
  }
  elStyle = {
    top: props.top + "px",
    left: props.left + "px"
  };
  if (props.maxHeight !== void 0) {
    elStyle.maxHeight = props.maxHeight + "px";
    if (anchorProps.height > props.maxHeight) {
      elStyle.minHeight = elStyle.maxHeight;
    }
  }
  if (props.maxWidth !== void 0) {
    elStyle.maxWidth = props.maxWidth + "px";
    if (anchorProps.width > props.maxWidth) {
      elStyle.minWidth = elStyle.maxWidth;
    }
  }
  Object.assign(cfg.el.style, elStyle);
  if (cfg.el.scrollTop !== scrollTop) {
    cfg.el.scrollTop = scrollTop;
  }
  if (cfg.el.scrollLeft !== scrollLeft) {
    cfg.el.scrollLeft = scrollLeft;
  }
}
function applyBoundaries(props, anchorProps, targetProps, anchorOrigin, selfOrigin) {
  const currentHeight = targetProps.bottom, currentWidth = targetProps.right, margin = getScrollbarWidth(), innerHeight = window.innerHeight - margin, innerWidth = document.body.clientWidth;
  if (props.top < 0 || props.top + currentHeight > innerHeight) {
    if (selfOrigin.vertical === "center") {
      props.top = anchorProps[anchorOrigin.vertical] > innerHeight / 2 ? Math.max(0, innerHeight - currentHeight) : 0;
      props.maxHeight = Math.min(currentHeight, innerHeight);
    } else if (anchorProps[anchorOrigin.vertical] > innerHeight / 2) {
      const anchorY = Math.min(
        innerHeight,
        anchorOrigin.vertical === "center" ? anchorProps.center : anchorOrigin.vertical === selfOrigin.vertical ? anchorProps.bottom : anchorProps.top
      );
      props.maxHeight = Math.min(currentHeight, anchorY);
      props.top = Math.max(0, anchorY - currentHeight);
    } else {
      props.top = Math.max(
        0,
        anchorOrigin.vertical === "center" ? anchorProps.center : anchorOrigin.vertical === selfOrigin.vertical ? anchorProps.top : anchorProps.bottom
      );
      props.maxHeight = Math.min(currentHeight, innerHeight - props.top);
    }
  }
  if (props.left < 0 || props.left + currentWidth > innerWidth) {
    props.maxWidth = Math.min(currentWidth, innerWidth);
    if (selfOrigin.horizontal === "middle") {
      props.left = anchorProps[anchorOrigin.horizontal] > innerWidth / 2 ? Math.max(0, innerWidth - currentWidth) : 0;
    } else if (anchorProps[anchorOrigin.horizontal] > innerWidth / 2) {
      const anchorX = Math.min(
        innerWidth,
        anchorOrigin.horizontal === "middle" ? anchorProps.middle : anchorOrigin.horizontal === selfOrigin.horizontal ? anchorProps.right : anchorProps.left
      );
      props.maxWidth = Math.min(currentWidth, anchorX);
      props.left = Math.max(0, anchorX - props.maxWidth);
    } else {
      props.left = Math.max(
        0,
        anchorOrigin.horizontal === "middle" ? anchorProps.middle : anchorOrigin.horizontal === selfOrigin.horizontal ? anchorProps.left : anchorProps.right
      );
      props.maxWidth = Math.min(currentWidth, innerWidth - props.left);
    }
  }
}
var QMenu = createComponent({
  name: "QMenu",
  inheritAttrs: false,
  props: {
    ...useAnchorProps,
    ...useModelToggleProps,
    ...useDarkProps,
    ...useTransitionProps,
    persistent: Boolean,
    autoClose: Boolean,
    separateClosePopup: Boolean,
    noRouteDismiss: Boolean,
    noRefocus: Boolean,
    noFocus: Boolean,
    fit: Boolean,
    cover: Boolean,
    square: Boolean,
    anchor: {
      type: String,
      validator: validatePosition
    },
    self: {
      type: String,
      validator: validatePosition
    },
    offset: {
      type: Array,
      validator: validateOffset
    },
    scrollTarget: {
      default: void 0
    },
    touchPosition: Boolean,
    maxHeight: {
      type: String,
      default: null
    },
    maxWidth: {
      type: String,
      default: null
    }
  },
  emits: [
    ...useModelToggleEmits,
    "click",
    "escapeKey"
  ],
  setup(props, { slots, emit, attrs }) {
    let refocusTarget = null, absoluteOffset, unwatchPosition, avoidAutoClose;
    const vm = getCurrentInstance();
    const { proxy } = vm;
    const { $q } = proxy;
    const innerRef = ref(null);
    const showing = ref(false);
    const hideOnRouteChange = computed(
      () => props.persistent !== true && props.noRouteDismiss !== true
    );
    const isDark = useDark(props, $q);
    const { registerTick, removeTick } = useTick();
    const { registerTimeout } = useTimeout();
    const { transitionProps, transitionStyle } = useTransition(props);
    const { localScrollTarget, changeScrollEvent, unconfigureScrollTarget } = useScrollTarget(props, configureScrollTarget);
    const { anchorEl, canShow } = useAnchor({ showing });
    const { hide } = useModelToggle({
      showing,
      canShow,
      handleShow,
      handleHide,
      hideOnRouteChange,
      processOnMount: true
    });
    const { showPortal, hidePortal, renderPortal } = usePortal(vm, innerRef, renderPortalContent, "menu");
    const clickOutsideProps = {
      anchorEl,
      innerRef,
      onClickOutside(e) {
        if (props.persistent !== true && showing.value === true) {
          hide(e);
          if (e.type === "touchstart" || e.target.classList.contains("q-dialog__backdrop")) {
            stopAndPrevent(e);
          }
          return true;
        }
      }
    };
    const anchorOrigin = computed(
      () => parsePosition(
        props.anchor || (props.cover === true ? "center middle" : "bottom start"),
        $q.lang.rtl
      )
    );
    const selfOrigin = computed(() => props.cover === true ? anchorOrigin.value : parsePosition(props.self || "top start", $q.lang.rtl));
    const menuClass = computed(
      () => (props.square === true ? " q-menu--square" : "") + (isDark.value === true ? " q-menu--dark q-dark" : "")
    );
    const onEvents = computed(() => props.autoClose === true ? { onClick: onAutoClose } : {});
    const handlesFocus = computed(
      () => showing.value === true && props.persistent !== true
    );
    watch(handlesFocus, (val) => {
      if (val === true) {
        addEscapeKey(onEscapeKey);
        addClickOutside(clickOutsideProps);
      } else {
        removeEscapeKey(onEscapeKey);
        removeClickOutside(clickOutsideProps);
      }
    });
    function focus() {
      addFocusFn(() => {
        let node = innerRef.value;
        if (node && node.contains(document.activeElement) !== true) {
          node = node.querySelector("[autofocus][tabindex], [data-autofocus][tabindex]") || node.querySelector("[autofocus] [tabindex], [data-autofocus] [tabindex]") || node.querySelector("[autofocus], [data-autofocus]") || node;
          node.focus({ preventScroll: true });
        }
      });
    }
    function handleShow(evt) {
      refocusTarget = props.noRefocus === false ? document.activeElement : null;
      addFocusout(onFocusout);
      showPortal();
      configureScrollTarget();
      absoluteOffset = void 0;
      if (evt !== void 0 && (props.touchPosition || props.contextMenu)) {
        const pos = position(evt);
        if (pos.left !== void 0) {
          const { top, left } = anchorEl.value.getBoundingClientRect();
          absoluteOffset = { left: pos.left - left, top: pos.top - top };
        }
      }
      if (unwatchPosition === void 0) {
        unwatchPosition = watch(
          () => $q.screen.width + "|" + $q.screen.height + "|" + props.self + "|" + props.anchor + "|" + $q.lang.rtl,
          updatePosition
        );
      }
      if (props.noFocus !== true) {
        document.activeElement.blur();
      }
      registerTick(() => {
        updatePosition();
        props.noFocus !== true && focus();
      });
      registerTimeout(() => {
        if ($q.platform.is.ios === true) {
          avoidAutoClose = props.autoClose;
          innerRef.value.click();
        }
        updatePosition();
        showPortal(true);
        emit("show", evt);
      }, props.transitionDuration);
    }
    function handleHide(evt) {
      removeTick();
      hidePortal();
      anchorCleanup(true);
      if (refocusTarget !== null && (evt === void 0 || evt.qClickOutside !== true)) {
        ((evt && evt.type.indexOf("key") === 0 ? refocusTarget.closest('[tabindex]:not([tabindex^="-"])') : void 0) || refocusTarget).focus();
        refocusTarget = null;
      }
      registerTimeout(() => {
        hidePortal(true);
        emit("hide", evt);
      }, props.transitionDuration);
    }
    function anchorCleanup(hiding) {
      absoluteOffset = void 0;
      if (unwatchPosition !== void 0) {
        unwatchPosition();
        unwatchPosition = void 0;
      }
      if (hiding === true || showing.value === true) {
        removeFocusout(onFocusout);
        unconfigureScrollTarget();
        removeClickOutside(clickOutsideProps);
        removeEscapeKey(onEscapeKey);
      }
      if (hiding !== true) {
        refocusTarget = null;
      }
    }
    function configureScrollTarget() {
      if (anchorEl.value !== null || props.scrollTarget !== void 0) {
        localScrollTarget.value = getScrollTarget(anchorEl.value, props.scrollTarget);
        changeScrollEvent(localScrollTarget.value, updatePosition);
      }
    }
    function onAutoClose(e) {
      if (avoidAutoClose !== true) {
        closePortalMenus(proxy, e);
        emit("click", e);
      } else {
        avoidAutoClose = false;
      }
    }
    function onFocusout(evt) {
      if (handlesFocus.value === true && props.noFocus !== true && childHasFocus(innerRef.value, evt.target) !== true) {
        focus();
      }
    }
    function onEscapeKey(evt) {
      emit("escapeKey");
      hide(evt);
    }
    function updatePosition() {
      const el = innerRef.value;
      if (el === null || anchorEl.value === null) {
        return;
      }
      setPosition({
        el,
        offset: props.offset,
        anchorEl: anchorEl.value,
        anchorOrigin: anchorOrigin.value,
        selfOrigin: selfOrigin.value,
        absoluteOffset,
        fit: props.fit,
        cover: props.cover,
        maxHeight: props.maxHeight,
        maxWidth: props.maxWidth
      });
    }
    function renderPortalContent() {
      return h(
        Transition,
        transitionProps.value,
        () => showing.value === true ? h("div", {
          role: "menu",
          ...attrs,
          ref: innerRef,
          tabindex: -1,
          class: [
            "q-menu q-position-engine scroll" + menuClass.value,
            attrs.class
          ],
          style: [
            attrs.style,
            transitionStyle.value
          ],
          ...onEvents.value
        }, hSlot(slots.default)) : null
      );
    }
    onBeforeUnmount(anchorCleanup);
    Object.assign(proxy, { focus, updatePosition });
    return renderPortal;
  }
});
export { QMenu as Q, useAnchor as a, useAnchorProps as u };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUU1lbnUuNzNmZGZkYTUuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWFuY2hvci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLXNjcm9sbC10YXJnZXQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy91dGlscy9wcml2YXRlL2NsaWNrLW91dHNpZGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy91dGlscy9wcml2YXRlL3Bvc2l0aW9uLWVuZ2luZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvbWVudS9RTWVudS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByZWYsIHdhdGNoLCBvbk1vdW50ZWQsIG9uQmVmb3JlVW5tb3VudCwgbmV4dFRpY2ssIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgY2xlYXJTZWxlY3Rpb24gfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3NlbGVjdGlvbi5qcydcbmltcG9ydCB7IGFkZEV2dCwgY2xlYW5FdnQsIHByZXZlbnQgfSBmcm9tICcuLi8uLi91dGlscy9ldmVudC5qcydcbmltcG9ydCB7IGlzS2V5Q29kZSB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUva2V5LWNvbXBvc2l0aW9uLmpzJ1xuXG5leHBvcnQgY29uc3QgdXNlQW5jaG9yUHJvcHMgPSB7XG4gIHRhcmdldDoge1xuICAgIGRlZmF1bHQ6IHRydWVcbiAgfSxcbiAgbm9QYXJlbnRFdmVudDogQm9vbGVhbixcbiAgY29udGV4dE1lbnU6IEJvb2xlYW5cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHtcbiAgc2hvd2luZyxcbiAgYXZvaWRFbWl0LCAvLyByZXF1aXJlZCBmb3IgUVBvcHVwUHJveHkgKHRydWUpXG4gIGNvbmZpZ3VyZUFuY2hvckVsIC8vIG9wdGlvbmFsXG59KSB7XG4gIGNvbnN0IHsgcHJvcHMsIHByb3h5LCBlbWl0IH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuXG4gIGNvbnN0IGFuY2hvckVsID0gcmVmKG51bGwpXG5cbiAgbGV0IHRvdWNoVGltZXIgPSBudWxsXG5cbiAgZnVuY3Rpb24gY2FuU2hvdyAoZXZ0KSB7XG4gICAgLy8gYWJvcnQgd2l0aCBubyBwYXJlbnQgY29uZmlndXJlZCBvciBvbiBtdWx0aS10b3VjaFxuICAgIHJldHVybiBhbmNob3JFbC52YWx1ZSA9PT0gbnVsbFxuICAgICAgPyBmYWxzZVxuICAgICAgOiAoZXZ0ID09PSB2b2lkIDAgfHwgZXZ0LnRvdWNoZXMgPT09IHZvaWQgMCB8fCBldnQudG91Y2hlcy5sZW5ndGggPD0gMSlcbiAgfVxuXG4gIGNvbnN0IGFuY2hvckV2ZW50cyA9IHt9XG5cbiAgaWYgKGNvbmZpZ3VyZUFuY2hvckVsID09PSB2b2lkIDApIHtcbiAgICAvLyBkZWZhdWx0IGNvbmZpZ3VyZUFuY2hvckVsIGlzIGRlc2lnbmVkIGZvclxuICAgIC8vIFFNZW51ICYgUVBvcHVwUHJveHkgKHdoaWNoIGlzIHdoeSBpdCdzIGhhbmRsZWQgaGVyZSlcblxuICAgIE9iamVjdC5hc3NpZ24oYW5jaG9yRXZlbnRzLCB7XG4gICAgICBoaWRlIChldnQpIHtcbiAgICAgICAgcHJveHkuaGlkZShldnQpXG4gICAgICB9LFxuXG4gICAgICB0b2dnbGUgKGV2dCkge1xuICAgICAgICBwcm94eS50b2dnbGUoZXZ0KVxuICAgICAgICBldnQucUFuY2hvckhhbmRsZWQgPSB0cnVlXG4gICAgICB9LFxuXG4gICAgICB0b2dnbGVLZXkgKGV2dCkge1xuICAgICAgICBpc0tleUNvZGUoZXZ0LCAxMykgPT09IHRydWUgJiYgYW5jaG9yRXZlbnRzLnRvZ2dsZShldnQpXG4gICAgICB9LFxuXG4gICAgICBjb250ZXh0Q2xpY2sgKGV2dCkge1xuICAgICAgICBwcm94eS5oaWRlKGV2dClcbiAgICAgICAgcHJldmVudChldnQpXG4gICAgICAgIG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgICBwcm94eS5zaG93KGV2dClcbiAgICAgICAgICBldnQucUFuY2hvckhhbmRsZWQgPSB0cnVlXG4gICAgICAgIH0pXG4gICAgICB9LFxuXG4gICAgICBwcmV2ZW50LFxuXG4gICAgICBtb2JpbGVUb3VjaCAoZXZ0KSB7XG4gICAgICAgIGFuY2hvckV2ZW50cy5tb2JpbGVDbGVhbnVwKGV2dClcblxuICAgICAgICBpZiAoY2FuU2hvdyhldnQpICE9PSB0cnVlKSB7XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBwcm94eS5oaWRlKGV2dClcbiAgICAgICAgYW5jaG9yRWwudmFsdWUuY2xhc3NMaXN0LmFkZCgnbm9uLXNlbGVjdGFibGUnKVxuXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGV2dC50YXJnZXRcbiAgICAgICAgYWRkRXZ0KGFuY2hvckV2ZW50cywgJ2FuY2hvcicsIFtcbiAgICAgICAgICBbIHRhcmdldCwgJ3RvdWNobW92ZScsICdtb2JpbGVDbGVhbnVwJywgJ3Bhc3NpdmUnIF0sXG4gICAgICAgICAgWyB0YXJnZXQsICd0b3VjaGVuZCcsICdtb2JpbGVDbGVhbnVwJywgJ3Bhc3NpdmUnIF0sXG4gICAgICAgICAgWyB0YXJnZXQsICd0b3VjaGNhbmNlbCcsICdtb2JpbGVDbGVhbnVwJywgJ3Bhc3NpdmUnIF0sXG4gICAgICAgICAgWyBhbmNob3JFbC52YWx1ZSwgJ2NvbnRleHRtZW51JywgJ3ByZXZlbnQnLCAnbm90UGFzc2l2ZScgXVxuICAgICAgICBdKVxuXG4gICAgICAgIHRvdWNoVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0b3VjaFRpbWVyID0gbnVsbFxuICAgICAgICAgIHByb3h5LnNob3coZXZ0KVxuICAgICAgICAgIGV2dC5xQW5jaG9ySGFuZGxlZCA9IHRydWVcbiAgICAgICAgfSwgMzAwKVxuICAgICAgfSxcblxuICAgICAgbW9iaWxlQ2xlYW51cCAoZXZ0KSB7XG4gICAgICAgIGFuY2hvckVsLnZhbHVlLmNsYXNzTGlzdC5yZW1vdmUoJ25vbi1zZWxlY3RhYmxlJylcblxuICAgICAgICBpZiAodG91Y2hUaW1lciAhPT0gbnVsbCkge1xuICAgICAgICAgIGNsZWFyVGltZW91dCh0b3VjaFRpbWVyKVxuICAgICAgICAgIHRvdWNoVGltZXIgPSBudWxsXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSAmJiBldnQgIT09IHZvaWQgMCkge1xuICAgICAgICAgIGNsZWFyU2VsZWN0aW9uKClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBjb25maWd1cmVBbmNob3JFbCA9IGZ1bmN0aW9uIChjb250ZXh0ID0gcHJvcHMuY29udGV4dE1lbnUpIHtcbiAgICAgIGlmIChwcm9wcy5ub1BhcmVudEV2ZW50ID09PSB0cnVlIHx8IGFuY2hvckVsLnZhbHVlID09PSBudWxsKSB7IHJldHVybiB9XG5cbiAgICAgIGxldCBldnRzXG5cbiAgICAgIGlmIChjb250ZXh0ID09PSB0cnVlKSB7XG4gICAgICAgIGlmIChwcm94eS4kcS5wbGF0Zm9ybS5pcy5tb2JpbGUgPT09IHRydWUpIHtcbiAgICAgICAgICBldnRzID0gW1xuICAgICAgICAgICAgWyBhbmNob3JFbC52YWx1ZSwgJ3RvdWNoc3RhcnQnLCAnbW9iaWxlVG91Y2gnLCAncGFzc2l2ZScgXVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBldnRzID0gW1xuICAgICAgICAgICAgWyBhbmNob3JFbC52YWx1ZSwgJ21vdXNlZG93bicsICdoaWRlJywgJ3Bhc3NpdmUnIF0sXG4gICAgICAgICAgICBbIGFuY2hvckVsLnZhbHVlLCAnY29udGV4dG1lbnUnLCAnY29udGV4dENsaWNrJywgJ25vdFBhc3NpdmUnIF1cbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBldnRzID0gW1xuICAgICAgICAgIFsgYW5jaG9yRWwudmFsdWUsICdjbGljaycsICd0b2dnbGUnLCAncGFzc2l2ZScgXSxcbiAgICAgICAgICBbIGFuY2hvckVsLnZhbHVlLCAna2V5dXAnLCAndG9nZ2xlS2V5JywgJ3Bhc3NpdmUnIF1cbiAgICAgICAgXVxuICAgICAgfVxuXG4gICAgICBhZGRFdnQoYW5jaG9yRXZlbnRzLCAnYW5jaG9yJywgZXZ0cylcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB1bmNvbmZpZ3VyZUFuY2hvckVsICgpIHtcbiAgICBjbGVhbkV2dChhbmNob3JFdmVudHMsICdhbmNob3InKVxuICB9XG5cbiAgZnVuY3Rpb24gc2V0QW5jaG9yRWwgKGVsKSB7XG4gICAgYW5jaG9yRWwudmFsdWUgPSBlbFxuICAgIHdoaWxlIChhbmNob3JFbC52YWx1ZS5jbGFzc0xpc3QuY29udGFpbnMoJ3EtYW5jaG9yLS1za2lwJykpIHtcbiAgICAgIGFuY2hvckVsLnZhbHVlID0gYW5jaG9yRWwudmFsdWUucGFyZW50Tm9kZVxuICAgIH1cbiAgICBjb25maWd1cmVBbmNob3JFbCgpXG4gIH1cblxuICBmdW5jdGlvbiBwaWNrQW5jaG9yRWwgKCkge1xuICAgIGlmIChwcm9wcy50YXJnZXQgPT09IGZhbHNlIHx8IHByb3BzLnRhcmdldCA9PT0gJycgfHwgcHJveHkuJGVsLnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICAgIGFuY2hvckVsLnZhbHVlID0gbnVsbFxuICAgIH1cbiAgICBlbHNlIGlmIChwcm9wcy50YXJnZXQgPT09IHRydWUpIHtcbiAgICAgIHNldEFuY2hvckVsKHByb3h5LiRlbC5wYXJlbnROb2RlKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGxldCBlbCA9IHByb3BzLnRhcmdldFxuXG4gICAgICBpZiAodHlwZW9mIHByb3BzLnRhcmdldCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocHJvcHMudGFyZ2V0KVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICBlbCA9IHZvaWQgMFxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChlbCAhPT0gdm9pZCAwICYmIGVsICE9PSBudWxsKSB7XG4gICAgICAgIGFuY2hvckVsLnZhbHVlID0gZWwuJGVsIHx8IGVsXG4gICAgICAgIGNvbmZpZ3VyZUFuY2hvckVsKClcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBhbmNob3JFbC52YWx1ZSA9IG51bGxcbiAgICAgICAgY29uc29sZS5lcnJvcihgQW5jaG9yOiB0YXJnZXQgXCIkeyBwcm9wcy50YXJnZXQgfVwiIG5vdCBmb3VuZGApXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgd2F0Y2goKCkgPT4gcHJvcHMuY29udGV4dE1lbnUsIHZhbCA9PiB7XG4gICAgaWYgKGFuY2hvckVsLnZhbHVlICE9PSBudWxsKSB7XG4gICAgICB1bmNvbmZpZ3VyZUFuY2hvckVsKClcbiAgICAgIGNvbmZpZ3VyZUFuY2hvckVsKHZhbClcbiAgICB9XG4gIH0pXG5cbiAgd2F0Y2goKCkgPT4gcHJvcHMudGFyZ2V0LCAoKSA9PiB7XG4gICAgaWYgKGFuY2hvckVsLnZhbHVlICE9PSBudWxsKSB7XG4gICAgICB1bmNvbmZpZ3VyZUFuY2hvckVsKClcbiAgICB9XG5cbiAgICBwaWNrQW5jaG9yRWwoKVxuICB9KVxuXG4gIHdhdGNoKCgpID0+IHByb3BzLm5vUGFyZW50RXZlbnQsIHZhbCA9PiB7XG4gICAgaWYgKGFuY2hvckVsLnZhbHVlICE9PSBudWxsKSB7XG4gICAgICBpZiAodmFsID09PSB0cnVlKSB7XG4gICAgICAgIHVuY29uZmlndXJlQW5jaG9yRWwoKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGNvbmZpZ3VyZUFuY2hvckVsKClcbiAgICAgIH1cbiAgICB9XG4gIH0pXG5cbiAgb25Nb3VudGVkKCgpID0+IHtcbiAgICBwaWNrQW5jaG9yRWwoKVxuXG4gICAgaWYgKGF2b2lkRW1pdCAhPT0gdHJ1ZSAmJiBwcm9wcy5tb2RlbFZhbHVlID09PSB0cnVlICYmIGFuY2hvckVsLnZhbHVlID09PSBudWxsKSB7XG4gICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIGZhbHNlKVxuICAgIH1cbiAgfSlcblxuICBvbkJlZm9yZVVubW91bnQoKCkgPT4ge1xuICAgIHRvdWNoVGltZXIgIT09IG51bGwgJiYgY2xlYXJUaW1lb3V0KHRvdWNoVGltZXIpXG4gICAgdW5jb25maWd1cmVBbmNob3JFbCgpXG4gIH0pXG5cbiAgcmV0dXJuIHtcbiAgICBhbmNob3JFbCxcbiAgICBjYW5TaG93LFxuICAgIGFuY2hvckV2ZW50c1xuICB9XG59XG4iLCJpbXBvcnQgeyByZWYsIHdhdGNoLCBvbkJlZm9yZVVubW91bnQgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IGxpc3Rlbk9wdHMgfSBmcm9tICcuLi8uLi91dGlscy9ldmVudC5qcydcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKFxuICBwcm9wcyxcbiAgY29uZmlndXJlU2Nyb2xsVGFyZ2V0XG4pIHtcbiAgY29uc3QgbG9jYWxTY3JvbGxUYXJnZXQgPSByZWYobnVsbClcbiAgbGV0IHNjcm9sbEZuXG5cbiAgZnVuY3Rpb24gY2hhbmdlU2Nyb2xsRXZlbnQgKHNjcm9sbFRhcmdldCwgZm4pIHtcbiAgICBjb25zdCBmblByb3AgPSBgJHsgZm4gIT09IHZvaWQgMCA/ICdhZGQnIDogJ3JlbW92ZScgfUV2ZW50TGlzdGVuZXJgXG4gICAgY29uc3QgZm5IYW5kbGVyID0gZm4gIT09IHZvaWQgMCA/IGZuIDogc2Nyb2xsRm5cblxuICAgIGlmIChzY3JvbGxUYXJnZXQgIT09IHdpbmRvdykge1xuICAgICAgc2Nyb2xsVGFyZ2V0WyBmblByb3AgXSgnc2Nyb2xsJywgZm5IYW5kbGVyLCBsaXN0ZW5PcHRzLnBhc3NpdmUpXG4gICAgfVxuXG4gICAgd2luZG93WyBmblByb3AgXSgnc2Nyb2xsJywgZm5IYW5kbGVyLCBsaXN0ZW5PcHRzLnBhc3NpdmUpXG5cbiAgICBzY3JvbGxGbiA9IGZuXG4gIH1cblxuICBmdW5jdGlvbiB1bmNvbmZpZ3VyZVNjcm9sbFRhcmdldCAoKSB7XG4gICAgaWYgKGxvY2FsU2Nyb2xsVGFyZ2V0LnZhbHVlICE9PSBudWxsKSB7XG4gICAgICBjaGFuZ2VTY3JvbGxFdmVudChsb2NhbFNjcm9sbFRhcmdldC52YWx1ZSlcbiAgICAgIGxvY2FsU2Nyb2xsVGFyZ2V0LnZhbHVlID0gbnVsbFxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IG5vUGFyZW50RXZlbnRXYXRjaGVyID0gd2F0Y2goKCkgPT4gcHJvcHMubm9QYXJlbnRFdmVudCwgKCkgPT4ge1xuICAgIGlmIChsb2NhbFNjcm9sbFRhcmdldC52YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgdW5jb25maWd1cmVTY3JvbGxUYXJnZXQoKVxuICAgICAgY29uZmlndXJlU2Nyb2xsVGFyZ2V0KClcbiAgICB9XG4gIH0pXG5cbiAgb25CZWZvcmVVbm1vdW50KG5vUGFyZW50RXZlbnRXYXRjaGVyKVxuXG4gIHJldHVybiB7XG4gICAgbG9jYWxTY3JvbGxUYXJnZXQsXG4gICAgdW5jb25maWd1cmVTY3JvbGxUYXJnZXQsXG4gICAgY2hhbmdlU2Nyb2xsRXZlbnRcbiAgfVxufVxuIiwiaW1wb3J0IHsgbGlzdGVuT3B0cyB9IGZyb20gJy4uL2V2ZW50LmpzJ1xuaW1wb3J0IHsgcG9ydGFsUHJveHlMaXN0IH0gZnJvbSAnLi4vcHJpdmF0ZS9wb3J0YWwuanMnXG5cbmxldCB0aW1lciA9IG51bGxcblxuY29uc3RcbiAgeyBub3RQYXNzaXZlQ2FwdHVyZSB9ID0gbGlzdGVuT3B0cyxcbiAgcmVnaXN0ZXJlZExpc3QgPSBbXVxuXG5mdW5jdGlvbiBnbG9iYWxIYW5kbGVyIChldnQpIHtcbiAgaWYgKHRpbWVyICE9PSBudWxsKSB7XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVyKVxuICAgIHRpbWVyID0gbnVsbFxuICB9XG5cbiAgY29uc3QgdGFyZ2V0ID0gZXZ0LnRhcmdldFxuXG4gIGlmIChcbiAgICB0YXJnZXQgPT09IHZvaWQgMFxuICAgIHx8IHRhcmdldC5ub2RlVHlwZSA9PT0gOFxuICAgIHx8IHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ25vLXBvaW50ZXItZXZlbnRzJykgPT09IHRydWVcbiAgKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICAvLyBjaGVjayBsYXN0IHBvcnRhbCB2bSBpZiBpdCdzXG4gIC8vIGEgUURpYWxvZyBhbmQgbm90IGluIHNlYW1sZXNzIG1vZGVcbiAgbGV0IHBvcnRhbEluZGV4ID0gcG9ydGFsUHJveHlMaXN0Lmxlbmd0aCAtIDFcblxuICB3aGlsZSAocG9ydGFsSW5kZXggPj0gMCkge1xuICAgIGNvbnN0IHByb3h5ID0gcG9ydGFsUHJveHlMaXN0WyBwb3J0YWxJbmRleCBdLiRcblxuICAgIGlmIChwcm94eS50eXBlLm5hbWUgIT09ICdRRGlhbG9nJykge1xuICAgICAgYnJlYWtcbiAgICB9XG5cbiAgICBpZiAocHJveHkucHJvcHMuc2VhbWxlc3MgIT09IHRydWUpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHBvcnRhbEluZGV4LS1cbiAgfVxuXG4gIGZvciAobGV0IGkgPSByZWdpc3RlcmVkTGlzdC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIGNvbnN0IHN0YXRlID0gcmVnaXN0ZXJlZExpc3RbIGkgXVxuXG4gICAgaWYgKFxuICAgICAgKFxuICAgICAgICBzdGF0ZS5hbmNob3JFbC52YWx1ZSA9PT0gbnVsbFxuICAgICAgICB8fCBzdGF0ZS5hbmNob3JFbC52YWx1ZS5jb250YWlucyh0YXJnZXQpID09PSBmYWxzZVxuICAgICAgKVxuICAgICAgJiYgKFxuICAgICAgICB0YXJnZXQgPT09IGRvY3VtZW50LmJvZHlcbiAgICAgICAgfHwgKFxuICAgICAgICAgIHN0YXRlLmlubmVyUmVmLnZhbHVlICE9PSBudWxsXG4gICAgICAgICAgJiYgc3RhdGUuaW5uZXJSZWYudmFsdWUuY29udGFpbnModGFyZ2V0KSA9PT0gZmFsc2VcbiAgICAgICAgKVxuICAgICAgKVxuICAgICkge1xuICAgICAgLy8gbWFyayB0aGUgZXZlbnQgYXMgYmVpbmcgcHJvY2Vzc2VkIGJ5IGNsaWNrT3V0c2lkZVxuICAgICAgLy8gdXNlZCB0byBwcmV2ZW50IHJlZm9jdXMgYWZ0ZXIgbWVudSBjbG9zZVxuICAgICAgZXZ0LnFDbGlja091dHNpZGUgPSB0cnVlXG4gICAgICBzdGF0ZS5vbkNsaWNrT3V0c2lkZShldnQpXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRDbGlja091dHNpZGUgKGNsaWNrT3V0c2lkZVByb3BzKSB7XG4gIHJlZ2lzdGVyZWRMaXN0LnB1c2goY2xpY2tPdXRzaWRlUHJvcHMpXG5cbiAgaWYgKHJlZ2lzdGVyZWRMaXN0Lmxlbmd0aCA9PT0gMSkge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGdsb2JhbEhhbmRsZXIsIG5vdFBhc3NpdmVDYXB0dXJlKVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBnbG9iYWxIYW5kbGVyLCBub3RQYXNzaXZlQ2FwdHVyZSlcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlQ2xpY2tPdXRzaWRlIChjbGlja091dHNpZGVQcm9wcykge1xuICBjb25zdCBpbmRleCA9IHJlZ2lzdGVyZWRMaXN0LmZpbmRJbmRleChoID0+IGggPT09IGNsaWNrT3V0c2lkZVByb3BzKVxuXG4gIGlmIChpbmRleCA+IC0xKSB7XG4gICAgcmVnaXN0ZXJlZExpc3Quc3BsaWNlKGluZGV4LCAxKVxuXG4gICAgaWYgKHJlZ2lzdGVyZWRMaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgaWYgKHRpbWVyICE9PSBudWxsKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lcilcbiAgICAgICAgdGltZXIgPSBudWxsXG4gICAgICB9XG5cbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGdsb2JhbEhhbmRsZXIsIG5vdFBhc3NpdmVDYXB0dXJlKVxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIGdsb2JhbEhhbmRsZXIsIG5vdFBhc3NpdmVDYXB0dXJlKVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgZ2V0U2Nyb2xsYmFyV2lkdGggfSBmcm9tICcuLi9zY3JvbGwuanMnXG5pbXBvcnQgeyBjbGllbnQgfSBmcm9tICcuLi8uLi9wbHVnaW5zL1BsYXRmb3JtLmpzJ1xuXG5sZXQgdnBMZWZ0LCB2cFRvcFxuXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVQb3NpdGlvbiAocG9zKSB7XG4gIGNvbnN0IHBhcnRzID0gcG9zLnNwbGl0KCcgJylcbiAgaWYgKHBhcnRzLmxlbmd0aCAhPT0gMikge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIGlmIChbICd0b3AnLCAnY2VudGVyJywgJ2JvdHRvbScgXS5pbmNsdWRlcyhwYXJ0c1sgMCBdKSAhPT0gdHJ1ZSkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0FuY2hvci9TZWxmIHBvc2l0aW9uIG11c3Qgc3RhcnQgd2l0aCBvbmUgb2YgdG9wL2NlbnRlci9ib3R0b20nKVxuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIGlmIChbICdsZWZ0JywgJ21pZGRsZScsICdyaWdodCcsICdzdGFydCcsICdlbmQnIF0uaW5jbHVkZXMocGFydHNbIDEgXSkgIT09IHRydWUpIHtcbiAgICBjb25zb2xlLmVycm9yKCdBbmNob3IvU2VsZiBwb3NpdGlvbiBtdXN0IGVuZCB3aXRoIG9uZSBvZiBsZWZ0L21pZGRsZS9yaWdodC9zdGFydC9lbmQnKVxuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIHJldHVybiB0cnVlXG59XG5cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZU9mZnNldCAodmFsKSB7XG4gIGlmICghdmFsKSB7IHJldHVybiB0cnVlIH1cbiAgaWYgKHZhbC5sZW5ndGggIT09IDIpIHsgcmV0dXJuIGZhbHNlIH1cbiAgaWYgKHR5cGVvZiB2YWxbIDAgXSAhPT0gJ251bWJlcicgfHwgdHlwZW9mIHZhbFsgMSBdICE9PSAnbnVtYmVyJykge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIHJldHVybiB0cnVlXG59XG5cbmNvbnN0IGhvcml6b250YWxQb3MgPSB7XG4gICdzdGFydCNsdHInOiAnbGVmdCcsXG4gICdzdGFydCNydGwnOiAncmlnaHQnLFxuICAnZW5kI2x0cic6ICdyaWdodCcsXG4gICdlbmQjcnRsJzogJ2xlZnQnXG59XG5cbjtbICdsZWZ0JywgJ21pZGRsZScsICdyaWdodCcgXS5mb3JFYWNoKHBvcyA9PiB7XG4gIGhvcml6b250YWxQb3NbIGAkeyBwb3MgfSNsdHJgIF0gPSBwb3NcbiAgaG9yaXpvbnRhbFBvc1sgYCR7IHBvcyB9I3J0bGAgXSA9IHBvc1xufSlcblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlUG9zaXRpb24gKHBvcywgcnRsKSB7XG4gIGNvbnN0IHBhcnRzID0gcG9zLnNwbGl0KCcgJylcbiAgcmV0dXJuIHtcbiAgICB2ZXJ0aWNhbDogcGFydHNbIDAgXSxcbiAgICBob3Jpem9udGFsOiBob3Jpem9udGFsUG9zWyBgJHsgcGFydHNbIDEgXSB9IyR7IHJ0bCA9PT0gdHJ1ZSA/ICdydGwnIDogJ2x0cicgfWAgXVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBbmNob3JQcm9wcyAoZWwsIG9mZnNldCkge1xuICBsZXQgeyB0b3AsIGxlZnQsIHJpZ2h0LCBib3R0b20sIHdpZHRoLCBoZWlnaHQgfSA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cbiAgaWYgKG9mZnNldCAhPT0gdm9pZCAwKSB7XG4gICAgdG9wIC09IG9mZnNldFsgMSBdXG4gICAgbGVmdCAtPSBvZmZzZXRbIDAgXVxuICAgIGJvdHRvbSArPSBvZmZzZXRbIDEgXVxuICAgIHJpZ2h0ICs9IG9mZnNldFsgMCBdXG5cbiAgICB3aWR0aCArPSBvZmZzZXRbIDAgXVxuICAgIGhlaWdodCArPSBvZmZzZXRbIDEgXVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB0b3AsIGJvdHRvbSwgaGVpZ2h0LFxuICAgIGxlZnQsIHJpZ2h0LCB3aWR0aCxcbiAgICBtaWRkbGU6IGxlZnQgKyAocmlnaHQgLSBsZWZ0KSAvIDIsXG4gICAgY2VudGVyOiB0b3AgKyAoYm90dG9tIC0gdG9wKSAvIDJcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRBYnNvbHV0ZUFuY2hvclByb3BzIChlbCwgYWJzb2x1dGVPZmZzZXQsIG9mZnNldCkge1xuICBsZXQgeyB0b3AsIGxlZnQgfSA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cbiAgdG9wICs9IGFic29sdXRlT2Zmc2V0LnRvcFxuICBsZWZ0ICs9IGFic29sdXRlT2Zmc2V0LmxlZnRcblxuICBpZiAob2Zmc2V0ICE9PSB2b2lkIDApIHtcbiAgICB0b3AgKz0gb2Zmc2V0WyAxIF1cbiAgICBsZWZ0ICs9IG9mZnNldFsgMCBdXG4gIH1cblxuICByZXR1cm4ge1xuICAgIHRvcCwgYm90dG9tOiB0b3AgKyAxLCBoZWlnaHQ6IDEsXG4gICAgbGVmdCwgcmlnaHQ6IGxlZnQgKyAxLCB3aWR0aDogMSxcbiAgICBtaWRkbGU6IGxlZnQsXG4gICAgY2VudGVyOiB0b3BcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VGFyZ2V0UHJvcHMgKGVsKSB7XG4gIHJldHVybiB7XG4gICAgdG9wOiAwLFxuICAgIGNlbnRlcjogZWwub2Zmc2V0SGVpZ2h0IC8gMixcbiAgICBib3R0b206IGVsLm9mZnNldEhlaWdodCxcbiAgICBsZWZ0OiAwLFxuICAgIG1pZGRsZTogZWwub2Zmc2V0V2lkdGggLyAyLFxuICAgIHJpZ2h0OiBlbC5vZmZzZXRXaWR0aFxuICB9XG59XG5cbmZ1bmN0aW9uIGdldFRvcExlZnRQcm9wcyAoYW5jaG9yUHJvcHMsIHRhcmdldFByb3BzLCBjZmcpIHtcbiAgcmV0dXJuIHtcbiAgICB0b3A6IGFuY2hvclByb3BzWyBjZmcuYW5jaG9yT3JpZ2luLnZlcnRpY2FsIF0gLSB0YXJnZXRQcm9wc1sgY2ZnLnNlbGZPcmlnaW4udmVydGljYWwgXSxcbiAgICBsZWZ0OiBhbmNob3JQcm9wc1sgY2ZnLmFuY2hvck9yaWdpbi5ob3Jpem9udGFsIF0gLSB0YXJnZXRQcm9wc1sgY2ZnLnNlbGZPcmlnaW4uaG9yaXpvbnRhbCBdXG4gIH1cbn1cblxuLy8gY2ZnOiB7IGVsLCBhbmNob3JFbCwgYW5jaG9yT3JpZ2luLCBzZWxmT3JpZ2luLCBvZmZzZXQsIGFic29sdXRlT2Zmc2V0LCBjb3ZlciwgZml0LCBtYXhIZWlnaHQsIG1heFdpZHRoIH1cbmV4cG9ydCBmdW5jdGlvbiBzZXRQb3NpdGlvbiAoY2ZnKSB7XG4gIGlmIChjbGllbnQuaXMuaW9zID09PSB0cnVlICYmIHdpbmRvdy52aXN1YWxWaWV3cG9ydCAhPT0gdm9pZCAwKSB7XG4gICAgLy8gdXNlcyB0aGUgcS1wb3NpdGlvbi1lbmdpbmUgQ1NTIGNsYXNzXG5cbiAgICBjb25zdCBlbCA9IGRvY3VtZW50LmJvZHkuc3R5bGVcbiAgICBjb25zdCB7IG9mZnNldExlZnQ6IGxlZnQsIG9mZnNldFRvcDogdG9wIH0gPSB3aW5kb3cudmlzdWFsVmlld3BvcnRcblxuICAgIGlmIChsZWZ0ICE9PSB2cExlZnQpIHtcbiAgICAgIGVsLnNldFByb3BlcnR5KCctLXEtcGUtbGVmdCcsIGxlZnQgKyAncHgnKVxuICAgICAgdnBMZWZ0ID0gbGVmdFxuICAgIH1cbiAgICBpZiAodG9wICE9PSB2cFRvcCkge1xuICAgICAgZWwuc2V0UHJvcGVydHkoJy0tcS1wZS10b3AnLCB0b3AgKyAncHgnKVxuICAgICAgdnBUb3AgPSB0b3BcbiAgICB9XG4gIH1cblxuICAvLyBzY3JvbGwgcG9zaXRpb24gbWlnaHQgY2hhbmdlXG4gIC8vIGlmIG1heC1oZWlnaHQvLXdpZHRoIGNoYW5nZXMsIHNvIHdlXG4gIC8vIG5lZWQgdG8gcmVzdG9yZSBpdCBhZnRlciB3ZSBjYWxjdWxhdGVcbiAgLy8gdGhlIG5ldyBwb3NpdGlvbmluZ1xuICBjb25zdCB7IHNjcm9sbExlZnQsIHNjcm9sbFRvcCB9ID0gY2ZnLmVsXG5cbiAgY29uc3QgYW5jaG9yUHJvcHMgPSBjZmcuYWJzb2x1dGVPZmZzZXQgPT09IHZvaWQgMFxuICAgID8gZ2V0QW5jaG9yUHJvcHMoY2ZnLmFuY2hvckVsLCBjZmcuY292ZXIgPT09IHRydWUgPyBbIDAsIDAgXSA6IGNmZy5vZmZzZXQpXG4gICAgOiBnZXRBYnNvbHV0ZUFuY2hvclByb3BzKGNmZy5hbmNob3JFbCwgY2ZnLmFic29sdXRlT2Zmc2V0LCBjZmcub2Zmc2V0KVxuXG4gIGxldCBlbFN0eWxlID0ge1xuICAgIG1heEhlaWdodDogY2ZnLm1heEhlaWdodCxcbiAgICBtYXhXaWR0aDogY2ZnLm1heFdpZHRoLFxuICAgIHZpc2liaWxpdHk6ICd2aXNpYmxlJ1xuICB9XG5cbiAgaWYgKGNmZy5maXQgPT09IHRydWUgfHwgY2ZnLmNvdmVyID09PSB0cnVlKSB7XG4gICAgZWxTdHlsZS5taW5XaWR0aCA9IGFuY2hvclByb3BzLndpZHRoICsgJ3B4J1xuICAgIGlmIChjZmcuY292ZXIgPT09IHRydWUpIHtcbiAgICAgIGVsU3R5bGUubWluSGVpZ2h0ID0gYW5jaG9yUHJvcHMuaGVpZ2h0ICsgJ3B4J1xuICAgIH1cbiAgfVxuXG4gIE9iamVjdC5hc3NpZ24oY2ZnLmVsLnN0eWxlLCBlbFN0eWxlKVxuXG4gIGNvbnN0IHRhcmdldFByb3BzID0gZ2V0VGFyZ2V0UHJvcHMoY2ZnLmVsKVxuICBsZXQgcHJvcHMgPSBnZXRUb3BMZWZ0UHJvcHMoYW5jaG9yUHJvcHMsIHRhcmdldFByb3BzLCBjZmcpXG5cbiAgaWYgKGNmZy5hYnNvbHV0ZU9mZnNldCA9PT0gdm9pZCAwIHx8IGNmZy5vZmZzZXQgPT09IHZvaWQgMCkge1xuICAgIGFwcGx5Qm91bmRhcmllcyhwcm9wcywgYW5jaG9yUHJvcHMsIHRhcmdldFByb3BzLCBjZmcuYW5jaG9yT3JpZ2luLCBjZmcuc2VsZk9yaWdpbilcbiAgfVxuICBlbHNlIHsgLy8gd2UgaGF2ZSB0b3VjaCBwb3NpdGlvbiBvciBjb250ZXh0IG1lbnUgd2l0aCBvZmZzZXRcbiAgICBjb25zdCB7IHRvcCwgbGVmdCB9ID0gcHJvcHMgLy8gY2FjaGUgaW5pdGlhbCB2YWx1ZXNcblxuICAgIC8vIGFwcGx5IGluaXRpYWwgYm91bmRhcmllc1xuICAgIGFwcGx5Qm91bmRhcmllcyhwcm9wcywgYW5jaG9yUHJvcHMsIHRhcmdldFByb3BzLCBjZmcuYW5jaG9yT3JpZ2luLCBjZmcuc2VsZk9yaWdpbilcblxuICAgIGxldCBoYXNDaGFuZ2VkID0gZmFsc2VcblxuICAgIC8vIGRpZCBpdCBmbGlwIHZlcnRpY2FsbHk/XG4gICAgaWYgKHByb3BzLnRvcCAhPT0gdG9wKSB7XG4gICAgICBoYXNDaGFuZ2VkID0gdHJ1ZVxuICAgICAgY29uc3Qgb2Zmc2V0WSA9IDIgKiBjZmcub2Zmc2V0WyAxIF1cbiAgICAgIGFuY2hvclByb3BzLmNlbnRlciA9IGFuY2hvclByb3BzLnRvcCAtPSBvZmZzZXRZXG4gICAgICBhbmNob3JQcm9wcy5ib3R0b20gLT0gb2Zmc2V0WSArIDJcbiAgICB9XG5cbiAgICAvLyBkaWQgaXQgZmxpcCBob3Jpem9udGFsbHk/XG4gICAgaWYgKHByb3BzLmxlZnQgIT09IGxlZnQpIHtcbiAgICAgIGhhc0NoYW5nZWQgPSB0cnVlXG4gICAgICBjb25zdCBvZmZzZXRYID0gMiAqIGNmZy5vZmZzZXRbIDAgXVxuICAgICAgYW5jaG9yUHJvcHMubWlkZGxlID0gYW5jaG9yUHJvcHMubGVmdCAtPSBvZmZzZXRYXG4gICAgICBhbmNob3JQcm9wcy5yaWdodCAtPSBvZmZzZXRYICsgMlxuICAgIH1cblxuICAgIGlmIChoYXNDaGFuZ2VkID09PSB0cnVlKSB7XG4gICAgICAvLyByZS1jYWxjdWxhdGUgcHJvcHMgd2l0aCB0aGUgbmV3IGFuY2hvclxuICAgICAgcHJvcHMgPSBnZXRUb3BMZWZ0UHJvcHMoYW5jaG9yUHJvcHMsIHRhcmdldFByb3BzLCBjZmcpXG5cbiAgICAgIC8vIGFuZCByZS1hcHBseSBib3VuZGFyaWVzXG4gICAgICBhcHBseUJvdW5kYXJpZXMocHJvcHMsIGFuY2hvclByb3BzLCB0YXJnZXRQcm9wcywgY2ZnLmFuY2hvck9yaWdpbiwgY2ZnLnNlbGZPcmlnaW4pXG4gICAgfVxuICB9XG5cbiAgZWxTdHlsZSA9IHtcbiAgICB0b3A6IHByb3BzLnRvcCArICdweCcsXG4gICAgbGVmdDogcHJvcHMubGVmdCArICdweCdcbiAgfVxuXG4gIGlmIChwcm9wcy5tYXhIZWlnaHQgIT09IHZvaWQgMCkge1xuICAgIGVsU3R5bGUubWF4SGVpZ2h0ID0gcHJvcHMubWF4SGVpZ2h0ICsgJ3B4J1xuXG4gICAgaWYgKGFuY2hvclByb3BzLmhlaWdodCA+IHByb3BzLm1heEhlaWdodCkge1xuICAgICAgZWxTdHlsZS5taW5IZWlnaHQgPSBlbFN0eWxlLm1heEhlaWdodFxuICAgIH1cbiAgfVxuICBpZiAocHJvcHMubWF4V2lkdGggIT09IHZvaWQgMCkge1xuICAgIGVsU3R5bGUubWF4V2lkdGggPSBwcm9wcy5tYXhXaWR0aCArICdweCdcblxuICAgIGlmIChhbmNob3JQcm9wcy53aWR0aCA+IHByb3BzLm1heFdpZHRoKSB7XG4gICAgICBlbFN0eWxlLm1pbldpZHRoID0gZWxTdHlsZS5tYXhXaWR0aFxuICAgIH1cbiAgfVxuXG4gIE9iamVjdC5hc3NpZ24oY2ZnLmVsLnN0eWxlLCBlbFN0eWxlKVxuXG4gIC8vIHJlc3RvcmUgc2Nyb2xsIHBvc2l0aW9uXG4gIGlmIChjZmcuZWwuc2Nyb2xsVG9wICE9PSBzY3JvbGxUb3ApIHtcbiAgICBjZmcuZWwuc2Nyb2xsVG9wID0gc2Nyb2xsVG9wXG4gIH1cbiAgaWYgKGNmZy5lbC5zY3JvbGxMZWZ0ICE9PSBzY3JvbGxMZWZ0KSB7XG4gICAgY2ZnLmVsLnNjcm9sbExlZnQgPSBzY3JvbGxMZWZ0XG4gIH1cbn1cblxuZnVuY3Rpb24gYXBwbHlCb3VuZGFyaWVzIChwcm9wcywgYW5jaG9yUHJvcHMsIHRhcmdldFByb3BzLCBhbmNob3JPcmlnaW4sIHNlbGZPcmlnaW4pIHtcbiAgY29uc3RcbiAgICBjdXJyZW50SGVpZ2h0ID0gdGFyZ2V0UHJvcHMuYm90dG9tLFxuICAgIGN1cnJlbnRXaWR0aCA9IHRhcmdldFByb3BzLnJpZ2h0LFxuICAgIG1hcmdpbiA9IGdldFNjcm9sbGJhcldpZHRoKCksXG4gICAgaW5uZXJIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLSBtYXJnaW4sXG4gICAgaW5uZXJXaWR0aCA9IGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGhcblxuICBpZiAocHJvcHMudG9wIDwgMCB8fCBwcm9wcy50b3AgKyBjdXJyZW50SGVpZ2h0ID4gaW5uZXJIZWlnaHQpIHtcbiAgICBpZiAoc2VsZk9yaWdpbi52ZXJ0aWNhbCA9PT0gJ2NlbnRlcicpIHtcbiAgICAgIHByb3BzLnRvcCA9IGFuY2hvclByb3BzWyBhbmNob3JPcmlnaW4udmVydGljYWwgXSA+IGlubmVySGVpZ2h0IC8gMlxuICAgICAgICA/IE1hdGgubWF4KDAsIGlubmVySGVpZ2h0IC0gY3VycmVudEhlaWdodClcbiAgICAgICAgOiAwXG4gICAgICBwcm9wcy5tYXhIZWlnaHQgPSBNYXRoLm1pbihjdXJyZW50SGVpZ2h0LCBpbm5lckhlaWdodClcbiAgICB9XG4gICAgZWxzZSBpZiAoYW5jaG9yUHJvcHNbIGFuY2hvck9yaWdpbi52ZXJ0aWNhbCBdID4gaW5uZXJIZWlnaHQgLyAyKSB7XG4gICAgICBjb25zdCBhbmNob3JZID0gTWF0aC5taW4oXG4gICAgICAgIGlubmVySGVpZ2h0LFxuICAgICAgICBhbmNob3JPcmlnaW4udmVydGljYWwgPT09ICdjZW50ZXInXG4gICAgICAgICAgPyBhbmNob3JQcm9wcy5jZW50ZXJcbiAgICAgICAgICA6IChhbmNob3JPcmlnaW4udmVydGljYWwgPT09IHNlbGZPcmlnaW4udmVydGljYWwgPyBhbmNob3JQcm9wcy5ib3R0b20gOiBhbmNob3JQcm9wcy50b3ApXG4gICAgICApXG4gICAgICBwcm9wcy5tYXhIZWlnaHQgPSBNYXRoLm1pbihjdXJyZW50SGVpZ2h0LCBhbmNob3JZKVxuICAgICAgcHJvcHMudG9wID0gTWF0aC5tYXgoMCwgYW5jaG9yWSAtIGN1cnJlbnRIZWlnaHQpXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcHJvcHMudG9wID0gTWF0aC5tYXgoMCwgYW5jaG9yT3JpZ2luLnZlcnRpY2FsID09PSAnY2VudGVyJ1xuICAgICAgICA/IGFuY2hvclByb3BzLmNlbnRlclxuICAgICAgICA6IChhbmNob3JPcmlnaW4udmVydGljYWwgPT09IHNlbGZPcmlnaW4udmVydGljYWwgPyBhbmNob3JQcm9wcy50b3AgOiBhbmNob3JQcm9wcy5ib3R0b20pXG4gICAgICApXG4gICAgICBwcm9wcy5tYXhIZWlnaHQgPSBNYXRoLm1pbihjdXJyZW50SGVpZ2h0LCBpbm5lckhlaWdodCAtIHByb3BzLnRvcClcbiAgICB9XG4gIH1cblxuICBpZiAocHJvcHMubGVmdCA8IDAgfHwgcHJvcHMubGVmdCArIGN1cnJlbnRXaWR0aCA+IGlubmVyV2lkdGgpIHtcbiAgICBwcm9wcy5tYXhXaWR0aCA9IE1hdGgubWluKGN1cnJlbnRXaWR0aCwgaW5uZXJXaWR0aClcbiAgICBpZiAoc2VsZk9yaWdpbi5ob3Jpem9udGFsID09PSAnbWlkZGxlJykge1xuICAgICAgcHJvcHMubGVmdCA9IGFuY2hvclByb3BzWyBhbmNob3JPcmlnaW4uaG9yaXpvbnRhbCBdID4gaW5uZXJXaWR0aCAvIDJcbiAgICAgICAgPyBNYXRoLm1heCgwLCBpbm5lcldpZHRoIC0gY3VycmVudFdpZHRoKVxuICAgICAgICA6IDBcbiAgICB9XG4gICAgZWxzZSBpZiAoYW5jaG9yUHJvcHNbIGFuY2hvck9yaWdpbi5ob3Jpem9udGFsIF0gPiBpbm5lcldpZHRoIC8gMikge1xuICAgICAgY29uc3QgYW5jaG9yWCA9IE1hdGgubWluKFxuICAgICAgICBpbm5lcldpZHRoLFxuICAgICAgICBhbmNob3JPcmlnaW4uaG9yaXpvbnRhbCA9PT0gJ21pZGRsZSdcbiAgICAgICAgICA/IGFuY2hvclByb3BzLm1pZGRsZVxuICAgICAgICAgIDogKGFuY2hvck9yaWdpbi5ob3Jpem9udGFsID09PSBzZWxmT3JpZ2luLmhvcml6b250YWwgPyBhbmNob3JQcm9wcy5yaWdodCA6IGFuY2hvclByb3BzLmxlZnQpXG4gICAgICApXG4gICAgICBwcm9wcy5tYXhXaWR0aCA9IE1hdGgubWluKGN1cnJlbnRXaWR0aCwgYW5jaG9yWClcbiAgICAgIHByb3BzLmxlZnQgPSBNYXRoLm1heCgwLCBhbmNob3JYIC0gcHJvcHMubWF4V2lkdGgpXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcHJvcHMubGVmdCA9IE1hdGgubWF4KDAsIGFuY2hvck9yaWdpbi5ob3Jpem9udGFsID09PSAnbWlkZGxlJ1xuICAgICAgICA/IGFuY2hvclByb3BzLm1pZGRsZVxuICAgICAgICA6IChhbmNob3JPcmlnaW4uaG9yaXpvbnRhbCA9PT0gc2VsZk9yaWdpbi5ob3Jpem9udGFsID8gYW5jaG9yUHJvcHMubGVmdCA6IGFuY2hvclByb3BzLnJpZ2h0KVxuICAgICAgKVxuICAgICAgcHJvcHMubWF4V2lkdGggPSBNYXRoLm1pbihjdXJyZW50V2lkdGgsIGlubmVyV2lkdGggLSBwcm9wcy5sZWZ0KVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgaCwgcmVmLCBjb21wdXRlZCwgd2F0Y2gsIFRyYW5zaXRpb24sIG9uQmVmb3JlVW5tb3VudCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgdXNlQW5jaG9yLCB7IHVzZUFuY2hvclByb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtYW5jaG9yLmpzJ1xuaW1wb3J0IHVzZVNjcm9sbFRhcmdldCBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1zY3JvbGwtdGFyZ2V0LmpzJ1xuaW1wb3J0IHVzZU1vZGVsVG9nZ2xlLCB7IHVzZU1vZGVsVG9nZ2xlUHJvcHMsIHVzZU1vZGVsVG9nZ2xlRW1pdHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1tb2RlbC10b2dnbGUuanMnXG5pbXBvcnQgdXNlRGFyaywgeyB1c2VEYXJrUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1kYXJrLmpzJ1xuaW1wb3J0IHVzZVBvcnRhbCBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1wb3J0YWwuanMnXG5pbXBvcnQgdXNlVHJhbnNpdGlvbiwgeyB1c2VUcmFuc2l0aW9uUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS10cmFuc2l0aW9uLmpzJ1xuaW1wb3J0IHVzZVRpY2sgZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtdGljay5qcydcbmltcG9ydCB1c2VUaW1lb3V0IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLXRpbWVvdXQuanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgY2xvc2VQb3J0YWxNZW51cyB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvcG9ydGFsLmpzJ1xuaW1wb3J0IHsgZ2V0U2Nyb2xsVGFyZ2V0IH0gZnJvbSAnLi4vLi4vdXRpbHMvc2Nyb2xsLmpzJ1xuaW1wb3J0IHsgcG9zaXRpb24sIHN0b3BBbmRQcmV2ZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvZXZlbnQuanMnXG5pbXBvcnQgeyBoU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvcmVuZGVyLmpzJ1xuaW1wb3J0IHsgYWRkRXNjYXBlS2V5LCByZW1vdmVFc2NhcGVLZXkgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2VzY2FwZS1rZXkuanMnXG5pbXBvcnQgeyBhZGRGb2N1c291dCwgcmVtb3ZlRm9jdXNvdXQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2ZvY3Vzb3V0LmpzJ1xuaW1wb3J0IHsgY2hpbGRIYXNGb2N1cyB9IGZyb20gJy4uLy4uL3V0aWxzL2RvbS5qcydcbmltcG9ydCB7IGFkZENsaWNrT3V0c2lkZSwgcmVtb3ZlQ2xpY2tPdXRzaWRlIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9jbGljay1vdXRzaWRlLmpzJ1xuaW1wb3J0IHsgYWRkRm9jdXNGbiB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvZm9jdXMtbWFuYWdlci5qcydcblxuaW1wb3J0IHtcbiAgdmFsaWRhdGVQb3NpdGlvbiwgdmFsaWRhdGVPZmZzZXQsIHNldFBvc2l0aW9uLCBwYXJzZVBvc2l0aW9uXG59IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvcG9zaXRpb24tZW5naW5lLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUU1lbnUnLFxuXG4gIGluaGVyaXRBdHRyczogZmFsc2UsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VBbmNob3JQcm9wcyxcbiAgICAuLi51c2VNb2RlbFRvZ2dsZVByb3BzLFxuICAgIC4uLnVzZURhcmtQcm9wcyxcbiAgICAuLi51c2VUcmFuc2l0aW9uUHJvcHMsXG5cbiAgICBwZXJzaXN0ZW50OiBCb29sZWFuLFxuICAgIGF1dG9DbG9zZTogQm9vbGVhbixcbiAgICBzZXBhcmF0ZUNsb3NlUG9wdXA6IEJvb2xlYW4sXG5cbiAgICBub1JvdXRlRGlzbWlzczogQm9vbGVhbixcbiAgICBub1JlZm9jdXM6IEJvb2xlYW4sXG4gICAgbm9Gb2N1czogQm9vbGVhbixcblxuICAgIGZpdDogQm9vbGVhbixcbiAgICBjb3ZlcjogQm9vbGVhbixcblxuICAgIHNxdWFyZTogQm9vbGVhbixcblxuICAgIGFuY2hvcjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgdmFsaWRhdG9yOiB2YWxpZGF0ZVBvc2l0aW9uXG4gICAgfSxcbiAgICBzZWxmOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICB2YWxpZGF0b3I6IHZhbGlkYXRlUG9zaXRpb25cbiAgICB9LFxuICAgIG9mZnNldDoge1xuICAgICAgdHlwZTogQXJyYXksXG4gICAgICB2YWxpZGF0b3I6IHZhbGlkYXRlT2Zmc2V0XG4gICAgfSxcblxuICAgIHNjcm9sbFRhcmdldDoge1xuICAgICAgZGVmYXVsdDogdm9pZCAwXG4gICAgfSxcblxuICAgIHRvdWNoUG9zaXRpb246IEJvb2xlYW4sXG5cbiAgICBtYXhIZWlnaHQ6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICB9LFxuICAgIG1heFdpZHRoOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiBudWxsXG4gICAgfVxuICB9LFxuXG4gIGVtaXRzOiBbXG4gICAgLi4udXNlTW9kZWxUb2dnbGVFbWl0cyxcbiAgICAnY2xpY2snLCAnZXNjYXBlS2V5J1xuICBdLFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cywgZW1pdCwgYXR0cnMgfSkge1xuICAgIGxldCByZWZvY3VzVGFyZ2V0ID0gbnVsbCwgYWJzb2x1dGVPZmZzZXQsIHVud2F0Y2hQb3NpdGlvbiwgYXZvaWRBdXRvQ2xvc2VcblxuICAgIGNvbnN0IHZtID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgICBjb25zdCB7IHByb3h5IH0gPSB2bVxuICAgIGNvbnN0IHsgJHEgfSA9IHByb3h5XG5cbiAgICBjb25zdCBpbm5lclJlZiA9IHJlZihudWxsKVxuICAgIGNvbnN0IHNob3dpbmcgPSByZWYoZmFsc2UpXG5cbiAgICBjb25zdCBoaWRlT25Sb3V0ZUNoYW5nZSA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBwcm9wcy5wZXJzaXN0ZW50ICE9PSB0cnVlXG4gICAgICAmJiBwcm9wcy5ub1JvdXRlRGlzbWlzcyAhPT0gdHJ1ZVxuICAgIClcblxuICAgIGNvbnN0IGlzRGFyayA9IHVzZURhcmsocHJvcHMsICRxKVxuICAgIGNvbnN0IHsgcmVnaXN0ZXJUaWNrLCByZW1vdmVUaWNrIH0gPSB1c2VUaWNrKClcbiAgICBjb25zdCB7IHJlZ2lzdGVyVGltZW91dCB9ID0gdXNlVGltZW91dCgpXG4gICAgY29uc3QgeyB0cmFuc2l0aW9uUHJvcHMsIHRyYW5zaXRpb25TdHlsZSB9ID0gdXNlVHJhbnNpdGlvbihwcm9wcylcbiAgICBjb25zdCB7IGxvY2FsU2Nyb2xsVGFyZ2V0LCBjaGFuZ2VTY3JvbGxFdmVudCwgdW5jb25maWd1cmVTY3JvbGxUYXJnZXQgfSA9IHVzZVNjcm9sbFRhcmdldChwcm9wcywgY29uZmlndXJlU2Nyb2xsVGFyZ2V0KVxuXG4gICAgY29uc3QgeyBhbmNob3JFbCwgY2FuU2hvdyB9ID0gdXNlQW5jaG9yKHsgc2hvd2luZyB9KVxuXG4gICAgY29uc3QgeyBoaWRlIH0gPSB1c2VNb2RlbFRvZ2dsZSh7XG4gICAgICBzaG93aW5nLCBjYW5TaG93LCBoYW5kbGVTaG93LCBoYW5kbGVIaWRlLFxuICAgICAgaGlkZU9uUm91dGVDaGFuZ2UsXG4gICAgICBwcm9jZXNzT25Nb3VudDogdHJ1ZVxuICAgIH0pXG5cbiAgICBjb25zdCB7IHNob3dQb3J0YWwsIGhpZGVQb3J0YWwsIHJlbmRlclBvcnRhbCB9ID0gdXNlUG9ydGFsKHZtLCBpbm5lclJlZiwgcmVuZGVyUG9ydGFsQ29udGVudCwgJ21lbnUnKVxuXG4gICAgY29uc3QgY2xpY2tPdXRzaWRlUHJvcHMgPSB7XG4gICAgICBhbmNob3JFbCxcbiAgICAgIGlubmVyUmVmLFxuICAgICAgb25DbGlja091dHNpZGUgKGUpIHtcbiAgICAgICAgaWYgKHByb3BzLnBlcnNpc3RlbnQgIT09IHRydWUgJiYgc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGhpZGUoZSlcblxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIC8vIGFsd2F5cyBwcmV2ZW50IHRvdWNoIGV2ZW50XG4gICAgICAgICAgICBlLnR5cGUgPT09ICd0b3VjaHN0YXJ0J1xuICAgICAgICAgICAgLy8gcHJldmVudCBjbGljayBpZiBpdCdzIG9uIGEgZGlhbG9nIGJhY2tkcm9wXG4gICAgICAgICAgICB8fCBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3EtZGlhbG9nX19iYWNrZHJvcCcpXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBzdG9wQW5kUHJldmVudChlKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBhbmNob3JPcmlnaW4gPSBjb21wdXRlZCgoKSA9PlxuICAgICAgcGFyc2VQb3NpdGlvbihcbiAgICAgICAgcHJvcHMuYW5jaG9yIHx8IChcbiAgICAgICAgICBwcm9wcy5jb3ZlciA9PT0gdHJ1ZSA/ICdjZW50ZXIgbWlkZGxlJyA6ICdib3R0b20gc3RhcnQnXG4gICAgICAgICksXG4gICAgICAgICRxLmxhbmcucnRsXG4gICAgICApXG4gICAgKVxuXG4gICAgY29uc3Qgc2VsZk9yaWdpbiA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHByb3BzLmNvdmVyID09PSB0cnVlXG4gICAgICAgID8gYW5jaG9yT3JpZ2luLnZhbHVlXG4gICAgICAgIDogcGFyc2VQb3NpdGlvbihwcm9wcy5zZWxmIHx8ICd0b3Agc3RhcnQnLCAkcS5sYW5nLnJ0bClcbiAgICApKVxuXG4gICAgY29uc3QgbWVudUNsYXNzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIChwcm9wcy5zcXVhcmUgPT09IHRydWUgPyAnIHEtbWVudS0tc3F1YXJlJyA6ICcnKVxuICAgICAgKyAoaXNEYXJrLnZhbHVlID09PSB0cnVlID8gJyBxLW1lbnUtLWRhcmsgcS1kYXJrJyA6ICcnKVxuICAgIClcblxuICAgIGNvbnN0IG9uRXZlbnRzID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgcHJvcHMuYXV0b0Nsb3NlID09PSB0cnVlXG4gICAgICAgID8geyBvbkNsaWNrOiBvbkF1dG9DbG9zZSB9XG4gICAgICAgIDoge31cbiAgICApKVxuXG4gICAgY29uc3QgaGFuZGxlc0ZvY3VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIHNob3dpbmcudmFsdWUgPT09IHRydWUgJiYgcHJvcHMucGVyc2lzdGVudCAhPT0gdHJ1ZVxuICAgIClcblxuICAgIHdhdGNoKGhhbmRsZXNGb2N1cywgdmFsID0+IHtcbiAgICAgIGlmICh2YWwgPT09IHRydWUpIHtcbiAgICAgICAgYWRkRXNjYXBlS2V5KG9uRXNjYXBlS2V5KVxuICAgICAgICBhZGRDbGlja091dHNpZGUoY2xpY2tPdXRzaWRlUHJvcHMpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgcmVtb3ZlRXNjYXBlS2V5KG9uRXNjYXBlS2V5KVxuICAgICAgICByZW1vdmVDbGlja091dHNpZGUoY2xpY2tPdXRzaWRlUHJvcHMpXG4gICAgICB9XG4gICAgfSlcblxuICAgIGZ1bmN0aW9uIGZvY3VzICgpIHtcbiAgICAgIGFkZEZvY3VzRm4oKCkgPT4ge1xuICAgICAgICBsZXQgbm9kZSA9IGlubmVyUmVmLnZhbHVlXG5cbiAgICAgICAgaWYgKG5vZGUgJiYgbm9kZS5jb250YWlucyhkb2N1bWVudC5hY3RpdmVFbGVtZW50KSAhPT0gdHJ1ZSkge1xuICAgICAgICAgIG5vZGUgPSBub2RlLnF1ZXJ5U2VsZWN0b3IoJ1thdXRvZm9jdXNdW3RhYmluZGV4XSwgW2RhdGEtYXV0b2ZvY3VzXVt0YWJpbmRleF0nKVxuICAgICAgICAgICAgfHwgbm9kZS5xdWVyeVNlbGVjdG9yKCdbYXV0b2ZvY3VzXSBbdGFiaW5kZXhdLCBbZGF0YS1hdXRvZm9jdXNdIFt0YWJpbmRleF0nKVxuICAgICAgICAgICAgfHwgbm9kZS5xdWVyeVNlbGVjdG9yKCdbYXV0b2ZvY3VzXSwgW2RhdGEtYXV0b2ZvY3VzXScpXG4gICAgICAgICAgICB8fCBub2RlXG4gICAgICAgICAgbm9kZS5mb2N1cyh7IHByZXZlbnRTY3JvbGw6IHRydWUgfSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVTaG93IChldnQpIHtcbiAgICAgIHJlZm9jdXNUYXJnZXQgPSBwcm9wcy5ub1JlZm9jdXMgPT09IGZhbHNlXG4gICAgICAgID8gZG9jdW1lbnQuYWN0aXZlRWxlbWVudFxuICAgICAgICA6IG51bGxcblxuICAgICAgYWRkRm9jdXNvdXQob25Gb2N1c291dClcblxuICAgICAgc2hvd1BvcnRhbCgpXG4gICAgICBjb25maWd1cmVTY3JvbGxUYXJnZXQoKVxuXG4gICAgICBhYnNvbHV0ZU9mZnNldCA9IHZvaWQgMFxuXG4gICAgICBpZiAoZXZ0ICE9PSB2b2lkIDAgJiYgKHByb3BzLnRvdWNoUG9zaXRpb24gfHwgcHJvcHMuY29udGV4dE1lbnUpKSB7XG4gICAgICAgIGNvbnN0IHBvcyA9IHBvc2l0aW9uKGV2dClcblxuICAgICAgICBpZiAocG9zLmxlZnQgIT09IHZvaWQgMCkge1xuICAgICAgICAgIGNvbnN0IHsgdG9wLCBsZWZ0IH0gPSBhbmNob3JFbC52YWx1ZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICAgIGFic29sdXRlT2Zmc2V0ID0geyBsZWZ0OiBwb3MubGVmdCAtIGxlZnQsIHRvcDogcG9zLnRvcCAtIHRvcCB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHVud2F0Y2hQb3NpdGlvbiA9PT0gdm9pZCAwKSB7XG4gICAgICAgIHVud2F0Y2hQb3NpdGlvbiA9IHdhdGNoKFxuICAgICAgICAgICgpID0+ICRxLnNjcmVlbi53aWR0aCArICd8JyArICRxLnNjcmVlbi5oZWlnaHQgKyAnfCcgKyBwcm9wcy5zZWxmICsgJ3wnICsgcHJvcHMuYW5jaG9yICsgJ3wnICsgJHEubGFuZy5ydGwsXG4gICAgICAgICAgdXBkYXRlUG9zaXRpb25cbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICBpZiAocHJvcHMubm9Gb2N1cyAhPT0gdHJ1ZSkge1xuICAgICAgICBkb2N1bWVudC5hY3RpdmVFbGVtZW50LmJsdXIoKVxuICAgICAgfVxuXG4gICAgICAvLyBzaG91bGQgcmVtb3ZlVGljaygpIGlmIHRoaXMgZ2V0cyByZW1vdmVkXG4gICAgICByZWdpc3RlclRpY2soKCkgPT4ge1xuICAgICAgICB1cGRhdGVQb3NpdGlvbigpXG4gICAgICAgIHByb3BzLm5vRm9jdXMgIT09IHRydWUgJiYgZm9jdXMoKVxuICAgICAgfSlcblxuICAgICAgLy8gc2hvdWxkIHJlbW92ZVRpbWVvdXQoKSBpZiB0aGlzIGdldHMgcmVtb3ZlZFxuICAgICAgcmVnaXN0ZXJUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgLy8gcmVxdWlyZWQgaW4gb3JkZXIgdG8gYXZvaWQgdGhlIFwiZG91YmxlLXRhcCBuZWVkZWRcIiBpc3N1ZVxuICAgICAgICBpZiAoJHEucGxhdGZvcm0uaXMuaW9zID09PSB0cnVlKSB7XG4gICAgICAgICAgLy8gaWYgYXV0by1jbG9zZSwgdGhlbiB0aGlzIGNsaWNrIHNob3VsZFxuICAgICAgICAgIC8vIG5vdCBjbG9zZSB0aGUgbWVudVxuICAgICAgICAgIGF2b2lkQXV0b0Nsb3NlID0gcHJvcHMuYXV0b0Nsb3NlXG4gICAgICAgICAgaW5uZXJSZWYudmFsdWUuY2xpY2soKVxuICAgICAgICB9XG5cbiAgICAgICAgdXBkYXRlUG9zaXRpb24oKVxuICAgICAgICBzaG93UG9ydGFsKHRydWUpIC8vIGRvbmUgc2hvd2luZyBwb3J0YWxcbiAgICAgICAgZW1pdCgnc2hvdycsIGV2dClcbiAgICAgIH0sIHByb3BzLnRyYW5zaXRpb25EdXJhdGlvbilcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVIaWRlIChldnQpIHtcbiAgICAgIHJlbW92ZVRpY2soKVxuICAgICAgaGlkZVBvcnRhbCgpXG5cbiAgICAgIGFuY2hvckNsZWFudXAodHJ1ZSlcblxuICAgICAgaWYgKFxuICAgICAgICByZWZvY3VzVGFyZ2V0ICE9PSBudWxsXG4gICAgICAgICYmIChcbiAgICAgICAgICAvLyBtZW51IHdhcyBoaWRkZW4gZnJvbSBjb2RlIG9yIEVTQyBwbHVnaW5cbiAgICAgICAgICBldnQgPT09IHZvaWQgMFxuICAgICAgICAgIC8vIG1lbnUgd2FzIG5vdCBjbG9zZWQgZnJvbSBhIG1vdXNlIG9yIHRvdWNoIGNsaWNrT3V0c2lkZVxuICAgICAgICAgIHx8IGV2dC5xQ2xpY2tPdXRzaWRlICE9PSB0cnVlXG4gICAgICAgIClcbiAgICAgICkge1xuICAgICAgICAoKGV2dCAmJiBldnQudHlwZS5pbmRleE9mKCdrZXknKSA9PT0gMFxuICAgICAgICAgID8gcmVmb2N1c1RhcmdldC5jbG9zZXN0KCdbdGFiaW5kZXhdOm5vdChbdGFiaW5kZXhePVwiLVwiXSknKVxuICAgICAgICAgIDogdm9pZCAwXG4gICAgICAgICkgfHwgcmVmb2N1c1RhcmdldCkuZm9jdXMoKVxuICAgICAgICByZWZvY3VzVGFyZ2V0ID0gbnVsbFxuICAgICAgfVxuXG4gICAgICAvLyBzaG91bGQgcmVtb3ZlVGltZW91dCgpIGlmIHRoaXMgZ2V0cyByZW1vdmVkXG4gICAgICByZWdpc3RlclRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBoaWRlUG9ydGFsKHRydWUpIC8vIGRvbmUgaGlkaW5nLCBub3cgZGVzdHJveVxuICAgICAgICBlbWl0KCdoaWRlJywgZXZ0KVxuICAgICAgfSwgcHJvcHMudHJhbnNpdGlvbkR1cmF0aW9uKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFuY2hvckNsZWFudXAgKGhpZGluZykge1xuICAgICAgYWJzb2x1dGVPZmZzZXQgPSB2b2lkIDBcblxuICAgICAgaWYgKHVud2F0Y2hQb3NpdGlvbiAhPT0gdm9pZCAwKSB7XG4gICAgICAgIHVud2F0Y2hQb3NpdGlvbigpXG4gICAgICAgIHVud2F0Y2hQb3NpdGlvbiA9IHZvaWQgMFxuICAgICAgfVxuXG4gICAgICBpZiAoaGlkaW5nID09PSB0cnVlIHx8IHNob3dpbmcudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgcmVtb3ZlRm9jdXNvdXQob25Gb2N1c291dClcbiAgICAgICAgdW5jb25maWd1cmVTY3JvbGxUYXJnZXQoKVxuICAgICAgICByZW1vdmVDbGlja091dHNpZGUoY2xpY2tPdXRzaWRlUHJvcHMpXG4gICAgICAgIHJlbW92ZUVzY2FwZUtleShvbkVzY2FwZUtleSlcbiAgICAgIH1cblxuICAgICAgaWYgKGhpZGluZyAhPT0gdHJ1ZSkge1xuICAgICAgICByZWZvY3VzVGFyZ2V0ID0gbnVsbFxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvbmZpZ3VyZVNjcm9sbFRhcmdldCAoKSB7XG4gICAgICBpZiAoYW5jaG9yRWwudmFsdWUgIT09IG51bGwgfHwgcHJvcHMuc2Nyb2xsVGFyZ2V0ICE9PSB2b2lkIDApIHtcbiAgICAgICAgbG9jYWxTY3JvbGxUYXJnZXQudmFsdWUgPSBnZXRTY3JvbGxUYXJnZXQoYW5jaG9yRWwudmFsdWUsIHByb3BzLnNjcm9sbFRhcmdldClcbiAgICAgICAgY2hhbmdlU2Nyb2xsRXZlbnQobG9jYWxTY3JvbGxUYXJnZXQudmFsdWUsIHVwZGF0ZVBvc2l0aW9uKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uQXV0b0Nsb3NlIChlKSB7XG4gICAgICAvLyBpZiBhdXRvLWNsb3NlLCB0aGVuIHRoZSBpb3MgZG91YmxlLXRhcCBmaXggd2hpY2hcbiAgICAgIC8vIGlzc3VlcyBhIGNsaWNrIHNob3VsZCBub3QgY2xvc2UgdGhlIG1lbnVcbiAgICAgIGlmIChhdm9pZEF1dG9DbG9zZSAhPT0gdHJ1ZSkge1xuICAgICAgICBjbG9zZVBvcnRhbE1lbnVzKHByb3h5LCBlKVxuICAgICAgICBlbWl0KCdjbGljaycsIGUpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgYXZvaWRBdXRvQ2xvc2UgPSBmYWxzZVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uRm9jdXNvdXQgKGV2dCkge1xuICAgICAgLy8gdGhlIGZvY3VzIGlzIG5vdCBpbiBhIHZ1ZSBjaGlsZCBjb21wb25lbnRcbiAgICAgIGlmIChcbiAgICAgICAgaGFuZGxlc0ZvY3VzLnZhbHVlID09PSB0cnVlXG4gICAgICAgICYmIHByb3BzLm5vRm9jdXMgIT09IHRydWVcbiAgICAgICAgJiYgY2hpbGRIYXNGb2N1cyhpbm5lclJlZi52YWx1ZSwgZXZ0LnRhcmdldCkgIT09IHRydWVcbiAgICAgICkge1xuICAgICAgICBmb2N1cygpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Fc2NhcGVLZXkgKGV2dCkge1xuICAgICAgZW1pdCgnZXNjYXBlS2V5JylcbiAgICAgIGhpZGUoZXZ0KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZVBvc2l0aW9uICgpIHtcbiAgICAgIGNvbnN0IGVsID0gaW5uZXJSZWYudmFsdWVcblxuICAgICAgaWYgKGVsID09PSBudWxsIHx8IGFuY2hvckVsLnZhbHVlID09PSBudWxsKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBzZXRQb3NpdGlvbih7XG4gICAgICAgIGVsLFxuICAgICAgICBvZmZzZXQ6IHByb3BzLm9mZnNldCxcbiAgICAgICAgYW5jaG9yRWw6IGFuY2hvckVsLnZhbHVlLFxuICAgICAgICBhbmNob3JPcmlnaW46IGFuY2hvck9yaWdpbi52YWx1ZSxcbiAgICAgICAgc2VsZk9yaWdpbjogc2VsZk9yaWdpbi52YWx1ZSxcbiAgICAgICAgYWJzb2x1dGVPZmZzZXQsXG4gICAgICAgIGZpdDogcHJvcHMuZml0LFxuICAgICAgICBjb3ZlcjogcHJvcHMuY292ZXIsXG4gICAgICAgIG1heEhlaWdodDogcHJvcHMubWF4SGVpZ2h0LFxuICAgICAgICBtYXhXaWR0aDogcHJvcHMubWF4V2lkdGhcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVuZGVyUG9ydGFsQ29udGVudCAoKSB7XG4gICAgICByZXR1cm4gaChcbiAgICAgICAgVHJhbnNpdGlvbixcbiAgICAgICAgdHJhbnNpdGlvblByb3BzLnZhbHVlLFxuICAgICAgICAoKSA9PiAoXG4gICAgICAgICAgc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAgICAgPyBoKCdkaXYnLCB7XG4gICAgICAgICAgICAgIHJvbGU6ICdtZW51JyxcbiAgICAgICAgICAgICAgLi4uYXR0cnMsXG4gICAgICAgICAgICAgIHJlZjogaW5uZXJSZWYsXG4gICAgICAgICAgICAgIHRhYmluZGV4OiAtMSxcbiAgICAgICAgICAgICAgY2xhc3M6IFtcbiAgICAgICAgICAgICAgICAncS1tZW51IHEtcG9zaXRpb24tZW5naW5lIHNjcm9sbCcgKyBtZW51Q2xhc3MudmFsdWUsXG4gICAgICAgICAgICAgICAgYXR0cnMuY2xhc3NcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgc3R5bGU6IFtcbiAgICAgICAgICAgICAgICBhdHRycy5zdHlsZSxcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uU3R5bGUudmFsdWVcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgLi4ub25FdmVudHMudmFsdWVcbiAgICAgICAgICAgIH0sIGhTbG90KHNsb3RzLmRlZmF1bHQpKVxuICAgICAgICAgICAgOiBudWxsXG4gICAgICAgIClcbiAgICAgIClcbiAgICB9XG5cbiAgICBvbkJlZm9yZVVubW91bnQoYW5jaG9yQ2xlYW51cClcblxuICAgIC8vIGV4cG9zZSBwdWJsaWMgbWV0aG9kc1xuICAgIE9iamVjdC5hc3NpZ24ocHJveHksIHsgZm9jdXMsIHVwZGF0ZVBvc2l0aW9uIH0pXG5cbiAgICByZXR1cm4gcmVuZGVyUG9ydGFsXG4gIH1cbn0pXG4iXSwibmFtZXMiOlsiaCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBTVksTUFBQyxpQkFBaUI7QUFBQSxFQUM1QixRQUFRO0FBQUEsSUFDTixTQUFTO0FBQUEsRUFDVjtBQUFBLEVBQ0QsZUFBZTtBQUFBLEVBQ2YsYUFBYTtBQUNmO0FBRWUsU0FBQSxVQUFVO0FBQUEsRUFDdkI7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNGLEdBQUc7QUFDRCxRQUFNLEVBQUUsT0FBTyxPQUFPLEtBQUksSUFBSyxtQkFBb0I7QUFFbkQsUUFBTSxXQUFXLElBQUksSUFBSTtBQUV6QixNQUFJLGFBQWE7QUFFakIsV0FBUyxRQUFTLEtBQUs7QUFF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
