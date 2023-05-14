import { u as useTabProps, a as useTabEmits, b as useTab } from "./QTabs.64f3958c.js";
import { bt as createComponent, c0 as createDirective, bN as client, c2 as noop, cc as leftClick, bK as addEvt, cd as preventDraggable, bP as position, bI as stopAndPrevent, bL as cleanEvt, y as ref, a1 as computed, b0 as watch, ah as getCurrentInstance, ak as h, ba as Transition, cn as getNormalizedVNodes, bF as hSlot, as as nextTick, S as KeepAlive, c9 as hDir } from "./index.5a14f3c4.js";
import { u as useDarkProps, a as useDark } from "./use-dark.a5d47983.js";
import { g as getModifierDirections, s as shouldStart } from "./touch.70a9dd44.js";
import { c as clearSelection } from "./selection.f977ff01.js";
import { u as useCache } from "./use-cache.b0833c75.js";
var QTab = createComponent({
  name: "QTab",
  props: useTabProps,
  emits: useTabEmits,
  setup(props, { slots, emit }) {
    const { renderTab } = useTab(props, slots, emit);
    return () => renderTab("div");
  }
});
function parseArg(arg) {
  const data = [0.06, 6, 50];
  if (typeof arg === "string" && arg.length) {
    arg.split(":").forEach((val, index) => {
      const v = parseFloat(val);
      v && (data[index] = v);
    });
  }
  return data;
}
var TouchSwipe = createDirective(
  {
    name: "touch-swipe",
    beforeMount(el, { value, arg, modifiers }) {
      if (modifiers.mouse !== true && client.has.touch !== true) {
        return;
      }
      const mouseCapture = modifiers.mouseCapture === true ? "Capture" : "";
      const ctx = {
        handler: value,
        sensitivity: parseArg(arg),
        direction: getModifierDirections(modifiers),
        noop,
        mouseStart(evt) {
          if (shouldStart(evt, ctx) && leftClick(evt)) {
            addEvt(ctx, "temp", [
              [document, "mousemove", "move", `notPassive${mouseCapture}`],
              [document, "mouseup", "end", "notPassiveCapture"]
            ]);
            ctx.start(evt, true);
          }
        },
        touchStart(evt) {
          if (shouldStart(evt, ctx)) {
            const target = evt.target;
            addEvt(ctx, "temp", [
              [target, "touchmove", "move", "notPassiveCapture"],
              [target, "touchcancel", "end", "notPassiveCapture"],
              [target, "touchend", "end", "notPassiveCapture"]
            ]);
            ctx.start(evt);
          }
        },
        start(evt, mouseEvent) {
          client.is.firefox === true && preventDraggable(el, true);
          const pos = position(evt);
          ctx.event = {
            x: pos.left,
            y: pos.top,
            time: Date.now(),
            mouse: mouseEvent === true,
            dir: false
          };
        },
        move(evt) {
          if (ctx.event === void 0) {
            return;
          }
          if (ctx.event.dir !== false) {
            stopAndPrevent(evt);
            return;
          }
          const time = Date.now() - ctx.event.time;
          if (time === 0) {
            return;
          }
          const pos = position(evt), distX = pos.left - ctx.event.x, absX = Math.abs(distX), distY = pos.top - ctx.event.y, absY = Math.abs(distY);
          if (ctx.event.mouse !== true) {
            if (absX < ctx.sensitivity[1] && absY < ctx.sensitivity[1]) {
              ctx.end(evt);
              return;
            }
          } else if (absX < ctx.sensitivity[2] && absY < ctx.sensitivity[2]) {
            return;
          }
          const velX = absX / time, velY = absY / time;
          if (ctx.direction.vertical === true && absX < absY && absX < 100 && velY > ctx.sensitivity[0]) {
            ctx.event.dir = distY < 0 ? "up" : "down";
          }
          if (ctx.direction.horizontal === true && absX > absY && absY < 100 && velX > ctx.sensitivity[0]) {
            ctx.event.dir = distX < 0 ? "left" : "right";
          }
          if (ctx.direction.up === true && absX < absY && distY < 0 && absX < 100 && velY > ctx.sensitivity[0]) {
            ctx.event.dir = "up";
          }
          if (ctx.direction.down === true && absX < absY && distY > 0 && absX < 100 && velY > ctx.sensitivity[0]) {
            ctx.event.dir = "down";
          }
          if (ctx.direction.left === true && absX > absY && distX < 0 && absY < 100 && velX > ctx.sensitivity[0]) {
            ctx.event.dir = "left";
          }
          if (ctx.direction.right === true && absX > absY && distX > 0 && absY < 100 && velX > ctx.sensitivity[0]) {
            ctx.event.dir = "right";
          }
          if (ctx.event.dir !== false) {
            stopAndPrevent(evt);
            if (ctx.event.mouse === true) {
              document.body.classList.add("no-pointer-events--children");
              document.body.classList.add("non-selectable");
              clearSelection();
              ctx.styleCleanup = (withDelay) => {
                ctx.styleCleanup = void 0;
                document.body.classList.remove("non-selectable");
                const remove = () => {
                  document.body.classList.remove("no-pointer-events--children");
                };
                if (withDelay === true) {
                  setTimeout(remove, 50);
                } else {
                  remove();
                }
              };
            }
            ctx.handler({
              evt,
              touch: ctx.event.mouse !== true,
              mouse: ctx.event.mouse,
              direction: ctx.event.dir,
              duration: time,
              distance: {
                x: absX,
                y: absY
              }
            });
          } else {
            ctx.end(evt);
          }
        },
        end(evt) {
          if (ctx.event === void 0) {
            return;
          }
          cleanEvt(ctx, "temp");
          client.is.firefox === true && preventDraggable(el, false);
          ctx.styleCleanup !== void 0 && ctx.styleCleanup(true);
          evt !== void 0 && ctx.event.dir !== false && stopAndPrevent(evt);
          ctx.event = void 0;
        }
      };
      el.__qtouchswipe = ctx;
      if (modifiers.mouse === true) {
        const capture = modifiers.mouseCapture === true || modifiers.mousecapture === true ? "Capture" : "";
        addEvt(ctx, "main", [
          [el, "mousedown", "mouseStart", `passive${capture}`]
        ]);
      }
      client.has.touch === true && addEvt(ctx, "main", [
        [el, "touchstart", "touchStart", `passive${modifiers.capture === true ? "Capture" : ""}`],
        [el, "touchmove", "noop", "notPassiveCapture"]
      ]);
    },
    updated(el, bindings) {
      const ctx = el.__qtouchswipe;
      if (ctx !== void 0) {
        if (bindings.oldValue !== bindings.value) {
          typeof bindings.value !== "function" && ctx.end();
          ctx.handler = bindings.value;
        }
        ctx.direction = getModifierDirections(bindings.modifiers);
      }
    },
    beforeUnmount(el) {
      const ctx = el.__qtouchswipe;
      if (ctx !== void 0) {
        cleanEvt(ctx, "main");
        cleanEvt(ctx, "temp");
        client.is.firefox === true && preventDraggable(el, false);
        ctx.styleCleanup !== void 0 && ctx.styleCleanup();
        delete el.__qtouchswipe;
      }
    }
  }
);
const usePanelChildProps = {
  name: { required: true },
  disable: Boolean
};
const PanelWrapper = {
  setup(_, { slots }) {
    return () => h("div", {
      class: "q-panel scroll",
      role: "tabpanel"
    }, hSlot(slots.default));
  }
};
const usePanelProps = {
  modelValue: {
    required: true
  },
  animated: Boolean,
  infinite: Boolean,
  swipeable: Boolean,
  vertical: Boolean,
  transitionPrev: String,
  transitionNext: String,
  transitionDuration: {
    type: [String, Number],
    default: 300
  },
  keepAlive: Boolean,
  keepAliveInclude: [String, Array, RegExp],
  keepAliveExclude: [String, Array, RegExp],
  keepAliveMax: Number
};
const usePanelEmits = ["update:modelValue", "beforeTransition", "transition"];
function usePanel() {
  const { props, emit, proxy } = getCurrentInstance();
  const { getCacheWithFn } = useCache();
  let panels, forcedPanelTransition;
  const panelIndex = ref(null);
  const panelTransition = ref(null);
  function onSwipe(evt) {
    const dir = props.vertical === true ? "up" : "left";
    goToPanelByOffset((proxy.$q.lang.rtl === true ? -1 : 1) * (evt.direction === dir ? 1 : -1));
  }
  const panelDirectives = computed(() => {
    return [[
      TouchSwipe,
      onSwipe,
      void 0,
      {
        horizontal: props.vertical !== true,
        vertical: props.vertical,
        mouse: true
      }
    ]];
  });
  const transitionPrev = computed(
    () => props.transitionPrev || `slide-${props.vertical === true ? "down" : "right"}`
  );
  const transitionNext = computed(
    () => props.transitionNext || `slide-${props.vertical === true ? "up" : "left"}`
  );
  const transitionStyle = computed(
    () => `--q-transition-duration: ${props.transitionDuration}ms`
  );
  const contentKey = computed(() => typeof props.modelValue === "string" || typeof props.modelValue === "number" ? props.modelValue : String(props.modelValue));
  const keepAliveProps = computed(() => ({
    include: props.keepAliveInclude,
    exclude: props.keepAliveExclude,
    max: props.keepAliveMax
  }));
  const needsUniqueKeepAliveWrapper = computed(
    () => props.keepAliveInclude !== void 0 || props.keepAliveExclude !== void 0
  );
  watch(() => props.modelValue, (newVal, oldVal) => {
    const index = isValidPanelName(newVal) === true ? getPanelIndex(newVal) : -1;
    if (forcedPanelTransition !== true) {
      updatePanelTransition(
        index === -1 ? 0 : index < getPanelIndex(oldVal) ? -1 : 1
      );
    }
    if (panelIndex.value !== index) {
      panelIndex.value = index;
      emit("beforeTransition", newVal, oldVal);
      nextTick(() => {
        emit("transition", newVal, oldVal);
      });
    }
  });
  function nextPanel() {
    goToPanelByOffset(1);
  }
  function previousPanel() {
    goToPanelByOffset(-1);
  }
  function goToPanel(name) {
    emit("update:modelValue", name);
  }
  function isValidPanelName(name) {
    return name !== void 0 && name !== null && name !== "";
  }
  function getPanelIndex(name) {
    return panels.findIndex((panel) => {
      return panel.props.name === name && panel.props.disable !== "" && panel.props.disable !== true;
    });
  }
  function getEnabledPanels() {
    return panels.filter((panel) => {
      return panel.props.disable !== "" && panel.props.disable !== true;
    });
  }
  function updatePanelTransition(direction) {
    const val = direction !== 0 && props.animated === true && panelIndex.value !== -1 ? "q-transition--" + (direction === -1 ? transitionPrev.value : transitionNext.value) : null;
    if (panelTransition.value !== val) {
      panelTransition.value = val;
    }
  }
  function goToPanelByOffset(direction, startIndex = panelIndex.value) {
    let index = startIndex + direction;
    while (index > -1 && index < panels.length) {
      const opt = panels[index];
      if (opt !== void 0 && opt.props.disable !== "" && opt.props.disable !== true) {
        updatePanelTransition(direction);
        forcedPanelTransition = true;
        emit("update:modelValue", opt.props.name);
        setTimeout(() => {
          forcedPanelTransition = false;
        });
        return;
      }
      index += direction;
    }
    if (props.infinite === true && panels.length > 0 && startIndex !== -1 && startIndex !== panels.length) {
      goToPanelByOffset(direction, direction === -1 ? panels.length : -1);
    }
  }
  function updatePanelIndex() {
    const index = getPanelIndex(props.modelValue);
    if (panelIndex.value !== index) {
      panelIndex.value = index;
    }
    return true;
  }
  function getPanelContentChild() {
    const panel = isValidPanelName(props.modelValue) === true && updatePanelIndex() && panels[panelIndex.value];
    return props.keepAlive === true ? [
      h(KeepAlive, keepAliveProps.value, [
        h(
          needsUniqueKeepAliveWrapper.value === true ? getCacheWithFn(contentKey.value, () => ({ ...PanelWrapper, name: contentKey.value })) : PanelWrapper,
          { key: contentKey.value, style: transitionStyle.value },
          () => panel
        )
      ])
    ] : [
      h("div", {
        class: "q-panel scroll",
        style: transitionStyle.value,
        key: contentKey.value,
        role: "tabpanel"
      }, [panel])
    ];
  }
  function getPanelContent() {
    if (panels.length === 0) {
      return;
    }
    return props.animated === true ? [h(Transition, { name: panelTransition.value }, getPanelContentChild)] : getPanelContentChild();
  }
  function updatePanelsList(slots) {
    panels = getNormalizedVNodes(
      hSlot(slots.default, [])
    ).filter(
      (panel) => panel.props !== null && panel.props.slot === void 0 && isValidPanelName(panel.props.name) === true
    );
    return panels.length;
  }
  function getPanels() {
    return panels;
  }
  Object.assign(proxy, {
    next: nextPanel,
    previous: previousPanel,
    goTo: goToPanel
  });
  return {
    panelIndex,
    panelDirectives,
    updatePanelsList,
    updatePanelIndex,
    getPanelContent,
    getEnabledPanels,
    getPanels,
    isValidPanelName,
    keepAliveProps,
    needsUniqueKeepAliveWrapper,
    goToPanelByOffset,
    goToPanel,
    nextPanel,
    previousPanel
  };
}
var QTabPanel = createComponent({
  name: "QTabPanel",
  props: usePanelChildProps,
  setup(_, { slots }) {
    return () => h("div", { class: "q-tab-panel", role: "tabpanel" }, hSlot(slots.default));
  }
});
var QTabPanels = createComponent({
  name: "QTabPanels",
  props: {
    ...usePanelProps,
    ...useDarkProps
  },
  emits: usePanelEmits,
  setup(props, { slots }) {
    const vm = getCurrentInstance();
    const isDark = useDark(props, vm.proxy.$q);
    const { updatePanelsList, getPanelContent, panelDirectives } = usePanel();
    const classes = computed(
      () => "q-tab-panels q-panel-parent" + (isDark.value === true ? " q-tab-panels--dark q-dark" : "")
    );
    return () => {
      updatePanelsList(slots);
      return hDir(
        "div",
        { class: classes.value },
        getPanelContent(),
        "pan",
        props.swipeable,
        () => panelDirectives.value
      );
    };
  }
});
export { QTabPanels as Q, QTab as a, QTabPanel as b };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUVRhYlBhbmVscy42MDMxMmY2Mi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy90YWJzL1FUYWIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9kaXJlY3RpdmVzL1RvdWNoU3dpcGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1wYW5lbC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvdGFiLXBhbmVscy9RVGFiUGFuZWwuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3RhYi1wYW5lbHMvUVRhYlBhbmVscy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdXNlVGFiLCB7IHVzZVRhYlByb3BzLCB1c2VUYWJFbWl0cyB9IGZyb20gJy4vdXNlLXRhYi5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRVGFiJyxcblxuICBwcm9wczogdXNlVGFiUHJvcHMsXG5cbiAgZW1pdHM6IHVzZVRhYkVtaXRzLFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cywgZW1pdCB9KSB7XG4gICAgY29uc3QgeyByZW5kZXJUYWIgfSA9IHVzZVRhYihwcm9wcywgc2xvdHMsIGVtaXQpXG4gICAgcmV0dXJuICgpID0+IHJlbmRlclRhYignZGl2JylcbiAgfVxufSlcbiIsImltcG9ydCB7IGNsaWVudCB9IGZyb20gJy4uL3BsdWdpbnMvUGxhdGZvcm0uanMnXG5cbmltcG9ydCB7IGNyZWF0ZURpcmVjdGl2ZSB9IGZyb20gJy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgZ2V0TW9kaWZpZXJEaXJlY3Rpb25zLCBzaG91bGRTdGFydCB9IGZyb20gJy4uL3V0aWxzL3ByaXZhdGUvdG91Y2guanMnXG5pbXBvcnQgeyBhZGRFdnQsIGNsZWFuRXZ0LCBwb3NpdGlvbiwgbGVmdENsaWNrLCBzdG9wQW5kUHJldmVudCwgcHJldmVudERyYWdnYWJsZSwgbm9vcCB9IGZyb20gJy4uL3V0aWxzL2V2ZW50LmpzJ1xuaW1wb3J0IHsgY2xlYXJTZWxlY3Rpb24gfSBmcm9tICcuLi91dGlscy9wcml2YXRlL3NlbGVjdGlvbi5qcydcbmltcG9ydCBnZXRTU1JQcm9wcyBmcm9tICcuLi91dGlscy9wcml2YXRlL25vb3Atc3NyLWRpcmVjdGl2ZS10cmFuc2Zvcm0uanMnXG5cbmZ1bmN0aW9uIHBhcnNlQXJnIChhcmcpIHtcbiAgLy8gZGVsdGEgKG1pbiB2ZWxvY2l0eSAtLSBkaXN0IC8gdGltZSlcbiAgLy8gbW9iaWxlIG1pbiBkaXN0YW5jZSBvbiBmaXJzdCBtb3ZlXG4gIC8vIGRlc2t0b3AgbWluIGRpc3RhbmNlIHVudGlsIGRlY2lkaW5nIGlmIGl0J3MgYSBzd2lwZSBvciBub3RcbiAgY29uc3QgZGF0YSA9IFsgMC4wNiwgNiwgNTAgXVxuXG4gIGlmICh0eXBlb2YgYXJnID09PSAnc3RyaW5nJyAmJiBhcmcubGVuZ3RoKSB7XG4gICAgYXJnLnNwbGl0KCc6JykuZm9yRWFjaCgodmFsLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3QgdiA9IHBhcnNlRmxvYXQodmFsKVxuICAgICAgdiAmJiAoZGF0YVsgaW5kZXggXSA9IHYpXG4gICAgfSlcbiAgfVxuXG4gIHJldHVybiBkYXRhXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZURpcmVjdGl2ZShfX1FVQVNBUl9TU1JfU0VSVkVSX19cbiAgPyB7IG5hbWU6ICd0b3VjaC1zd2lwZScsIGdldFNTUlByb3BzIH1cbiAgOiB7XG4gICAgICBuYW1lOiAndG91Y2gtc3dpcGUnLFxuXG4gICAgICBiZWZvcmVNb3VudCAoZWwsIHsgdmFsdWUsIGFyZywgbW9kaWZpZXJzIH0pIHtcbiAgICAgICAgLy8gZWFybHkgcmV0dXJuLCB3ZSBkb24ndCBuZWVkIHRvIGRvIGFueXRoaW5nXG4gICAgICAgIGlmIChtb2RpZmllcnMubW91c2UgIT09IHRydWUgJiYgY2xpZW50Lmhhcy50b3VjaCAhPT0gdHJ1ZSkge1xuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbW91c2VDYXB0dXJlID0gbW9kaWZpZXJzLm1vdXNlQ2FwdHVyZSA9PT0gdHJ1ZSA/ICdDYXB0dXJlJyA6ICcnXG5cbiAgICAgICAgY29uc3QgY3R4ID0ge1xuICAgICAgICAgIGhhbmRsZXI6IHZhbHVlLFxuICAgICAgICAgIHNlbnNpdGl2aXR5OiBwYXJzZUFyZyhhcmcpLFxuICAgICAgICAgIGRpcmVjdGlvbjogZ2V0TW9kaWZpZXJEaXJlY3Rpb25zKG1vZGlmaWVycyksXG5cbiAgICAgICAgICBub29wLFxuXG4gICAgICAgICAgbW91c2VTdGFydCAoZXZ0KSB7XG4gICAgICAgICAgICBpZiAoc2hvdWxkU3RhcnQoZXZ0LCBjdHgpICYmIGxlZnRDbGljayhldnQpKSB7XG4gICAgICAgICAgICAgIGFkZEV2dChjdHgsICd0ZW1wJywgW1xuICAgICAgICAgICAgICAgIFsgZG9jdW1lbnQsICdtb3VzZW1vdmUnLCAnbW92ZScsIGBub3RQYXNzaXZlJHsgbW91c2VDYXB0dXJlIH1gIF0sXG4gICAgICAgICAgICAgICAgWyBkb2N1bWVudCwgJ21vdXNldXAnLCAnZW5kJywgJ25vdFBhc3NpdmVDYXB0dXJlJyBdXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgIGN0eC5zdGFydChldnQsIHRydWUpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHRvdWNoU3RhcnQgKGV2dCkge1xuICAgICAgICAgICAgaWYgKHNob3VsZFN0YXJ0KGV2dCwgY3R4KSkge1xuICAgICAgICAgICAgICBjb25zdCB0YXJnZXQgPSBldnQudGFyZ2V0XG4gICAgICAgICAgICAgIGFkZEV2dChjdHgsICd0ZW1wJywgW1xuICAgICAgICAgICAgICAgIFsgdGFyZ2V0LCAndG91Y2htb3ZlJywgJ21vdmUnLCAnbm90UGFzc2l2ZUNhcHR1cmUnIF0sXG4gICAgICAgICAgICAgICAgWyB0YXJnZXQsICd0b3VjaGNhbmNlbCcsICdlbmQnLCAnbm90UGFzc2l2ZUNhcHR1cmUnIF0sXG4gICAgICAgICAgICAgICAgWyB0YXJnZXQsICd0b3VjaGVuZCcsICdlbmQnLCAnbm90UGFzc2l2ZUNhcHR1cmUnIF1cbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgY3R4LnN0YXJ0KGV2dClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgc3RhcnQgKGV2dCwgbW91c2VFdmVudCkge1xuICAgICAgICAgICAgY2xpZW50LmlzLmZpcmVmb3ggPT09IHRydWUgJiYgcHJldmVudERyYWdnYWJsZShlbCwgdHJ1ZSlcblxuICAgICAgICAgICAgY29uc3QgcG9zID0gcG9zaXRpb24oZXZ0KVxuXG4gICAgICAgICAgICBjdHguZXZlbnQgPSB7XG4gICAgICAgICAgICAgIHg6IHBvcy5sZWZ0LFxuICAgICAgICAgICAgICB5OiBwb3MudG9wLFxuICAgICAgICAgICAgICB0aW1lOiBEYXRlLm5vdygpLFxuICAgICAgICAgICAgICBtb3VzZTogbW91c2VFdmVudCA9PT0gdHJ1ZSxcbiAgICAgICAgICAgICAgZGlyOiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBtb3ZlIChldnQpIHtcbiAgICAgICAgICAgIGlmIChjdHguZXZlbnQgPT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGN0eC5ldmVudC5kaXIgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgIHN0b3BBbmRQcmV2ZW50KGV2dClcbiAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IHRpbWUgPSBEYXRlLm5vdygpIC0gY3R4LmV2ZW50LnRpbWVcblxuICAgICAgICAgICAgaWYgKHRpbWUgPT09IDApIHtcbiAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0XG4gICAgICAgICAgICAgIHBvcyA9IHBvc2l0aW9uKGV2dCksXG4gICAgICAgICAgICAgIGRpc3RYID0gcG9zLmxlZnQgLSBjdHguZXZlbnQueCxcbiAgICAgICAgICAgICAgYWJzWCA9IE1hdGguYWJzKGRpc3RYKSxcbiAgICAgICAgICAgICAgZGlzdFkgPSBwb3MudG9wIC0gY3R4LmV2ZW50LnksXG4gICAgICAgICAgICAgIGFic1kgPSBNYXRoLmFicyhkaXN0WSlcblxuICAgICAgICAgICAgaWYgKGN0eC5ldmVudC5tb3VzZSAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICBpZiAoYWJzWCA8IGN0eC5zZW5zaXRpdml0eVsgMSBdICYmIGFic1kgPCBjdHguc2Vuc2l0aXZpdHlbIDEgXSkge1xuICAgICAgICAgICAgICAgIGN0eC5lbmQoZXZ0KVxuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChhYnNYIDwgY3R4LnNlbnNpdGl2aXR5WyAyIF0gJiYgYWJzWSA8IGN0eC5zZW5zaXRpdml0eVsgMiBdKSB7XG4gICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdFxuICAgICAgICAgICAgICB2ZWxYID0gYWJzWCAvIHRpbWUsXG4gICAgICAgICAgICAgIHZlbFkgPSBhYnNZIC8gdGltZVxuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIGN0eC5kaXJlY3Rpb24udmVydGljYWwgPT09IHRydWVcbiAgICAgICAgICAgICAgJiYgYWJzWCA8IGFic1lcbiAgICAgICAgICAgICAgJiYgYWJzWCA8IDEwMFxuICAgICAgICAgICAgICAmJiB2ZWxZID4gY3R4LnNlbnNpdGl2aXR5WyAwIF1cbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBjdHguZXZlbnQuZGlyID0gZGlzdFkgPCAwID8gJ3VwJyA6ICdkb3duJ1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIGN0eC5kaXJlY3Rpb24uaG9yaXpvbnRhbCA9PT0gdHJ1ZVxuICAgICAgICAgICAgICAmJiBhYnNYID4gYWJzWVxuICAgICAgICAgICAgICAmJiBhYnNZIDwgMTAwXG4gICAgICAgICAgICAgICYmIHZlbFggPiBjdHguc2Vuc2l0aXZpdHlbIDAgXVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIGN0eC5ldmVudC5kaXIgPSBkaXN0WCA8IDAgPyAnbGVmdCcgOiAncmlnaHQnXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgY3R4LmRpcmVjdGlvbi51cCA9PT0gdHJ1ZVxuICAgICAgICAgICAgICAmJiBhYnNYIDwgYWJzWVxuICAgICAgICAgICAgICAmJiBkaXN0WSA8IDBcbiAgICAgICAgICAgICAgJiYgYWJzWCA8IDEwMFxuICAgICAgICAgICAgICAmJiB2ZWxZID4gY3R4LnNlbnNpdGl2aXR5WyAwIF1cbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBjdHguZXZlbnQuZGlyID0gJ3VwJ1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIGN0eC5kaXJlY3Rpb24uZG93biA9PT0gdHJ1ZVxuICAgICAgICAgICAgICAmJiBhYnNYIDwgYWJzWVxuICAgICAgICAgICAgICAmJiBkaXN0WSA+IDBcbiAgICAgICAgICAgICAgJiYgYWJzWCA8IDEwMFxuICAgICAgICAgICAgICAmJiB2ZWxZID4gY3R4LnNlbnNpdGl2aXR5WyAwIF1cbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBjdHguZXZlbnQuZGlyID0gJ2Rvd24nXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgY3R4LmRpcmVjdGlvbi5sZWZ0ID09PSB0cnVlXG4gICAgICAgICAgICAgICYmIGFic1ggPiBhYnNZXG4gICAgICAgICAgICAgICYmIGRpc3RYIDwgMFxuICAgICAgICAgICAgICAmJiBhYnNZIDwgMTAwXG4gICAgICAgICAgICAgICYmIHZlbFggPiBjdHguc2Vuc2l0aXZpdHlbIDAgXVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIGN0eC5ldmVudC5kaXIgPSAnbGVmdCdcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBjdHguZGlyZWN0aW9uLnJpZ2h0ID09PSB0cnVlXG4gICAgICAgICAgICAgICYmIGFic1ggPiBhYnNZXG4gICAgICAgICAgICAgICYmIGRpc3RYID4gMFxuICAgICAgICAgICAgICAmJiBhYnNZIDwgMTAwXG4gICAgICAgICAgICAgICYmIHZlbFggPiBjdHguc2Vuc2l0aXZpdHlbIDAgXVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIGN0eC5ldmVudC5kaXIgPSAncmlnaHQnXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjdHguZXZlbnQuZGlyICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgICBzdG9wQW5kUHJldmVudChldnQpXG5cbiAgICAgICAgICAgICAgaWYgKGN0eC5ldmVudC5tb3VzZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnbm8tcG9pbnRlci1ldmVudHMtLWNoaWxkcmVuJylcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ25vbi1zZWxlY3RhYmxlJylcbiAgICAgICAgICAgICAgICBjbGVhclNlbGVjdGlvbigpXG5cbiAgICAgICAgICAgICAgICBjdHguc3R5bGVDbGVhbnVwID0gd2l0aERlbGF5ID0+IHtcbiAgICAgICAgICAgICAgICAgIGN0eC5zdHlsZUNsZWFudXAgPSB2b2lkIDBcblxuICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdub24tc2VsZWN0YWJsZScpXG5cbiAgICAgICAgICAgICAgICAgIGNvbnN0IHJlbW92ZSA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCduby1wb2ludGVyLWV2ZW50cy0tY2hpbGRyZW4nKVxuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICBpZiAod2l0aERlbGF5ID09PSB0cnVlKSB7IHNldFRpbWVvdXQocmVtb3ZlLCA1MCkgfVxuICAgICAgICAgICAgICAgICAgZWxzZSB7IHJlbW92ZSgpIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBjdHguaGFuZGxlcih7XG4gICAgICAgICAgICAgICAgZXZ0LFxuICAgICAgICAgICAgICAgIHRvdWNoOiBjdHguZXZlbnQubW91c2UgIT09IHRydWUsXG4gICAgICAgICAgICAgICAgbW91c2U6IGN0eC5ldmVudC5tb3VzZSxcbiAgICAgICAgICAgICAgICBkaXJlY3Rpb246IGN0eC5ldmVudC5kaXIsXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IHRpbWUsXG4gICAgICAgICAgICAgICAgZGlzdGFuY2U6IHtcbiAgICAgICAgICAgICAgICAgIHg6IGFic1gsXG4gICAgICAgICAgICAgICAgICB5OiBhYnNZXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgIGN0eC5lbmQoZXZ0KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBlbmQgKGV2dCkge1xuICAgICAgICAgICAgaWYgKGN0eC5ldmVudCA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjbGVhbkV2dChjdHgsICd0ZW1wJylcbiAgICAgICAgICAgIGNsaWVudC5pcy5maXJlZm94ID09PSB0cnVlICYmIHByZXZlbnREcmFnZ2FibGUoZWwsIGZhbHNlKVxuICAgICAgICAgICAgY3R4LnN0eWxlQ2xlYW51cCAhPT0gdm9pZCAwICYmIGN0eC5zdHlsZUNsZWFudXAodHJ1ZSlcbiAgICAgICAgICAgIGV2dCAhPT0gdm9pZCAwICYmIGN0eC5ldmVudC5kaXIgIT09IGZhbHNlICYmIHN0b3BBbmRQcmV2ZW50KGV2dClcblxuICAgICAgICAgICAgY3R4LmV2ZW50ID0gdm9pZCAwXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZWwuX19xdG91Y2hzd2lwZSA9IGN0eFxuXG4gICAgICAgIGlmIChtb2RpZmllcnMubW91c2UgPT09IHRydWUpIHtcbiAgICAgICAgICAvLyBhY2NvdW50IGZvciBVTUQgdG9vIHdoZXJlIG1vZGlmaWVycyB3aWxsIGJlIGxvd2VyY2FzZWQgdG8gd29ya1xuICAgICAgICAgIGNvbnN0IGNhcHR1cmUgPSBtb2RpZmllcnMubW91c2VDYXB0dXJlID09PSB0cnVlIHx8IG1vZGlmaWVycy5tb3VzZWNhcHR1cmUgPT09IHRydWVcbiAgICAgICAgICAgID8gJ0NhcHR1cmUnXG4gICAgICAgICAgICA6ICcnXG5cbiAgICAgICAgICBhZGRFdnQoY3R4LCAnbWFpbicsIFtcbiAgICAgICAgICAgIFsgZWwsICdtb3VzZWRvd24nLCAnbW91c2VTdGFydCcsIGBwYXNzaXZlJHsgY2FwdHVyZSB9YCBdXG4gICAgICAgICAgXSlcbiAgICAgICAgfVxuXG4gICAgICAgIGNsaWVudC5oYXMudG91Y2ggPT09IHRydWUgJiYgYWRkRXZ0KGN0eCwgJ21haW4nLCBbXG4gICAgICAgICAgWyBlbCwgJ3RvdWNoc3RhcnQnLCAndG91Y2hTdGFydCcsIGBwYXNzaXZlJHsgbW9kaWZpZXJzLmNhcHR1cmUgPT09IHRydWUgPyAnQ2FwdHVyZScgOiAnJyB9YCBdLFxuICAgICAgICAgIFsgZWwsICd0b3VjaG1vdmUnLCAnbm9vcCcsICdub3RQYXNzaXZlQ2FwdHVyZScgXSAvLyBjYW5ub3QgYmUgcGFzc2l2ZSAoZXg6IGlPUyBzY3JvbGwpXG4gICAgICAgIF0pXG4gICAgICB9LFxuXG4gICAgICB1cGRhdGVkIChlbCwgYmluZGluZ3MpIHtcbiAgICAgICAgY29uc3QgY3R4ID0gZWwuX19xdG91Y2hzd2lwZVxuXG4gICAgICAgIGlmIChjdHggIT09IHZvaWQgMCkge1xuICAgICAgICAgIGlmIChiaW5kaW5ncy5vbGRWYWx1ZSAhPT0gYmluZGluZ3MudmFsdWUpIHtcbiAgICAgICAgICAgIHR5cGVvZiBiaW5kaW5ncy52YWx1ZSAhPT0gJ2Z1bmN0aW9uJyAmJiBjdHguZW5kKClcbiAgICAgICAgICAgIGN0eC5oYW5kbGVyID0gYmluZGluZ3MudmFsdWVcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjdHguZGlyZWN0aW9uID0gZ2V0TW9kaWZpZXJEaXJlY3Rpb25zKGJpbmRpbmdzLm1vZGlmaWVycylcbiAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgYmVmb3JlVW5tb3VudCAoZWwpIHtcbiAgICAgICAgY29uc3QgY3R4ID0gZWwuX19xdG91Y2hzd2lwZVxuXG4gICAgICAgIGlmIChjdHggIT09IHZvaWQgMCkge1xuICAgICAgICAgIGNsZWFuRXZ0KGN0eCwgJ21haW4nKVxuICAgICAgICAgIGNsZWFuRXZ0KGN0eCwgJ3RlbXAnKVxuXG4gICAgICAgICAgY2xpZW50LmlzLmZpcmVmb3ggPT09IHRydWUgJiYgcHJldmVudERyYWdnYWJsZShlbCwgZmFsc2UpXG4gICAgICAgICAgY3R4LnN0eWxlQ2xlYW51cCAhPT0gdm9pZCAwICYmIGN0eC5zdHlsZUNsZWFudXAoKVxuXG4gICAgICAgICAgZGVsZXRlIGVsLl9fcXRvdWNoc3dpcGVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbilcbiIsImltcG9ydCB7IGgsIHJlZiwgY29tcHV0ZWQsIHdhdGNoLCBuZXh0VGljaywgZ2V0Q3VycmVudEluc3RhbmNlLCBUcmFuc2l0aW9uLCBLZWVwQWxpdmUgfSBmcm9tICd2dWUnXG5cbmltcG9ydCBUb3VjaFN3aXBlIGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvVG91Y2hTd2lwZS5qcydcblxuaW1wb3J0IHVzZUNhY2hlIGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWNhY2hlLmpzJ1xuXG5pbXBvcnQgeyBoU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvcmVuZGVyLmpzJ1xuaW1wb3J0IHsgZ2V0Tm9ybWFsaXplZFZOb2RlcyB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvdm0uanMnXG5cbmV4cG9ydCBjb25zdCB1c2VQYW5lbENoaWxkUHJvcHMgPSB7XG4gIG5hbWU6IHsgcmVxdWlyZWQ6IHRydWUgfSxcbiAgZGlzYWJsZTogQm9vbGVhblxufVxuXG5jb25zdCBQYW5lbFdyYXBwZXIgPSB7XG4gIHNldHVwIChfLCB7IHNsb3RzIH0pIHtcbiAgICByZXR1cm4gKCkgPT4gaCgnZGl2Jywge1xuICAgICAgY2xhc3M6ICdxLXBhbmVsIHNjcm9sbCcsXG4gICAgICByb2xlOiAndGFicGFuZWwnXG4gICAgfSwgaFNsb3Qoc2xvdHMuZGVmYXVsdCkpXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHVzZVBhbmVsUHJvcHMgPSB7XG4gIG1vZGVsVmFsdWU6IHtcbiAgICByZXF1aXJlZDogdHJ1ZVxuICB9LFxuXG4gIGFuaW1hdGVkOiBCb29sZWFuLFxuICBpbmZpbml0ZTogQm9vbGVhbixcbiAgc3dpcGVhYmxlOiBCb29sZWFuLFxuICB2ZXJ0aWNhbDogQm9vbGVhbixcblxuICB0cmFuc2l0aW9uUHJldjogU3RyaW5nLFxuICB0cmFuc2l0aW9uTmV4dDogU3RyaW5nLFxuICB0cmFuc2l0aW9uRHVyYXRpb246IHtcbiAgICB0eXBlOiBbIFN0cmluZywgTnVtYmVyIF0sXG4gICAgZGVmYXVsdDogMzAwXG4gIH0sXG5cbiAga2VlcEFsaXZlOiBCb29sZWFuLFxuICBrZWVwQWxpdmVJbmNsdWRlOiBbIFN0cmluZywgQXJyYXksIFJlZ0V4cCBdLFxuICBrZWVwQWxpdmVFeGNsdWRlOiBbIFN0cmluZywgQXJyYXksIFJlZ0V4cCBdLFxuICBrZWVwQWxpdmVNYXg6IE51bWJlclxufVxuXG5leHBvcnQgY29uc3QgdXNlUGFuZWxFbWl0cyA9IFsgJ3VwZGF0ZTptb2RlbFZhbHVlJywgJ2JlZm9yZVRyYW5zaXRpb24nLCAndHJhbnNpdGlvbicgXVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IHsgcHJvcHMsIGVtaXQsIHByb3h5IH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuICBjb25zdCB7IGdldENhY2hlV2l0aEZuIH0gPSB1c2VDYWNoZSgpXG5cbiAgbGV0IHBhbmVscywgZm9yY2VkUGFuZWxUcmFuc2l0aW9uXG5cbiAgY29uc3QgcGFuZWxJbmRleCA9IHJlZihudWxsKVxuICBjb25zdCBwYW5lbFRyYW5zaXRpb24gPSByZWYobnVsbClcblxuICBmdW5jdGlvbiBvblN3aXBlIChldnQpIHtcbiAgICBjb25zdCBkaXIgPSBwcm9wcy52ZXJ0aWNhbCA9PT0gdHJ1ZSA/ICd1cCcgOiAnbGVmdCdcbiAgICBnb1RvUGFuZWxCeU9mZnNldCgocHJveHkuJHEubGFuZy5ydGwgPT09IHRydWUgPyAtMSA6IDEpICogKGV2dC5kaXJlY3Rpb24gPT09IGRpciA/IDEgOiAtMSkpXG4gIH1cblxuICBjb25zdCBwYW5lbERpcmVjdGl2ZXMgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgLy8gaWYgcHJvcHMuc3dpcGVhYmxlXG4gICAgcmV0dXJuIFsgW1xuICAgICAgVG91Y2hTd2lwZSxcbiAgICAgIG9uU3dpcGUsXG4gICAgICB2b2lkIDAsXG4gICAgICB7XG4gICAgICAgIGhvcml6b250YWw6IHByb3BzLnZlcnRpY2FsICE9PSB0cnVlLFxuICAgICAgICB2ZXJ0aWNhbDogcHJvcHMudmVydGljYWwsXG4gICAgICAgIG1vdXNlOiB0cnVlXG4gICAgICB9XG4gICAgXSBdXG4gIH0pXG5cbiAgY29uc3QgdHJhbnNpdGlvblByZXYgPSBjb21wdXRlZCgoKSA9PlxuICAgIHByb3BzLnRyYW5zaXRpb25QcmV2IHx8IGBzbGlkZS0keyBwcm9wcy52ZXJ0aWNhbCA9PT0gdHJ1ZSA/ICdkb3duJyA6ICdyaWdodCcgfWBcbiAgKVxuXG4gIGNvbnN0IHRyYW5zaXRpb25OZXh0ID0gY29tcHV0ZWQoKCkgPT5cbiAgICBwcm9wcy50cmFuc2l0aW9uTmV4dCB8fCBgc2xpZGUtJHsgcHJvcHMudmVydGljYWwgPT09IHRydWUgPyAndXAnIDogJ2xlZnQnIH1gXG4gIClcblxuICBjb25zdCB0cmFuc2l0aW9uU3R5bGUgPSBjb21wdXRlZChcbiAgICAoKSA9PiBgLS1xLXRyYW5zaXRpb24tZHVyYXRpb246ICR7IHByb3BzLnRyYW5zaXRpb25EdXJhdGlvbiB9bXNgXG4gIClcblxuICBjb25zdCBjb250ZW50S2V5ID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgIHR5cGVvZiBwcm9wcy5tb2RlbFZhbHVlID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgcHJvcHMubW9kZWxWYWx1ZSA9PT0gJ251bWJlcidcbiAgICAgID8gcHJvcHMubW9kZWxWYWx1ZVxuICAgICAgOiBTdHJpbmcocHJvcHMubW9kZWxWYWx1ZSlcbiAgKSlcblxuICBjb25zdCBrZWVwQWxpdmVQcm9wcyA9IGNvbXB1dGVkKCgpID0+ICh7XG4gICAgaW5jbHVkZTogcHJvcHMua2VlcEFsaXZlSW5jbHVkZSxcbiAgICBleGNsdWRlOiBwcm9wcy5rZWVwQWxpdmVFeGNsdWRlLFxuICAgIG1heDogcHJvcHMua2VlcEFsaXZlTWF4XG4gIH0pKVxuXG4gIGNvbnN0IG5lZWRzVW5pcXVlS2VlcEFsaXZlV3JhcHBlciA9IGNvbXB1dGVkKCgpID0+XG4gICAgcHJvcHMua2VlcEFsaXZlSW5jbHVkZSAhPT0gdm9pZCAwXG4gICAgfHwgcHJvcHMua2VlcEFsaXZlRXhjbHVkZSAhPT0gdm9pZCAwXG4gIClcblxuICB3YXRjaCgoKSA9PiBwcm9wcy5tb2RlbFZhbHVlLCAobmV3VmFsLCBvbGRWYWwpID0+IHtcbiAgICBjb25zdCBpbmRleCA9IGlzVmFsaWRQYW5lbE5hbWUobmV3VmFsKSA9PT0gdHJ1ZVxuICAgICAgPyBnZXRQYW5lbEluZGV4KG5ld1ZhbClcbiAgICAgIDogLTFcblxuICAgIGlmIChmb3JjZWRQYW5lbFRyYW5zaXRpb24gIT09IHRydWUpIHtcbiAgICAgIHVwZGF0ZVBhbmVsVHJhbnNpdGlvbihcbiAgICAgICAgaW5kZXggPT09IC0xID8gMCA6IChpbmRleCA8IGdldFBhbmVsSW5kZXgob2xkVmFsKSA/IC0xIDogMSlcbiAgICAgIClcbiAgICB9XG5cbiAgICBpZiAocGFuZWxJbmRleC52YWx1ZSAhPT0gaW5kZXgpIHtcbiAgICAgIHBhbmVsSW5kZXgudmFsdWUgPSBpbmRleFxuICAgICAgZW1pdCgnYmVmb3JlVHJhbnNpdGlvbicsIG5ld1ZhbCwgb2xkVmFsKVxuICAgICAgbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICBlbWl0KCd0cmFuc2l0aW9uJywgbmV3VmFsLCBvbGRWYWwpXG4gICAgICB9KVxuICAgIH1cbiAgfSlcblxuICBmdW5jdGlvbiBuZXh0UGFuZWwgKCkgeyBnb1RvUGFuZWxCeU9mZnNldCgxKSB9XG4gIGZ1bmN0aW9uIHByZXZpb3VzUGFuZWwgKCkgeyBnb1RvUGFuZWxCeU9mZnNldCgtMSkgfVxuXG4gIGZ1bmN0aW9uIGdvVG9QYW5lbCAobmFtZSkge1xuICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgbmFtZSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzVmFsaWRQYW5lbE5hbWUgKG5hbWUpIHtcbiAgICByZXR1cm4gbmFtZSAhPT0gdm9pZCAwICYmIG5hbWUgIT09IG51bGwgJiYgbmFtZSAhPT0gJydcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFBhbmVsSW5kZXggKG5hbWUpIHtcbiAgICByZXR1cm4gcGFuZWxzLmZpbmRJbmRleChwYW5lbCA9PiB7XG4gICAgICByZXR1cm4gcGFuZWwucHJvcHMubmFtZSA9PT0gbmFtZVxuICAgICAgICAmJiBwYW5lbC5wcm9wcy5kaXNhYmxlICE9PSAnJ1xuICAgICAgICAmJiBwYW5lbC5wcm9wcy5kaXNhYmxlICE9PSB0cnVlXG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEVuYWJsZWRQYW5lbHMgKCkge1xuICAgIHJldHVybiBwYW5lbHMuZmlsdGVyKHBhbmVsID0+IHtcbiAgICAgIHJldHVybiBwYW5lbC5wcm9wcy5kaXNhYmxlICE9PSAnJ1xuICAgICAgICAmJiBwYW5lbC5wcm9wcy5kaXNhYmxlICE9PSB0cnVlXG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZVBhbmVsVHJhbnNpdGlvbiAoZGlyZWN0aW9uKSB7XG4gICAgY29uc3QgdmFsID0gZGlyZWN0aW9uICE9PSAwICYmIHByb3BzLmFuaW1hdGVkID09PSB0cnVlICYmIHBhbmVsSW5kZXgudmFsdWUgIT09IC0xXG4gICAgICA/ICdxLXRyYW5zaXRpb24tLScgKyAoZGlyZWN0aW9uID09PSAtMSA/IHRyYW5zaXRpb25QcmV2LnZhbHVlIDogdHJhbnNpdGlvbk5leHQudmFsdWUpXG4gICAgICA6IG51bGxcblxuICAgIGlmIChwYW5lbFRyYW5zaXRpb24udmFsdWUgIT09IHZhbCkge1xuICAgICAgcGFuZWxUcmFuc2l0aW9uLnZhbHVlID0gdmFsXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZ29Ub1BhbmVsQnlPZmZzZXQgKGRpcmVjdGlvbiwgc3RhcnRJbmRleCA9IHBhbmVsSW5kZXgudmFsdWUpIHtcbiAgICBsZXQgaW5kZXggPSBzdGFydEluZGV4ICsgZGlyZWN0aW9uXG5cbiAgICB3aGlsZSAoaW5kZXggPiAtMSAmJiBpbmRleCA8IHBhbmVscy5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IG9wdCA9IHBhbmVsc1sgaW5kZXggXVxuXG4gICAgICBpZiAoXG4gICAgICAgIG9wdCAhPT0gdm9pZCAwXG4gICAgICAgICYmIG9wdC5wcm9wcy5kaXNhYmxlICE9PSAnJ1xuICAgICAgICAmJiBvcHQucHJvcHMuZGlzYWJsZSAhPT0gdHJ1ZVxuICAgICAgKSB7XG4gICAgICAgIHVwZGF0ZVBhbmVsVHJhbnNpdGlvbihkaXJlY3Rpb24pXG4gICAgICAgIGZvcmNlZFBhbmVsVHJhbnNpdGlvbiA9IHRydWVcbiAgICAgICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCBvcHQucHJvcHMubmFtZSlcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgZm9yY2VkUGFuZWxUcmFuc2l0aW9uID0gZmFsc2VcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGluZGV4ICs9IGRpcmVjdGlvblxuICAgIH1cblxuICAgIGlmIChwcm9wcy5pbmZpbml0ZSA9PT0gdHJ1ZSAmJiBwYW5lbHMubGVuZ3RoID4gMCAmJiBzdGFydEluZGV4ICE9PSAtMSAmJiBzdGFydEluZGV4ICE9PSBwYW5lbHMubGVuZ3RoKSB7XG4gICAgICBnb1RvUGFuZWxCeU9mZnNldChkaXJlY3Rpb24sIGRpcmVjdGlvbiA9PT0gLTEgPyBwYW5lbHMubGVuZ3RoIDogLTEpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlUGFuZWxJbmRleCAoKSB7XG4gICAgY29uc3QgaW5kZXggPSBnZXRQYW5lbEluZGV4KHByb3BzLm1vZGVsVmFsdWUpXG5cbiAgICBpZiAocGFuZWxJbmRleC52YWx1ZSAhPT0gaW5kZXgpIHtcbiAgICAgIHBhbmVsSW5kZXgudmFsdWUgPSBpbmRleFxuICAgIH1cblxuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBmdW5jdGlvbiBnZXRQYW5lbENvbnRlbnRDaGlsZCAoKSB7XG4gICAgY29uc3QgcGFuZWwgPSBpc1ZhbGlkUGFuZWxOYW1lKHByb3BzLm1vZGVsVmFsdWUpID09PSB0cnVlXG4gICAgICAmJiB1cGRhdGVQYW5lbEluZGV4KClcbiAgICAgICYmIHBhbmVsc1sgcGFuZWxJbmRleC52YWx1ZSBdXG5cbiAgICByZXR1cm4gcHJvcHMua2VlcEFsaXZlID09PSB0cnVlXG4gICAgICA/IFtcbiAgICAgICAgICBoKEtlZXBBbGl2ZSwga2VlcEFsaXZlUHJvcHMudmFsdWUsIFtcbiAgICAgICAgICAgIGgoXG4gICAgICAgICAgICAgIG5lZWRzVW5pcXVlS2VlcEFsaXZlV3JhcHBlci52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAgICAgICAgID8gZ2V0Q2FjaGVXaXRoRm4oY29udGVudEtleS52YWx1ZSwgKCkgPT4gKHsgLi4uUGFuZWxXcmFwcGVyLCBuYW1lOiBjb250ZW50S2V5LnZhbHVlIH0pKVxuICAgICAgICAgICAgICAgIDogUGFuZWxXcmFwcGVyLFxuICAgICAgICAgICAgICB7IGtleTogY29udGVudEtleS52YWx1ZSwgc3R5bGU6IHRyYW5zaXRpb25TdHlsZS52YWx1ZSB9LFxuICAgICAgICAgICAgICAoKSA9PiBwYW5lbFxuICAgICAgICAgICAgKVxuICAgICAgICAgIF0pXG4gICAgICAgIF1cbiAgICAgIDogW1xuICAgICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICAgIGNsYXNzOiAncS1wYW5lbCBzY3JvbGwnLFxuICAgICAgICAgICAgc3R5bGU6IHRyYW5zaXRpb25TdHlsZS52YWx1ZSxcbiAgICAgICAgICAgIGtleTogY29udGVudEtleS52YWx1ZSxcbiAgICAgICAgICAgIHJvbGU6ICd0YWJwYW5lbCdcbiAgICAgICAgICB9LCBbIHBhbmVsIF0pXG4gICAgICAgIF1cbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFBhbmVsQ29udGVudCAoKSB7XG4gICAgaWYgKHBhbmVscy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHJldHVybiBwcm9wcy5hbmltYXRlZCA9PT0gdHJ1ZVxuICAgICAgPyBbIGgoVHJhbnNpdGlvbiwgeyBuYW1lOiBwYW5lbFRyYW5zaXRpb24udmFsdWUgfSwgZ2V0UGFuZWxDb250ZW50Q2hpbGQpIF1cbiAgICAgIDogZ2V0UGFuZWxDb250ZW50Q2hpbGQoKVxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlUGFuZWxzTGlzdCAoc2xvdHMpIHtcbiAgICBwYW5lbHMgPSBnZXROb3JtYWxpemVkVk5vZGVzKFxuICAgICAgaFNsb3Qoc2xvdHMuZGVmYXVsdCwgW10pXG4gICAgKS5maWx0ZXIoXG4gICAgICBwYW5lbCA9PiBwYW5lbC5wcm9wcyAhPT0gbnVsbFxuICAgICAgICAmJiBwYW5lbC5wcm9wcy5zbG90ID09PSB2b2lkIDBcbiAgICAgICAgJiYgaXNWYWxpZFBhbmVsTmFtZShwYW5lbC5wcm9wcy5uYW1lKSA9PT0gdHJ1ZVxuICAgIClcblxuICAgIHJldHVybiBwYW5lbHMubGVuZ3RoXG4gIH1cblxuICBmdW5jdGlvbiBnZXRQYW5lbHMgKCkge1xuICAgIHJldHVybiBwYW5lbHNcbiAgfVxuXG4gIC8vIGV4cG9zZSBwdWJsaWMgbWV0aG9kc1xuICBPYmplY3QuYXNzaWduKHByb3h5LCB7XG4gICAgbmV4dDogbmV4dFBhbmVsLFxuICAgIHByZXZpb3VzOiBwcmV2aW91c1BhbmVsLFxuICAgIGdvVG86IGdvVG9QYW5lbFxuICB9KVxuXG4gIHJldHVybiB7XG4gICAgcGFuZWxJbmRleCxcbiAgICBwYW5lbERpcmVjdGl2ZXMsXG5cbiAgICB1cGRhdGVQYW5lbHNMaXN0LFxuICAgIHVwZGF0ZVBhbmVsSW5kZXgsXG5cbiAgICBnZXRQYW5lbENvbnRlbnQsXG4gICAgZ2V0RW5hYmxlZFBhbmVscyxcbiAgICBnZXRQYW5lbHMsXG5cbiAgICBpc1ZhbGlkUGFuZWxOYW1lLFxuXG4gICAga2VlcEFsaXZlUHJvcHMsXG4gICAgbmVlZHNVbmlxdWVLZWVwQWxpdmVXcmFwcGVyLFxuXG4gICAgZ29Ub1BhbmVsQnlPZmZzZXQsXG4gICAgZ29Ub1BhbmVsLFxuXG4gICAgbmV4dFBhbmVsLFxuICAgIHByZXZpb3VzUGFuZWxcbiAgfVxufVxuIiwiaW1wb3J0IHsgaCB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgdXNlUGFuZWxDaGlsZFByb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtcGFuZWwuanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgaFNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FUYWJQYW5lbCcsXG5cbiAgcHJvcHM6IHVzZVBhbmVsQ2hpbGRQcm9wcyxcblxuICBzZXR1cCAoXywgeyBzbG90cyB9KSB7XG4gICAgcmV0dXJuICgpID0+IGgoJ2RpdicsIHsgY2xhc3M6ICdxLXRhYi1wYW5lbCcsIHJvbGU6ICd0YWJwYW5lbCcgfSwgaFNsb3Qoc2xvdHMuZGVmYXVsdCkpXG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBjb21wdXRlZCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgdXNlRGFyaywgeyB1c2VEYXJrUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1kYXJrLmpzJ1xuaW1wb3J0IHVzZVBhbmVsLCB7IHVzZVBhbmVsUHJvcHMsIHVzZVBhbmVsRW1pdHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1wYW5lbC5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBoRGlyIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9yZW5kZXIuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRVGFiUGFuZWxzJyxcblxuICBwcm9wczoge1xuICAgIC4uLnVzZVBhbmVsUHJvcHMsXG4gICAgLi4udXNlRGFya1Byb3BzXG4gIH0sXG5cbiAgZW1pdHM6IHVzZVBhbmVsRW1pdHMsXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzIH0pIHtcbiAgICBjb25zdCB2bSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gICAgY29uc3QgaXNEYXJrID0gdXNlRGFyayhwcm9wcywgdm0ucHJveHkuJHEpXG5cbiAgICBjb25zdCB7IHVwZGF0ZVBhbmVsc0xpc3QsIGdldFBhbmVsQ29udGVudCwgcGFuZWxEaXJlY3RpdmVzIH0gPSB1c2VQYW5lbCgpXG5cbiAgICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICdxLXRhYi1wYW5lbHMgcS1wYW5lbC1wYXJlbnQnXG4gICAgICArIChpc0RhcmsudmFsdWUgPT09IHRydWUgPyAnIHEtdGFiLXBhbmVscy0tZGFyayBxLWRhcmsnIDogJycpXG4gICAgKVxuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHVwZGF0ZVBhbmVsc0xpc3Qoc2xvdHMpXG5cbiAgICAgIHJldHVybiBoRGlyKFxuICAgICAgICAnZGl2JyxcbiAgICAgICAgeyBjbGFzczogY2xhc3Nlcy52YWx1ZSB9LFxuICAgICAgICBnZXRQYW5lbENvbnRlbnQoKSxcbiAgICAgICAgJ3BhbicsXG4gICAgICAgIHByb3BzLnN3aXBlYWJsZSxcbiAgICAgICAgKCkgPT4gcGFuZWxEaXJlY3RpdmVzLnZhbHVlXG4gICAgICApXG4gICAgfVxuICB9XG59KVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUlBLElBQUEsT0FBZSxnQkFBZ0I7QUFBQSxFQUM3QixNQUFNO0FBQUEsRUFFTixPQUFPO0FBQUEsRUFFUCxPQUFPO0FBQUEsRUFFUCxNQUFPLE9BQU8sRUFBRSxPQUFPLEtBQUksR0FBSTtBQUM3QixVQUFNLEVBQUUsVUFBUyxJQUFLLE9BQU8sT0FBTyxPQUFPLElBQUk7QUFDL0MsV0FBTyxNQUFNLFVBQVUsS0FBSztBQUFBLEVBQzdCO0FBQ0gsQ0FBQztBQ1BELFNBQVMsU0FBVSxLQUFLO0FBSXRCLFFBQU0sT0FB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
