import { T as TouchPan } from "./TouchPan.43131768.js";
import { u as useDarkProps, a as useDark } from "./use-dark.089fd8b8.js";
import { u as useCache } from "./use-cache.b0833c75.js";
import { bt as createComponent, y as ref, a1 as computed, aw as onBeforeUpdate, av as onBeforeUnmount, ak as h, bF as hSlot, b7 as withDirectives, ah as getCurrentInstance } from "./index.0ce84b9b.js";
const slotsDef = [
  ["left", "center", "start", "width"],
  ["right", "center", "end", "width"],
  ["top", "start", "center", "height"],
  ["bottom", "end", "center", "height"]
];
var QSlideItem = createComponent({
  name: "QSlideItem",
  props: {
    ...useDarkProps,
    leftColor: String,
    rightColor: String,
    topColor: String,
    bottomColor: String,
    onSlide: Function
  },
  emits: ["action", "top", "right", "bottom", "left"],
  setup(props, { slots, emit }) {
    const { proxy } = getCurrentInstance();
    const { $q } = proxy;
    const isDark = useDark(props, $q);
    const { getCacheWithFn } = useCache();
    const contentRef = ref(null);
    let timer = null, pan = {}, dirRefs = {}, dirContentRefs = {};
    const langDir = computed(() => $q.lang.rtl === true ? { left: "right", right: "left" } : { left: "left", right: "right" });
    const classes = computed(
      () => "q-slide-item q-item-type overflow-hidden" + (isDark.value === true ? " q-slide-item--dark q-dark" : "")
    );
    function reset() {
      contentRef.value.style.transform = "translate(0,0)";
    }
    function emitSlide(side, ratio, isReset) {
      props.onSlide !== void 0 && emit("slide", { side, ratio, isReset });
    }
    function onPan(evt) {
      const node = contentRef.value;
      if (evt.isFirst) {
        pan = {
          dir: null,
          size: { left: 0, right: 0, top: 0, bottom: 0 },
          scale: 0
        };
        node.classList.add("no-transition");
        slotsDef.forEach((slotName) => {
          if (slots[slotName[0]] !== void 0) {
            const node2 = dirContentRefs[slotName[0]];
            node2.style.transform = "scale(1)";
            pan.size[slotName[0]] = node2.getBoundingClientRect()[slotName[3]];
          }
        });
        pan.axis = evt.direction === "up" || evt.direction === "down" ? "Y" : "X";
      } else if (evt.isFinal) {
        node.classList.remove("no-transition");
        if (pan.scale === 1) {
          node.style.transform = `translate${pan.axis}(${pan.dir * 100}%)`;
          timer !== null && clearTimeout(timer);
          timer = setTimeout(() => {
            timer = null;
            emit(pan.showing, { reset });
            emit("action", { side: pan.showing, reset });
          }, 230);
        } else {
          node.style.transform = "translate(0,0)";
          emitSlide(pan.showing, 0, true);
        }
        return;
      } else {
        evt.direction = pan.axis === "X" ? evt.offset.x < 0 ? "left" : "right" : evt.offset.y < 0 ? "up" : "down";
      }
      if (slots.left === void 0 && evt.direction === langDir.value.right || slots.right === void 0 && evt.direction === langDir.value.left || slots.top === void 0 && evt.direction === "down" || slots.bottom === void 0 && evt.direction === "up") {
        node.style.transform = "translate(0,0)";
        return;
      }
      let showing, dir, dist;
      if (pan.axis === "X") {
        dir = evt.direction === "left" ? -1 : 1;
        showing = dir === 1 ? langDir.value.left : langDir.value.right;
        dist = evt.distance.x;
      } else {
        dir = evt.direction === "up" ? -2 : 2;
        showing = dir === 2 ? "top" : "bottom";
        dist = evt.distance.y;
      }
      if (pan.dir !== null && Math.abs(dir) !== Math.abs(pan.dir)) {
        return;
      }
      if (pan.dir !== dir) {
        ["left", "right", "top", "bottom"].forEach((d) => {
          if (dirRefs[d]) {
            dirRefs[d].style.visibility = showing === d ? "visible" : "hidden";
          }
        });
        pan.showing = showing;
        pan.dir = dir;
      }
      pan.scale = Math.max(0, Math.min(1, (dist - 40) / pan.size[showing]));
      node.style.transform = `translate${pan.axis}(${dist * dir / Math.abs(dir)}px)`;
      dirContentRefs[showing].style.transform = `scale(${pan.scale})`;
      emitSlide(showing, pan.scale, false);
    }
    onBeforeUpdate(() => {
      dirRefs = {};
      dirContentRefs = {};
    });
    onBeforeUnmount(() => {
      timer !== null && clearTimeout(timer);
    });
    Object.assign(proxy, { reset });
    return () => {
      const content = [], slotsList = {
        left: slots[langDir.value.right] !== void 0,
        right: slots[langDir.value.left] !== void 0,
        up: slots.bottom !== void 0,
        down: slots.top !== void 0
      }, dirs = Object.keys(slotsList).filter((key) => slotsList[key] === true);
      slotsDef.forEach((slotName) => {
        const dir = slotName[0];
        if (slots[dir] !== void 0) {
          content.push(
            h("div", {
              ref: (el) => {
                dirRefs[dir] = el;
              },
              class: `q-slide-item__${dir} absolute-full row no-wrap items-${slotName[1]} justify-${slotName[2]}` + (props[dir + "Color"] !== void 0 ? ` bg-${props[dir + "Color"]}` : "")
            }, [
              h("div", { ref: (el) => {
                dirContentRefs[dir] = el;
              } }, slots[dir]())
            ])
          );
        }
      });
      const node = h("div", {
        key: `${dirs.length === 0 ? "only-" : ""} content`,
        ref: contentRef,
        class: "q-slide-item__content"
      }, hSlot(slots.default));
      if (dirs.length === 0) {
        content.push(node);
      } else {
        content.push(
          withDirectives(node, getCacheWithFn("dir#" + dirs.join(""), () => {
            const modifiers = {
              prevent: true,
              stop: true,
              mouse: true
            };
            dirs.forEach((dir) => {
              modifiers[dir] = true;
            });
            return [[
              TouchPan,
              onPan,
              void 0,
              modifiers
            ]];
          }))
        );
      }
      return h("div", { class: classes.value }, content);
    };
  }
});
export { QSlideItem as Q };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUVNsaWRlSXRlbS5jYTFjN2EzMy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9zbGlkZS1pdGVtL1FTbGlkZUl0ZW0uanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaCwgcmVmLCBjb21wdXRlZCwgd2l0aERpcmVjdGl2ZXMsIG9uQmVmb3JlVW5tb3VudCwgb25CZWZvcmVVcGRhdGUsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IFRvdWNoUGFuIGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvVG91Y2hQYW4uanMnXG5cbmltcG9ydCB1c2VEYXJrLCB7IHVzZURhcmtQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWRhcmsuanMnXG5pbXBvcnQgdXNlQ2FjaGUgZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtY2FjaGUuanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgaFNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcblxuY29uc3Qgc2xvdHNEZWYgPSBbXG4gIFsgJ2xlZnQnLCAnY2VudGVyJywgJ3N0YXJ0JywgJ3dpZHRoJyBdLFxuICBbICdyaWdodCcsICdjZW50ZXInLCAnZW5kJywgJ3dpZHRoJyBdLFxuICBbICd0b3AnLCAnc3RhcnQnLCAnY2VudGVyJywgJ2hlaWdodCcgXSxcbiAgWyAnYm90dG9tJywgJ2VuZCcsICdjZW50ZXInLCAnaGVpZ2h0JyBdXG5dXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRU2xpZGVJdGVtJyxcblxuICBwcm9wczoge1xuICAgIC4uLnVzZURhcmtQcm9wcyxcblxuICAgIGxlZnRDb2xvcjogU3RyaW5nLFxuICAgIHJpZ2h0Q29sb3I6IFN0cmluZyxcbiAgICB0b3BDb2xvcjogU3RyaW5nLFxuICAgIGJvdHRvbUNvbG9yOiBTdHJpbmcsXG5cbiAgICBvblNsaWRlOiBGdW5jdGlvblxuICB9LFxuXG4gIGVtaXRzOiBbICdhY3Rpb24nLCAndG9wJywgJ3JpZ2h0JywgJ2JvdHRvbScsICdsZWZ0JyBdLFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cywgZW1pdCB9KSB7XG4gICAgY29uc3QgeyBwcm94eSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgICBjb25zdCB7ICRxIH0gPSBwcm94eVxuXG4gICAgY29uc3QgaXNEYXJrID0gdXNlRGFyayhwcm9wcywgJHEpXG4gICAgY29uc3QgeyBnZXRDYWNoZVdpdGhGbiB9ID0gdXNlQ2FjaGUoKVxuXG4gICAgY29uc3QgY29udGVudFJlZiA9IHJlZihudWxsKVxuXG4gICAgbGV0IHRpbWVyID0gbnVsbCwgcGFuID0ge30sIGRpclJlZnMgPSB7fSwgZGlyQ29udGVudFJlZnMgPSB7fVxuXG4gICAgY29uc3QgbGFuZ0RpciA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgICRxLmxhbmcucnRsID09PSB0cnVlXG4gICAgICAgID8geyBsZWZ0OiAncmlnaHQnLCByaWdodDogJ2xlZnQnIH1cbiAgICAgICAgOiB7IGxlZnQ6ICdsZWZ0JywgcmlnaHQ6ICdyaWdodCcgfVxuICAgICkpXG5cbiAgICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICdxLXNsaWRlLWl0ZW0gcS1pdGVtLXR5cGUgb3ZlcmZsb3ctaGlkZGVuJ1xuICAgICAgKyAoaXNEYXJrLnZhbHVlID09PSB0cnVlID8gJyBxLXNsaWRlLWl0ZW0tLWRhcmsgcS1kYXJrJyA6ICcnKVxuICAgIClcblxuICAgIGZ1bmN0aW9uIHJlc2V0ICgpIHtcbiAgICAgIGNvbnRlbnRSZWYudmFsdWUuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZSgwLDApJ1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVtaXRTbGlkZSAoc2lkZSwgcmF0aW8sIGlzUmVzZXQpIHtcbiAgICAgIHByb3BzLm9uU2xpZGUgIT09IHZvaWQgMCAmJiBlbWl0KCdzbGlkZScsIHsgc2lkZSwgcmF0aW8sIGlzUmVzZXQgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblBhbiAoZXZ0KSB7XG4gICAgICBjb25zdCBub2RlID0gY29udGVudFJlZi52YWx1ZVxuXG4gICAgICBpZiAoZXZ0LmlzRmlyc3QpIHtcbiAgICAgICAgcGFuID0ge1xuICAgICAgICAgIGRpcjogbnVsbCxcbiAgICAgICAgICBzaXplOiB7IGxlZnQ6IDAsIHJpZ2h0OiAwLCB0b3A6IDAsIGJvdHRvbTogMCB9LFxuICAgICAgICAgIHNjYWxlOiAwXG4gICAgICAgIH1cblxuICAgICAgICBub2RlLmNsYXNzTGlzdC5hZGQoJ25vLXRyYW5zaXRpb24nKVxuXG4gICAgICAgIHNsb3RzRGVmLmZvckVhY2goc2xvdE5hbWUgPT4ge1xuICAgICAgICAgIGlmIChzbG90c1sgc2xvdE5hbWVbIDAgXSBdICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgIGNvbnN0IG5vZGUgPSBkaXJDb250ZW50UmVmc1sgc2xvdE5hbWVbIDAgXSBdXG4gICAgICAgICAgICBub2RlLnN0eWxlLnRyYW5zZm9ybSA9ICdzY2FsZSgxKSdcbiAgICAgICAgICAgIHBhbi5zaXplWyBzbG90TmFtZVsgMCBdIF0gPSBub2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpWyBzbG90TmFtZVsgMyBdIF1cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgcGFuLmF4aXMgPSAoZXZ0LmRpcmVjdGlvbiA9PT0gJ3VwJyB8fCBldnQuZGlyZWN0aW9uID09PSAnZG93bicpXG4gICAgICAgICAgPyAnWSdcbiAgICAgICAgICA6ICdYJ1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoZXZ0LmlzRmluYWwpIHtcbiAgICAgICAgbm9kZS5jbGFzc0xpc3QucmVtb3ZlKCduby10cmFuc2l0aW9uJylcblxuICAgICAgICBpZiAocGFuLnNjYWxlID09PSAxKSB7XG4gICAgICAgICAgbm9kZS5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlJHsgcGFuLmF4aXMgfSgkeyBwYW4uZGlyICogMTAwIH0lKWBcblxuICAgICAgICAgIHRpbWVyICE9PSBudWxsICYmIGNsZWFyVGltZW91dCh0aW1lcilcbiAgICAgICAgICB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGltZXIgPSBudWxsXG4gICAgICAgICAgICBlbWl0KHBhbi5zaG93aW5nLCB7IHJlc2V0IH0pXG4gICAgICAgICAgICBlbWl0KCdhY3Rpb24nLCB7IHNpZGU6IHBhbi5zaG93aW5nLCByZXNldCB9KVxuICAgICAgICAgIH0sIDIzMClcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBub2RlLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUoMCwwKSdcbiAgICAgICAgICBlbWl0U2xpZGUocGFuLnNob3dpbmcsIDAsIHRydWUpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBldnQuZGlyZWN0aW9uID0gcGFuLmF4aXMgPT09ICdYJ1xuICAgICAgICAgID8gZXZ0Lm9mZnNldC54IDwgMCA/ICdsZWZ0JyA6ICdyaWdodCdcbiAgICAgICAgICA6IGV2dC5vZmZzZXQueSA8IDAgPyAndXAnIDogJ2Rvd24nXG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgKHNsb3RzLmxlZnQgPT09IHZvaWQgMCAmJiBldnQuZGlyZWN0aW9uID09PSBsYW5nRGlyLnZhbHVlLnJpZ2h0KVxuICAgICAgICB8fCAoc2xvdHMucmlnaHQgPT09IHZvaWQgMCAmJiBldnQuZGlyZWN0aW9uID09PSBsYW5nRGlyLnZhbHVlLmxlZnQpXG4gICAgICAgIHx8IChzbG90cy50b3AgPT09IHZvaWQgMCAmJiBldnQuZGlyZWN0aW9uID09PSAnZG93bicpXG4gICAgICAgIHx8IChzbG90cy5ib3R0b20gPT09IHZvaWQgMCAmJiBldnQuZGlyZWN0aW9uID09PSAndXAnKVxuICAgICAgKSB7XG4gICAgICAgIG5vZGUuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZSgwLDApJ1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgbGV0IHNob3dpbmcsIGRpciwgZGlzdFxuXG4gICAgICBpZiAocGFuLmF4aXMgPT09ICdYJykge1xuICAgICAgICBkaXIgPSBldnQuZGlyZWN0aW9uID09PSAnbGVmdCcgPyAtMSA6IDFcbiAgICAgICAgc2hvd2luZyA9IGRpciA9PT0gMSA/IGxhbmdEaXIudmFsdWUubGVmdCA6IGxhbmdEaXIudmFsdWUucmlnaHRcbiAgICAgICAgZGlzdCA9IGV2dC5kaXN0YW5jZS54XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgZGlyID0gZXZ0LmRpcmVjdGlvbiA9PT0gJ3VwJyA/IC0yIDogMlxuICAgICAgICBzaG93aW5nID0gZGlyID09PSAyID8gJ3RvcCcgOiAnYm90dG9tJ1xuICAgICAgICBkaXN0ID0gZXZ0LmRpc3RhbmNlLnlcbiAgICAgIH1cblxuICAgICAgaWYgKHBhbi5kaXIgIT09IG51bGwgJiYgTWF0aC5hYnMoZGlyKSAhPT0gTWF0aC5hYnMocGFuLmRpcikpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmIChwYW4uZGlyICE9PSBkaXIpIHtcbiAgICAgICAgWyAnbGVmdCcsICdyaWdodCcsICd0b3AnLCAnYm90dG9tJyBdLmZvckVhY2goZCA9PiB7XG4gICAgICAgICAgaWYgKGRpclJlZnNbIGQgXSkge1xuICAgICAgICAgICAgZGlyUmVmc1sgZCBdLnN0eWxlLnZpc2liaWxpdHkgPSBzaG93aW5nID09PSBkXG4gICAgICAgICAgICAgID8gJ3Zpc2libGUnXG4gICAgICAgICAgICAgIDogJ2hpZGRlbidcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIHBhbi5zaG93aW5nID0gc2hvd2luZ1xuICAgICAgICBwYW4uZGlyID0gZGlyXG4gICAgICB9XG5cbiAgICAgIHBhbi5zY2FsZSA9IE1hdGgubWF4KDAsIE1hdGgubWluKDEsIChkaXN0IC0gNDApIC8gcGFuLnNpemVbIHNob3dpbmcgXSkpXG5cbiAgICAgIG5vZGUuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZSR7IHBhbi5heGlzIH0oJHsgZGlzdCAqIGRpciAvIE1hdGguYWJzKGRpcikgfXB4KWBcbiAgICAgIGRpckNvbnRlbnRSZWZzWyBzaG93aW5nIF0uc3R5bGUudHJhbnNmb3JtID0gYHNjYWxlKCR7IHBhbi5zY2FsZSB9KWBcblxuICAgICAgZW1pdFNsaWRlKHNob3dpbmcsIHBhbi5zY2FsZSwgZmFsc2UpXG4gICAgfVxuXG4gICAgb25CZWZvcmVVcGRhdGUoKCkgPT4ge1xuICAgICAgZGlyUmVmcyA9IHt9XG4gICAgICBkaXJDb250ZW50UmVmcyA9IHt9XG4gICAgfSlcblxuICAgIG9uQmVmb3JlVW5tb3VudCgoKSA9PiB7XG4gICAgICB0aW1lciAhPT0gbnVsbCAmJiBjbGVhclRpbWVvdXQodGltZXIpXG4gICAgfSlcblxuICAgIC8vIGV4cG9zZSBwdWJsaWMgbWV0aG9kc1xuICAgIE9iamVjdC5hc3NpZ24ocHJveHksIHsgcmVzZXQgfSlcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjb25zdFxuICAgICAgICBjb250ZW50ID0gW10sXG4gICAgICAgIHNsb3RzTGlzdCA9IHtcbiAgICAgICAgICBsZWZ0OiBzbG90c1sgbGFuZ0Rpci52YWx1ZS5yaWdodCBdICE9PSB2b2lkIDAsXG4gICAgICAgICAgcmlnaHQ6IHNsb3RzWyBsYW5nRGlyLnZhbHVlLmxlZnQgXSAhPT0gdm9pZCAwLFxuICAgICAgICAgIHVwOiBzbG90cy5ib3R0b20gIT09IHZvaWQgMCxcbiAgICAgICAgICBkb3duOiBzbG90cy50b3AgIT09IHZvaWQgMFxuICAgICAgICB9LFxuICAgICAgICBkaXJzID0gT2JqZWN0LmtleXMoc2xvdHNMaXN0KS5maWx0ZXIoa2V5ID0+IHNsb3RzTGlzdFsga2V5IF0gPT09IHRydWUpXG5cbiAgICAgIHNsb3RzRGVmLmZvckVhY2goc2xvdE5hbWUgPT4ge1xuICAgICAgICBjb25zdCBkaXIgPSBzbG90TmFtZVsgMCBdXG5cbiAgICAgICAgaWYgKHNsb3RzWyBkaXIgXSAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgY29udGVudC5wdXNoKFxuICAgICAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgICAgICByZWY6IGVsID0+IHsgZGlyUmVmc1sgZGlyIF0gPSBlbCB9LFxuICAgICAgICAgICAgICBjbGFzczogYHEtc2xpZGUtaXRlbV9fJHsgZGlyIH0gYWJzb2x1dGUtZnVsbCByb3cgbm8td3JhcCBpdGVtcy0keyBzbG90TmFtZVsgMSBdIH0ganVzdGlmeS0keyBzbG90TmFtZVsgMiBdIH1gXG4gICAgICAgICAgICAgICAgKyAocHJvcHNbIGRpciArICdDb2xvcicgXSAhPT0gdm9pZCAwID8gYCBiZy0keyBwcm9wc1sgZGlyICsgJ0NvbG9yJyBdIH1gIDogJycpXG4gICAgICAgICAgICB9LCBbXG4gICAgICAgICAgICAgIGgoJ2RpdicsIHsgcmVmOiBlbCA9PiB7IGRpckNvbnRlbnRSZWZzWyBkaXIgXSA9IGVsIH0gfSwgc2xvdHNbIGRpciBdKCkpXG4gICAgICAgICAgICBdKVxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgICAgY29uc3Qgbm9kZSA9IGgoJ2RpdicsIHtcbiAgICAgICAga2V5OiBgJHsgZGlycy5sZW5ndGggPT09IDAgPyAnb25seS0nIDogJycgfSBjb250ZW50YCxcbiAgICAgICAgcmVmOiBjb250ZW50UmVmLFxuICAgICAgICBjbGFzczogJ3Etc2xpZGUtaXRlbV9fY29udGVudCdcbiAgICAgIH0sIGhTbG90KHNsb3RzLmRlZmF1bHQpKVxuXG4gICAgICBpZiAoZGlycy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgY29udGVudC5wdXNoKG5vZGUpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgY29udGVudC5wdXNoKFxuICAgICAgICAgIHdpdGhEaXJlY3RpdmVzKG5vZGUsIGdldENhY2hlV2l0aEZuKCdkaXIjJyArIGRpcnMuam9pbignJyksICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG1vZGlmaWVycyA9IHtcbiAgICAgICAgICAgICAgcHJldmVudDogdHJ1ZSxcbiAgICAgICAgICAgICAgc3RvcDogdHJ1ZSxcbiAgICAgICAgICAgICAgbW91c2U6IHRydWVcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZGlycy5mb3JFYWNoKGRpciA9PiB7XG4gICAgICAgICAgICAgIG1vZGlmaWVyc1sgZGlyIF0gPSB0cnVlXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICByZXR1cm4gWyBbXG4gICAgICAgICAgICAgIFRvdWNoUGFuLFxuICAgICAgICAgICAgICBvblBhbixcbiAgICAgICAgICAgICAgdm9pZCAwLFxuICAgICAgICAgICAgICBtb2RpZmllcnNcbiAgICAgICAgICAgIF0gXVxuICAgICAgICAgIH0pKVxuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBoKCdkaXYnLCB7IGNsYXNzOiBjbGFzc2VzLnZhbHVlIH0sIGNvbnRlbnQpXG4gICAgfVxuICB9XG59KVxuIl0sIm5hbWVzIjpbIm5vZGUiXSwibWFwcGluZ3MiOiI7Ozs7QUFVQSxNQUFNLFdBQVc7QUFBQSxFQUNmLENBQUUsUUFBUSxVQUFVLFNBQVMsT0FBUztBQUFBLEVBQ3RDLENBQUUsU0FBUyxVQUFVLE9BQU8sT0FBUztBQUFBLEVBQ3JDLENBQUUsT0FBTyxTQUFTLFVBQVUsUUFBVTtBQUFBLEVBQ3RDLENBQUUsVUFBVSxPQUFPLFVBQVUsUUFBVTtBQUN6QztBQUVBLElBQUEsYUFBZSxnQkFBZ0I7QUFBQSxFQUM3QixNQUFNO0FBQUEsRUFFTixPQUFPO0FBQUEsSUFDTCxHQUFHO0FBQUEsSUFFSCxXQUFXO0FBQUEsSUFDWCxZQUFZO0FBQUEsSUFDWixVQUFVO0FBQUEsSUFDVixhQUFhO0FBQUEsSUFFYixTQUFTO0FBQUEsRUFDVjtBQUFBLEVBRUQsT0FBTyxDQUFFLFVBQVUsT0FBTyxTQUFTLFVBQVUsTUFBUTtBQUFBLEVBRXJELE1BQU8sT0FBTyxFQUFFLE9BQU8sS0FBSSxHQUFJO0FBQzdCLFVBQU0sRUFBRSxNQUFPLElBQUcsbUJBQW9CO0FBQ3RDLFVBQU0sRUFBRSxHQUFFLElBQUs7QUFFZixVQUFNLFNBQVMsUUFBUSxPQUFPLEVBQUU7QUFDaEMsVUFBTSxFQUFFLGVBQWdCLElBQUcsU0FBVTtBQUVyQyxVQUFNLGFBQWEsSUFBSSxJQUFJO0FBRTNCLFFBQUksUUFBUSxNQUFNLE1BQU0sQ0FBRSxHQUFFLFVBQVUsQ0FBQSxHQUFJLGlCQUFpQixDQUFFO0FBRTdELFVBQU0sVUFBVSxTQUFTLE1BQ3ZCLEdBQUcsS0FBSyxRQUFRLE9BQ1osRUFBRSxNQUFNLFNBQVMsT0FBTyxPQUFRLElBQ2hDLEVBQUUsTUFBTSxRQUFRLE9BQU8sUUFBUyxDQUNyQztBQUVELFVBQU0sVUFBVTtBQUFBLE1BQVMsTUFDdkIsOENBQ0csT0FBTyxVQUFVLE9BQU8sK0JBQStCO0FBQUEsSUFDM0Q7QUFFRCxhQUFTLFFBQVM7QUFDaEIsaUJBQVcsTUFBTSxNQUFNLFlBQVk7QUFBQSxJQUNwQztBQUVELGFBQVMsVUFBVyxNQUFNLE9BQU8sU0FBUztBQUN4QyxZQUFNLFlBQVksVUFBVSxLQUFLLFNBQVMsRUFBRSxNQUFNLE9BQU8sU0FBUztBQUFBLElBQ25FO0FBRUQsYUFBUyxNQUFPLEtBQUs7QUFDbkIsWUFBTSxPQUFPLFdBQVc7QUFFeEIsVUFBSSxJQUFJLFNBQVM7QUFDZixjQUFNO0FBQUEsVUFDSixLQUFLO0FBQUEsVUFDTCxNQUFNLEVBQUUsTUFBTSxHQUFHLE9BQU8sR0FBRyxLQUFLLEdBQUcsUUFBUSxFQUFHO0FBQUEsVUFDOUMsT0FBTztBQUFBLFFBQ1I7QUFFRCxhQUFLLFVBQVUsSUFBSSxlQUFlO0FBRWxDLGlCQUFTLFFBQVEsY0FBWTtBQUMzQixjQUFJLE1BQU8sU0FBVSxRQUFVLFFBQVE7QUFDckMsa0JBQU1BLFFBQU8sZUFBZ0IsU0FBVTtBQUN2QyxZQUFBQSxNQUFLLE1BQU0sWUFBWTtBQUN2QixnQkFBSSxLQUFNLFNBQVUsTUFBUUEsTUFBSyxzQkFBdUIsRUFBRSxTQUFVO0FBQUEsVUFDckU7QUFBQSxRQUNYLENBQVM7QUFFRCxZQUFJLE9BQVEsSUFBSSxjQUFjLFFBQVEsSUFBSSxjQUFjLFNBQ3BELE1BQ0E7QUFBQSxNQUNMLFdBQ1EsSUFBSSxTQUFTO0FBQ3BCLGFBQUssVUFBVSxPQUFPLGVBQWU7QUFFckMsWUFBSSxJQUFJLFVBQVUsR0FBRztBQUNuQixlQUFLLE1BQU0sWUFBWSxZQUFhLElBQUksUUFBVSxJQUFJLE1BQU07QUFFNUQsb0JBQVUsUUFBUSxhQUFhLEtBQUs7QUFDcEMsa0JBQVEsV0FBVyxNQUFNO0FBQ3ZCLG9CQUFRO0FBQ1IsaUJBQUssSUFBSSxTQUFTLEVBQUUsTUFBSyxDQUFFO0FBQzNCLGlCQUFLLFVBQVUsRUFBRSxNQUFNLElBQUksU0FBUyxPQUFPO0FBQUEsVUFDNUMsR0FBRSxHQUFHO0FBQUEsUUFDUCxPQUNJO0FBQ0gsZUFBSyxNQUFNLFlBQVk7QUFDdkIsb0JBQVUsSUFBSSxTQUFTLEdBQUcsSUFBSTtBQUFBLFFBQy9CO0FBRUQ7QUFBQSxNQUNELE9BQ0k7QUFDSCxZQUFJLFlBQVksSUFBSSxTQUFTLE1BQ3pCLElBQUksT0FBTyxJQUFJLElBQUksU0FBUyxVQUM1QixJQUFJLE9BQU8sSUFBSSxJQUFJLE9BQU87QUFBQSxNQUMvQjtBQUVELFVBQ0csTUFBTSxTQUFTLFVBQVUsSUFBSSxjQUFjLFFBQVEsTUFBTSxTQUN0RCxNQUFNLFVBQVUsVUFBVSxJQUFJLGNBQWMsUUFBUSxNQUFNLFFBQzFELE1BQU0sUUFBUSxVQUFVLElBQUksY0FBYyxVQUMxQyxNQUFNLFdBQVcsVUFBVSxJQUFJLGNBQWMsTUFDakQ7QUFDQSxhQUFLLE1BQU0sWUFBWTtBQUN2QjtBQUFBLE1BQ0Q7QUFFRCxVQUFJLFNBQVMsS0FBSztBQUVsQixVQUFJLElBQUksU0FBUyxLQUFLO0FBQ3BCLGNBQU0sSUFBSSxjQUFjLFNBQVMsS0FBSztBQUN0QyxrQkFBVSxRQUFRLElBQUksUUFBUSxNQUFNLE9BQU8sUUFBUSxNQUFNO0FBQ3pELGVBQU8sSUFBSSxTQUFTO0FBQUEsTUFDckIsT0FDSTtBQUNILGNBQU0sSUFBSSxjQUFjLE9BQU8sS0FBSztBQUNwQyxrQkFBVSxRQUFRLElBQUksUUFBUTtBQUM5QixlQUFPLElBQUksU0FBUztBQUFBLE1BQ3JCO0FBRUQsVUFBSSxJQUFJLFFBQVEsUUFBUSxLQUFLLElBQUksR0FBRyxNQUFNLEtBQUssSUFBSSxJQUFJLEdBQUcsR0FBRztBQUMzRDtBQUFBLE1BQ0Q7QUFFRCxVQUFJLElBQUksUUFBUSxLQUFLO0FBQ25CLFNBQUUsUUFBUSxTQUFTLE9BQU8sUUFBVSxFQUFDLFFBQVEsT0FBSztBQUNoRCxjQUFJLFFBQVMsSUFBSztBQUNoQixvQkFBUyxHQUFJLE1BQU0sYUFBYSxZQUFZLElBQ3hDLFlBQ0E7QUFBQSxVQUNMO0FBQUEsUUFDWCxDQUFTO0FBQ0QsWUFBSSxVQUFVO0FBQ2QsWUFBSSxNQUFNO0FBQUEsTUFDWDtBQUVELFVBQUksUUFBUSxLQUFLLElBQUksR0FBRyxLQUFLLElBQUksSUFBSSxPQUFPLE1BQU0sSUFBSSxLQUFNLFFBQVMsQ0FBQztBQUV0RSxXQUFLLE1BQU0sWUFBWSxZQUFhLElBQUksUUFBVSxPQUFPLE1BQU0sS0FBSyxJQUFJLEdBQUc7QUFDM0UscUJBQWdCLFNBQVUsTUFBTSxZQUFZLFNBQVUsSUFBSTtBQUUxRCxnQkFBVSxTQUFTLElBQUksT0FBTyxLQUFLO0FBQUEsSUFDcEM7QUFFRCxtQkFBZSxNQUFNO0FBQ25CLGdCQUFVLENBQUU7QUFDWix1QkFBaUIsQ0FBRTtBQUFBLElBQ3pCLENBQUs7QUFFRCxvQkFBZ0IsTUFBTTtBQUNwQixnQkFBVSxRQUFRLGFBQWEsS0FBSztBQUFBLElBQzFDLENBQUs7QUFHRCxXQUFPLE9BQU8sT0FBTyxFQUFFLE1BQUssQ0FBRTtBQUU5QixXQUFPLE1BQU07QUFDWCxZQUNFLFVBQVUsQ0FBRSxHQUNaLFlBQVk7QUFBQSxRQUNWLE1BQU0sTUFBTyxRQUFRLE1BQU0sV0FBWTtBQUFBLFFBQ3ZDLE9BQU8sTUFBTyxRQUFRLE1BQU0sVUFBVztBQUFBLFFBQ3ZDLElBQUksTUFBTSxXQUFXO0FBQUEsUUFDckIsTUFBTSxNQUFNLFFBQVE7QUFBQSxNQUNyQixHQUNELE9BQU8sT0FBTyxLQUFLLFNBQVMsRUFBRSxPQUFPLFNBQU8sVUFBVyxTQUFVLElBQUk7QUFFdkUsZUFBUyxRQUFRLGNBQVk7QUFDM0IsY0FBTSxNQUFNLFNBQVU7QUFFdEIsWUFBSSxNQUFPLFNBQVUsUUFBUTtBQUMzQixrQkFBUTtBQUFBLFlBQ04sRUFBRSxPQUFPO0FBQUEsY0FDUCxLQUFLLFFBQU07QUFBRSx3QkFBUyxPQUFRO0FBQUEsY0FBSTtBQUFBLGNBQ2xDLE9BQU8saUJBQWtCLHVDQUF5QyxTQUFVLGNBQWlCLFNBQVUsUUFDbEcsTUFBTyxNQUFNLGFBQWMsU0FBUyxPQUFRLE1BQU8sTUFBTSxhQUFlO0FBQUEsWUFDM0YsR0FBZTtBQUFBLGNBQ0QsRUFBRSxPQUFPLEVBQUUsS0FBSyxRQUFNO0FBQUUsK0JBQWdCLE9BQVE7QUFBQSxjQUFFLEVBQUksR0FBRSxNQUFPLEtBQUssQ0FBRTtBQUFBLFlBQ3BGLENBQWE7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ1QsQ0FBTztBQUVELFlBQU0sT0FBTyxFQUFFLE9BQU87QUFBQSxRQUNwQixLQUFLLEdBQUksS0FBSyxXQUFXLElBQUksVUFBVTtBQUFBLFFBQ3ZDLEtBQUs7QUFBQSxRQUNMLE9BQU87QUFBQSxNQUNmLEdBQVMsTUFBTSxNQUFNLE9BQU8sQ0FBQztBQUV2QixVQUFJLEtBQUssV0FBVyxHQUFHO0FBQ3JCLGdCQUFRLEtBQUssSUFBSTtBQUFBLE1BQ2xCLE9BQ0k7QUFDSCxnQkFBUTtBQUFBLFVBQ04sZUFBZSxNQUFNLGVBQWUsU0FBUyxLQUFLLEtBQUssRUFBRSxHQUFHLE1BQU07QUFDaEUsa0JBQU0sWUFBWTtBQUFBLGNBQ2hCLFNBQVM7QUFBQSxjQUNULE1BQU07QUFBQSxjQUNOLE9BQU87QUFBQSxZQUNSO0FBRUQsaUJBQUssUUFBUSxTQUFPO0FBQ2xCLHdCQUFXLE9BQVE7QUFBQSxZQUNqQyxDQUFhO0FBRUQsbUJBQU8sQ0FBRTtBQUFBLGNBQ1A7QUFBQSxjQUNBO0FBQUEsY0FDQTtBQUFBLGNBQ0E7QUFBQSxZQUNkLENBQWU7QUFBQSxVQUNmLENBQVcsQ0FBQztBQUFBLFFBQ0g7QUFBQSxNQUNGO0FBRUQsYUFBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLFFBQVEsTUFBTyxHQUFFLE9BQU87QUFBQSxJQUNsRDtBQUFBLEVBQ0Y7QUFDSCxDQUFDOzsifQ==
