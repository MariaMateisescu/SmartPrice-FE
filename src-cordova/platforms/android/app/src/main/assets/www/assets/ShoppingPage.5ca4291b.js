import { Q as QSpinnerOval } from "./QSpinnerOval.2ab139a3.js";
import { Q as QSeparator } from "./QSeparator.cfe50c1e.js";
import { bt as createComponent, y as ref, a1 as computed, cg as debounce, b0 as watch, ax as onDeactivated, at as onActivated, av as onBeforeUnmount, ak as h, by as hMergeSlot, b7 as withDirectives, ah as getCurrentInstance, co as setVerticalScrollPosition, cp as setHorizontalScrollPosition, bw as emptyRenderFn, az as onMounted, as as nextTick, c9 as hDir, bF as hSlot, an as inject, bz as layoutKey, ba as Transition, z as shallowReactive, bu as useRouterLinkProps, bq as vShow, bC as QIcon, bI as stopAndPrevent, _ as _export_sfc, o as openBlock, c as createElementBlock, aa as createVNode, b5 as withCtx, a as createBaseVNode, a9 as createTextVNode, Q as Fragment, aK as renderList, a2 as createBlock, M as toDisplayString, a3 as createCommentVNode, bE as QBtn, aH as pushScopeId, aF as popScopeId, bS as Ripple, bA as useUserStore, ci as useQuasar, bB as useDashHeaderStore, aL as resolveComponent } from "./index.404ce4fc.js";
import { u as useDarkProps, a as useDark } from "./use-dark.efa419b2.js";
import { Q as QResizeObserver } from "./QResizeObserver.8c33f6fd.js";
import { Q as QScrollObserver } from "./QScrollObserver.0dc0c385.js";
import { T as TouchPan } from "./TouchPan.91a572c2.js";
import { b as between } from "./format.ec2e0666.js";
import { u as useHistory, b as usePreventScroll, a as QDialog, Q as QSpace } from "./QDialog.61cd08a9.js";
import { u as useModelToggleProps, b as useModelToggleEmits, d as useModelToggle, C as ClosePopup } from "./ClosePopup.7842916c.js";
import { a as useTimeout } from "./use-timeout.219926c0.js";
import { Q as QCard, a as QCardSection } from "./QCard.facf2956.js";
import { Q as QInput } from "./QInput.79283f08.js";
import { Q as QItem, a as QItemSection } from "./QItem.9f28e6fb.js";
import { Q as QSelect } from "./QSelect.135b4195.js";
import { E as EmptyState } from "./EmptyState.1ca3d2f0.js";
import { Q as QItemLabel, a as QCheckbox } from "./QCheckbox.63a7d4c7.js";
import { u as uid } from "./uid.7f2d5a47.js";
import { Q as QSlideItem, a as QCardActions } from "./QCardActions.10f7195c.js";
import { Q as QList } from "./QList.7cb8c5cd.js";
import "./touch.16a8a914.js";
import "./selection.663e88ad.js";
import "./focus-manager.d00a4595.js";
import "./use-form.74a30394.js";
import "./QChip.fdd72c5d.js";
import "./QMenu.d71314a5.js";
import "./rtl.8137048b.js";
import "./Login.7b077154.js";
import "./SignUp.eb9627d6.js";
import "./ForgotPassword.bbba5c8c.js";
import "./use-checkbox.dbd2657e.js";
import "./use-cache.b95af379.js";
const axisList = ["vertical", "horizontal"];
const dirProps = {
  vertical: { offset: "offsetY", scroll: "scrollTop", dir: "down", dist: "y" },
  horizontal: { offset: "offsetX", scroll: "scrollLeft", dir: "right", dist: "x" }
};
const panOpts = {
  prevent: true,
  mouse: true,
  mouseAllDir: true
};
const getMinThumbSize = (size) => size >= 250 ? 50 : Math.ceil(size / 5);
var QScrollArea = createComponent({
  name: "QScrollArea",
  props: {
    ...useDarkProps,
    thumbStyle: Object,
    verticalThumbStyle: Object,
    horizontalThumbStyle: Object,
    barStyle: [Array, String, Object],
    verticalBarStyle: [Array, String, Object],
    horizontalBarStyle: [Array, String, Object],
    contentStyle: [Array, String, Object],
    contentActiveStyle: [Array, String, Object],
    delay: {
      type: [String, Number],
      default: 1e3
    },
    visible: {
      type: Boolean,
      default: null
    },
    tabindex: [String, Number],
    onScroll: Function
  },
  setup(props, { slots, emit }) {
    const tempShowing = ref(false);
    const panning = ref(false);
    const hover = ref(false);
    const container = {
      vertical: ref(0),
      horizontal: ref(0)
    };
    const scroll = {
      vertical: {
        ref: ref(null),
        position: ref(0),
        size: ref(0)
      },
      horizontal: {
        ref: ref(null),
        position: ref(0),
        size: ref(0)
      }
    };
    const { proxy } = getCurrentInstance();
    const isDark = useDark(props, proxy.$q);
    let timer = null, panRefPos;
    const targetRef = ref(null);
    const classes = computed(
      () => "q-scrollarea" + (isDark.value === true ? " q-scrollarea--dark" : "")
    );
    scroll.vertical.percentage = computed(() => {
      const diff = scroll.vertical.size.value - container.vertical.value;
      if (diff <= 0) {
        return 0;
      }
      const p = between(scroll.vertical.position.value / diff, 0, 1);
      return Math.round(p * 1e4) / 1e4;
    });
    scroll.vertical.thumbHidden = computed(
      () => (props.visible === null ? hover.value : props.visible) !== true && tempShowing.value === false && panning.value === false || scroll.vertical.size.value <= container.vertical.value + 1
    );
    scroll.vertical.thumbStart = computed(
      () => scroll.vertical.percentage.value * (container.vertical.value - scroll.vertical.thumbSize.value)
    );
    scroll.vertical.thumbSize = computed(
      () => Math.round(
        between(
          container.vertical.value * container.vertical.value / scroll.vertical.size.value,
          getMinThumbSize(container.vertical.value),
          container.vertical.value
        )
      )
    );
    scroll.vertical.style = computed(() => {
      return {
        ...props.thumbStyle,
        ...props.verticalThumbStyle,
        top: `${scroll.vertical.thumbStart.value}px`,
        height: `${scroll.vertical.thumbSize.value}px`
      };
    });
    scroll.vertical.thumbClass = computed(
      () => "q-scrollarea__thumb q-scrollarea__thumb--v absolute-right" + (scroll.vertical.thumbHidden.value === true ? " q-scrollarea__thumb--invisible" : "")
    );
    scroll.vertical.barClass = computed(
      () => "q-scrollarea__bar q-scrollarea__bar--v absolute-right" + (scroll.vertical.thumbHidden.value === true ? " q-scrollarea__bar--invisible" : "")
    );
    scroll.horizontal.percentage = computed(() => {
      const diff = scroll.horizontal.size.value - container.horizontal.value;
      if (diff <= 0) {
        return 0;
      }
      const p = between(Math.abs(scroll.horizontal.position.value) / diff, 0, 1);
      return Math.round(p * 1e4) / 1e4;
    });
    scroll.horizontal.thumbHidden = computed(
      () => (props.visible === null ? hover.value : props.visible) !== true && tempShowing.value === false && panning.value === false || scroll.horizontal.size.value <= container.horizontal.value + 1
    );
    scroll.horizontal.thumbStart = computed(
      () => scroll.horizontal.percentage.value * (container.horizontal.value - scroll.horizontal.thumbSize.value)
    );
    scroll.horizontal.thumbSize = computed(
      () => Math.round(
        between(
          container.horizontal.value * container.horizontal.value / scroll.horizontal.size.value,
          getMinThumbSize(container.horizontal.value),
          container.horizontal.value
        )
      )
    );
    scroll.horizontal.style = computed(() => {
      return {
        ...props.thumbStyle,
        ...props.horizontalThumbStyle,
        [proxy.$q.lang.rtl === true ? "right" : "left"]: `${scroll.horizontal.thumbStart.value}px`,
        width: `${scroll.horizontal.thumbSize.value}px`
      };
    });
    scroll.horizontal.thumbClass = computed(
      () => "q-scrollarea__thumb q-scrollarea__thumb--h absolute-bottom" + (scroll.horizontal.thumbHidden.value === true ? " q-scrollarea__thumb--invisible" : "")
    );
    scroll.horizontal.barClass = computed(
      () => "q-scrollarea__bar q-scrollarea__bar--h absolute-bottom" + (scroll.horizontal.thumbHidden.value === true ? " q-scrollarea__bar--invisible" : "")
    );
    const mainStyle = computed(() => scroll.vertical.thumbHidden.value === true && scroll.horizontal.thumbHidden.value === true ? props.contentStyle : props.contentActiveStyle);
    const thumbVertDir = [[
      TouchPan,
      (e) => {
        onPanThumb(e, "vertical");
      },
      void 0,
      { vertical: true, ...panOpts }
    ]];
    const thumbHorizDir = [[
      TouchPan,
      (e) => {
        onPanThumb(e, "horizontal");
      },
      void 0,
      { horizontal: true, ...panOpts }
    ]];
    function getScroll() {
      const info = {};
      axisList.forEach((axis) => {
        const data = scroll[axis];
        info[axis + "Position"] = data.position.value;
        info[axis + "Percentage"] = data.percentage.value;
        info[axis + "Size"] = data.size.value;
        info[axis + "ContainerSize"] = container[axis].value;
      });
      return info;
    }
    const emitScroll = debounce(() => {
      const info = getScroll();
      info.ref = proxy;
      emit("scroll", info);
    }, 0);
    function localSetScrollPosition(axis, offset, duration2) {
      if (axisList.includes(axis) === false) {
        console.error("[QScrollArea]: wrong first param of setScrollPosition (vertical/horizontal)");
        return;
      }
      const fn = axis === "vertical" ? setVerticalScrollPosition : setHorizontalScrollPosition;
      fn(targetRef.value, offset, duration2);
    }
    function updateContainer({ height, width }) {
      let change = false;
      if (container.vertical.value !== height) {
        container.vertical.value = height;
        change = true;
      }
      if (container.horizontal.value !== width) {
        container.horizontal.value = width;
        change = true;
      }
      change === true && startTimer();
    }
    function updateScroll({ position }) {
      let change = false;
      if (scroll.vertical.position.value !== position.top) {
        scroll.vertical.position.value = position.top;
        change = true;
      }
      if (scroll.horizontal.position.value !== position.left) {
        scroll.horizontal.position.value = position.left;
        change = true;
      }
      change === true && startTimer();
    }
    function updateScrollSize({ height, width }) {
      if (scroll.horizontal.size.value !== width) {
        scroll.horizontal.size.value = width;
        startTimer();
      }
      if (scroll.vertical.size.value !== height) {
        scroll.vertical.size.value = height;
        startTimer();
      }
    }
    function onPanThumb(e, axis) {
      const data = scroll[axis];
      if (e.isFirst === true) {
        if (data.thumbHidden.value === true) {
          return;
        }
        panRefPos = data.position.value;
        panning.value = true;
      } else if (panning.value !== true) {
        return;
      }
      if (e.isFinal === true) {
        panning.value = false;
      }
      const dProp = dirProps[axis];
      const containerSize = container[axis].value;
      const multiplier = (data.size.value - containerSize) / (containerSize - data.thumbSize.value);
      const distance = e.distance[dProp.dist];
      const pos = panRefPos + (e.direction === dProp.dir ? 1 : -1) * distance * multiplier;
      setScroll(pos, axis);
    }
    function onMousedown(evt, axis) {
      const data = scroll[axis];
      if (data.thumbHidden.value !== true) {
        const offset = evt[dirProps[axis].offset];
        if (offset < data.thumbStart.value || offset > data.thumbStart.value + data.thumbSize.value) {
          const pos = offset - data.thumbSize.value / 2;
          setScroll(pos / container[axis].value * data.size.value, axis);
        }
        if (data.ref.value !== null) {
          data.ref.value.dispatchEvent(new MouseEvent(evt.type, evt));
        }
      }
    }
    function onVerticalMousedown(evt) {
      onMousedown(evt, "vertical");
    }
    function onHorizontalMousedown(evt) {
      onMousedown(evt, "horizontal");
    }
    function startTimer() {
      tempShowing.value = true;
      timer !== null && clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        tempShowing.value = false;
      }, props.delay);
      props.onScroll !== void 0 && emitScroll();
    }
    function setScroll(offset, axis) {
      targetRef.value[dirProps[axis].scroll] = offset;
    }
    function onMouseenter() {
      hover.value = true;
    }
    function onMouseleave() {
      hover.value = false;
    }
    let scrollPosition = null;
    watch(() => proxy.$q.lang.rtl, (rtl) => {
      if (targetRef.value !== null) {
        setHorizontalScrollPosition(
          targetRef.value,
          Math.abs(scroll.horizontal.position.value) * (rtl === true ? -1 : 1)
        );
      }
    });
    onDeactivated(() => {
      scrollPosition = {
        top: scroll.vertical.position.value,
        left: scroll.horizontal.position.value
      };
    });
    onActivated(() => {
      if (scrollPosition === null) {
        return;
      }
      const scrollTarget = targetRef.value;
      if (scrollTarget !== null) {
        setHorizontalScrollPosition(scrollTarget, scrollPosition.left);
        setVerticalScrollPosition(scrollTarget, scrollPosition.top);
      }
    });
    onBeforeUnmount(emitScroll.cancel);
    Object.assign(proxy, {
      getScrollTarget: () => targetRef.value,
      getScroll,
      getScrollPosition: () => ({
        top: scroll.vertical.position.value,
        left: scroll.horizontal.position.value
      }),
      getScrollPercentage: () => ({
        top: scroll.vertical.percentage.value,
        left: scroll.horizontal.percentage.value
      }),
      setScrollPosition: localSetScrollPosition,
      setScrollPercentage(axis, percentage, duration2) {
        localSetScrollPosition(
          axis,
          percentage * (scroll[axis].size.value - container[axis].value) * (axis === "horizontal" && proxy.$q.lang.rtl === true ? -1 : 1),
          duration2
        );
      }
    });
    return () => {
      return h("div", {
        class: classes.value,
        onMouseenter,
        onMouseleave
      }, [
        h("div", {
          ref: targetRef,
          class: "q-scrollarea__container scroll relative-position fit hide-scrollbar",
          tabindex: props.tabindex !== void 0 ? props.tabindex : void 0
        }, [
          h("div", {
            class: "q-scrollarea__content absolute",
            style: mainStyle.value
          }, hMergeSlot(slots.default, [
            h(QResizeObserver, {
              debounce: 0,
              onResize: updateScrollSize
            })
          ])),
          h(QScrollObserver, {
            axis: "both",
            onScroll: updateScroll
          })
        ]),
        h(QResizeObserver, {
          debounce: 0,
          onResize: updateContainer
        }),
        h("div", {
          class: scroll.vertical.barClass.value,
          style: [props.barStyle, props.verticalBarStyle],
          "aria-hidden": "true",
          onMousedown: onVerticalMousedown
        }),
        h("div", {
          class: scroll.horizontal.barClass.value,
          style: [props.barStyle, props.horizontalBarStyle],
          "aria-hidden": "true",
          onMousedown: onHorizontalMousedown
        }),
        withDirectives(
          h("div", {
            ref: scroll.vertical.ref,
            class: scroll.vertical.thumbClass.value,
            style: scroll.vertical.style.value,
            "aria-hidden": "true"
          }),
          thumbVertDir
        ),
        withDirectives(
          h("div", {
            ref: scroll.horizontal.ref,
            class: scroll.horizontal.thumbClass.value,
            style: scroll.horizontal.style.value,
            "aria-hidden": "true"
          }),
          thumbHorizDir
        )
      ]);
    };
  }
});
const duration = 150;
var QDrawer = createComponent({
  name: "QDrawer",
  inheritAttrs: false,
  props: {
    ...useModelToggleProps,
    ...useDarkProps,
    side: {
      type: String,
      default: "left",
      validator: (v) => ["left", "right"].includes(v)
    },
    width: {
      type: Number,
      default: 300
    },
    mini: Boolean,
    miniToOverlay: Boolean,
    miniWidth: {
      type: Number,
      default: 57
    },
    breakpoint: {
      type: Number,
      default: 1023
    },
    showIfAbove: Boolean,
    behavior: {
      type: String,
      validator: (v) => ["default", "desktop", "mobile"].includes(v),
      default: "default"
    },
    bordered: Boolean,
    elevated: Boolean,
    overlay: Boolean,
    persistent: Boolean,
    noSwipeOpen: Boolean,
    noSwipeClose: Boolean,
    noSwipeBackdrop: Boolean
  },
  emits: [
    ...useModelToggleEmits,
    "onLayout",
    "miniState"
  ],
  setup(props, { slots, emit, attrs }) {
    const vm = getCurrentInstance();
    const { proxy: { $q } } = vm;
    const isDark = useDark(props, $q);
    const { preventBodyScroll } = usePreventScroll();
    const { registerTimeout, removeTimeout } = useTimeout();
    const $layout = inject(layoutKey, emptyRenderFn);
    if ($layout === emptyRenderFn) {
      console.error("QDrawer needs to be child of QLayout");
      return emptyRenderFn;
    }
    let lastDesktopState, timerMini = null, layoutTotalWidthWatcher;
    const belowBreakpoint = ref(
      props.behavior === "mobile" || props.behavior !== "desktop" && $layout.totalWidth.value <= props.breakpoint
    );
    const isMini = computed(
      () => props.mini === true && belowBreakpoint.value !== true
    );
    const size = computed(() => isMini.value === true ? props.miniWidth : props.width);
    const showing = ref(
      props.showIfAbove === true && belowBreakpoint.value === false ? true : props.modelValue === true
    );
    const hideOnRouteChange = computed(
      () => props.persistent !== true && (belowBreakpoint.value === true || onScreenOverlay.value === true)
    );
    function handleShow(evt, noEvent) {
      addToHistory();
      evt !== false && $layout.animate();
      applyPosition(0);
      if (belowBreakpoint.value === true) {
        const otherInstance = $layout.instances[otherSide.value];
        if (otherInstance !== void 0 && otherInstance.belowBreakpoint === true) {
          otherInstance.hide(false);
        }
        applyBackdrop(1);
        $layout.isContainer.value !== true && preventBodyScroll(true);
      } else {
        applyBackdrop(0);
        evt !== false && setScrollable(false);
      }
      registerTimeout(() => {
        evt !== false && setScrollable(true);
        noEvent !== true && emit("show", evt);
      }, duration);
    }
    function handleHide(evt, noEvent) {
      removeFromHistory();
      evt !== false && $layout.animate();
      applyBackdrop(0);
      applyPosition(stateDirection.value * size.value);
      cleanup();
      if (noEvent !== true) {
        registerTimeout(() => {
          emit("hide", evt);
        }, duration);
      } else {
        removeTimeout();
      }
    }
    const { show, hide } = useModelToggle({
      showing,
      hideOnRouteChange,
      handleShow,
      handleHide
    });
    const { addToHistory, removeFromHistory } = useHistory(showing, hide, hideOnRouteChange);
    const instance = {
      belowBreakpoint,
      hide
    };
    const rightSide = computed(() => props.side === "right");
    const stateDirection = computed(
      () => ($q.lang.rtl === true ? -1 : 1) * (rightSide.value === true ? 1 : -1)
    );
    const flagBackdropBg = ref(0);
    const flagPanning = ref(false);
    const flagMiniAnimate = ref(false);
    const flagContentPosition = ref(
      size.value * stateDirection.value
    );
    const otherSide = computed(() => rightSide.value === true ? "left" : "right");
    const offset = computed(() => showing.value === true && belowBreakpoint.value === false && props.overlay === false ? props.miniToOverlay === true ? props.miniWidth : size.value : 0);
    const fixed = computed(
      () => props.overlay === true || props.miniToOverlay === true || $layout.view.value.indexOf(rightSide.value ? "R" : "L") > -1 || $q.platform.is.ios === true && $layout.isContainer.value === true
    );
    const onLayout = computed(
      () => props.overlay === false && showing.value === true && belowBreakpoint.value === false
    );
    const onScreenOverlay = computed(
      () => props.overlay === true && showing.value === true && belowBreakpoint.value === false
    );
    const backdropClass = computed(
      () => "fullscreen q-drawer__backdrop" + (showing.value === false && flagPanning.value === false ? " hidden" : "")
    );
    const backdropStyle = computed(() => ({
      backgroundColor: `rgba(0,0,0,${flagBackdropBg.value * 0.4})`
    }));
    const headerSlot = computed(() => rightSide.value === true ? $layout.rows.value.top[2] === "r" : $layout.rows.value.top[0] === "l");
    const footerSlot = computed(() => rightSide.value === true ? $layout.rows.value.bottom[2] === "r" : $layout.rows.value.bottom[0] === "l");
    const aboveStyle = computed(() => {
      const css = {};
      if ($layout.header.space === true && headerSlot.value === false) {
        if (fixed.value === true) {
          css.top = `${$layout.header.offset}px`;
        } else if ($layout.header.space === true) {
          css.top = `${$layout.header.size}px`;
        }
      }
      if ($layout.footer.space === true && footerSlot.value === false) {
        if (fixed.value === true) {
          css.bottom = `${$layout.footer.offset}px`;
        } else if ($layout.footer.space === true) {
          css.bottom = `${$layout.footer.size}px`;
        }
      }
      return css;
    });
    const style = computed(() => {
      const style2 = {
        width: `${size.value}px`,
        transform: `translateX(${flagContentPosition.value}px)`
      };
      return belowBreakpoint.value === true ? style2 : Object.assign(style2, aboveStyle.value);
    });
    const contentClass = computed(
      () => "q-drawer__content fit " + ($layout.isContainer.value !== true ? "scroll" : "overflow-auto")
    );
    const classes = computed(
      () => `q-drawer q-drawer--${props.side}` + (flagMiniAnimate.value === true ? " q-drawer--mini-animate" : "") + (props.bordered === true ? " q-drawer--bordered" : "") + (isDark.value === true ? " q-drawer--dark q-dark" : "") + (flagPanning.value === true ? " no-transition" : showing.value === true ? "" : " q-layout--prevent-focus") + (belowBreakpoint.value === true ? " fixed q-drawer--on-top q-drawer--mobile q-drawer--top-padding" : ` q-drawer--${isMini.value === true ? "mini" : "standard"}` + (fixed.value === true || onLayout.value !== true ? " fixed" : "") + (props.overlay === true || props.miniToOverlay === true ? " q-drawer--on-top" : "") + (headerSlot.value === true ? " q-drawer--top-padding" : ""))
    );
    const openDirective = computed(() => {
      const dir = $q.lang.rtl === true ? props.side : otherSide.value;
      return [[
        TouchPan,
        onOpenPan,
        void 0,
        {
          [dir]: true,
          mouse: true
        }
      ]];
    });
    const contentCloseDirective = computed(() => {
      const dir = $q.lang.rtl === true ? otherSide.value : props.side;
      return [[
        TouchPan,
        onClosePan,
        void 0,
        {
          [dir]: true,
          mouse: true
        }
      ]];
    });
    const backdropCloseDirective = computed(() => {
      const dir = $q.lang.rtl === true ? otherSide.value : props.side;
      return [[
        TouchPan,
        onClosePan,
        void 0,
        {
          [dir]: true,
          mouse: true,
          mouseAllDir: true
        }
      ]];
    });
    function updateBelowBreakpoint() {
      updateLocal(belowBreakpoint, props.behavior === "mobile" || props.behavior !== "desktop" && $layout.totalWidth.value <= props.breakpoint);
    }
    watch(belowBreakpoint, (val) => {
      if (val === true) {
        lastDesktopState = showing.value;
        showing.value === true && hide(false);
      } else if (props.overlay === false && props.behavior !== "mobile" && lastDesktopState !== false) {
        if (showing.value === true) {
          applyPosition(0);
          applyBackdrop(0);
          cleanup();
        } else {
          show(false);
        }
      }
    });
    watch(() => props.side, (newSide, oldSide) => {
      if ($layout.instances[oldSide] === instance) {
        $layout.instances[oldSide] = void 0;
        $layout[oldSide].space = false;
        $layout[oldSide].offset = 0;
      }
      $layout.instances[newSide] = instance;
      $layout[newSide].size = size.value;
      $layout[newSide].space = onLayout.value;
      $layout[newSide].offset = offset.value;
    });
    watch($layout.totalWidth, () => {
      if ($layout.isContainer.value === true || document.qScrollPrevented !== true) {
        updateBelowBreakpoint();
      }
    });
    watch(
      () => props.behavior + props.breakpoint,
      updateBelowBreakpoint
    );
    watch($layout.isContainer, (val) => {
      showing.value === true && preventBodyScroll(val !== true);
      val === true && updateBelowBreakpoint();
    });
    watch($layout.scrollbarWidth, () => {
      applyPosition(showing.value === true ? 0 : void 0);
    });
    watch(offset, (val) => {
      updateLayout("offset", val);
    });
    watch(onLayout, (val) => {
      emit("onLayout", val);
      updateLayout("space", val);
    });
    watch(rightSide, () => {
      applyPosition();
    });
    watch(size, (val) => {
      applyPosition();
      updateSizeOnLayout(props.miniToOverlay, val);
    });
    watch(() => props.miniToOverlay, (val) => {
      updateSizeOnLayout(val, size.value);
    });
    watch(() => $q.lang.rtl, () => {
      applyPosition();
    });
    watch(() => props.mini, () => {
      if (props.modelValue === true) {
        animateMini();
        $layout.animate();
      }
    });
    watch(isMini, (val) => {
      emit("miniState", val);
    });
    function applyPosition(position) {
      if (position === void 0) {
        nextTick(() => {
          position = showing.value === true ? 0 : size.value;
          applyPosition(stateDirection.value * position);
        });
      } else {
        if ($layout.isContainer.value === true && rightSide.value === true && (belowBreakpoint.value === true || Math.abs(position) === size.value)) {
          position += stateDirection.value * $layout.scrollbarWidth.value;
        }
        flagContentPosition.value = position;
      }
    }
    function applyBackdrop(x) {
      flagBackdropBg.value = x;
    }
    function setScrollable(v) {
      const action = v === true ? "remove" : $layout.isContainer.value !== true ? "add" : "";
      action !== "" && document.body.classList[action]("q-body--drawer-toggle");
    }
    function animateMini() {
      timerMini !== null && clearTimeout(timerMini);
      if (vm.proxy && vm.proxy.$el) {
        vm.proxy.$el.classList.add("q-drawer--mini-animate");
      }
      flagMiniAnimate.value = true;
      timerMini = setTimeout(() => {
        timerMini = null;
        flagMiniAnimate.value = false;
        if (vm && vm.proxy && vm.proxy.$el) {
          vm.proxy.$el.classList.remove("q-drawer--mini-animate");
        }
      }, 150);
    }
    function onOpenPan(evt) {
      if (showing.value !== false) {
        return;
      }
      const width = size.value, position = between(evt.distance.x, 0, width);
      if (evt.isFinal === true) {
        const opened = position >= Math.min(75, width);
        if (opened === true) {
          show();
        } else {
          $layout.animate();
          applyBackdrop(0);
          applyPosition(stateDirection.value * width);
        }
        flagPanning.value = false;
        return;
      }
      applyPosition(
        ($q.lang.rtl === true ? rightSide.value !== true : rightSide.value) ? Math.max(width - position, 0) : Math.min(0, position - width)
      );
      applyBackdrop(
        between(position / width, 0, 1)
      );
      if (evt.isFirst === true) {
        flagPanning.value = true;
      }
    }
    function onClosePan(evt) {
      if (showing.value !== true) {
        return;
      }
      const width = size.value, dir = evt.direction === props.side, position = ($q.lang.rtl === true ? dir !== true : dir) ? between(evt.distance.x, 0, width) : 0;
      if (evt.isFinal === true) {
        const opened = Math.abs(position) < Math.min(75, width);
        if (opened === true) {
          $layout.animate();
          applyBackdrop(1);
          applyPosition(0);
        } else {
          hide();
        }
        flagPanning.value = false;
        return;
      }
      applyPosition(stateDirection.value * position);
      applyBackdrop(between(1 - position / width, 0, 1));
      if (evt.isFirst === true) {
        flagPanning.value = true;
      }
    }
    function cleanup() {
      preventBodyScroll(false);
      setScrollable(true);
    }
    function updateLayout(prop, val) {
      $layout.update(props.side, prop, val);
    }
    function updateLocal(prop, val) {
      if (prop.value !== val) {
        prop.value = val;
      }
    }
    function updateSizeOnLayout(miniToOverlay, size2) {
      updateLayout("size", miniToOverlay === true ? props.miniWidth : size2);
    }
    $layout.instances[props.side] = instance;
    updateSizeOnLayout(props.miniToOverlay, size.value);
    updateLayout("space", onLayout.value);
    updateLayout("offset", offset.value);
    if (props.showIfAbove === true && props.modelValue !== true && showing.value === true && props["onUpdate:modelValue"] !== void 0) {
      emit("update:modelValue", true);
    }
    onMounted(() => {
      emit("onLayout", onLayout.value);
      emit("miniState", isMini.value);
      lastDesktopState = props.showIfAbove === true;
      const fn = () => {
        const action = showing.value === true ? handleShow : handleHide;
        action(false, true);
      };
      if ($layout.totalWidth.value !== 0) {
        nextTick(fn);
        return;
      }
      layoutTotalWidthWatcher = watch($layout.totalWidth, () => {
        layoutTotalWidthWatcher();
        layoutTotalWidthWatcher = void 0;
        if (showing.value === false && props.showIfAbove === true && belowBreakpoint.value === false) {
          show(false);
        } else {
          fn();
        }
      });
    });
    onBeforeUnmount(() => {
      layoutTotalWidthWatcher !== void 0 && layoutTotalWidthWatcher();
      if (timerMini !== null) {
        clearTimeout(timerMini);
        timerMini = null;
      }
      showing.value === true && cleanup();
      if ($layout.instances[props.side] === instance) {
        $layout.instances[props.side] = void 0;
        updateLayout("size", 0);
        updateLayout("offset", 0);
        updateLayout("space", false);
      }
    });
    return () => {
      const child = [];
      if (belowBreakpoint.value === true) {
        props.noSwipeOpen === false && child.push(
          withDirectives(
            h("div", {
              key: "open",
              class: `q-drawer__opener fixed-${props.side}`,
              "aria-hidden": "true"
            }),
            openDirective.value
          )
        );
        child.push(
          hDir(
            "div",
            {
              ref: "backdrop",
              class: backdropClass.value,
              style: backdropStyle.value,
              "aria-hidden": "true",
              onClick: hide
            },
            void 0,
            "backdrop",
            props.noSwipeBackdrop !== true && showing.value === true,
            () => backdropCloseDirective.value
          )
        );
      }
      const mini = isMini.value === true && slots.mini !== void 0;
      const content = [
        h(
          "div",
          {
            ...attrs,
            key: "" + mini,
            class: [
              contentClass.value,
              attrs.class
            ]
          },
          mini === true ? slots.mini() : hSlot(slots.default)
        )
      ];
      if (props.elevated === true && showing.value === true) {
        content.push(
          h("div", {
            class: "q-layout__shadow absolute-full overflow-hidden no-pointer-events"
          })
        );
      }
      child.push(
        hDir(
          "aside",
          { ref: "content", class: classes.value, style: style.value },
          content,
          "contentclose",
          props.noSwipeClose !== true && belowBreakpoint.value === true,
          () => contentCloseDirective.value
        )
      );
      return h("div", { class: "q-drawer-container" }, child);
    };
  }
});
const alignValues = ["top", "middle", "bottom"];
var QBadge = createComponent({
  name: "QBadge",
  props: {
    color: String,
    textColor: String,
    floating: Boolean,
    transparent: Boolean,
    multiLine: Boolean,
    outline: Boolean,
    rounded: Boolean,
    label: [Number, String],
    align: {
      type: String,
      validator: (v) => alignValues.includes(v)
    }
  },
  setup(props, { slots }) {
    const style = computed(() => {
      return props.align !== void 0 ? { verticalAlign: props.align } : null;
    });
    const classes = computed(() => {
      const text = props.outline === true ? props.color || props.textColor : props.textColor;
      return `q-badge flex inline items-center no-wrap q-badge--${props.multiLine === true ? "multi" : "single"}-line` + (props.outline === true ? " q-badge--outline" : props.color !== void 0 ? ` bg-${props.color}` : "") + (text !== void 0 ? ` text-${text}` : "") + (props.floating === true ? " q-badge--floating" : "") + (props.rounded === true ? " q-badge--rounded" : "") + (props.transparent === true ? " q-badge--transparent" : "");
    });
    return () => h("div", {
      class: classes.value,
      style: style.value,
      role: "status",
      "aria-label": props.label
    }, hMergeSlot(slots.default, props.label !== void 0 ? [props.label] : []));
  }
});
var QSlideTransition = createComponent({
  name: "QSlideTransition",
  props: {
    appear: Boolean,
    duration: {
      type: Number,
      default: 300
    }
  },
  emits: ["show", "hide"],
  setup(props, { slots, emit }) {
    let animating = false, doneFn, element;
    let timer = null, timerFallback = null, animListener, lastEvent;
    function cleanup() {
      doneFn && doneFn();
      doneFn = null;
      animating = false;
      if (timer !== null) {
        clearTimeout(timer);
        timer = null;
      }
      if (timerFallback !== null) {
        clearTimeout(timerFallback);
        timerFallback = null;
      }
      element !== void 0 && element.removeEventListener("transitionend", animListener);
      animListener = null;
    }
    function begin(el, height, done) {
      if (height !== void 0) {
        el.style.height = `${height}px`;
      }
      el.style.transition = `height ${props.duration}ms cubic-bezier(.25, .8, .50, 1)`;
      animating = true;
      doneFn = done;
    }
    function end(el, event) {
      el.style.overflowY = null;
      el.style.height = null;
      el.style.transition = null;
      cleanup();
      event !== lastEvent && emit(event);
    }
    function onEnter(el, done) {
      let pos = 0;
      element = el;
      if (animating === true) {
        cleanup();
        pos = el.offsetHeight === el.scrollHeight ? 0 : void 0;
      } else {
        lastEvent = "hide";
        el.style.overflowY = "hidden";
      }
      begin(el, pos, done);
      timer = setTimeout(() => {
        timer = null;
        el.style.height = `${el.scrollHeight}px`;
        animListener = (evt) => {
          timerFallback = null;
          if (Object(evt) !== evt || evt.target === el) {
            end(el, "show");
          }
        };
        el.addEventListener("transitionend", animListener);
        timerFallback = setTimeout(animListener, props.duration * 1.1);
      }, 100);
    }
    function onLeave(el, done) {
      let pos;
      element = el;
      if (animating === true) {
        cleanup();
      } else {
        lastEvent = "show";
        el.style.overflowY = "hidden";
        pos = el.scrollHeight;
      }
      begin(el, pos, done);
      timer = setTimeout(() => {
        timer = null;
        el.style.height = 0;
        animListener = (evt) => {
          timerFallback = null;
          if (Object(evt) !== evt || evt.target === el) {
            end(el, "hide");
          }
        };
        el.addEventListener("transitionend", animListener);
        timerFallback = setTimeout(animListener, props.duration * 1.1);
      }, 100);
    }
    onBeforeUnmount(() => {
      animating === true && cleanup();
    });
    return () => h(Transition, {
      css: false,
      appear: props.appear,
      onEnter,
      onLeave
    }, slots.default);
  }
});
const itemGroups = shallowReactive({});
const LINK_PROPS = Object.keys(useRouterLinkProps);
var QExpansionItem = createComponent({
  name: "QExpansionItem",
  props: {
    ...useRouterLinkProps,
    ...useModelToggleProps,
    ...useDarkProps,
    icon: String,
    label: String,
    labelLines: [Number, String],
    caption: String,
    captionLines: [Number, String],
    dense: Boolean,
    toggleAriaLabel: String,
    expandIcon: String,
    expandedIcon: String,
    expandIconClass: [Array, String, Object],
    duration: Number,
    headerInsetLevel: Number,
    contentInsetLevel: Number,
    expandSeparator: Boolean,
    defaultOpened: Boolean,
    hideExpandIcon: Boolean,
    expandIconToggle: Boolean,
    switchToggleSide: Boolean,
    denseToggle: Boolean,
    group: String,
    popup: Boolean,
    headerStyle: [Array, String, Object],
    headerClass: [Array, String, Object]
  },
  emits: [
    ...useModelToggleEmits,
    "click",
    "afterShow",
    "afterHide"
  ],
  setup(props, { slots, emit }) {
    const { proxy: { $q } } = getCurrentInstance();
    const isDark = useDark(props, $q);
    const showing = ref(
      props.modelValue !== null ? props.modelValue : props.defaultOpened
    );
    const blurTargetRef = ref(null);
    const targetUid = uid();
    const { show, hide, toggle } = useModelToggle({ showing });
    let uniqueId, exitGroup;
    const classes = computed(
      () => `q-expansion-item q-item-type q-expansion-item--${showing.value === true ? "expanded" : "collapsed"} q-expansion-item--${props.popup === true ? "popup" : "standard"}`
    );
    const contentStyle = computed(() => {
      if (props.contentInsetLevel === void 0) {
        return null;
      }
      const dir = $q.lang.rtl === true ? "Right" : "Left";
      return {
        ["padding" + dir]: props.contentInsetLevel * 56 + "px"
      };
    });
    const hasLink = computed(
      () => props.disable !== true && (props.href !== void 0 || props.to !== void 0 && props.to !== null && props.to !== "")
    );
    const linkProps = computed(() => {
      const acc = {};
      LINK_PROPS.forEach((key) => {
        acc[key] = props[key];
      });
      return acc;
    });
    const isClickable = computed(
      () => hasLink.value === true || props.expandIconToggle !== true
    );
    const expansionIcon = computed(() => props.expandedIcon !== void 0 && showing.value === true ? props.expandedIcon : props.expandIcon || $q.iconSet.expansionItem[props.denseToggle === true ? "denseIcon" : "icon"]);
    const activeToggleIcon = computed(
      () => props.disable !== true && (hasLink.value === true || props.expandIconToggle === true)
    );
    const headerSlotScope = computed(() => ({
      expanded: showing.value === true,
      detailsId: props.targetUid,
      toggle,
      show,
      hide
    }));
    const toggleAriaAttrs = computed(() => {
      const toggleAriaLabel = props.toggleAriaLabel !== void 0 ? props.toggleAriaLabel : $q.lang.label[showing.value === true ? "collapse" : "expand"](props.label);
      return {
        role: "button",
        "aria-expanded": showing.value === true ? "true" : "false",
        "aria-controls": targetUid,
        "aria-label": toggleAriaLabel
      };
    });
    watch(() => props.group, (name) => {
      exitGroup !== void 0 && exitGroup();
      name !== void 0 && enterGroup();
    });
    function onHeaderClick(e) {
      hasLink.value !== true && toggle(e);
      emit("click", e);
    }
    function toggleIconKeyboard(e) {
      e.keyCode === 13 && toggleIcon(e, true);
    }
    function toggleIcon(e, keyboard) {
      keyboard !== true && blurTargetRef.value !== null && blurTargetRef.value.focus();
      toggle(e);
      stopAndPrevent(e);
    }
    function onShow() {
      emit("afterShow");
    }
    function onHide() {
      emit("afterHide");
    }
    function enterGroup() {
      if (uniqueId === void 0) {
        uniqueId = uid();
      }
      if (showing.value === true) {
        itemGroups[props.group] = uniqueId;
      }
      const show2 = watch(showing, (val) => {
        if (val === true) {
          itemGroups[props.group] = uniqueId;
        } else if (itemGroups[props.group] === uniqueId) {
          delete itemGroups[props.group];
        }
      });
      const group = watch(
        () => itemGroups[props.group],
        (val, oldVal) => {
          if (oldVal === uniqueId && val !== void 0 && val !== uniqueId) {
            hide();
          }
        }
      );
      exitGroup = () => {
        show2();
        group();
        if (itemGroups[props.group] === uniqueId) {
          delete itemGroups[props.group];
        }
        exitGroup = void 0;
      };
    }
    function getToggleIcon() {
      const data = {
        class: [
          `q-focusable relative-position cursor-pointer${props.denseToggle === true && props.switchToggleSide === true ? " items-end" : ""}`,
          props.expandIconClass
        ],
        side: props.switchToggleSide !== true,
        avatar: props.switchToggleSide
      };
      const child = [
        h(QIcon, {
          class: "q-expansion-item__toggle-icon" + (props.expandedIcon === void 0 && showing.value === true ? " q-expansion-item__toggle-icon--rotated" : ""),
          name: expansionIcon.value
        })
      ];
      if (activeToggleIcon.value === true) {
        Object.assign(data, {
          tabindex: 0,
          ...toggleAriaAttrs.value,
          onClick: toggleIcon,
          onKeyup: toggleIconKeyboard
        });
        child.unshift(
          h("div", {
            ref: blurTargetRef,
            class: "q-expansion-item__toggle-focus q-icon q-focus-helper q-focus-helper--rounded",
            tabindex: -1
          })
        );
      }
      return h(QItemSection, data, () => child);
    }
    function getHeaderChild() {
      let child;
      if (slots.header !== void 0) {
        child = [].concat(slots.header(headerSlotScope.value));
      } else {
        child = [
          h(QItemSection, () => [
            h(QItemLabel, { lines: props.labelLines }, () => props.label || ""),
            props.caption ? h(QItemLabel, { lines: props.captionLines, caption: true }, () => props.caption) : null
          ])
        ];
        props.icon && child[props.switchToggleSide === true ? "push" : "unshift"](
          h(QItemSection, {
            side: props.switchToggleSide === true,
            avatar: props.switchToggleSide !== true
          }, () => h(QIcon, { name: props.icon }))
        );
      }
      if (props.disable !== true && props.hideExpandIcon !== true) {
        child[props.switchToggleSide === true ? "unshift" : "push"](
          getToggleIcon()
        );
      }
      return child;
    }
    function getHeader() {
      const data = {
        ref: "item",
        style: props.headerStyle,
        class: props.headerClass,
        dark: isDark.value,
        disable: props.disable,
        dense: props.dense,
        insetLevel: props.headerInsetLevel
      };
      if (isClickable.value === true) {
        data.clickable = true;
        data.onClick = onHeaderClick;
        Object.assign(
          data,
          hasLink.value === true ? linkProps.value : toggleAriaAttrs.value
        );
      }
      return h(QItem, data, getHeaderChild);
    }
    function getTransitionChild() {
      return withDirectives(
        h("div", {
          key: "e-content",
          class: "q-expansion-item__content relative-position",
          style: contentStyle.value,
          id: targetUid
        }, hSlot(slots.default)),
        [[
          vShow,
          showing.value
        ]]
      );
    }
    function getContent() {
      const node = [
        getHeader(),
        h(QSlideTransition, {
          duration: props.duration,
          onShow,
          onHide
        }, getTransitionChild)
      ];
      if (props.expandSeparator === true) {
        node.push(
          h(QSeparator, {
            class: "q-expansion-item__border q-expansion-item__border--top absolute-top",
            dark: isDark.value
          }),
          h(QSeparator, {
            class: "q-expansion-item__border q-expansion-item__border--bottom absolute-bottom",
            dark: isDark.value
          })
        );
      }
      return node;
    }
    props.group !== void 0 && enterGroup();
    onBeforeUnmount(() => {
      exitGroup !== void 0 && exitGroup();
    });
    return () => h("div", { class: classes.value }, [
      h("div", { class: "q-expansion-item__container relative-position" }, getContent())
    ]);
  }
});
var ShoppingList_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$2 = {
  name: "ShoppingList",
  props: ["shoppingListInfo"],
  emits: ["deletedList", "editedList"],
  data() {
    return {
      showDeleteList: false,
      showEditList: false,
      timer: null,
      newName: ""
    };
  },
  mounted() {
    this.newName = this.shoppingListInfo.name;
  },
  beforeUnmount() {
    clearTimeout(this.timer);
  },
  methods: {
    finalize(reset) {
      this.timer = setTimeout(() => {
        reset();
      }, 1e3);
    },
    goToShoppingListPage() {
      console.log(this.shoppingListInfo);
      this.$router.push(`/shopping/${this.shoppingListInfo._id}`);
    },
    showDeleteListDialog({ reset }) {
      this.showDeleteList = true;
      this.finalize(reset);
    },
    showEditListDialog({ reset }) {
      this.showEditList = true;
      this.finalize(reset);
    },
    async saveName() {
      try {
        const data = {
          name: this.newName
        };
        const res = await this.$api.patch(
          `/shopping-lists/patch-shopping-list/${this.shoppingListInfo._id}`,
          data
        );
        if (res.data.status === "success") {
          this.$emit("editedList", this.shoppingListInfo, this.newName);
          this.showEditList = false;
        }
      } catch (err) {
        console.log(err);
      }
    },
    async deleteShoppingList() {
      try {
        const res = await this.$api.delete(
          `/shopping-lists/delete-shopping-list/${this.shoppingListInfo._id}`
        );
        if (res.data.status === "success") {
          this.$emit("deletedList", this.shoppingListInfo);
          this.showDeleteList = false;
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
};
const _withScopeId$1 = (n) => (pushScopeId("data-v-9008b454"), n = n(), popScopeId(), n);
const _hoisted_1$2 = { class: "row items-center" };
const _hoisted_2$2 = { class: "row items-center" };
const _hoisted_3$1 = { class: "flex list-item" };
const _hoisted_4$1 = { class: "q-ml-sm" };
const _hoisted_5$1 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("span", null, "Edit list name ", -1));
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(Fragment, null, [
    createVNode(QSlideItem, {
      onRight: $options.showDeleteListDialog,
      onLeft: $options.showEditListDialog
    }, {
      left: withCtx(() => [
        createBaseVNode("div", _hoisted_1$2, [
          createVNode(QIcon, {
            left: "",
            name: "edit"
          }),
          createTextVNode(" Edit")
        ])
      ]),
      right: withCtx(() => [
        createBaseVNode("div", _hoisted_2$2, [
          createTextVNode("Delete "),
          createVNode(QIcon, {
            right: "",
            name: "delete"
          })
        ])
      ]),
      default: withCtx(() => [
        createVNode(QExpansionItem, {
          class: "shopping-list-expension-item",
          "expand-separator": "",
          icon: "receipt_long",
          label: $props.shoppingListInfo.name,
          caption: `${$props.shoppingListInfo.listItems.length} items | ${$props.shoppingListInfo.status}`,
          to: `/shopping/${this.shoppingListInfo._id}`
        }, {
          default: withCtx(() => [
            (openBlock(true), createElementBlock(Fragment, null, renderList($props.shoppingListInfo.listItems, (listItem) => {
              return openBlock(), createBlock(QCard, {
                class: "items",
                key: listItem._id
              }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_3$1, [
                    createBaseVNode("div", null, toDisplayString(listItem.item), 1),
                    listItem.status === "bought" ? (openBlock(), createBlock(QIcon, {
                      key: 0,
                      name: "done_outline"
                    })) : createCommentVNode("", true),
                    listItem.status === "not_bought" ? (openBlock(), createBlock(QIcon, {
                      key: 1,
                      name: "close"
                    })) : createCommentVNode("", true)
                  ]),
                  createVNode(QSeparator)
                ]),
                _: 2
              }, 1024);
            }), 128))
          ]),
          _: 1
        }, 8, ["label", "caption", "to"])
      ]),
      _: 1
    }, 8, ["onRight", "onLeft"]),
    createVNode(QDialog, {
      modelValue: $data.showDeleteList,
      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.showDeleteList = $event),
      persistent: ""
    }, {
      default: withCtx(() => [
        createVNode(QCard, null, {
          default: withCtx(() => [
            createVNode(QCardSection, { class: "row items-center" }, {
              default: withCtx(() => [
                createBaseVNode("span", _hoisted_4$1, 'Are you sure you want to delete "' + toDisplayString($props.shoppingListInfo.name) + '" list?', 1)
              ]),
              _: 1
            }),
            createVNode(QCardActions, { align: "right" }, {
              default: withCtx(() => [
                withDirectives(createVNode(QBtn, {
                  flat: "",
                  label: "Cancel",
                  color: "primary"
                }, null, 512), [
                  [ClosePopup]
                ]),
                createVNode(QBtn, {
                  flat: "",
                  label: "Delete",
                  color: "red",
                  onClick: $options.deleteShoppingList
                }, null, 8, ["onClick"])
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["modelValue"]),
    createVNode(QDialog, {
      modelValue: $data.showEditList,
      "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.showEditList = $event),
      persistent: ""
    }, {
      default: withCtx(() => [
        createVNode(QCard, null, {
          default: withCtx(() => [
            createVNode(QCardSection, {
              class: "column",
              style: { "width": "80vw" }
            }, {
              default: withCtx(() => [
                _hoisted_5$1,
                createVNode(QInput, {
                  type: "text",
                  modelValue: $data.newName,
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.newName = $event),
                  color: "cyan-9"
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            createVNode(QCardActions, { align: "right" }, {
              default: withCtx(() => [
                withDirectives(createVNode(QBtn, {
                  flat: "",
                  label: "Cancel",
                  color: "red"
                }, null, 512), [
                  [ClosePopup]
                ]),
                createVNode(QBtn, {
                  flat: "",
                  label: "Save",
                  color: "primary",
                  onClick: $options.saveName
                }, null, 8, ["onClick"])
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["modelValue"])
  ], 64);
}
var ShoppingList = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__scopeId", "data-v-9008b454"], ["__file", "ShoppingList.vue"]]);
var CategoryUniqueProducts_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$1 = {
  name: "CategoryUniqueProducts",
  emits: ["goBackToCategories", "update:modelValue"],
  props: ["categoryUniqueProductsInfo", "modelValue"],
  data() {
    return {
      uniqueNames: []
    };
  },
  async mounted() {
    await this.fetchUniqueProductNames();
  },
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      }
    }
  },
  methods: {
    async fetchUniqueProductNames() {
      const res = await this.$api.get(
        `/products/get-unique-names/${this.categoryUniqueProductsInfo._id}`
      );
      this.uniqueNames = res.data.uniqueNamesArray;
    }
  }
};
const _hoisted_1$1 = { class: "one-category" };
const _hoisted_2$1 = { class: "" };
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(Fragment, null, [
    createBaseVNode("div", _hoisted_1$1, [
      createVNode(QIcon, {
        name: "arrow_back_ios",
        onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("goBackToCategories"))
      }),
      createBaseVNode("span", _hoisted_2$1, toDisplayString($props.categoryUniqueProductsInfo.name), 1)
    ]),
    createVNode(QCard, null, {
      default: withCtx(() => [
        createVNode(QList, {
          dense: "",
          bordered: "",
          padding: "",
          class: "rounded-borders"
        }, {
          default: withCtx(() => [
            (openBlock(true), createElementBlock(Fragment, null, renderList($data.uniqueNames, (product) => {
              return withDirectives((openBlock(), createBlock(QItem, {
                key: product,
                tag: "label"
              }, {
                default: withCtx(() => [
                  createVNode(QItemSection, { avatar: "" }, {
                    default: withCtx(() => [
                      createVNode(QCheckbox, {
                        modelValue: $options.value,
                        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $options.value = $event),
                        val: product,
                        color: "cyan-9"
                      }, null, 8, ["modelValue", "val"])
                    ]),
                    _: 2
                  }, 1024),
                  createVNode(QItemSection, null, {
                    default: withCtx(() => [
                      createVNode(QItemLabel, null, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(product), 1)
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    _: 2
                  }, 1024)
                ]),
                _: 2
              }, 1024)), [
                [Ripple]
              ]);
            }), 128))
          ]),
          _: 1
        })
      ]),
      _: 1
    })
  ], 64);
}
var CategoryUniqueProducts = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__scopeId", "data-v-ee1f473c"], ["__file", "CategoryUniqueProducts.vue"]]);
var ShoppingPage_vue_vue_type_style_index_0_scoped_true_lang = "";
var ShoppingPage_vue_vue_type_style_index_1_lang = "";
const _sfc_main = {
  name: "ShoppingPage",
  components: {
    EmptyState,
    ShoppingList,
    CategoryUniqueProducts
  },
  data() {
    return {
      image: "EmptyState.svg",
      title: "Ooops! You are not logged in!",
      message: "Log in to continue shopping",
      shoppingLists: null,
      showNewListDialog: false,
      drawerRight: false,
      search: [],
      query: "",
      products: [],
      categories: [],
      val: false,
      status: "pending",
      selectedProducts: [],
      userStore: useUserStore(),
      $q: useQuasar(),
      timer: null,
      name: new Date().toLocaleDateString("en-GB") + " " + new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      }),
      categoryUniqueProductsInfo: null
    };
  },
  computed: {
    filteredProducts() {
      return this.products.filter(
        (prod) => prod.toLowerCase().indexOf(this.search) > -1
      );
    },
    isDisabled() {
      return !this.selectedProducts.length;
    }
  },
  async mounted() {
    const dashHeader = useDashHeaderStore();
    dashHeader.$patch({
      title: "Shopping Lists",
      showBackIcon: false
    });
    if (this.userStore.authUser) {
      this.fetchShoppingLists();
      await Promise.all([this.fetchCategories(), this.fetchProducts()]);
    }
  },
  methods: {
    async fetchProducts() {
      const res = await this.$api.get("/products/get-unique-names");
      this.products = res.data.data.productNames;
      this.search = [...this.products];
    },
    async fetchCategories() {
      const res = await this.$api.get("/categories");
      this.categories = res.data.data.categories;
    },
    async fetchShoppingLists() {
      const res = await this.$api.get("/shopping-lists/get-shopping-lists");
      this.shoppingLists = res.data.shoppingLists.reverse();
    },
    async createShoppingList() {
      try {
        const data = {
          name: this.name,
          selectedProducts: this.selectedProducts,
          isRecipe: 0
        };
        const res = await this.$api.post(
          "/shopping-lists/create-shopping-list",
          data
        );
        this.$q.loading.show({
          message: "Some important process  is in progress. Hang on..."
        });
        if (res.data.status === "success") {
          this.$q.loading.hide();
          this.$q.notify({
            type: "positive",
            position: "top",
            message: "Shopping list created successfully",
            color: "cyan-9",
            timeout: "2500"
          });
          await this.fetchShoppingLists();
          this.drawerRight = false;
          this.showNewListDialog = false;
        }
      } catch (err) {
        console.log(err);
      }
    },
    viewProductsInCategory(category) {
      this.categoryUniqueProductsInfo = category;
    },
    openDrawer() {
      console.log("IN ");
      this.drawerRight = true;
    },
    filterFn(val, update, abort) {
      if (val.length < 2) {
        abort();
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        this.search = this.products.filter(
          (v) => v.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    addProductFromSearch() {
      this.selectedProducts.push(this.query);
      this.query = "";
      this.$refs.selectProduct.blur();
    },
    removeListFromArray(shoppingListInfo) {
      const index = this.shoppingLists.indexOf(shoppingListInfo);
      if (index > -1) {
        this.shoppingLists.splice(index, 1);
      }
    },
    editListFromArray(shoppingListInfo, newName) {
      const index = this.shoppingLists.indexOf(shoppingListInfo);
      this.shoppingLists[index]["name"] = newName;
    }
  }
};
const _withScopeId = (n) => (pushScopeId("data-v-111bfaaf"), n = n(), popScopeId(), n);
const _hoisted_1 = {
  key: 0,
  class: "q-gutter-md row justify-center"
};
const _hoisted_2 = { key: 1 };
const _hoisted_3 = { class: "shopping-page" };
const _hoisted_4 = {
  class: "q-pa-md",
  style: { "font-size": "16px" }
};
const _hoisted_5 = { key: 0 };
const _hoisted_6 = { class: "q-pa-md flex justify-end" };
const _hoisted_7 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-h6" }, "What do you need?", -1));
const _hoisted_8 = {
  key: 0,
  class: "addToListDialog"
};
const _hoisted_9 = { key: 0 };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_CategoryUniqueProducts = resolveComponent("CategoryUniqueProducts");
  const _component_ShoppingList = resolveComponent("ShoppingList");
  const _component_EmptyState = resolveComponent("EmptyState");
  return openBlock(), createElementBlock(Fragment, null, [
    !$data.shoppingLists && $data.userStore.authUser ? (openBlock(), createElementBlock("div", _hoisted_1, [
      createVNode(QSpinnerOval, {
        color: "cyan-9",
        size: "5em"
      })
    ])) : createCommentVNode("", true),
    $data.shoppingLists && $data.userStore.authUser ? (openBlock(), createElementBlock("div", _hoisted_2, [
      createBaseVNode("div", _hoisted_3, [
        createVNode(QDrawer, {
          side: "right",
          modelValue: $data.drawerRight,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.drawerRight = $event),
          bordered: "",
          elevated: "",
          width: 250,
          breakpoint: 500
        }, {
          default: withCtx(() => [
            createVNode(QScrollArea, { class: "fit" }, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_4, [
                  !$data.selectedProducts.length ? (openBlock(), createElementBlock("div", _hoisted_5, "Shopping cart is empty.")) : createCommentVNode("", true),
                  (openBlock(true), createElementBlock(Fragment, null, renderList($data.selectedProducts, (product) => {
                    return openBlock(), createElementBlock("div", { key: product }, [
                      createTextVNode(toDisplayString(product) + " ", 1),
                      createVNode(QSeparator)
                    ]);
                  }), 128))
                ]),
                createBaseVNode("div", _hoisted_6, [
                  createVNode(QBtn, {
                    onClick: $options.createShoppingList,
                    label: "Create List",
                    color: "cyan-9",
                    rounded: "",
                    disable: $options.isDisabled
                  }, null, 8, ["onClick", "disable"])
                ])
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["modelValue"]),
        createVNode(QDialog, {
          modelValue: $data.showNewListDialog,
          "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $data.showNewListDialog = $event),
          seamless: "",
          position: "bottom",
          class: "addToListDialog"
        }, {
          default: withCtx(() => [
            createVNode(QCard, { class: "q-card__height" }, {
              default: withCtx(() => [
                createVNode(QCardSection, { class: "row items-center q-pb-none" }, {
                  default: withCtx(() => [
                    _hoisted_7,
                    createVNode(QSpace),
                    withDirectives(createVNode(QBtn, {
                      icon: "close",
                      flat: "",
                      round: "",
                      dense: ""
                    }, null, 512), [
                      [ClosePopup]
                    ])
                  ]),
                  _: 1
                }),
                createVNode(QInput, {
                  color: "cyan-9",
                  filled: "",
                  modelValue: $data.name,
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.name = $event),
                  label: "List name",
                  class: "q-mb-md"
                }, {
                  prepend: withCtx(() => [
                    createVNode(QIcon, { name: "edit_note" })
                  ]),
                  _: 1
                }, 8, ["modelValue"]),
                createVNode(QSeparator),
                createVNode(QSelect, {
                  class: "searchProduct",
                  ref: "selectProduct",
                  label: "Search for product",
                  filled: "",
                  modelValue: $data.query,
                  "onUpdate:modelValue": [
                    _cache[2] || (_cache[2] = ($event) => $data.query = $event),
                    $options.addProductFromSearch
                  ],
                  "use-input": "",
                  "hide-selected": "",
                  "fill-input": "",
                  "input-debounce": "0",
                  options: $data.search,
                  onFilter: $options.filterFn,
                  hint: "Minimum 2 characters to trigger filtering",
                  style: { "width": "100%", "padding-bottom": "32px" }
                }, {
                  "no-option": withCtx(() => [
                    createVNode(QItem, null, {
                      default: withCtx(() => [
                        createVNode(QItemSection, { class: "text-grey" }, {
                          default: withCtx(() => [
                            createTextVNode(" No results ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  prepend: withCtx(() => [
                    createVNode(QIcon, { name: "search" })
                  ]),
                  _: 1
                }, 8, ["modelValue", "options", "onUpdate:modelValue", "onFilter"]),
                !$data.categoryUniqueProductsInfo ? (openBlock(), createElementBlock("div", _hoisted_8, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList($data.categories, (category) => {
                    return withDirectives((openBlock(), createBlock(QItem, {
                      clickable: "",
                      key: category._id
                    }, {
                      default: withCtx(() => [
                        createVNode(QItemSection, {
                          thumbnail: "",
                          style: { "padding-left": "10px" }
                        }, {
                          default: withCtx(() => [
                            createVNode(QIcon, {
                              name: category.icon
                            }, null, 8, ["name"])
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(QItemSection, {
                          onClick: ($event) => $options.viewProductsInCategory(category)
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(category.name), 1)
                          ]),
                          _: 2
                        }, 1032, ["onClick"])
                      ]),
                      _: 2
                    }, 1024)), [
                      [Ripple]
                    ]);
                  }), 128))
                ])) : createCommentVNode("", true),
                $data.categoryUniqueProductsInfo ? (openBlock(), createBlock(_component_CategoryUniqueProducts, {
                  key: 1,
                  categoryUniqueProductsInfo: $data.categoryUniqueProductsInfo,
                  onGoBackToCategories: _cache[3] || (_cache[3] = ($event) => $data.categoryUniqueProductsInfo = null),
                  modelValue: $data.selectedProducts,
                  "onUpdate:modelValue": _cache[4] || (_cache[4] = (value) => $data.selectedProducts = value)
                }, null, 8, ["categoryUniqueProductsInfo", "modelValue"])) : createCommentVNode("", true),
                createVNode(QBtn, {
                  fab: "",
                  icon: "shopping_cart",
                  color: "cyan-9",
                  class: "shopping-page-sticky-btn",
                  onClick: $options.openDrawer
                }, {
                  default: withCtx(() => [
                    $data.selectedProducts.length ? (openBlock(), createBlock(QBadge, {
                      key: 0,
                      color: "red",
                      floating: ""
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString($data.selectedProducts.length), 1)
                      ]),
                      _: 1
                    })) : createCommentVNode("", true)
                  ]),
                  _: 1
                }, 8, ["onClick"])
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["modelValue"]),
        $data.userStore.authUser ? (openBlock(), createElementBlock("div", _hoisted_9, [
          createVNode(QBtn, {
            class: "newlist-btn",
            onClick: _cache[6] || (_cache[6] = ($event) => $data.showNewListDialog = true),
            label: "New List"
          }),
          (openBlock(true), createElementBlock(Fragment, null, renderList($data.shoppingLists, (shoppingList) => {
            return openBlock(), createBlock(_component_ShoppingList, {
              key: shoppingList.id,
              shoppingListInfo: shoppingList,
              onDeletedList: $options.removeListFromArray,
              onEditedList: $options.editListFromArray
            }, null, 8, ["shoppingListInfo", "onDeletedList", "onEditedList"]);
          }), 128))
        ])) : createCommentVNode("", true)
      ])
    ])) : createCommentVNode("", true),
    !$data.userStore.authUser ? (openBlock(), createBlock(_component_EmptyState, {
      key: 2,
      image: $data.image,
      title: $data.title,
      message: $data.message
    }, null, 8, ["image", "title", "message"])) : createCommentVNode("", true)
  ], 64);
}
var ShoppingPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-111bfaaf"], ["__file", "ShoppingPage.vue"]]);
export { ShoppingPage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2hvcHBpbmdQYWdlLjVjYTQyOTFiLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3Njcm9sbC1hcmVhL1FTY3JvbGxBcmVhLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9kcmF3ZXIvUURyYXdlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvYmFkZ2UvUUJhZGdlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9zbGlkZS10cmFuc2l0aW9uL1FTbGlkZVRyYW5zaXRpb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2V4cGFuc2lvbi1pdGVtL1FFeHBhbnNpb25JdGVtLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvY3VzdG9tZXIvU2hvcHBpbmdMaXN0LnZ1ZSIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2N1c3RvbWVyL0NhdGVnb3J5VW5pcXVlUHJvZHVjdHMudnVlIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL1Nob3BwaW5nUGFnZS52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaCwgcmVmLCBjb21wdXRlZCwgd2F0Y2gsIHdpdGhEaXJlY3RpdmVzLCBvbkFjdGl2YXRlZCwgb25EZWFjdGl2YXRlZCwgb25CZWZvcmVVbm1vdW50LCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB1c2VEYXJrLCB7IHVzZURhcmtQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWRhcmsuanMnXG5cbmltcG9ydCBRUmVzaXplT2JzZXJ2ZXIgZnJvbSAnLi4vcmVzaXplLW9ic2VydmVyL1FSZXNpemVPYnNlcnZlci5qcydcbmltcG9ydCBRU2Nyb2xsT2JzZXJ2ZXIgZnJvbSAnLi4vc2Nyb2xsLW9ic2VydmVyL1FTY3JvbGxPYnNlcnZlci5qcydcblxuaW1wb3J0IFRvdWNoUGFuIGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvVG91Y2hQYW4uanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgYmV0d2VlbiB9IGZyb20gJy4uLy4uL3V0aWxzL2Zvcm1hdC5qcydcbmltcG9ydCB7IHNldFZlcnRpY2FsU2Nyb2xsUG9zaXRpb24sIHNldEhvcml6b250YWxTY3JvbGxQb3NpdGlvbiB9IGZyb20gJy4uLy4uL3V0aWxzL3Njcm9sbC5qcydcbmltcG9ydCB7IGhNZXJnZVNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcbmltcG9ydCBkZWJvdW5jZSBmcm9tICcuLi8uLi91dGlscy9kZWJvdW5jZS5qcydcblxuY29uc3QgYXhpc0xpc3QgPSBbICd2ZXJ0aWNhbCcsICdob3Jpem9udGFsJyBdXG5jb25zdCBkaXJQcm9wcyA9IHtcbiAgdmVydGljYWw6IHsgb2Zmc2V0OiAnb2Zmc2V0WScsIHNjcm9sbDogJ3Njcm9sbFRvcCcsIGRpcjogJ2Rvd24nLCBkaXN0OiAneScgfSxcbiAgaG9yaXpvbnRhbDogeyBvZmZzZXQ6ICdvZmZzZXRYJywgc2Nyb2xsOiAnc2Nyb2xsTGVmdCcsIGRpcjogJ3JpZ2h0JywgZGlzdDogJ3gnIH1cbn1cbmNvbnN0IHBhbk9wdHMgPSB7XG4gIHByZXZlbnQ6IHRydWUsXG4gIG1vdXNlOiB0cnVlLFxuICBtb3VzZUFsbERpcjogdHJ1ZVxufVxuXG5jb25zdCBnZXRNaW5UaHVtYlNpemUgPSBzaXplID0+IChzaXplID49IDI1MCA/IDUwIDogTWF0aC5jZWlsKHNpemUgLyA1KSlcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FTY3JvbGxBcmVhJyxcblxuICBwcm9wczoge1xuICAgIC4uLnVzZURhcmtQcm9wcyxcblxuICAgIHRodW1iU3R5bGU6IE9iamVjdCxcbiAgICB2ZXJ0aWNhbFRodW1iU3R5bGU6IE9iamVjdCxcbiAgICBob3Jpem9udGFsVGh1bWJTdHlsZTogT2JqZWN0LFxuXG4gICAgYmFyU3R5bGU6IFsgQXJyYXksIFN0cmluZywgT2JqZWN0IF0sXG4gICAgdmVydGljYWxCYXJTdHlsZTogWyBBcnJheSwgU3RyaW5nLCBPYmplY3QgXSxcbiAgICBob3Jpem9udGFsQmFyU3R5bGU6IFsgQXJyYXksIFN0cmluZywgT2JqZWN0IF0sXG5cbiAgICBjb250ZW50U3R5bGU6IFsgQXJyYXksIFN0cmluZywgT2JqZWN0IF0sXG4gICAgY29udGVudEFjdGl2ZVN0eWxlOiBbIEFycmF5LCBTdHJpbmcsIE9iamVjdCBdLFxuXG4gICAgZGVsYXk6IHtcbiAgICAgIHR5cGU6IFsgU3RyaW5nLCBOdW1iZXIgXSxcbiAgICAgIGRlZmF1bHQ6IDEwMDBcbiAgICB9LFxuXG4gICAgdmlzaWJsZToge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICB9LFxuXG4gICAgdGFiaW5kZXg6IFsgU3RyaW5nLCBOdW1iZXIgXSxcblxuICAgIG9uU2Nyb2xsOiBGdW5jdGlvblxuICB9LFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cywgZW1pdCB9KSB7XG4gICAgLy8gc3RhdGUgbWFuYWdlbWVudFxuICAgIGNvbnN0IHRlbXBTaG93aW5nID0gcmVmKGZhbHNlKVxuICAgIGNvbnN0IHBhbm5pbmcgPSByZWYoZmFsc2UpXG4gICAgY29uc3QgaG92ZXIgPSByZWYoZmFsc2UpXG5cbiAgICAvLyBvdGhlci4uLlxuICAgIGNvbnN0IGNvbnRhaW5lciA9IHtcbiAgICAgIHZlcnRpY2FsOiByZWYoMCksXG4gICAgICBob3Jpem9udGFsOiByZWYoMClcbiAgICB9XG5cbiAgICBjb25zdCBzY3JvbGwgPSB7XG4gICAgICB2ZXJ0aWNhbDoge1xuICAgICAgICByZWY6IHJlZihudWxsKSxcbiAgICAgICAgcG9zaXRpb246IHJlZigwKSxcbiAgICAgICAgc2l6ZTogcmVmKDApXG4gICAgICB9LFxuXG4gICAgICBob3Jpem9udGFsOiB7XG4gICAgICAgIHJlZjogcmVmKG51bGwpLFxuICAgICAgICBwb3NpdGlvbjogcmVmKDApLFxuICAgICAgICBzaXplOiByZWYoMClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCB7IHByb3h5IH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuXG4gICAgY29uc3QgaXNEYXJrID0gdXNlRGFyayhwcm9wcywgcHJveHkuJHEpXG5cbiAgICBsZXQgdGltZXIgPSBudWxsLCBwYW5SZWZQb3NcblxuICAgIGNvbnN0IHRhcmdldFJlZiA9IHJlZihudWxsKVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAncS1zY3JvbGxhcmVhJ1xuICAgICAgKyAoaXNEYXJrLnZhbHVlID09PSB0cnVlID8gJyBxLXNjcm9sbGFyZWEtLWRhcmsnIDogJycpXG4gICAgKVxuXG4gICAgc2Nyb2xsLnZlcnRpY2FsLnBlcmNlbnRhZ2UgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCBkaWZmID0gc2Nyb2xsLnZlcnRpY2FsLnNpemUudmFsdWUgLSBjb250YWluZXIudmVydGljYWwudmFsdWVcbiAgICAgIGlmIChkaWZmIDw9IDApIHsgcmV0dXJuIDAgfVxuICAgICAgY29uc3QgcCA9IGJldHdlZW4oc2Nyb2xsLnZlcnRpY2FsLnBvc2l0aW9uLnZhbHVlIC8gZGlmZiwgMCwgMSlcbiAgICAgIHJldHVybiBNYXRoLnJvdW5kKHAgKiAxMDAwMCkgLyAxMDAwMFxuICAgIH0pXG4gICAgc2Nyb2xsLnZlcnRpY2FsLnRodW1iSGlkZGVuID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIChcbiAgICAgICAgKHByb3BzLnZpc2libGUgPT09IG51bGwgPyBob3Zlci52YWx1ZSA6IHByb3BzLnZpc2libGUpICE9PSB0cnVlXG4gICAgICAgICYmIHRlbXBTaG93aW5nLnZhbHVlID09PSBmYWxzZVxuICAgICAgICAmJiBwYW5uaW5nLnZhbHVlID09PSBmYWxzZVxuICAgICAgKSB8fCBzY3JvbGwudmVydGljYWwuc2l6ZS52YWx1ZSA8PSBjb250YWluZXIudmVydGljYWwudmFsdWUgKyAxXG4gICAgKVxuICAgIHNjcm9sbC52ZXJ0aWNhbC50aHVtYlN0YXJ0ID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIHNjcm9sbC52ZXJ0aWNhbC5wZXJjZW50YWdlLnZhbHVlICogKGNvbnRhaW5lci52ZXJ0aWNhbC52YWx1ZSAtIHNjcm9sbC52ZXJ0aWNhbC50aHVtYlNpemUudmFsdWUpXG4gICAgKVxuICAgIHNjcm9sbC52ZXJ0aWNhbC50aHVtYlNpemUgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgTWF0aC5yb3VuZChcbiAgICAgICAgYmV0d2VlbihcbiAgICAgICAgICBjb250YWluZXIudmVydGljYWwudmFsdWUgKiBjb250YWluZXIudmVydGljYWwudmFsdWUgLyBzY3JvbGwudmVydGljYWwuc2l6ZS52YWx1ZSxcbiAgICAgICAgICBnZXRNaW5UaHVtYlNpemUoY29udGFpbmVyLnZlcnRpY2FsLnZhbHVlKSxcbiAgICAgICAgICBjb250YWluZXIudmVydGljYWwudmFsdWVcbiAgICAgICAgKVxuICAgICAgKVxuICAgIClcbiAgICBzY3JvbGwudmVydGljYWwuc3R5bGUgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5wcm9wcy50aHVtYlN0eWxlLFxuICAgICAgICAuLi5wcm9wcy52ZXJ0aWNhbFRodW1iU3R5bGUsXG4gICAgICAgIHRvcDogYCR7IHNjcm9sbC52ZXJ0aWNhbC50aHVtYlN0YXJ0LnZhbHVlIH1weGAsXG4gICAgICAgIGhlaWdodDogYCR7IHNjcm9sbC52ZXJ0aWNhbC50aHVtYlNpemUudmFsdWUgfXB4YFxuICAgICAgfVxuICAgIH0pXG4gICAgc2Nyb2xsLnZlcnRpY2FsLnRodW1iQ2xhc3MgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3Etc2Nyb2xsYXJlYV9fdGh1bWIgcS1zY3JvbGxhcmVhX190aHVtYi0tdiBhYnNvbHV0ZS1yaWdodCdcbiAgICAgICsgKHNjcm9sbC52ZXJ0aWNhbC50aHVtYkhpZGRlbi52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1zY3JvbGxhcmVhX190aHVtYi0taW52aXNpYmxlJyA6ICcnKVxuICAgIClcbiAgICBzY3JvbGwudmVydGljYWwuYmFyQ2xhc3MgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3Etc2Nyb2xsYXJlYV9fYmFyIHEtc2Nyb2xsYXJlYV9fYmFyLS12IGFic29sdXRlLXJpZ2h0J1xuICAgICAgKyAoc2Nyb2xsLnZlcnRpY2FsLnRodW1iSGlkZGVuLnZhbHVlID09PSB0cnVlID8gJyBxLXNjcm9sbGFyZWFfX2Jhci0taW52aXNpYmxlJyA6ICcnKVxuICAgIClcblxuICAgIHNjcm9sbC5ob3Jpem9udGFsLnBlcmNlbnRhZ2UgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCBkaWZmID0gc2Nyb2xsLmhvcml6b250YWwuc2l6ZS52YWx1ZSAtIGNvbnRhaW5lci5ob3Jpem9udGFsLnZhbHVlXG4gICAgICBpZiAoZGlmZiA8PSAwKSB7IHJldHVybiAwIH1cbiAgICAgIGNvbnN0IHAgPSBiZXR3ZWVuKE1hdGguYWJzKHNjcm9sbC5ob3Jpem9udGFsLnBvc2l0aW9uLnZhbHVlKSAvIGRpZmYsIDAsIDEpXG4gICAgICByZXR1cm4gTWF0aC5yb3VuZChwICogMTAwMDApIC8gMTAwMDBcbiAgICB9KVxuICAgIHNjcm9sbC5ob3Jpem9udGFsLnRodW1iSGlkZGVuID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIChcbiAgICAgICAgKHByb3BzLnZpc2libGUgPT09IG51bGwgPyBob3Zlci52YWx1ZSA6IHByb3BzLnZpc2libGUpICE9PSB0cnVlXG4gICAgICAgICYmIHRlbXBTaG93aW5nLnZhbHVlID09PSBmYWxzZVxuICAgICAgICAmJiBwYW5uaW5nLnZhbHVlID09PSBmYWxzZVxuICAgICAgKSB8fCBzY3JvbGwuaG9yaXpvbnRhbC5zaXplLnZhbHVlIDw9IGNvbnRhaW5lci5ob3Jpem9udGFsLnZhbHVlICsgMVxuICAgIClcbiAgICBzY3JvbGwuaG9yaXpvbnRhbC50aHVtYlN0YXJ0ID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIHNjcm9sbC5ob3Jpem9udGFsLnBlcmNlbnRhZ2UudmFsdWUgKiAoY29udGFpbmVyLmhvcml6b250YWwudmFsdWUgLSBzY3JvbGwuaG9yaXpvbnRhbC50aHVtYlNpemUudmFsdWUpXG4gICAgKVxuICAgIHNjcm9sbC5ob3Jpem9udGFsLnRodW1iU2l6ZSA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBNYXRoLnJvdW5kKFxuICAgICAgICBiZXR3ZWVuKFxuICAgICAgICAgIGNvbnRhaW5lci5ob3Jpem9udGFsLnZhbHVlICogY29udGFpbmVyLmhvcml6b250YWwudmFsdWUgLyBzY3JvbGwuaG9yaXpvbnRhbC5zaXplLnZhbHVlLFxuICAgICAgICAgIGdldE1pblRodW1iU2l6ZShjb250YWluZXIuaG9yaXpvbnRhbC52YWx1ZSksXG4gICAgICAgICAgY29udGFpbmVyLmhvcml6b250YWwudmFsdWVcbiAgICAgICAgKVxuICAgICAgKVxuICAgIClcbiAgICBzY3JvbGwuaG9yaXpvbnRhbC5zdHlsZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnByb3BzLnRodW1iU3R5bGUsXG4gICAgICAgIC4uLnByb3BzLmhvcml6b250YWxUaHVtYlN0eWxlLFxuICAgICAgICBbIHByb3h5LiRxLmxhbmcucnRsID09PSB0cnVlID8gJ3JpZ2h0JyA6ICdsZWZ0JyBdOiBgJHsgc2Nyb2xsLmhvcml6b250YWwudGh1bWJTdGFydC52YWx1ZSB9cHhgLFxuICAgICAgICB3aWR0aDogYCR7IHNjcm9sbC5ob3Jpem9udGFsLnRodW1iU2l6ZS52YWx1ZSB9cHhgXG4gICAgICB9XG4gICAgfSlcbiAgICBzY3JvbGwuaG9yaXpvbnRhbC50aHVtYkNsYXNzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICdxLXNjcm9sbGFyZWFfX3RodW1iIHEtc2Nyb2xsYXJlYV9fdGh1bWItLWggYWJzb2x1dGUtYm90dG9tJ1xuICAgICAgKyAoc2Nyb2xsLmhvcml6b250YWwudGh1bWJIaWRkZW4udmFsdWUgPT09IHRydWUgPyAnIHEtc2Nyb2xsYXJlYV9fdGh1bWItLWludmlzaWJsZScgOiAnJylcbiAgICApXG4gICAgc2Nyb2xsLmhvcml6b250YWwuYmFyQ2xhc3MgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3Etc2Nyb2xsYXJlYV9fYmFyIHEtc2Nyb2xsYXJlYV9fYmFyLS1oIGFic29sdXRlLWJvdHRvbSdcbiAgICAgICsgKHNjcm9sbC5ob3Jpem9udGFsLnRodW1iSGlkZGVuLnZhbHVlID09PSB0cnVlID8gJyBxLXNjcm9sbGFyZWFfX2Jhci0taW52aXNpYmxlJyA6ICcnKVxuICAgIClcblxuICAgIGNvbnN0IG1haW5TdHlsZSA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHNjcm9sbC52ZXJ0aWNhbC50aHVtYkhpZGRlbi52YWx1ZSA9PT0gdHJ1ZSAmJiBzY3JvbGwuaG9yaXpvbnRhbC50aHVtYkhpZGRlbi52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICA/IHByb3BzLmNvbnRlbnRTdHlsZVxuICAgICAgICA6IHByb3BzLmNvbnRlbnRBY3RpdmVTdHlsZVxuICAgICkpXG5cbiAgICBjb25zdCB0aHVtYlZlcnREaXIgPSBbIFtcbiAgICAgIFRvdWNoUGFuLFxuICAgICAgZSA9PiB7IG9uUGFuVGh1bWIoZSwgJ3ZlcnRpY2FsJykgfSxcbiAgICAgIHZvaWQgMCxcbiAgICAgIHsgdmVydGljYWw6IHRydWUsIC4uLnBhbk9wdHMgfVxuICAgIF0gXVxuXG4gICAgY29uc3QgdGh1bWJIb3JpekRpciA9IFsgW1xuICAgICAgVG91Y2hQYW4sXG4gICAgICBlID0+IHsgb25QYW5UaHVtYihlLCAnaG9yaXpvbnRhbCcpIH0sXG4gICAgICB2b2lkIDAsXG4gICAgICB7IGhvcml6b250YWw6IHRydWUsIC4uLnBhbk9wdHMgfVxuICAgIF0gXVxuXG4gICAgZnVuY3Rpb24gZ2V0U2Nyb2xsICgpIHtcbiAgICAgIGNvbnN0IGluZm8gPSB7fVxuXG4gICAgICBheGlzTGlzdC5mb3JFYWNoKGF4aXMgPT4ge1xuICAgICAgICBjb25zdCBkYXRhID0gc2Nyb2xsWyBheGlzIF1cblxuICAgICAgICBpbmZvWyBheGlzICsgJ1Bvc2l0aW9uJyBdID0gZGF0YS5wb3NpdGlvbi52YWx1ZVxuICAgICAgICBpbmZvWyBheGlzICsgJ1BlcmNlbnRhZ2UnIF0gPSBkYXRhLnBlcmNlbnRhZ2UudmFsdWVcbiAgICAgICAgaW5mb1sgYXhpcyArICdTaXplJyBdID0gZGF0YS5zaXplLnZhbHVlXG4gICAgICAgIGluZm9bIGF4aXMgKyAnQ29udGFpbmVyU2l6ZScgXSA9IGNvbnRhaW5lclsgYXhpcyBdLnZhbHVlXG4gICAgICB9KVxuXG4gICAgICByZXR1cm4gaW5mb1xuICAgIH1cblxuICAgIC8vIHdlIGhhdmUgbG90cyBvZiBsaXN0ZW5lcnMsIHNvXG4gICAgLy8gZW5zdXJlIHdlJ3JlIG5vdCBlbWl0dGluZyBzYW1lIGluZm9cbiAgICAvLyBtdWx0aXBsZSB0aW1lc1xuICAgIGNvbnN0IGVtaXRTY3JvbGwgPSBkZWJvdW5jZSgoKSA9PiB7XG4gICAgICBjb25zdCBpbmZvID0gZ2V0U2Nyb2xsKClcbiAgICAgIGluZm8ucmVmID0gcHJveHlcbiAgICAgIGVtaXQoJ3Njcm9sbCcsIGluZm8pXG4gICAgfSwgMClcblxuICAgIGZ1bmN0aW9uIGxvY2FsU2V0U2Nyb2xsUG9zaXRpb24gKGF4aXMsIG9mZnNldCwgZHVyYXRpb24pIHtcbiAgICAgIGlmIChheGlzTGlzdC5pbmNsdWRlcyhheGlzKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignW1FTY3JvbGxBcmVhXTogd3JvbmcgZmlyc3QgcGFyYW0gb2Ygc2V0U2Nyb2xsUG9zaXRpb24gKHZlcnRpY2FsL2hvcml6b250YWwpJylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGZuID0gYXhpcyA9PT0gJ3ZlcnRpY2FsJ1xuICAgICAgICA/IHNldFZlcnRpY2FsU2Nyb2xsUG9zaXRpb25cbiAgICAgICAgOiBzZXRIb3Jpem9udGFsU2Nyb2xsUG9zaXRpb25cblxuICAgICAgZm4odGFyZ2V0UmVmLnZhbHVlLCBvZmZzZXQsIGR1cmF0aW9uKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUNvbnRhaW5lciAoeyBoZWlnaHQsIHdpZHRoIH0pIHtcbiAgICAgIGxldCBjaGFuZ2UgPSBmYWxzZVxuXG4gICAgICBpZiAoY29udGFpbmVyLnZlcnRpY2FsLnZhbHVlICE9PSBoZWlnaHQpIHtcbiAgICAgICAgY29udGFpbmVyLnZlcnRpY2FsLnZhbHVlID0gaGVpZ2h0XG4gICAgICAgIGNoYW5nZSA9IHRydWVcbiAgICAgIH1cblxuICAgICAgaWYgKGNvbnRhaW5lci5ob3Jpem9udGFsLnZhbHVlICE9PSB3aWR0aCkge1xuICAgICAgICBjb250YWluZXIuaG9yaXpvbnRhbC52YWx1ZSA9IHdpZHRoXG4gICAgICAgIGNoYW5nZSA9IHRydWVcbiAgICAgIH1cblxuICAgICAgY2hhbmdlID09PSB0cnVlICYmIHN0YXJ0VGltZXIoKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZVNjcm9sbCAoeyBwb3NpdGlvbiB9KSB7XG4gICAgICBsZXQgY2hhbmdlID0gZmFsc2VcblxuICAgICAgaWYgKHNjcm9sbC52ZXJ0aWNhbC5wb3NpdGlvbi52YWx1ZSAhPT0gcG9zaXRpb24udG9wKSB7XG4gICAgICAgIHNjcm9sbC52ZXJ0aWNhbC5wb3NpdGlvbi52YWx1ZSA9IHBvc2l0aW9uLnRvcFxuICAgICAgICBjaGFuZ2UgPSB0cnVlXG4gICAgICB9XG5cbiAgICAgIGlmIChzY3JvbGwuaG9yaXpvbnRhbC5wb3NpdGlvbi52YWx1ZSAhPT0gcG9zaXRpb24ubGVmdCkge1xuICAgICAgICBzY3JvbGwuaG9yaXpvbnRhbC5wb3NpdGlvbi52YWx1ZSA9IHBvc2l0aW9uLmxlZnRcbiAgICAgICAgY2hhbmdlID0gdHJ1ZVxuICAgICAgfVxuXG4gICAgICBjaGFuZ2UgPT09IHRydWUgJiYgc3RhcnRUaW1lcigpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlU2Nyb2xsU2l6ZSAoeyBoZWlnaHQsIHdpZHRoIH0pIHtcbiAgICAgIGlmIChzY3JvbGwuaG9yaXpvbnRhbC5zaXplLnZhbHVlICE9PSB3aWR0aCkge1xuICAgICAgICBzY3JvbGwuaG9yaXpvbnRhbC5zaXplLnZhbHVlID0gd2lkdGhcbiAgICAgICAgc3RhcnRUaW1lcigpXG4gICAgICB9XG5cbiAgICAgIGlmIChzY3JvbGwudmVydGljYWwuc2l6ZS52YWx1ZSAhPT0gaGVpZ2h0KSB7XG4gICAgICAgIHNjcm9sbC52ZXJ0aWNhbC5zaXplLnZhbHVlID0gaGVpZ2h0XG4gICAgICAgIHN0YXJ0VGltZXIoKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uUGFuVGh1bWIgKGUsIGF4aXMpIHtcbiAgICAgIGNvbnN0IGRhdGEgPSBzY3JvbGxbIGF4aXMgXVxuXG4gICAgICBpZiAoZS5pc0ZpcnN0ID09PSB0cnVlKSB7XG4gICAgICAgIGlmIChkYXRhLnRodW1iSGlkZGVuLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBwYW5SZWZQb3MgPSBkYXRhLnBvc2l0aW9uLnZhbHVlXG4gICAgICAgIHBhbm5pbmcudmFsdWUgPSB0cnVlXG4gICAgICB9XG4gICAgICBlbHNlIGlmIChwYW5uaW5nLnZhbHVlICE9PSB0cnVlKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpZiAoZS5pc0ZpbmFsID09PSB0cnVlKSB7XG4gICAgICAgIHBhbm5pbmcudmFsdWUgPSBmYWxzZVxuICAgICAgfVxuXG4gICAgICBjb25zdCBkUHJvcCA9IGRpclByb3BzWyBheGlzIF1cbiAgICAgIGNvbnN0IGNvbnRhaW5lclNpemUgPSBjb250YWluZXJbIGF4aXMgXS52YWx1ZVxuXG4gICAgICBjb25zdCBtdWx0aXBsaWVyID0gKGRhdGEuc2l6ZS52YWx1ZSAtIGNvbnRhaW5lclNpemUpIC8gKGNvbnRhaW5lclNpemUgLSBkYXRhLnRodW1iU2l6ZS52YWx1ZSlcbiAgICAgIGNvbnN0IGRpc3RhbmNlID0gZS5kaXN0YW5jZVsgZFByb3AuZGlzdCBdXG4gICAgICBjb25zdCBwb3MgPSBwYW5SZWZQb3MgKyAoZS5kaXJlY3Rpb24gPT09IGRQcm9wLmRpciA/IDEgOiAtMSkgKiBkaXN0YW5jZSAqIG11bHRpcGxpZXJcblxuICAgICAgc2V0U2Nyb2xsKHBvcywgYXhpcylcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbk1vdXNlZG93biAoZXZ0LCBheGlzKSB7XG4gICAgICBjb25zdCBkYXRhID0gc2Nyb2xsWyBheGlzIF1cblxuICAgICAgaWYgKGRhdGEudGh1bWJIaWRkZW4udmFsdWUgIT09IHRydWUpIHtcbiAgICAgICAgY29uc3Qgb2Zmc2V0ID0gZXZ0WyBkaXJQcm9wc1sgYXhpcyBdLm9mZnNldCBdXG4gICAgICAgIGlmIChvZmZzZXQgPCBkYXRhLnRodW1iU3RhcnQudmFsdWUgfHwgb2Zmc2V0ID4gZGF0YS50aHVtYlN0YXJ0LnZhbHVlICsgZGF0YS50aHVtYlNpemUudmFsdWUpIHtcbiAgICAgICAgICBjb25zdCBwb3MgPSBvZmZzZXQgLSBkYXRhLnRodW1iU2l6ZS52YWx1ZSAvIDJcbiAgICAgICAgICBzZXRTY3JvbGwocG9zIC8gY29udGFpbmVyWyBheGlzIF0udmFsdWUgKiBkYXRhLnNpemUudmFsdWUsIGF4aXMpXG4gICAgICAgIH1cblxuICAgICAgICAvLyBhY3RpdmF0ZSB0aHVtYiBwYW5cbiAgICAgICAgaWYgKGRhdGEucmVmLnZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgICAgZGF0YS5yZWYudmFsdWUuZGlzcGF0Y2hFdmVudChuZXcgTW91c2VFdmVudChldnQudHlwZSwgZXZ0KSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uVmVydGljYWxNb3VzZWRvd24gKGV2dCkge1xuICAgICAgb25Nb3VzZWRvd24oZXZ0LCAndmVydGljYWwnKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uSG9yaXpvbnRhbE1vdXNlZG93biAoZXZ0KSB7XG4gICAgICBvbk1vdXNlZG93bihldnQsICdob3Jpem9udGFsJylcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzdGFydFRpbWVyICgpIHtcbiAgICAgIHRlbXBTaG93aW5nLnZhbHVlID0gdHJ1ZVxuXG4gICAgICB0aW1lciAhPT0gbnVsbCAmJiBjbGVhclRpbWVvdXQodGltZXIpXG4gICAgICB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aW1lciA9IG51bGxcbiAgICAgICAgdGVtcFNob3dpbmcudmFsdWUgPSBmYWxzZVxuICAgICAgfSwgcHJvcHMuZGVsYXkpXG5cbiAgICAgIHByb3BzLm9uU2Nyb2xsICE9PSB2b2lkIDAgJiYgZW1pdFNjcm9sbCgpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0U2Nyb2xsIChvZmZzZXQsIGF4aXMpIHtcbiAgICAgIHRhcmdldFJlZi52YWx1ZVsgZGlyUHJvcHNbIGF4aXMgXS5zY3JvbGwgXSA9IG9mZnNldFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uTW91c2VlbnRlciAoKSB7XG4gICAgICBob3Zlci52YWx1ZSA9IHRydWVcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbk1vdXNlbGVhdmUgKCkge1xuICAgICAgaG92ZXIudmFsdWUgPSBmYWxzZVxuICAgIH1cblxuICAgIGxldCBzY3JvbGxQb3NpdGlvbiA9IG51bGxcblxuICAgIHdhdGNoKCgpID0+IHByb3h5LiRxLmxhbmcucnRsLCBydGwgPT4ge1xuICAgICAgaWYgKHRhcmdldFJlZi52YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICBzZXRIb3Jpem9udGFsU2Nyb2xsUG9zaXRpb24oXG4gICAgICAgICAgdGFyZ2V0UmVmLnZhbHVlLFxuICAgICAgICAgIE1hdGguYWJzKHNjcm9sbC5ob3Jpem9udGFsLnBvc2l0aW9uLnZhbHVlKSAqIChydGwgPT09IHRydWUgPyAtMSA6IDEpXG4gICAgICAgIClcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgb25EZWFjdGl2YXRlZCgoKSA9PiB7XG4gICAgICBzY3JvbGxQb3NpdGlvbiA9IHtcbiAgICAgICAgdG9wOiBzY3JvbGwudmVydGljYWwucG9zaXRpb24udmFsdWUsXG4gICAgICAgIGxlZnQ6IHNjcm9sbC5ob3Jpem9udGFsLnBvc2l0aW9uLnZhbHVlXG4gICAgICB9XG4gICAgfSlcblxuICAgIG9uQWN0aXZhdGVkKCgpID0+IHtcbiAgICAgIGlmIChzY3JvbGxQb3NpdGlvbiA9PT0gbnVsbCkgeyByZXR1cm4gfVxuXG4gICAgICBjb25zdCBzY3JvbGxUYXJnZXQgPSB0YXJnZXRSZWYudmFsdWVcblxuICAgICAgaWYgKHNjcm9sbFRhcmdldCAhPT0gbnVsbCkge1xuICAgICAgICBzZXRIb3Jpem9udGFsU2Nyb2xsUG9zaXRpb24oc2Nyb2xsVGFyZ2V0LCBzY3JvbGxQb3NpdGlvbi5sZWZ0KVxuICAgICAgICBzZXRWZXJ0aWNhbFNjcm9sbFBvc2l0aW9uKHNjcm9sbFRhcmdldCwgc2Nyb2xsUG9zaXRpb24udG9wKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBvbkJlZm9yZVVubW91bnQoZW1pdFNjcm9sbC5jYW5jZWwpXG5cbiAgICAvLyBleHBvc2UgcHVibGljIG1ldGhvZHNcbiAgICBPYmplY3QuYXNzaWduKHByb3h5LCB7XG4gICAgICBnZXRTY3JvbGxUYXJnZXQ6ICgpID0+IHRhcmdldFJlZi52YWx1ZSxcbiAgICAgIGdldFNjcm9sbCxcbiAgICAgIGdldFNjcm9sbFBvc2l0aW9uOiAoKSA9PiAoe1xuICAgICAgICB0b3A6IHNjcm9sbC52ZXJ0aWNhbC5wb3NpdGlvbi52YWx1ZSxcbiAgICAgICAgbGVmdDogc2Nyb2xsLmhvcml6b250YWwucG9zaXRpb24udmFsdWVcbiAgICAgIH0pLFxuICAgICAgZ2V0U2Nyb2xsUGVyY2VudGFnZTogKCkgPT4gKHtcbiAgICAgICAgdG9wOiBzY3JvbGwudmVydGljYWwucGVyY2VudGFnZS52YWx1ZSxcbiAgICAgICAgbGVmdDogc2Nyb2xsLmhvcml6b250YWwucGVyY2VudGFnZS52YWx1ZVxuICAgICAgfSksXG4gICAgICBzZXRTY3JvbGxQb3NpdGlvbjogbG9jYWxTZXRTY3JvbGxQb3NpdGlvbixcbiAgICAgIHNldFNjcm9sbFBlcmNlbnRhZ2UgKGF4aXMsIHBlcmNlbnRhZ2UsIGR1cmF0aW9uKSB7XG4gICAgICAgIGxvY2FsU2V0U2Nyb2xsUG9zaXRpb24oXG4gICAgICAgICAgYXhpcyxcbiAgICAgICAgICBwZXJjZW50YWdlXG4gICAgICAgICAgICAqIChzY3JvbGxbIGF4aXMgXS5zaXplLnZhbHVlIC0gY29udGFpbmVyWyBheGlzIF0udmFsdWUpXG4gICAgICAgICAgICAqIChheGlzID09PSAnaG9yaXpvbnRhbCcgJiYgcHJveHkuJHEubGFuZy5ydGwgPT09IHRydWUgPyAtMSA6IDEpLFxuICAgICAgICAgIGR1cmF0aW9uXG4gICAgICAgIClcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICAgIGNsYXNzOiBjbGFzc2VzLnZhbHVlLFxuICAgICAgICBvbk1vdXNlZW50ZXIsXG4gICAgICAgIG9uTW91c2VsZWF2ZVxuICAgICAgfSwgW1xuICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgcmVmOiB0YXJnZXRSZWYsXG4gICAgICAgICAgY2xhc3M6ICdxLXNjcm9sbGFyZWFfX2NvbnRhaW5lciBzY3JvbGwgcmVsYXRpdmUtcG9zaXRpb24gZml0IGhpZGUtc2Nyb2xsYmFyJyxcbiAgICAgICAgICB0YWJpbmRleDogcHJvcHMudGFiaW5kZXggIT09IHZvaWQgMCA/IHByb3BzLnRhYmluZGV4IDogdm9pZCAwXG4gICAgICAgIH0sIFtcbiAgICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgICBjbGFzczogJ3Etc2Nyb2xsYXJlYV9fY29udGVudCBhYnNvbHV0ZScsXG4gICAgICAgICAgICBzdHlsZTogbWFpblN0eWxlLnZhbHVlXG4gICAgICAgICAgfSwgaE1lcmdlU2xvdChzbG90cy5kZWZhdWx0LCBbXG4gICAgICAgICAgICBoKFFSZXNpemVPYnNlcnZlciwge1xuICAgICAgICAgICAgICBkZWJvdW5jZTogMCxcbiAgICAgICAgICAgICAgb25SZXNpemU6IHVwZGF0ZVNjcm9sbFNpemVcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgXSkpLFxuXG4gICAgICAgICAgaChRU2Nyb2xsT2JzZXJ2ZXIsIHtcbiAgICAgICAgICAgIGF4aXM6ICdib3RoJyxcbiAgICAgICAgICAgIG9uU2Nyb2xsOiB1cGRhdGVTY3JvbGxcbiAgICAgICAgICB9KVxuICAgICAgICBdKSxcblxuICAgICAgICBoKFFSZXNpemVPYnNlcnZlciwge1xuICAgICAgICAgIGRlYm91bmNlOiAwLFxuICAgICAgICAgIG9uUmVzaXplOiB1cGRhdGVDb250YWluZXJcbiAgICAgICAgfSksXG5cbiAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgIGNsYXNzOiBzY3JvbGwudmVydGljYWwuYmFyQ2xhc3MudmFsdWUsXG4gICAgICAgICAgc3R5bGU6IFsgcHJvcHMuYmFyU3R5bGUsIHByb3BzLnZlcnRpY2FsQmFyU3R5bGUgXSxcbiAgICAgICAgICAnYXJpYS1oaWRkZW4nOiAndHJ1ZScsXG4gICAgICAgICAgb25Nb3VzZWRvd246IG9uVmVydGljYWxNb3VzZWRvd25cbiAgICAgICAgfSksXG5cbiAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgIGNsYXNzOiBzY3JvbGwuaG9yaXpvbnRhbC5iYXJDbGFzcy52YWx1ZSxcbiAgICAgICAgICBzdHlsZTogWyBwcm9wcy5iYXJTdHlsZSwgcHJvcHMuaG9yaXpvbnRhbEJhclN0eWxlIF0sXG4gICAgICAgICAgJ2FyaWEtaGlkZGVuJzogJ3RydWUnLFxuICAgICAgICAgIG9uTW91c2Vkb3duOiBvbkhvcml6b250YWxNb3VzZWRvd25cbiAgICAgICAgfSksXG5cbiAgICAgICAgd2l0aERpcmVjdGl2ZXMoXG4gICAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgICAgcmVmOiBzY3JvbGwudmVydGljYWwucmVmLFxuICAgICAgICAgICAgY2xhc3M6IHNjcm9sbC52ZXJ0aWNhbC50aHVtYkNsYXNzLnZhbHVlLFxuICAgICAgICAgICAgc3R5bGU6IHNjcm9sbC52ZXJ0aWNhbC5zdHlsZS52YWx1ZSxcbiAgICAgICAgICAgICdhcmlhLWhpZGRlbic6ICd0cnVlJ1xuICAgICAgICAgIH0pLFxuICAgICAgICAgIHRodW1iVmVydERpclxuICAgICAgICApLFxuXG4gICAgICAgIHdpdGhEaXJlY3RpdmVzKFxuICAgICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICAgIHJlZjogc2Nyb2xsLmhvcml6b250YWwucmVmLFxuICAgICAgICAgICAgY2xhc3M6IHNjcm9sbC5ob3Jpem9udGFsLnRodW1iQ2xhc3MudmFsdWUsXG4gICAgICAgICAgICBzdHlsZTogc2Nyb2xsLmhvcml6b250YWwuc3R5bGUudmFsdWUsXG4gICAgICAgICAgICAnYXJpYS1oaWRkZW4nOiAndHJ1ZSdcbiAgICAgICAgICB9KSxcbiAgICAgICAgICB0aHVtYkhvcml6RGlyXG4gICAgICAgIClcbiAgICAgIF0pXG4gICAgfVxuICB9XG59KVxuIiwiaW1wb3J0IHsgaCwgd2l0aERpcmVjdGl2ZXMsIHJlZiwgY29tcHV0ZWQsIHdhdGNoLCBvbk1vdW50ZWQsIG9uQmVmb3JlVW5tb3VudCwgbmV4dFRpY2ssIGluamVjdCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgdXNlSGlzdG9yeSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1oaXN0b3J5LmpzJ1xuaW1wb3J0IHVzZU1vZGVsVG9nZ2xlLCB7IHVzZU1vZGVsVG9nZ2xlUHJvcHMsIHVzZU1vZGVsVG9nZ2xlRW1pdHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1tb2RlbC10b2dnbGUuanMnXG5pbXBvcnQgdXNlUHJldmVudFNjcm9sbCBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1wcmV2ZW50LXNjcm9sbC5qcydcbmltcG9ydCB1c2VUaW1lb3V0IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLXRpbWVvdXQuanMnXG5pbXBvcnQgdXNlRGFyaywgeyB1c2VEYXJrUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1kYXJrLmpzJ1xuXG5pbXBvcnQgVG91Y2hQYW4gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9Ub3VjaFBhbi5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBiZXR3ZWVuIH0gZnJvbSAnLi4vLi4vdXRpbHMvZm9ybWF0LmpzJ1xuaW1wb3J0IHsgaFNsb3QsIGhEaXIgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcbmltcG9ydCB7IGxheW91dEtleSwgZW1wdHlSZW5kZXJGbiB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvc3ltYm9scy5qcydcblxuY29uc3QgZHVyYXRpb24gPSAxNTBcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FEcmF3ZXInLFxuXG4gIGluaGVyaXRBdHRyczogZmFsc2UsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VNb2RlbFRvZ2dsZVByb3BzLFxuICAgIC4uLnVzZURhcmtQcm9wcyxcblxuICAgIHNpZGU6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdsZWZ0JyxcbiAgICAgIHZhbGlkYXRvcjogdiA9PiBbICdsZWZ0JywgJ3JpZ2h0JyBdLmluY2x1ZGVzKHYpXG4gICAgfSxcblxuICAgIHdpZHRoOiB7XG4gICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICBkZWZhdWx0OiAzMDBcbiAgICB9LFxuXG4gICAgbWluaTogQm9vbGVhbixcbiAgICBtaW5pVG9PdmVybGF5OiBCb29sZWFuLFxuICAgIG1pbmlXaWR0aDoge1xuICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgZGVmYXVsdDogNTdcbiAgICB9LFxuXG4gICAgYnJlYWtwb2ludDoge1xuICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgZGVmYXVsdDogMTAyM1xuICAgIH0sXG4gICAgc2hvd0lmQWJvdmU6IEJvb2xlYW4sXG5cbiAgICBiZWhhdmlvcjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgdmFsaWRhdG9yOiB2ID0+IFsgJ2RlZmF1bHQnLCAnZGVza3RvcCcsICdtb2JpbGUnIF0uaW5jbHVkZXModiksXG4gICAgICBkZWZhdWx0OiAnZGVmYXVsdCdcbiAgICB9LFxuXG4gICAgYm9yZGVyZWQ6IEJvb2xlYW4sXG4gICAgZWxldmF0ZWQ6IEJvb2xlYW4sXG5cbiAgICBvdmVybGF5OiBCb29sZWFuLFxuICAgIHBlcnNpc3RlbnQ6IEJvb2xlYW4sXG4gICAgbm9Td2lwZU9wZW46IEJvb2xlYW4sXG4gICAgbm9Td2lwZUNsb3NlOiBCb29sZWFuLFxuICAgIG5vU3dpcGVCYWNrZHJvcDogQm9vbGVhblxuICB9LFxuXG4gIGVtaXRzOiBbXG4gICAgLi4udXNlTW9kZWxUb2dnbGVFbWl0cyxcbiAgICAnb25MYXlvdXQnLCAnbWluaVN0YXRlJ1xuICBdLFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cywgZW1pdCwgYXR0cnMgfSkge1xuICAgIGNvbnN0IHZtID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgICBjb25zdCB7IHByb3h5OiB7ICRxIH0gfSA9IHZtXG5cbiAgICBjb25zdCBpc0RhcmsgPSB1c2VEYXJrKHByb3BzLCAkcSlcbiAgICBjb25zdCB7IHByZXZlbnRCb2R5U2Nyb2xsIH0gPSB1c2VQcmV2ZW50U2Nyb2xsKClcbiAgICBjb25zdCB7IHJlZ2lzdGVyVGltZW91dCwgcmVtb3ZlVGltZW91dCB9ID0gdXNlVGltZW91dCgpXG5cbiAgICBjb25zdCAkbGF5b3V0ID0gaW5qZWN0KGxheW91dEtleSwgZW1wdHlSZW5kZXJGbilcbiAgICBpZiAoJGxheW91dCA9PT0gZW1wdHlSZW5kZXJGbikge1xuICAgICAgY29uc29sZS5lcnJvcignUURyYXdlciBuZWVkcyB0byBiZSBjaGlsZCBvZiBRTGF5b3V0JylcbiAgICAgIHJldHVybiBlbXB0eVJlbmRlckZuXG4gICAgfVxuXG4gICAgbGV0IGxhc3REZXNrdG9wU3RhdGUsIHRpbWVyTWluaSA9IG51bGwsIGxheW91dFRvdGFsV2lkdGhXYXRjaGVyXG5cbiAgICBjb25zdCBiZWxvd0JyZWFrcG9pbnQgPSByZWYoXG4gICAgICBwcm9wcy5iZWhhdmlvciA9PT0gJ21vYmlsZSdcbiAgICAgIHx8IChwcm9wcy5iZWhhdmlvciAhPT0gJ2Rlc2t0b3AnICYmICRsYXlvdXQudG90YWxXaWR0aC52YWx1ZSA8PSBwcm9wcy5icmVha3BvaW50KVxuICAgIClcblxuICAgIGNvbnN0IGlzTWluaSA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBwcm9wcy5taW5pID09PSB0cnVlICYmIGJlbG93QnJlYWtwb2ludC52YWx1ZSAhPT0gdHJ1ZVxuICAgIClcblxuICAgIGNvbnN0IHNpemUgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBpc01pbmkudmFsdWUgPT09IHRydWVcbiAgICAgICAgPyBwcm9wcy5taW5pV2lkdGhcbiAgICAgICAgOiBwcm9wcy53aWR0aFxuICAgICkpXG5cbiAgICBjb25zdCBzaG93aW5nID0gcmVmKFxuICAgICAgcHJvcHMuc2hvd0lmQWJvdmUgPT09IHRydWUgJiYgYmVsb3dCcmVha3BvaW50LnZhbHVlID09PSBmYWxzZVxuICAgICAgICA/IHRydWVcbiAgICAgICAgOiBwcm9wcy5tb2RlbFZhbHVlID09PSB0cnVlXG4gICAgKVxuXG4gICAgY29uc3QgaGlkZU9uUm91dGVDaGFuZ2UgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgcHJvcHMucGVyc2lzdGVudCAhPT0gdHJ1ZVxuICAgICAgJiYgKGJlbG93QnJlYWtwb2ludC52YWx1ZSA9PT0gdHJ1ZSB8fCBvblNjcmVlbk92ZXJsYXkudmFsdWUgPT09IHRydWUpXG4gICAgKVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlU2hvdyAoZXZ0LCBub0V2ZW50KSB7XG4gICAgICBhZGRUb0hpc3RvcnkoKVxuXG4gICAgICBldnQgIT09IGZhbHNlICYmICRsYXlvdXQuYW5pbWF0ZSgpXG4gICAgICBhcHBseVBvc2l0aW9uKDApXG5cbiAgICAgIGlmIChiZWxvd0JyZWFrcG9pbnQudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgY29uc3Qgb3RoZXJJbnN0YW5jZSA9ICRsYXlvdXQuaW5zdGFuY2VzWyBvdGhlclNpZGUudmFsdWUgXVxuICAgICAgICBpZiAob3RoZXJJbnN0YW5jZSAhPT0gdm9pZCAwICYmIG90aGVySW5zdGFuY2UuYmVsb3dCcmVha3BvaW50ID09PSB0cnVlKSB7XG4gICAgICAgICAgb3RoZXJJbnN0YW5jZS5oaWRlKGZhbHNlKVxuICAgICAgICB9XG5cbiAgICAgICAgYXBwbHlCYWNrZHJvcCgxKVxuICAgICAgICAkbGF5b3V0LmlzQ29udGFpbmVyLnZhbHVlICE9PSB0cnVlICYmIHByZXZlbnRCb2R5U2Nyb2xsKHRydWUpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgYXBwbHlCYWNrZHJvcCgwKVxuICAgICAgICBldnQgIT09IGZhbHNlICYmIHNldFNjcm9sbGFibGUoZmFsc2UpXG4gICAgICB9XG5cbiAgICAgIHJlZ2lzdGVyVGltZW91dCgoKSA9PiB7XG4gICAgICAgIGV2dCAhPT0gZmFsc2UgJiYgc2V0U2Nyb2xsYWJsZSh0cnVlKVxuICAgICAgICBub0V2ZW50ICE9PSB0cnVlICYmIGVtaXQoJ3Nob3cnLCBldnQpXG4gICAgICB9LCBkdXJhdGlvbilcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVIaWRlIChldnQsIG5vRXZlbnQpIHtcbiAgICAgIHJlbW92ZUZyb21IaXN0b3J5KClcblxuICAgICAgZXZ0ICE9PSBmYWxzZSAmJiAkbGF5b3V0LmFuaW1hdGUoKVxuXG4gICAgICBhcHBseUJhY2tkcm9wKDApXG4gICAgICBhcHBseVBvc2l0aW9uKHN0YXRlRGlyZWN0aW9uLnZhbHVlICogc2l6ZS52YWx1ZSlcblxuICAgICAgY2xlYW51cCgpXG5cbiAgICAgIGlmIChub0V2ZW50ICE9PSB0cnVlKSB7XG4gICAgICAgIHJlZ2lzdGVyVGltZW91dCgoKSA9PiB7IGVtaXQoJ2hpZGUnLCBldnQpIH0sIGR1cmF0aW9uKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHJlbW92ZVRpbWVvdXQoKVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHsgc2hvdywgaGlkZSB9ID0gdXNlTW9kZWxUb2dnbGUoe1xuICAgICAgc2hvd2luZyxcbiAgICAgIGhpZGVPblJvdXRlQ2hhbmdlLFxuICAgICAgaGFuZGxlU2hvdyxcbiAgICAgIGhhbmRsZUhpZGVcbiAgICB9KVxuXG4gICAgY29uc3QgeyBhZGRUb0hpc3RvcnksIHJlbW92ZUZyb21IaXN0b3J5IH0gPSB1c2VIaXN0b3J5KHNob3dpbmcsIGhpZGUsIGhpZGVPblJvdXRlQ2hhbmdlKVxuXG4gICAgY29uc3QgaW5zdGFuY2UgPSB7XG4gICAgICBiZWxvd0JyZWFrcG9pbnQsXG4gICAgICBoaWRlXG4gICAgfVxuXG4gICAgY29uc3QgcmlnaHRTaWRlID0gY29tcHV0ZWQoKCkgPT4gcHJvcHMuc2lkZSA9PT0gJ3JpZ2h0JylcblxuICAgIGNvbnN0IHN0YXRlRGlyZWN0aW9uID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICgkcS5sYW5nLnJ0bCA9PT0gdHJ1ZSA/IC0xIDogMSkgKiAocmlnaHRTaWRlLnZhbHVlID09PSB0cnVlID8gMSA6IC0xKVxuICAgIClcblxuICAgIGNvbnN0IGZsYWdCYWNrZHJvcEJnID0gcmVmKDApXG4gICAgY29uc3QgZmxhZ1Bhbm5pbmcgPSByZWYoZmFsc2UpXG4gICAgY29uc3QgZmxhZ01pbmlBbmltYXRlID0gcmVmKGZhbHNlKVxuICAgIGNvbnN0IGZsYWdDb250ZW50UG9zaXRpb24gPSByZWYoIC8vIHN0YXJ0aW5nIHdpdGggXCJoaWRkZW5cIiBmb3IgU1NSXG4gICAgICBzaXplLnZhbHVlICogc3RhdGVEaXJlY3Rpb24udmFsdWVcbiAgICApXG5cbiAgICBjb25zdCBvdGhlclNpZGUgPSBjb21wdXRlZCgoKSA9PiAocmlnaHRTaWRlLnZhbHVlID09PSB0cnVlID8gJ2xlZnQnIDogJ3JpZ2h0JykpXG4gICAgY29uc3Qgb2Zmc2V0ID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSAmJiBiZWxvd0JyZWFrcG9pbnQudmFsdWUgPT09IGZhbHNlICYmIHByb3BzLm92ZXJsYXkgPT09IGZhbHNlXG4gICAgICAgID8gKHByb3BzLm1pbmlUb092ZXJsYXkgPT09IHRydWUgPyBwcm9wcy5taW5pV2lkdGggOiBzaXplLnZhbHVlKVxuICAgICAgICA6IDBcbiAgICApKVxuXG4gICAgY29uc3QgZml4ZWQgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgcHJvcHMub3ZlcmxheSA9PT0gdHJ1ZVxuICAgICAgfHwgcHJvcHMubWluaVRvT3ZlcmxheSA9PT0gdHJ1ZVxuICAgICAgfHwgJGxheW91dC52aWV3LnZhbHVlLmluZGV4T2YocmlnaHRTaWRlLnZhbHVlID8gJ1InIDogJ0wnKSA+IC0xXG4gICAgICB8fCAoJHEucGxhdGZvcm0uaXMuaW9zID09PSB0cnVlICYmICRsYXlvdXQuaXNDb250YWluZXIudmFsdWUgPT09IHRydWUpXG4gICAgKVxuXG4gICAgY29uc3Qgb25MYXlvdXQgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgcHJvcHMub3ZlcmxheSA9PT0gZmFsc2VcbiAgICAgICYmIHNob3dpbmcudmFsdWUgPT09IHRydWVcbiAgICAgICYmIGJlbG93QnJlYWtwb2ludC52YWx1ZSA9PT0gZmFsc2VcbiAgICApXG5cbiAgICBjb25zdCBvblNjcmVlbk92ZXJsYXkgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgcHJvcHMub3ZlcmxheSA9PT0gdHJ1ZVxuICAgICAgJiYgc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgJiYgYmVsb3dCcmVha3BvaW50LnZhbHVlID09PSBmYWxzZVxuICAgIClcblxuICAgIGNvbnN0IGJhY2tkcm9wQ2xhc3MgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ2Z1bGxzY3JlZW4gcS1kcmF3ZXJfX2JhY2tkcm9wJ1xuICAgICAgKyAoc2hvd2luZy52YWx1ZSA9PT0gZmFsc2UgJiYgZmxhZ1Bhbm5pbmcudmFsdWUgPT09IGZhbHNlID8gJyBoaWRkZW4nIDogJycpXG4gICAgKVxuXG4gICAgY29uc3QgYmFja2Ryb3BTdHlsZSA9IGNvbXB1dGVkKCgpID0+ICh7XG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IGByZ2JhKDAsMCwwLCR7IGZsYWdCYWNrZHJvcEJnLnZhbHVlICogMC40IH0pYFxuICAgIH0pKVxuXG4gICAgY29uc3QgaGVhZGVyU2xvdCA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHJpZ2h0U2lkZS52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICA/ICRsYXlvdXQucm93cy52YWx1ZS50b3BbIDIgXSA9PT0gJ3InXG4gICAgICAgIDogJGxheW91dC5yb3dzLnZhbHVlLnRvcFsgMCBdID09PSAnbCdcbiAgICApKVxuXG4gICAgY29uc3QgZm9vdGVyU2xvdCA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHJpZ2h0U2lkZS52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICA/ICRsYXlvdXQucm93cy52YWx1ZS5ib3R0b21bIDIgXSA9PT0gJ3InXG4gICAgICAgIDogJGxheW91dC5yb3dzLnZhbHVlLmJvdHRvbVsgMCBdID09PSAnbCdcbiAgICApKVxuXG4gICAgY29uc3QgYWJvdmVTdHlsZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IGNzcyA9IHt9XG5cbiAgICAgIGlmICgkbGF5b3V0LmhlYWRlci5zcGFjZSA9PT0gdHJ1ZSAmJiBoZWFkZXJTbG90LnZhbHVlID09PSBmYWxzZSkge1xuICAgICAgICBpZiAoZml4ZWQudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgICBjc3MudG9wID0gYCR7ICRsYXlvdXQuaGVhZGVyLm9mZnNldCB9cHhgXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoJGxheW91dC5oZWFkZXIuc3BhY2UgPT09IHRydWUpIHtcbiAgICAgICAgICBjc3MudG9wID0gYCR7ICRsYXlvdXQuaGVhZGVyLnNpemUgfXB4YFxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICgkbGF5b3V0LmZvb3Rlci5zcGFjZSA9PT0gdHJ1ZSAmJiBmb290ZXJTbG90LnZhbHVlID09PSBmYWxzZSkge1xuICAgICAgICBpZiAoZml4ZWQudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgICBjc3MuYm90dG9tID0gYCR7ICRsYXlvdXQuZm9vdGVyLm9mZnNldCB9cHhgXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoJGxheW91dC5mb290ZXIuc3BhY2UgPT09IHRydWUpIHtcbiAgICAgICAgICBjc3MuYm90dG9tID0gYCR7ICRsYXlvdXQuZm9vdGVyLnNpemUgfXB4YFxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjc3NcbiAgICB9KVxuXG4gICAgY29uc3Qgc3R5bGUgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCBzdHlsZSA9IHtcbiAgICAgICAgd2lkdGg6IGAkeyBzaXplLnZhbHVlIH1weGAsXG4gICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZVgoJHsgZmxhZ0NvbnRlbnRQb3NpdGlvbi52YWx1ZSB9cHgpYFxuICAgICAgfVxuXG4gICAgICByZXR1cm4gYmVsb3dCcmVha3BvaW50LnZhbHVlID09PSB0cnVlXG4gICAgICAgID8gc3R5bGVcbiAgICAgICAgOiBPYmplY3QuYXNzaWduKHN0eWxlLCBhYm92ZVN0eWxlLnZhbHVlKVxuICAgIH0pXG5cbiAgICBjb25zdCBjb250ZW50Q2xhc3MgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3EtZHJhd2VyX19jb250ZW50IGZpdCAnXG4gICAgICArICgkbGF5b3V0LmlzQ29udGFpbmVyLnZhbHVlICE9PSB0cnVlID8gJ3Njcm9sbCcgOiAnb3ZlcmZsb3ctYXV0bycpXG4gICAgKVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBgcS1kcmF3ZXIgcS1kcmF3ZXItLSR7IHByb3BzLnNpZGUgfWBcbiAgICAgICsgKGZsYWdNaW5pQW5pbWF0ZS52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1kcmF3ZXItLW1pbmktYW5pbWF0ZScgOiAnJylcbiAgICAgICsgKHByb3BzLmJvcmRlcmVkID09PSB0cnVlID8gJyBxLWRyYXdlci0tYm9yZGVyZWQnIDogJycpXG4gICAgICArIChpc0RhcmsudmFsdWUgPT09IHRydWUgPyAnIHEtZHJhd2VyLS1kYXJrIHEtZGFyaycgOiAnJylcbiAgICAgICsgKFxuICAgICAgICBmbGFnUGFubmluZy52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAgID8gJyBuby10cmFuc2l0aW9uJ1xuICAgICAgICAgIDogKHNob3dpbmcudmFsdWUgPT09IHRydWUgPyAnJyA6ICcgcS1sYXlvdXQtLXByZXZlbnQtZm9jdXMnKVxuICAgICAgKVxuICAgICAgKyAoXG4gICAgICAgIGJlbG93QnJlYWtwb2ludC52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAgID8gJyBmaXhlZCBxLWRyYXdlci0tb24tdG9wIHEtZHJhd2VyLS1tb2JpbGUgcS1kcmF3ZXItLXRvcC1wYWRkaW5nJ1xuICAgICAgICAgIDogYCBxLWRyYXdlci0tJHsgaXNNaW5pLnZhbHVlID09PSB0cnVlID8gJ21pbmknIDogJ3N0YW5kYXJkJyB9YFxuICAgICAgICAgICsgKGZpeGVkLnZhbHVlID09PSB0cnVlIHx8IG9uTGF5b3V0LnZhbHVlICE9PSB0cnVlID8gJyBmaXhlZCcgOiAnJylcbiAgICAgICAgICArIChwcm9wcy5vdmVybGF5ID09PSB0cnVlIHx8IHByb3BzLm1pbmlUb092ZXJsYXkgPT09IHRydWUgPyAnIHEtZHJhd2VyLS1vbi10b3AnIDogJycpXG4gICAgICAgICAgKyAoaGVhZGVyU2xvdC52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1kcmF3ZXItLXRvcC1wYWRkaW5nJyA6ICcnKVxuICAgICAgKVxuICAgIClcblxuICAgIGNvbnN0IG9wZW5EaXJlY3RpdmUgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICAvLyBpZiBwcm9wcy5ub1N3aXBlT3BlbiAhPT0gdHJ1ZVxuICAgICAgY29uc3QgZGlyID0gJHEubGFuZy5ydGwgPT09IHRydWUgPyBwcm9wcy5zaWRlIDogb3RoZXJTaWRlLnZhbHVlXG5cbiAgICAgIHJldHVybiBbIFtcbiAgICAgICAgVG91Y2hQYW4sXG4gICAgICAgIG9uT3BlblBhbixcbiAgICAgICAgdm9pZCAwLFxuICAgICAgICB7XG4gICAgICAgICAgWyBkaXIgXTogdHJ1ZSxcbiAgICAgICAgICBtb3VzZTogdHJ1ZVxuICAgICAgICB9XG4gICAgICBdIF1cbiAgICB9KVxuXG4gICAgY29uc3QgY29udGVudENsb3NlRGlyZWN0aXZlID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgLy8gaWYgYmVsb3dCcmVha3BvaW50LnZhbHVlID09PSB0cnVlICYmIHByb3BzLm5vU3dpcGVDbG9zZSAhPT0gdHJ1ZVxuICAgICAgY29uc3QgZGlyID0gJHEubGFuZy5ydGwgPT09IHRydWUgPyBvdGhlclNpZGUudmFsdWUgOiBwcm9wcy5zaWRlXG5cbiAgICAgIHJldHVybiBbIFtcbiAgICAgICAgVG91Y2hQYW4sXG4gICAgICAgIG9uQ2xvc2VQYW4sXG4gICAgICAgIHZvaWQgMCxcbiAgICAgICAge1xuICAgICAgICAgIFsgZGlyIF06IHRydWUsXG4gICAgICAgICAgbW91c2U6IHRydWVcbiAgICAgICAgfVxuICAgICAgXSBdXG4gICAgfSlcblxuICAgIGNvbnN0IGJhY2tkcm9wQ2xvc2VEaXJlY3RpdmUgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICAvLyBpZiBzaG93aW5nLnZhbHVlID09PSB0cnVlICYmIHByb3BzLm5vU3dpcGVCYWNrZHJvcCAhPT0gdHJ1ZVxuICAgICAgY29uc3QgZGlyID0gJHEubGFuZy5ydGwgPT09IHRydWUgPyBvdGhlclNpZGUudmFsdWUgOiBwcm9wcy5zaWRlXG5cbiAgICAgIHJldHVybiBbIFtcbiAgICAgICAgVG91Y2hQYW4sXG4gICAgICAgIG9uQ2xvc2VQYW4sXG4gICAgICAgIHZvaWQgMCxcbiAgICAgICAge1xuICAgICAgICAgIFsgZGlyIF06IHRydWUsXG4gICAgICAgICAgbW91c2U6IHRydWUsXG4gICAgICAgICAgbW91c2VBbGxEaXI6IHRydWVcbiAgICAgICAgfVxuICAgICAgXSBdXG4gICAgfSlcblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUJlbG93QnJlYWtwb2ludCAoKSB7XG4gICAgICB1cGRhdGVMb2NhbChiZWxvd0JyZWFrcG9pbnQsIChcbiAgICAgICAgcHJvcHMuYmVoYXZpb3IgPT09ICdtb2JpbGUnXG4gICAgICAgIHx8IChwcm9wcy5iZWhhdmlvciAhPT0gJ2Rlc2t0b3AnICYmICRsYXlvdXQudG90YWxXaWR0aC52YWx1ZSA8PSBwcm9wcy5icmVha3BvaW50KVxuICAgICAgKSlcbiAgICB9XG5cbiAgICB3YXRjaChiZWxvd0JyZWFrcG9pbnQsIHZhbCA9PiB7XG4gICAgICBpZiAodmFsID09PSB0cnVlKSB7IC8vIGZyb20gbGcgdG8geHNcbiAgICAgICAgbGFzdERlc2t0b3BTdGF0ZSA9IHNob3dpbmcudmFsdWVcbiAgICAgICAgc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSAmJiBoaWRlKGZhbHNlKVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAoXG4gICAgICAgIHByb3BzLm92ZXJsYXkgPT09IGZhbHNlXG4gICAgICAgICYmIHByb3BzLmJlaGF2aW9yICE9PSAnbW9iaWxlJ1xuICAgICAgICAmJiBsYXN0RGVza3RvcFN0YXRlICE9PSBmYWxzZVxuICAgICAgKSB7IC8vIGZyb20geHMgdG8gbGdcbiAgICAgICAgaWYgKHNob3dpbmcudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgICBhcHBseVBvc2l0aW9uKDApXG4gICAgICAgICAgYXBwbHlCYWNrZHJvcCgwKVxuICAgICAgICAgIGNsZWFudXAoKVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHNob3coZmFsc2UpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuXG4gICAgd2F0Y2goKCkgPT4gcHJvcHMuc2lkZSwgKG5ld1NpZGUsIG9sZFNpZGUpID0+IHtcbiAgICAgIGlmICgkbGF5b3V0Lmluc3RhbmNlc1sgb2xkU2lkZSBdID09PSBpbnN0YW5jZSkge1xuICAgICAgICAkbGF5b3V0Lmluc3RhbmNlc1sgb2xkU2lkZSBdID0gdm9pZCAwXG4gICAgICAgICRsYXlvdXRbIG9sZFNpZGUgXS5zcGFjZSA9IGZhbHNlXG4gICAgICAgICRsYXlvdXRbIG9sZFNpZGUgXS5vZmZzZXQgPSAwXG4gICAgICB9XG5cbiAgICAgICRsYXlvdXQuaW5zdGFuY2VzWyBuZXdTaWRlIF0gPSBpbnN0YW5jZVxuICAgICAgJGxheW91dFsgbmV3U2lkZSBdLnNpemUgPSBzaXplLnZhbHVlXG4gICAgICAkbGF5b3V0WyBuZXdTaWRlIF0uc3BhY2UgPSBvbkxheW91dC52YWx1ZVxuICAgICAgJGxheW91dFsgbmV3U2lkZSBdLm9mZnNldCA9IG9mZnNldC52YWx1ZVxuICAgIH0pXG5cbiAgICB3YXRjaCgkbGF5b3V0LnRvdGFsV2lkdGgsICgpID0+IHtcbiAgICAgIGlmICgkbGF5b3V0LmlzQ29udGFpbmVyLnZhbHVlID09PSB0cnVlIHx8IGRvY3VtZW50LnFTY3JvbGxQcmV2ZW50ZWQgIT09IHRydWUpIHtcbiAgICAgICAgdXBkYXRlQmVsb3dCcmVha3BvaW50KClcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgd2F0Y2goXG4gICAgICAoKSA9PiBwcm9wcy5iZWhhdmlvciArIHByb3BzLmJyZWFrcG9pbnQsXG4gICAgICB1cGRhdGVCZWxvd0JyZWFrcG9pbnRcbiAgICApXG5cbiAgICB3YXRjaCgkbGF5b3V0LmlzQ29udGFpbmVyLCB2YWwgPT4ge1xuICAgICAgc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSAmJiBwcmV2ZW50Qm9keVNjcm9sbCh2YWwgIT09IHRydWUpXG4gICAgICB2YWwgPT09IHRydWUgJiYgdXBkYXRlQmVsb3dCcmVha3BvaW50KClcbiAgICB9KVxuXG4gICAgd2F0Y2goJGxheW91dC5zY3JvbGxiYXJXaWR0aCwgKCkgPT4ge1xuICAgICAgYXBwbHlQb3NpdGlvbihzaG93aW5nLnZhbHVlID09PSB0cnVlID8gMCA6IHZvaWQgMClcbiAgICB9KVxuXG4gICAgd2F0Y2gob2Zmc2V0LCB2YWwgPT4geyB1cGRhdGVMYXlvdXQoJ29mZnNldCcsIHZhbCkgfSlcblxuICAgIHdhdGNoKG9uTGF5b3V0LCB2YWwgPT4ge1xuICAgICAgZW1pdCgnb25MYXlvdXQnLCB2YWwpXG4gICAgICB1cGRhdGVMYXlvdXQoJ3NwYWNlJywgdmFsKVxuICAgIH0pXG5cbiAgICB3YXRjaChyaWdodFNpZGUsICgpID0+IHsgYXBwbHlQb3NpdGlvbigpIH0pXG5cbiAgICB3YXRjaChzaXplLCB2YWwgPT4ge1xuICAgICAgYXBwbHlQb3NpdGlvbigpXG4gICAgICB1cGRhdGVTaXplT25MYXlvdXQocHJvcHMubWluaVRvT3ZlcmxheSwgdmFsKVxuICAgIH0pXG5cbiAgICB3YXRjaCgoKSA9PiBwcm9wcy5taW5pVG9PdmVybGF5LCB2YWwgPT4ge1xuICAgICAgdXBkYXRlU2l6ZU9uTGF5b3V0KHZhbCwgc2l6ZS52YWx1ZSlcbiAgICB9KVxuXG4gICAgd2F0Y2goKCkgPT4gJHEubGFuZy5ydGwsICgpID0+IHsgYXBwbHlQb3NpdGlvbigpIH0pXG5cbiAgICB3YXRjaCgoKSA9PiBwcm9wcy5taW5pLCAoKSA9PiB7XG4gICAgICBpZiAocHJvcHMubW9kZWxWYWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBhbmltYXRlTWluaSgpXG4gICAgICAgICRsYXlvdXQuYW5pbWF0ZSgpXG4gICAgICB9XG4gICAgfSlcblxuICAgIHdhdGNoKGlzTWluaSwgdmFsID0+IHsgZW1pdCgnbWluaVN0YXRlJywgdmFsKSB9KVxuXG4gICAgZnVuY3Rpb24gYXBwbHlQb3NpdGlvbiAocG9zaXRpb24pIHtcbiAgICAgIGlmIChwb3NpdGlvbiA9PT0gdm9pZCAwKSB7XG4gICAgICAgIG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgICBwb3NpdGlvbiA9IHNob3dpbmcudmFsdWUgPT09IHRydWUgPyAwIDogc2l6ZS52YWx1ZVxuICAgICAgICAgIGFwcGx5UG9zaXRpb24oc3RhdGVEaXJlY3Rpb24udmFsdWUgKiBwb3NpdGlvbilcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgJGxheW91dC5pc0NvbnRhaW5lci52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAgICYmIHJpZ2h0U2lkZS52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAgICYmIChiZWxvd0JyZWFrcG9pbnQudmFsdWUgPT09IHRydWUgfHwgTWF0aC5hYnMocG9zaXRpb24pID09PSBzaXplLnZhbHVlKVxuICAgICAgICApIHtcbiAgICAgICAgICBwb3NpdGlvbiArPSBzdGF0ZURpcmVjdGlvbi52YWx1ZSAqICRsYXlvdXQuc2Nyb2xsYmFyV2lkdGgudmFsdWVcbiAgICAgICAgfVxuXG4gICAgICAgIGZsYWdDb250ZW50UG9zaXRpb24udmFsdWUgPSBwb3NpdGlvblxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFwcGx5QmFja2Ryb3AgKHgpIHtcbiAgICAgIGZsYWdCYWNrZHJvcEJnLnZhbHVlID0geFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldFNjcm9sbGFibGUgKHYpIHtcbiAgICAgIGNvbnN0IGFjdGlvbiA9IHYgPT09IHRydWVcbiAgICAgICAgPyAncmVtb3ZlJ1xuICAgICAgICA6ICgkbGF5b3V0LmlzQ29udGFpbmVyLnZhbHVlICE9PSB0cnVlID8gJ2FkZCcgOiAnJylcblxuICAgICAgYWN0aW9uICE9PSAnJyAmJiBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdFsgYWN0aW9uIF0oJ3EtYm9keS0tZHJhd2VyLXRvZ2dsZScpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYW5pbWF0ZU1pbmkgKCkge1xuICAgICAgdGltZXJNaW5pICE9PSBudWxsICYmIGNsZWFyVGltZW91dCh0aW1lck1pbmkpXG5cbiAgICAgIGlmICh2bS5wcm94eSAmJiB2bS5wcm94eS4kZWwpIHtcbiAgICAgICAgLy8gbmVlZCB0byBzcGVlZCBpdCB1cCBhbmQgYXBwbHkgaXQgaW1tZWRpYXRlbHksXG4gICAgICAgIC8vIGV2ZW4gZmFzdGVyIHRoYW4gVnVlJ3MgbmV4dFRpY2shXG4gICAgICAgIHZtLnByb3h5LiRlbC5jbGFzc0xpc3QuYWRkKCdxLWRyYXdlci0tbWluaS1hbmltYXRlJylcbiAgICAgIH1cblxuICAgICAgZmxhZ01pbmlBbmltYXRlLnZhbHVlID0gdHJ1ZVxuICAgICAgdGltZXJNaW5pID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRpbWVyTWluaSA9IG51bGxcbiAgICAgICAgZmxhZ01pbmlBbmltYXRlLnZhbHVlID0gZmFsc2VcbiAgICAgICAgaWYgKHZtICYmIHZtLnByb3h5ICYmIHZtLnByb3h5LiRlbCkge1xuICAgICAgICAgIHZtLnByb3h5LiRlbC5jbGFzc0xpc3QucmVtb3ZlKCdxLWRyYXdlci0tbWluaS1hbmltYXRlJylcbiAgICAgICAgfVxuICAgICAgfSwgMTUwKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uT3BlblBhbiAoZXZ0KSB7XG4gICAgICBpZiAoc2hvd2luZy52YWx1ZSAhPT0gZmFsc2UpIHtcbiAgICAgICAgLy8gc29tZSBicm93c2VycyBtaWdodCBjYXB0dXJlIGFuZCB0cmlnZ2VyIHRoaXNcbiAgICAgICAgLy8gZXZlbiBpZiBEcmF3ZXIgaGFzIGp1c3QgYmVlbiBvcGVuZWQgKGJ1dCBhbmltYXRpb24gaXMgc3RpbGwgcGVuZGluZylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGNvbnN0XG4gICAgICAgIHdpZHRoID0gc2l6ZS52YWx1ZSxcbiAgICAgICAgcG9zaXRpb24gPSBiZXR3ZWVuKGV2dC5kaXN0YW5jZS54LCAwLCB3aWR0aClcblxuICAgICAgaWYgKGV2dC5pc0ZpbmFsID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IG9wZW5lZCA9IHBvc2l0aW9uID49IE1hdGgubWluKDc1LCB3aWR0aClcblxuICAgICAgICBpZiAob3BlbmVkID09PSB0cnVlKSB7XG4gICAgICAgICAgc2hvdygpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgJGxheW91dC5hbmltYXRlKClcbiAgICAgICAgICBhcHBseUJhY2tkcm9wKDApXG4gICAgICAgICAgYXBwbHlQb3NpdGlvbihzdGF0ZURpcmVjdGlvbi52YWx1ZSAqIHdpZHRoKVxuICAgICAgICB9XG5cbiAgICAgICAgZmxhZ1Bhbm5pbmcudmFsdWUgPSBmYWxzZVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgYXBwbHlQb3NpdGlvbihcbiAgICAgICAgKCRxLmxhbmcucnRsID09PSB0cnVlID8gcmlnaHRTaWRlLnZhbHVlICE9PSB0cnVlIDogcmlnaHRTaWRlLnZhbHVlKVxuICAgICAgICAgID8gTWF0aC5tYXgod2lkdGggLSBwb3NpdGlvbiwgMClcbiAgICAgICAgICA6IE1hdGgubWluKDAsIHBvc2l0aW9uIC0gd2lkdGgpXG4gICAgICApXG4gICAgICBhcHBseUJhY2tkcm9wKFxuICAgICAgICBiZXR3ZWVuKHBvc2l0aW9uIC8gd2lkdGgsIDAsIDEpXG4gICAgICApXG5cbiAgICAgIGlmIChldnQuaXNGaXJzdCA9PT0gdHJ1ZSkge1xuICAgICAgICBmbGFnUGFubmluZy52YWx1ZSA9IHRydWVcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkNsb3NlUGFuIChldnQpIHtcbiAgICAgIGlmIChzaG93aW5nLnZhbHVlICE9PSB0cnVlKSB7XG4gICAgICAgIC8vIHNvbWUgYnJvd3NlcnMgbWlnaHQgY2FwdHVyZSBhbmQgdHJpZ2dlciB0aGlzXG4gICAgICAgIC8vIGV2ZW4gaWYgRHJhd2VyIGhhcyBqdXN0IGJlZW4gY2xvc2VkIChidXQgYW5pbWF0aW9uIGlzIHN0aWxsIHBlbmRpbmcpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBjb25zdFxuICAgICAgICB3aWR0aCA9IHNpemUudmFsdWUsXG4gICAgICAgIGRpciA9IGV2dC5kaXJlY3Rpb24gPT09IHByb3BzLnNpZGUsXG4gICAgICAgIHBvc2l0aW9uID0gKCRxLmxhbmcucnRsID09PSB0cnVlID8gZGlyICE9PSB0cnVlIDogZGlyKVxuICAgICAgICAgID8gYmV0d2VlbihldnQuZGlzdGFuY2UueCwgMCwgd2lkdGgpXG4gICAgICAgICAgOiAwXG5cbiAgICAgIGlmIChldnQuaXNGaW5hbCA9PT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBvcGVuZWQgPSBNYXRoLmFicyhwb3NpdGlvbikgPCBNYXRoLm1pbig3NSwgd2lkdGgpXG5cbiAgICAgICAgaWYgKG9wZW5lZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICRsYXlvdXQuYW5pbWF0ZSgpXG4gICAgICAgICAgYXBwbHlCYWNrZHJvcCgxKVxuICAgICAgICAgIGFwcGx5UG9zaXRpb24oMClcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBoaWRlKClcbiAgICAgICAgfVxuXG4gICAgICAgIGZsYWdQYW5uaW5nLnZhbHVlID0gZmFsc2VcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGFwcGx5UG9zaXRpb24oc3RhdGVEaXJlY3Rpb24udmFsdWUgKiBwb3NpdGlvbilcbiAgICAgIGFwcGx5QmFja2Ryb3AoYmV0d2VlbigxIC0gcG9zaXRpb24gLyB3aWR0aCwgMCwgMSkpXG5cbiAgICAgIGlmIChldnQuaXNGaXJzdCA9PT0gdHJ1ZSkge1xuICAgICAgICBmbGFnUGFubmluZy52YWx1ZSA9IHRydWVcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbGVhbnVwICgpIHtcbiAgICAgIHByZXZlbnRCb2R5U2Nyb2xsKGZhbHNlKVxuICAgICAgc2V0U2Nyb2xsYWJsZSh0cnVlKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUxheW91dCAocHJvcCwgdmFsKSB7XG4gICAgICAkbGF5b3V0LnVwZGF0ZShwcm9wcy5zaWRlLCBwcm9wLCB2YWwpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlTG9jYWwgKHByb3AsIHZhbCkge1xuICAgICAgaWYgKHByb3AudmFsdWUgIT09IHZhbCkge1xuICAgICAgICBwcm9wLnZhbHVlID0gdmFsXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlU2l6ZU9uTGF5b3V0IChtaW5pVG9PdmVybGF5LCBzaXplKSB7XG4gICAgICB1cGRhdGVMYXlvdXQoJ3NpemUnLCBtaW5pVG9PdmVybGF5ID09PSB0cnVlID8gcHJvcHMubWluaVdpZHRoIDogc2l6ZSlcbiAgICB9XG5cbiAgICAkbGF5b3V0Lmluc3RhbmNlc1sgcHJvcHMuc2lkZSBdID0gaW5zdGFuY2VcbiAgICB1cGRhdGVTaXplT25MYXlvdXQocHJvcHMubWluaVRvT3ZlcmxheSwgc2l6ZS52YWx1ZSlcbiAgICB1cGRhdGVMYXlvdXQoJ3NwYWNlJywgb25MYXlvdXQudmFsdWUpXG4gICAgdXBkYXRlTGF5b3V0KCdvZmZzZXQnLCBvZmZzZXQudmFsdWUpXG5cbiAgICBpZiAoXG4gICAgICBwcm9wcy5zaG93SWZBYm92ZSA9PT0gdHJ1ZVxuICAgICAgJiYgcHJvcHMubW9kZWxWYWx1ZSAhPT0gdHJ1ZVxuICAgICAgJiYgc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgJiYgcHJvcHNbICdvblVwZGF0ZTptb2RlbFZhbHVlJyBdICE9PSB2b2lkIDBcbiAgICApIHtcbiAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgdHJ1ZSlcbiAgICB9XG5cbiAgICBvbk1vdW50ZWQoKCkgPT4ge1xuICAgICAgZW1pdCgnb25MYXlvdXQnLCBvbkxheW91dC52YWx1ZSlcbiAgICAgIGVtaXQoJ21pbmlTdGF0ZScsIGlzTWluaS52YWx1ZSlcblxuICAgICAgbGFzdERlc2t0b3BTdGF0ZSA9IHByb3BzLnNob3dJZkFib3ZlID09PSB0cnVlXG5cbiAgICAgIGNvbnN0IGZuID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBhY3Rpb24gPSBzaG93aW5nLnZhbHVlID09PSB0cnVlID8gaGFuZGxlU2hvdyA6IGhhbmRsZUhpZGVcbiAgICAgICAgYWN0aW9uKGZhbHNlLCB0cnVlKVxuICAgICAgfVxuXG4gICAgICBpZiAoJGxheW91dC50b3RhbFdpZHRoLnZhbHVlICE9PSAwKSB7XG4gICAgICAgIC8vIG1ha2Ugc3VyZSB0aGF0IGFsbCBjb21wdXRlZCBwcm9wZXJ0aWVzXG4gICAgICAgIC8vIGhhdmUgYmVlbiB1cGRhdGVkIGJlZm9yZSBjYWxsaW5nIGhhbmRsZVNob3cvaGFuZGxlSGlkZSgpXG4gICAgICAgIG5leHRUaWNrKGZuKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgbGF5b3V0VG90YWxXaWR0aFdhdGNoZXIgPSB3YXRjaCgkbGF5b3V0LnRvdGFsV2lkdGgsICgpID0+IHtcbiAgICAgICAgbGF5b3V0VG90YWxXaWR0aFdhdGNoZXIoKVxuICAgICAgICBsYXlvdXRUb3RhbFdpZHRoV2F0Y2hlciA9IHZvaWQgMFxuXG4gICAgICAgIGlmIChzaG93aW5nLnZhbHVlID09PSBmYWxzZSAmJiBwcm9wcy5zaG93SWZBYm92ZSA9PT0gdHJ1ZSAmJiBiZWxvd0JyZWFrcG9pbnQudmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgc2hvdyhmYWxzZSlcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBmbigpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcblxuICAgIG9uQmVmb3JlVW5tb3VudCgoKSA9PiB7XG4gICAgICBsYXlvdXRUb3RhbFdpZHRoV2F0Y2hlciAhPT0gdm9pZCAwICYmIGxheW91dFRvdGFsV2lkdGhXYXRjaGVyKClcblxuICAgICAgaWYgKHRpbWVyTWluaSAhPT0gbnVsbCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZXJNaW5pKVxuICAgICAgICB0aW1lck1pbmkgPSBudWxsXG4gICAgICB9XG5cbiAgICAgIHNob3dpbmcudmFsdWUgPT09IHRydWUgJiYgY2xlYW51cCgpXG5cbiAgICAgIGlmICgkbGF5b3V0Lmluc3RhbmNlc1sgcHJvcHMuc2lkZSBdID09PSBpbnN0YW5jZSkge1xuICAgICAgICAkbGF5b3V0Lmluc3RhbmNlc1sgcHJvcHMuc2lkZSBdID0gdm9pZCAwXG4gICAgICAgIHVwZGF0ZUxheW91dCgnc2l6ZScsIDApXG4gICAgICAgIHVwZGF0ZUxheW91dCgnb2Zmc2V0JywgMClcbiAgICAgICAgdXBkYXRlTGF5b3V0KCdzcGFjZScsIGZhbHNlKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY29uc3QgY2hpbGQgPSBbXVxuXG4gICAgICBpZiAoYmVsb3dCcmVha3BvaW50LnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIHByb3BzLm5vU3dpcGVPcGVuID09PSBmYWxzZSAmJiBjaGlsZC5wdXNoKFxuICAgICAgICAgIHdpdGhEaXJlY3RpdmVzKFxuICAgICAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgICAgICBrZXk6ICdvcGVuJyxcbiAgICAgICAgICAgICAgY2xhc3M6IGBxLWRyYXdlcl9fb3BlbmVyIGZpeGVkLSR7IHByb3BzLnNpZGUgfWAsXG4gICAgICAgICAgICAgICdhcmlhLWhpZGRlbic6ICd0cnVlJ1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBvcGVuRGlyZWN0aXZlLnZhbHVlXG4gICAgICAgICAgKVxuICAgICAgICApXG5cbiAgICAgICAgY2hpbGQucHVzaChcbiAgICAgICAgICBoRGlyKFxuICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHJlZjogJ2JhY2tkcm9wJyxcbiAgICAgICAgICAgICAgY2xhc3M6IGJhY2tkcm9wQ2xhc3MudmFsdWUsXG4gICAgICAgICAgICAgIHN0eWxlOiBiYWNrZHJvcFN0eWxlLnZhbHVlLFxuICAgICAgICAgICAgICAnYXJpYS1oaWRkZW4nOiAndHJ1ZScsXG4gICAgICAgICAgICAgIG9uQ2xpY2s6IGhpZGVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB2b2lkIDAsXG4gICAgICAgICAgICAnYmFja2Ryb3AnLFxuICAgICAgICAgICAgcHJvcHMubm9Td2lwZUJhY2tkcm9wICE9PSB0cnVlICYmIHNob3dpbmcudmFsdWUgPT09IHRydWUsXG4gICAgICAgICAgICAoKSA9PiBiYWNrZHJvcENsb3NlRGlyZWN0aXZlLnZhbHVlXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG1pbmkgPSBpc01pbmkudmFsdWUgPT09IHRydWUgJiYgc2xvdHMubWluaSAhPT0gdm9pZCAwXG4gICAgICBjb25zdCBjb250ZW50ID0gW1xuICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgLi4uYXR0cnMsXG4gICAgICAgICAga2V5OiAnJyArIG1pbmksIC8vIHJlcXVpcmVkIG90aGVyd2lzZSBWdWUgd2lsbCBub3QgZGlmZiBjb3JyZWN0bHlcbiAgICAgICAgICBjbGFzczogW1xuICAgICAgICAgICAgY29udGVudENsYXNzLnZhbHVlLFxuICAgICAgICAgICAgYXR0cnMuY2xhc3NcbiAgICAgICAgICBdXG4gICAgICAgIH0sIG1pbmkgPT09IHRydWVcbiAgICAgICAgICA/IHNsb3RzLm1pbmkoKVxuICAgICAgICAgIDogaFNsb3Qoc2xvdHMuZGVmYXVsdClcbiAgICAgICAgKVxuICAgICAgXVxuXG4gICAgICBpZiAocHJvcHMuZWxldmF0ZWQgPT09IHRydWUgJiYgc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBjb250ZW50LnB1c2goXG4gICAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgICAgY2xhc3M6ICdxLWxheW91dF9fc2hhZG93IGFic29sdXRlLWZ1bGwgb3ZlcmZsb3ctaGlkZGVuIG5vLXBvaW50ZXItZXZlbnRzJ1xuICAgICAgICAgIH0pXG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgY2hpbGQucHVzaChcbiAgICAgICAgaERpcihcbiAgICAgICAgICAnYXNpZGUnLFxuICAgICAgICAgIHsgcmVmOiAnY29udGVudCcsIGNsYXNzOiBjbGFzc2VzLnZhbHVlLCBzdHlsZTogc3R5bGUudmFsdWUgfSxcbiAgICAgICAgICBjb250ZW50LFxuICAgICAgICAgICdjb250ZW50Y2xvc2UnLFxuICAgICAgICAgIHByb3BzLm5vU3dpcGVDbG9zZSAhPT0gdHJ1ZSAmJiBiZWxvd0JyZWFrcG9pbnQudmFsdWUgPT09IHRydWUsXG4gICAgICAgICAgKCkgPT4gY29udGVudENsb3NlRGlyZWN0aXZlLnZhbHVlXG4gICAgICAgIClcbiAgICAgIClcblxuICAgICAgcmV0dXJuIGgoJ2RpdicsIHsgY2xhc3M6ICdxLWRyYXdlci1jb250YWluZXInIH0sIGNoaWxkKVxuICAgIH1cbiAgfVxufSlcbiIsImltcG9ydCB7IGgsIGNvbXB1dGVkIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGhNZXJnZVNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcblxuY29uc3QgYWxpZ25WYWx1ZXMgPSBbICd0b3AnLCAnbWlkZGxlJywgJ2JvdHRvbScgXVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUUJhZGdlJyxcblxuICBwcm9wczoge1xuICAgIGNvbG9yOiBTdHJpbmcsXG4gICAgdGV4dENvbG9yOiBTdHJpbmcsXG5cbiAgICBmbG9hdGluZzogQm9vbGVhbixcbiAgICB0cmFuc3BhcmVudDogQm9vbGVhbixcbiAgICBtdWx0aUxpbmU6IEJvb2xlYW4sXG4gICAgb3V0bGluZTogQm9vbGVhbixcbiAgICByb3VuZGVkOiBCb29sZWFuLFxuXG4gICAgbGFiZWw6IFsgTnVtYmVyLCBTdHJpbmcgXSxcblxuICAgIGFsaWduOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICB2YWxpZGF0b3I6IHYgPT4gYWxpZ25WYWx1ZXMuaW5jbHVkZXModilcbiAgICB9XG4gIH0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzIH0pIHtcbiAgICBjb25zdCBzdHlsZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIHJldHVybiBwcm9wcy5hbGlnbiAhPT0gdm9pZCAwXG4gICAgICAgID8geyB2ZXJ0aWNhbEFsaWduOiBwcm9wcy5hbGlnbiB9XG4gICAgICAgIDogbnVsbFxuICAgIH0pXG5cbiAgICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3QgdGV4dCA9IHByb3BzLm91dGxpbmUgPT09IHRydWVcbiAgICAgICAgPyBwcm9wcy5jb2xvciB8fCBwcm9wcy50ZXh0Q29sb3JcbiAgICAgICAgOiBwcm9wcy50ZXh0Q29sb3JcblxuICAgICAgcmV0dXJuICdxLWJhZGdlIGZsZXggaW5saW5lIGl0ZW1zLWNlbnRlciBuby13cmFwJ1xuICAgICAgICArIGAgcS1iYWRnZS0tJHsgcHJvcHMubXVsdGlMaW5lID09PSB0cnVlID8gJ211bHRpJyA6ICdzaW5nbGUnIH0tbGluZWBcbiAgICAgICAgKyAocHJvcHMub3V0bGluZSA9PT0gdHJ1ZVxuICAgICAgICAgID8gJyBxLWJhZGdlLS1vdXRsaW5lJ1xuICAgICAgICAgIDogKHByb3BzLmNvbG9yICE9PSB2b2lkIDAgPyBgIGJnLSR7IHByb3BzLmNvbG9yIH1gIDogJycpXG4gICAgICAgIClcbiAgICAgICAgKyAodGV4dCAhPT0gdm9pZCAwID8gYCB0ZXh0LSR7IHRleHQgfWAgOiAnJylcbiAgICAgICAgKyAocHJvcHMuZmxvYXRpbmcgPT09IHRydWUgPyAnIHEtYmFkZ2UtLWZsb2F0aW5nJyA6ICcnKVxuICAgICAgICArIChwcm9wcy5yb3VuZGVkID09PSB0cnVlID8gJyBxLWJhZGdlLS1yb3VuZGVkJyA6ICcnKVxuICAgICAgICArIChwcm9wcy50cmFuc3BhcmVudCA9PT0gdHJ1ZSA/ICcgcS1iYWRnZS0tdHJhbnNwYXJlbnQnIDogJycpXG4gICAgfSlcblxuICAgIHJldHVybiAoKSA9PiBoKCdkaXYnLCB7XG4gICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZSxcbiAgICAgIHN0eWxlOiBzdHlsZS52YWx1ZSxcbiAgICAgIHJvbGU6ICdzdGF0dXMnLFxuICAgICAgJ2FyaWEtbGFiZWwnOiBwcm9wcy5sYWJlbFxuICAgIH0sIGhNZXJnZVNsb3Qoc2xvdHMuZGVmYXVsdCwgcHJvcHMubGFiZWwgIT09IHZvaWQgMCA/IFsgcHJvcHMubGFiZWwgXSA6IFtdKSlcbiAgfVxufSlcbiIsImltcG9ydCB7IGgsIG9uQmVmb3JlVW5tb3VudCwgVHJhbnNpdGlvbiB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRU2xpZGVUcmFuc2l0aW9uJyxcblxuICBwcm9wczoge1xuICAgIGFwcGVhcjogQm9vbGVhbixcbiAgICBkdXJhdGlvbjoge1xuICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgZGVmYXVsdDogMzAwXG4gICAgfVxuICB9LFxuXG4gIGVtaXRzOiBbICdzaG93JywgJ2hpZGUnIF0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzLCBlbWl0IH0pIHtcbiAgICBsZXQgYW5pbWF0aW5nID0gZmFsc2UsIGRvbmVGbiwgZWxlbWVudFxuICAgIGxldCB0aW1lciA9IG51bGwsIHRpbWVyRmFsbGJhY2sgPSBudWxsLCBhbmltTGlzdGVuZXIsIGxhc3RFdmVudFxuXG4gICAgZnVuY3Rpb24gY2xlYW51cCAoKSB7XG4gICAgICBkb25lRm4gJiYgZG9uZUZuKClcbiAgICAgIGRvbmVGbiA9IG51bGxcbiAgICAgIGFuaW1hdGluZyA9IGZhbHNlXG5cbiAgICAgIGlmICh0aW1lciAhPT0gbnVsbCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpXG4gICAgICAgIHRpbWVyID0gbnVsbFxuICAgICAgfVxuXG4gICAgICBpZiAodGltZXJGYWxsYmFjayAhPT0gbnVsbCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZXJGYWxsYmFjaylcbiAgICAgICAgdGltZXJGYWxsYmFjayA9IG51bGxcbiAgICAgIH1cblxuICAgICAgZWxlbWVudCAhPT0gdm9pZCAwICYmIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIGFuaW1MaXN0ZW5lcilcbiAgICAgIGFuaW1MaXN0ZW5lciA9IG51bGxcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBiZWdpbiAoZWwsIGhlaWdodCwgZG9uZSkge1xuICAgICAgLy8gaGVyZSBvdmVyZmxvd1kgaXMgJ2hpZGRlbidcbiAgICAgIGlmIChoZWlnaHQgIT09IHZvaWQgMCkge1xuICAgICAgICBlbC5zdHlsZS5oZWlnaHQgPSBgJHsgaGVpZ2h0IH1weGBcbiAgICAgIH1cbiAgICAgIGVsLnN0eWxlLnRyYW5zaXRpb24gPSBgaGVpZ2h0ICR7IHByb3BzLmR1cmF0aW9uIH1tcyBjdWJpYy1iZXppZXIoLjI1LCAuOCwgLjUwLCAxKWBcblxuICAgICAgYW5pbWF0aW5nID0gdHJ1ZVxuICAgICAgZG9uZUZuID0gZG9uZVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVuZCAoZWwsIGV2ZW50KSB7XG4gICAgICBlbC5zdHlsZS5vdmVyZmxvd1kgPSBudWxsXG4gICAgICBlbC5zdHlsZS5oZWlnaHQgPSBudWxsXG4gICAgICBlbC5zdHlsZS50cmFuc2l0aW9uID0gbnVsbFxuICAgICAgY2xlYW51cCgpXG4gICAgICBldmVudCAhPT0gbGFzdEV2ZW50ICYmIGVtaXQoZXZlbnQpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25FbnRlciAoZWwsIGRvbmUpIHtcbiAgICAgIGxldCBwb3MgPSAwXG4gICAgICBlbGVtZW50ID0gZWxcblxuICAgICAgLy8gaWYgYW5pbWF0aW9uZyBvdmVyZmxvd1kgaXMgYWxyZWFkeSAnaGlkZGVuJ1xuICAgICAgaWYgKGFuaW1hdGluZyA9PT0gdHJ1ZSkge1xuICAgICAgICBjbGVhbnVwKClcbiAgICAgICAgcG9zID0gZWwub2Zmc2V0SGVpZ2h0ID09PSBlbC5zY3JvbGxIZWlnaHQgPyAwIDogdm9pZCAwXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgbGFzdEV2ZW50ID0gJ2hpZGUnXG4gICAgICAgIGVsLnN0eWxlLm92ZXJmbG93WSA9ICdoaWRkZW4nXG4gICAgICB9XG5cbiAgICAgIGJlZ2luKGVsLCBwb3MsIGRvbmUpXG5cbiAgICAgIHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRpbWVyID0gbnVsbFxuICAgICAgICBlbC5zdHlsZS5oZWlnaHQgPSBgJHsgZWwuc2Nyb2xsSGVpZ2h0IH1weGBcbiAgICAgICAgYW5pbUxpc3RlbmVyID0gZXZ0ID0+IHtcbiAgICAgICAgICB0aW1lckZhbGxiYWNrID0gbnVsbFxuXG4gICAgICAgICAgaWYgKE9iamVjdChldnQpICE9PSBldnQgfHwgZXZ0LnRhcmdldCA9PT0gZWwpIHtcbiAgICAgICAgICAgIGVuZChlbCwgJ3Nob3cnKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgYW5pbUxpc3RlbmVyKVxuICAgICAgICB0aW1lckZhbGxiYWNrID0gc2V0VGltZW91dChhbmltTGlzdGVuZXIsIHByb3BzLmR1cmF0aW9uICogMS4xKVxuICAgICAgfSwgMTAwKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uTGVhdmUgKGVsLCBkb25lKSB7XG4gICAgICBsZXQgcG9zXG4gICAgICBlbGVtZW50ID0gZWxcblxuICAgICAgaWYgKGFuaW1hdGluZyA9PT0gdHJ1ZSkge1xuICAgICAgICBjbGVhbnVwKClcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBsYXN0RXZlbnQgPSAnc2hvdydcbiAgICAgICAgLy8gd2UgbmVlZCB0byBzZXQgb3ZlcmZsb3dZICdoaWRkZW4nIGJlZm9yZSBjYWxjdWxhdGluZyB0aGUgaGVpZ2h0XG4gICAgICAgIC8vIG9yIGVsc2Ugd2UgZ2V0IHNtYWxsIGRpZmZlcmVuY2VzXG4gICAgICAgIGVsLnN0eWxlLm92ZXJmbG93WSA9ICdoaWRkZW4nXG4gICAgICAgIHBvcyA9IGVsLnNjcm9sbEhlaWdodFxuICAgICAgfVxuXG4gICAgICBiZWdpbihlbCwgcG9zLCBkb25lKVxuXG4gICAgICB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aW1lciA9IG51bGxcbiAgICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gMFxuICAgICAgICBhbmltTGlzdGVuZXIgPSBldnQgPT4ge1xuICAgICAgICAgIHRpbWVyRmFsbGJhY2sgPSBudWxsXG5cbiAgICAgICAgICBpZiAoT2JqZWN0KGV2dCkgIT09IGV2dCB8fCBldnQudGFyZ2V0ID09PSBlbCkge1xuICAgICAgICAgICAgZW5kKGVsLCAnaGlkZScpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBhbmltTGlzdGVuZXIpXG4gICAgICAgIHRpbWVyRmFsbGJhY2sgPSBzZXRUaW1lb3V0KGFuaW1MaXN0ZW5lciwgcHJvcHMuZHVyYXRpb24gKiAxLjEpXG4gICAgICB9LCAxMDApXG4gICAgfVxuXG4gICAgb25CZWZvcmVVbm1vdW50KCgpID0+IHtcbiAgICAgIGFuaW1hdGluZyA9PT0gdHJ1ZSAmJiBjbGVhbnVwKClcbiAgICB9KVxuXG4gICAgcmV0dXJuICgpID0+IGgoVHJhbnNpdGlvbiwge1xuICAgICAgY3NzOiBmYWxzZSxcbiAgICAgIGFwcGVhcjogcHJvcHMuYXBwZWFyLFxuICAgICAgb25FbnRlcixcbiAgICAgIG9uTGVhdmVcbiAgICB9LCBzbG90cy5kZWZhdWx0KVxuICB9XG59KVxuIiwiaW1wb3J0IHsgaCwgc2hhbGxvd1JlYWN0aXZlLCByZWYsIGNvbXB1dGVkLCB3YXRjaCwgd2l0aERpcmVjdGl2ZXMsIGdldEN1cnJlbnRJbnN0YW5jZSwgdlNob3csIG9uQmVmb3JlVW5tb3VudCB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IFFJdGVtIGZyb20gJy4uL2l0ZW0vUUl0ZW0uanMnXG5pbXBvcnQgUUl0ZW1TZWN0aW9uIGZyb20gJy4uL2l0ZW0vUUl0ZW1TZWN0aW9uLmpzJ1xuaW1wb3J0IFFJdGVtTGFiZWwgZnJvbSAnLi4vaXRlbS9RSXRlbUxhYmVsLmpzJ1xuaW1wb3J0IFFJY29uIGZyb20gJy4uL2ljb24vUUljb24uanMnXG5pbXBvcnQgUVNsaWRlVHJhbnNpdGlvbiBmcm9tICcuLi9zbGlkZS10cmFuc2l0aW9uL1FTbGlkZVRyYW5zaXRpb24uanMnXG5pbXBvcnQgUVNlcGFyYXRvciBmcm9tICcuLi9zZXBhcmF0b3IvUVNlcGFyYXRvci5qcydcblxuaW1wb3J0IHVzZURhcmssIHsgdXNlRGFya1Byb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtZGFyay5qcydcbmltcG9ydCB7IHVzZVJvdXRlckxpbmtQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLXJvdXRlci1saW5rLmpzJ1xuaW1wb3J0IHVzZU1vZGVsVG9nZ2xlLCB7IHVzZU1vZGVsVG9nZ2xlUHJvcHMsIHVzZU1vZGVsVG9nZ2xlRW1pdHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1tb2RlbC10b2dnbGUuanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgc3RvcEFuZFByZXZlbnQgfSBmcm9tICcuLi8uLi91dGlscy9ldmVudC5qcydcbmltcG9ydCB7IGhTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9yZW5kZXIuanMnXG5pbXBvcnQgdWlkIGZyb20gJy4uLy4uL3V0aWxzL3VpZC5qcydcblxuY29uc3QgaXRlbUdyb3VwcyA9IHNoYWxsb3dSZWFjdGl2ZSh7fSlcbmNvbnN0IExJTktfUFJPUFMgPSBPYmplY3Qua2V5cyh1c2VSb3V0ZXJMaW5rUHJvcHMpXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRRXhwYW5zaW9uSXRlbScsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VSb3V0ZXJMaW5rUHJvcHMsXG4gICAgLi4udXNlTW9kZWxUb2dnbGVQcm9wcyxcbiAgICAuLi51c2VEYXJrUHJvcHMsXG5cbiAgICBpY29uOiBTdHJpbmcsXG5cbiAgICBsYWJlbDogU3RyaW5nLFxuICAgIGxhYmVsTGluZXM6IFsgTnVtYmVyLCBTdHJpbmcgXSxcblxuICAgIGNhcHRpb246IFN0cmluZyxcbiAgICBjYXB0aW9uTGluZXM6IFsgTnVtYmVyLCBTdHJpbmcgXSxcblxuICAgIGRlbnNlOiBCb29sZWFuLFxuXG4gICAgdG9nZ2xlQXJpYUxhYmVsOiBTdHJpbmcsXG4gICAgZXhwYW5kSWNvbjogU3RyaW5nLFxuICAgIGV4cGFuZGVkSWNvbjogU3RyaW5nLFxuICAgIGV4cGFuZEljb25DbGFzczogWyBBcnJheSwgU3RyaW5nLCBPYmplY3QgXSxcbiAgICBkdXJhdGlvbjogTnVtYmVyLFxuXG4gICAgaGVhZGVySW5zZXRMZXZlbDogTnVtYmVyLFxuICAgIGNvbnRlbnRJbnNldExldmVsOiBOdW1iZXIsXG5cbiAgICBleHBhbmRTZXBhcmF0b3I6IEJvb2xlYW4sXG4gICAgZGVmYXVsdE9wZW5lZDogQm9vbGVhbixcbiAgICBoaWRlRXhwYW5kSWNvbjogQm9vbGVhbixcbiAgICBleHBhbmRJY29uVG9nZ2xlOiBCb29sZWFuLFxuICAgIHN3aXRjaFRvZ2dsZVNpZGU6IEJvb2xlYW4sXG4gICAgZGVuc2VUb2dnbGU6IEJvb2xlYW4sXG4gICAgZ3JvdXA6IFN0cmluZyxcbiAgICBwb3B1cDogQm9vbGVhbixcblxuICAgIGhlYWRlclN0eWxlOiBbIEFycmF5LCBTdHJpbmcsIE9iamVjdCBdLFxuICAgIGhlYWRlckNsYXNzOiBbIEFycmF5LCBTdHJpbmcsIE9iamVjdCBdXG4gIH0sXG5cbiAgZW1pdHM6IFtcbiAgICAuLi51c2VNb2RlbFRvZ2dsZUVtaXRzLFxuICAgICdjbGljaycsICdhZnRlclNob3cnLCAnYWZ0ZXJIaWRlJ1xuICBdLFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cywgZW1pdCB9KSB7XG4gICAgY29uc3QgeyBwcm94eTogeyAkcSB9IH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuICAgIGNvbnN0IGlzRGFyayA9IHVzZURhcmsocHJvcHMsICRxKVxuXG4gICAgY29uc3Qgc2hvd2luZyA9IHJlZihcbiAgICAgIHByb3BzLm1vZGVsVmFsdWUgIT09IG51bGxcbiAgICAgICAgPyBwcm9wcy5tb2RlbFZhbHVlXG4gICAgICAgIDogcHJvcHMuZGVmYXVsdE9wZW5lZFxuICAgIClcblxuICAgIGNvbnN0IGJsdXJUYXJnZXRSZWYgPSByZWYobnVsbClcbiAgICBjb25zdCB0YXJnZXRVaWQgPSB1aWQoKVxuXG4gICAgY29uc3QgeyBzaG93LCBoaWRlLCB0b2dnbGUgfSA9IHVzZU1vZGVsVG9nZ2xlKHsgc2hvd2luZyB9KVxuXG4gICAgbGV0IHVuaXF1ZUlkLCBleGl0R3JvdXBcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3EtZXhwYW5zaW9uLWl0ZW0gcS1pdGVtLXR5cGUnXG4gICAgICArIGAgcS1leHBhbnNpb24taXRlbS0tJHsgc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSA/ICdleHBhbmRlZCcgOiAnY29sbGFwc2VkJyB9YFxuICAgICAgKyBgIHEtZXhwYW5zaW9uLWl0ZW0tLSR7IHByb3BzLnBvcHVwID09PSB0cnVlID8gJ3BvcHVwJyA6ICdzdGFuZGFyZCcgfWBcbiAgICApXG5cbiAgICBjb25zdCBjb250ZW50U3R5bGUgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBpZiAocHJvcHMuY29udGVudEluc2V0TGV2ZWwgPT09IHZvaWQgMCkge1xuICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgfVxuXG4gICAgICBjb25zdCBkaXIgPSAkcS5sYW5nLnJ0bCA9PT0gdHJ1ZSA/ICdSaWdodCcgOiAnTGVmdCdcbiAgICAgIHJldHVybiB7XG4gICAgICAgIFsgJ3BhZGRpbmcnICsgZGlyIF06IChwcm9wcy5jb250ZW50SW5zZXRMZXZlbCAqIDU2KSArICdweCdcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgY29uc3QgaGFzTGluayA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBwcm9wcy5kaXNhYmxlICE9PSB0cnVlICYmIChcbiAgICAgICAgcHJvcHMuaHJlZiAhPT0gdm9pZCAwXG4gICAgICAgIHx8IChwcm9wcy50byAhPT0gdm9pZCAwICYmIHByb3BzLnRvICE9PSBudWxsICYmIHByb3BzLnRvICE9PSAnJylcbiAgICAgIClcbiAgICApXG5cbiAgICBjb25zdCBsaW5rUHJvcHMgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCBhY2MgPSB7fVxuICAgICAgTElOS19QUk9QUy5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgIGFjY1sga2V5IF0gPSBwcm9wc1sga2V5IF1cbiAgICAgIH0pXG4gICAgICByZXR1cm4gYWNjXG4gICAgfSlcblxuICAgIGNvbnN0IGlzQ2xpY2thYmxlID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIGhhc0xpbmsudmFsdWUgPT09IHRydWUgfHwgcHJvcHMuZXhwYW5kSWNvblRvZ2dsZSAhPT0gdHJ1ZVxuICAgIClcblxuICAgIGNvbnN0IGV4cGFuc2lvbkljb24gPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBwcm9wcy5leHBhbmRlZEljb24gIT09IHZvaWQgMCAmJiBzaG93aW5nLnZhbHVlID09PSB0cnVlXG4gICAgICAgID8gcHJvcHMuZXhwYW5kZWRJY29uXG4gICAgICAgIDogcHJvcHMuZXhwYW5kSWNvbiB8fCAkcS5pY29uU2V0LmV4cGFuc2lvbkl0ZW1bIHByb3BzLmRlbnNlVG9nZ2xlID09PSB0cnVlID8gJ2RlbnNlSWNvbicgOiAnaWNvbicgXVxuICAgICkpXG5cbiAgICBjb25zdCBhY3RpdmVUb2dnbGVJY29uID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIHByb3BzLmRpc2FibGUgIT09IHRydWUgJiYgKGhhc0xpbmsudmFsdWUgPT09IHRydWUgfHwgcHJvcHMuZXhwYW5kSWNvblRvZ2dsZSA9PT0gdHJ1ZSlcbiAgICApXG5cbiAgICBjb25zdCBoZWFkZXJTbG90U2NvcGUgPSBjb21wdXRlZCgoKSA9PiAoe1xuICAgICAgZXhwYW5kZWQ6IHNob3dpbmcudmFsdWUgPT09IHRydWUsXG4gICAgICBkZXRhaWxzSWQ6IHByb3BzLnRhcmdldFVpZCxcbiAgICAgIHRvZ2dsZSxcbiAgICAgIHNob3csXG4gICAgICBoaWRlXG4gICAgfSkpXG5cbiAgICBjb25zdCB0b2dnbGVBcmlhQXR0cnMgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCB0b2dnbGVBcmlhTGFiZWwgPSBwcm9wcy50b2dnbGVBcmlhTGFiZWwgIT09IHZvaWQgMFxuICAgICAgICA/IHByb3BzLnRvZ2dsZUFyaWFMYWJlbFxuICAgICAgICA6ICRxLmxhbmcubGFiZWxbIHNob3dpbmcudmFsdWUgPT09IHRydWUgPyAnY29sbGFwc2UnIDogJ2V4cGFuZCcgXShwcm9wcy5sYWJlbClcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcm9sZTogJ2J1dHRvbicsXG4gICAgICAgICdhcmlhLWV4cGFuZGVkJzogc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSA/ICd0cnVlJyA6ICdmYWxzZScsXG4gICAgICAgICdhcmlhLWNvbnRyb2xzJzogdGFyZ2V0VWlkLFxuICAgICAgICAnYXJpYS1sYWJlbCc6IHRvZ2dsZUFyaWFMYWJlbFxuICAgICAgfVxuICAgIH0pXG5cbiAgICB3YXRjaCgoKSA9PiBwcm9wcy5ncm91cCwgbmFtZSA9PiB7XG4gICAgICBleGl0R3JvdXAgIT09IHZvaWQgMCAmJiBleGl0R3JvdXAoKVxuICAgICAgbmFtZSAhPT0gdm9pZCAwICYmIGVudGVyR3JvdXAoKVxuICAgIH0pXG5cbiAgICBmdW5jdGlvbiBvbkhlYWRlckNsaWNrIChlKSB7XG4gICAgICBoYXNMaW5rLnZhbHVlICE9PSB0cnVlICYmIHRvZ2dsZShlKVxuICAgICAgZW1pdCgnY2xpY2snLCBlKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRvZ2dsZUljb25LZXlib2FyZCAoZSkge1xuICAgICAgZS5rZXlDb2RlID09PSAxMyAmJiB0b2dnbGVJY29uKGUsIHRydWUpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG9nZ2xlSWNvbiAoZSwga2V5Ym9hcmQpIHtcbiAgICAgIGtleWJvYXJkICE9PSB0cnVlICYmIGJsdXJUYXJnZXRSZWYudmFsdWUgIT09IG51bGwgJiYgYmx1clRhcmdldFJlZi52YWx1ZS5mb2N1cygpXG4gICAgICB0b2dnbGUoZSlcbiAgICAgIHN0b3BBbmRQcmV2ZW50KGUpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25TaG93ICgpIHtcbiAgICAgIGVtaXQoJ2FmdGVyU2hvdycpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25IaWRlICgpIHtcbiAgICAgIGVtaXQoJ2FmdGVySGlkZScpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZW50ZXJHcm91cCAoKSB7XG4gICAgICBpZiAodW5pcXVlSWQgPT09IHZvaWQgMCkge1xuICAgICAgICB1bmlxdWVJZCA9IHVpZCgpXG4gICAgICB9XG5cbiAgICAgIGlmIChzaG93aW5nLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIGl0ZW1Hcm91cHNbIHByb3BzLmdyb3VwIF0gPSB1bmlxdWVJZFxuICAgICAgfVxuXG4gICAgICBjb25zdCBzaG93ID0gd2F0Y2goc2hvd2luZywgdmFsID0+IHtcbiAgICAgICAgaWYgKHZhbCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGl0ZW1Hcm91cHNbIHByb3BzLmdyb3VwIF0gPSB1bmlxdWVJZFxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGl0ZW1Hcm91cHNbIHByb3BzLmdyb3VwIF0gPT09IHVuaXF1ZUlkKSB7XG4gICAgICAgICAgZGVsZXRlIGl0ZW1Hcm91cHNbIHByb3BzLmdyb3VwIF1cbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgICAgY29uc3QgZ3JvdXAgPSB3YXRjaChcbiAgICAgICAgKCkgPT4gaXRlbUdyb3Vwc1sgcHJvcHMuZ3JvdXAgXSxcbiAgICAgICAgKHZhbCwgb2xkVmFsKSA9PiB7XG4gICAgICAgICAgaWYgKG9sZFZhbCA9PT0gdW5pcXVlSWQgJiYgdmFsICE9PSB2b2lkIDAgJiYgdmFsICE9PSB1bmlxdWVJZCkge1xuICAgICAgICAgICAgaGlkZSgpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICApXG5cbiAgICAgIGV4aXRHcm91cCA9ICgpID0+IHtcbiAgICAgICAgc2hvdygpXG4gICAgICAgIGdyb3VwKClcblxuICAgICAgICBpZiAoaXRlbUdyb3Vwc1sgcHJvcHMuZ3JvdXAgXSA9PT0gdW5pcXVlSWQpIHtcbiAgICAgICAgICBkZWxldGUgaXRlbUdyb3Vwc1sgcHJvcHMuZ3JvdXAgXVxuICAgICAgICB9XG5cbiAgICAgICAgZXhpdEdyb3VwID0gdm9pZCAwXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0VG9nZ2xlSWNvbiAoKSB7XG4gICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICBjbGFzczogW1xuICAgICAgICAgICdxLWZvY3VzYWJsZSByZWxhdGl2ZS1wb3NpdGlvbiBjdXJzb3ItcG9pbnRlcidcbiAgICAgICAgICAgICsgYCR7IHByb3BzLmRlbnNlVG9nZ2xlID09PSB0cnVlICYmIHByb3BzLnN3aXRjaFRvZ2dsZVNpZGUgPT09IHRydWUgPyAnIGl0ZW1zLWVuZCcgOiAnJyB9YCxcbiAgICAgICAgICBwcm9wcy5leHBhbmRJY29uQ2xhc3NcbiAgICAgICAgXSxcbiAgICAgICAgc2lkZTogcHJvcHMuc3dpdGNoVG9nZ2xlU2lkZSAhPT0gdHJ1ZSxcbiAgICAgICAgYXZhdGFyOiBwcm9wcy5zd2l0Y2hUb2dnbGVTaWRlXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNoaWxkID0gW1xuICAgICAgICBoKFFJY29uLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLWV4cGFuc2lvbi1pdGVtX190b2dnbGUtaWNvbidcbiAgICAgICAgICAgICsgKHByb3BzLmV4cGFuZGVkSWNvbiA9PT0gdm9pZCAwICYmIHNob3dpbmcudmFsdWUgPT09IHRydWVcbiAgICAgICAgICAgICAgPyAnIHEtZXhwYW5zaW9uLWl0ZW1fX3RvZ2dsZS1pY29uLS1yb3RhdGVkJ1xuICAgICAgICAgICAgICA6ICcnKSxcbiAgICAgICAgICBuYW1lOiBleHBhbnNpb25JY29uLnZhbHVlXG4gICAgICAgIH0pXG4gICAgICBdXG5cbiAgICAgIGlmIChhY3RpdmVUb2dnbGVJY29uLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24oZGF0YSwge1xuICAgICAgICAgIHRhYmluZGV4OiAwLFxuICAgICAgICAgIC4uLnRvZ2dsZUFyaWFBdHRycy52YWx1ZSxcbiAgICAgICAgICBvbkNsaWNrOiB0b2dnbGVJY29uLFxuICAgICAgICAgIG9uS2V5dXA6IHRvZ2dsZUljb25LZXlib2FyZFxuICAgICAgICB9KVxuXG4gICAgICAgIGNoaWxkLnVuc2hpZnQoXG4gICAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgICAgcmVmOiBibHVyVGFyZ2V0UmVmLFxuICAgICAgICAgICAgY2xhc3M6ICdxLWV4cGFuc2lvbi1pdGVtX190b2dnbGUtZm9jdXMgcS1pY29uIHEtZm9jdXMtaGVscGVyIHEtZm9jdXMtaGVscGVyLS1yb3VuZGVkJyxcbiAgICAgICAgICAgIHRhYmluZGV4OiAtMVxuICAgICAgICAgIH0pXG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGgoUUl0ZW1TZWN0aW9uLCBkYXRhLCAoKSA9PiBjaGlsZClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRIZWFkZXJDaGlsZCAoKSB7XG4gICAgICBsZXQgY2hpbGRcblxuICAgICAgaWYgKHNsb3RzLmhlYWRlciAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGNoaWxkID0gW10uY29uY2F0KHNsb3RzLmhlYWRlcihoZWFkZXJTbG90U2NvcGUudmFsdWUpKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGNoaWxkID0gW1xuICAgICAgICAgIGgoUUl0ZW1TZWN0aW9uLCAoKSA9PiBbXG4gICAgICAgICAgICBoKFFJdGVtTGFiZWwsIHsgbGluZXM6IHByb3BzLmxhYmVsTGluZXMgfSwgKCkgPT4gcHJvcHMubGFiZWwgfHwgJycpLFxuXG4gICAgICAgICAgICBwcm9wcy5jYXB0aW9uXG4gICAgICAgICAgICAgID8gaChRSXRlbUxhYmVsLCB7IGxpbmVzOiBwcm9wcy5jYXB0aW9uTGluZXMsIGNhcHRpb246IHRydWUgfSwgKCkgPT4gcHJvcHMuY2FwdGlvbilcbiAgICAgICAgICAgICAgOiBudWxsXG4gICAgICAgICAgXSlcbiAgICAgICAgXVxuXG4gICAgICAgIHByb3BzLmljb24gJiYgY2hpbGRbIHByb3BzLnN3aXRjaFRvZ2dsZVNpZGUgPT09IHRydWUgPyAncHVzaCcgOiAndW5zaGlmdCcgXShcbiAgICAgICAgICBoKFFJdGVtU2VjdGlvbiwge1xuICAgICAgICAgICAgc2lkZTogcHJvcHMuc3dpdGNoVG9nZ2xlU2lkZSA9PT0gdHJ1ZSxcbiAgICAgICAgICAgIGF2YXRhcjogcHJvcHMuc3dpdGNoVG9nZ2xlU2lkZSAhPT0gdHJ1ZVxuICAgICAgICAgIH0sICgpID0+IGgoUUljb24sIHsgbmFtZTogcHJvcHMuaWNvbiB9KSlcbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICBpZiAocHJvcHMuZGlzYWJsZSAhPT0gdHJ1ZSAmJiBwcm9wcy5oaWRlRXhwYW5kSWNvbiAhPT0gdHJ1ZSkge1xuICAgICAgICBjaGlsZFsgcHJvcHMuc3dpdGNoVG9nZ2xlU2lkZSA9PT0gdHJ1ZSA/ICd1bnNoaWZ0JyA6ICdwdXNoJyBdKFxuICAgICAgICAgIGdldFRvZ2dsZUljb24oKVxuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjaGlsZFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEhlYWRlciAoKSB7XG4gICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICByZWY6ICdpdGVtJyxcbiAgICAgICAgc3R5bGU6IHByb3BzLmhlYWRlclN0eWxlLFxuICAgICAgICBjbGFzczogcHJvcHMuaGVhZGVyQ2xhc3MsXG4gICAgICAgIGRhcms6IGlzRGFyay52YWx1ZSxcbiAgICAgICAgZGlzYWJsZTogcHJvcHMuZGlzYWJsZSxcbiAgICAgICAgZGVuc2U6IHByb3BzLmRlbnNlLFxuICAgICAgICBpbnNldExldmVsOiBwcm9wcy5oZWFkZXJJbnNldExldmVsXG4gICAgICB9XG5cbiAgICAgIGlmIChpc0NsaWNrYWJsZS52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBkYXRhLmNsaWNrYWJsZSA9IHRydWVcbiAgICAgICAgZGF0YS5vbkNsaWNrID0gb25IZWFkZXJDbGlja1xuXG4gICAgICAgIE9iamVjdC5hc3NpZ24oXG4gICAgICAgICAgZGF0YSxcbiAgICAgICAgICBoYXNMaW5rLnZhbHVlID09PSB0cnVlID8gbGlua1Byb3BzLnZhbHVlIDogdG9nZ2xlQXJpYUF0dHJzLnZhbHVlXG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGgoUUl0ZW0sIGRhdGEsIGdldEhlYWRlckNoaWxkKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFRyYW5zaXRpb25DaGlsZCAoKSB7XG4gICAgICByZXR1cm4gd2l0aERpcmVjdGl2ZXMoXG4gICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICBrZXk6ICdlLWNvbnRlbnQnLFxuICAgICAgICAgIGNsYXNzOiAncS1leHBhbnNpb24taXRlbV9fY29udGVudCByZWxhdGl2ZS1wb3NpdGlvbicsXG4gICAgICAgICAgc3R5bGU6IGNvbnRlbnRTdHlsZS52YWx1ZSxcbiAgICAgICAgICBpZDogdGFyZ2V0VWlkXG4gICAgICAgIH0sIGhTbG90KHNsb3RzLmRlZmF1bHQpKSxcbiAgICAgICAgWyBbXG4gICAgICAgICAgdlNob3csXG4gICAgICAgICAgc2hvd2luZy52YWx1ZVxuICAgICAgICBdIF1cbiAgICAgIClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRDb250ZW50ICgpIHtcbiAgICAgIGNvbnN0IG5vZGUgPSBbXG4gICAgICAgIGdldEhlYWRlcigpLFxuXG4gICAgICAgIGgoUVNsaWRlVHJhbnNpdGlvbiwge1xuICAgICAgICAgIGR1cmF0aW9uOiBwcm9wcy5kdXJhdGlvbixcbiAgICAgICAgICBvblNob3csXG4gICAgICAgICAgb25IaWRlXG4gICAgICAgIH0sIGdldFRyYW5zaXRpb25DaGlsZClcbiAgICAgIF1cblxuICAgICAgaWYgKHByb3BzLmV4cGFuZFNlcGFyYXRvciA9PT0gdHJ1ZSkge1xuICAgICAgICBub2RlLnB1c2goXG4gICAgICAgICAgaChRU2VwYXJhdG9yLCB7XG4gICAgICAgICAgICBjbGFzczogJ3EtZXhwYW5zaW9uLWl0ZW1fX2JvcmRlciBxLWV4cGFuc2lvbi1pdGVtX19ib3JkZXItLXRvcCBhYnNvbHV0ZS10b3AnLFxuICAgICAgICAgICAgZGFyazogaXNEYXJrLnZhbHVlXG4gICAgICAgICAgfSksXG4gICAgICAgICAgaChRU2VwYXJhdG9yLCB7XG4gICAgICAgICAgICBjbGFzczogJ3EtZXhwYW5zaW9uLWl0ZW1fX2JvcmRlciBxLWV4cGFuc2lvbi1pdGVtX19ib3JkZXItLWJvdHRvbSBhYnNvbHV0ZS1ib3R0b20nLFxuICAgICAgICAgICAgZGFyazogaXNEYXJrLnZhbHVlXG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbm9kZVxuICAgIH1cblxuICAgIHByb3BzLmdyb3VwICE9PSB2b2lkIDAgJiYgZW50ZXJHcm91cCgpXG5cbiAgICBvbkJlZm9yZVVubW91bnQoKCkgPT4ge1xuICAgICAgZXhpdEdyb3VwICE9PSB2b2lkIDAgJiYgZXhpdEdyb3VwKClcbiAgICB9KVxuXG4gICAgcmV0dXJuICgpID0+IGgoJ2RpdicsIHsgY2xhc3M6IGNsYXNzZXMudmFsdWUgfSwgW1xuICAgICAgaCgnZGl2JywgeyBjbGFzczogJ3EtZXhwYW5zaW9uLWl0ZW1fX2NvbnRhaW5lciByZWxhdGl2ZS1wb3NpdGlvbicgfSwgZ2V0Q29udGVudCgpKVxuICAgIF0pXG4gIH1cbn0pXG4iLCI8dGVtcGxhdGU+XHJcbiAgPHEtc2xpZGUtaXRlbSBAcmlnaHQ9XCJzaG93RGVsZXRlTGlzdERpYWxvZ1wiIEBsZWZ0PVwic2hvd0VkaXRMaXN0RGlhbG9nXCI+XHJcbiAgICA8dGVtcGxhdGUgdi1zbG90OmxlZnQ+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJyb3cgaXRlbXMtY2VudGVyXCI+PHEtaWNvbiBsZWZ0IG5hbWU9XCJlZGl0XCIgLz4gRWRpdDwvZGl2PlxyXG4gICAgPC90ZW1wbGF0ZT5cclxuICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6cmlnaHQ+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJyb3cgaXRlbXMtY2VudGVyXCI+RGVsZXRlIDxxLWljb24gcmlnaHQgbmFtZT1cImRlbGV0ZVwiIC8+PC9kaXY+XHJcbiAgICA8L3RlbXBsYXRlPlxyXG5cclxuICAgIDxxLWV4cGFuc2lvbi1pdGVtXHJcbiAgICAgIGNsYXNzPVwic2hvcHBpbmctbGlzdC1leHBlbnNpb24taXRlbVwiXHJcbiAgICAgIGV4cGFuZC1zZXBhcmF0b3JcclxuICAgICAgaWNvbj1cInJlY2VpcHRfbG9uZ1wiXHJcbiAgICAgIDpsYWJlbD1cInNob3BwaW5nTGlzdEluZm8ubmFtZVwiXHJcbiAgICAgIDpjYXB0aW9uPVwiYCR7c2hvcHBpbmdMaXN0SW5mby5saXN0SXRlbXMubGVuZ3RofSBpdGVtcyB8ICR7c2hvcHBpbmdMaXN0SW5mby5zdGF0dXN9YFwiXHJcbiAgICAgIDp0bz1cImAvc2hvcHBpbmcvJHt0aGlzLnNob3BwaW5nTGlzdEluZm8uX2lkfWBcIlxyXG4gICAgPlxyXG4gICAgICA8cS1jYXJkXHJcbiAgICAgICAgY2xhc3M9XCJpdGVtc1wiXHJcbiAgICAgICAgdi1mb3I9XCJsaXN0SXRlbSBpbiBzaG9wcGluZ0xpc3RJbmZvLmxpc3RJdGVtc1wiXHJcbiAgICAgICAgOmtleT1cImxpc3RJdGVtLl9pZFwiXHJcbiAgICAgID5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZmxleCBsaXN0LWl0ZW1cIj5cclxuICAgICAgICAgIDxkaXY+e3sgbGlzdEl0ZW0uaXRlbSB9fTwvZGl2PlxyXG4gICAgICAgICAgPHEtaWNvbiB2LWlmPVwibGlzdEl0ZW0uc3RhdHVzID09PSAnYm91Z2h0J1wiIG5hbWU9XCJkb25lX291dGxpbmVcIiAvPlxyXG4gICAgICAgICAgPHEtaWNvbiB2LWlmPVwibGlzdEl0ZW0uc3RhdHVzID09PSAnbm90X2JvdWdodCdcIiBuYW1lPVwiY2xvc2VcIiAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxxLXNlcGFyYXRvcj48L3Etc2VwYXJhdG9yPlxyXG4gICAgICA8L3EtY2FyZD5cclxuICAgIDwvcS1leHBhbnNpb24taXRlbT5cclxuICA8L3Etc2xpZGUtaXRlbT5cclxuXHJcbiAgPHEtZGlhbG9nIHYtbW9kZWw9XCJzaG93RGVsZXRlTGlzdFwiIHBlcnNpc3RlbnQ+XHJcbiAgICA8cS1jYXJkPlxyXG4gICAgICA8cS1jYXJkLXNlY3Rpb24gY2xhc3M9XCJyb3cgaXRlbXMtY2VudGVyXCI+XHJcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJxLW1sLXNtXCJcclxuICAgICAgICAgID5BcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIFwie3sgc2hvcHBpbmdMaXN0SW5mby5uYW1lIH19XCJcclxuICAgICAgICAgIGxpc3Q/PC9zcGFuXHJcbiAgICAgICAgPlxyXG4gICAgICA8L3EtY2FyZC1zZWN0aW9uPlxyXG5cclxuICAgICAgPHEtY2FyZC1hY3Rpb25zIGFsaWduPVwicmlnaHRcIj5cclxuICAgICAgICA8cS1idG4gZmxhdCBsYWJlbD1cIkNhbmNlbFwiIGNvbG9yPVwicHJpbWFyeVwiIHYtY2xvc2UtcG9wdXAgLz5cclxuICAgICAgICA8cS1idG4gZmxhdCBsYWJlbD1cIkRlbGV0ZVwiIGNvbG9yPVwicmVkXCIgQGNsaWNrPVwiZGVsZXRlU2hvcHBpbmdMaXN0XCIgLz5cclxuICAgICAgPC9xLWNhcmQtYWN0aW9ucz5cclxuICAgIDwvcS1jYXJkPlxyXG4gIDwvcS1kaWFsb2c+XHJcbiAgPHEtZGlhbG9nIHYtbW9kZWw9XCJzaG93RWRpdExpc3RcIiBwZXJzaXN0ZW50PlxyXG4gICAgPHEtY2FyZD5cclxuICAgICAgPHEtY2FyZC1zZWN0aW9uIGNsYXNzPVwiY29sdW1uXCIgc3R5bGU9XCJ3aWR0aDogODB2d1wiPlxyXG4gICAgICAgIDxzcGFuPkVkaXQgbGlzdCBuYW1lIDwvc3Bhbj5cclxuICAgICAgICA8cS1pbnB1dCB0eXBlPVwidGV4dFwiIHYtbW9kZWw9XCJuZXdOYW1lXCIgY29sb3I9XCJjeWFuLTlcIj48L3EtaW5wdXQ+XHJcbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XHJcblxyXG4gICAgICA8cS1jYXJkLWFjdGlvbnMgYWxpZ249XCJyaWdodFwiPlxyXG4gICAgICAgIDxxLWJ0biBmbGF0IGxhYmVsPVwiQ2FuY2VsXCIgY29sb3I9XCJyZWRcIiB2LWNsb3NlLXBvcHVwIC8+XHJcbiAgICAgICAgPHEtYnRuIGZsYXQgbGFiZWw9XCJTYXZlXCIgY29sb3I9XCJwcmltYXJ5XCIgQGNsaWNrPVwic2F2ZU5hbWVcIiAvPlxyXG4gICAgICA8L3EtY2FyZC1hY3Rpb25zPlxyXG4gICAgPC9xLWNhcmQ+XHJcbiAgPC9xLWRpYWxvZz5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBuYW1lOiBcIlNob3BwaW5nTGlzdFwiLFxyXG4gIHByb3BzOiBbXCJzaG9wcGluZ0xpc3RJbmZvXCJdLFxyXG4gIGVtaXRzOiBbXCJkZWxldGVkTGlzdFwiLCBcImVkaXRlZExpc3RcIl0sXHJcbiAgZGF0YSgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHNob3dEZWxldGVMaXN0OiBmYWxzZSxcclxuICAgICAgc2hvd0VkaXRMaXN0OiBmYWxzZSxcclxuICAgICAgdGltZXI6IG51bGwsXHJcbiAgICAgIG5ld05hbWU6IFwiXCIsXHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgbW91bnRlZCgpIHtcclxuICAgIHRoaXMubmV3TmFtZSA9IHRoaXMuc2hvcHBpbmdMaXN0SW5mby5uYW1lO1xyXG4gIH0sXHJcbiAgYmVmb3JlVW5tb3VudCgpIHtcclxuICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVyKTtcclxuICB9LFxyXG4gIG1ldGhvZHM6IHtcclxuICAgIGZpbmFsaXplKHJlc2V0KSB7XHJcbiAgICAgIHRoaXMudGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICByZXNldCgpO1xyXG4gICAgICB9LCAxMDAwKTtcclxuICAgIH0sXHJcbiAgICBnb1RvU2hvcHBpbmdMaXN0UGFnZSgpIHtcclxuICAgICAgY29uc29sZS5sb2codGhpcy5zaG9wcGluZ0xpc3RJbmZvKTtcclxuICAgICAgdGhpcy4kcm91dGVyLnB1c2goYC9zaG9wcGluZy8ke3RoaXMuc2hvcHBpbmdMaXN0SW5mby5faWR9YCk7XHJcbiAgICB9LFxyXG4gICAgc2hvd0RlbGV0ZUxpc3REaWFsb2coeyByZXNldCB9KSB7XHJcbiAgICAgIHRoaXMuc2hvd0RlbGV0ZUxpc3QgPSB0cnVlO1xyXG4gICAgICB0aGlzLmZpbmFsaXplKHJlc2V0KTtcclxuICAgIH0sXHJcbiAgICBzaG93RWRpdExpc3REaWFsb2coeyByZXNldCB9KSB7XHJcbiAgICAgIHRoaXMuc2hvd0VkaXRMaXN0ID0gdHJ1ZTtcclxuICAgICAgdGhpcy5maW5hbGl6ZShyZXNldCk7XHJcbiAgICB9LFxyXG4gICAgYXN5bmMgc2F2ZU5hbWUoKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IHtcclxuICAgICAgICAgIG5hbWU6IHRoaXMubmV3TmFtZSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuJGFwaS5wYXRjaChcclxuICAgICAgICAgIGAvc2hvcHBpbmctbGlzdHMvcGF0Y2gtc2hvcHBpbmctbGlzdC8ke3RoaXMuc2hvcHBpbmdMaXN0SW5mby5faWR9YCxcclxuICAgICAgICAgIGRhdGFcclxuICAgICAgICApO1xyXG4gICAgICAgIGlmIChyZXMuZGF0YS5zdGF0dXMgPT09IFwic3VjY2Vzc1wiKSB7XHJcbiAgICAgICAgICB0aGlzLiRlbWl0KFwiZWRpdGVkTGlzdFwiLCB0aGlzLnNob3BwaW5nTGlzdEluZm8sIHRoaXMubmV3TmFtZSk7XHJcbiAgICAgICAgICB0aGlzLnNob3dFZGl0TGlzdCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGFzeW5jIGRlbGV0ZVNob3BwaW5nTGlzdCgpIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLiRhcGkuZGVsZXRlKFxyXG4gICAgICAgICAgYC9zaG9wcGluZy1saXN0cy9kZWxldGUtc2hvcHBpbmctbGlzdC8ke3RoaXMuc2hvcHBpbmdMaXN0SW5mby5faWR9YFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgaWYgKHJlcy5kYXRhLnN0YXR1cyA9PT0gXCJzdWNjZXNzXCIpIHtcclxuICAgICAgICAgIHRoaXMuJGVtaXQoXCJkZWxldGVkTGlzdFwiLCB0aGlzLnNob3BwaW5nTGlzdEluZm8pO1xyXG4gICAgICAgICAgdGhpcy5zaG93RGVsZXRlTGlzdCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICB9LFxyXG59O1xyXG48L3NjcmlwdD5cclxuXHJcbjxzdHlsZSBzY29wZWQ+XHJcbi5pdGVtcyB7XHJcbiAgcGFkZGluZy1sZWZ0OiA1MHB4O1xyXG59XHJcbi5saXN0LWl0ZW0ge1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgZ2FwOiA1cHg7XHJcbn1cclxuLnNob3BwaW5nLWxpc3QtZXhwZW5zaW9uLWl0ZW0ge1xyXG4gIGZvbnQtc2l6ZTogMTZweDtcclxufVxyXG5cclxuLnNob3BwaW5nLWxpc3QtZXhwZW5zaW9uLWl0ZW0gOmRlZXAoLnRleHQtY2FwdGlvbikge1xyXG4gIGZvbnQtc2l6ZTogMTRweCAhaW1wb3J0YW50O1xyXG59XHJcbjpkZWVwKC5xLWl0ZW1fX3NlY3Rpb24tLWF2YXRhcikge1xyXG4gIG1pbi13aWR0aDogNDFweCAhaW1wb3J0YW50O1xyXG59XHJcbi5zaG9wcGluZy1saXN0LWV4cGVuc2lvbi1pdGVtIDpkZWVwKC5xLWljb24pIHtcclxuICBjb2xvcjogcmdiKDkyLCA5MSwgOTEpICFpbXBvcnRhbnQ7XHJcbn1cclxuPC9zdHlsZT5cclxuIiwiPHRlbXBsYXRlPlxyXG4gIDxkaXYgY2xhc3M9XCJvbmUtY2F0ZWdvcnlcIj5cclxuICAgIDxxLWljb24gbmFtZT1cImFycm93X2JhY2tfaW9zXCIgQGNsaWNrPVwiJGVtaXQoJ2dvQmFja1RvQ2F0ZWdvcmllcycpXCI+PC9xLWljb24+XHJcbiAgICA8c3BhbiBjbGFzcz1cIlwiPnt7IGNhdGVnb3J5VW5pcXVlUHJvZHVjdHNJbmZvLm5hbWUgfX08L3NwYW4+XHJcbiAgPC9kaXY+XHJcbiAgPHEtY2FyZD5cclxuICAgIDxxLWxpc3QgZGVuc2UgYm9yZGVyZWQgcGFkZGluZyBjbGFzcz1cInJvdW5kZWQtYm9yZGVyc1wiPlxyXG4gICAgICA8cS1pdGVtXHJcbiAgICAgICAgdi1mb3I9XCJwcm9kdWN0IGluIHVuaXF1ZU5hbWVzXCJcclxuICAgICAgICA6a2V5PVwicHJvZHVjdFwiXHJcbiAgICAgICAgdGFnPVwibGFiZWxcIlxyXG4gICAgICAgIHYtcmlwcGxlXHJcbiAgICAgID5cclxuICAgICAgICA8cS1pdGVtLXNlY3Rpb24gYXZhdGFyPlxyXG4gICAgICAgICAgPHEtY2hlY2tib3ggdi1tb2RlbD1cInZhbHVlXCIgOnZhbD1cInByb2R1Y3RcIiBjb2xvcj1cImN5YW4tOVwiIC8+XHJcbiAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cclxuICAgICAgICA8cS1pdGVtLXNlY3Rpb24+XHJcbiAgICAgICAgICA8cS1pdGVtLWxhYmVsPnt7IHByb2R1Y3QgfX08L3EtaXRlbS1sYWJlbD5cclxuICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxyXG4gICAgICA8L3EtaXRlbT5cclxuICAgIDwvcS1saXN0PlxyXG4gIDwvcS1jYXJkPlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIG5hbWU6IFwiQ2F0ZWdvcnlVbmlxdWVQcm9kdWN0c1wiLFxyXG4gIGVtaXRzOiBbXCJnb0JhY2tUb0NhdGVnb3JpZXNcIiwgXCJ1cGRhdGU6bW9kZWxWYWx1ZVwiXSxcclxuICBwcm9wczogW1wiY2F0ZWdvcnlVbmlxdWVQcm9kdWN0c0luZm9cIiwgXCJtb2RlbFZhbHVlXCJdLFxyXG4gIGRhdGEoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB1bmlxdWVOYW1lczogW10sXHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgYXN5bmMgbW91bnRlZCgpIHtcclxuICAgIGF3YWl0IHRoaXMuZmV0Y2hVbmlxdWVQcm9kdWN0TmFtZXMoKTtcclxuICB9LFxyXG4gIGNvbXB1dGVkOiB7XHJcbiAgICB2YWx1ZToge1xyXG4gICAgICBnZXQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kZWxWYWx1ZTtcclxuICAgICAgfSxcclxuICAgICAgc2V0KHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy4kZW1pdChcInVwZGF0ZTptb2RlbFZhbHVlXCIsIHZhbHVlKTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBtZXRob2RzOiB7XHJcbiAgICBhc3luYyBmZXRjaFVuaXF1ZVByb2R1Y3ROYW1lcygpIHtcclxuICAgICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy4kYXBpLmdldChcclxuICAgICAgICBgL3Byb2R1Y3RzL2dldC11bmlxdWUtbmFtZXMvJHt0aGlzLmNhdGVnb3J5VW5pcXVlUHJvZHVjdHNJbmZvLl9pZH1gXHJcbiAgICAgICk7XHJcbiAgICAgIHRoaXMudW5pcXVlTmFtZXMgPSByZXMuZGF0YS51bmlxdWVOYW1lc0FycmF5O1xyXG4gICAgfSxcclxuICB9LFxyXG59O1xyXG48L3NjcmlwdD5cclxuXHJcbjxzdHlsZSBzY29wZWQ+XHJcbi5xLWNhcmQge1xyXG4gIG1hcmdpbi10b3A6IDEwcHg7XHJcbn1cclxuXHJcbi5vbmUtY2F0ZWdvcnkge1xyXG4gIHBhZGRpbmctbGVmdDogMTBweDtcclxuICBmb250LXNpemU6IDE2cHg7XHJcbn1cclxuPC9zdHlsZT5cclxuIiwiPHRlbXBsYXRlPlxyXG4gIDxkaXZcclxuICAgIHYtaWY9XCIhc2hvcHBpbmdMaXN0cyAmJiB1c2VyU3RvcmUuYXV0aFVzZXJcIlxyXG4gICAgY2xhc3M9XCJxLWd1dHRlci1tZCByb3cganVzdGlmeS1jZW50ZXJcIlxyXG4gID5cclxuICAgIDxxLXNwaW5uZXItb3ZhbCBjb2xvcj1cImN5YW4tOVwiIHNpemU9XCI1ZW1cIiAvPlxyXG4gIDwvZGl2PlxyXG4gIDxkaXYgdi1pZj1cInNob3BwaW5nTGlzdHMgJiYgdXNlclN0b3JlLmF1dGhVc2VyXCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwic2hvcHBpbmctcGFnZVwiPlxyXG4gICAgICA8cS1kcmF3ZXJcclxuICAgICAgICBzaWRlPVwicmlnaHRcIlxyXG4gICAgICAgIHYtbW9kZWw9XCJkcmF3ZXJSaWdodFwiXHJcbiAgICAgICAgYm9yZGVyZWRcclxuICAgICAgICBlbGV2YXRlZFxyXG4gICAgICAgIDp3aWR0aD1cIjI1MFwiXHJcbiAgICAgICAgOmJyZWFrcG9pbnQ9XCI1MDBcIlxyXG4gICAgICA+XHJcbiAgICAgICAgPHEtc2Nyb2xsLWFyZWEgY2xhc3M9XCJmaXRcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJxLXBhLW1kXCIgc3R5bGU9XCJmb250LXNpemU6IDE2cHhcIj5cclxuICAgICAgICAgICAgPGRpdiB2LWlmPVwiIXNlbGVjdGVkUHJvZHVjdHMubGVuZ3RoXCI+U2hvcHBpbmcgY2FydCBpcyBlbXB0eS48L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiB2LWZvcj1cInByb2R1Y3QgaW4gc2VsZWN0ZWRQcm9kdWN0c1wiIDprZXk9XCJwcm9kdWN0XCI+XHJcbiAgICAgICAgICAgICAge3sgcHJvZHVjdCB9fVxyXG4gICAgICAgICAgICAgIDxxLXNlcGFyYXRvcj48L3Etc2VwYXJhdG9yPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInEtcGEtbWQgZmxleCBqdXN0aWZ5LWVuZFwiPlxyXG4gICAgICAgICAgICA8cS1idG5cclxuICAgICAgICAgICAgICBAY2xpY2s9XCJjcmVhdGVTaG9wcGluZ0xpc3RcIlxyXG4gICAgICAgICAgICAgIGxhYmVsPVwiQ3JlYXRlIExpc3RcIlxyXG4gICAgICAgICAgICAgIGNvbG9yPVwiY3lhbi05XCJcclxuICAgICAgICAgICAgICByb3VuZGVkXHJcbiAgICAgICAgICAgICAgOmRpc2FibGU9XCJpc0Rpc2FibGVkXCJcclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvcS1zY3JvbGwtYXJlYT5cclxuICAgICAgPC9xLWRyYXdlcj5cclxuICAgICAgPHEtZGlhbG9nXHJcbiAgICAgICAgdi1tb2RlbD1cInNob3dOZXdMaXN0RGlhbG9nXCJcclxuICAgICAgICBzZWFtbGVzc1xyXG4gICAgICAgIHBvc2l0aW9uPVwiYm90dG9tXCJcclxuICAgICAgICBjbGFzcz1cImFkZFRvTGlzdERpYWxvZ1wiXHJcbiAgICAgID5cclxuICAgICAgICA8cS1jYXJkIGNsYXNzPVwicS1jYXJkX19oZWlnaHRcIj5cclxuICAgICAgICAgIDxxLWNhcmQtc2VjdGlvbiBjbGFzcz1cInJvdyBpdGVtcy1jZW50ZXIgcS1wYi1ub25lXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWg2XCI+V2hhdCBkbyB5b3UgbmVlZD88L2Rpdj5cclxuICAgICAgICAgICAgPHEtc3BhY2UgLz5cclxuICAgICAgICAgICAgPHEtYnRuIGljb249XCJjbG9zZVwiIGZsYXQgcm91bmQgZGVuc2Ugdi1jbG9zZS1wb3B1cCAvPlxyXG4gICAgICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cclxuICAgICAgICAgIDxxLWlucHV0XHJcbiAgICAgICAgICAgIGNvbG9yPVwiY3lhbi05XCJcclxuICAgICAgICAgICAgZmlsbGVkXHJcbiAgICAgICAgICAgIHYtbW9kZWw9XCJuYW1lXCJcclxuICAgICAgICAgICAgbGFiZWw9XCJMaXN0IG5hbWVcIlxyXG4gICAgICAgICAgICBjbGFzcz1cInEtbWItbWRcIlxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICA8dGVtcGxhdGUgdi1zbG90OnByZXBlbmQ+XHJcbiAgICAgICAgICAgICAgPHEtaWNvbiBuYW1lPVwiZWRpdF9ub3RlXCIgLz5cclxuICAgICAgICAgICAgPC90ZW1wbGF0ZT5cclxuICAgICAgICAgIDwvcS1pbnB1dD5cclxuICAgICAgICAgIDxxLXNlcGFyYXRvcj48L3Etc2VwYXJhdG9yPlxyXG5cclxuICAgICAgICAgIDxxLXNlbGVjdFxyXG4gICAgICAgICAgICBjbGFzcz1cInNlYXJjaFByb2R1Y3RcIlxyXG4gICAgICAgICAgICByZWY9XCJzZWxlY3RQcm9kdWN0XCJcclxuICAgICAgICAgICAgbGFiZWw9XCJTZWFyY2ggZm9yIHByb2R1Y3RcIlxyXG4gICAgICAgICAgICBmaWxsZWRcclxuICAgICAgICAgICAgdi1tb2RlbD1cInF1ZXJ5XCJcclxuICAgICAgICAgICAgdXNlLWlucHV0XHJcbiAgICAgICAgICAgIGhpZGUtc2VsZWN0ZWRcclxuICAgICAgICAgICAgZmlsbC1pbnB1dFxyXG4gICAgICAgICAgICBpbnB1dC1kZWJvdW5jZT1cIjBcIlxyXG4gICAgICAgICAgICA6b3B0aW9ucz1cInNlYXJjaFwiXHJcbiAgICAgICAgICAgIEB1cGRhdGU6bW9kZWwtdmFsdWU9XCJhZGRQcm9kdWN0RnJvbVNlYXJjaFwiXHJcbiAgICAgICAgICAgIEBmaWx0ZXI9XCJmaWx0ZXJGblwiXHJcbiAgICAgICAgICAgIGhpbnQ9XCJNaW5pbXVtIDIgY2hhcmFjdGVycyB0byB0cmlnZ2VyIGZpbHRlcmluZ1wiXHJcbiAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6IDEwMCU7IHBhZGRpbmctYm90dG9tOiAzMnB4XCJcclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDpuby1vcHRpb24+XHJcbiAgICAgICAgICAgICAgPHEtaXRlbT5cclxuICAgICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbiBjbGFzcz1cInRleHQtZ3JleVwiPiBObyByZXN1bHRzIDwvcS1pdGVtLXNlY3Rpb24+XHJcbiAgICAgICAgICAgICAgPC9xLWl0ZW0+XHJcbiAgICAgICAgICAgIDwvdGVtcGxhdGU+XHJcbiAgICAgICAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6cHJlcGVuZD5cclxuICAgICAgICAgICAgICA8cS1pY29uIG5hbWU9XCJzZWFyY2hcIiAvPlxyXG4gICAgICAgICAgICA8L3RlbXBsYXRlPlxyXG4gICAgICAgICAgPC9xLXNlbGVjdD5cclxuICAgICAgICAgIDxkaXYgdi1pZj1cIiFjYXRlZ29yeVVuaXF1ZVByb2R1Y3RzSW5mb1wiIGNsYXNzPVwiYWRkVG9MaXN0RGlhbG9nXCI+XHJcbiAgICAgICAgICAgIDxxLWl0ZW1cclxuICAgICAgICAgICAgICBjbGlja2FibGVcclxuICAgICAgICAgICAgICB2LXJpcHBsZVxyXG4gICAgICAgICAgICAgIHYtZm9yPVwiY2F0ZWdvcnkgaW4gY2F0ZWdvcmllc1wiXHJcbiAgICAgICAgICAgICAgOmtleT1cImNhdGVnb3J5Ll9pZFwiXHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24gdGh1bWJuYWlsIHN0eWxlPVwicGFkZGluZy1sZWZ0OiAxMHB4XCI+XHJcbiAgICAgICAgICAgICAgICA8cS1pY29uIDpuYW1lPVwiY2F0ZWdvcnkuaWNvblwiIC8+XHJcbiAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cclxuICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24gQGNsaWNrPVwidmlld1Byb2R1Y3RzSW5DYXRlZ29yeShjYXRlZ29yeSlcIj57e1xyXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnkubmFtZVxyXG4gICAgICAgICAgICAgIH19PC9xLWl0ZW0tc2VjdGlvbj5cclxuICAgICAgICAgICAgPC9xLWl0ZW0+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxDYXRlZ29yeVVuaXF1ZVByb2R1Y3RzXHJcbiAgICAgICAgICAgIHYtaWY9XCJjYXRlZ29yeVVuaXF1ZVByb2R1Y3RzSW5mb1wiXHJcbiAgICAgICAgICAgIDpjYXRlZ29yeVVuaXF1ZVByb2R1Y3RzSW5mbz1cImNhdGVnb3J5VW5pcXVlUHJvZHVjdHNJbmZvXCJcclxuICAgICAgICAgICAgQGdvQmFja1RvQ2F0ZWdvcmllcz1cImNhdGVnb3J5VW5pcXVlUHJvZHVjdHNJbmZvID0gbnVsbFwiXHJcbiAgICAgICAgICAgIDptb2RlbFZhbHVlPVwic2VsZWN0ZWRQcm9kdWN0c1wiXHJcbiAgICAgICAgICAgIEB1cGRhdGU6bW9kZWxWYWx1ZT1cIih2YWx1ZSkgPT4gKHNlbGVjdGVkUHJvZHVjdHMgPSB2YWx1ZSlcIlxyXG4gICAgICAgICAgLz5cclxuICAgICAgICAgIDxxLWJ0blxyXG4gICAgICAgICAgICBmYWJcclxuICAgICAgICAgICAgaWNvbj1cInNob3BwaW5nX2NhcnRcIlxyXG4gICAgICAgICAgICBjb2xvcj1cImN5YW4tOVwiXHJcbiAgICAgICAgICAgIGNsYXNzPVwic2hvcHBpbmctcGFnZS1zdGlja3ktYnRuXCJcclxuICAgICAgICAgICAgQGNsaWNrPVwib3BlbkRyYXdlclwiXHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDxxLWJhZGdlIGNvbG9yPVwicmVkXCIgZmxvYXRpbmcgdi1pZj1cInNlbGVjdGVkUHJvZHVjdHMubGVuZ3RoXCI+e3tcclxuICAgICAgICAgICAgICBzZWxlY3RlZFByb2R1Y3RzLmxlbmd0aFxyXG4gICAgICAgICAgICB9fTwvcS1iYWRnZT48L3EtYnRuXHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgPC9xLWNhcmQ+XHJcbiAgICAgIDwvcS1kaWFsb2c+XHJcblxyXG4gICAgICA8ZGl2IHYtaWY9XCJ1c2VyU3RvcmUuYXV0aFVzZXJcIj5cclxuICAgICAgICA8cS1idG5cclxuICAgICAgICAgIGNsYXNzPVwibmV3bGlzdC1idG5cIlxyXG4gICAgICAgICAgQGNsaWNrPVwic2hvd05ld0xpc3REaWFsb2cgPSB0cnVlXCJcclxuICAgICAgICAgIGxhYmVsPVwiTmV3IExpc3RcIlxyXG4gICAgICAgIC8+XHJcbiAgICAgICAgPFNob3BwaW5nTGlzdFxyXG4gICAgICAgICAgdi1mb3I9XCJzaG9wcGluZ0xpc3QgaW4gc2hvcHBpbmdMaXN0c1wiXHJcbiAgICAgICAgICA6a2V5PVwic2hvcHBpbmdMaXN0LmlkXCJcclxuICAgICAgICAgIDpzaG9wcGluZ0xpc3RJbmZvPVwic2hvcHBpbmdMaXN0XCJcclxuICAgICAgICAgIEBkZWxldGVkTGlzdD1cInJlbW92ZUxpc3RGcm9tQXJyYXlcIlxyXG4gICAgICAgICAgQGVkaXRlZExpc3Q9XCJlZGl0TGlzdEZyb21BcnJheVwiXHJcbiAgICAgICAgLz5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuICA8RW1wdHlTdGF0ZVxyXG4gICAgdi1pZj1cIiF1c2VyU3RvcmUuYXV0aFVzZXJcIlxyXG4gICAgOmltYWdlPVwiaW1hZ2VcIlxyXG4gICAgOnRpdGxlPVwidGl0bGVcIlxyXG4gICAgOm1lc3NhZ2U9XCJtZXNzYWdlXCJcclxuICA+XHJcbiAgPC9FbXB0eVN0YXRlPlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuaW1wb3J0IHsgdXNlVXNlclN0b3JlIH0gZnJvbSBcIi4uL3N0b3Jlcy9Vc2VyU3RvcmVcIjtcclxuaW1wb3J0IHsgdXNlRGFzaEhlYWRlclN0b3JlIH0gZnJvbSBcInNyYy9zdG9yZXMvZGFzaC1oZWFkZXJcIjtcclxuaW1wb3J0IEVtcHR5U3RhdGUgZnJvbSBcInNyYy9jb21wb25lbnRzL2N1c3RvbWVyL0VtcHR5U3RhdGUudnVlXCI7XHJcbmltcG9ydCBTaG9wcGluZ0xpc3QgZnJvbSBcInNyYy9jb21wb25lbnRzL2N1c3RvbWVyL1Nob3BwaW5nTGlzdC52dWVcIjtcclxuaW1wb3J0IENhdGVnb3J5VW5pcXVlUHJvZHVjdHMgZnJvbSBcInNyYy9jb21wb25lbnRzL2N1c3RvbWVyL0NhdGVnb3J5VW5pcXVlUHJvZHVjdHMudnVlXCI7XHJcbmltcG9ydCB1c2VRdWFzYXIgZnJvbSBcInF1YXNhci9zcmMvY29tcG9zYWJsZXMvdXNlLXF1YXNhci5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIG5hbWU6IFwiU2hvcHBpbmdQYWdlXCIsXHJcbiAgY29tcG9uZW50czoge1xyXG4gICAgRW1wdHlTdGF0ZSxcclxuICAgIFNob3BwaW5nTGlzdCxcclxuICAgIENhdGVnb3J5VW5pcXVlUHJvZHVjdHMsXHJcbiAgfSxcclxuICBkYXRhKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgaW1hZ2U6IFwiRW1wdHlTdGF0ZS5zdmdcIixcclxuICAgICAgdGl0bGU6IFwiT29vcHMhIFlvdSBhcmUgbm90IGxvZ2dlZCBpbiFcIixcclxuICAgICAgbWVzc2FnZTogXCJMb2cgaW4gdG8gY29udGludWUgc2hvcHBpbmdcIixcclxuICAgICAgc2hvcHBpbmdMaXN0czogbnVsbCxcclxuICAgICAgc2hvd05ld0xpc3REaWFsb2c6IGZhbHNlLFxyXG4gICAgICBkcmF3ZXJSaWdodDogZmFsc2UsXHJcbiAgICAgIHNlYXJjaDogW10sXHJcbiAgICAgIHF1ZXJ5OiBcIlwiLFxyXG4gICAgICBwcm9kdWN0czogW10sXHJcbiAgICAgIGNhdGVnb3JpZXM6IFtdLFxyXG4gICAgICB2YWw6IGZhbHNlLFxyXG4gICAgICBzdGF0dXM6IFwicGVuZGluZ1wiLFxyXG4gICAgICBzZWxlY3RlZFByb2R1Y3RzOiBbXSxcclxuICAgICAgdXNlclN0b3JlOiB1c2VVc2VyU3RvcmUoKSxcclxuICAgICAgJHE6IHVzZVF1YXNhcigpLFxyXG4gICAgICB0aW1lcjogbnVsbCxcclxuICAgICAgbmFtZTpcclxuICAgICAgICBuZXcgRGF0ZSgpLnRvTG9jYWxlRGF0ZVN0cmluZyhcImVuLUdCXCIpICtcclxuICAgICAgICBcIiBcIiArXHJcbiAgICAgICAgbmV3IERhdGUoKS50b0xvY2FsZVRpbWVTdHJpbmcoW10sIHtcclxuICAgICAgICAgIGhvdXI6IFwiMi1kaWdpdFwiLFxyXG4gICAgICAgICAgbWludXRlOiBcIjItZGlnaXRcIixcclxuICAgICAgICB9KSxcclxuICAgICAgY2F0ZWdvcnlVbmlxdWVQcm9kdWN0c0luZm86IG51bGwsXHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgY29tcHV0ZWQ6IHtcclxuICAgIGZpbHRlcmVkUHJvZHVjdHMoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnByb2R1Y3RzLmZpbHRlcihcclxuICAgICAgICAocHJvZCkgPT4gcHJvZC50b0xvd2VyQ2FzZSgpLmluZGV4T2YodGhpcy5zZWFyY2gpID4gLTFcclxuICAgICAgKTtcclxuICAgIH0sXHJcbiAgICBpc0Rpc2FibGVkKCkge1xyXG4gICAgICByZXR1cm4gIXRoaXMuc2VsZWN0ZWRQcm9kdWN0cy5sZW5ndGg7XHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgYXN5bmMgbW91bnRlZCgpIHtcclxuICAgIGNvbnN0IGRhc2hIZWFkZXIgPSB1c2VEYXNoSGVhZGVyU3RvcmUoKTtcclxuICAgIGRhc2hIZWFkZXIuJHBhdGNoKHtcclxuICAgICAgdGl0bGU6IFwiU2hvcHBpbmcgTGlzdHNcIixcclxuICAgICAgc2hvd0JhY2tJY29uOiBmYWxzZSxcclxuICAgIH0pO1xyXG4gICAgaWYgKHRoaXMudXNlclN0b3JlLmF1dGhVc2VyKSB7XHJcbiAgICAgIHRoaXMuZmV0Y2hTaG9wcGluZ0xpc3RzKCk7XHJcbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKFt0aGlzLmZldGNoQ2F0ZWdvcmllcygpLCB0aGlzLmZldGNoUHJvZHVjdHMoKV0pO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIG1ldGhvZHM6IHtcclxuICAgIGFzeW5jIGZldGNoUHJvZHVjdHMoKSB7XHJcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuJGFwaS5nZXQoXCIvcHJvZHVjdHMvZ2V0LXVuaXF1ZS1uYW1lc1wiKTtcclxuICAgICAgdGhpcy5wcm9kdWN0cyA9IHJlcy5kYXRhLmRhdGEucHJvZHVjdE5hbWVzO1xyXG4gICAgICB0aGlzLnNlYXJjaCA9IFsuLi50aGlzLnByb2R1Y3RzXTtcclxuICAgIH0sXHJcbiAgICBhc3luYyBmZXRjaENhdGVnb3JpZXMoKSB7XHJcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuJGFwaS5nZXQoXCIvY2F0ZWdvcmllc1wiKTtcclxuICAgICAgdGhpcy5jYXRlZ29yaWVzID0gcmVzLmRhdGEuZGF0YS5jYXRlZ29yaWVzO1xyXG4gICAgfSxcclxuICAgIGFzeW5jIGZldGNoU2hvcHBpbmdMaXN0cygpIHtcclxuICAgICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy4kYXBpLmdldChcIi9zaG9wcGluZy1saXN0cy9nZXQtc2hvcHBpbmctbGlzdHNcIik7XHJcbiAgICAgIHRoaXMuc2hvcHBpbmdMaXN0cyA9IHJlcy5kYXRhLnNob3BwaW5nTGlzdHMucmV2ZXJzZSgpO1xyXG4gICAgfSxcclxuICAgIGFzeW5jIGNyZWF0ZVNob3BwaW5nTGlzdCgpIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBkYXRhID0ge1xyXG4gICAgICAgICAgbmFtZTogdGhpcy5uYW1lLFxyXG4gICAgICAgICAgc2VsZWN0ZWRQcm9kdWN0czogdGhpcy5zZWxlY3RlZFByb2R1Y3RzLFxyXG4gICAgICAgICAgaXNSZWNpcGU6IDAsXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy4kYXBpLnBvc3QoXHJcbiAgICAgICAgICBcIi9zaG9wcGluZy1saXN0cy9jcmVhdGUtc2hvcHBpbmctbGlzdFwiLFxyXG4gICAgICAgICAgZGF0YVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhpcy4kcS5sb2FkaW5nLnNob3coe1xyXG4gICAgICAgICAgbWVzc2FnZTogXCJTb21lIGltcG9ydGFudCBwcm9jZXNzICBpcyBpbiBwcm9ncmVzcy4gSGFuZyBvbi4uLlwiLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChyZXMuZGF0YS5zdGF0dXMgPT09IFwic3VjY2Vzc1wiKSB7XHJcbiAgICAgICAgICB0aGlzLiRxLmxvYWRpbmcuaGlkZSgpO1xyXG4gICAgICAgICAgdGhpcy4kcS5ub3RpZnkoe1xyXG4gICAgICAgICAgICB0eXBlOiBcInBvc2l0aXZlXCIsXHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiBcInRvcFwiLFxyXG4gICAgICAgICAgICBtZXNzYWdlOiBcIlNob3BwaW5nIGxpc3QgY3JlYXRlZCBzdWNjZXNzZnVsbHlcIixcclxuICAgICAgICAgICAgY29sb3I6IFwiY3lhbi05XCIsXHJcbiAgICAgICAgICAgIHRpbWVvdXQ6IFwiMjUwMFwiLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBhd2FpdCB0aGlzLmZldGNoU2hvcHBpbmdMaXN0cygpO1xyXG4gICAgICAgICAgdGhpcy5kcmF3ZXJSaWdodCA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5zaG93TmV3TGlzdERpYWxvZyA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIHZpZXdQcm9kdWN0c0luQ2F0ZWdvcnkoY2F0ZWdvcnkpIHtcclxuICAgICAgdGhpcy5jYXRlZ29yeVVuaXF1ZVByb2R1Y3RzSW5mbyA9IGNhdGVnb3J5O1xyXG4gICAgfSxcclxuICAgIG9wZW5EcmF3ZXIoKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiSU4gXCIpO1xyXG4gICAgICB0aGlzLmRyYXdlclJpZ2h0ID0gdHJ1ZTtcclxuICAgIH0sXHJcbiAgICBmaWx0ZXJGbih2YWwsIHVwZGF0ZSwgYWJvcnQpIHtcclxuICAgICAgaWYgKHZhbC5sZW5ndGggPCAyKSB7XHJcbiAgICAgICAgYWJvcnQoKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHVwZGF0ZSgoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbmVlZGxlID0gdmFsLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgdGhpcy5zZWFyY2ggPSB0aGlzLnByb2R1Y3RzLmZpbHRlcihcclxuICAgICAgICAgICh2KSA9PiB2LnRvTG93ZXJDYXNlKCkuaW5kZXhPZihuZWVkbGUpID4gLTFcclxuICAgICAgICApO1xyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBhZGRQcm9kdWN0RnJvbVNlYXJjaCgpIHtcclxuICAgICAgdGhpcy5zZWxlY3RlZFByb2R1Y3RzLnB1c2godGhpcy5xdWVyeSk7XHJcbiAgICAgIHRoaXMucXVlcnkgPSBcIlwiO1xyXG4gICAgICB0aGlzLiRyZWZzLnNlbGVjdFByb2R1Y3QuYmx1cigpO1xyXG4gICAgfSxcclxuICAgIHJlbW92ZUxpc3RGcm9tQXJyYXkoc2hvcHBpbmdMaXN0SW5mbykge1xyXG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMuc2hvcHBpbmdMaXN0cy5pbmRleE9mKHNob3BwaW5nTGlzdEluZm8pO1xyXG4gICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgIHRoaXMuc2hvcHBpbmdMaXN0cy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgZWRpdExpc3RGcm9tQXJyYXkoc2hvcHBpbmdMaXN0SW5mbywgbmV3TmFtZSkge1xyXG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMuc2hvcHBpbmdMaXN0cy5pbmRleE9mKHNob3BwaW5nTGlzdEluZm8pO1xyXG4gICAgICB0aGlzLnNob3BwaW5nTGlzdHNbaW5kZXhdW1wibmFtZVwiXSA9IG5ld05hbWU7XHJcbiAgICB9LFxyXG4gIH0sXHJcbn07XHJcbjwvc2NyaXB0PlxyXG5cclxuPHN0eWxlIGxhbmc9XCJzY3NzXCIgc2NvcGVkPlxyXG4uc2hvcHBpbmctcGFnZSB7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG59XHJcblxyXG4ubmV3bGlzdC1idG4ge1xyXG4gIC8vIGJhY2tncm91bmQtY29sb3I6ICMyNjczNzg7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogJGN5YW4tOTtcclxuICBjb2xvcjogd2hpdGU7XHJcbiAgbWFyZ2luOiAxMHB4O1xyXG59XHJcblxyXG4ucS1jYXJkX19oZWlnaHQge1xyXG4gIGhlaWdodDogMTAwdmg7XHJcbiAgbWF4LWhlaWdodDogY2FsYygxMDB2aCAtIDUwcHgpICFpbXBvcnRhbnQ7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VlZTtcclxufVxyXG5cclxuLnNob3BwaW5nLXBhZ2Utc3RpY2t5IHtcclxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwcHgsIDBweCkgIWltcG9ydGFudDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XHJcbiAgaGVpZ2h0OiAxMDBweDtcclxufVxyXG5cclxuLnNob3BwaW5nLXBhZ2Utc3RpY2t5LWJ0biB7XHJcbiAgcG9zaXRpb246IGZpeGVkO1xyXG4gIHJpZ2h0OiAyMHB4O1xyXG4gIGJvdHRvbTogMzBweDtcclxuICAvLyB6LWluZGV4OiA5OTk5O1xyXG59XHJcblxyXG4uYWRkVG9MaXN0RGlhbG9nIHtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbn1cclxuPC9zdHlsZT5cclxuXHJcbjxzdHlsZT5cclxuLnEtZHJhd2VyLS1vbi10b3Age1xyXG4gIHotaW5kZXg6IDcwMDAgIWltcG9ydGFudDtcclxufVxyXG4ucS1zZWxlY3RfX2RpYWxvZyB7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIHRvcDogMTAwcHg7XHJcbiAgd2lkdGg6IDEwMHZ3ICFpbXBvcnRhbnQ7XHJcbiAgbWF4LXdpZHRoOiAxMDB2dyAhaW1wb3J0YW50O1xyXG59XHJcbjwvc3R5bGU+XHJcbiJdLCJuYW1lcyI6WyJkdXJhdGlvbiIsInN0eWxlIiwic2l6ZSIsInNob3ciLCJfc2ZjX21haW4iLCJfaG9pc3RlZF8xIiwiX2hvaXN0ZWRfMiIsIl9ob2lzdGVkXzMiLCJfaG9pc3RlZF80IiwiX2hvaXN0ZWRfNSIsIl93aXRoU2NvcGVJZCIsIl9jcmVhdGVFbGVtZW50Vk5vZGUiLCJfY3JlYXRlVk5vZGUiLCJfb3BlbkJsb2NrIiwiX2NyZWF0ZUVsZW1lbnRCbG9jayIsIl9GcmFnbWVudCIsIl9yZW5kZXJMaXN0IiwiX2NyZWF0ZUJsb2NrIiwiX3RvRGlzcGxheVN0cmluZyIsIl9jcmVhdGVUZXh0Vk5vZGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZUEsTUFBTSxXQUFXLENBQUUsWUFBWSxZQUFjO0FBQzdDLE1BQU0sV0FBVztBQUFBLEVBQ2YsVUFBVSxFQUFFLFFBQVEsV0FBVyxRQUFRLGFBQWEsS0FBSyxRQUFRLE1BQU0sSUFBSztBQUFBLEVBQzVF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
