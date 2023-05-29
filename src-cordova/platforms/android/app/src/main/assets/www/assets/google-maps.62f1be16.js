import { _ as _export_sfc, o as openBlock, c as createElementBlock, r as renderSlot, a as createBaseVNode, n as normalizeStyle, d as normalizeClass, m as mergeProps, t as toHandlers, e as createApp, b as boot } from "./index.0ce84b9b.js";
var lazy = (fn) => {
  let called = false;
  let result;
  return () => {
    if (!called) {
      called = true;
      result = fn();
    }
    return result;
  };
};
class Env {
  static isServer() {
    return typeof document === "undefined";
  }
}
function createMapScript(options) {
  const googleMapScript = document.createElement("SCRIPT");
  if (typeof options !== "object") {
    throw new Error("options should  be an object");
  }
  if (Array.prototype.isPrototypeOf(options.libraries)) {
    options.libraries = options.libraries.join(",");
  }
  options["callback"] = "vueGoogleMapsInit";
  let baseUrl = "https://maps.googleapis.com/maps/api/js?";
  let url = baseUrl + Object.keys(options).map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(options[key])).join("&");
  googleMapScript.setAttribute("src", url);
  googleMapScript.setAttribute("async", "");
  googleMapScript.setAttribute("defer", "");
  return googleMapScript;
}
let isApiSetUp = false;
function loadGMapApi(options) {
  if (Env.isServer()) {
    return;
  }
  if (!isApiSetUp) {
    isApiSetUp = true;
    const googleMapScript = createMapScript(options);
    document.head.appendChild(googleMapScript);
  } else {
    throw new Error("You already started the loading of google maps");
  }
}
var bindEvents = (vueInst, googleMapsInst, events2) => {
  for (let eventName of events2) {
    const propName = `on${eventName.charAt(0).toUpperCase()}${eventName.slice(1)}`.replace(/[-_]+(.)?/g, (_, c) => c ? c.toUpperCase() : "");
    if (vueInst.$props[propName] || vueInst.$attrs[propName]) {
      googleMapsInst.addListener(eventName, (ev) => {
        vueInst.$emit(eventName, ev);
      });
    } else if (vueInst.$gmapOptions.autobindAllEvents || vueInst.$attrs[eventName]) {
      googleMapsInst.addListener(eventName, (ev) => {
        vueInst.$emit(eventName, ev);
      });
    }
  }
};
function WatchPrimitiveProperties(vueInst, propertiesToTrack, handler, immediate = false) {
  let isHandled = false;
  function requestHandle() {
    if (!isHandled) {
      isHandled = true;
      vueInst.$nextTick(() => {
        isHandled = false;
        handler();
      });
    }
  }
  for (let prop of propertiesToTrack) {
    vueInst.$watch(prop, requestHandle, { immediate });
  }
}
class Str {
  static capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
function getPropsValues(vueInst, props2) {
  return Object.keys(props2).reduce((acc, prop) => {
    if (vueInst[prop] !== void 0) {
      acc[prop] = vueInst[prop];
    }
    return acc;
  }, {});
}
function bindProps(vueInst, googleMapsInst, props2) {
  for (let attribute in props2) {
    let { twoWay, type, trackProperties, noBind } = props2[attribute];
    if (noBind)
      continue;
    const setMethodName = "set" + Str.capitalizeFirstLetter(attribute);
    const getMethodName = "get" + Str.capitalizeFirstLetter(attribute);
    const eventName = attribute.toLowerCase() + "_changed";
    const initialValue = vueInst[attribute];
    if (typeof googleMapsInst[setMethodName] === "undefined") {
      throw new Error(
        `${setMethodName} is not a method of (the Maps object corresponding to) ${vueInst.$options._componentTag}`
      );
    }
    if (type !== Object || !trackProperties) {
      vueInst.$watch(
        attribute,
        () => {
          const attributeValue = vueInst[attribute];
          googleMapsInst[setMethodName](attributeValue);
        },
        {
          immediate: typeof initialValue !== "undefined",
          deep: type === Object
        }
      );
    } else {
      WatchPrimitiveProperties(
        vueInst,
        trackProperties.map((prop) => `${attribute}.${prop}`),
        () => {
          googleMapsInst[setMethodName](vueInst[attribute]);
        },
        vueInst[attribute] !== void 0
      );
    }
    if (twoWay && (vueInst.$gmapOptions.autobindAllEvents || vueInst.$attrs[eventName])) {
      googleMapsInst.addListener(eventName, () => {
        vueInst.$emit(eventName, googleMapsInst[getMethodName]());
      });
    }
  }
}
var MapElementMixin = {
  inject: {
    $mapPromise: { default: "abcdef" }
  },
  provide() {
    this.$mapPromise.then((map) => {
      this.$map = map;
    });
    return {};
  }
};
function buildComponent(options) {
  const {
    mappedProps: mappedProps2,
    name,
    ctr,
    ctrArgs,
    events: events2,
    beforeCreate,
    afterCreate,
    props: props2,
    ...rest
  } = options;
  const promiseName = `$${name}Promise`;
  const instanceName = `$${name}Object`;
  assert(!(rest.props instanceof Array), "`props` should be an object, not Array");
  return {
    ...typeof GENERATE_DOC !== "undefined" ? { $vgmOptions: options } : {},
    mixins: [MapElementMixin],
    props: {
      ...props2,
      ...mappedPropsToVueProps(mappedProps2)
    },
    render() {
      return "";
    },
    provide() {
      const promise = this.$mapPromise.then((map) => {
        this.$map = map;
        const options2 = {
          ...this.options,
          map,
          ...getPropsValues(this, mappedProps2)
        };
        delete options2.options;
        if (beforeCreate) {
          const result = beforeCreate.bind(this)(options2);
          if (result instanceof Promise) {
            return result.then(() => ({ options: options2 }));
          }
        }
        return { options: options2 };
      }).then(({ options: options2 }) => {
        const ConstructorObject = ctr();
        this[instanceName] = ctrArgs ? new (Function.prototype.bind.call(
          ConstructorObject,
          null,
          ...ctrArgs(options2, getPropsValues(this, props2 || {}))
        ))() : new ConstructorObject(options2);
        bindProps(this, this[instanceName], mappedProps2);
        bindEvents(this, this[instanceName], events2);
        if (afterCreate) {
          afterCreate.bind(this)(this[instanceName]);
        }
        return this[instanceName];
      });
      this[promiseName] = promise;
      return { [promiseName]: promise };
    },
    unmounted() {
      if (this[instanceName] && this[instanceName].setMap) {
        this[instanceName].setMap(null);
      }
    },
    ...rest
  };
}
function assert(v, message) {
  if (!v)
    throw new Error(message);
}
function mappedPropsToVueProps(mappedProps2) {
  return Object.entries(mappedProps2).map(([key, prop]) => {
    const value = {};
    if ("type" in prop)
      value.type = prop.type;
    if ("default" in prop)
      value.default = prop.default;
    if ("required" in prop)
      value.required = prop.required;
    return [key, value];
  }).reduce((acc, [key, val]) => {
    acc[key] = val;
    return acc;
  }, {});
}
const props$9 = {
  draggable: {
    type: Boolean
  },
  editable: {
    type: Boolean
  },
  options: {
    twoWay: false,
    type: Object
  },
  path: {
    type: Array,
    twoWay: true
  }
};
const events$8 = [
  "click",
  "dblclick",
  "drag",
  "dragend",
  "dragstart",
  "mousedown",
  "mousemove",
  "mouseout",
  "mouseover",
  "mouseup",
  "rightclick"
];
var Polyline = buildComponent({
  mappedProps: props$9,
  props: {
    deepWatch: {
      type: Boolean,
      default: false
    }
  },
  events: events$8,
  name: "polyline",
  ctr: () => google.maps.Polyline,
  afterCreate() {
    let clearEvents = () => {
    };
    this.$watch(
      "path",
      (path) => {
        if (path) {
          clearEvents();
          this.$polylineObject.setPath(path);
          const mvcPath = this.$polylineObject.getPath();
          const eventListeners = [];
          const updatePaths = () => {
            this.$emit("path_changed", this.$polylineObject.getPath());
          };
          eventListeners.push([mvcPath, mvcPath.addListener("insert_at", updatePaths)]);
          eventListeners.push([mvcPath, mvcPath.addListener("remove_at", updatePaths)]);
          eventListeners.push([mvcPath, mvcPath.addListener("set_at", updatePaths)]);
          clearEvents = () => {
            eventListeners.map(([obj, listenerHandle]) => google.maps.event.removeListener(listenerHandle));
          };
        }
      },
      {
        deep: this.deepWatch,
        immediate: true
      }
    );
  }
});
const props$8 = {
  draggable: {
    type: Boolean
  },
  editable: {
    type: Boolean
  },
  options: {
    type: Object
  },
  path: {
    type: Array,
    twoWay: true,
    noBind: true
  },
  paths: {
    type: Array,
    twoWay: true,
    noBind: true
  }
};
const events$7 = [
  "click",
  "dblclick",
  "drag",
  "dragend",
  "dragstart",
  "mousedown",
  "mousemove",
  "mouseout",
  "mouseover",
  "mouseup",
  "rightclick"
];
var Polygon = buildComponent({
  props: {
    deepWatch: {
      type: Boolean,
      default: false
    }
  },
  events: events$7,
  mappedProps: props$8,
  name: "polygon",
  ctr: () => google.maps.Polygon,
  beforeCreate(options) {
    if (!options.path)
      delete options.path;
    if (!options.paths)
      delete options.paths;
  },
  afterCreate(inst) {
    let clearEvents = () => {
    };
    this.$watch(
      "paths",
      (paths) => {
        if (paths) {
          clearEvents();
          inst.setPaths(paths);
          const updatePaths = () => {
            this.$emit("paths_changed", inst.getPaths());
          };
          const eventListeners = [];
          const mvcArray = inst.getPaths();
          for (let i = 0; i < mvcArray.getLength(); i++) {
            let mvcPath = mvcArray.getAt(i);
            eventListeners.push([mvcPath, mvcPath.addListener("insert_at", updatePaths)]);
            eventListeners.push([mvcPath, mvcPath.addListener("remove_at", updatePaths)]);
            eventListeners.push([mvcPath, mvcPath.addListener("set_at", updatePaths)]);
          }
          eventListeners.push([mvcArray, mvcArray.addListener("insert_at", updatePaths)]);
          eventListeners.push([mvcArray, mvcArray.addListener("remove_at", updatePaths)]);
          eventListeners.push([mvcArray, mvcArray.addListener("set_at", updatePaths)]);
          clearEvents = () => {
            eventListeners.map(([obj, listenerHandle]) => google.maps.event.removeListener(listenerHandle));
          };
        }
      },
      {
        deep: this.deepWatch,
        immediate: true
      }
    );
    this.$watch(
      "path",
      (path) => {
        if (path) {
          clearEvents();
          inst.setPaths(path);
          const mvcPath = inst.getPath();
          const eventListeners = [];
          const updatePaths = () => {
            this.$emit("path_changed", inst.getPath());
          };
          eventListeners.push([mvcPath, mvcPath.addListener("insert_at", updatePaths)]);
          eventListeners.push([mvcPath, mvcPath.addListener("remove_at", updatePaths)]);
          eventListeners.push([mvcPath, mvcPath.addListener("set_at", updatePaths)]);
          clearEvents = () => {
            eventListeners.map(([obj, listenerHandle]) => google.maps.event.removeListener(listenerHandle));
          };
        }
      },
      {
        deep: this.deepWatch,
        immediate: true
      }
    );
  }
});
const props$7 = {
  center: {
    type: Object,
    twoWay: true,
    required: true
  },
  radius: {
    type: Number,
    twoWay: true
  },
  draggable: {
    type: Boolean,
    default: false
  },
  editable: {
    type: Boolean,
    default: false
  },
  options: {
    type: Object,
    twoWay: false
  }
};
const events$6 = [
  "click",
  "dblclick",
  "drag",
  "dragend",
  "dragstart",
  "mousedown",
  "mousemove",
  "mouseout",
  "mouseover",
  "mouseup",
  "rightclick"
];
var Circle = buildComponent({
  mappedProps: props$7,
  name: "circle",
  ctr: () => google.maps.Circle,
  events: events$6
});
const props$6 = {
  bounds: {
    type: Object,
    twoWay: true
  },
  draggable: {
    type: Boolean,
    default: false
  },
  editable: {
    type: Boolean,
    default: false
  },
  options: {
    type: Object,
    twoWay: false
  }
};
const events$5 = [
  "click",
  "dblclick",
  "drag",
  "dragend",
  "dragstart",
  "mousedown",
  "mousemove",
  "mouseout",
  "mouseover",
  "mouseup",
  "rightclick"
];
var Rectangle = buildComponent({
  mappedProps: props$6,
  name: "rectangle",
  ctr: () => google.maps.Rectangle,
  events: events$5
});
const props$5 = {
  animation: {
    twoWay: true,
    type: Number
  },
  attribution: {
    type: Object
  },
  clickable: {
    type: Boolean,
    twoWay: true,
    default: true
  },
  cursor: {
    type: String,
    twoWay: true
  },
  draggable: {
    type: Boolean,
    twoWay: true,
    default: false
  },
  icon: {
    twoWay: true
  },
  label: {},
  opacity: {
    type: Number,
    default: 1
  },
  options: {
    type: Object
  },
  place: {
    type: Object
  },
  position: {
    type: Object,
    twoWay: true
  },
  shape: {
    type: Object,
    twoWay: true
  },
  title: {
    type: String,
    twoWay: true
  },
  zIndex: {
    type: Number,
    twoWay: true
  },
  visible: {
    twoWay: true,
    default: true
  }
};
const events$4 = [
  "click",
  "rightclick",
  "dblclick",
  "drag",
  "dragstart",
  "dragend",
  "mouseup",
  "mousedown",
  "mouseover",
  "mouseout"
];
const _sfc_main$4 = buildComponent({
  mappedProps: props$5,
  events: events$4,
  name: "marker",
  ctr: () => google.maps.Marker,
  inject: {
    $clusterPromise: {
      default: null
    }
  },
  emits: events$4,
  unmounted() {
    if (!this.$markerObject) {
      return;
    }
    if (this.$clusterObject) {
      this.$clusterObject.removeMarker(this.$markerObject, true);
    } else {
      this.$markerObject.setMap(null);
    }
  },
  beforeCreate(options) {
    if (this.$clusterPromise) {
      options.map = null;
    }
    return this.$clusterPromise;
  },
  afterCreate(inst) {
    events$4.forEach((event) => {
      inst.addListener(event, (payload) => {
        this.$emit(event, payload);
      });
    });
    if (this.$clusterPromise) {
      this.$clusterPromise.then((co) => {
        this.$clusterObject = co;
        co.addMarker(inst);
      });
    }
  }
});
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    onClick: _cache[0] || (_cache[0] = () => {
      _ctx.console.log("sdfsd");
    })
  }, [
    renderSlot(_ctx.$slots, "default")
  ]);
}
var Marker = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4], ["__file", "marker.vue"]]);
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var extendStatics = function(d, b) {
  extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p in b2)
      if (b2.hasOwnProperty(p))
        d2[p] = b2[p];
  };
  return extendStatics(d, b);
};
function __extends(d, b) {
  extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function() {
  __assign = Object.assign || function __assign2(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
function extend(type1, type2) {
  for (var property in type2.prototype) {
    type1.prototype[property] = type2.prototype[property];
  }
}
var OverlayViewSafe = function() {
  function OverlayViewSafe2() {
    extend(OverlayViewSafe2, google.maps.OverlayView);
  }
  return OverlayViewSafe2;
}();
function toCssText(styles) {
  return Object.keys(styles).reduce(function(acc, key) {
    if (styles[key]) {
      acc.push(key + ":" + styles[key]);
    }
    return acc;
  }, []).join(";");
}
function coercePixels(pixels) {
  return pixels ? pixels + "px" : void 0;
}
var ClusterIcon = function(_super) {
  __extends(ClusterIcon2, _super);
  function ClusterIcon2(cluster_, styles_) {
    var _this = _super.call(this) || this;
    _this.cluster_ = cluster_;
    _this.styles_ = styles_;
    _this.center_ = null;
    _this.div_ = null;
    _this.sums_ = null;
    _this.visible_ = false;
    _this.style = null;
    _this.setMap(cluster_.getMap());
    return _this;
  }
  ClusterIcon2.prototype.onAdd = function() {
    var _this = this;
    var cMouseDownInCluster;
    var cDraggingMapByCluster;
    var mc = this.cluster_.getMarkerClusterer();
    var _a = google.maps.version.split("."), major = _a[0], minor = _a[1];
    var gmVersion = parseInt(major, 10) * 100 + parseInt(minor, 10);
    this.div_ = document.createElement("div");
    if (this.visible_) {
      this.show();
    }
    this.getPanes().overlayMouseTarget.appendChild(this.div_);
    this.boundsChangedListener_ = google.maps.event.addListener(this.getMap(), "bounds_changed", function() {
      cDraggingMapByCluster = cMouseDownInCluster;
    });
    google.maps.event.addDomListener(this.div_, "mousedown", function() {
      cMouseDownInCluster = true;
      cDraggingMapByCluster = false;
    });
    google.maps.event.addDomListener(this.div_, "contextmenu", function() {
      google.maps.event.trigger(mc, "contextmenu", _this.cluster_);
    });
    if (gmVersion >= 332) {
      google.maps.event.addDomListener(this.div_, "touchstart", function(e) {
        e.stopPropagation();
      });
    }
    google.maps.event.addDomListener(this.div_, "click", function(e) {
      cMouseDownInCluster = false;
      if (!cDraggingMapByCluster) {
        google.maps.event.trigger(mc, "click", _this.cluster_);
        google.maps.event.trigger(mc, "clusterclick", _this.cluster_);
        if (mc.getZoomOnClick()) {
          var mz_1 = mc.getMaxZoom();
          var theBounds_1 = _this.cluster_.getBounds();
          mc.getMap().fitBounds(theBounds_1);
          setTimeout(function() {
            mc.getMap().fitBounds(theBounds_1);
            if (mz_1 !== null && mc.getMap().getZoom() > mz_1) {
              mc.getMap().setZoom(mz_1 + 1);
            }
          }, 100);
        }
        e.cancelBubble = true;
        if (e.stopPropagation) {
          e.stopPropagation();
        }
      }
    });
    google.maps.event.addDomListener(this.div_, "mouseover", function() {
      google.maps.event.trigger(mc, "mouseover", _this.cluster_);
    });
    google.maps.event.addDomListener(this.div_, "mouseout", function() {
      google.maps.event.trigger(mc, "mouseout", _this.cluster_);
    });
  };
  ClusterIcon2.prototype.onRemove = function() {
    if (this.div_ && this.div_.parentNode) {
      this.hide();
      google.maps.event.removeListener(this.boundsChangedListener_);
      google.maps.event.clearInstanceListeners(this.div_);
      this.div_.parentNode.removeChild(this.div_);
      this.div_ = null;
    }
  };
  ClusterIcon2.prototype.draw = function() {
    if (this.visible_) {
      var pos = this.getPosFromLatLng_(this.center_);
      this.div_.style.top = pos.y + "px";
      this.div_.style.left = pos.x + "px";
    }
  };
  ClusterIcon2.prototype.hide = function() {
    if (this.div_) {
      this.div_.style.display = "none";
    }
    this.visible_ = false;
  };
  ClusterIcon2.prototype.show = function() {
    if (this.div_) {
      this.div_.className = this.className_;
      this.div_.style.cssText = this.createCss_(this.getPosFromLatLng_(this.center_));
      this.div_.innerHTML = (this.style.url ? this.getImageElementHtml() : "") + this.getLabelDivHtml();
      if (typeof this.sums_.title === "undefined" || this.sums_.title === "") {
        this.div_.title = this.cluster_.getMarkerClusterer().getTitle();
      } else {
        this.div_.title = this.sums_.title;
      }
      this.div_.style.display = "";
    }
    this.visible_ = true;
  };
  ClusterIcon2.prototype.getLabelDivHtml = function() {
    var mc = this.cluster_.getMarkerClusterer();
    var ariaLabel = mc.ariaLabelFn(this.sums_.text);
    var divStyle = {
      position: "absolute",
      top: coercePixels(this.anchorText_[0]),
      left: coercePixels(this.anchorText_[1]),
      color: this.style.textColor,
      "font-size": coercePixels(this.style.textSize),
      "font-family": this.style.fontFamily,
      "font-weight": this.style.fontWeight,
      "font-style": this.style.fontStyle,
      "text-decoration": this.style.textDecoration,
      "text-align": "center",
      width: coercePixels(this.style.width),
      "line-height": coercePixels(this.style.textLineHeight)
    };
    return '\n<div aria-label="'.concat(ariaLabel, '" style="').concat(toCssText(divStyle), '" tabindex="0">\n  <span aria-hidden="true">').concat(this.sums_.text, "</span>\n</div>\n");
  };
  ClusterIcon2.prototype.getImageElementHtml = function() {
    var bp = (this.style.backgroundPosition || "0 0").split(" ");
    var spriteH = parseInt(bp[0].replace(/^\s+|\s+$/g, ""), 10);
    var spriteV = parseInt(bp[1].replace(/^\s+|\s+$/g, ""), 10);
    var dimensions = {};
    if (this.cluster_.getMarkerClusterer().getEnableRetinaIcons()) {
      dimensions = {
        width: coercePixels(this.style.width),
        height: coercePixels(this.style.height)
      };
    } else {
      var _a = [
        -1 * spriteV,
        -1 * spriteH + this.style.width,
        -1 * spriteV + this.style.height,
        -1 * spriteH
      ], Y1 = _a[0], X1 = _a[1], Y2 = _a[2], X2 = _a[3];
      dimensions = {
        clip: "rect(".concat(Y1, "px, ").concat(X1, "px, ").concat(Y2, "px, ").concat(X2, "px)")
      };
    }
    var overrideDimensionsDynamicIcon = this.sums_.url ? { width: "100%", height: "100%" } : {};
    var cssText = toCssText(__assign(__assign({ position: "absolute", top: coercePixels(spriteV), left: coercePixels(spriteH) }, dimensions), overrideDimensionsDynamicIcon));
    return '<img alt="'.concat(this.sums_.text, '" aria-hidden="true" src="').concat(this.style.url, '" style="').concat(cssText, '"/>');
  };
  ClusterIcon2.prototype.useStyle = function(sums) {
    this.sums_ = sums;
    var index = Math.max(0, sums.index - 1);
    index = Math.min(this.styles_.length - 1, index);
    this.style = this.sums_.url ? __assign(__assign({}, this.styles_[index]), { url: this.sums_.url }) : this.styles_[index];
    this.anchorText_ = this.style.anchorText || [0, 0];
    this.anchorIcon_ = this.style.anchorIcon || [
      Math.floor(this.style.height / 2),
      Math.floor(this.style.width / 2)
    ];
    this.className_ = this.cluster_.getMarkerClusterer().getClusterClass() + " " + (this.style.className || "cluster-" + index);
  };
  ClusterIcon2.prototype.setCenter = function(center) {
    this.center_ = center;
  };
  ClusterIcon2.prototype.createCss_ = function(pos) {
    return toCssText({
      "z-index": "".concat(this.cluster_.getMarkerClusterer().getZIndex()),
      top: coercePixels(pos.y),
      left: coercePixels(pos.x),
      width: coercePixels(this.style.width),
      height: coercePixels(this.style.height),
      cursor: "pointer",
      position: "absolute",
      "-webkit-user-select": "none",
      "-khtml-user-select": "none",
      "-moz-user-select": "none",
      "-o-user-select": "none",
      "user-select": "none"
    });
  };
  ClusterIcon2.prototype.getPosFromLatLng_ = function(latlng) {
    var pos = this.getProjection().fromLatLngToDivPixel(latlng);
    pos.x = Math.floor(pos.x - this.anchorIcon_[1]);
    pos.y = Math.floor(pos.y - this.anchorIcon_[0]);
    return pos;
  };
  return ClusterIcon2;
}(OverlayViewSafe);
var Cluster = function() {
  function Cluster2(markerClusterer_) {
    this.markerClusterer_ = markerClusterer_;
    this.map_ = this.markerClusterer_.getMap();
    this.minClusterSize_ = this.markerClusterer_.getMinimumClusterSize();
    this.averageCenter_ = this.markerClusterer_.getAverageCenter();
    this.markers_ = [];
    this.center_ = null;
    this.bounds_ = null;
    this.clusterIcon_ = new ClusterIcon(this, this.markerClusterer_.getStyles());
  }
  Cluster2.prototype.getSize = function() {
    return this.markers_.length;
  };
  Cluster2.prototype.getMarkers = function() {
    return this.markers_;
  };
  Cluster2.prototype.getCenter = function() {
    return this.center_;
  };
  Cluster2.prototype.getMap = function() {
    return this.map_;
  };
  Cluster2.prototype.getMarkerClusterer = function() {
    return this.markerClusterer_;
  };
  Cluster2.prototype.getBounds = function() {
    var bounds = new google.maps.LatLngBounds(this.center_, this.center_);
    var markers = this.getMarkers();
    for (var i = 0; i < markers.length; i++) {
      bounds.extend(markers[i].getPosition());
    }
    return bounds;
  };
  Cluster2.prototype.remove = function() {
    this.clusterIcon_.setMap(null);
    this.markers_ = [];
    delete this.markers_;
  };
  Cluster2.prototype.addMarker = function(marker) {
    if (this.isMarkerAlreadyAdded_(marker)) {
      return false;
    }
    if (!this.center_) {
      this.center_ = marker.getPosition();
      this.calculateBounds_();
    } else {
      if (this.averageCenter_) {
        var l = this.markers_.length + 1;
        var lat = (this.center_.lat() * (l - 1) + marker.getPosition().lat()) / l;
        var lng = (this.center_.lng() * (l - 1) + marker.getPosition().lng()) / l;
        this.center_ = new google.maps.LatLng(lat, lng);
        this.calculateBounds_();
      }
    }
    marker.isAdded = true;
    this.markers_.push(marker);
    var mCount = this.markers_.length;
    var mz = this.markerClusterer_.getMaxZoom();
    if (mz !== null && this.map_.getZoom() > mz) {
      if (marker.getMap() !== this.map_) {
        marker.setMap(this.map_);
      }
    } else if (mCount < this.minClusterSize_) {
      if (marker.getMap() !== this.map_) {
        marker.setMap(this.map_);
      }
    } else if (mCount === this.minClusterSize_) {
      for (var i = 0; i < mCount; i++) {
        this.markers_[i].setMap(null);
      }
    } else {
      marker.setMap(null);
    }
    return true;
  };
  Cluster2.prototype.isMarkerInClusterBounds = function(marker) {
    return this.bounds_.contains(marker.getPosition());
  };
  Cluster2.prototype.calculateBounds_ = function() {
    var bounds = new google.maps.LatLngBounds(this.center_, this.center_);
    this.bounds_ = this.markerClusterer_.getExtendedBounds(bounds);
  };
  Cluster2.prototype.updateIcon = function() {
    var mCount = this.markers_.length;
    var mz = this.markerClusterer_.getMaxZoom();
    if (mz !== null && this.map_.getZoom() > mz) {
      this.clusterIcon_.hide();
      return;
    }
    if (mCount < this.minClusterSize_) {
      this.clusterIcon_.hide();
      return;
    }
    var numStyles = this.markerClusterer_.getStyles().length;
    var sums = this.markerClusterer_.getCalculator()(this.markers_, numStyles);
    this.clusterIcon_.setCenter(this.center_);
    this.clusterIcon_.useStyle(sums);
    this.clusterIcon_.show();
  };
  Cluster2.prototype.isMarkerAlreadyAdded_ = function(marker) {
    if (this.markers_.indexOf) {
      return this.markers_.indexOf(marker) !== -1;
    } else {
      for (var i = 0; i < this.markers_.length; i++) {
        if (marker === this.markers_[i]) {
          return true;
        }
      }
    }
    return false;
  };
  return Cluster2;
}();
var getOption = function(options, prop, def) {
  if (options[prop] !== void 0) {
    return options[prop];
  } else {
    return def;
  }
};
var MarkerClusterer = function(_super) {
  __extends(MarkerClusterer2, _super);
  function MarkerClusterer2(map, markers, options) {
    if (markers === void 0) {
      markers = [];
    }
    if (options === void 0) {
      options = {};
    }
    var _this = _super.call(this) || this;
    _this.options = options;
    _this.markers_ = [];
    _this.clusters_ = [];
    _this.listeners_ = [];
    _this.activeMap_ = null;
    _this.ready_ = false;
    _this.ariaLabelFn = _this.options.ariaLabelFn || function() {
      return "";
    };
    _this.zIndex_ = _this.options.zIndex || Number(google.maps.Marker.MAX_ZINDEX) + 1;
    _this.gridSize_ = _this.options.gridSize || 60;
    _this.minClusterSize_ = _this.options.minimumClusterSize || 2;
    _this.maxZoom_ = _this.options.maxZoom || null;
    _this.styles_ = _this.options.styles || [];
    _this.title_ = _this.options.title || "";
    _this.zoomOnClick_ = getOption(_this.options, "zoomOnClick", true);
    _this.averageCenter_ = getOption(_this.options, "averageCenter", false);
    _this.ignoreHidden_ = getOption(_this.options, "ignoreHidden", false);
    _this.enableRetinaIcons_ = getOption(_this.options, "enableRetinaIcons", false);
    _this.imagePath_ = _this.options.imagePath || MarkerClusterer2.IMAGE_PATH;
    _this.imageExtension_ = _this.options.imageExtension || MarkerClusterer2.IMAGE_EXTENSION;
    _this.imageSizes_ = _this.options.imageSizes || MarkerClusterer2.IMAGE_SIZES;
    _this.calculator_ = _this.options.calculator || MarkerClusterer2.CALCULATOR;
    _this.batchSize_ = _this.options.batchSize || MarkerClusterer2.BATCH_SIZE;
    _this.batchSizeIE_ = _this.options.batchSizeIE || MarkerClusterer2.BATCH_SIZE_IE;
    _this.clusterClass_ = _this.options.clusterClass || "cluster";
    if (navigator.userAgent.toLowerCase().indexOf("msie") !== -1) {
      _this.batchSize_ = _this.batchSizeIE_;
    }
    _this.setupStyles_();
    _this.addMarkers(markers, true);
    _this.setMap(map);
    return _this;
  }
  MarkerClusterer2.prototype.onAdd = function() {
    var _this = this;
    this.activeMap_ = this.getMap();
    this.ready_ = true;
    this.repaint();
    this.prevZoom_ = this.getMap().getZoom();
    this.listeners_ = [
      google.maps.event.addListener(this.getMap(), "zoom_changed", function() {
        var map = _this.getMap();
        var minZoom = map.minZoom || 0;
        var maxZoom = Math.min(map.maxZoom || 100, map.mapTypes[map.getMapTypeId()].maxZoom);
        var zoom = Math.min(Math.max(_this.getMap().getZoom(), minZoom), maxZoom);
        if (_this.prevZoom_ != zoom) {
          _this.prevZoom_ = zoom;
          _this.resetViewport_(false);
        }
      }),
      google.maps.event.addListener(this.getMap(), "idle", function() {
        _this.redraw_();
      })
    ];
  };
  MarkerClusterer2.prototype.onRemove = function() {
    for (var i = 0; i < this.markers_.length; i++) {
      if (this.markers_[i].getMap() !== this.activeMap_) {
        this.markers_[i].setMap(this.activeMap_);
      }
    }
    for (var i = 0; i < this.clusters_.length; i++) {
      this.clusters_[i].remove();
    }
    this.clusters_ = [];
    for (var i = 0; i < this.listeners_.length; i++) {
      google.maps.event.removeListener(this.listeners_[i]);
    }
    this.listeners_ = [];
    this.activeMap_ = null;
    this.ready_ = false;
  };
  MarkerClusterer2.prototype.draw = function() {
  };
  MarkerClusterer2.prototype.setupStyles_ = function() {
    if (this.styles_.length > 0) {
      return;
    }
    for (var i = 0; i < this.imageSizes_.length; i++) {
      var size = this.imageSizes_[i];
      this.styles_.push(MarkerClusterer2.withDefaultStyle({
        url: this.imagePath_ + (i + 1) + "." + this.imageExtension_,
        height: size,
        width: size
      }));
    }
  };
  MarkerClusterer2.prototype.fitMapToMarkers = function(padding) {
    var markers = this.getMarkers();
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < markers.length; i++) {
      if (markers[i].getVisible() || !this.getIgnoreHidden()) {
        bounds.extend(markers[i].getPosition());
      }
    }
    this.getMap().fitBounds(bounds, padding);
  };
  MarkerClusterer2.prototype.getGridSize = function() {
    return this.gridSize_;
  };
  MarkerClusterer2.prototype.setGridSize = function(gridSize) {
    this.gridSize_ = gridSize;
  };
  MarkerClusterer2.prototype.getMinimumClusterSize = function() {
    return this.minClusterSize_;
  };
  MarkerClusterer2.prototype.setMinimumClusterSize = function(minimumClusterSize) {
    this.minClusterSize_ = minimumClusterSize;
  };
  MarkerClusterer2.prototype.getMaxZoom = function() {
    return this.maxZoom_;
  };
  MarkerClusterer2.prototype.setMaxZoom = function(maxZoom) {
    this.maxZoom_ = maxZoom;
  };
  MarkerClusterer2.prototype.getZIndex = function() {
    return this.zIndex_;
  };
  MarkerClusterer2.prototype.setZIndex = function(zIndex) {
    this.zIndex_ = zIndex;
  };
  MarkerClusterer2.prototype.getStyles = function() {
    return this.styles_;
  };
  MarkerClusterer2.prototype.setStyles = function(styles) {
    this.styles_ = styles;
  };
  MarkerClusterer2.prototype.getTitle = function() {
    return this.title_;
  };
  MarkerClusterer2.prototype.setTitle = function(title) {
    this.title_ = title;
  };
  MarkerClusterer2.prototype.getZoomOnClick = function() {
    return this.zoomOnClick_;
  };
  MarkerClusterer2.prototype.setZoomOnClick = function(zoomOnClick) {
    this.zoomOnClick_ = zoomOnClick;
  };
  MarkerClusterer2.prototype.getAverageCenter = function() {
    return this.averageCenter_;
  };
  MarkerClusterer2.prototype.setAverageCenter = function(averageCenter) {
    this.averageCenter_ = averageCenter;
  };
  MarkerClusterer2.prototype.getIgnoreHidden = function() {
    return this.ignoreHidden_;
  };
  MarkerClusterer2.prototype.setIgnoreHidden = function(ignoreHidden) {
    this.ignoreHidden_ = ignoreHidden;
  };
  MarkerClusterer2.prototype.getEnableRetinaIcons = function() {
    return this.enableRetinaIcons_;
  };
  MarkerClusterer2.prototype.setEnableRetinaIcons = function(enableRetinaIcons) {
    this.enableRetinaIcons_ = enableRetinaIcons;
  };
  MarkerClusterer2.prototype.getImageExtension = function() {
    return this.imageExtension_;
  };
  MarkerClusterer2.prototype.setImageExtension = function(imageExtension) {
    this.imageExtension_ = imageExtension;
  };
  MarkerClusterer2.prototype.getImagePath = function() {
    return this.imagePath_;
  };
  MarkerClusterer2.prototype.setImagePath = function(imagePath) {
    this.imagePath_ = imagePath;
  };
  MarkerClusterer2.prototype.getImageSizes = function() {
    return this.imageSizes_;
  };
  MarkerClusterer2.prototype.setImageSizes = function(imageSizes) {
    this.imageSizes_ = imageSizes;
  };
  MarkerClusterer2.prototype.getCalculator = function() {
    return this.calculator_;
  };
  MarkerClusterer2.prototype.setCalculator = function(calculator) {
    this.calculator_ = calculator;
  };
  MarkerClusterer2.prototype.getBatchSizeIE = function() {
    return this.batchSizeIE_;
  };
  MarkerClusterer2.prototype.setBatchSizeIE = function(batchSizeIE) {
    this.batchSizeIE_ = batchSizeIE;
  };
  MarkerClusterer2.prototype.getClusterClass = function() {
    return this.clusterClass_;
  };
  MarkerClusterer2.prototype.setClusterClass = function(clusterClass) {
    this.clusterClass_ = clusterClass;
  };
  MarkerClusterer2.prototype.getMarkers = function() {
    return this.markers_;
  };
  MarkerClusterer2.prototype.getTotalMarkers = function() {
    return this.markers_.length;
  };
  MarkerClusterer2.prototype.getClusters = function() {
    return this.clusters_;
  };
  MarkerClusterer2.prototype.getTotalClusters = function() {
    return this.clusters_.length;
  };
  MarkerClusterer2.prototype.addMarker = function(marker, nodraw) {
    this.pushMarkerTo_(marker);
    if (!nodraw) {
      this.redraw_();
    }
  };
  MarkerClusterer2.prototype.addMarkers = function(markers, nodraw) {
    for (var key in markers) {
      if (Object.prototype.hasOwnProperty.call(markers, key)) {
        this.pushMarkerTo_(markers[key]);
      }
    }
    if (!nodraw) {
      this.redraw_();
    }
  };
  MarkerClusterer2.prototype.pushMarkerTo_ = function(marker) {
    var _this = this;
    if (marker.getDraggable()) {
      google.maps.event.addListener(marker, "dragend", function() {
        if (_this.ready_) {
          marker.isAdded = false;
          _this.repaint();
        }
      });
    }
    marker.isAdded = false;
    this.markers_.push(marker);
  };
  MarkerClusterer2.prototype.removeMarker = function(marker, nodraw) {
    var removed = this.removeMarker_(marker);
    if (!nodraw && removed) {
      this.repaint();
    }
    return removed;
  };
  MarkerClusterer2.prototype.removeMarkers = function(markers, nodraw) {
    var removed = false;
    for (var i = 0; i < markers.length; i++) {
      var r = this.removeMarker_(markers[i]);
      removed = removed || r;
    }
    if (!nodraw && removed) {
      this.repaint();
    }
    return removed;
  };
  MarkerClusterer2.prototype.removeMarker_ = function(marker) {
    var index = -1;
    if (this.markers_.indexOf) {
      index = this.markers_.indexOf(marker);
    } else {
      for (var i = 0; i < this.markers_.length; i++) {
        if (marker === this.markers_[i]) {
          index = i;
          break;
        }
      }
    }
    if (index === -1) {
      return false;
    }
    marker.setMap(null);
    this.markers_.splice(index, 1);
    return true;
  };
  MarkerClusterer2.prototype.clearMarkers = function() {
    this.resetViewport_(true);
    this.markers_ = [];
  };
  MarkerClusterer2.prototype.repaint = function() {
    var oldClusters = this.clusters_.slice();
    this.clusters_ = [];
    this.resetViewport_(false);
    this.redraw_();
    setTimeout(function() {
      for (var i = 0; i < oldClusters.length; i++) {
        oldClusters[i].remove();
      }
    }, 0);
  };
  MarkerClusterer2.prototype.getExtendedBounds = function(bounds) {
    var projection = this.getProjection();
    var tr = new google.maps.LatLng(bounds.getNorthEast().lat(), bounds.getNorthEast().lng());
    var bl = new google.maps.LatLng(bounds.getSouthWest().lat(), bounds.getSouthWest().lng());
    var trPix = projection.fromLatLngToDivPixel(tr);
    trPix.x += this.gridSize_;
    trPix.y -= this.gridSize_;
    var blPix = projection.fromLatLngToDivPixel(bl);
    blPix.x -= this.gridSize_;
    blPix.y += this.gridSize_;
    var ne = projection.fromDivPixelToLatLng(trPix);
    var sw = projection.fromDivPixelToLatLng(blPix);
    bounds.extend(ne);
    bounds.extend(sw);
    return bounds;
  };
  MarkerClusterer2.prototype.redraw_ = function() {
    this.createClusters_(0);
  };
  MarkerClusterer2.prototype.resetViewport_ = function(hide) {
    for (var i = 0; i < this.clusters_.length; i++) {
      this.clusters_[i].remove();
    }
    this.clusters_ = [];
    for (var i = 0; i < this.markers_.length; i++) {
      var marker = this.markers_[i];
      marker.isAdded = false;
      if (hide) {
        marker.setMap(null);
      }
    }
  };
  MarkerClusterer2.prototype.distanceBetweenPoints_ = function(p1, p2) {
    var R = 6371;
    var dLat = (p2.lat() - p1.lat()) * Math.PI / 180;
    var dLon = (p2.lng() - p1.lng()) * Math.PI / 180;
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(p1.lat() * Math.PI / 180) * Math.cos(p2.lat() * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };
  MarkerClusterer2.prototype.isMarkerInBounds_ = function(marker, bounds) {
    return bounds.contains(marker.getPosition());
  };
  MarkerClusterer2.prototype.addToClosestCluster_ = function(marker) {
    var distance = 4e4;
    var clusterToAddTo = null;
    for (var i = 0; i < this.clusters_.length; i++) {
      var cluster = this.clusters_[i];
      var center = cluster.getCenter();
      if (center) {
        var d = this.distanceBetweenPoints_(center, marker.getPosition());
        if (d < distance) {
          distance = d;
          clusterToAddTo = cluster;
        }
      }
    }
    if (clusterToAddTo && clusterToAddTo.isMarkerInClusterBounds(marker)) {
      clusterToAddTo.addMarker(marker);
    } else {
      var cluster = new Cluster(this);
      cluster.addMarker(marker);
      this.clusters_.push(cluster);
    }
  };
  MarkerClusterer2.prototype.createClusters_ = function(iFirst) {
    var _this = this;
    if (!this.ready_) {
      return;
    }
    if (iFirst === 0) {
      google.maps.event.trigger(this, "clusteringbegin", this);
      if (typeof this.timerRefStatic !== "undefined") {
        clearTimeout(this.timerRefStatic);
        delete this.timerRefStatic;
      }
    }
    var mapBounds = new google.maps.LatLngBounds(this.getMap().getBounds().getSouthWest(), this.getMap().getBounds().getNorthEast());
    var bounds = this.getExtendedBounds(mapBounds);
    var iLast = Math.min(iFirst + this.batchSize_, this.markers_.length);
    for (var i = iFirst; i < iLast; i++) {
      var marker = this.markers_[i];
      if (!marker.isAdded && this.isMarkerInBounds_(marker, bounds)) {
        if (!this.ignoreHidden_ || this.ignoreHidden_ && marker.getVisible()) {
          this.addToClosestCluster_(marker);
        }
      }
    }
    if (iLast < this.markers_.length) {
      this.timerRefStatic = window.setTimeout(function() {
        _this.createClusters_(iLast);
      }, 0);
    } else {
      delete this.timerRefStatic;
      google.maps.event.trigger(this, "clusteringend", this);
      for (var i = 0; i < this.clusters_.length; i++) {
        this.clusters_[i].updateIcon();
      }
    }
  };
  MarkerClusterer2.CALCULATOR = function(markers, numStyles) {
    var index = 0;
    var count = markers.length;
    var dv = count;
    while (dv !== 0) {
      dv = Math.floor(dv / 10);
      index++;
    }
    index = Math.min(index, numStyles);
    return {
      text: count.toString(),
      index,
      title: ""
    };
  };
  MarkerClusterer2.withDefaultStyle = function(overrides) {
    return __assign({ textColor: "black", textSize: 11, textDecoration: "none", textLineHeight: overrides.height, fontWeight: "bold", fontStyle: "normal", fontFamily: "Arial,sans-serif", backgroundPosition: "0 0" }, overrides);
  };
  MarkerClusterer2.BATCH_SIZE = 2e3;
  MarkerClusterer2.BATCH_SIZE_IE = 500;
  MarkerClusterer2.IMAGE_PATH = "../images/m";
  MarkerClusterer2.IMAGE_EXTENSION = "png";
  MarkerClusterer2.IMAGE_SIZES = [53, 56, 66, 78, 90];
  return MarkerClusterer2;
}(OverlayViewSafe);
const props$4 = {
  maxZoom: {
    type: Number,
    twoWay: false
  },
  batchSizeIE: {
    type: Number,
    twoWay: false
  },
  calculator: {
    type: Function,
    twoWay: false
  },
  enableRetinaIcons: {
    type: Boolean,
    twoWay: false
  },
  gridSize: {
    type: Number,
    twoWay: false
  },
  ignoreHidden: {
    type: Boolean,
    twoWay: false
  },
  imageExtension: {
    type: String,
    twoWay: false
  },
  imagePath: {
    type: String,
    twoWay: false
  },
  imageSizes: {
    type: Array,
    twoWay: false
  },
  minimumClusterSize: {
    type: Number,
    twoWay: false
  },
  styles: {
    type: Array,
    twoWay: false
  },
  zoomOnClick: {
    type: Boolean,
    twoWay: false
  }
};
const events$3 = [
  "click",
  "rightclick",
  "dblclick",
  "drag",
  "dragstart",
  "dragend",
  "mouseup",
  "mousedown",
  "mouseover",
  "mouseout"
];
const _sfc_main$3 = buildComponent({
  mappedProps: props$4,
  events: events$3,
  name: "cluster",
  ctr: () => {
    if (typeof MarkerClusterer === "undefined") {
      const errorMessage = "MarkerClusterer is not installed!";
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
    return MarkerClusterer;
  },
  ctrArgs: ({ map, ...otherOptions }) => [map, [], otherOptions],
  afterCreate(inst) {
    const reinsertMarkers = () => {
      const oldMarkers = inst.getMarkers();
      inst.clearMarkers();
      inst.addMarkers(oldMarkers);
    };
    for (let prop in props$4) {
      if (props$4[prop].twoWay) {
        this.$on(prop.toLowerCase() + "_changed", reinsertMarkers);
      }
    }
  },
  updated() {
    if (this.$clusterObject) {
      this.$clusterObject.repaint();
    }
  },
  beforeUnmount() {
    if (this.$children && this.$children.length) {
      this.$children.forEach((marker) => {
        if (marker.$clusterObject === this.$clusterObject) {
          marker.$clusterObject = null;
        }
      });
    }
    if (this.$clusterObject) {
      this.$clusterObject.clearMarkers();
    }
  }
});
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, [
    renderSlot(_ctx.$slots, "default")
  ]);
}
var GMapCluster = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3], ["__file", "cluster.vue"]]);
const props$3 = {
  options: {
    type: Object,
    required: false,
    default() {
      return {};
    }
  },
  position: {
    type: Object,
    twoWay: true
  },
  zIndex: {
    type: Number,
    twoWay: true
  }
};
const events$2 = ["domready", "click", "closeclick", "content_changed"];
const _sfc_main$2 = buildComponent({
  mappedProps: props$3,
  events: events$2,
  name: "infoWindow",
  ctr: () => google.maps.InfoWindow,
  props: {
    opened: {
      type: Boolean,
      default: true
    }
  },
  inject: {
    $markerPromise: {
      default: null
    }
  },
  mounted() {
    const el = this.$refs.infoWindow;
    el.parentNode.removeChild(el);
  },
  beforeCreate(options) {
    options.content = this.$refs.infoWindow;
    if (this.$markerPromise) {
      delete options.position;
      return this.$markerPromise.then((mo) => {
        this.$markerObject = mo;
        return mo;
      });
    }
  },
  emits: ["closeclick"],
  methods: {
    _openInfoWindow() {
      this.$infoWindowObject.close();
      if (this.opened) {
        this.$infoWindowObject.open(this.$map, this.$markerObject);
      } else {
        this.$emit("closeclick");
      }
    }
  },
  afterCreate() {
    this._openInfoWindow();
    this.$watch("opened", () => {
      this._openInfoWindow();
    });
  }
});
const _hoisted_1$1 = { ref: "infoWindow" };
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$1, [
    renderSlot(_ctx.$slots, "default")
  ], 512);
}
var InfoWindow = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__file", "infoWindow.vue"]]);
var mountableMixin = {
  props: ["resizeBus"],
  data() {
    return {
      _actualResizeBus: null
    };
  },
  created() {
    if (typeof this.resizeBus === "undefined") {
      this.$data._actualResizeBus = this.$gmapDefaultResizeBus;
    } else {
      this.$data._actualResizeBus = this.resizeBus;
    }
  },
  methods: {
    _resizeCallback() {
      this.resize();
    },
    isFunction(functionToCheck) {
      return functionToCheck && {}.toString.call(functionToCheck) === "[object Function]";
    },
    _delayedResizeCallback() {
      this.$nextTick(() => this._resizeCallback());
    }
  },
  watch: {
    resizeBus(newVal) {
      this.$data._actualResizeBus = newVal;
    },
    "$data._actualResizeBus"(newVal, oldVal) {
      if (oldVal) {
        oldVal.$off("resize", this._delayedResizeCallback);
      }
    }
  },
  unmounted() {
    if (this.$data._actualResizeBus && this.isFunction(this.$data._actualResizeBus.$off)) {
      this.$data._actualResizeBus.$off("resize", this._delayedResizeCallback);
    }
  }
};
function TwoWayBindingWrapper(fn) {
  let counter = 0;
  fn(
    () => {
      counter += 1;
    },
    () => {
      counter = Math.max(0, counter - 1);
    },
    () => counter === 0
  );
}
var map_vue_vue_type_style_index_0_lang = "";
const props$2 = {
  center: {
    required: true,
    twoWay: true,
    type: Object,
    noBind: true
  },
  zoom: {
    required: false,
    twoWay: true,
    type: Number,
    noBind: true
  },
  heading: {
    type: Number,
    twoWay: true
  },
  mapTypeId: {
    twoWay: true,
    type: String
  },
  tilt: {
    twoWay: true,
    type: Number
  },
  options: {
    type: Object,
    default() {
      return {};
    }
  }
};
const events$1 = [
  "bounds_changed",
  "click",
  "dblclick",
  "drag",
  "dragend",
  "dragstart",
  "idle",
  "mousemove",
  "mouseout",
  "mouseover",
  "resize",
  "rightclick",
  "tilesloaded"
];
const linkedMethods = ["panBy", "panTo", "panToBounds", "fitBounds"].reduce((all, methodName) => {
  all[methodName] = function() {
    if (this.$mapObject) {
      this.$mapObject[methodName].apply(this.$mapObject, arguments);
    }
  };
  return all;
}, {});
const customMethods = {
  resize() {
    if (this.$mapObject) {
      google.maps.event.trigger(this.$mapObject, "resize");
    }
  },
  resizePreserveCenter() {
    if (!this.$mapObject) {
      return;
    }
    const oldCenter = this.$mapObject.getCenter();
    google.maps.event.trigger(this.$mapObject, "resize");
    this.$mapObject.setCenter(oldCenter);
  },
  _resizeCallback() {
    this.resizePreserveCenter();
  }
};
const _sfc_main$1 = {
  mixins: [mountableMixin],
  props: mappedPropsToVueProps({ ...props$2, ...events$1.reduce((obj, eventName) => ({ ...obj, [`on${eventName.charAt(0).toUpperCase()}${eventName.slice(1)}`.replace(/[-_]+(.)?/g, (_, c) => c ? c.toUpperCase() : "")]: Function }), {}) }),
  inheritAttrs: false,
  provide() {
    this.$mapPromise = new Promise((resolve, reject) => {
      this.$mapPromiseDeferred = { resolve, reject };
    });
    return {
      $mapPromise: this.$mapPromise
    };
  },
  emits: ["center_changed", "zoom_changed", "bounds_changed"],
  computed: {
    finalLat() {
      return this.center && typeof this.center.lat === "function" ? this.center.lat() : this.center.lat;
    },
    finalLng() {
      return this.center && typeof this.center.lng === "function" ? this.center.lng() : this.center.lng;
    },
    finalLatLng() {
      return { lat: this.finalLat, lng: this.finalLng };
    }
  },
  watch: {
    zoom(zoom) {
      if (this.$mapObject) {
        this.$mapObject.setZoom(zoom);
      }
    }
  },
  mounted() {
    return this.$gmapApiPromiseLazy().then(() => {
      const element = this.$refs["vue-map"];
      const options = {
        ...this.options,
        ...getPropsValues(this, props$2)
      };
      delete options.options;
      this.$mapObject = new google.maps.Map(element, options);
      bindProps(this, this.$mapObject, props$2);
      bindEvents(this, this.$mapObject, events$1);
      TwoWayBindingWrapper((increment, decrement, shouldUpdate) => {
        this.$mapObject.addListener("center_changed", () => {
          if (shouldUpdate()) {
            this.$emit("center_changed", this.$mapObject.getCenter());
          }
          decrement();
        });
        const updateCenter = () => {
          increment();
          this.$mapObject.setCenter(this.finalLatLng);
        };
        WatchPrimitiveProperties(this, ["finalLat", "finalLng"], updateCenter);
      });
      this.$mapObject.addListener("zoom_changed", () => {
        this.$emit("zoom_changed", this.$mapObject.getZoom());
      });
      this.$mapObject.addListener("bounds_changed", () => {
        this.$emit("bounds_changed", this.$mapObject.getBounds());
      });
      this.$mapPromiseDeferred.resolve(this.$mapObject);
      return this.$mapObject;
    }).catch((error) => {
      throw error;
    });
  },
  methods: {
    ...customMethods,
    ...linkedMethods
  }
};
const _hoisted_1 = { class: "vue-map-hidden" };
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["vue-map-container", _ctx.$attrs.class])
  }, [
    createBaseVNode("div", {
      ref: "vue-map",
      class: "vue-map",
      style: normalizeStyle(_ctx.$attrs.style ? _ctx.$attrs.style : "")
    }, null, 4),
    createBaseVNode("div", _hoisted_1, [
      renderSlot(_ctx.$slots, "default")
    ]),
    renderSlot(_ctx.$slots, "visible")
  ], 2);
}
var Map = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__file", "map.vue"]]);
const props$1 = {
  options: {
    type: Object,
    twoWay: false,
    default: () => {
    }
  },
  data: {
    type: Array,
    twoWay: true
  }
};
const events = [];
var Heatmap = buildComponent({
  mappedProps: props$1,
  name: "heatmap",
  ctr: () => google.maps.visualization.HeatmapLayer,
  events
});
var downArrowSimulator = (input) => {
  const _addEventListener = input.addEventListener ? input.addEventListener : input.attachEvent;
  function addEventListenerWrapper(type, listener) {
    if (type === "keydown") {
      const origListener = listener;
      listener = function(event) {
        const suggestionSelected = document.getElementsByClassName("pac-item-selected").length > 0;
        if (event.which === 13 && !suggestionSelected) {
          const simulatedEvent = document.createEvent("Event");
          simulatedEvent.keyCode = 40;
          simulatedEvent.which = 40;
          origListener.apply(input, [simulatedEvent]);
        }
        origListener.apply(input, [event]);
      };
    }
    _addEventListener.apply(input, [type, listener]);
  }
  input.addEventListener = addEventListenerWrapper;
  input.attachEvent = addEventListenerWrapper;
};
const mappedProps = {
  bounds: {
    type: Object
  },
  componentRestrictions: {
    type: Object,
    noBind: true
  },
  types: {
    type: Array,
    default: function() {
      return [];
    }
  }
};
const props = {
  selectFirstOnEnter: {
    required: false,
    type: Boolean,
    default: false
  },
  options: {
    type: Object
  }
};
const _sfc_main = {
  mounted() {
    this.$gmapApiPromiseLazy().then(() => {
      if (this.selectFirstOnEnter) {
        downArrowSimulator(this.$refs.input);
      }
      if (typeof google.maps.places.Autocomplete !== "function") {
        throw new Error(
          "google.maps.places.Autocomplete is undefined. Did you add 'places' to libraries when loading Google Maps?"
        );
      }
      const finalOptions = {
        ...getPropsValues(this, mappedProps),
        ...this.options
      };
      this.$autocomplete = new google.maps.places.Autocomplete(this.$refs.input, finalOptions);
      bindProps(this, this.$autocomplete, mappedProps);
      this.$watch("componentRestrictions", (v) => {
        if (v !== void 0) {
          this.$autocomplete.setComponentRestrictions(v);
        }
      });
      this.$autocomplete.addListener("place_changed", () => {
        this.$emit("place_changed", this.$autocomplete.getPlace());
      });
    });
  },
  props: {
    ...mappedPropsToVueProps(mappedProps),
    ...props
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("input", mergeProps({ ref: "input" }, _ctx.$attrs, toHandlers(_ctx.$attrs, true)), null, 16);
}
var Autocomplete = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "autocomplete.vue"]]);
let GMapApi = null;
function install(Vue, options) {
  options = {
    installComponents: true,
    autobindAllEvents: false,
    ...options
  };
  GMapApi = createApp({
    data: function() {
      return { gmapApi: null };
    }
  });
  const defaultResizeBus = createApp();
  let gmapApiPromiseLazy = makeGMapApiPromiseLazy(options);
  Vue.mixin({
    created() {
      this.$gmapDefaultResizeBus = defaultResizeBus;
      this.$gmapOptions = options;
      this.$gmapApiPromiseLazy = gmapApiPromiseLazy;
    }
  });
  Vue.$gmapDefaultResizeBus = defaultResizeBus;
  Vue.$gmapApiPromiseLazy = gmapApiPromiseLazy;
  if (options.installComponents) {
    Vue.component("GMapMap", Map);
    Vue.component("GMapMarker", Marker);
    Vue.component("GMapInfoWindow", InfoWindow);
    Vue.component("GMapCluster", GMapCluster);
    Vue.component("GMapPolyline", Polyline);
    Vue.component("GMapPolygon", Polygon);
    Vue.component("GMapCircle", Circle);
    Vue.component("GMapRectangle", Rectangle);
    Vue.component("GMapAutocomplete", Autocomplete);
    Vue.component("GMapHeatmap", Heatmap);
  }
}
function makeGMapApiPromiseLazy(options) {
  function onApiLoaded() {
    GMapApi.gmapApi = {};
    return window.google;
  }
  if (options.load) {
    return lazy(() => {
      if (Env.isServer()) {
        return new Promise(() => {
        }).then(onApiLoaded);
      } else {
        return new Promise((resolve, reject) => {
          try {
            window["vueGoogleMapsInit"] = resolve;
            loadGMapApi(options.load);
          } catch (err) {
            reject(err);
          }
        }).then(onApiLoaded);
      }
    });
  } else {
    const promise = new Promise((resolve) => {
      if (Env.isServer()) {
        return;
      }
      window["vueGoogleMapsInit"] = resolve;
    }).then(onApiLoaded);
    return lazy(() => promise);
  }
}
var googleMaps = boot(({ app }) => {
  app.use(install, {
    load: {
      key: "AIzaSyCaLqRmzlYh0hkEI_FtBx8nPhIS0jJH9V0"
    }
  });
});
export { googleMaps as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLW1hcHMuNjJmMWJlMTYuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AZmF3bWkvdnVlLWdvb2dsZS1tYXBzL3NyYy91dGlscy9sYXp5VmFsdWUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQGZhd21pL3Z1ZS1nb29nbGUtbWFwcy9zcmMvdXRpbHMvZW52LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BmYXdtaS92dWUtZ29vZ2xlLW1hcHMvc3JjL3V0aWxzL2NyZWF0ZS1tYXAtc2NyaXB0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BmYXdtaS92dWUtZ29vZ2xlLW1hcHMvc3JjL2xvYWQtZ29vZ2xlLW1hcHMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQGZhd21pL3Z1ZS1nb29nbGUtbWFwcy9zcmMvdXRpbHMvYmluZEV2ZW50cy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AZmF3bWkvdnVlLWdvb2dsZS1tYXBzL3NyYy91dGlscy9XYXRjaFByaW1pdGl2ZVByb3BlcnRpZXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQGZhd21pL3Z1ZS1nb29nbGUtbWFwcy9zcmMvdXRpbHMvc3RyaW5nLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BmYXdtaS92dWUtZ29vZ2xlLW1hcHMvc3JjL3V0aWxzL2JpbmRQcm9wcy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AZmF3bWkvdnVlLWdvb2dsZS1tYXBzL3NyYy9jb21wb25lbnRzL21hcEVsZW1lbnRNaXhpbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AZmF3bWkvdnVlLWdvb2dsZS1tYXBzL3NyYy9jb21wb25lbnRzL2J1aWxkLWNvbXBvbmVudC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AZmF3bWkvdnVlLWdvb2dsZS1tYXBzL3NyYy9jb21wb25lbnRzL3BvbHlsaW5lLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BmYXdtaS92dWUtZ29vZ2xlLW1hcHMvc3JjL2NvbXBvbmVudHMvcG9seWdvbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AZmF3bWkvdnVlLWdvb2dsZS1tYXBzL3NyYy9jb21wb25lbnRzL2NpcmNsZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AZmF3bWkvdnVlLWdvb2dsZS1tYXBzL3NyYy9jb21wb25lbnRzL3JlY3RhbmdsZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AZmF3bWkvdnVlLWdvb2dsZS1tYXBzL3NyYy9jb21wb25lbnRzL21hcmtlci52dWUiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQGdvb2dsZW1hcHMvbWFya2VyY2x1c3RlcmVycGx1cy9kaXN0L2luZGV4LmVzbS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AZmF3bWkvdnVlLWdvb2dsZS1tYXBzL3NyYy9jb21wb25lbnRzL2NsdXN0ZXIudnVlIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BmYXdtaS92dWUtZ29vZ2xlLW1hcHMvc3JjL2NvbXBvbmVudHMvaW5mb1dpbmRvdy52dWUiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQGZhd21pL3Z1ZS1nb29nbGUtbWFwcy9zcmMvdXRpbHMvbW91bnRhYmxlTWl4aW4uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQGZhd21pL3Z1ZS1nb29nbGUtbWFwcy9zcmMvdXRpbHMvVHdvV2F5QmluZGluZ1dyYXBwZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQGZhd21pL3Z1ZS1nb29nbGUtbWFwcy9zcmMvY29tcG9uZW50cy9tYXAudnVlIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BmYXdtaS92dWUtZ29vZ2xlLW1hcHMvc3JjL2NvbXBvbmVudHMvaGVhdG1hcC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AZmF3bWkvdnVlLWdvb2dsZS1tYXBzL3NyYy91dGlscy9zaW11bGF0ZUFycm93RG93bi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AZmF3bWkvdnVlLWdvb2dsZS1tYXBzL3NyYy9jb21wb25lbnRzL2F1dG9jb21wbGV0ZS52dWUiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQGZhd21pL3Z1ZS1nb29nbGUtbWFwcy9zcmMvbWFpbi5qcyIsIi4uLy4uLy4uL3NyYy9ib290L2dvb2dsZS1tYXBzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGxhenktdmFsdWUgYnkgc2luZHJlc29yaHVzXHJcblxyXG5leHBvcnQgZGVmYXVsdCBmbiA9PiB7XHJcbiAgbGV0IGNhbGxlZCA9IGZhbHNlO1xyXG4gIGxldCByZXN1bHQ7XHJcblxyXG4gIHJldHVybiAoKSA9PiB7XHJcbiAgICBpZiAoIWNhbGxlZCkge1xyXG4gICAgICBjYWxsZWQgPSB0cnVlO1xyXG4gICAgICByZXN1bHQgPSBmbigpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfTtcclxufTtcclxuIiwiZXhwb3J0IGNsYXNzIEVudiB7XHJcbiAgc3RhdGljIGlzU2VydmVyKCkge1xyXG4gICAgcmV0dXJuIHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCc7XHJcbiAgfVxyXG59XHJcbiIsImV4cG9ydCBmdW5jdGlvbiBjcmVhdGVNYXBTY3JpcHQob3B0aW9ucykge1xyXG4gIGNvbnN0IGdvb2dsZU1hcFNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ1NDUklQVCcpXHJcbiAgaWYgKHR5cGVvZiBvcHRpb25zICE9PSAnb2JqZWN0Jykge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdvcHRpb25zIHNob3VsZCAgYmUgYW4gb2JqZWN0JylcclxuICB9XHJcblxyXG4gIC8vIGxpYnJhcmllc1xyXG4gIC8qIGVzbGludC1kaXNhYmxlIG5vLXByb3RvdHlwZS1idWlsdGlucyAqL1xyXG4gIGlmIChBcnJheS5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihvcHRpb25zLmxpYnJhcmllcykpIHtcclxuICAgIG9wdGlvbnMubGlicmFyaWVzID0gb3B0aW9ucy5saWJyYXJpZXMuam9pbignLCcpXHJcbiAgfVxyXG4gIG9wdGlvbnNbJ2NhbGxiYWNrJ10gPSAndnVlR29vZ2xlTWFwc0luaXQnXHJcbiAgbGV0IGJhc2VVcmwgPSAnaHR0cHM6Ly9tYXBzLmdvb2dsZWFwaXMuY29tL21hcHMvYXBpL2pzPydcclxuXHJcbiAgbGV0IHVybCA9XHJcbiAgICBiYXNlVXJsICtcclxuICAgIE9iamVjdC5rZXlzKG9wdGlvbnMpXHJcbiAgICAgIC5tYXAoKGtleSkgPT4gZW5jb2RlVVJJQ29tcG9uZW50KGtleSkgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQob3B0aW9uc1trZXldKSkuam9pbignJicpXHJcblxyXG4gIGdvb2dsZU1hcFNjcmlwdC5zZXRBdHRyaWJ1dGUoJ3NyYycsIHVybClcclxuICBnb29nbGVNYXBTY3JpcHQuc2V0QXR0cmlidXRlKCdhc3luYycsICcnKVxyXG4gIGdvb2dsZU1hcFNjcmlwdC5zZXRBdHRyaWJ1dGUoJ2RlZmVyJywgJycpXHJcblxyXG4gIHJldHVybiBnb29nbGVNYXBTY3JpcHQ7XHJcbn1cclxuIiwiaW1wb3J0IHtFbnZ9IGZyb20gXCIuL3V0aWxzL2VudlwiO1xyXG5pbXBvcnQge2NyZWF0ZU1hcFNjcmlwdH0gZnJvbSBcIi4vdXRpbHMvY3JlYXRlLW1hcC1zY3JpcHRcIjtcclxuXHJcbmxldCBpc0FwaVNldFVwID0gZmFsc2VcclxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRHTWFwQXBpIChvcHRpb25zKSB7XHJcblxyXG4gIGlmIChFbnYuaXNTZXJ2ZXIoKSkge1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgaWYgKCFpc0FwaVNldFVwKSB7XHJcbiAgICBpc0FwaVNldFVwID0gdHJ1ZVxyXG4gICAgY29uc3QgZ29vZ2xlTWFwU2NyaXB0ID0gY3JlYXRlTWFwU2NyaXB0KG9wdGlvbnMpO1xyXG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChnb29nbGVNYXBTY3JpcHQpXHJcbiAgfSBlbHNlIHtcclxuICAgIHRocm93IG5ldyBFcnJvcignWW91IGFscmVhZHkgc3RhcnRlZCB0aGUgbG9hZGluZyBvZiBnb29nbGUgbWFwcycpXHJcbiAgfVxyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0ICh2dWVJbnN0LCBnb29nbGVNYXBzSW5zdCwgZXZlbnRzKSA9PiB7XHJcbiAgZm9yIChsZXQgZXZlbnROYW1lIG9mIGV2ZW50cykge1xyXG4gICAgY29uc3QgcHJvcE5hbWUgPSBgb24ke2V2ZW50TmFtZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKX0ke2V2ZW50TmFtZS5zbGljZSgxKX1gLnJlcGxhY2UoL1stX10rKC4pPy9nLCAoXywgYykgPT4gYyA/IGMudG9VcHBlckNhc2UoKSA6ICcnKTtcclxuXHJcbiAgICBpZiAodnVlSW5zdC4kcHJvcHNbcHJvcE5hbWVdIHx8IHZ1ZUluc3QuJGF0dHJzW3Byb3BOYW1lXSkge1xyXG4gICAgICBnb29nbGVNYXBzSW5zdC5hZGRMaXN0ZW5lcihldmVudE5hbWUsIChldikgPT4ge1xyXG4gICAgICAgIHZ1ZUluc3QuJGVtaXQoZXZlbnROYW1lLCBldilcclxuICAgICAgfSlcclxuICAgIH0gZWxzZSBpZiAodnVlSW5zdC4kZ21hcE9wdGlvbnMuYXV0b2JpbmRBbGxFdmVudHMgfHwgdnVlSW5zdC4kYXR0cnNbZXZlbnROYW1lXSkge1xyXG4gICAgICBnb29nbGVNYXBzSW5zdC5hZGRMaXN0ZW5lcihldmVudE5hbWUsIChldikgPT4ge1xyXG4gICAgICAgIHZ1ZUluc3QuJGVtaXQoZXZlbnROYW1lLCBldilcclxuICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIFdhdGNoIHRoZSBpbmRpdmlkdWFsIHByb3BlcnRpZXMgb2YgYSBQb0Qgb2JqZWN0LCBpbnN0ZWFkIG9mIHRoZSBvYmplY3RcclxuICogcGVyIHNlLiBUaGlzIGlzIGRpZmZlcmVudCBmcm9tIGEgZGVlcCB3YXRjaCB3aGVyZSBib3RoIHRoZSByZWZlcmVuY2VcclxuICogYW5kIHRoZSBpbmRpdmlkdWFsIHZhbHVlcyBhcmUgd2F0Y2hlZC5cclxuICpcclxuICogSW4gZWZmZWN0LCBpdCB0aHJvdHRsZXMgdGhlIG11bHRpcGxlICR3YXRjaCB0byBleGVjdXRlIGF0IG1vc3Qgb25jZSBwZXIgdGljay5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFdhdGNoUHJpbWl0aXZlUHJvcGVydGllcyhcclxuICB2dWVJbnN0LFxyXG4gIHByb3BlcnRpZXNUb1RyYWNrLFxyXG4gIGhhbmRsZXIsXHJcbiAgaW1tZWRpYXRlID0gZmFsc2VcclxuKSB7XHJcbiAgbGV0IGlzSGFuZGxlZCA9IGZhbHNlXHJcblxyXG4gIGZ1bmN0aW9uIHJlcXVlc3RIYW5kbGUoKSB7XHJcbiAgICBpZiAoIWlzSGFuZGxlZCkge1xyXG4gICAgICBpc0hhbmRsZWQgPSB0cnVlXHJcbiAgICAgIHZ1ZUluc3QuJG5leHRUaWNrKCgpID0+IHtcclxuICAgICAgICBpc0hhbmRsZWQgPSBmYWxzZVxyXG4gICAgICAgIGhhbmRsZXIoKVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZm9yIChsZXQgcHJvcCBvZiBwcm9wZXJ0aWVzVG9UcmFjaykge1xyXG4gICAgdnVlSW5zdC4kd2F0Y2gocHJvcCwgcmVxdWVzdEhhbmRsZSwgeyBpbW1lZGlhdGUgfSlcclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGNsYXNzIFN0ciB7XHJcbiAgc3RhdGljIGNhcGl0YWxpemVGaXJzdExldHRlcihzdHJpbmcpIHtcclxuICAgIHJldHVybiBzdHJpbmcuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHJpbmcuc2xpY2UoMSlcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IFdhdGNoUHJpbWl0aXZlUHJvcGVydGllcyBmcm9tICcuLi91dGlscy9XYXRjaFByaW1pdGl2ZVByb3BlcnRpZXMnXHJcbmltcG9ydCB7U3RyfSBmcm9tIFwiLi9zdHJpbmdcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRQcm9wc1ZhbHVlcyh2dWVJbnN0LCBwcm9wcykge1xyXG4gIHJldHVybiBPYmplY3Qua2V5cyhwcm9wcykucmVkdWNlKChhY2MsIHByb3ApID0+IHtcclxuICAgIGlmICh2dWVJbnN0W3Byb3BdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgYWNjW3Byb3BdID0gdnVlSW5zdFtwcm9wXVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFjY1xyXG4gIH0sIHt9KVxyXG59XHJcblxyXG4vKipcclxuICogQmluZHMgdGhlIHByb3BlcnRpZXMgZGVmaW5lZCBpbiBwcm9wcyB0byB0aGUgZ29vZ2xlIG1hcHMgaW5zdGFuY2UuXHJcbiAqIElmIHRoZSBwcm9wIGlzIGFuIE9iamVjdCB0eXBlLCBhbmQgd2Ugd2lzaCB0byB0cmFjayB0aGUgcHJvcGVydGllc1xyXG4gKiBvZiB0aGUgb2JqZWN0IChlLmcuIHRoZSBsYXQgYW5kIGxuZyBvZiBhIExhdExuZyksIHRoZW4gd2UgZG8gYSBkZWVwXHJcbiAqIHdhdGNoLiBGb3IgZGVlcCB3YXRjaCwgd2UgYWxzbyBwcmV2ZW50IHRoZSBfY2hhbmdlZCBldmVudCBmcm9tIGJlaW5nXHJcbiAqICRlbWl0dGVkIGlmIHRoZSBkYXRhIHNvdXJjZSB3YXMgZXh0ZXJuYWwuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gYmluZFByb3BzKHZ1ZUluc3QsIGdvb2dsZU1hcHNJbnN0LCBwcm9wcykge1xyXG4gIGZvciAobGV0IGF0dHJpYnV0ZSBpbiBwcm9wcykge1xyXG4gICAgbGV0IHsgdHdvV2F5LCB0eXBlLCB0cmFja1Byb3BlcnRpZXMsIG5vQmluZCB9ID0gcHJvcHNbYXR0cmlidXRlXVxyXG5cclxuICAgIGlmIChub0JpbmQpIGNvbnRpbnVlXHJcblxyXG4gICAgY29uc3Qgc2V0TWV0aG9kTmFtZSA9ICdzZXQnICsgU3RyLmNhcGl0YWxpemVGaXJzdExldHRlcihhdHRyaWJ1dGUpXHJcbiAgICBjb25zdCBnZXRNZXRob2ROYW1lID0gJ2dldCcgKyBTdHIuY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKGF0dHJpYnV0ZSlcclxuICAgIGNvbnN0IGV2ZW50TmFtZSA9IGF0dHJpYnV0ZS50b0xvd2VyQ2FzZSgpICsgJ19jaGFuZ2VkJ1xyXG4gICAgY29uc3QgaW5pdGlhbFZhbHVlID0gdnVlSW5zdFthdHRyaWJ1dGVdXHJcblxyXG4gICAgaWYgKHR5cGVvZiBnb29nbGVNYXBzSW5zdFtzZXRNZXRob2ROYW1lXSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFxyXG4gICAgICAgIGAke3NldE1ldGhvZE5hbWV9IGlzIG5vdCBhIG1ldGhvZCBvZiAodGhlIE1hcHMgb2JqZWN0IGNvcnJlc3BvbmRpbmcgdG8pICR7dnVlSW5zdC4kb3B0aW9ucy5fY29tcG9uZW50VGFnfWBcclxuICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFdlIG5lZWQgdG8gYXZvaWQgYW4gZW5kbGVzc1xyXG4gICAgLy8gcHJvcENoYW5nZWQgLT4gZXZlbnQgJGVtaXR0ZWQgLT4gcHJvcENoYW5nZWQgLT4gZXZlbnQgJGVtaXR0ZWQgbG9vcFxyXG4gICAgLy8gYWx0aG91Z2ggdGhpcyBtYXkgcmVhbGx5IGJlIHRoZSB1c2VyJ3MgcmVzcG9uc2liaWxpdHlcclxuICAgIGlmICh0eXBlICE9PSBPYmplY3QgfHwgIXRyYWNrUHJvcGVydGllcykge1xyXG4gICAgICAvLyBUcmFjayB0aGUgb2JqZWN0IGRlZXBseVxyXG4gICAgICB2dWVJbnN0LiR3YXRjaChhdHRyaWJ1dGUsXHJcbiAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgYXR0cmlidXRlVmFsdWUgPSB2dWVJbnN0W2F0dHJpYnV0ZV1cclxuXHJcbiAgICAgICAgICBnb29nbGVNYXBzSW5zdFtzZXRNZXRob2ROYW1lXShhdHRyaWJ1dGVWYWx1ZSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGltbWVkaWF0ZTogdHlwZW9mIGluaXRpYWxWYWx1ZSAhPT0gJ3VuZGVmaW5lZCcsXHJcbiAgICAgICAgICBkZWVwOiB0eXBlID09PSBPYmplY3QsXHJcbiAgICAgICAgfVxyXG4gICAgICApXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBXYXRjaFByaW1pdGl2ZVByb3BlcnRpZXMoXHJcbiAgICAgICAgdnVlSW5zdCxcclxuICAgICAgICB0cmFja1Byb3BlcnRpZXMubWFwKChwcm9wKSA9PiBgJHthdHRyaWJ1dGV9LiR7cHJvcH1gKSxcclxuICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICBnb29nbGVNYXBzSW5zdFtzZXRNZXRob2ROYW1lXSh2dWVJbnN0W2F0dHJpYnV0ZV0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICB2dWVJbnN0W2F0dHJpYnV0ZV0gIT09IHVuZGVmaW5lZFxyXG4gICAgICApXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHR3b1dheSAmJiAodnVlSW5zdC4kZ21hcE9wdGlvbnMuYXV0b2JpbmRBbGxFdmVudHMgfHwgdnVlSW5zdC4kYXR0cnNbZXZlbnROYW1lXSkpIHtcclxuICAgICAgZ29vZ2xlTWFwc0luc3QuYWRkTGlzdGVuZXIoZXZlbnROYW1lLCAoKSA9PiB7XHJcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gICAgICAgIHZ1ZUluc3QuJGVtaXQoZXZlbnROYW1lLCBnb29nbGVNYXBzSW5zdFtnZXRNZXRob2ROYW1lXSgpKVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCIvKipcclxuICogQGNsYXNzIE1hcEVsZW1lbnRNaXhpblxyXG4gKlxyXG4gKiBFeHRlbmRzIGNvbXBvbmVudHMgdG8gaW5jbHVkZSB0aGUgZm9sbG93aW5nIGZpZWxkczpcclxuICpcclxuICogQHByb3BlcnR5ICRtYXAgICAgICAgIFRoZSBHb29nbGUgbWFwICh2YWxpZCBvbmx5IGFmdGVyIHRoZSBwcm9taXNlIHJldHVybnMpXHJcbiAqXHJcbiAqXHJcbiAqICovXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBpbmplY3Q6IHtcclxuICAgICRtYXBQcm9taXNlOiB7IGRlZmF1bHQ6ICdhYmNkZWYnIH0sXHJcbiAgfSxcclxuXHJcbiAgcHJvdmlkZSgpIHtcclxuICAgIC8vIE5vdGU6IGFsdGhvdWdoIHRoaXMgbWl4aW4gaXMgbm90IFwicHJvdmlkaW5nXCIgYW55dGhpbmcsXHJcbiAgICAvLyBjb21wb25lbnRzJyBleHBlY3QgdGhlIGAkbWFwYCBwcm9wZXJ0eSB0byBiZSBwcmVzZW50IG9uIHRoZSBjb21wb25lbnQuXHJcbiAgICAvLyBJbiBvcmRlciBmb3IgdGhhdCB0byBoYXBwZW4sIHRoaXMgbWl4aW4gbXVzdCBpbnRlcmNlcHQgdGhlICRtYXBQcm9taXNlXHJcbiAgICAvLyAudGhlbigoKSA9PikgZmlyc3QgYmVmb3JlIGl0cyBjb21wb25lbnQgZG9lcyBzby5cclxuICAgIC8vXHJcbiAgICAvLyBTaW5jZSBhIHByb3ZpZGUoKSBvbiBhIG1peGluIGlzIGV4ZWN1dGVkIGJlZm9yZSBhIHByb3ZpZGUoKSBvbiB0aGVcclxuICAgIC8vIGNvbXBvbmVudCwgcHV0dGluZyB0aGlzIGNvZGUgaW4gcHJvdmlkZSgpIGVuc3VyZXMgdGhhdCB0aGUgJG1hcCBpc1xyXG4gICAgLy8gYWxyZWFkeSBzZXQgYnkgdGhlIHRpbWUgdGhlXHJcbiAgICAvLyBjb21wb25lbnQncyBwcm92aWRlKCkgaXMgY2FsbGVkLlxyXG4gICAgdGhpcy4kbWFwUHJvbWlzZS50aGVuKChtYXApID0+IHtcclxuICAgICAgdGhpcy4kbWFwID0gbWFwXHJcbiAgICB9KVxyXG5cclxuICAgIHJldHVybiB7fVxyXG4gIH0sXHJcbn1cclxuIiwiaW1wb3J0IGJpbmRFdmVudHMgZnJvbSAnLi4vdXRpbHMvYmluZEV2ZW50cy5qcydcclxuaW1wb3J0IHsgYmluZFByb3BzLCBnZXRQcm9wc1ZhbHVlcyB9IGZyb20gJy4uL3V0aWxzL2JpbmRQcm9wcy5qcydcclxuaW1wb3J0IE1hcEVsZW1lbnRNaXhpbiBmcm9tICcuL21hcEVsZW1lbnRNaXhpbidcclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xyXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5tYXBwZWRQcm9wcyAtIERlZmluaXRpb25zIG9mIHByb3BzXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLm1hcHBlZFByb3BzLlBST1AudHlwZSAtIFZhbHVlIHR5cGVcclxuICogQHBhcmFtIHtCb29sZWFufSBvcHRpb25zLm1hcHBlZFByb3BzLlBST1AudHdvV2F5XHJcbiAqICAtIFdoZXRoZXIgdGhlIHByb3AgaGFzIGEgY29ycmVzcG9uZGluZyBQUk9QX2NoYW5nZWRcclxuICogICBldmVudFxyXG4gKiBAcGFyYW0ge0Jvb2xlYW59IG9wdGlvbnMubWFwcGVkUHJvcHMuUFJPUC5ub0JpbmRcclxuICogIC0gSWYgdHJ1ZSwgZG8gbm90IGFwcGx5IHRoZSBkZWZhdWx0IGJpbmRQcm9wcyAvIGJpbmRFdmVudHMuXHJcbiAqIEhvd2V2ZXIgaXQgd2lsbCBzdGlsbCBiZSBhZGRlZCB0byB0aGUgbGlzdCBvZiBjb21wb25lbnQgcHJvcHNcclxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMucHJvcHMgLSBSZWd1bGFyIFZ1ZS1zdHlsZSBwcm9wcy5cclxuICogIE5vdGU6IG11c3QgYmUgaW4gdGhlIE9iamVjdCBmb3JtIGJlY2F1c2UgaXQgd2lsbCBiZVxyXG4gKiAgbWVyZ2VkIHdpdGggdGhlIGBtYXBwZWRQcm9wc2BcclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMuZXZlbnRzIC0gR29vZ2xlIE1hcHMgQVBJIGV2ZW50c1xyXG4gKiAgdGhhdCBhcmUgbm90IGJvdW5kIHRvIGEgY29ycmVzcG9uZGluZyBwcm9wXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBvcHRpb25zLm5hbWUgLSBlLmcuIGBwb2x5bGluZWBcclxuICogQHBhcmFtIHs9PiBTdHJpbmd9IG9wdGlvbnMuY3RyIC0gY29uc3RydWN0b3IsIGUuZy5cclxuICogIGBnb29nbGUubWFwcy5Qb2x5bGluZWAuIEhvd2V2ZXIsIHNpbmNlIHRoaXMgaXMgbm90XHJcbiAqICBnZW5lcmFsbHkgYXZhaWxhYmxlIGR1cmluZyBsaWJyYXJ5IGxvYWQsIHRoaXMgYmVjb21lc1xyXG4gKiAgYSBmdW5jdGlvbiBpbnN0ZWFkLCBlLmcuICgpID0+IGdvb2dsZS5tYXBzLlBvbHlsaW5lXHJcbiAqICB3aGljaCB3aWxsIGJlIGNhbGxlZCBvbmx5IGFmdGVyIHRoZSBBUEkgaGFzIGJlZW4gbG9hZGVkXHJcbiAqIEBwYXJhbSB7KE1hcHBlZFByb3BzLCBPdGhlclZ1ZVByb3BzKSA9PiBBcnJheX0gb3B0aW9ucy5jdHJBcmdzIC1cclxuICogICBJZiB0aGUgY29uc3RydWN0b3IgaW4gYGN0cmAgbmVlZHMgdG8gYmUgY2FsbGVkIHdpdGhcclxuICogICBhcmd1bWVudHMgb3RoZXIgdGhhbiBhIHNpbmdsZSBgb3B0aW9uc2Agb2JqZWN0LCBlLmcuIGZvclxyXG4gKiAgIEdyb3VuZE92ZXJsYXksIHdlIGNhbGwgYG5ldyBHcm91bmRPdmVybGF5KHVybCwgYm91bmRzLCBvcHRpb25zKWBcclxuICogICB0aGVuIHBhc3MgaW4gYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIGFyZ3VtZW50IGxpc3QgYXMgYW4gYXJyYXlcclxuICpcclxuICogT3RoZXJ3aXNlLCB0aGUgY29uc3RydWN0b3Igd2lsbCBiZSBjYWxsZWQgd2l0aCBhbiBgb3B0aW9uc2Agb2JqZWN0LFxyXG4gKiAgIHdpdGggcHJvcGVydHkgYW5kIHZhbHVlcyBtZXJnZWQgZnJvbTpcclxuICpcclxuICogICAxLiB0aGUgYG9wdGlvbnNgIHByb3BlcnR5LCBpZiBhbnlcclxuICogICAyLiBhIGBtYXBgIHByb3BlcnR5IHdpdGggdGhlIEdvb2dsZSBNYXBzXHJcbiAqICAgMy4gYWxsIHRoZSBwcm9wZXJ0aWVzIHBhc3NlZCB0byB0aGUgY29tcG9uZW50IGluIGBtYXBwZWRQcm9wc2BcclxuICogQHBhcmFtIHtPYmplY3QgPT4gQW55fSBvcHRpb25zLmJlZm9yZUNyZWF0ZSAtXHJcbiAqICBIb29rIHRvIG1vZGlmeSB0aGUgb3B0aW9ucyBwYXNzZWQgdG8gdGhlIGluaXRpYWxpemVyXHJcbiAqIEBwYXJhbSB7KG9wdGlvbnMuY3RyLCBPYmplY3QpID0+IEFueX0gb3B0aW9ucy5hZnRlckNyZWF0ZSAtXHJcbiAqICBIb29rIGNhbGxlZCB3aGVuXHJcbiAqXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAob3B0aW9ucykge1xyXG4gIGNvbnN0IHtcclxuICAgIG1hcHBlZFByb3BzLFxyXG4gICAgbmFtZSxcclxuICAgIGN0cixcclxuICAgIGN0ckFyZ3MsXHJcbiAgICBldmVudHMsXHJcbiAgICBiZWZvcmVDcmVhdGUsXHJcbiAgICBhZnRlckNyZWF0ZSxcclxuICAgIHByb3BzLFxyXG4gICAgLi4ucmVzdFxyXG4gIH0gPSBvcHRpb25zXHJcblxyXG4gIGNvbnN0IHByb21pc2VOYW1lID0gYCQke25hbWV9UHJvbWlzZWBcclxuICBjb25zdCBpbnN0YW5jZU5hbWUgPSBgJCR7bmFtZX1PYmplY3RgXHJcblxyXG4gIGFzc2VydCghKHJlc3QucHJvcHMgaW5zdGFuY2VvZiBBcnJheSksICdgcHJvcHNgIHNob3VsZCBiZSBhbiBvYmplY3QsIG5vdCBBcnJheScpXHJcblxyXG4gIHJldHVybiB7XHJcbiAgICAuLi4odHlwZW9mIEdFTkVSQVRFX0RPQyAhPT0gJ3VuZGVmaW5lZCcgPyB7ICR2Z21PcHRpb25zOiBvcHRpb25zIH0gOiB7fSksXHJcbiAgICBtaXhpbnM6IFtNYXBFbGVtZW50TWl4aW5dLFxyXG4gICAgcHJvcHM6IHtcclxuICAgICAgLi4ucHJvcHMsXHJcbiAgICAgIC4uLm1hcHBlZFByb3BzVG9WdWVQcm9wcyhtYXBwZWRQcm9wcyksXHJcbiAgICB9LFxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICByZXR1cm4gJydcclxuICAgIH0sXHJcbiAgICBwcm92aWRlKCkge1xyXG4gICAgICBjb25zdCBwcm9taXNlID0gdGhpcy4kbWFwUHJvbWlzZVxyXG4gICAgICAgIC50aGVuKChtYXApID0+IHtcclxuICAgICAgICAgIC8vIEluZm93aW5kb3cgbmVlZHMgdGhpcyB0byBiZSBpbW1lZGlhdGVseSBhdmFpbGFibGVcclxuICAgICAgICAgIHRoaXMuJG1hcCA9IG1hcFxyXG5cclxuICAgICAgICAgIC8vIEluaXRpYWxpemUgdGhlIG1hcHMgd2l0aCB0aGUgZ2l2ZW4gb3B0aW9uc1xyXG4gICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgLi4udGhpcy5vcHRpb25zLFxyXG4gICAgICAgICAgICBtYXAsXHJcbiAgICAgICAgICAgIC4uLmdldFByb3BzVmFsdWVzKHRoaXMsIG1hcHBlZFByb3BzKSxcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGRlbGV0ZSBvcHRpb25zLm9wdGlvbnMgLy8gZGVsZXRlIHRoZSBleHRyYSBvcHRpb25zXHJcblxyXG4gICAgICAgICAgaWYgKGJlZm9yZUNyZWF0ZSkge1xyXG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBiZWZvcmVDcmVhdGUuYmluZCh0aGlzKShvcHRpb25zKVxyXG5cclxuICAgICAgICAgICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIFByb21pc2UpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LnRoZW4oKCkgPT4gKHsgb3B0aW9ucyB9KSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIHsgb3B0aW9ucyB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbigoeyBvcHRpb25zIH0pID0+IHtcclxuICAgICAgICAgIGNvbnN0IENvbnN0cnVjdG9yT2JqZWN0ID0gY3RyKClcclxuICAgICAgICAgIC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzE2MDY3OTcvdXNlLW9mLWFwcGx5LXdpdGgtbmV3LW9wZXJhdG9yLWlzLXRoaXMtcG9zc2libGVcclxuICAgICAgICAgIHRoaXNbaW5zdGFuY2VOYW1lXSA9IGN0ckFyZ3NcclxuICAgICAgICAgICAgPyBuZXcgKEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kLmNhbGwoXHJcbiAgICAgICAgICAgICAgICBDb25zdHJ1Y3Rvck9iamVjdCxcclxuICAgICAgICAgICAgICAgIG51bGwsXHJcbiAgICAgICAgICAgICAgICAuLi5jdHJBcmdzKG9wdGlvbnMsIGdldFByb3BzVmFsdWVzKHRoaXMsIHByb3BzIHx8IHt9KSlcclxuICAgICAgICAgICAgICApKSgpXHJcbiAgICAgICAgICAgIDogbmV3IENvbnN0cnVjdG9yT2JqZWN0KG9wdGlvbnMpXHJcblxyXG4gICAgICAgICAgYmluZFByb3BzKHRoaXMsIHRoaXNbaW5zdGFuY2VOYW1lXSwgbWFwcGVkUHJvcHMpXHJcbiAgICAgICAgICBiaW5kRXZlbnRzKHRoaXMsIHRoaXNbaW5zdGFuY2VOYW1lXSwgZXZlbnRzKVxyXG5cclxuICAgICAgICAgIGlmIChhZnRlckNyZWF0ZSkge1xyXG4gICAgICAgICAgICBhZnRlckNyZWF0ZS5iaW5kKHRoaXMpKHRoaXNbaW5zdGFuY2VOYW1lXSlcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiB0aGlzW2luc3RhbmNlTmFtZV1cclxuICAgICAgICB9KVxyXG4gICAgICB0aGlzW3Byb21pc2VOYW1lXSA9IHByb21pc2VcclxuICAgICAgcmV0dXJuIHsgW3Byb21pc2VOYW1lXTogcHJvbWlzZSB9XHJcbiAgICB9LFxyXG4gICAgdW5tb3VudGVkKCkge1xyXG4gICAgICAvLyBOb3RlOiBub3QgYWxsIEdvb2dsZSBNYXBzIGNvbXBvbmVudHMgc3VwcG9ydCBtYXBzXHJcbiAgICAgIGlmICh0aGlzW2luc3RhbmNlTmFtZV0gJiYgdGhpc1tpbnN0YW5jZU5hbWVdLnNldE1hcCkge1xyXG4gICAgICAgIHRoaXNbaW5zdGFuY2VOYW1lXS5zZXRNYXAobnVsbClcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIC4uLnJlc3QsXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBhc3NlcnQodiwgbWVzc2FnZSkge1xyXG4gIGlmICghdikgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTdHJpcHMgb3V0IHRoZSBleHRyYW5lb3VzIHByb3BlcnRpZXMgd2UgaGF2ZSBpbiBvdXJcclxuICogcHJvcHMgZGVmaW5pdGlvbnNcclxuICogQHBhcmFtIHtPYmplY3R9IHByb3BzXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbWFwcGVkUHJvcHNUb1Z1ZVByb3BzKG1hcHBlZFByb3BzKSB7XHJcbiAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKG1hcHBlZFByb3BzKVxyXG4gICAgLm1hcCgoW2tleSwgcHJvcF0pID0+IHtcclxuICAgICAgY29uc3QgdmFsdWUgPSB7fVxyXG5cclxuICAgICAgaWYgKCd0eXBlJyBpbiBwcm9wKSB2YWx1ZS50eXBlID0gcHJvcC50eXBlXHJcbiAgICAgIGlmICgnZGVmYXVsdCcgaW4gcHJvcCkgdmFsdWUuZGVmYXVsdCA9IHByb3AuZGVmYXVsdFxyXG4gICAgICBpZiAoJ3JlcXVpcmVkJyBpbiBwcm9wKSB2YWx1ZS5yZXF1aXJlZCA9IHByb3AucmVxdWlyZWRcclxuXHJcbiAgICAgIHJldHVybiBba2V5LCB2YWx1ZV1cclxuICAgIH0pXHJcbiAgICAucmVkdWNlKChhY2MsIFtrZXksIHZhbF0pID0+IHtcclxuICAgICAgYWNjW2tleV0gPSB2YWxcclxuICAgICAgcmV0dXJuIGFjY1xyXG4gICAgfSwge30pXHJcbn1cclxuIiwiaW1wb3J0IGJ1aWxkQ29tcG9uZW50IGZyb20gJy4vYnVpbGQtY29tcG9uZW50LmpzJ1xyXG5cclxuY29uc3QgcHJvcHMgPSB7XHJcbiAgZHJhZ2dhYmxlOiB7XHJcbiAgICB0eXBlOiBCb29sZWFuLFxyXG4gIH0sXHJcbiAgZWRpdGFibGU6IHtcclxuICAgIHR5cGU6IEJvb2xlYW4sXHJcbiAgfSxcclxuICBvcHRpb25zOiB7XHJcbiAgICB0d29XYXk6IGZhbHNlLFxyXG4gICAgdHlwZTogT2JqZWN0LFxyXG4gIH0sXHJcbiAgcGF0aDoge1xyXG4gICAgdHlwZTogQXJyYXksXHJcbiAgICB0d29XYXk6IHRydWUsXHJcbiAgfSxcclxufVxyXG5cclxuY29uc3QgZXZlbnRzID0gW1xyXG4gICdjbGljaycsXHJcbiAgJ2RibGNsaWNrJyxcclxuICAnZHJhZycsXHJcbiAgJ2RyYWdlbmQnLFxyXG4gICdkcmFnc3RhcnQnLFxyXG4gICdtb3VzZWRvd24nLFxyXG4gICdtb3VzZW1vdmUnLFxyXG4gICdtb3VzZW91dCcsXHJcbiAgJ21vdXNlb3ZlcicsXHJcbiAgJ21vdXNldXAnLFxyXG4gICdyaWdodGNsaWNrJyxcclxuXVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYnVpbGRDb21wb25lbnQoe1xyXG4gIG1hcHBlZFByb3BzOiBwcm9wcyxcclxuICBwcm9wczoge1xyXG4gICAgZGVlcFdhdGNoOiB7XHJcbiAgICAgIHR5cGU6IEJvb2xlYW4sXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGV2ZW50cyxcclxuXHJcbiAgbmFtZTogJ3BvbHlsaW5lJyxcclxuICBjdHI6ICgpID0+IGdvb2dsZS5tYXBzLlBvbHlsaW5lLFxyXG5cclxuICBhZnRlckNyZWF0ZSgpIHtcclxuICAgIGxldCBjbGVhckV2ZW50cyA9ICgpID0+IHt9XHJcblxyXG4gICAgdGhpcy4kd2F0Y2goXHJcbiAgICAgICdwYXRoJyxcclxuICAgICAgKHBhdGgpID0+IHtcclxuICAgICAgICBpZiAocGF0aCkge1xyXG4gICAgICAgICAgY2xlYXJFdmVudHMoKVxyXG5cclxuICAgICAgICAgIHRoaXMuJHBvbHlsaW5lT2JqZWN0LnNldFBhdGgocGF0aClcclxuXHJcbiAgICAgICAgICBjb25zdCBtdmNQYXRoID0gdGhpcy4kcG9seWxpbmVPYmplY3QuZ2V0UGF0aCgpXHJcbiAgICAgICAgICBjb25zdCBldmVudExpc3RlbmVycyA9IFtdXHJcblxyXG4gICAgICAgICAgY29uc3QgdXBkYXRlUGF0aHMgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuJGVtaXQoJ3BhdGhfY2hhbmdlZCcsIHRoaXMuJHBvbHlsaW5lT2JqZWN0LmdldFBhdGgoKSlcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBldmVudExpc3RlbmVycy5wdXNoKFttdmNQYXRoLCBtdmNQYXRoLmFkZExpc3RlbmVyKCdpbnNlcnRfYXQnLCB1cGRhdGVQYXRocyldKVxyXG4gICAgICAgICAgZXZlbnRMaXN0ZW5lcnMucHVzaChbbXZjUGF0aCwgbXZjUGF0aC5hZGRMaXN0ZW5lcigncmVtb3ZlX2F0JywgdXBkYXRlUGF0aHMpXSlcclxuICAgICAgICAgIGV2ZW50TGlzdGVuZXJzLnB1c2goW212Y1BhdGgsIG12Y1BhdGguYWRkTGlzdGVuZXIoJ3NldF9hdCcsIHVwZGF0ZVBhdGhzKV0pXHJcblxyXG4gICAgICAgICAgY2xlYXJFdmVudHMgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGV2ZW50TGlzdGVuZXJzLm1hcCgoXHJcbiAgICAgICAgICAgICAgW29iaiwgbGlzdGVuZXJIYW5kbGVdIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuICAgICAgICAgICAgKSA9PiBnb29nbGUubWFwcy5ldmVudC5yZW1vdmVMaXN0ZW5lcihsaXN0ZW5lckhhbmRsZSkpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgZGVlcDogdGhpcy5kZWVwV2F0Y2gsXHJcbiAgICAgICAgaW1tZWRpYXRlOiB0cnVlLFxyXG4gICAgICB9XHJcbiAgICApXHJcbiAgfSxcclxufSlcclxuIiwiaW1wb3J0IGJ1aWxkQ29tcG9uZW50IGZyb20gJy4vYnVpbGQtY29tcG9uZW50LmpzJ1xyXG5cclxuY29uc3QgcHJvcHMgPSB7XHJcbiAgZHJhZ2dhYmxlOiB7XHJcbiAgICB0eXBlOiBCb29sZWFuLFxyXG4gIH0sXHJcbiAgZWRpdGFibGU6IHtcclxuICAgIHR5cGU6IEJvb2xlYW4sXHJcbiAgfSxcclxuICBvcHRpb25zOiB7XHJcbiAgICB0eXBlOiBPYmplY3QsXHJcbiAgfSxcclxuICBwYXRoOiB7XHJcbiAgICB0eXBlOiBBcnJheSxcclxuICAgIHR3b1dheTogdHJ1ZSxcclxuICAgIG5vQmluZDogdHJ1ZSxcclxuICB9LFxyXG4gIHBhdGhzOiB7XHJcbiAgICB0eXBlOiBBcnJheSxcclxuICAgIHR3b1dheTogdHJ1ZSxcclxuICAgIG5vQmluZDogdHJ1ZSxcclxuICB9LFxyXG59XHJcblxyXG5jb25zdCBldmVudHMgPSBbXHJcbiAgJ2NsaWNrJyxcclxuICAnZGJsY2xpY2snLFxyXG4gICdkcmFnJyxcclxuICAnZHJhZ2VuZCcsXHJcbiAgJ2RyYWdzdGFydCcsXHJcbiAgJ21vdXNlZG93bicsXHJcbiAgJ21vdXNlbW92ZScsXHJcbiAgJ21vdXNlb3V0JyxcclxuICAnbW91c2VvdmVyJyxcclxuICAnbW91c2V1cCcsXHJcbiAgJ3JpZ2h0Y2xpY2snLFxyXG5dXHJcblxyXG5leHBvcnQgZGVmYXVsdCBidWlsZENvbXBvbmVudCh7XHJcbiAgcHJvcHM6IHtcclxuICAgIGRlZXBXYXRjaDoge1xyXG4gICAgICB0eXBlOiBCb29sZWFuLFxyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBldmVudHMsXHJcbiAgbWFwcGVkUHJvcHM6IHByb3BzLFxyXG4gIG5hbWU6ICdwb2x5Z29uJyxcclxuICBjdHI6ICgpID0+IGdvb2dsZS5tYXBzLlBvbHlnb24sXHJcblxyXG4gIGJlZm9yZUNyZWF0ZShvcHRpb25zKSB7XHJcbiAgICBpZiAoIW9wdGlvbnMucGF0aCkgZGVsZXRlIG9wdGlvbnMucGF0aFxyXG4gICAgaWYgKCFvcHRpb25zLnBhdGhzKSBkZWxldGUgb3B0aW9ucy5wYXRoc1xyXG4gIH0sXHJcblxyXG4gIGFmdGVyQ3JlYXRlKGluc3QpIHtcclxuICAgIGxldCBjbGVhckV2ZW50cyA9ICgpID0+IHt9XHJcblxyXG4gICAgLy8gV2F0Y2ggcGF0aHMsIG9uIG91ciBvd24sIGJlY2F1c2Ugd2UgZG8gbm90IHdhbnQgdG8gc2V0IGVpdGhlciB3aGVuIGl0IGlzXHJcbiAgICAvLyBlbXB0eVxyXG4gICAgdGhpcy4kd2F0Y2goXHJcbiAgICAgICdwYXRocycsXHJcbiAgICAgIChwYXRocykgPT4ge1xyXG4gICAgICAgIGlmIChwYXRocykge1xyXG4gICAgICAgICAgY2xlYXJFdmVudHMoKVxyXG5cclxuICAgICAgICAgIGluc3Quc2V0UGF0aHMocGF0aHMpXHJcblxyXG4gICAgICAgICAgY29uc3QgdXBkYXRlUGF0aHMgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuJGVtaXQoJ3BhdGhzX2NoYW5nZWQnLCBpbnN0LmdldFBhdGhzKCkpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBjb25zdCBldmVudExpc3RlbmVycyA9IFtdXHJcblxyXG4gICAgICAgICAgY29uc3QgbXZjQXJyYXkgPSBpbnN0LmdldFBhdGhzKClcclxuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbXZjQXJyYXkuZ2V0TGVuZ3RoKCk7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgbXZjUGF0aCA9IG12Y0FycmF5LmdldEF0KGkpXHJcbiAgICAgICAgICAgIGV2ZW50TGlzdGVuZXJzLnB1c2goW212Y1BhdGgsIG12Y1BhdGguYWRkTGlzdGVuZXIoJ2luc2VydF9hdCcsIHVwZGF0ZVBhdGhzKV0pXHJcbiAgICAgICAgICAgIGV2ZW50TGlzdGVuZXJzLnB1c2goW212Y1BhdGgsIG12Y1BhdGguYWRkTGlzdGVuZXIoJ3JlbW92ZV9hdCcsIHVwZGF0ZVBhdGhzKV0pXHJcbiAgICAgICAgICAgIGV2ZW50TGlzdGVuZXJzLnB1c2goW212Y1BhdGgsIG12Y1BhdGguYWRkTGlzdGVuZXIoJ3NldF9hdCcsIHVwZGF0ZVBhdGhzKV0pXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBldmVudExpc3RlbmVycy5wdXNoKFttdmNBcnJheSwgbXZjQXJyYXkuYWRkTGlzdGVuZXIoJ2luc2VydF9hdCcsIHVwZGF0ZVBhdGhzKV0pXHJcbiAgICAgICAgICBldmVudExpc3RlbmVycy5wdXNoKFttdmNBcnJheSwgbXZjQXJyYXkuYWRkTGlzdGVuZXIoJ3JlbW92ZV9hdCcsIHVwZGF0ZVBhdGhzKV0pXHJcbiAgICAgICAgICBldmVudExpc3RlbmVycy5wdXNoKFttdmNBcnJheSwgbXZjQXJyYXkuYWRkTGlzdGVuZXIoJ3NldF9hdCcsIHVwZGF0ZVBhdGhzKV0pXHJcblxyXG4gICAgICAgICAgY2xlYXJFdmVudHMgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGV2ZW50TGlzdGVuZXJzLm1hcCgoXHJcbiAgICAgICAgICAgICAgW29iaiwgbGlzdGVuZXJIYW5kbGVdIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuICAgICAgICAgICAgKSA9PiBnb29nbGUubWFwcy5ldmVudC5yZW1vdmVMaXN0ZW5lcihsaXN0ZW5lckhhbmRsZSkpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgZGVlcDogdGhpcy5kZWVwV2F0Y2gsXHJcbiAgICAgICAgaW1tZWRpYXRlOiB0cnVlLFxyXG4gICAgICB9XHJcbiAgICApXHJcblxyXG4gICAgdGhpcy4kd2F0Y2goXHJcbiAgICAgICdwYXRoJyxcclxuICAgICAgKHBhdGgpID0+IHtcclxuICAgICAgICBpZiAocGF0aCkge1xyXG4gICAgICAgICAgY2xlYXJFdmVudHMoKVxyXG5cclxuICAgICAgICAgIGluc3Quc2V0UGF0aHMocGF0aClcclxuXHJcbiAgICAgICAgICBjb25zdCBtdmNQYXRoID0gaW5zdC5nZXRQYXRoKClcclxuICAgICAgICAgIGNvbnN0IGV2ZW50TGlzdGVuZXJzID0gW11cclxuXHJcbiAgICAgICAgICBjb25zdCB1cGRhdGVQYXRocyA9ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy4kZW1pdCgncGF0aF9jaGFuZ2VkJywgaW5zdC5nZXRQYXRoKCkpXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgZXZlbnRMaXN0ZW5lcnMucHVzaChbbXZjUGF0aCwgbXZjUGF0aC5hZGRMaXN0ZW5lcignaW5zZXJ0X2F0JywgdXBkYXRlUGF0aHMpXSlcclxuICAgICAgICAgIGV2ZW50TGlzdGVuZXJzLnB1c2goW212Y1BhdGgsIG12Y1BhdGguYWRkTGlzdGVuZXIoJ3JlbW92ZV9hdCcsIHVwZGF0ZVBhdGhzKV0pXHJcbiAgICAgICAgICBldmVudExpc3RlbmVycy5wdXNoKFttdmNQYXRoLCBtdmNQYXRoLmFkZExpc3RlbmVyKCdzZXRfYXQnLCB1cGRhdGVQYXRocyldKVxyXG5cclxuICAgICAgICAgIGNsZWFyRXZlbnRzID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBldmVudExpc3RlbmVycy5tYXAoKFxyXG4gICAgICAgICAgICAgIFtvYmosIGxpc3RlbmVySGFuZGxlXSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXHJcbiAgICAgICAgICAgICkgPT4gZ29vZ2xlLm1hcHMuZXZlbnQucmVtb3ZlTGlzdGVuZXIobGlzdGVuZXJIYW5kbGUpKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIGRlZXA6IHRoaXMuZGVlcFdhdGNoLFxyXG4gICAgICAgIGltbWVkaWF0ZTogdHJ1ZSxcclxuICAgICAgfVxyXG4gICAgKVxyXG4gIH0sXHJcbn0pXHJcbiIsImltcG9ydCBidWlsZENvbXBvbmVudCBmcm9tICcuL2J1aWxkLWNvbXBvbmVudCdcclxuXHJcbmNvbnN0IHByb3BzID0ge1xyXG4gIGNlbnRlcjoge1xyXG4gICAgdHlwZTogT2JqZWN0LFxyXG4gICAgdHdvV2F5OiB0cnVlLFxyXG4gICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgfSxcclxuICByYWRpdXM6IHtcclxuICAgIHR5cGU6IE51bWJlcixcclxuICAgIHR3b1dheTogdHJ1ZSxcclxuICB9LFxyXG4gIGRyYWdnYWJsZToge1xyXG4gICAgdHlwZTogQm9vbGVhbixcclxuICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gIH0sXHJcbiAgZWRpdGFibGU6IHtcclxuICAgIHR5cGU6IEJvb2xlYW4sXHJcbiAgICBkZWZhdWx0OiBmYWxzZSxcclxuICB9LFxyXG4gIG9wdGlvbnM6IHtcclxuICAgIHR5cGU6IE9iamVjdCxcclxuICAgIHR3b1dheTogZmFsc2UsXHJcbiAgfSxcclxufVxyXG5cclxuY29uc3QgZXZlbnRzID0gW1xyXG4gICdjbGljaycsXHJcbiAgJ2RibGNsaWNrJyxcclxuICAnZHJhZycsXHJcbiAgJ2RyYWdlbmQnLFxyXG4gICdkcmFnc3RhcnQnLFxyXG4gICdtb3VzZWRvd24nLFxyXG4gICdtb3VzZW1vdmUnLFxyXG4gICdtb3VzZW91dCcsXHJcbiAgJ21vdXNlb3ZlcicsXHJcbiAgJ21vdXNldXAnLFxyXG4gICdyaWdodGNsaWNrJyxcclxuXVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYnVpbGRDb21wb25lbnQoe1xyXG4gIG1hcHBlZFByb3BzOiBwcm9wcyxcclxuICBuYW1lOiAnY2lyY2xlJyxcclxuICBjdHI6ICgpID0+IGdvb2dsZS5tYXBzLkNpcmNsZSxcclxuICBldmVudHMsXHJcbn0pXHJcbiIsImltcG9ydCBidWlsZENvbXBvbmVudCBmcm9tICcuL2J1aWxkLWNvbXBvbmVudC5qcydcclxuXHJcbmNvbnN0IHByb3BzID0ge1xyXG4gIGJvdW5kczoge1xyXG4gICAgdHlwZTogT2JqZWN0LFxyXG4gICAgdHdvV2F5OiB0cnVlLFxyXG4gIH0sXHJcbiAgZHJhZ2dhYmxlOiB7XHJcbiAgICB0eXBlOiBCb29sZWFuLFxyXG4gICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgfSxcclxuICBlZGl0YWJsZToge1xyXG4gICAgdHlwZTogQm9vbGVhbixcclxuICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gIH0sXHJcbiAgb3B0aW9uczoge1xyXG4gICAgdHlwZTogT2JqZWN0LFxyXG4gICAgdHdvV2F5OiBmYWxzZSxcclxuICB9LFxyXG59XHJcblxyXG5jb25zdCBldmVudHMgPSBbXHJcbiAgJ2NsaWNrJyxcclxuICAnZGJsY2xpY2snLFxyXG4gICdkcmFnJyxcclxuICAnZHJhZ2VuZCcsXHJcbiAgJ2RyYWdzdGFydCcsXHJcbiAgJ21vdXNlZG93bicsXHJcbiAgJ21vdXNlbW92ZScsXHJcbiAgJ21vdXNlb3V0JyxcclxuICAnbW91c2VvdmVyJyxcclxuICAnbW91c2V1cCcsXHJcbiAgJ3JpZ2h0Y2xpY2snLFxyXG5dXHJcblxyXG5leHBvcnQgZGVmYXVsdCBidWlsZENvbXBvbmVudCh7XHJcbiAgbWFwcGVkUHJvcHM6IHByb3BzLFxyXG4gIG5hbWU6ICdyZWN0YW5nbGUnLFxyXG4gIGN0cjogKCkgPT4gZ29vZ2xlLm1hcHMuUmVjdGFuZ2xlLFxyXG4gIGV2ZW50cyxcclxufSlcclxuIiwiPHRlbXBsYXRlPlxyXG4gIDxkaXYgQGNsaWNrPVwiKCk9PiB7Y29uc29sZS5sb2coJ3NkZnNkJyl9XCI+XHJcbiAgICA8c2xvdD48L3Nsb3Q+XHJcbiAgPC9kaXY+XHJcbjwvdGVtcGxhdGU+XHJcbjxzY3JpcHQ+XHJcblxyXG5pbXBvcnQgYnVpbGRDb21wb25lbnQgZnJvbSAnLi9idWlsZC1jb21wb25lbnQuanMnXHJcblxyXG5jb25zdCBwcm9wcyA9IHtcclxuICBhbmltYXRpb246IHtcclxuICAgIHR3b1dheTogdHJ1ZSxcclxuICAgIHR5cGU6IE51bWJlcixcclxuICB9LFxyXG4gIGF0dHJpYnV0aW9uOiB7XHJcbiAgICB0eXBlOiBPYmplY3QsXHJcbiAgfSxcclxuICBjbGlja2FibGU6IHtcclxuICAgIHR5cGU6IEJvb2xlYW4sXHJcbiAgICB0d29XYXk6IHRydWUsXHJcbiAgICBkZWZhdWx0OiB0cnVlLFxyXG4gIH0sXHJcbiAgY3Vyc29yOiB7XHJcbiAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICB0d29XYXk6IHRydWUsXHJcbiAgfSxcclxuICBkcmFnZ2FibGU6IHtcclxuICAgIHR5cGU6IEJvb2xlYW4sXHJcbiAgICB0d29XYXk6IHRydWUsXHJcbiAgICBkZWZhdWx0OiBmYWxzZSxcclxuICB9LFxyXG4gIGljb246IHtcclxuICAgIHR3b1dheTogdHJ1ZSxcclxuICB9LFxyXG4gIGxhYmVsOiB7fSxcclxuICBvcGFjaXR5OiB7XHJcbiAgICB0eXBlOiBOdW1iZXIsXHJcbiAgICBkZWZhdWx0OiAxLFxyXG4gIH0sXHJcbiAgb3B0aW9uczoge1xyXG4gICAgdHlwZTogT2JqZWN0LFxyXG4gIH0sXHJcbiAgcGxhY2U6IHtcclxuICAgIHR5cGU6IE9iamVjdCxcclxuICB9LFxyXG4gIHBvc2l0aW9uOiB7XHJcbiAgICB0eXBlOiBPYmplY3QsXHJcbiAgICB0d29XYXk6IHRydWUsXHJcbiAgfSxcclxuICBzaGFwZToge1xyXG4gICAgdHlwZTogT2JqZWN0LFxyXG4gICAgdHdvV2F5OiB0cnVlLFxyXG4gIH0sXHJcbiAgdGl0bGU6IHtcclxuICAgIHR5cGU6IFN0cmluZyxcclxuICAgIHR3b1dheTogdHJ1ZSxcclxuICB9LFxyXG4gIHpJbmRleDoge1xyXG4gICAgdHlwZTogTnVtYmVyLFxyXG4gICAgdHdvV2F5OiB0cnVlLFxyXG4gIH0sXHJcbiAgdmlzaWJsZToge1xyXG4gICAgdHdvV2F5OiB0cnVlLFxyXG4gICAgZGVmYXVsdDogdHJ1ZSxcclxuICB9LFxyXG59XHJcblxyXG5jb25zdCBldmVudHMgPSBbXHJcbiAgJ2NsaWNrJyxcclxuICAncmlnaHRjbGljaycsXHJcbiAgJ2RibGNsaWNrJyxcclxuICAnZHJhZycsXHJcbiAgJ2RyYWdzdGFydCcsXHJcbiAgJ2RyYWdlbmQnLFxyXG4gICdtb3VzZXVwJyxcclxuICAnbW91c2Vkb3duJyxcclxuICAnbW91c2VvdmVyJyxcclxuICAnbW91c2VvdXQnLFxyXG5dXHJcblxyXG5leHBvcnQgZGVmYXVsdCBidWlsZENvbXBvbmVudCh7XHJcbiAgbWFwcGVkUHJvcHM6IHByb3BzLFxyXG4gIGV2ZW50cyxcclxuICBuYW1lOiAnbWFya2VyJyxcclxuICBjdHI6ICgpID0+IGdvb2dsZS5tYXBzLk1hcmtlcixcclxuXHJcbiAgaW5qZWN0OiB7XHJcbiAgICAkY2x1c3RlclByb21pc2U6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgIH0sXHJcbiAgfSxcclxuICBlbWl0czogZXZlbnRzLFxyXG4gIHVubW91bnRlZCgpIHtcclxuICAgIGlmICghdGhpcy4kbWFya2VyT2JqZWN0KSB7XHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLiRjbHVzdGVyT2JqZWN0KSB7XHJcbiAgICAgIC8vIFJlcGFpbnQgd2lsbCBiZSBwZXJmb3JtZWQgaW4gYHVwZGF0ZWQoKWAgb2YgY2x1c3RlclxyXG4gICAgICB0aGlzLiRjbHVzdGVyT2JqZWN0LnJlbW92ZU1hcmtlcih0aGlzLiRtYXJrZXJPYmplY3QsIHRydWUpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLiRtYXJrZXJPYmplY3Quc2V0TWFwKG51bGwpXHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgYmVmb3JlQ3JlYXRlKG9wdGlvbnMpIHtcclxuICAgIGlmICh0aGlzLiRjbHVzdGVyUHJvbWlzZSkge1xyXG4gICAgICBvcHRpb25zLm1hcCA9IG51bGxcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy4kY2x1c3RlclByb21pc2VcclxuICB9LFxyXG5cclxuICBhZnRlckNyZWF0ZShpbnN0KSB7XHJcbiAgICBldmVudHMuZm9yRWFjaCgoZXZlbnQpPT4ge1xyXG4gICAgICBpbnN0LmFkZExpc3RlbmVyKGV2ZW50LCAocGF5bG9hZCk9PiB7XHJcbiAgICAgICAgdGhpcy4kZW1pdChldmVudCwgcGF5bG9hZClcclxuICAgICAgfSk7XHJcbiAgICB9KVxyXG4gICAgaWYgKHRoaXMuJGNsdXN0ZXJQcm9taXNlKSB7XHJcbiAgICAgIHRoaXMuJGNsdXN0ZXJQcm9taXNlLnRoZW4oKGNvKSA9PiB7XHJcbiAgICAgICAgdGhpcy4kY2x1c3Rlck9iamVjdCA9IGNvXHJcbiAgICAgICAgY28uYWRkTWFya2VyKGluc3QpXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfSxcclxufSlcclxuPC9zY3JpcHQ+XHJcbiIsIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cclxuXHJcblBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxyXG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXHJcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxyXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXHJcbklORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxyXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxyXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXHJcblBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbnZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn07XG5cbi8qKlxuICogQ29weXJpZ2h0IDIwMTkgR29vZ2xlIExMQy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG4vKipcbiAqIEV4dGVuZHMgYW4gb2JqZWN0J3MgcHJvdG90eXBlIGJ5IGFub3RoZXIncy5cbiAqXG4gKiBAcGFyYW0gdHlwZTEgVGhlIFR5cGUgdG8gYmUgZXh0ZW5kZWQuXG4gKiBAcGFyYW0gdHlwZTIgVGhlIFR5cGUgdG8gZXh0ZW5kIHdpdGguXG4gKiBAaWdub3JlXG4gKi9cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG5mdW5jdGlvbiBleHRlbmQodHlwZTEsIHR5cGUyKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1jb25zdFxuICAgIGZvciAodmFyIHByb3BlcnR5IGluIHR5cGUyLnByb3RvdHlwZSkge1xuICAgICAgICB0eXBlMS5wcm90b3R5cGVbcHJvcGVydHldID0gdHlwZTIucHJvdG90eXBlW3Byb3BlcnR5XTtcbiAgICB9XG59XG4vKipcbiAqIEBpZ25vcmVcbiAqL1xudmFyIE92ZXJsYXlWaWV3U2FmZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPdmVybGF5Vmlld1NhZmUoKSB7XG4gICAgICAgIC8vIE1hcmtlckNsdXN0ZXJlciBpbXBsZW1lbnRzIGdvb2dsZS5tYXBzLk92ZXJsYXlWaWV3IGludGVyZmFjZS4gV2UgdXNlIHRoZVxuICAgICAgICAvLyBleHRlbmQgZnVuY3Rpb24gdG8gZXh0ZW5kIE1hcmtlckNsdXN0ZXJlciB3aXRoIGdvb2dsZS5tYXBzLk92ZXJsYXlWaWV3XG4gICAgICAgIC8vIGJlY2F1c2UgaXQgbWlnaHQgbm90IGFsd2F5cyBiZSBhdmFpbGFibGUgd2hlbiB0aGUgY29kZSBpcyBkZWZpbmVkIHNvIHdlXG4gICAgICAgIC8vIGxvb2sgZm9yIGl0IGF0IHRoZSBsYXN0IHBvc3NpYmxlIG1vbWVudC4gSWYgaXQgZG9lc24ndCBleGlzdCBub3cgdGhlblxuICAgICAgICAvLyB0aGVyZSBpcyBubyBwb2ludCBnb2luZyBhaGVhZCA6KVxuICAgICAgICBleHRlbmQoT3ZlcmxheVZpZXdTYWZlLCBnb29nbGUubWFwcy5PdmVybGF5Vmlldyk7XG4gICAgfVxuICAgIHJldHVybiBPdmVybGF5Vmlld1NhZmU7XG59KCkpO1xuXG4vKipcbiAqIENvcHlyaWdodCAyMDE5IEdvb2dsZSBMTEMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuLyoqXG4gKlxuICogQGhpZGRlblxuICovXG5mdW5jdGlvbiB0b0Nzc1RleHQoc3R5bGVzKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHN0eWxlcylcbiAgICAgICAgLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBrZXkpIHtcbiAgICAgICAgaWYgKHN0eWxlc1trZXldKSB7XG4gICAgICAgICAgICBhY2MucHVzaChrZXkgKyBcIjpcIiArIHN0eWxlc1trZXldKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWNjO1xuICAgIH0sIFtdKVxuICAgICAgICAuam9pbihcIjtcIik7XG59XG4vKipcbiAqXG4gKiBAaGlkZGVuXG4gKi9cbmZ1bmN0aW9uIGNvZXJjZVBpeGVscyhwaXhlbHMpIHtcbiAgICByZXR1cm4gcGl4ZWxzID8gcGl4ZWxzICsgXCJweFwiIDogdW5kZWZpbmVkO1xufVxuLyoqXG4gKiBBIGNsdXN0ZXIgaWNvbi5cbiAqL1xudmFyIENsdXN0ZXJJY29uID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhDbHVzdGVySWNvbiwgX3N1cGVyKTtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gY2x1c3Rlcl8gVGhlIGNsdXN0ZXIgd2l0aCB3aGljaCB0aGUgaWNvbiBpcyB0byBiZSBhc3NvY2lhdGVkLlxuICAgICAqIEBwYXJhbSBzdHlsZXNfIEFuIGFycmF5IG9mIHtAbGluayBDbHVzdGVySWNvblN0eWxlfSBkZWZpbmluZyB0aGUgY2x1c3RlciBpY29uc1xuICAgICAqICB0byB1c2UgZm9yIHZhcmlvdXMgY2x1c3RlciBzaXplcy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBDbHVzdGVySWNvbihjbHVzdGVyXywgc3R5bGVzXykge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5jbHVzdGVyXyA9IGNsdXN0ZXJfO1xuICAgICAgICBfdGhpcy5zdHlsZXNfID0gc3R5bGVzXztcbiAgICAgICAgX3RoaXMuY2VudGVyXyA9IG51bGw7XG4gICAgICAgIF90aGlzLmRpdl8gPSBudWxsO1xuICAgICAgICBfdGhpcy5zdW1zXyA9IG51bGw7XG4gICAgICAgIF90aGlzLnZpc2libGVfID0gZmFsc2U7XG4gICAgICAgIF90aGlzLnN0eWxlID0gbnVsbDtcbiAgICAgICAgX3RoaXMuc2V0TWFwKGNsdXN0ZXJfLmdldE1hcCgpKTsgLy8gTm90ZTogdGhpcyBjYXVzZXMgb25BZGQgdG8gYmUgY2FsbGVkXG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkcyB0aGUgaWNvbiB0byB0aGUgRE9NLlxuICAgICAqL1xuICAgIENsdXN0ZXJJY29uLnByb3RvdHlwZS5vbkFkZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIGNNb3VzZURvd25JbkNsdXN0ZXI7XG4gICAgICAgIHZhciBjRHJhZ2dpbmdNYXBCeUNsdXN0ZXI7XG4gICAgICAgIHZhciBtYyA9IHRoaXMuY2x1c3Rlcl8uZ2V0TWFya2VyQ2x1c3RlcmVyKCk7XG4gICAgICAgIHZhciBfYSA9IGdvb2dsZS5tYXBzLnZlcnNpb24uc3BsaXQoXCIuXCIpLCBtYWpvciA9IF9hWzBdLCBtaW5vciA9IF9hWzFdO1xuICAgICAgICB2YXIgZ21WZXJzaW9uID0gcGFyc2VJbnQobWFqb3IsIDEwKSAqIDEwMCArIHBhcnNlSW50KG1pbm9yLCAxMCk7XG4gICAgICAgIHRoaXMuZGl2XyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGlmICh0aGlzLnZpc2libGVfKSB7XG4gICAgICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmdldFBhbmVzKCkub3ZlcmxheU1vdXNlVGFyZ2V0LmFwcGVuZENoaWxkKHRoaXMuZGl2Xyk7XG4gICAgICAgIC8vIEZpeCBmb3IgSXNzdWUgMTU3XG4gICAgICAgIHRoaXMuYm91bmRzQ2hhbmdlZExpc3RlbmVyXyA9IGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKHRoaXMuZ2V0TWFwKCksIFwiYm91bmRzX2NoYW5nZWRcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY0RyYWdnaW5nTWFwQnlDbHVzdGVyID0gY01vdXNlRG93bkluQ2x1c3RlcjtcbiAgICAgICAgfSk7XG4gICAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZERvbUxpc3RlbmVyKHRoaXMuZGl2XywgXCJtb3VzZWRvd25cIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY01vdXNlRG93bkluQ2x1c3RlciA9IHRydWU7XG4gICAgICAgICAgICBjRHJhZ2dpbmdNYXBCeUNsdXN0ZXIgPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZERvbUxpc3RlbmVyKHRoaXMuZGl2XywgXCJjb250ZXh0bWVudVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiBhIGNsdXN0ZXIgbWFya2VyIGNvbnRleHRtZW51IGlzIHJlcXVlc3RlZC5cbiAgICAgICAgICAgICAqIEBuYW1lIE1hcmtlckNsdXN0ZXJlciNtb3VzZW92ZXJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7Q2x1c3Rlcn0gYyBUaGUgY2x1c3RlciB0aGF0IHRoZSBjb250ZXh0bWVudSBpcyByZXF1ZXN0ZWQuXG4gICAgICAgICAgICAgKiBAZXZlbnRcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQudHJpZ2dlcihtYywgXCJjb250ZXh0bWVudVwiLCBfdGhpcy5jbHVzdGVyXyk7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBNYXJjaCAxLCAyMDE4OiBGaXggZm9yIHRoaXMgMy4zMiBleHAgYnVnLCBodHRwczovL2lzc3VldHJhY2tlci5nb29nbGUuY29tL2lzc3Vlcy83MzU3MTUyMlxuICAgICAgICAvLyBCdXQgaXQgZG9lc24ndCB3b3JrIHdpdGggZWFybGllciByZWxlYXNlcyBzbyBkbyBhIHZlcnNpb24gY2hlY2suXG4gICAgICAgIGlmIChnbVZlcnNpb24gPj0gMzMyKSB7XG4gICAgICAgICAgICAvLyBVZ2x5IHZlcnNpb24tZGVwZW5kZW50IGNvZGVcbiAgICAgICAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZERvbUxpc3RlbmVyKHRoaXMuZGl2XywgXCJ0b3VjaHN0YXJ0XCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZERvbUxpc3RlbmVyKHRoaXMuZGl2XywgXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgY01vdXNlRG93bkluQ2x1c3RlciA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKCFjRHJhZ2dpbmdNYXBCeUNsdXN0ZXIpIHtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gYSBjbHVzdGVyIG1hcmtlciBpcyBjbGlja2VkLlxuICAgICAgICAgICAgICAgICAqIEBuYW1lIE1hcmtlckNsdXN0ZXJlciNjbGlja1xuICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7Q2x1c3Rlcn0gYyBUaGUgY2x1c3RlciB0aGF0IHdhcyBjbGlja2VkLlxuICAgICAgICAgICAgICAgICAqIEBldmVudFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LnRyaWdnZXIobWMsIFwiY2xpY2tcIiwgX3RoaXMuY2x1c3Rlcl8pO1xuICAgICAgICAgICAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LnRyaWdnZXIobWMsIFwiY2x1c3RlcmNsaWNrXCIsIF90aGlzLmNsdXN0ZXJfKTsgLy8gZGVwcmVjYXRlZCBuYW1lXG4gICAgICAgICAgICAgICAgLy8gVGhlIGRlZmF1bHQgY2xpY2sgaGFuZGxlciBmb2xsb3dzLiBEaXNhYmxlIGl0IGJ5IHNldHRpbmdcbiAgICAgICAgICAgICAgICAvLyB0aGUgem9vbU9uQ2xpY2sgcHJvcGVydHkgdG8gZmFsc2UuXG4gICAgICAgICAgICAgICAgaWYgKG1jLmdldFpvb21PbkNsaWNrKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gWm9vbSBpbnRvIHRoZSBjbHVzdGVyLlxuICAgICAgICAgICAgICAgICAgICB2YXIgbXpfMSA9IG1jLmdldE1heFpvb20oKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRoZUJvdW5kc18xID0gX3RoaXMuY2x1c3Rlcl8uZ2V0Qm91bmRzKCk7XG4gICAgICAgICAgICAgICAgICAgIG1jLmdldE1hcCgpLmZpdEJvdW5kcyh0aGVCb3VuZHNfMSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRoZXJlIGlzIGEgZml4IGZvciBJc3N1ZSAxNzAgaGVyZTpcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYy5nZXRNYXAoKS5maXRCb3VuZHModGhlQm91bmRzXzEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRG9uJ3Qgem9vbSBiZXlvbmQgdGhlIG1heCB6b29tIGxldmVsXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobXpfMSAhPT0gbnVsbCAmJiBtYy5nZXRNYXAoKS5nZXRab29tKCkgPiBtel8xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWMuZ2V0TWFwKCkuc2V0Wm9vbShtel8xICsgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIFByZXZlbnQgZXZlbnQgcHJvcGFnYXRpb24gdG8gdGhlIG1hcDpcbiAgICAgICAgICAgICAgICBlLmNhbmNlbEJ1YmJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgaWYgKGUuc3RvcFByb3BhZ2F0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkRG9tTGlzdGVuZXIodGhpcy5kaXZfLCBcIm1vdXNlb3ZlclwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgbW91c2UgbW92ZXMgb3ZlciBhIGNsdXN0ZXIgbWFya2VyLlxuICAgICAgICAgICAgICogQG5hbWUgTWFya2VyQ2x1c3RlcmVyI21vdXNlb3ZlclxuICAgICAgICAgICAgICogQHBhcmFtIHtDbHVzdGVyfSBjIFRoZSBjbHVzdGVyIHRoYXQgdGhlIG1vdXNlIG1vdmVkIG92ZXIuXG4gICAgICAgICAgICAgKiBAZXZlbnRcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQudHJpZ2dlcihtYywgXCJtb3VzZW92ZXJcIiwgX3RoaXMuY2x1c3Rlcl8pO1xuICAgICAgICB9KTtcbiAgICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkRG9tTGlzdGVuZXIodGhpcy5kaXZfLCBcIm1vdXNlb3V0XCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSBtb3VzZSBtb3ZlcyBvdXQgb2YgYSBjbHVzdGVyIG1hcmtlci5cbiAgICAgICAgICAgICAqIEBuYW1lIE1hcmtlckNsdXN0ZXJlciNtb3VzZW91dFxuICAgICAgICAgICAgICogQHBhcmFtIHtDbHVzdGVyfSBjIFRoZSBjbHVzdGVyIHRoYXQgdGhlIG1vdXNlIG1vdmVkIG91dCBvZi5cbiAgICAgICAgICAgICAqIEBldmVudFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBnb29nbGUubWFwcy5ldmVudC50cmlnZ2VyKG1jLCBcIm1vdXNlb3V0XCIsIF90aGlzLmNsdXN0ZXJfKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIHRoZSBpY29uIGZyb20gdGhlIERPTS5cbiAgICAgKi9cbiAgICBDbHVzdGVySWNvbi5wcm90b3R5cGUub25SZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmRpdl8gJiYgdGhpcy5kaXZfLnBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQucmVtb3ZlTGlzdGVuZXIodGhpcy5ib3VuZHNDaGFuZ2VkTGlzdGVuZXJfKTtcbiAgICAgICAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LmNsZWFySW5zdGFuY2VMaXN0ZW5lcnModGhpcy5kaXZfKTtcbiAgICAgICAgICAgIHRoaXMuZGl2Xy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuZGl2Xyk7XG4gICAgICAgICAgICB0aGlzLmRpdl8gPSBudWxsO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBEcmF3cyB0aGUgaWNvbi5cbiAgICAgKi9cbiAgICBDbHVzdGVySWNvbi5wcm90b3R5cGUuZHJhdyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMudmlzaWJsZV8pIHtcbiAgICAgICAgICAgIHZhciBwb3MgPSB0aGlzLmdldFBvc0Zyb21MYXRMbmdfKHRoaXMuY2VudGVyXyk7XG4gICAgICAgICAgICB0aGlzLmRpdl8uc3R5bGUudG9wID0gcG9zLnkgKyBcInB4XCI7XG4gICAgICAgICAgICB0aGlzLmRpdl8uc3R5bGUubGVmdCA9IHBvcy54ICsgXCJweFwiO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBIaWRlcyB0aGUgaWNvbi5cbiAgICAgKi9cbiAgICBDbHVzdGVySWNvbi5wcm90b3R5cGUuaGlkZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuZGl2Xykge1xuICAgICAgICAgICAgdGhpcy5kaXZfLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnZpc2libGVfID0gZmFsc2U7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBQb3NpdGlvbnMgYW5kIHNob3dzIHRoZSBpY29uLlxuICAgICAqL1xuICAgIENsdXN0ZXJJY29uLnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5kaXZfKSB7XG4gICAgICAgICAgICB0aGlzLmRpdl8uY2xhc3NOYW1lID0gdGhpcy5jbGFzc05hbWVfO1xuICAgICAgICAgICAgdGhpcy5kaXZfLnN0eWxlLmNzc1RleHQgPSB0aGlzLmNyZWF0ZUNzc18odGhpcy5nZXRQb3NGcm9tTGF0TG5nXyh0aGlzLmNlbnRlcl8pKTtcbiAgICAgICAgICAgIHRoaXMuZGl2Xy5pbm5lckhUTUwgPVxuICAgICAgICAgICAgICAgICh0aGlzLnN0eWxlLnVybCA/IHRoaXMuZ2V0SW1hZ2VFbGVtZW50SHRtbCgpIDogXCJcIikgK1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldExhYmVsRGl2SHRtbCgpO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnN1bXNfLnRpdGxlID09PSBcInVuZGVmaW5lZFwiIHx8IHRoaXMuc3Vtc18udGl0bGUgPT09IFwiXCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpdl8udGl0bGUgPSB0aGlzLmNsdXN0ZXJfLmdldE1hcmtlckNsdXN0ZXJlcigpLmdldFRpdGxlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpdl8udGl0bGUgPSB0aGlzLnN1bXNfLnRpdGxlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5kaXZfLnN0eWxlLmRpc3BsYXkgPSBcIlwiO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudmlzaWJsZV8gPSB0cnVlO1xuICAgIH07XG4gICAgQ2x1c3Rlckljb24ucHJvdG90eXBlLmdldExhYmVsRGl2SHRtbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG1jID0gdGhpcy5jbHVzdGVyXy5nZXRNYXJrZXJDbHVzdGVyZXIoKTtcbiAgICAgICAgdmFyIGFyaWFMYWJlbCA9IG1jLmFyaWFMYWJlbEZuKHRoaXMuc3Vtc18udGV4dCk7XG4gICAgICAgIHZhciBkaXZTdHlsZSA9IHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiBcImFic29sdXRlXCIsXG4gICAgICAgICAgICB0b3A6IGNvZXJjZVBpeGVscyh0aGlzLmFuY2hvclRleHRfWzBdKSxcbiAgICAgICAgICAgIGxlZnQ6IGNvZXJjZVBpeGVscyh0aGlzLmFuY2hvclRleHRfWzFdKSxcbiAgICAgICAgICAgIGNvbG9yOiB0aGlzLnN0eWxlLnRleHRDb2xvcixcbiAgICAgICAgICAgIFwiZm9udC1zaXplXCI6IGNvZXJjZVBpeGVscyh0aGlzLnN0eWxlLnRleHRTaXplKSxcbiAgICAgICAgICAgIFwiZm9udC1mYW1pbHlcIjogdGhpcy5zdHlsZS5mb250RmFtaWx5LFxuICAgICAgICAgICAgXCJmb250LXdlaWdodFwiOiB0aGlzLnN0eWxlLmZvbnRXZWlnaHQsXG4gICAgICAgICAgICBcImZvbnQtc3R5bGVcIjogdGhpcy5zdHlsZS5mb250U3R5bGUsXG4gICAgICAgICAgICBcInRleHQtZGVjb3JhdGlvblwiOiB0aGlzLnN0eWxlLnRleHREZWNvcmF0aW9uLFxuICAgICAgICAgICAgXCJ0ZXh0LWFsaWduXCI6IFwiY2VudGVyXCIsXG4gICAgICAgICAgICB3aWR0aDogY29lcmNlUGl4ZWxzKHRoaXMuc3R5bGUud2lkdGgpLFxuICAgICAgICAgICAgXCJsaW5lLWhlaWdodFwiOiBjb2VyY2VQaXhlbHModGhpcy5zdHlsZS50ZXh0TGluZUhlaWdodClcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIFwiXFxuPGRpdiBhcmlhLWxhYmVsPVxcXCJcIi5jb25jYXQoYXJpYUxhYmVsLCBcIlxcXCIgc3R5bGU9XFxcIlwiKS5jb25jYXQodG9Dc3NUZXh0KGRpdlN0eWxlKSwgXCJcXFwiIHRhYmluZGV4PVxcXCIwXFxcIj5cXG4gIDxzcGFuIGFyaWEtaGlkZGVuPVxcXCJ0cnVlXFxcIj5cIikuY29uY2F0KHRoaXMuc3Vtc18udGV4dCwgXCI8L3NwYW4+XFxuPC9kaXY+XFxuXCIpO1xuICAgIH07XG4gICAgQ2x1c3Rlckljb24ucHJvdG90eXBlLmdldEltYWdlRWxlbWVudEh0bWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIE5PVEU6IHZhbHVlcyBtdXN0IGJlIHNwZWNpZmllZCBpbiBweCB1bml0c1xuICAgICAgICB2YXIgYnAgPSAodGhpcy5zdHlsZS5iYWNrZ3JvdW5kUG9zaXRpb24gfHwgXCIwIDBcIikuc3BsaXQoXCIgXCIpO1xuICAgICAgICB2YXIgc3ByaXRlSCA9IHBhcnNlSW50KGJwWzBdLnJlcGxhY2UoL15cXHMrfFxccyskL2csIFwiXCIpLCAxMCk7XG4gICAgICAgIHZhciBzcHJpdGVWID0gcGFyc2VJbnQoYnBbMV0ucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgXCJcIiksIDEwKTtcbiAgICAgICAgdmFyIGRpbWVuc2lvbnMgPSB7fTtcbiAgICAgICAgaWYgKHRoaXMuY2x1c3Rlcl8uZ2V0TWFya2VyQ2x1c3RlcmVyKCkuZ2V0RW5hYmxlUmV0aW5hSWNvbnMoKSkge1xuICAgICAgICAgICAgZGltZW5zaW9ucyA9IHtcbiAgICAgICAgICAgICAgICB3aWR0aDogY29lcmNlUGl4ZWxzKHRoaXMuc3R5bGUud2lkdGgpLFxuICAgICAgICAgICAgICAgIGhlaWdodDogY29lcmNlUGl4ZWxzKHRoaXMuc3R5bGUuaGVpZ2h0KVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciBfYSA9IFtcbiAgICAgICAgICAgICAgICAtMSAqIHNwcml0ZVYsXG4gICAgICAgICAgICAgICAgLTEgKiBzcHJpdGVIICsgdGhpcy5zdHlsZS53aWR0aCxcbiAgICAgICAgICAgICAgICAtMSAqIHNwcml0ZVYgKyB0aGlzLnN0eWxlLmhlaWdodCxcbiAgICAgICAgICAgICAgICAtMSAqIHNwcml0ZUgsXG4gICAgICAgICAgICBdLCBZMSA9IF9hWzBdLCBYMSA9IF9hWzFdLCBZMiA9IF9hWzJdLCBYMiA9IF9hWzNdO1xuICAgICAgICAgICAgZGltZW5zaW9ucyA9IHtcbiAgICAgICAgICAgICAgICBjbGlwOiBcInJlY3QoXCIuY29uY2F0KFkxLCBcInB4LCBcIikuY29uY2F0KFgxLCBcInB4LCBcIikuY29uY2F0KFkyLCBcInB4LCBcIikuY29uY2F0KFgyLCBcInB4KVwiKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgb3ZlcnJpZGVEaW1lbnNpb25zRHluYW1pY0ljb24gPSB0aGlzLnN1bXNfLnVybFxuICAgICAgICAgICAgPyB7IHdpZHRoOiBcIjEwMCVcIiwgaGVpZ2h0OiBcIjEwMCVcIiB9XG4gICAgICAgICAgICA6IHt9O1xuICAgICAgICB2YXIgY3NzVGV4dCA9IHRvQ3NzVGV4dChfX2Fzc2lnbihfX2Fzc2lnbih7IHBvc2l0aW9uOiBcImFic29sdXRlXCIsIHRvcDogY29lcmNlUGl4ZWxzKHNwcml0ZVYpLCBsZWZ0OiBjb2VyY2VQaXhlbHMoc3ByaXRlSCkgfSwgZGltZW5zaW9ucyksIG92ZXJyaWRlRGltZW5zaW9uc0R5bmFtaWNJY29uKSk7XG4gICAgICAgIHJldHVybiBcIjxpbWcgYWx0PVxcXCJcIi5jb25jYXQodGhpcy5zdW1zXy50ZXh0LCBcIlxcXCIgYXJpYS1oaWRkZW49XFxcInRydWVcXFwiIHNyYz1cXFwiXCIpLmNvbmNhdCh0aGlzLnN0eWxlLnVybCwgXCJcXFwiIHN0eWxlPVxcXCJcIikuY29uY2F0KGNzc1RleHQsIFwiXFxcIi8+XCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgaWNvbiBzdHlsZXMgdG8gdGhlIGFwcHJvcHJpYXRlIGVsZW1lbnQgaW4gdGhlIHN0eWxlcyBhcnJheS5cbiAgICAgKlxuICAgICAqIEBpZ25vcmVcbiAgICAgKiBAcGFyYW0gc3VtcyBUaGUgaWNvbiBsYWJlbCB0ZXh0IGFuZCBzdHlsZXMgaW5kZXguXG4gICAgICovXG4gICAgQ2x1c3Rlckljb24ucHJvdG90eXBlLnVzZVN0eWxlID0gZnVuY3Rpb24gKHN1bXMpIHtcbiAgICAgICAgdGhpcy5zdW1zXyA9IHN1bXM7XG4gICAgICAgIHZhciBpbmRleCA9IE1hdGgubWF4KDAsIHN1bXMuaW5kZXggLSAxKTtcbiAgICAgICAgaW5kZXggPSBNYXRoLm1pbih0aGlzLnN0eWxlc18ubGVuZ3RoIC0gMSwgaW5kZXgpO1xuICAgICAgICB0aGlzLnN0eWxlID0gdGhpcy5zdW1zXy51cmxcbiAgICAgICAgICAgID8gX19hc3NpZ24oX19hc3NpZ24oe30sIHRoaXMuc3R5bGVzX1tpbmRleF0pLCB7IHVybDogdGhpcy5zdW1zXy51cmwgfSkgOiB0aGlzLnN0eWxlc19baW5kZXhdO1xuICAgICAgICB0aGlzLmFuY2hvclRleHRfID0gdGhpcy5zdHlsZS5hbmNob3JUZXh0IHx8IFswLCAwXTtcbiAgICAgICAgdGhpcy5hbmNob3JJY29uXyA9IHRoaXMuc3R5bGUuYW5jaG9ySWNvbiB8fCBbXG4gICAgICAgICAgICBNYXRoLmZsb29yKHRoaXMuc3R5bGUuaGVpZ2h0IC8gMiksXG4gICAgICAgICAgICBNYXRoLmZsb29yKHRoaXMuc3R5bGUud2lkdGggLyAyKSxcbiAgICAgICAgXTtcbiAgICAgICAgdGhpcy5jbGFzc05hbWVfID1cbiAgICAgICAgICAgIHRoaXMuY2x1c3Rlcl8uZ2V0TWFya2VyQ2x1c3RlcmVyKCkuZ2V0Q2x1c3RlckNsYXNzKCkgK1xuICAgICAgICAgICAgICAgIFwiIFwiICtcbiAgICAgICAgICAgICAgICAodGhpcy5zdHlsZS5jbGFzc05hbWUgfHwgXCJjbHVzdGVyLVwiICsgaW5kZXgpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgcG9zaXRpb24gYXQgd2hpY2ggdG8gY2VudGVyIHRoZSBpY29uLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNlbnRlciBUaGUgbGF0bG5nIHRvIHNldCBhcyB0aGUgY2VudGVyLlxuICAgICAqL1xuICAgIENsdXN0ZXJJY29uLnByb3RvdHlwZS5zZXRDZW50ZXIgPSBmdW5jdGlvbiAoY2VudGVyKSB7XG4gICAgICAgIHRoaXMuY2VudGVyXyA9IGNlbnRlcjtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgdGhlIGBjc3NUZXh0YCBzdHlsZSBwYXJhbWV0ZXIgYmFzZWQgb24gdGhlIHBvc2l0aW9uIG9mIHRoZSBpY29uLlxuICAgICAqXG4gICAgICogQHBhcmFtIHBvcyBUaGUgcG9zaXRpb24gb2YgdGhlIGljb24uXG4gICAgICogQHJldHVybiBUaGUgQ1NTIHN0eWxlIHRleHQuXG4gICAgICovXG4gICAgQ2x1c3Rlckljb24ucHJvdG90eXBlLmNyZWF0ZUNzc18gPSBmdW5jdGlvbiAocG9zKSB7XG4gICAgICAgIHJldHVybiB0b0Nzc1RleHQoe1xuICAgICAgICAgICAgXCJ6LWluZGV4XCI6IFwiXCIuY29uY2F0KHRoaXMuY2x1c3Rlcl8uZ2V0TWFya2VyQ2x1c3RlcmVyKCkuZ2V0WkluZGV4KCkpLFxuICAgICAgICAgICAgdG9wOiBjb2VyY2VQaXhlbHMocG9zLnkpLFxuICAgICAgICAgICAgbGVmdDogY29lcmNlUGl4ZWxzKHBvcy54KSxcbiAgICAgICAgICAgIHdpZHRoOiBjb2VyY2VQaXhlbHModGhpcy5zdHlsZS53aWR0aCksXG4gICAgICAgICAgICBoZWlnaHQ6IGNvZXJjZVBpeGVscyh0aGlzLnN0eWxlLmhlaWdodCksXG4gICAgICAgICAgICBjdXJzb3I6IFwicG9pbnRlclwiLFxuICAgICAgICAgICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIixcbiAgICAgICAgICAgIFwiLXdlYmtpdC11c2VyLXNlbGVjdFwiOiBcIm5vbmVcIixcbiAgICAgICAgICAgIFwiLWtodG1sLXVzZXItc2VsZWN0XCI6IFwibm9uZVwiLFxuICAgICAgICAgICAgXCItbW96LXVzZXItc2VsZWN0XCI6IFwibm9uZVwiLFxuICAgICAgICAgICAgXCItby11c2VyLXNlbGVjdFwiOiBcIm5vbmVcIixcbiAgICAgICAgICAgIFwidXNlci1zZWxlY3RcIjogXCJub25lXCJcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBwb3NpdGlvbiBhdCB3aGljaCB0byBwbGFjZSB0aGUgRElWIGRlcGVuZGluZyBvbiB0aGUgbGF0bG5nLlxuICAgICAqXG4gICAgICogQHBhcmFtIGxhdGxuZyBUaGUgcG9zaXRpb24gaW4gbGF0bG5nLlxuICAgICAqIEByZXR1cm4gVGhlIHBvc2l0aW9uIGluIHBpeGVscy5cbiAgICAgKi9cbiAgICBDbHVzdGVySWNvbi5wcm90b3R5cGUuZ2V0UG9zRnJvbUxhdExuZ18gPSBmdW5jdGlvbiAobGF0bG5nKSB7XG4gICAgICAgIHZhciBwb3MgPSB0aGlzLmdldFByb2plY3Rpb24oKS5mcm9tTGF0TG5nVG9EaXZQaXhlbChsYXRsbmcpO1xuICAgICAgICBwb3MueCA9IE1hdGguZmxvb3IocG9zLnggLSB0aGlzLmFuY2hvckljb25fWzFdKTtcbiAgICAgICAgcG9zLnkgPSBNYXRoLmZsb29yKHBvcy55IC0gdGhpcy5hbmNob3JJY29uX1swXSk7XG4gICAgICAgIHJldHVybiBwb3M7XG4gICAgfTtcbiAgICByZXR1cm4gQ2x1c3Rlckljb247XG59KE92ZXJsYXlWaWV3U2FmZSkpO1xuXG4vKipcbiAqIENvcHlyaWdodCAyMDE5IEdvb2dsZSBMTEMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuLyoqXG4gKiBDcmVhdGVzIGEgc2luZ2xlIGNsdXN0ZXIgdGhhdCBtYW5hZ2VzIGEgZ3JvdXAgb2YgcHJveGltYXRlIG1hcmtlcnMuXG4gKiAgVXNlZCBpbnRlcm5hbGx5LCBkbyBub3QgY2FsbCB0aGlzIGNvbnN0cnVjdG9yIGRpcmVjdGx5LlxuICovXG52YXIgQ2x1c3RlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBtYXJrZXJDbHVzdGVyZXJfIFRoZSBgTWFya2VyQ2x1c3RlcmVyYCBvYmplY3Qgd2l0aCB3aGljaCB0aGlzXG4gICAgICogIGNsdXN0ZXIgaXMgYXNzb2NpYXRlZC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBDbHVzdGVyKG1hcmtlckNsdXN0ZXJlcl8pIHtcbiAgICAgICAgdGhpcy5tYXJrZXJDbHVzdGVyZXJfID0gbWFya2VyQ2x1c3RlcmVyXztcbiAgICAgICAgdGhpcy5tYXBfID0gdGhpcy5tYXJrZXJDbHVzdGVyZXJfLmdldE1hcCgpO1xuICAgICAgICB0aGlzLm1pbkNsdXN0ZXJTaXplXyA9IHRoaXMubWFya2VyQ2x1c3RlcmVyXy5nZXRNaW5pbXVtQ2x1c3RlclNpemUoKTtcbiAgICAgICAgdGhpcy5hdmVyYWdlQ2VudGVyXyA9IHRoaXMubWFya2VyQ2x1c3RlcmVyXy5nZXRBdmVyYWdlQ2VudGVyKCk7XG4gICAgICAgIHRoaXMubWFya2Vyc18gPSBbXTsgLy8gVE9ETzogdHlwZTtcbiAgICAgICAgdGhpcy5jZW50ZXJfID0gbnVsbDtcbiAgICAgICAgdGhpcy5ib3VuZHNfID0gbnVsbDtcbiAgICAgICAgdGhpcy5jbHVzdGVySWNvbl8gPSBuZXcgQ2x1c3Rlckljb24odGhpcywgdGhpcy5tYXJrZXJDbHVzdGVyZXJfLmdldFN0eWxlcygpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIG1hcmtlcnMgbWFuYWdlZCBieSB0aGUgY2x1c3Rlci4gWW91IGNhbiBjYWxsIHRoaXMgZnJvbVxuICAgICAqIGEgYGNsaWNrYCwgYG1vdXNlb3ZlcmAsIG9yIGBtb3VzZW91dGAgZXZlbnQgaGFuZGxlciBmb3IgdGhlIGBNYXJrZXJDbHVzdGVyZXJgIG9iamVjdC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4gVGhlIG51bWJlciBvZiBtYXJrZXJzIGluIHRoZSBjbHVzdGVyLlxuICAgICAqL1xuICAgIENsdXN0ZXIucHJvdG90eXBlLmdldFNpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hcmtlcnNfLmxlbmd0aDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGFycmF5IG9mIG1hcmtlcnMgbWFuYWdlZCBieSB0aGUgY2x1c3Rlci4gWW91IGNhbiBjYWxsIHRoaXMgZnJvbVxuICAgICAqIGEgYGNsaWNrYCwgYG1vdXNlb3ZlcmAsIG9yIGBtb3VzZW91dGAgZXZlbnQgaGFuZGxlciBmb3IgdGhlIGBNYXJrZXJDbHVzdGVyZXJgIG9iamVjdC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4gVGhlIGFycmF5IG9mIG1hcmtlcnMgaW4gdGhlIGNsdXN0ZXIuXG4gICAgICovXG4gICAgQ2x1c3Rlci5wcm90b3R5cGUuZ2V0TWFya2VycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFya2Vyc187XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBjZW50ZXIgb2YgdGhlIGNsdXN0ZXIuIFlvdSBjYW4gY2FsbCB0aGlzIGZyb21cbiAgICAgKiBhIGBjbGlja2AsIGBtb3VzZW92ZXJgLCBvciBgbW91c2VvdXRgIGV2ZW50IGhhbmRsZXJcbiAgICAgKiBmb3IgdGhlIGBNYXJrZXJDbHVzdGVyZXJgIG9iamVjdC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4gVGhlIGNlbnRlciBvZiB0aGUgY2x1c3Rlci5cbiAgICAgKi9cbiAgICBDbHVzdGVyLnByb3RvdHlwZS5nZXRDZW50ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNlbnRlcl87XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBtYXAgd2l0aCB3aGljaCB0aGUgY2x1c3RlciBpcyBhc3NvY2lhdGVkLlxuICAgICAqXG4gICAgICogQHJldHVybiBUaGUgbWFwLlxuICAgICAqIEBpZ25vcmVcbiAgICAgKi9cbiAgICBDbHVzdGVyLnByb3RvdHlwZS5nZXRNYXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hcF87XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBgTWFya2VyQ2x1c3RlcmVyYCBvYmplY3Qgd2l0aCB3aGljaCB0aGUgY2x1c3RlciBpcyBhc3NvY2lhdGVkLlxuICAgICAqXG4gICAgICogQHJldHVybiBUaGUgYXNzb2NpYXRlZCBtYXJrZXIgY2x1c3RlcmVyLlxuICAgICAqIEBpZ25vcmVcbiAgICAgKi9cbiAgICBDbHVzdGVyLnByb3RvdHlwZS5nZXRNYXJrZXJDbHVzdGVyZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hcmtlckNsdXN0ZXJlcl87XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBib3VuZHMgb2YgdGhlIGNsdXN0ZXIuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHRoZSBjbHVzdGVyIGJvdW5kcy5cbiAgICAgKiBAaWdub3JlXG4gICAgICovXG4gICAgQ2x1c3Rlci5wcm90b3R5cGUuZ2V0Qm91bmRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYm91bmRzID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZ0JvdW5kcyh0aGlzLmNlbnRlcl8sIHRoaXMuY2VudGVyXyk7XG4gICAgICAgIHZhciBtYXJrZXJzID0gdGhpcy5nZXRNYXJrZXJzKCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbWFya2Vycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYm91bmRzLmV4dGVuZChtYXJrZXJzW2ldLmdldFBvc2l0aW9uKCkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBib3VuZHM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIHRoZSBjbHVzdGVyIGZyb20gdGhlIG1hcC5cbiAgICAgKlxuICAgICAqIEBpZ25vcmVcbiAgICAgKi9cbiAgICBDbHVzdGVyLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuY2x1c3Rlckljb25fLnNldE1hcChudWxsKTtcbiAgICAgICAgdGhpcy5tYXJrZXJzXyA9IFtdO1xuICAgICAgICBkZWxldGUgdGhpcy5tYXJrZXJzXztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEFkZHMgYSBtYXJrZXIgdG8gdGhlIGNsdXN0ZXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbWFya2VyIFRoZSBtYXJrZXIgdG8gYmUgYWRkZWQuXG4gICAgICogQHJldHVybiBUcnVlIGlmIHRoZSBtYXJrZXIgd2FzIGFkZGVkLlxuICAgICAqIEBpZ25vcmVcbiAgICAgKi9cbiAgICBDbHVzdGVyLnByb3RvdHlwZS5hZGRNYXJrZXIgPSBmdW5jdGlvbiAobWFya2VyKSB7XG4gICAgICAgIGlmICh0aGlzLmlzTWFya2VyQWxyZWFkeUFkZGVkXyhtYXJrZXIpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLmNlbnRlcl8pIHtcbiAgICAgICAgICAgIHRoaXMuY2VudGVyXyA9IG1hcmtlci5nZXRQb3NpdGlvbigpO1xuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVCb3VuZHNfKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hdmVyYWdlQ2VudGVyXykge1xuICAgICAgICAgICAgICAgIHZhciBsID0gdGhpcy5tYXJrZXJzXy5sZW5ndGggKyAxO1xuICAgICAgICAgICAgICAgIHZhciBsYXQgPSAodGhpcy5jZW50ZXJfLmxhdCgpICogKGwgLSAxKSArIG1hcmtlci5nZXRQb3NpdGlvbigpLmxhdCgpKSAvIGw7XG4gICAgICAgICAgICAgICAgdmFyIGxuZyA9ICh0aGlzLmNlbnRlcl8ubG5nKCkgKiAobCAtIDEpICsgbWFya2VyLmdldFBvc2l0aW9uKCkubG5nKCkpIC8gbDtcbiAgICAgICAgICAgICAgICB0aGlzLmNlbnRlcl8gPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKGxhdCwgbG5nKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZUJvdW5kc18oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBtYXJrZXIuaXNBZGRlZCA9IHRydWU7XG4gICAgICAgIHRoaXMubWFya2Vyc18ucHVzaChtYXJrZXIpO1xuICAgICAgICB2YXIgbUNvdW50ID0gdGhpcy5tYXJrZXJzXy5sZW5ndGg7XG4gICAgICAgIHZhciBteiA9IHRoaXMubWFya2VyQ2x1c3RlcmVyXy5nZXRNYXhab29tKCk7XG4gICAgICAgIGlmIChteiAhPT0gbnVsbCAmJiB0aGlzLm1hcF8uZ2V0Wm9vbSgpID4gbXopIHtcbiAgICAgICAgICAgIC8vIFpvb21lZCBpbiBwYXN0IG1heCB6b29tLCBzbyBzaG93IHRoZSBtYXJrZXIuXG4gICAgICAgICAgICBpZiAobWFya2VyLmdldE1hcCgpICE9PSB0aGlzLm1hcF8pIHtcbiAgICAgICAgICAgICAgICBtYXJrZXIuc2V0TWFwKHRoaXMubWFwXyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobUNvdW50IDwgdGhpcy5taW5DbHVzdGVyU2l6ZV8pIHtcbiAgICAgICAgICAgIC8vIE1pbiBjbHVzdGVyIHNpemUgbm90IHJlYWNoZWQgc28gc2hvdyB0aGUgbWFya2VyLlxuICAgICAgICAgICAgaWYgKG1hcmtlci5nZXRNYXAoKSAhPT0gdGhpcy5tYXBfKSB7XG4gICAgICAgICAgICAgICAgbWFya2VyLnNldE1hcCh0aGlzLm1hcF8pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG1Db3VudCA9PT0gdGhpcy5taW5DbHVzdGVyU2l6ZV8pIHtcbiAgICAgICAgICAgIC8vIEhpZGUgdGhlIG1hcmtlcnMgdGhhdCB3ZXJlIHNob3dpbmcuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1Db3VudDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXJrZXJzX1tpXS5zZXRNYXAobnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBtYXJrZXIuc2V0TWFwKG51bGwpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogRGV0ZXJtaW5lcyBpZiBhIG1hcmtlciBsaWVzIHdpdGhpbiB0aGUgY2x1c3RlcidzIGJvdW5kcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBtYXJrZXIgVGhlIG1hcmtlciB0byBjaGVjay5cbiAgICAgKiBAcmV0dXJuIFRydWUgaWYgdGhlIG1hcmtlciBsaWVzIGluIHRoZSBib3VuZHMuXG4gICAgICogQGlnbm9yZVxuICAgICAqL1xuICAgIENsdXN0ZXIucHJvdG90eXBlLmlzTWFya2VySW5DbHVzdGVyQm91bmRzID0gZnVuY3Rpb24gKG1hcmtlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5ib3VuZHNfLmNvbnRhaW5zKG1hcmtlci5nZXRQb3NpdGlvbigpKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENhbGN1bGF0ZXMgdGhlIGV4dGVuZGVkIGJvdW5kcyBvZiB0aGUgY2x1c3RlciB3aXRoIHRoZSBncmlkLlxuICAgICAqL1xuICAgIENsdXN0ZXIucHJvdG90eXBlLmNhbGN1bGF0ZUJvdW5kc18gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBib3VuZHMgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nQm91bmRzKHRoaXMuY2VudGVyXywgdGhpcy5jZW50ZXJfKTtcbiAgICAgICAgdGhpcy5ib3VuZHNfID0gdGhpcy5tYXJrZXJDbHVzdGVyZXJfLmdldEV4dGVuZGVkQm91bmRzKGJvdW5kcyk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIHRoZSBjbHVzdGVyIGljb24uXG4gICAgICovXG4gICAgQ2x1c3Rlci5wcm90b3R5cGUudXBkYXRlSWNvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG1Db3VudCA9IHRoaXMubWFya2Vyc18ubGVuZ3RoO1xuICAgICAgICB2YXIgbXogPSB0aGlzLm1hcmtlckNsdXN0ZXJlcl8uZ2V0TWF4Wm9vbSgpO1xuICAgICAgICBpZiAobXogIT09IG51bGwgJiYgdGhpcy5tYXBfLmdldFpvb20oKSA+IG16KSB7XG4gICAgICAgICAgICB0aGlzLmNsdXN0ZXJJY29uXy5oaWRlKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1Db3VudCA8IHRoaXMubWluQ2x1c3RlclNpemVfKSB7XG4gICAgICAgICAgICAvLyBNaW4gY2x1c3RlciBzaXplIG5vdCB5ZXQgcmVhY2hlZC5cbiAgICAgICAgICAgIHRoaXMuY2x1c3Rlckljb25fLmhpZGUoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbnVtU3R5bGVzID0gdGhpcy5tYXJrZXJDbHVzdGVyZXJfLmdldFN0eWxlcygpLmxlbmd0aDtcbiAgICAgICAgdmFyIHN1bXMgPSB0aGlzLm1hcmtlckNsdXN0ZXJlcl8uZ2V0Q2FsY3VsYXRvcigpKHRoaXMubWFya2Vyc18sIG51bVN0eWxlcyk7XG4gICAgICAgIHRoaXMuY2x1c3Rlckljb25fLnNldENlbnRlcih0aGlzLmNlbnRlcl8pO1xuICAgICAgICB0aGlzLmNsdXN0ZXJJY29uXy51c2VTdHlsZShzdW1zKTtcbiAgICAgICAgdGhpcy5jbHVzdGVySWNvbl8uc2hvdygpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogRGV0ZXJtaW5lcyBpZiBhIG1hcmtlciBoYXMgYWxyZWFkeSBiZWVuIGFkZGVkIHRvIHRoZSBjbHVzdGVyLlxuICAgICAqXG4gICAgICogQHBhcmFtIG1hcmtlciBUaGUgbWFya2VyIHRvIGNoZWNrLlxuICAgICAqIEByZXR1cm4gVHJ1ZSBpZiB0aGUgbWFya2VyIGhhcyBhbHJlYWR5IGJlZW4gYWRkZWQuXG4gICAgICovXG4gICAgQ2x1c3Rlci5wcm90b3R5cGUuaXNNYXJrZXJBbHJlYWR5QWRkZWRfID0gZnVuY3Rpb24gKG1hcmtlcikge1xuICAgICAgICBpZiAodGhpcy5tYXJrZXJzXy5pbmRleE9mKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tYXJrZXJzXy5pbmRleE9mKG1hcmtlcikgIT09IC0xO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLm1hcmtlcnNfLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKG1hcmtlciA9PT0gdGhpcy5tYXJrZXJzX1tpXSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gICAgcmV0dXJuIENsdXN0ZXI7XG59KCkpO1xuXG4vKipcbiAqIENvcHlyaWdodCAyMDE5IEdvb2dsZSBMTEMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuLyoqXG4gKiBAaWdub3JlXG4gKi9cbnZhciBnZXRPcHRpb24gPSBmdW5jdGlvbiAob3B0aW9ucywgcHJvcCwgZGVmKSB7XG4gICAgaWYgKG9wdGlvbnNbcHJvcF0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gb3B0aW9uc1twcm9wXTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBkZWY7XG4gICAgfVxufTtcbnZhciBNYXJrZXJDbHVzdGVyZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKE1hcmtlckNsdXN0ZXJlciwgX3N1cGVyKTtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgTWFya2VyQ2x1c3RlcmVyIG9iamVjdCB3aXRoIHRoZSBvcHRpb25zIHNwZWNpZmllZCBpbiB7QGxpbmsgTWFya2VyQ2x1c3RlcmVyT3B0aW9uc30uXG4gICAgICogQHBhcmFtIG1hcCBUaGUgR29vZ2xlIG1hcCB0byBhdHRhY2ggdG8uXG4gICAgICogQHBhcmFtIG1hcmtlcnMgVGhlIG1hcmtlcnMgdG8gYmUgYWRkZWQgdG8gdGhlIGNsdXN0ZXIuXG4gICAgICogQHBhcmFtIG9wdGlvbnMgVGhlIG9wdGlvbmFsIHBhcmFtZXRlcnMuXG4gICAgICovXG4gICAgZnVuY3Rpb24gTWFya2VyQ2x1c3RlcmVyKG1hcCwgbWFya2Vycywgb3B0aW9ucykge1xuICAgICAgICBpZiAobWFya2VycyA9PT0gdm9pZCAwKSB7IG1hcmtlcnMgPSBbXTsgfVxuICAgICAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgX3RoaXMubWFya2Vyc18gPSBbXTtcbiAgICAgICAgX3RoaXMuY2x1c3RlcnNfID0gW107XG4gICAgICAgIF90aGlzLmxpc3RlbmVyc18gPSBbXTtcbiAgICAgICAgX3RoaXMuYWN0aXZlTWFwXyA9IG51bGw7XG4gICAgICAgIF90aGlzLnJlYWR5XyA9IGZhbHNlO1xuICAgICAgICBfdGhpcy5hcmlhTGFiZWxGbiA9IF90aGlzLm9wdGlvbnMuYXJpYUxhYmVsRm4gfHwgKGZ1bmN0aW9uICgpIHsgcmV0dXJuIFwiXCI7IH0pO1xuICAgICAgICBfdGhpcy56SW5kZXhfID0gX3RoaXMub3B0aW9ucy56SW5kZXggfHwgTnVtYmVyKGdvb2dsZS5tYXBzLk1hcmtlci5NQVhfWklOREVYKSArIDE7XG4gICAgICAgIF90aGlzLmdyaWRTaXplXyA9IF90aGlzLm9wdGlvbnMuZ3JpZFNpemUgfHwgNjA7XG4gICAgICAgIF90aGlzLm1pbkNsdXN0ZXJTaXplXyA9IF90aGlzLm9wdGlvbnMubWluaW11bUNsdXN0ZXJTaXplIHx8IDI7XG4gICAgICAgIF90aGlzLm1heFpvb21fID0gX3RoaXMub3B0aW9ucy5tYXhab29tIHx8IG51bGw7XG4gICAgICAgIF90aGlzLnN0eWxlc18gPSBfdGhpcy5vcHRpb25zLnN0eWxlcyB8fCBbXTtcbiAgICAgICAgX3RoaXMudGl0bGVfID0gX3RoaXMub3B0aW9ucy50aXRsZSB8fCBcIlwiO1xuICAgICAgICBfdGhpcy56b29tT25DbGlja18gPSBnZXRPcHRpb24oX3RoaXMub3B0aW9ucywgXCJ6b29tT25DbGlja1wiLCB0cnVlKTtcbiAgICAgICAgX3RoaXMuYXZlcmFnZUNlbnRlcl8gPSBnZXRPcHRpb24oX3RoaXMub3B0aW9ucywgXCJhdmVyYWdlQ2VudGVyXCIsIGZhbHNlKTtcbiAgICAgICAgX3RoaXMuaWdub3JlSGlkZGVuXyA9IGdldE9wdGlvbihfdGhpcy5vcHRpb25zLCBcImlnbm9yZUhpZGRlblwiLCBmYWxzZSk7XG4gICAgICAgIF90aGlzLmVuYWJsZVJldGluYUljb25zXyA9IGdldE9wdGlvbihfdGhpcy5vcHRpb25zLCBcImVuYWJsZVJldGluYUljb25zXCIsIGZhbHNlKTtcbiAgICAgICAgX3RoaXMuaW1hZ2VQYXRoXyA9IF90aGlzLm9wdGlvbnMuaW1hZ2VQYXRoIHx8IE1hcmtlckNsdXN0ZXJlci5JTUFHRV9QQVRIO1xuICAgICAgICBfdGhpcy5pbWFnZUV4dGVuc2lvbl8gPSBfdGhpcy5vcHRpb25zLmltYWdlRXh0ZW5zaW9uIHx8IE1hcmtlckNsdXN0ZXJlci5JTUFHRV9FWFRFTlNJT047XG4gICAgICAgIF90aGlzLmltYWdlU2l6ZXNfID0gX3RoaXMub3B0aW9ucy5pbWFnZVNpemVzIHx8IE1hcmtlckNsdXN0ZXJlci5JTUFHRV9TSVpFUztcbiAgICAgICAgX3RoaXMuY2FsY3VsYXRvcl8gPSBfdGhpcy5vcHRpb25zLmNhbGN1bGF0b3IgfHwgTWFya2VyQ2x1c3RlcmVyLkNBTENVTEFUT1I7XG4gICAgICAgIF90aGlzLmJhdGNoU2l6ZV8gPSBfdGhpcy5vcHRpb25zLmJhdGNoU2l6ZSB8fCBNYXJrZXJDbHVzdGVyZXIuQkFUQ0hfU0laRTtcbiAgICAgICAgX3RoaXMuYmF0Y2hTaXplSUVfID0gX3RoaXMub3B0aW9ucy5iYXRjaFNpemVJRSB8fCBNYXJrZXJDbHVzdGVyZXIuQkFUQ0hfU0laRV9JRTtcbiAgICAgICAgX3RoaXMuY2x1c3RlckNsYXNzXyA9IF90aGlzLm9wdGlvbnMuY2x1c3RlckNsYXNzIHx8IFwiY2x1c3RlclwiO1xuICAgICAgICBpZiAobmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLmluZGV4T2YoXCJtc2llXCIpICE9PSAtMSkge1xuICAgICAgICAgICAgLy8gVHJ5IHRvIGF2b2lkIElFIHRpbWVvdXQgd2hlbiBwcm9jZXNzaW5nIGEgaHVnZSBudW1iZXIgb2YgbWFya2VyczpcbiAgICAgICAgICAgIF90aGlzLmJhdGNoU2l6ZV8gPSBfdGhpcy5iYXRjaFNpemVJRV87XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuc2V0dXBTdHlsZXNfKCk7XG4gICAgICAgIF90aGlzLmFkZE1hcmtlcnMobWFya2VycywgdHJ1ZSk7XG4gICAgICAgIF90aGlzLnNldE1hcChtYXApOyAvLyBOb3RlOiB0aGlzIGNhdXNlcyBvbkFkZCB0byBiZSBjYWxsZWRcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbXBsZW1lbnRhdGlvbiBvZiB0aGUgb25BZGQgaW50ZXJmYWNlIG1ldGhvZC5cbiAgICAgKiBAaWdub3JlXG4gICAgICovXG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5vbkFkZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5hY3RpdmVNYXBfID0gdGhpcy5nZXRNYXAoKTtcbiAgICAgICAgdGhpcy5yZWFkeV8gPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGFpbnQoKTtcbiAgICAgICAgdGhpcy5wcmV2Wm9vbV8gPSB0aGlzLmdldE1hcCgpLmdldFpvb20oKTtcbiAgICAgICAgLy8gQWRkIHRoZSBtYXAgZXZlbnQgbGlzdGVuZXJzXG4gICAgICAgIHRoaXMubGlzdGVuZXJzXyA9IFtcbiAgICAgICAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKHRoaXMuZ2V0TWFwKCksIFwiem9vbV9jaGFuZ2VkXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgbWFwID0gX3RoaXMuZ2V0TWFwKCk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICAgICAgICAgIC8vIEZpeCBmb3IgYnVnICM0MDdcbiAgICAgICAgICAgICAgICAvLyBEZXRlcm1pbmVzIG1hcCB0eXBlIGFuZCBwcmV2ZW50cyBpbGxlZ2FsIHpvb20gbGV2ZWxzXG4gICAgICAgICAgICAgICAgdmFyIG1pblpvb20gPSBtYXAubWluWm9vbSB8fCAwO1xuICAgICAgICAgICAgICAgIHZhciBtYXhab29tID0gTWF0aC5taW4obWFwLm1heFpvb20gfHwgMTAwLCBtYXAubWFwVHlwZXNbbWFwLmdldE1hcFR5cGVJZCgpXS5tYXhab29tKTtcbiAgICAgICAgICAgICAgICB2YXIgem9vbSA9IE1hdGgubWluKE1hdGgubWF4KF90aGlzLmdldE1hcCgpLmdldFpvb20oKSwgbWluWm9vbSksIG1heFpvb20pO1xuICAgICAgICAgICAgICAgIGlmIChfdGhpcy5wcmV2Wm9vbV8gIT0gem9vbSkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5wcmV2Wm9vbV8gPSB6b29tO1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5yZXNldFZpZXdwb3J0XyhmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcih0aGlzLmdldE1hcCgpLCBcImlkbGVcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF90aGlzLnJlZHJhd18oKTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICBdO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogSW1wbGVtZW50YXRpb24gb2YgdGhlIG9uUmVtb3ZlIGludGVyZmFjZSBtZXRob2QuXG4gICAgICogUmVtb3ZlcyBtYXAgZXZlbnQgbGlzdGVuZXJzIGFuZCBhbGwgY2x1c3RlciBpY29ucyBmcm9tIHRoZSBET00uXG4gICAgICogQWxsIG1hbmFnZWQgbWFya2VycyBhcmUgYWxzbyBwdXQgYmFjayBvbiB0aGUgbWFwLlxuICAgICAqIEBpZ25vcmVcbiAgICAgKi9cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLm9uUmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBQdXQgYWxsIHRoZSBtYW5hZ2VkIG1hcmtlcnMgYmFjayBvbiB0aGUgbWFwOlxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubWFya2Vyc18ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm1hcmtlcnNfW2ldLmdldE1hcCgpICE9PSB0aGlzLmFjdGl2ZU1hcF8pIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcmtlcnNfW2ldLnNldE1hcCh0aGlzLmFjdGl2ZU1hcF8pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIFJlbW92ZSBhbGwgY2x1c3RlcnM6XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jbHVzdGVyc18ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuY2x1c3RlcnNfW2ldLnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2x1c3RlcnNfID0gW107XG4gICAgICAgIC8vIFJlbW92ZSBtYXAgZXZlbnQgbGlzdGVuZXJzOlxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGlzdGVuZXJzXy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQucmVtb3ZlTGlzdGVuZXIodGhpcy5saXN0ZW5lcnNfW2ldKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxpc3RlbmVyc18gPSBbXTtcbiAgICAgICAgdGhpcy5hY3RpdmVNYXBfID0gbnVsbDtcbiAgICAgICAgdGhpcy5yZWFkeV8gPSBmYWxzZTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEltcGxlbWVudGF0aW9uIG9mIHRoZSBkcmF3IGludGVyZmFjZSBtZXRob2QuXG4gICAgICogQGlnbm9yZVxuICAgICAqL1xuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZHJhdyA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgICAvKipcbiAgICAgKiBTZXRzIHVwIHRoZSBzdHlsZXMgb2JqZWN0LlxuICAgICAqL1xuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuc2V0dXBTdHlsZXNfID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5zdHlsZXNfLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuaW1hZ2VTaXplc18ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBzaXplID0gdGhpcy5pbWFnZVNpemVzX1tpXTtcbiAgICAgICAgICAgIHRoaXMuc3R5bGVzXy5wdXNoKE1hcmtlckNsdXN0ZXJlci53aXRoRGVmYXVsdFN0eWxlKHtcbiAgICAgICAgICAgICAgICB1cmw6IHRoaXMuaW1hZ2VQYXRoXyArIChpICsgMSkgKyBcIi5cIiArIHRoaXMuaW1hZ2VFeHRlbnNpb25fLFxuICAgICAgICAgICAgICAgIGhlaWdodDogc2l6ZSxcbiAgICAgICAgICAgICAgICB3aWR0aDogc2l6ZVxuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiAgRml0cyB0aGUgbWFwIHRvIHRoZSBib3VuZHMgb2YgdGhlIG1hcmtlcnMgbWFuYWdlZCBieSB0aGUgY2x1c3RlcmVyLlxuICAgICAqL1xuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZml0TWFwVG9NYXJrZXJzID0gZnVuY3Rpb24gKHBhZGRpbmcpIHtcbiAgICAgICAgdmFyIG1hcmtlcnMgPSB0aGlzLmdldE1hcmtlcnMoKTtcbiAgICAgICAgdmFyIGJvdW5kcyA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmdCb3VuZHMoKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtYXJrZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAvLyBNYXJjaCAzLCAyMDE4OiBCdWcgZml4IC0tIGhvbm9yIHRoZSBpZ25vcmVIaWRkZW4gcHJvcGVydHlcbiAgICAgICAgICAgIGlmIChtYXJrZXJzW2ldLmdldFZpc2libGUoKSB8fCAhdGhpcy5nZXRJZ25vcmVIaWRkZW4oKSkge1xuICAgICAgICAgICAgICAgIGJvdW5kcy5leHRlbmQobWFya2Vyc1tpXS5nZXRQb3NpdGlvbigpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmdldE1hcCgpLmZpdEJvdW5kcyhib3VuZHMsIHBhZGRpbmcpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgdmFsdWUgb2YgdGhlIGBncmlkU2l6ZWAgcHJvcGVydHkuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIFRoZSBncmlkIHNpemUuXG4gICAgICovXG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRHcmlkU2l6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ3JpZFNpemVfO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgdmFsdWUgb2YgdGhlIGBncmlkU2l6ZWAgcHJvcGVydHkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZ3JpZFNpemUgVGhlIGdyaWQgc2l6ZS5cbiAgICAgKi9cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnNldEdyaWRTaXplID0gZnVuY3Rpb24gKGdyaWRTaXplKSB7XG4gICAgICAgIHRoaXMuZ3JpZFNpemVfID0gZ3JpZFNpemU7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSB2YWx1ZSBvZiB0aGUgYG1pbmltdW1DbHVzdGVyU2l6ZWAgcHJvcGVydHkuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIFRoZSBtaW5pbXVtIGNsdXN0ZXIgc2l6ZS5cbiAgICAgKi9cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldE1pbmltdW1DbHVzdGVyU2l6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWluQ2x1c3RlclNpemVfO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgdmFsdWUgb2YgdGhlIGBtaW5pbXVtQ2x1c3RlclNpemVgIHByb3BlcnR5LlxuICAgICAqXG4gICAgICogQHBhcmFtIG1pbmltdW1DbHVzdGVyU2l6ZSBUaGUgbWluaW11bSBjbHVzdGVyIHNpemUuXG4gICAgICovXG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5zZXRNaW5pbXVtQ2x1c3RlclNpemUgPSBmdW5jdGlvbiAobWluaW11bUNsdXN0ZXJTaXplKSB7XG4gICAgICAgIHRoaXMubWluQ2x1c3RlclNpemVfID0gbWluaW11bUNsdXN0ZXJTaXplO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogIFJldHVybnMgdGhlIHZhbHVlIG9mIHRoZSBgbWF4Wm9vbWAgcHJvcGVydHkuXG4gICAgICpcbiAgICAgKiAgQHJldHVybiBUaGUgbWF4aW11bSB6b29tIGxldmVsLlxuICAgICAqL1xuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0TWF4Wm9vbSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWF4Wm9vbV87XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiAgU2V0cyB0aGUgdmFsdWUgb2YgdGhlIGBtYXhab29tYCBwcm9wZXJ0eS5cbiAgICAgKlxuICAgICAqICBAcGFyYW0gbWF4Wm9vbSBUaGUgbWF4aW11bSB6b29tIGxldmVsLlxuICAgICAqL1xuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuc2V0TWF4Wm9vbSA9IGZ1bmN0aW9uIChtYXhab29tKSB7XG4gICAgICAgIHRoaXMubWF4Wm9vbV8gPSBtYXhab29tO1xuICAgIH07XG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRaSW5kZXggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnpJbmRleF87XG4gICAgfTtcbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnNldFpJbmRleCA9IGZ1bmN0aW9uICh6SW5kZXgpIHtcbiAgICAgICAgdGhpcy56SW5kZXhfID0gekluZGV4O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogIFJldHVybnMgdGhlIHZhbHVlIG9mIHRoZSBgc3R5bGVzYCBwcm9wZXJ0eS5cbiAgICAgKlxuICAgICAqICBAcmV0dXJuIFRoZSBhcnJheSBvZiBzdHlsZXMgZGVmaW5pbmcgdGhlIGNsdXN0ZXIgbWFya2VycyB0byBiZSB1c2VkLlxuICAgICAqL1xuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0U3R5bGVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdHlsZXNfO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogIFNldHMgdGhlIHZhbHVlIG9mIHRoZSBgc3R5bGVzYCBwcm9wZXJ0eS5cbiAgICAgKlxuICAgICAqICBAcGFyYW0gc3R5bGVzIFRoZSBhcnJheSBvZiBzdHlsZXMgdG8gdXNlLlxuICAgICAqL1xuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuc2V0U3R5bGVzID0gZnVuY3Rpb24gKHN0eWxlcykge1xuICAgICAgICB0aGlzLnN0eWxlc18gPSBzdHlsZXM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSB2YWx1ZSBvZiB0aGUgYHRpdGxlYCBwcm9wZXJ0eS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4gVGhlIGNvbnRlbnQgb2YgdGhlIHRpdGxlIHRleHQuXG4gICAgICovXG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRUaXRsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGl0bGVfO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogIFNldHMgdGhlIHZhbHVlIG9mIHRoZSBgdGl0bGVgIHByb3BlcnR5LlxuICAgICAqXG4gICAgICogIEBwYXJhbSB0aXRsZSBUaGUgdmFsdWUgb2YgdGhlIHRpdGxlIHByb3BlcnR5LlxuICAgICAqL1xuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuc2V0VGl0bGUgPSBmdW5jdGlvbiAodGl0bGUpIHtcbiAgICAgICAgdGhpcy50aXRsZV8gPSB0aXRsZTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHZhbHVlIG9mIHRoZSBgem9vbU9uQ2xpY2tgIHByb3BlcnR5LlxuICAgICAqXG4gICAgICogQHJldHVybiBUcnVlIGlmIHpvb21PbkNsaWNrIHByb3BlcnR5IGlzIHNldC5cbiAgICAgKi9cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldFpvb21PbkNsaWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy56b29tT25DbGlja187XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiAgU2V0cyB0aGUgdmFsdWUgb2YgdGhlIGB6b29tT25DbGlja2AgcHJvcGVydHkuXG4gICAgICpcbiAgICAgKiAgQHBhcmFtIHpvb21PbkNsaWNrIFRoZSB2YWx1ZSBvZiB0aGUgem9vbU9uQ2xpY2sgcHJvcGVydHkuXG4gICAgICovXG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5zZXRab29tT25DbGljayA9IGZ1bmN0aW9uICh6b29tT25DbGljaykge1xuICAgICAgICB0aGlzLnpvb21PbkNsaWNrXyA9IHpvb21PbkNsaWNrO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgdmFsdWUgb2YgdGhlIGBhdmVyYWdlQ2VudGVyYCBwcm9wZXJ0eS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4gVHJ1ZSBpZiBhdmVyYWdlQ2VudGVyIHByb3BlcnR5IGlzIHNldC5cbiAgICAgKi9cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldEF2ZXJhZ2VDZW50ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmF2ZXJhZ2VDZW50ZXJfO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogIFNldHMgdGhlIHZhbHVlIG9mIHRoZSBgYXZlcmFnZUNlbnRlcmAgcHJvcGVydHkuXG4gICAgICpcbiAgICAgKiAgQHBhcmFtIGF2ZXJhZ2VDZW50ZXIgVGhlIHZhbHVlIG9mIHRoZSBhdmVyYWdlQ2VudGVyIHByb3BlcnR5LlxuICAgICAqL1xuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuc2V0QXZlcmFnZUNlbnRlciA9IGZ1bmN0aW9uIChhdmVyYWdlQ2VudGVyKSB7XG4gICAgICAgIHRoaXMuYXZlcmFnZUNlbnRlcl8gPSBhdmVyYWdlQ2VudGVyO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgdmFsdWUgb2YgdGhlIGBpZ25vcmVIaWRkZW5gIHByb3BlcnR5LlxuICAgICAqXG4gICAgICogQHJldHVybiBUcnVlIGlmIGlnbm9yZUhpZGRlbiBwcm9wZXJ0eSBpcyBzZXQuXG4gICAgICovXG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRJZ25vcmVIaWRkZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlnbm9yZUhpZGRlbl87XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiAgU2V0cyB0aGUgdmFsdWUgb2YgdGhlIGBpZ25vcmVIaWRkZW5gIHByb3BlcnR5LlxuICAgICAqXG4gICAgICogIEBwYXJhbSBpZ25vcmVIaWRkZW4gVGhlIHZhbHVlIG9mIHRoZSBpZ25vcmVIaWRkZW4gcHJvcGVydHkuXG4gICAgICovXG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5zZXRJZ25vcmVIaWRkZW4gPSBmdW5jdGlvbiAoaWdub3JlSGlkZGVuKSB7XG4gICAgICAgIHRoaXMuaWdub3JlSGlkZGVuXyA9IGlnbm9yZUhpZGRlbjtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHZhbHVlIG9mIHRoZSBgZW5hYmxlUmV0aW5hSWNvbnNgIHByb3BlcnR5LlxuICAgICAqXG4gICAgICogQHJldHVybiBUcnVlIGlmIGVuYWJsZVJldGluYUljb25zIHByb3BlcnR5IGlzIHNldC5cbiAgICAgKi9cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldEVuYWJsZVJldGluYUljb25zID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbmFibGVSZXRpbmFJY29uc187XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiAgU2V0cyB0aGUgdmFsdWUgb2YgdGhlIGBlbmFibGVSZXRpbmFJY29uc2AgcHJvcGVydHkuXG4gICAgICpcbiAgICAgKiAgQHBhcmFtIGVuYWJsZVJldGluYUljb25zIFRoZSB2YWx1ZSBvZiB0aGUgZW5hYmxlUmV0aW5hSWNvbnMgcHJvcGVydHkuXG4gICAgICovXG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5zZXRFbmFibGVSZXRpbmFJY29ucyA9IGZ1bmN0aW9uIChlbmFibGVSZXRpbmFJY29ucykge1xuICAgICAgICB0aGlzLmVuYWJsZVJldGluYUljb25zXyA9IGVuYWJsZVJldGluYUljb25zO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgdmFsdWUgb2YgdGhlIGBpbWFnZUV4dGVuc2lvbmAgcHJvcGVydHkuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIFRoZSB2YWx1ZSBvZiB0aGUgaW1hZ2VFeHRlbnNpb24gcHJvcGVydHkuXG4gICAgICovXG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRJbWFnZUV4dGVuc2lvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW1hZ2VFeHRlbnNpb25fO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogIFNldHMgdGhlIHZhbHVlIG9mIHRoZSBgaW1hZ2VFeHRlbnNpb25gIHByb3BlcnR5LlxuICAgICAqXG4gICAgICogIEBwYXJhbSBpbWFnZUV4dGVuc2lvbiBUaGUgdmFsdWUgb2YgdGhlIGltYWdlRXh0ZW5zaW9uIHByb3BlcnR5LlxuICAgICAqL1xuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuc2V0SW1hZ2VFeHRlbnNpb24gPSBmdW5jdGlvbiAoaW1hZ2VFeHRlbnNpb24pIHtcbiAgICAgICAgdGhpcy5pbWFnZUV4dGVuc2lvbl8gPSBpbWFnZUV4dGVuc2lvbjtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHZhbHVlIG9mIHRoZSBgaW1hZ2VQYXRoYCBwcm9wZXJ0eS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4gVGhlIHZhbHVlIG9mIHRoZSBpbWFnZVBhdGggcHJvcGVydHkuXG4gICAgICovXG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRJbWFnZVBhdGggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmltYWdlUGF0aF87XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiAgU2V0cyB0aGUgdmFsdWUgb2YgdGhlIGBpbWFnZVBhdGhgIHByb3BlcnR5LlxuICAgICAqXG4gICAgICogIEBwYXJhbSBpbWFnZVBhdGggVGhlIHZhbHVlIG9mIHRoZSBpbWFnZVBhdGggcHJvcGVydHkuXG4gICAgICovXG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5zZXRJbWFnZVBhdGggPSBmdW5jdGlvbiAoaW1hZ2VQYXRoKSB7XG4gICAgICAgIHRoaXMuaW1hZ2VQYXRoXyA9IGltYWdlUGF0aDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHZhbHVlIG9mIHRoZSBgaW1hZ2VTaXplc2AgcHJvcGVydHkuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIFRoZSB2YWx1ZSBvZiB0aGUgaW1hZ2VTaXplcyBwcm9wZXJ0eS5cbiAgICAgKi9cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldEltYWdlU2l6ZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmltYWdlU2l6ZXNfO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogIFNldHMgdGhlIHZhbHVlIG9mIHRoZSBgaW1hZ2VTaXplc2AgcHJvcGVydHkuXG4gICAgICpcbiAgICAgKiAgQHBhcmFtIGltYWdlU2l6ZXMgVGhlIHZhbHVlIG9mIHRoZSBpbWFnZVNpemVzIHByb3BlcnR5LlxuICAgICAqL1xuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuc2V0SW1hZ2VTaXplcyA9IGZ1bmN0aW9uIChpbWFnZVNpemVzKSB7XG4gICAgICAgIHRoaXMuaW1hZ2VTaXplc18gPSBpbWFnZVNpemVzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgdmFsdWUgb2YgdGhlIGBjYWxjdWxhdG9yYCBwcm9wZXJ0eS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4gdGhlIHZhbHVlIG9mIHRoZSBjYWxjdWxhdG9yIHByb3BlcnR5LlxuICAgICAqL1xuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0Q2FsY3VsYXRvciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FsY3VsYXRvcl87XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSB2YWx1ZSBvZiB0aGUgYGNhbGN1bGF0b3JgIHByb3BlcnR5LlxuICAgICAqXG4gICAgICogQHBhcmFtIGNhbGN1bGF0b3IgVGhlIHZhbHVlIG9mIHRoZSBjYWxjdWxhdG9yIHByb3BlcnR5LlxuICAgICAqL1xuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuc2V0Q2FsY3VsYXRvciA9IGZ1bmN0aW9uIChjYWxjdWxhdG9yKSB7XG4gICAgICAgIHRoaXMuY2FsY3VsYXRvcl8gPSBjYWxjdWxhdG9yO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgdmFsdWUgb2YgdGhlIGBiYXRjaFNpemVJRWAgcHJvcGVydHkuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHRoZSB2YWx1ZSBvZiB0aGUgYmF0Y2hTaXplSUUgcHJvcGVydHkuXG4gICAgICovXG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRCYXRjaFNpemVJRSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYmF0Y2hTaXplSUVfO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgdmFsdWUgb2YgdGhlIGBiYXRjaFNpemVJRWAgcHJvcGVydHkuXG4gICAgICpcbiAgICAgKiAgQHBhcmFtIGJhdGNoU2l6ZUlFIFRoZSB2YWx1ZSBvZiB0aGUgYmF0Y2hTaXplSUUgcHJvcGVydHkuXG4gICAgICovXG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5zZXRCYXRjaFNpemVJRSA9IGZ1bmN0aW9uIChiYXRjaFNpemVJRSkge1xuICAgICAgICB0aGlzLmJhdGNoU2l6ZUlFXyA9IGJhdGNoU2l6ZUlFO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgdmFsdWUgb2YgdGhlIGBjbHVzdGVyQ2xhc3NgIHByb3BlcnR5LlxuICAgICAqXG4gICAgICogQHJldHVybiB0aGUgdmFsdWUgb2YgdGhlIGNsdXN0ZXJDbGFzcyBwcm9wZXJ0eS5cbiAgICAgKi9cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldENsdXN0ZXJDbGFzcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2x1c3RlckNsYXNzXztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHZhbHVlIG9mIHRoZSBgY2x1c3RlckNsYXNzYCBwcm9wZXJ0eS5cbiAgICAgKlxuICAgICAqICBAcGFyYW0gY2x1c3RlckNsYXNzIFRoZSB2YWx1ZSBvZiB0aGUgY2x1c3RlckNsYXNzIHByb3BlcnR5LlxuICAgICAqL1xuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuc2V0Q2x1c3RlckNsYXNzID0gZnVuY3Rpb24gKGNsdXN0ZXJDbGFzcykge1xuICAgICAgICB0aGlzLmNsdXN0ZXJDbGFzc18gPSBjbHVzdGVyQ2xhc3M7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiAgUmV0dXJucyB0aGUgYXJyYXkgb2YgbWFya2VycyBtYW5hZ2VkIGJ5IHRoZSBjbHVzdGVyZXIuXG4gICAgICpcbiAgICAgKiAgQHJldHVybiBUaGUgYXJyYXkgb2YgbWFya2VycyBtYW5hZ2VkIGJ5IHRoZSBjbHVzdGVyZXIuXG4gICAgICovXG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRNYXJrZXJzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXJrZXJzXztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqICBSZXR1cm5zIHRoZSBudW1iZXIgb2YgbWFya2VycyBtYW5hZ2VkIGJ5IHRoZSBjbHVzdGVyZXIuXG4gICAgICpcbiAgICAgKiAgQHJldHVybiBUaGUgbnVtYmVyIG9mIG1hcmtlcnMuXG4gICAgICovXG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRUb3RhbE1hcmtlcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hcmtlcnNfLmxlbmd0aDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGN1cnJlbnQgYXJyYXkgb2YgY2x1c3RlcnMgZm9ybWVkIGJ5IHRoZSBjbHVzdGVyZXIuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIFRoZSBhcnJheSBvZiBjbHVzdGVycyBmb3JtZWQgYnkgdGhlIGNsdXN0ZXJlci5cbiAgICAgKi9cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldENsdXN0ZXJzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jbHVzdGVyc187XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgY2x1c3RlcnMgZm9ybWVkIGJ5IHRoZSBjbHVzdGVyZXIuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIFRoZSBudW1iZXIgb2YgY2x1c3RlcnMgZm9ybWVkIGJ5IHRoZSBjbHVzdGVyZXIuXG4gICAgICovXG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRUb3RhbENsdXN0ZXJzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jbHVzdGVyc18ubGVuZ3RoO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQWRkcyBhIG1hcmtlciB0byB0aGUgY2x1c3RlcmVyLiBUaGUgY2x1c3RlcnMgYXJlIHJlZHJhd24gdW5sZXNzXG4gICAgICogIGBub2RyYXdgIGlzIHNldCB0byBgdHJ1ZWAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbWFya2VyIFRoZSBtYXJrZXIgdG8gYWRkLlxuICAgICAqIEBwYXJhbSBub2RyYXcgU2V0IHRvIGB0cnVlYCB0byBwcmV2ZW50IHJlZHJhd2luZy5cbiAgICAgKi9cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmFkZE1hcmtlciA9IGZ1bmN0aW9uIChtYXJrZXIsIG5vZHJhdykge1xuICAgICAgICB0aGlzLnB1c2hNYXJrZXJUb18obWFya2VyKTtcbiAgICAgICAgaWYgKCFub2RyYXcpIHtcbiAgICAgICAgICAgIHRoaXMucmVkcmF3XygpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBBZGRzIGFuIGFycmF5IG9mIG1hcmtlcnMgdG8gdGhlIGNsdXN0ZXJlci4gVGhlIGNsdXN0ZXJzIGFyZSByZWRyYXduIHVubGVzc1xuICAgICAqICBgbm9kcmF3YCBpcyBzZXQgdG8gYHRydWVgLlxuICAgICAqXG4gICAgICogQHBhcmFtIG1hcmtlcnMgVGhlIG1hcmtlcnMgdG8gYWRkLlxuICAgICAqIEBwYXJhbSBub2RyYXcgU2V0IHRvIGB0cnVlYCB0byBwcmV2ZW50IHJlZHJhd2luZy5cbiAgICAgKi9cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmFkZE1hcmtlcnMgPSBmdW5jdGlvbiAobWFya2Vycywgbm9kcmF3KSB7XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBtYXJrZXJzKSB7XG4gICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1hcmtlcnMsIGtleSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnB1c2hNYXJrZXJUb18obWFya2Vyc1trZXldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIW5vZHJhdykge1xuICAgICAgICAgICAgdGhpcy5yZWRyYXdfKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFB1c2hlcyBhIG1hcmtlciB0byB0aGUgY2x1c3RlcmVyLlxuICAgICAqXG4gICAgICogQHBhcmFtIG1hcmtlciBUaGUgbWFya2VyIHRvIGFkZC5cbiAgICAgKi9cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnB1c2hNYXJrZXJUb18gPSBmdW5jdGlvbiAobWFya2VyKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIC8vIElmIHRoZSBtYXJrZXIgaXMgZHJhZ2dhYmxlIGFkZCBhIGxpc3RlbmVyIHNvIHdlIGNhbiB1cGRhdGUgdGhlIGNsdXN0ZXJzIG9uIHRoZSBkcmFnZW5kOlxuICAgICAgICBpZiAobWFya2VyLmdldERyYWdnYWJsZSgpKSB7XG4gICAgICAgICAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXJrZXIsIFwiZHJhZ2VuZFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKF90aGlzLnJlYWR5Xykge1xuICAgICAgICAgICAgICAgICAgICBtYXJrZXIuaXNBZGRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5yZXBhaW50KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgbWFya2VyLmlzQWRkZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5tYXJrZXJzXy5wdXNoKG1hcmtlcik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGEgbWFya2VyIGZyb20gdGhlIGNsdXN0ZXIuICBUaGUgY2x1c3RlcnMgYXJlIHJlZHJhd24gdW5sZXNzXG4gICAgICogIGBub2RyYXdgIGlzIHNldCB0byBgdHJ1ZWAuIFJldHVybnMgYHRydWVgIGlmIHRoZVxuICAgICAqICBtYXJrZXIgd2FzIHJlbW92ZWQgZnJvbSB0aGUgY2x1c3RlcmVyLlxuICAgICAqXG4gICAgICogQHBhcmFtIG1hcmtlciBUaGUgbWFya2VyIHRvIHJlbW92ZS5cbiAgICAgKiBAcGFyYW0gbm9kcmF3IFNldCB0byBgdHJ1ZWAgdG8gcHJldmVudCByZWRyYXdpbmcuXG4gICAgICogQHJldHVybiBUcnVlIGlmIHRoZSBtYXJrZXIgd2FzIHJlbW92ZWQgZnJvbSB0aGUgY2x1c3RlcmVyLlxuICAgICAqL1xuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUucmVtb3ZlTWFya2VyID0gZnVuY3Rpb24gKG1hcmtlciwgbm9kcmF3KSB7XG4gICAgICAgIHZhciByZW1vdmVkID0gdGhpcy5yZW1vdmVNYXJrZXJfKG1hcmtlcik7XG4gICAgICAgIGlmICghbm9kcmF3ICYmIHJlbW92ZWQpIHtcbiAgICAgICAgICAgIHRoaXMucmVwYWludCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZW1vdmVkO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhbiBhcnJheSBvZiBtYXJrZXJzIGZyb20gdGhlIGNsdXN0ZXIuIFRoZSBjbHVzdGVycyBhcmUgcmVkcmF3biB1bmxlc3NcbiAgICAgKiAgYG5vZHJhd2AgaXMgc2V0IHRvIGB0cnVlYC4gUmV0dXJucyBgdHJ1ZWAgaWYgbWFya2VycyB3ZXJlIHJlbW92ZWQgZnJvbSB0aGUgY2x1c3RlcmVyLlxuICAgICAqXG4gICAgICogQHBhcmFtIG1hcmtlcnMgVGhlIG1hcmtlcnMgdG8gcmVtb3ZlLlxuICAgICAqIEBwYXJhbSBub2RyYXcgU2V0IHRvIGB0cnVlYCB0byBwcmV2ZW50IHJlZHJhd2luZy5cbiAgICAgKiBAcmV0dXJuIFRydWUgaWYgbWFya2VycyB3ZXJlIHJlbW92ZWQgZnJvbSB0aGUgY2x1c3RlcmVyLlxuICAgICAqL1xuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUucmVtb3ZlTWFya2VycyA9IGZ1bmN0aW9uIChtYXJrZXJzLCBub2RyYXcpIHtcbiAgICAgICAgdmFyIHJlbW92ZWQgPSBmYWxzZTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtYXJrZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgciA9IHRoaXMucmVtb3ZlTWFya2VyXyhtYXJrZXJzW2ldKTtcbiAgICAgICAgICAgIHJlbW92ZWQgPSByZW1vdmVkIHx8IHI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFub2RyYXcgJiYgcmVtb3ZlZCkge1xuICAgICAgICAgICAgdGhpcy5yZXBhaW50KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlbW92ZWQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGEgbWFya2VyIGFuZCByZXR1cm5zIHRydWUgaWYgcmVtb3ZlZCwgZmFsc2UgaWYgbm90LlxuICAgICAqXG4gICAgICogQHBhcmFtIG1hcmtlciBUaGUgbWFya2VyIHRvIHJlbW92ZVxuICAgICAqIEByZXR1cm4gV2hldGhlciB0aGUgbWFya2VyIHdhcyByZW1vdmVkIG9yIG5vdFxuICAgICAqL1xuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUucmVtb3ZlTWFya2VyXyA9IGZ1bmN0aW9uIChtYXJrZXIpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gLTE7XG4gICAgICAgIGlmICh0aGlzLm1hcmtlcnNfLmluZGV4T2YpIHtcbiAgICAgICAgICAgIGluZGV4ID0gdGhpcy5tYXJrZXJzXy5pbmRleE9mKG1hcmtlcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubWFya2Vyc18ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAobWFya2VyID09PSB0aGlzLm1hcmtlcnNfW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gaTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgIC8vIE1hcmtlciBpcyBub3QgaW4gb3VyIGxpc3Qgb2YgbWFya2Vycywgc28gZG8gbm90aGluZzpcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBtYXJrZXIuc2V0TWFwKG51bGwpO1xuICAgICAgICB0aGlzLm1hcmtlcnNfLnNwbGljZShpbmRleCwgMSk7IC8vIFJlbW92ZSB0aGUgbWFya2VyIGZyb20gdGhlIGxpc3Qgb2YgbWFuYWdlZCBtYXJrZXJzXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhbGwgY2x1c3RlcnMgYW5kIG1hcmtlcnMgZnJvbSB0aGUgbWFwIGFuZCBhbHNvIHJlbW92ZXMgYWxsIG1hcmtlcnNcbiAgICAgKiAgbWFuYWdlZCBieSB0aGUgY2x1c3RlcmVyLlxuICAgICAqL1xuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuY2xlYXJNYXJrZXJzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnJlc2V0Vmlld3BvcnRfKHRydWUpO1xuICAgICAgICB0aGlzLm1hcmtlcnNfID0gW107XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZWNhbGN1bGF0ZXMgYW5kIHJlZHJhd3MgYWxsIHRoZSBtYXJrZXIgY2x1c3RlcnMgZnJvbSBzY3JhdGNoLlxuICAgICAqICBDYWxsIHRoaXMgYWZ0ZXIgY2hhbmdpbmcgYW55IHByb3BlcnRpZXMuXG4gICAgICovXG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5yZXBhaW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgb2xkQ2x1c3RlcnMgPSB0aGlzLmNsdXN0ZXJzXy5zbGljZSgpO1xuICAgICAgICB0aGlzLmNsdXN0ZXJzXyA9IFtdO1xuICAgICAgICB0aGlzLnJlc2V0Vmlld3BvcnRfKGZhbHNlKTtcbiAgICAgICAgdGhpcy5yZWRyYXdfKCk7XG4gICAgICAgIC8vIFJlbW92ZSB0aGUgb2xkIGNsdXN0ZXJzLlxuICAgICAgICAvLyBEbyBpdCBpbiBhIHRpbWVvdXQgdG8gcHJldmVudCBibGlua2luZyBlZmZlY3QuXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvbGRDbHVzdGVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIG9sZENsdXN0ZXJzW2ldLnJlbW92ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAwKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGN1cnJlbnQgYm91bmRzIGV4dGVuZGVkIGJ5IHRoZSBncmlkIHNpemUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gYm91bmRzIFRoZSBib3VuZHMgdG8gZXh0ZW5kLlxuICAgICAqIEByZXR1cm4gVGhlIGV4dGVuZGVkIGJvdW5kcy5cbiAgICAgKiBAaWdub3JlXG4gICAgICovXG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRFeHRlbmRlZEJvdW5kcyA9IGZ1bmN0aW9uIChib3VuZHMpIHtcbiAgICAgICAgdmFyIHByb2plY3Rpb24gPSB0aGlzLmdldFByb2plY3Rpb24oKTtcbiAgICAgICAgLy8gVHVybiB0aGUgYm91bmRzIGludG8gbGF0bG5nLlxuICAgICAgICB2YXIgdHIgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKGJvdW5kcy5nZXROb3J0aEVhc3QoKS5sYXQoKSwgYm91bmRzLmdldE5vcnRoRWFzdCgpLmxuZygpKTtcbiAgICAgICAgdmFyIGJsID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhib3VuZHMuZ2V0U291dGhXZXN0KCkubGF0KCksIGJvdW5kcy5nZXRTb3V0aFdlc3QoKS5sbmcoKSk7XG4gICAgICAgIC8vIENvbnZlcnQgdGhlIHBvaW50cyB0byBwaXhlbHMgYW5kIHRoZSBleHRlbmQgb3V0IGJ5IHRoZSBncmlkIHNpemUuXG4gICAgICAgIHZhciB0clBpeCA9IHByb2plY3Rpb24uZnJvbUxhdExuZ1RvRGl2UGl4ZWwodHIpO1xuICAgICAgICB0clBpeC54ICs9IHRoaXMuZ3JpZFNpemVfO1xuICAgICAgICB0clBpeC55IC09IHRoaXMuZ3JpZFNpemVfO1xuICAgICAgICB2YXIgYmxQaXggPSBwcm9qZWN0aW9uLmZyb21MYXRMbmdUb0RpdlBpeGVsKGJsKTtcbiAgICAgICAgYmxQaXgueCAtPSB0aGlzLmdyaWRTaXplXztcbiAgICAgICAgYmxQaXgueSArPSB0aGlzLmdyaWRTaXplXztcbiAgICAgICAgLy8gQ29udmVydCB0aGUgcGl4ZWwgcG9pbnRzIGJhY2sgdG8gTGF0TG5nXG4gICAgICAgIHZhciBuZSA9IHByb2plY3Rpb24uZnJvbURpdlBpeGVsVG9MYXRMbmcodHJQaXgpO1xuICAgICAgICB2YXIgc3cgPSBwcm9qZWN0aW9uLmZyb21EaXZQaXhlbFRvTGF0TG5nKGJsUGl4KTtcbiAgICAgICAgLy8gRXh0ZW5kIHRoZSBib3VuZHMgdG8gY29udGFpbiB0aGUgbmV3IGJvdW5kcy5cbiAgICAgICAgYm91bmRzLmV4dGVuZChuZSk7XG4gICAgICAgIGJvdW5kcy5leHRlbmQoc3cpO1xuICAgICAgICByZXR1cm4gYm91bmRzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmVkcmF3cyBhbGwgdGhlIGNsdXN0ZXJzLlxuICAgICAqL1xuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUucmVkcmF3XyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5jcmVhdGVDbHVzdGVyc18oMCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGFsbCBjbHVzdGVycyBmcm9tIHRoZSBtYXAuIFRoZSBtYXJrZXJzIGFyZSBhbHNvIHJlbW92ZWQgZnJvbSB0aGUgbWFwXG4gICAgICogIGlmIGBoaWRlYCBpcyBzZXQgdG8gYHRydWVgLlxuICAgICAqXG4gICAgICogQHBhcmFtIGhpZGUgU2V0IHRvIGB0cnVlYCB0byBhbHNvIHJlbW92ZSB0aGUgbWFya2VycyBmcm9tIHRoZSBtYXAuXG4gICAgICovXG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5yZXNldFZpZXdwb3J0XyA9IGZ1bmN0aW9uIChoaWRlKSB7XG4gICAgICAgIC8vIFJlbW92ZSBhbGwgdGhlIGNsdXN0ZXJzXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jbHVzdGVyc18ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuY2x1c3RlcnNfW2ldLnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2x1c3RlcnNfID0gW107XG4gICAgICAgIC8vIFJlc2V0IHRoZSBtYXJrZXJzIHRvIG5vdCBiZSBhZGRlZCBhbmQgdG8gYmUgcmVtb3ZlZCBmcm9tIHRoZSBtYXAuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5tYXJrZXJzXy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIG1hcmtlciA9IHRoaXMubWFya2Vyc19baV07XG4gICAgICAgICAgICBtYXJrZXIuaXNBZGRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKGhpZGUpIHtcbiAgICAgICAgICAgICAgICBtYXJrZXIuc2V0TWFwKG51bGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDYWxjdWxhdGVzIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIHR3byBsYXRsbmcgbG9jYXRpb25zIGluIGttLlxuICAgICAqXG4gICAgICogQHBhcmFtIHAxIFRoZSBmaXJzdCBsYXQgbG5nIHBvaW50LlxuICAgICAqIEBwYXJhbSBwMiBUaGUgc2Vjb25kIGxhdCBsbmcgcG9pbnQuXG4gICAgICogQHJldHVybiBUaGUgZGlzdGFuY2UgYmV0d2VlbiB0aGUgdHdvIHBvaW50cyBpbiBrbS5cbiAgICAgKiBAbGluayBodHRwOi8vd3d3Lm1vdmFibGUtdHlwZS5jby51ay9zY3JpcHRzL2xhdGxvbmcuaHRtbFxuICAgICAqL1xuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZGlzdGFuY2VCZXR3ZWVuUG9pbnRzXyA9IGZ1bmN0aW9uIChwMSwgcDIpIHtcbiAgICAgICAgdmFyIFIgPSA2MzcxOyAvLyBSYWRpdXMgb2YgdGhlIEVhcnRoIGluIGttXG4gICAgICAgIHZhciBkTGF0ID0gKChwMi5sYXQoKSAtIHAxLmxhdCgpKSAqIE1hdGguUEkpIC8gMTgwO1xuICAgICAgICB2YXIgZExvbiA9ICgocDIubG5nKCkgLSBwMS5sbmcoKSkgKiBNYXRoLlBJKSAvIDE4MDtcbiAgICAgICAgdmFyIGEgPSBNYXRoLnNpbihkTGF0IC8gMikgKiBNYXRoLnNpbihkTGF0IC8gMikgK1xuICAgICAgICAgICAgTWF0aC5jb3MoKHAxLmxhdCgpICogTWF0aC5QSSkgLyAxODApICpcbiAgICAgICAgICAgICAgICBNYXRoLmNvcygocDIubGF0KCkgKiBNYXRoLlBJKSAvIDE4MCkgKlxuICAgICAgICAgICAgICAgIE1hdGguc2luKGRMb24gLyAyKSAqXG4gICAgICAgICAgICAgICAgTWF0aC5zaW4oZExvbiAvIDIpO1xuICAgICAgICB2YXIgYyA9IDIgKiBNYXRoLmF0YW4yKE1hdGguc3FydChhKSwgTWF0aC5zcXJ0KDEgLSBhKSk7XG4gICAgICAgIHJldHVybiBSICogYztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIERldGVybWluZXMgaWYgYSBtYXJrZXIgaXMgY29udGFpbmVkIGluIGEgYm91bmRzLlxuICAgICAqXG4gICAgICogQHBhcmFtIG1hcmtlciBUaGUgbWFya2VyIHRvIGNoZWNrLlxuICAgICAqIEBwYXJhbSBib3VuZHMgVGhlIGJvdW5kcyB0byBjaGVjayBhZ2FpbnN0LlxuICAgICAqIEByZXR1cm4gVHJ1ZSBpZiB0aGUgbWFya2VyIGlzIGluIHRoZSBib3VuZHMuXG4gICAgICovXG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5pc01hcmtlckluQm91bmRzXyA9IGZ1bmN0aW9uIChtYXJrZXIsIGJvdW5kcykge1xuICAgICAgICByZXR1cm4gYm91bmRzLmNvbnRhaW5zKG1hcmtlci5nZXRQb3NpdGlvbigpKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEFkZHMgYSBtYXJrZXIgdG8gYSBjbHVzdGVyLCBvciBjcmVhdGVzIGEgbmV3IGNsdXN0ZXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbWFya2VyIFRoZSBtYXJrZXIgdG8gYWRkLlxuICAgICAqL1xuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuYWRkVG9DbG9zZXN0Q2x1c3Rlcl8gPSBmdW5jdGlvbiAobWFya2VyKSB7XG4gICAgICAgIHZhciBkaXN0YW5jZSA9IDQwMDAwOyAvLyBTb21lIGxhcmdlIG51bWJlclxuICAgICAgICB2YXIgY2x1c3RlclRvQWRkVG8gPSBudWxsO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuY2x1c3RlcnNfLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgY2x1c3RlciA9IHRoaXMuY2x1c3RlcnNfW2ldO1xuICAgICAgICAgICAgdmFyIGNlbnRlciA9IGNsdXN0ZXIuZ2V0Q2VudGVyKCk7XG4gICAgICAgICAgICBpZiAoY2VudGVyKSB7XG4gICAgICAgICAgICAgICAgdmFyIGQgPSB0aGlzLmRpc3RhbmNlQmV0d2VlblBvaW50c18oY2VudGVyLCBtYXJrZXIuZ2V0UG9zaXRpb24oKSk7XG4gICAgICAgICAgICAgICAgaWYgKGQgPCBkaXN0YW5jZSkge1xuICAgICAgICAgICAgICAgICAgICBkaXN0YW5jZSA9IGQ7XG4gICAgICAgICAgICAgICAgICAgIGNsdXN0ZXJUb0FkZFRvID0gY2x1c3RlcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNsdXN0ZXJUb0FkZFRvICYmIGNsdXN0ZXJUb0FkZFRvLmlzTWFya2VySW5DbHVzdGVyQm91bmRzKG1hcmtlcikpIHtcbiAgICAgICAgICAgIGNsdXN0ZXJUb0FkZFRvLmFkZE1hcmtlcihtYXJrZXIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIGNsdXN0ZXIgPSBuZXcgQ2x1c3Rlcih0aGlzKTtcbiAgICAgICAgICAgIGNsdXN0ZXIuYWRkTWFya2VyKG1hcmtlcik7XG4gICAgICAgICAgICB0aGlzLmNsdXN0ZXJzXy5wdXNoKGNsdXN0ZXIpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIHRoZSBjbHVzdGVycy4gVGhpcyBpcyBkb25lIGluIGJhdGNoZXMgdG8gYXZvaWQgdGltZW91dCBlcnJvcnNcbiAgICAgKiAgaW4gc29tZSBicm93c2VycyB3aGVuIHRoZXJlIGlzIGEgaHVnZSBudW1iZXIgb2YgbWFya2Vycy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBpRmlyc3QgVGhlIGluZGV4IG9mIHRoZSBmaXJzdCBtYXJrZXIgaW4gdGhlIGJhdGNoIG9mXG4gICAgICogIG1hcmtlcnMgdG8gYmUgYWRkZWQgdG8gY2x1c3RlcnMuXG4gICAgICovXG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5jcmVhdGVDbHVzdGVyc18gPSBmdW5jdGlvbiAoaUZpcnN0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICghdGhpcy5yZWFkeV8pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBDYW5jZWwgcHJldmlvdXMgYmF0Y2ggcHJvY2Vzc2luZyBpZiB3ZSdyZSB3b3JraW5nIG9uIHRoZSBmaXJzdCBiYXRjaDpcbiAgICAgICAgaWYgKGlGaXJzdCA9PT0gMCkge1xuICAgICAgICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQudHJpZ2dlcih0aGlzLCBcImNsdXN0ZXJpbmdiZWdpblwiLCB0aGlzKTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy50aW1lclJlZlN0YXRpYyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVyUmVmU3RhdGljKTtcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy50aW1lclJlZlN0YXRpYztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBHZXQgb3VyIGN1cnJlbnQgbWFwIHZpZXcgYm91bmRzLlxuICAgICAgICAvLyBDcmVhdGUgYSBuZXcgYm91bmRzIG9iamVjdCBzbyB3ZSBkb24ndCBhZmZlY3QgdGhlIG1hcC5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gU2VlIENvbW1lbnRzIDkgJiAxMSBvbiBJc3N1ZSAzNjUxIHJlbGF0aW5nIHRvIHRoaXMgd29ya2Fyb3VuZCBmb3IgYSBHb29nbGUgTWFwcyBidWc6XG4gICAgICAgIHZhciBtYXBCb3VuZHMgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nQm91bmRzKHRoaXMuZ2V0TWFwKCkuZ2V0Qm91bmRzKCkuZ2V0U291dGhXZXN0KCksIHRoaXMuZ2V0TWFwKCkuZ2V0Qm91bmRzKCkuZ2V0Tm9ydGhFYXN0KCkpO1xuICAgICAgICB2YXIgYm91bmRzID0gdGhpcy5nZXRFeHRlbmRlZEJvdW5kcyhtYXBCb3VuZHMpO1xuICAgICAgICB2YXIgaUxhc3QgPSBNYXRoLm1pbihpRmlyc3QgKyB0aGlzLmJhdGNoU2l6ZV8sIHRoaXMubWFya2Vyc18ubGVuZ3RoKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IGlGaXJzdDsgaSA8IGlMYXN0OyBpKyspIHtcbiAgICAgICAgICAgIHZhciBtYXJrZXIgPSB0aGlzLm1hcmtlcnNfW2ldO1xuICAgICAgICAgICAgaWYgKCFtYXJrZXIuaXNBZGRlZCAmJiB0aGlzLmlzTWFya2VySW5Cb3VuZHNfKG1hcmtlciwgYm91bmRzKSkge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pZ25vcmVIaWRkZW5fIHx8XG4gICAgICAgICAgICAgICAgICAgICh0aGlzLmlnbm9yZUhpZGRlbl8gJiYgbWFya2VyLmdldFZpc2libGUoKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRUb0Nsb3Nlc3RDbHVzdGVyXyhtYXJrZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoaUxhc3QgPCB0aGlzLm1hcmtlcnNfLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy50aW1lclJlZlN0YXRpYyA9IHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5jcmVhdGVDbHVzdGVyc18oaUxhc3QpO1xuICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy50aW1lclJlZlN0YXRpYztcbiAgICAgICAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LnRyaWdnZXIodGhpcywgXCJjbHVzdGVyaW5nZW5kXCIsIHRoaXMpO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmNsdXN0ZXJzXy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuY2x1c3RlcnNfW2ldLnVwZGF0ZUljb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhlIGRlZmF1bHQgZnVuY3Rpb24gZm9yIGRldGVybWluaW5nIHRoZSBsYWJlbCB0ZXh0IGFuZCBzdHlsZVxuICAgICAqIGZvciBhIGNsdXN0ZXIgaWNvbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBtYXJrZXJzIFRoZSBhcnJheSBvZiBtYXJrZXJzIHJlcHJlc2VudGVkIGJ5IHRoZSBjbHVzdGVyLlxuICAgICAqIEBwYXJhbSBudW1TdHlsZXMgVGhlIG51bWJlciBvZiBtYXJrZXIgc3R5bGVzIGF2YWlsYWJsZS5cbiAgICAgKiBAcmV0dXJuIFRoZSBpbmZvcm1hdGlvbiByZXNvdXJjZSBmb3IgdGhlIGNsdXN0ZXIuXG4gICAgICovXG4gICAgTWFya2VyQ2x1c3RlcmVyLkNBTENVTEFUT1IgPSBmdW5jdGlvbiAobWFya2VycywgbnVtU3R5bGVzKSB7XG4gICAgICAgIHZhciBpbmRleCA9IDA7XG4gICAgICAgIHZhciBjb3VudCA9IG1hcmtlcnMubGVuZ3RoO1xuICAgICAgICB2YXIgZHYgPSBjb3VudDtcbiAgICAgICAgd2hpbGUgKGR2ICE9PSAwKSB7XG4gICAgICAgICAgICBkdiA9IE1hdGguZmxvb3IoZHYgLyAxMCk7XG4gICAgICAgICAgICBpbmRleCsrO1xuICAgICAgICB9XG4gICAgICAgIGluZGV4ID0gTWF0aC5taW4oaW5kZXgsIG51bVN0eWxlcyk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0ZXh0OiBjb3VudC50b1N0cmluZygpLFxuICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICAgICAgdGl0bGU6IFwiXCJcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlcyBkZWZhdWx0IHN0eWxlcyBhdWdtZW50ZWQgd2l0aCB1c2VyIHBhc3NlZCB2YWx1ZXMuXG4gICAgICogVXNlZnVsIHdoZW4geW91IHdhbnQgdG8gb3ZlcnJpZGUgc29tZSBkZWZhdWx0IHZhbHVlcyBidXQga2VlcCB1bnRvdWNoZWRcbiAgICAgKlxuICAgICAqIEBwYXJhbSBvdmVycmlkZXMgb3ZlcnJpZGUgZGVmYXVsdCB2YWx1ZXNcbiAgICAgKi9cbiAgICBNYXJrZXJDbHVzdGVyZXIud2l0aERlZmF1bHRTdHlsZSA9IGZ1bmN0aW9uIChvdmVycmlkZXMpIHtcbiAgICAgICAgcmV0dXJuIF9fYXNzaWduKHsgdGV4dENvbG9yOiBcImJsYWNrXCIsIHRleHRTaXplOiAxMSwgdGV4dERlY29yYXRpb246IFwibm9uZVwiLCB0ZXh0TGluZUhlaWdodDogb3ZlcnJpZGVzLmhlaWdodCwgZm9udFdlaWdodDogXCJib2xkXCIsIGZvbnRTdHlsZTogXCJub3JtYWxcIiwgZm9udEZhbWlseTogXCJBcmlhbCxzYW5zLXNlcmlmXCIsIGJhY2tncm91bmRQb3NpdGlvbjogXCIwIDBcIiB9LCBvdmVycmlkZXMpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhlIG51bWJlciBvZiBtYXJrZXJzIHRvIHByb2Nlc3MgaW4gb25lIGJhdGNoLlxuICAgICAqL1xuICAgIE1hcmtlckNsdXN0ZXJlci5CQVRDSF9TSVpFID0gMjAwMDtcbiAgICAvKipcbiAgICAgKiBUaGUgbnVtYmVyIG9mIG1hcmtlcnMgdG8gcHJvY2VzcyBpbiBvbmUgYmF0Y2ggKElFIG9ubHkpLlxuICAgICAqL1xuICAgIE1hcmtlckNsdXN0ZXJlci5CQVRDSF9TSVpFX0lFID0gNTAwO1xuICAgIC8qKlxuICAgICAqIFRoZSBkZWZhdWx0IHJvb3QgbmFtZSBmb3IgdGhlIG1hcmtlciBjbHVzdGVyIGltYWdlcy5cbiAgICAgKi9cbiAgICBNYXJrZXJDbHVzdGVyZXIuSU1BR0VfUEFUSCA9IFwiLi4vaW1hZ2VzL21cIjtcbiAgICAvKipcbiAgICAgKiBUaGUgZGVmYXVsdCBleHRlbnNpb24gbmFtZSBmb3IgdGhlIG1hcmtlciBjbHVzdGVyIGltYWdlcy5cbiAgICAgKi9cbiAgICBNYXJrZXJDbHVzdGVyZXIuSU1BR0VfRVhURU5TSU9OID0gXCJwbmdcIjtcbiAgICAvKipcbiAgICAgKiBUaGUgZGVmYXVsdCBhcnJheSBvZiBzaXplcyBmb3IgdGhlIG1hcmtlciBjbHVzdGVyIGltYWdlcy5cbiAgICAgKi9cbiAgICBNYXJrZXJDbHVzdGVyZXIuSU1BR0VfU0laRVMgPSBbNTMsIDU2LCA2NiwgNzgsIDkwXTtcbiAgICByZXR1cm4gTWFya2VyQ2x1c3RlcmVyO1xufShPdmVybGF5Vmlld1NhZmUpKTtcblxuLyoqXG4gKiBDb3B5cmlnaHQgMjAxOSBHb29nbGUgTExDLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuZXhwb3J0IHsgTWFya2VyQ2x1c3RlcmVyIGFzIGRlZmF1bHQgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmVzbS5qcy5tYXBcbiIsIjx0ZW1wbGF0ZT5cclxuICA8ZGl2PlxyXG4gICAgPHNsb3Q+PC9zbG90PlxyXG4gIDwvZGl2PlxyXG48L3RlbXBsYXRlPlxyXG48c2NyaXB0PlxyXG5pbXBvcnQgTWFya2VyQ2x1c3RlcmVyIGZyb20gXCJAZ29vZ2xlbWFwcy9tYXJrZXJjbHVzdGVyZXJwbHVzXCI7XHJcbmltcG9ydCBidWlsZENvbXBvbmVudCBmcm9tICcuL2J1aWxkLWNvbXBvbmVudC5qcydcclxuXHJcbmNvbnN0IHByb3BzID0ge1xyXG4gIG1heFpvb206IHtcclxuICAgIHR5cGU6IE51bWJlcixcclxuICAgIHR3b1dheTogZmFsc2UsXHJcbiAgfSxcclxuICBiYXRjaFNpemVJRToge1xyXG4gICAgdHlwZTogTnVtYmVyLFxyXG4gICAgdHdvV2F5OiBmYWxzZSxcclxuICB9LFxyXG4gIGNhbGN1bGF0b3I6IHtcclxuICAgIHR5cGU6IEZ1bmN0aW9uLFxyXG4gICAgdHdvV2F5OiBmYWxzZSxcclxuICB9LFxyXG4gIGVuYWJsZVJldGluYUljb25zOiB7XHJcbiAgICB0eXBlOiBCb29sZWFuLFxyXG4gICAgdHdvV2F5OiBmYWxzZSxcclxuICB9LFxyXG4gIGdyaWRTaXplOiB7XHJcbiAgICB0eXBlOiBOdW1iZXIsXHJcbiAgICB0d29XYXk6IGZhbHNlLFxyXG4gIH0sXHJcbiAgaWdub3JlSGlkZGVuOiB7XHJcbiAgICB0eXBlOiBCb29sZWFuLFxyXG4gICAgdHdvV2F5OiBmYWxzZSxcclxuICB9LFxyXG4gIGltYWdlRXh0ZW5zaW9uOiB7XHJcbiAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICB0d29XYXk6IGZhbHNlLFxyXG4gIH0sXHJcbiAgaW1hZ2VQYXRoOiB7XHJcbiAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICB0d29XYXk6IGZhbHNlLFxyXG4gIH0sXHJcbiAgaW1hZ2VTaXplczoge1xyXG4gICAgdHlwZTogQXJyYXksXHJcbiAgICB0d29XYXk6IGZhbHNlLFxyXG4gIH0sXHJcbiAgbWluaW11bUNsdXN0ZXJTaXplOiB7XHJcbiAgICB0eXBlOiBOdW1iZXIsXHJcbiAgICB0d29XYXk6IGZhbHNlLFxyXG4gIH0sXHJcbiAgc3R5bGVzOiB7XHJcbiAgICB0eXBlOiBBcnJheSxcclxuICAgIHR3b1dheTogZmFsc2UsXHJcbiAgfSxcclxuICB6b29tT25DbGljazoge1xyXG4gICAgdHlwZTogQm9vbGVhbixcclxuICAgIHR3b1dheTogZmFsc2UsXHJcbiAgfSxcclxufVxyXG5cclxuY29uc3QgZXZlbnRzID0gW1xyXG4gICdjbGljaycsXHJcbiAgJ3JpZ2h0Y2xpY2snLFxyXG4gICdkYmxjbGljaycsXHJcbiAgJ2RyYWcnLFxyXG4gICdkcmFnc3RhcnQnLFxyXG4gICdkcmFnZW5kJyxcclxuICAnbW91c2V1cCcsXHJcbiAgJ21vdXNlZG93bicsXHJcbiAgJ21vdXNlb3ZlcicsXHJcbiAgJ21vdXNlb3V0JyxcclxuXVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYnVpbGRDb21wb25lbnQoe1xyXG4gIG1hcHBlZFByb3BzOiBwcm9wcyxcclxuICBldmVudHMsXHJcbiAgbmFtZTogJ2NsdXN0ZXInLFxyXG4gIGN0cjogKCkgPT4ge1xyXG4gICAgaWYgKHR5cGVvZiBNYXJrZXJDbHVzdGVyZXIgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9ICdNYXJrZXJDbHVzdGVyZXIgaXMgbm90IGluc3RhbGxlZCEnO1xyXG4gICAgICBjb25zb2xlLmVycm9yKGVycm9yTWVzc2FnZSk7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvck1lc3NhZ2UpXHJcbiAgICB9XHJcbiAgICByZXR1cm4gTWFya2VyQ2x1c3RlcmVyXHJcbiAgfSxcclxuICBjdHJBcmdzOiAoeyBtYXAsIC4uLm90aGVyT3B0aW9ucyB9KSA9PiBbbWFwLCBbXSwgb3RoZXJPcHRpb25zXSxcclxuICBhZnRlckNyZWF0ZShpbnN0KSB7XHJcbiAgICBjb25zdCByZWluc2VydE1hcmtlcnMgPSAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IG9sZE1hcmtlcnMgPSBpbnN0LmdldE1hcmtlcnMoKVxyXG4gICAgICBpbnN0LmNsZWFyTWFya2VycygpXHJcbiAgICAgIGluc3QuYWRkTWFya2VycyhvbGRNYXJrZXJzKVxyXG4gICAgfVxyXG4gICAgZm9yIChsZXQgcHJvcCBpbiBwcm9wcykge1xyXG4gICAgICBpZiAocHJvcHNbcHJvcF0udHdvV2F5KSB7XHJcbiAgICAgICAgdGhpcy4kb24ocHJvcC50b0xvd2VyQ2FzZSgpICsgJ19jaGFuZ2VkJywgcmVpbnNlcnRNYXJrZXJzKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICB1cGRhdGVkKCkge1xyXG4gICAgaWYgKHRoaXMuJGNsdXN0ZXJPYmplY3QpIHtcclxuICAgICAgdGhpcy4kY2x1c3Rlck9iamVjdC5yZXBhaW50KClcclxuICAgIH1cclxuICB9LFxyXG4gIGJlZm9yZVVubW91bnQoKSB7XHJcbiAgICAvKiBQZXJmb3JtYW5jZSBvcHRpbWl6YXRpb24gd2hlbiBkZXN0cm95aW5nIGEgbGFyZ2UgbnVtYmVyIG9mIG1hcmtlcnMgKi9cclxuICAgIGlmICh0aGlzLiRjaGlsZHJlbiAmJiB0aGlzLiRjaGlsZHJlbi5sZW5ndGgpIHtcclxuICAgICAgdGhpcy4kY2hpbGRyZW4uZm9yRWFjaCgobWFya2VyKSA9PiB7XHJcbiAgICAgICAgaWYgKG1hcmtlci4kY2x1c3Rlck9iamVjdCA9PT0gdGhpcy4kY2x1c3Rlck9iamVjdCkge1xyXG4gICAgICAgICAgbWFya2VyLiRjbHVzdGVyT2JqZWN0ID0gbnVsbFxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH1cclxuXHJcblxyXG4gICAgaWYgKHRoaXMuJGNsdXN0ZXJPYmplY3QpIHtcclxuICAgICAgdGhpcy4kY2x1c3Rlck9iamVjdC5jbGVhck1hcmtlcnMoKVxyXG4gICAgfVxyXG4gIH0sXHJcbn0pXHJcbjwvc2NyaXB0PlxyXG4iLCI8dGVtcGxhdGU+XHJcbiAgPGRpdiByZWY9XCJpbmZvV2luZG93XCI+XHJcbiAgICA8c2xvdD48L3Nsb3Q+XHJcbiAgPC9kaXY+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG5pbXBvcnQgYnVpbGRDb21wb25lbnQgZnJvbSAnLi9idWlsZC1jb21wb25lbnQuanMnXHJcblxyXG5jb25zdCBwcm9wcyA9IHtcclxuICBvcHRpb25zOiB7XHJcbiAgICB0eXBlOiBPYmplY3QsXHJcbiAgICByZXF1aXJlZDogZmFsc2UsXHJcbiAgICBkZWZhdWx0KCkge1xyXG4gICAgICByZXR1cm4ge31cclxuICAgIH0sXHJcbiAgfSxcclxuICBwb3NpdGlvbjoge1xyXG4gICAgdHlwZTogT2JqZWN0LFxyXG4gICAgdHdvV2F5OiB0cnVlLFxyXG4gIH0sXHJcbiAgekluZGV4OiB7XHJcbiAgICB0eXBlOiBOdW1iZXIsXHJcbiAgICB0d29XYXk6IHRydWUsXHJcbiAgfSxcclxufVxyXG5cclxuY29uc3QgZXZlbnRzID0gWydkb21yZWFkeScsICdjbGljaycsICdjbG9zZWNsaWNrJywgJ2NvbnRlbnRfY2hhbmdlZCddXHJcblxyXG5leHBvcnQgZGVmYXVsdCBidWlsZENvbXBvbmVudCh7XHJcbiAgbWFwcGVkUHJvcHM6IHByb3BzLFxyXG4gIGV2ZW50cyxcclxuICBuYW1lOiAnaW5mb1dpbmRvdycsXHJcbiAgY3RyOiAoKSA9PiBnb29nbGUubWFwcy5JbmZvV2luZG93LFxyXG4gIHByb3BzOiB7XHJcbiAgICBvcGVuZWQ6IHtcclxuICAgICAgdHlwZTogQm9vbGVhbixcclxuICAgICAgZGVmYXVsdDogdHJ1ZSxcclxuICAgIH0sXHJcbiAgfSxcclxuXHJcbiAgaW5qZWN0OiB7XHJcbiAgICAkbWFya2VyUHJvbWlzZToge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgfSxcclxuICB9LFxyXG5cclxuICBtb3VudGVkKCkge1xyXG4gICAgY29uc3QgZWwgPSB0aGlzLiRyZWZzLmluZm9XaW5kb3dcclxuICAgIGVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWwpXHJcbiAgfSxcclxuXHJcbiAgYmVmb3JlQ3JlYXRlKG9wdGlvbnMpIHtcclxuICAgIG9wdGlvbnMuY29udGVudCA9IHRoaXMuJHJlZnMuaW5mb1dpbmRvd1xyXG5cclxuICAgIGlmICh0aGlzLiRtYXJrZXJQcm9taXNlKSB7XHJcbiAgICAgIGRlbGV0ZSBvcHRpb25zLnBvc2l0aW9uXHJcbiAgICAgIHJldHVybiB0aGlzLiRtYXJrZXJQcm9taXNlLnRoZW4oKG1vKSA9PiB7XHJcbiAgICAgICAgdGhpcy4kbWFya2VyT2JqZWN0ID0gbW9cclxuICAgICAgICByZXR1cm4gbW9cclxuICAgICAgfSlcclxuICAgIH1cclxuICB9LFxyXG4gIGVtaXRzOiBbJ2Nsb3NlY2xpY2snXSxcclxuICBtZXRob2RzOiB7XHJcbiAgICBfb3BlbkluZm9XaW5kb3coKSB7XHJcbiAgICAgIHRoaXMuJGluZm9XaW5kb3dPYmplY3QuY2xvc2UoKVxyXG4gICAgICBpZiAodGhpcy5vcGVuZWQpIHtcclxuICAgICAgICB0aGlzLiRpbmZvV2luZG93T2JqZWN0Lm9wZW4odGhpcy4kbWFwLCB0aGlzLiRtYXJrZXJPYmplY3QpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy4kZW1pdCgnY2xvc2VjbGljaycpXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgfSxcclxuXHJcbiAgYWZ0ZXJDcmVhdGUoKSB7XHJcbiAgICB0aGlzLl9vcGVuSW5mb1dpbmRvdygpXHJcbiAgICB0aGlzLiR3YXRjaCgnb3BlbmVkJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLl9vcGVuSW5mb1dpbmRvdygpXHJcbiAgICB9KVxyXG4gIH0sXHJcbn0pXHJcbjwvc2NyaXB0PlxyXG4iLCIvKlxyXG5NaXhpbiBmb3Igb2JqZWN0cyB0aGF0IGFyZSBtb3VudGVkIGJ5IEdvb2dsZSBNYXBzXHJcbkphdmFzY3JpcHQgQVBJLlxyXG5cclxuVGhlc2UgYXJlIG9iamVjdHMgdGhhdCBhcmUgc2Vuc2l0aXZlIHRvIGVsZW1lbnQgcmVzaXplXHJcbm9wZXJhdGlvbnMgc28gaXQgZXhwb3NlcyBhIHByb3BlcnR5IHdoaWNoIGFjY2VwdHMgYSBidXNcclxuXHJcbiovXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgcHJvcHM6IFsncmVzaXplQnVzJ10sXHJcblxyXG4gIGRhdGEoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBfYWN0dWFsUmVzaXplQnVzOiBudWxsLFxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGNyZWF0ZWQoKSB7XHJcbiAgICBpZiAodHlwZW9mIHRoaXMucmVzaXplQnVzID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICB0aGlzLiRkYXRhLl9hY3R1YWxSZXNpemVCdXMgPSB0aGlzLiRnbWFwRGVmYXVsdFJlc2l6ZUJ1c1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy4kZGF0YS5fYWN0dWFsUmVzaXplQnVzID0gdGhpcy5yZXNpemVCdXNcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBtZXRob2RzOiB7XHJcbiAgICBfcmVzaXplQ2FsbGJhY2soKSB7XHJcbiAgICAgIHRoaXMucmVzaXplKClcclxuICAgIH0sXHJcbiAgICBpc0Z1bmN0aW9uKGZ1bmN0aW9uVG9DaGVjaykge1xyXG4gICAgICByZXR1cm4gZnVuY3Rpb25Ub0NoZWNrICYmIHt9LnRvU3RyaW5nLmNhbGwoZnVuY3Rpb25Ub0NoZWNrKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcclxuICAgIH0sXHJcbiAgICBfZGVsYXllZFJlc2l6ZUNhbGxiYWNrKCkge1xyXG4gICAgICB0aGlzLiRuZXh0VGljaygoKSA9PiB0aGlzLl9yZXNpemVDYWxsYmFjaygpKVxyXG4gICAgfSxcclxuICB9LFxyXG5cclxuICB3YXRjaDoge1xyXG4gICAgcmVzaXplQnVzKG5ld1ZhbCkge1xyXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXHJcbiAgICAgIHRoaXMuJGRhdGEuX2FjdHVhbFJlc2l6ZUJ1cyA9IG5ld1ZhbFxyXG4gICAgfSxcclxuICAgICckZGF0YS5fYWN0dWFsUmVzaXplQnVzJyhuZXdWYWwsIG9sZFZhbCkge1xyXG4gICAgICBpZiAob2xkVmFsKSB7XHJcbiAgICAgICAgb2xkVmFsLiRvZmYoJ3Jlc2l6ZScsIHRoaXMuX2RlbGF5ZWRSZXNpemVDYWxsYmFjaylcclxuICAgICAgfVxyXG4gICAgICBpZiAobmV3VmFsKSB7XHJcbiAgICAgICAgLy8gIG5ld1ZhbC4kb24oJ3Jlc2l6ZScsIHRoaXMuX2RlbGF5ZWRSZXNpemVDYWxsYmFjaylcclxuICAgICAgfVxyXG4gICAgfSxcclxuICB9LFxyXG5cclxuICB1bm1vdW50ZWQoKSB7XHJcbiAgICBpZiAodGhpcy4kZGF0YS5fYWN0dWFsUmVzaXplQnVzICYmIHRoaXMuaXNGdW5jdGlvbih0aGlzLiRkYXRhLl9hY3R1YWxSZXNpemVCdXMuJG9mZikpIHtcclxuICAgICAgdGhpcy4kZGF0YS5fYWN0dWFsUmVzaXplQnVzLiRvZmYoJ3Jlc2l6ZScsIHRoaXMuX2RlbGF5ZWRSZXNpemVDYWxsYmFjaylcclxuICAgIH1cclxuICB9LFxyXG59XHJcbiIsIi8qKlxyXG4gKiBXaGVuIHlvdSBoYXZlIHR3by13YXkgYmluZGluZ3MsIGJ1dCB0aGUgYWN0dWFsIGJvdW5kIHZhbHVlIHdpbGwgbm90IGVxdWFsXHJcbiAqIHRoZSB2YWx1ZSB5b3UgaW5pdGlhbGx5IHBhc3NlZCBpbiwgdGhlbiB0byBhdm9pZCBhbiBpbmZpbml0ZSBsb29wIHlvdVxyXG4gKiBuZWVkIHRvIGluY3JlbWVudCBhIGNvdW50ZXIgZXZlcnkgdGltZSB5b3UgcGFzcyBpbiBhIHZhbHVlLCBkZWNyZW1lbnQgdGhlXHJcbiAqIHNhbWUgY291bnRlciBldmVyeSB0aW1lIHRoZSBib3VuZCB2YWx1ZSBjaGFuZ2VkLCBidXQgb25seSBidWJibGUgdXBcclxuICogdGhlIGV2ZW50IHdoZW4gdGhlIGNvdW50ZXIgaXMgemVyby5cclxuICpcclxuRXhhbXBsZTpcclxuXHJcbkxldCdzIHNheSBEcmF3aW5nUmVjb2duaXRpb25DYW52YXMgaXMgYSBkZWVwLWxlYXJuaW5nIGJhY2tlZCBjYW52YXNcclxudGhhdCwgd2hlbiBnaXZlbiB0aGUgbmFtZSBvZiBhbiBvYmplY3QgKGUuZy4gJ2RvZycpLCBkcmF3cyBhIGRvZy5cclxuQnV0IHdoZW5ldmVyIHRoZSBkcmF3aW5nIG9uIGl0IGNoYW5nZXMsIGl0IGFsc28gc2VuZHMgYmFjayBpdHMgaW50ZXJwcmV0YXRpb25cclxub2YgdGhlIGltYWdlIGJ5IHdheSBvZiB0aGUgQG5ld09iamVjdFJlY29nbml6ZWQgZXZlbnQuXHJcblxyXG48aW5wdXRcclxuICB0eXBlPVwidGV4dFwiXHJcbiAgcGxhY2Vob2xkZXI9XCJhbiBvYmplY3QsIGUuZy4gRG9nLCBDYXQsIEZyb2dcIlxyXG4gIHYtbW9kZWw9XCJpZGVudGlmaWVkT2JqZWN0XCIgLz5cclxuPERyYXdpbmdSZWNvZ25pdGlvbkNhbnZhc1xyXG4gIDpvYmplY3Q9XCJpZGVudGlmaWVkT2JqZWN0XCJcclxuICBAbmV3T2JqZWN0UmVjb2duaXplZD1cImlkZW50aWZpZWRPYmplY3QgPSAkZXZlbnRcIlxyXG4gIC8+XHJcblxyXG5uZXcgVHdvV2F5QmluZGluZ1dyYXBwZXIoKGluY3JlbWVudCwgZGVjcmVtZW50LCBzaG91bGRVcGRhdGUpID0+IHtcclxuICB0aGlzLiR3YXRjaCgnaWRlbnRpZmllZE9iamVjdCcsICgpID0+IHtcclxuICAgIC8vIG5ldyBvYmplY3QgcGFzc2VkIGluXHJcbiAgICBpbmNyZW1lbnQoKVxyXG4gIH0pXHJcbiAgdGhpcy4kZGVlcExlYXJuaW5nQmFja2VuZC5vbignZHJhd2luZ0NoYW5nZWQnLCAoKSA9PiB7XHJcbiAgICByZWNvZ25pemVPYmplY3QodGhpcy4kZGVlcExlYXJuaW5nQmFja2VuZClcclxuICAgICAgLnRoZW4oKG9iamVjdCkgPT4ge1xyXG4gICAgICAgIGRlY3JlbWVudCgpXHJcbiAgICAgICAgaWYgKHNob3VsZFVwZGF0ZSgpKSB7XHJcbiAgICAgICAgICB0aGlzLiRlbWl0KCduZXdPYmplY3RSZWNvZ25pemVkJywgb2JqZWN0Lm5hbWUpXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gIH0pXHJcbn0pXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBUd29XYXlCaW5kaW5nV3JhcHBlcihmbikge1xyXG4gIGxldCBjb3VudGVyID0gMFxyXG5cclxuICBmbihcclxuICAgICgpID0+IHtcclxuICAgICAgY291bnRlciArPSAxXHJcbiAgICB9LFxyXG4gICAgKCkgPT4ge1xyXG4gICAgICBjb3VudGVyID0gTWF0aC5tYXgoMCwgY291bnRlciAtIDEpXHJcbiAgICB9LFxyXG4gICAgKCkgPT4gY291bnRlciA9PT0gMFxyXG4gIClcclxufVxyXG4iLCI8dGVtcGxhdGU+XHJcbiAgPGRpdiBjbGFzcz1cInZ1ZS1tYXAtY29udGFpbmVyXCIgOmNsYXNzPVwiJGF0dHJzLmNsYXNzXCI+XHJcbiAgICA8ZGl2IHJlZj1cInZ1ZS1tYXBcIiBjbGFzcz1cInZ1ZS1tYXBcIiA6c3R5bGU9XCIkYXR0cnMuc3R5bGUgPyAkYXR0cnMuc3R5bGUgOiAnJ1wiPjwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cInZ1ZS1tYXAtaGlkZGVuXCI+XHJcbiAgICAgIDxzbG90Pjwvc2xvdD5cclxuICAgIDwvZGl2PlxyXG4gICAgPHNsb3QgbmFtZT1cInZpc2libGVcIj48L3Nsb3Q+XHJcbiAgPC9kaXY+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG5pbXBvcnQgYmluZEV2ZW50cyBmcm9tICcuLi91dGlscy9iaW5kRXZlbnRzLmpzJ1xyXG5pbXBvcnQgeyBiaW5kUHJvcHMsIGdldFByb3BzVmFsdWVzIH0gZnJvbSAnLi4vdXRpbHMvYmluZFByb3BzLmpzJ1xyXG5pbXBvcnQgbW91bnRhYmxlTWl4aW4gZnJvbSAnLi4vdXRpbHMvbW91bnRhYmxlTWl4aW4uanMnXHJcblxyXG5pbXBvcnQgVHdvV2F5QmluZGluZ1dyYXBwZXIgZnJvbSAnLi4vdXRpbHMvVHdvV2F5QmluZGluZ1dyYXBwZXIuanMnXHJcbmltcG9ydCBXYXRjaFByaW1pdGl2ZVByb3BlcnRpZXMgZnJvbSAnLi4vdXRpbHMvV2F0Y2hQcmltaXRpdmVQcm9wZXJ0aWVzLmpzJ1xyXG5pbXBvcnQgeyBtYXBwZWRQcm9wc1RvVnVlUHJvcHMgfSBmcm9tICcuL2J1aWxkLWNvbXBvbmVudC5qcydcclxuXHJcbmNvbnN0IHByb3BzID0ge1xyXG4gIGNlbnRlcjoge1xyXG4gICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICB0d29XYXk6IHRydWUsXHJcbiAgICB0eXBlOiBPYmplY3QsXHJcbiAgICBub0JpbmQ6IHRydWUsXHJcbiAgfSxcclxuICB6b29tOiB7XHJcbiAgICByZXF1aXJlZDogZmFsc2UsXHJcbiAgICB0d29XYXk6IHRydWUsXHJcbiAgICB0eXBlOiBOdW1iZXIsXHJcbiAgICBub0JpbmQ6IHRydWUsXHJcbiAgfSxcclxuICBoZWFkaW5nOiB7XHJcbiAgICB0eXBlOiBOdW1iZXIsXHJcbiAgICB0d29XYXk6IHRydWUsXHJcbiAgfSxcclxuICBtYXBUeXBlSWQ6IHtcclxuICAgIHR3b1dheTogdHJ1ZSxcclxuICAgIHR5cGU6IFN0cmluZyxcclxuICB9LFxyXG4gIHRpbHQ6IHtcclxuICAgIHR3b1dheTogdHJ1ZSxcclxuICAgIHR5cGU6IE51bWJlcixcclxuICB9LFxyXG4gIG9wdGlvbnM6IHtcclxuICAgIHR5cGU6IE9iamVjdCxcclxuICAgIGRlZmF1bHQoKSB7XHJcbiAgICAgIHJldHVybiB7fVxyXG4gICAgfSxcclxuICB9LFxyXG59XHJcblxyXG5jb25zdCBldmVudHMgPSBbXHJcbiAgJ2JvdW5kc19jaGFuZ2VkJyxcclxuICAnY2xpY2snLFxyXG4gICdkYmxjbGljaycsXHJcbiAgJ2RyYWcnLFxyXG4gICdkcmFnZW5kJyxcclxuICAnZHJhZ3N0YXJ0JyxcclxuICAnaWRsZScsXHJcbiAgJ21vdXNlbW92ZScsXHJcbiAgJ21vdXNlb3V0JyxcclxuICAnbW91c2VvdmVyJyxcclxuICAncmVzaXplJyxcclxuICAncmlnaHRjbGljaycsXHJcbiAgJ3RpbGVzbG9hZGVkJyxcclxuXVxyXG5cclxuLy8gUGxhaW4gR29vZ2xlIE1hcHMgbWV0aG9kcyBleHBvc2VkIGhlcmUgZm9yIGNvbnZlbmllbmNlXHJcbmNvbnN0IGxpbmtlZE1ldGhvZHMgPSBbJ3BhbkJ5JywgJ3BhblRvJywgJ3BhblRvQm91bmRzJywgJ2ZpdEJvdW5kcyddLnJlZHVjZSgoYWxsLCBtZXRob2ROYW1lKSA9PiB7XHJcbiAgYWxsW21ldGhvZE5hbWVdID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKHRoaXMuJG1hcE9iamVjdCkge1xyXG4gICAgICB0aGlzLiRtYXBPYmplY3RbbWV0aG9kTmFtZV0uYXBwbHkodGhpcy4kbWFwT2JqZWN0LCBhcmd1bWVudHMpXHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBhbGxcclxufSwge30pXHJcblxyXG4vLyBPdGhlciBjb252ZW5pZW5jZSBtZXRob2RzIGV4cG9zZWQgYnkgVnVlIEdvb2dsZSBNYXBzXHJcbmNvbnN0IGN1c3RvbU1ldGhvZHMgPSB7XHJcbiAgcmVzaXplKCkge1xyXG4gICAgaWYgKHRoaXMuJG1hcE9iamVjdCkge1xyXG4gICAgICBnb29nbGUubWFwcy5ldmVudC50cmlnZ2VyKHRoaXMuJG1hcE9iamVjdCwgJ3Jlc2l6ZScpXHJcbiAgICB9XHJcbiAgfSxcclxuICByZXNpemVQcmVzZXJ2ZUNlbnRlcigpIHtcclxuICAgIGlmICghdGhpcy4kbWFwT2JqZWN0KSB7XHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG9sZENlbnRlciA9IHRoaXMuJG1hcE9iamVjdC5nZXRDZW50ZXIoKVxyXG4gICAgZ29vZ2xlLm1hcHMuZXZlbnQudHJpZ2dlcih0aGlzLiRtYXBPYmplY3QsICdyZXNpemUnKVxyXG4gICAgdGhpcy4kbWFwT2JqZWN0LnNldENlbnRlcihvbGRDZW50ZXIpXHJcbiAgfSxcclxuXHJcbiAgLy8vIE92ZXJyaWRlIG1vdW50YWJsZU1peGluOjpfcmVzaXplQ2FsbGJhY2tcclxuICAvLy8gYmVjYXVzZSByZXNpemVQcmVzZXJ2ZUNlbnRlciBpcyB1c3VhbGx5IHRoZVxyXG4gIC8vLyBleHBlY3RlZCBiZWhhdmlvdXJcclxuICBfcmVzaXplQ2FsbGJhY2soKSB7XHJcbiAgICB0aGlzLnJlc2l6ZVByZXNlcnZlQ2VudGVyKClcclxuICB9LFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgbWl4aW5zOiBbbW91bnRhYmxlTWl4aW5dLFxyXG4gIHByb3BzOiBtYXBwZWRQcm9wc1RvVnVlUHJvcHMoey4uLnByb3BzLCAuLi5ldmVudHMucmVkdWNlKChvYmosIGV2ZW50TmFtZSkgPT4gKHsuLi5vYmosIFtgb24ke2V2ZW50TmFtZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKX0ke2V2ZW50TmFtZS5zbGljZSgxKX1gLnJlcGxhY2UoL1stX10rKC4pPy9nLCAoXywgYykgPT4gYyA/IGMudG9VcHBlckNhc2UoKSA6ICcnKV06IEZ1bmN0aW9ufSksIHt9KSB9ICksXHJcbiAgaW5oZXJpdEF0dHJzOiBmYWxzZSxcclxuXHJcbiAgcHJvdmlkZSgpIHtcclxuICAgIHRoaXMuJG1hcFByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIHRoaXMuJG1hcFByb21pc2VEZWZlcnJlZCA9IHsgcmVzb2x2ZSwgcmVqZWN0IH1cclxuICAgIH0pXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAkbWFwUHJvbWlzZTogdGhpcy4kbWFwUHJvbWlzZSxcclxuICAgIH1cclxuICB9LFxyXG4gIGVtaXRzOiBbJ2NlbnRlcl9jaGFuZ2VkJywgJ3pvb21fY2hhbmdlZCcsICdib3VuZHNfY2hhbmdlZCddLFxyXG4gIGNvbXB1dGVkOiB7XHJcbiAgICBmaW5hbExhdCgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuY2VudGVyICYmIHR5cGVvZiB0aGlzLmNlbnRlci5sYXQgPT09ICdmdW5jdGlvbidcclxuICAgICAgICA/IHRoaXMuY2VudGVyLmxhdCgpXHJcbiAgICAgICAgOiB0aGlzLmNlbnRlci5sYXRcclxuICAgIH0sXHJcbiAgICBmaW5hbExuZygpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuY2VudGVyICYmIHR5cGVvZiB0aGlzLmNlbnRlci5sbmcgPT09ICdmdW5jdGlvbidcclxuICAgICAgICA/IHRoaXMuY2VudGVyLmxuZygpXHJcbiAgICAgICAgOiB0aGlzLmNlbnRlci5sbmdcclxuICAgIH0sXHJcbiAgICBmaW5hbExhdExuZygpIHtcclxuICAgICAgcmV0dXJuIHsgbGF0OiB0aGlzLmZpbmFsTGF0LCBsbmc6IHRoaXMuZmluYWxMbmcgfVxyXG4gICAgfSxcclxuICB9LFxyXG5cclxuICB3YXRjaDoge1xyXG4gICAgem9vbSh6b29tKSB7XHJcbiAgICAgIGlmICh0aGlzLiRtYXBPYmplY3QpIHtcclxuICAgICAgICB0aGlzLiRtYXBPYmplY3Quc2V0Wm9vbSh6b29tKVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gIH0sXHJcblxyXG4gIG1vdW50ZWQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy4kZ21hcEFwaVByb21pc2VMYXp5KClcclxuICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIC8vIGdldHRpbmcgdGhlIERPTSBlbGVtZW50IHdoZXJlIHRvIGNyZWF0ZSB0aGUgbWFwXHJcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMuJHJlZnNbJ3Z1ZS1tYXAnXVxyXG5cclxuICAgICAgICAvLyBjcmVhdGluZyB0aGUgbWFwXHJcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgICAgIC4uLnRoaXMub3B0aW9ucyxcclxuICAgICAgICAgIC4uLmdldFByb3BzVmFsdWVzKHRoaXMsIHByb3BzKSxcclxuICAgICAgICB9XHJcbiAgICAgICAgZGVsZXRlIG9wdGlvbnMub3B0aW9uc1xyXG4gICAgICAgIHRoaXMuJG1hcE9iamVjdCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZWxlbWVudCwgb3B0aW9ucylcclxuXHJcbiAgICAgICAgLy8gYmluZGluZyBwcm9wZXJ0aWVzICh0d28gYW5kIG9uZSB3YXkpXHJcbiAgICAgICAgYmluZFByb3BzKHRoaXMsIHRoaXMuJG1hcE9iamVjdCwgcHJvcHMpXHJcbiAgICAgICAgLy8gYmluZGluZyBldmVudHNcclxuICAgICAgICBiaW5kRXZlbnRzKHRoaXMsIHRoaXMuJG1hcE9iamVjdCwgZXZlbnRzKVxyXG5cclxuICAgICAgICAvLyBtYW51YWxseSB0cmlnZ2VyIGNlbnRlciBhbmQgem9vbVxyXG4gICAgICAgIFR3b1dheUJpbmRpbmdXcmFwcGVyKChpbmNyZW1lbnQsIGRlY3JlbWVudCwgc2hvdWxkVXBkYXRlKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLiRtYXBPYmplY3QuYWRkTGlzdGVuZXIoJ2NlbnRlcl9jaGFuZ2VkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoc2hvdWxkVXBkYXRlKCkpIHtcclxuICAgICAgICAgICAgICB0aGlzLiRlbWl0KCdjZW50ZXJfY2hhbmdlZCcsIHRoaXMuJG1hcE9iamVjdC5nZXRDZW50ZXIoKSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkZWNyZW1lbnQoKVxyXG4gICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICBjb25zdCB1cGRhdGVDZW50ZXIgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGluY3JlbWVudCgpXHJcbiAgICAgICAgICAgIHRoaXMuJG1hcE9iamVjdC5zZXRDZW50ZXIodGhpcy5maW5hbExhdExuZylcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBXYXRjaFByaW1pdGl2ZVByb3BlcnRpZXModGhpcywgWydmaW5hbExhdCcsICdmaW5hbExuZyddLCB1cGRhdGVDZW50ZXIpXHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLiRtYXBPYmplY3QuYWRkTGlzdGVuZXIoJ3pvb21fY2hhbmdlZCcsICgpID0+IHtcclxuICAgICAgICAgIHRoaXMuJGVtaXQoJ3pvb21fY2hhbmdlZCcsIHRoaXMuJG1hcE9iamVjdC5nZXRab29tKCkpXHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLiRtYXBPYmplY3QuYWRkTGlzdGVuZXIoJ2JvdW5kc19jaGFuZ2VkJywgKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy4kZW1pdCgnYm91bmRzX2NoYW5nZWQnLCB0aGlzLiRtYXBPYmplY3QuZ2V0Qm91bmRzKCkpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgdGhpcy4kbWFwUHJvbWlzZURlZmVycmVkLnJlc29sdmUodGhpcy4kbWFwT2JqZWN0KVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy4kbWFwT2JqZWN0XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgICB0aHJvdyBlcnJvclxyXG4gICAgICB9KVxyXG4gIH0sXHJcbiAgbWV0aG9kczoge1xyXG4gICAgLi4uY3VzdG9tTWV0aG9kcyxcclxuICAgIC4uLmxpbmtlZE1ldGhvZHMsXHJcbiAgfSxcclxufVxyXG48L3NjcmlwdD5cclxuPHN0eWxlPlxyXG4udnVlLW1hcCB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG4gIG1pbi1oZWlnaHQ6IDJyZW07XHJcbn1cclxuPC9zdHlsZT5cclxuIiwiaW1wb3J0IGJ1aWxkQ29tcG9uZW50IGZyb20gJy4vYnVpbGQtY29tcG9uZW50LmpzJ1xyXG5cclxuY29uc3QgcHJvcHMgPSB7XHJcbiAgb3B0aW9uczoge1xyXG4gICAgdHlwZTogT2JqZWN0LFxyXG4gICAgdHdvV2F5OiBmYWxzZSxcclxuICAgIGRlZmF1bHQ6ICgpID0+IHtcclxuICAgIH0sXHJcbiAgfSxcclxuICBkYXRhOiB7XHJcbiAgICB0eXBlOiBBcnJheSxcclxuICAgIHR3b1dheTogdHJ1ZVxyXG4gIH0sXHJcbn1cclxuXHJcbmNvbnN0IGV2ZW50cyA9IFtdO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgYnVpbGRDb21wb25lbnQoe1xyXG4gIG1hcHBlZFByb3BzOiBwcm9wcyxcclxuICBuYW1lOiAnaGVhdG1hcCcsXHJcbiAgY3RyOiAoKSA9PiBnb29nbGUubWFwcy52aXN1YWxpemF0aW9uLkhlYXRtYXBMYXllcixcclxuICBldmVudHMsXHJcbn0pXHJcblxyXG5cclxuIiwiLy8gVGhpcyBwaWVjZSBvZiBjb2RlIHdhcyBvcmlnbmFsbHkgd3JpdHRlbiBieSBhbWlybmlzc2ltIGFuZCBjYW4gYmUgc2VlbiBoZXJlXHJcbi8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzExNzAzMDE4LzI2OTQ2NTNcclxuLy8gVGhpcyBoYXMgYmVlbiBwb3J0ZWQgdG8gVmFuaWxsYS5qcyBieSBHdWlsbGF1bWVMZWNsZXJjXHJcbmV4cG9ydCBkZWZhdWx0IChpbnB1dCkgPT4ge1xyXG4gIGNvbnN0IF9hZGRFdmVudExpc3RlbmVyID0gaW5wdXQuYWRkRXZlbnRMaXN0ZW5lciA/IGlucHV0LmFkZEV2ZW50TGlzdGVuZXIgOiBpbnB1dC5hdHRhY2hFdmVudFxyXG5cclxuICBmdW5jdGlvbiBhZGRFdmVudExpc3RlbmVyV3JhcHBlcih0eXBlLCBsaXN0ZW5lcikge1xyXG4gICAgLy8gU2ltdWxhdGUgYSAnZG93biBhcnJvdycga2V5cHJlc3Mgb24gaGl0dGluZyAncmV0dXJuJyB3aGVuIG5vIHBhYyBzdWdnZXN0aW9uIGlzIHNlbGVjdGVkLFxyXG4gICAgLy8gYW5kIHRoZW4gdHJpZ2dlciB0aGUgb3JpZ2luYWwgbGlzdGVuZXIuXHJcbiAgICBpZiAodHlwZSA9PT0gJ2tleWRvd24nKSB7XHJcbiAgICAgIGNvbnN0IG9yaWdMaXN0ZW5lciA9IGxpc3RlbmVyXHJcbiAgICAgIGxpc3RlbmVyID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgY29uc3Qgc3VnZ2VzdGlvblNlbGVjdGVkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncGFjLWl0ZW0tc2VsZWN0ZWQnKS5sZW5ndGggPiAwXHJcbiAgICAgICAgaWYgKGV2ZW50LndoaWNoID09PSAxMyAmJiAhc3VnZ2VzdGlvblNlbGVjdGVkKSB7XHJcbiAgICAgICAgICBjb25zdCBzaW11bGF0ZWRFdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdFdmVudCcpXHJcbiAgICAgICAgICBzaW11bGF0ZWRFdmVudC5rZXlDb2RlID0gNDBcclxuICAgICAgICAgIHNpbXVsYXRlZEV2ZW50LndoaWNoID0gNDBcclxuICAgICAgICAgIG9yaWdMaXN0ZW5lci5hcHBseShpbnB1dCwgW3NpbXVsYXRlZEV2ZW50XSlcclxuICAgICAgICB9XHJcbiAgICAgICAgb3JpZ0xpc3RlbmVyLmFwcGx5KGlucHV0LCBbZXZlbnRdKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBfYWRkRXZlbnRMaXN0ZW5lci5hcHBseShpbnB1dCwgW3R5cGUsIGxpc3RlbmVyXSlcclxuICB9XHJcblxyXG4gIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIgPSBhZGRFdmVudExpc3RlbmVyV3JhcHBlclxyXG4gIGlucHV0LmF0dGFjaEV2ZW50ID0gYWRkRXZlbnRMaXN0ZW5lcldyYXBwZXJcclxufVxyXG4iLCI8dGVtcGxhdGU+XHJcbiAgPGlucHV0IHJlZj1cImlucHV0XCIgdi1iaW5kPVwiJGF0dHJzXCIgdi1vbj1cIiRhdHRyc1wiIC8+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG5pbXBvcnQgeyBiaW5kUHJvcHMsIGdldFByb3BzVmFsdWVzIH0gZnJvbSAnLi4vdXRpbHMvYmluZFByb3BzLmpzJ1xyXG5pbXBvcnQgZG93bkFycm93U2ltdWxhdG9yIGZyb20gJy4uL3V0aWxzL3NpbXVsYXRlQXJyb3dEb3duLmpzJ1xyXG5pbXBvcnQgeyBtYXBwZWRQcm9wc1RvVnVlUHJvcHMgfSBmcm9tICcuL2J1aWxkLWNvbXBvbmVudCdcclxuXHJcbmNvbnN0IG1hcHBlZFByb3BzID0ge1xyXG4gIGJvdW5kczoge1xyXG4gICAgdHlwZTogT2JqZWN0LFxyXG4gIH0sXHJcbiAgY29tcG9uZW50UmVzdHJpY3Rpb25zOiB7XHJcbiAgICB0eXBlOiBPYmplY3QsXHJcbiAgICAvLyBEbyBub3QgYmluZCAtLSBtdXN0IGNoZWNrIGZvciB1bmRlZmluZWRcclxuICAgIC8vIGluIHRoZSBwcm9wZXJ0eVxyXG4gICAgbm9CaW5kOiB0cnVlLFxyXG4gIH0sXHJcbiAgdHlwZXM6IHtcclxuICAgIHR5cGU6IEFycmF5LFxyXG4gICAgZGVmYXVsdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gW11cclxuICAgIH0sXHJcbiAgfSxcclxufVxyXG5cclxuY29uc3QgcHJvcHMgPSB7XHJcbiAgc2VsZWN0Rmlyc3RPbkVudGVyOiB7XHJcbiAgICByZXF1aXJlZDogZmFsc2UsXHJcbiAgICB0eXBlOiBCb29sZWFuLFxyXG4gICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgfSxcclxuICBvcHRpb25zOiB7XHJcbiAgICB0eXBlOiBPYmplY3QsXHJcbiAgfSxcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIG1vdW50ZWQoKSB7XHJcbiAgICB0aGlzLiRnbWFwQXBpUHJvbWlzZUxhenkoKS50aGVuKCgpID0+IHtcclxuICAgICAgaWYgKHRoaXMuc2VsZWN0Rmlyc3RPbkVudGVyKSB7XHJcbiAgICAgICAgZG93bkFycm93U2ltdWxhdG9yKHRoaXMuJHJlZnMuaW5wdXQpXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh0eXBlb2YgZ29vZ2xlLm1hcHMucGxhY2VzLkF1dG9jb21wbGV0ZSAhPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgICAgIFwiZ29vZ2xlLm1hcHMucGxhY2VzLkF1dG9jb21wbGV0ZSBpcyB1bmRlZmluZWQuIERpZCB5b3UgYWRkICdwbGFjZXMnIHRvIGxpYnJhcmllcyB3aGVuIGxvYWRpbmcgR29vZ2xlIE1hcHM/XCJcclxuICAgICAgICApXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXHJcbiAgICAgIGNvbnN0IGZpbmFsT3B0aW9ucyA9IHtcclxuICAgICAgICAuLi5nZXRQcm9wc1ZhbHVlcyh0aGlzLCBtYXBwZWRQcm9wcyksXHJcbiAgICAgICAgLi4udGhpcy5vcHRpb25zLFxyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLiRhdXRvY29tcGxldGUgPSBuZXcgZ29vZ2xlLm1hcHMucGxhY2VzLkF1dG9jb21wbGV0ZSh0aGlzLiRyZWZzLmlucHV0LCBmaW5hbE9wdGlvbnMpXHJcbiAgICAgIGJpbmRQcm9wcyh0aGlzLCB0aGlzLiRhdXRvY29tcGxldGUsIG1hcHBlZFByb3BzKVxyXG5cclxuICAgICAgdGhpcy4kd2F0Y2goJ2NvbXBvbmVudFJlc3RyaWN0aW9ucycsICh2KSA9PiB7XHJcbiAgICAgICAgaWYgKHYgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgdGhpcy4kYXV0b2NvbXBsZXRlLnNldENvbXBvbmVudFJlc3RyaWN0aW9ucyh2KVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuXHJcbiAgICAgIC8vIE5vdCB1c2luZyBgYmluZEV2ZW50c2AgYmVjYXVzZSB3ZSBhbHNvIHdhbnRcclxuICAgICAgLy8gdG8gcmV0dXJuIHRoZSByZXN1bHQgb2YgYGdldFBsYWNlKClgXHJcbiAgICAgIHRoaXMuJGF1dG9jb21wbGV0ZS5hZGRMaXN0ZW5lcigncGxhY2VfY2hhbmdlZCcsICgpID0+IHtcclxuICAgICAgICB0aGlzLiRlbWl0KCdwbGFjZV9jaGFuZ2VkJywgdGhpcy4kYXV0b2NvbXBsZXRlLmdldFBsYWNlKCkpXHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgcHJvcHM6IHtcclxuICAgIC4uLm1hcHBlZFByb3BzVG9WdWVQcm9wcyhtYXBwZWRQcm9wcyksXHJcbiAgICAuLi5wcm9wcyxcclxuICB9LFxyXG59XHJcbjwvc2NyaXB0PlxyXG4iLCJpbXBvcnQgbGF6eSBmcm9tICcuL3V0aWxzL2xhenlWYWx1ZSdcclxuaW1wb3J0IHsgbG9hZEdNYXBBcGkgfSBmcm9tICcuL2xvYWQtZ29vZ2xlLW1hcHMnXHJcbmltcG9ydCB7IGNyZWF0ZUFwcCB9IGZyb20gJ3Z1ZSdcclxuaW1wb3J0IFBvbHlsaW5lIGZyb20gJy4vY29tcG9uZW50cy9wb2x5bGluZSdcclxuaW1wb3J0IFBvbHlnb24gZnJvbSAnLi9jb21wb25lbnRzL3BvbHlnb24nXHJcbmltcG9ydCBDaXJjbGUgZnJvbSAnLi9jb21wb25lbnRzL2NpcmNsZSdcclxuaW1wb3J0IFJlY3RhbmdsZSBmcm9tICcuL2NvbXBvbmVudHMvcmVjdGFuZ2xlJ1xyXG5pbXBvcnQgTWFya2VyIGZyb20gJy4vY29tcG9uZW50cy9tYXJrZXIudnVlJ1xyXG5pbXBvcnQgR01hcENsdXN0ZXIgZnJvbSAnLi9jb21wb25lbnRzL2NsdXN0ZXIudnVlJ1xyXG5pbXBvcnQgSW5mb1dpbmRvdyBmcm9tICcuL2NvbXBvbmVudHMvaW5mb1dpbmRvdy52dWUnXHJcbmltcG9ydCBNYXAgZnJvbSAnLi9jb21wb25lbnRzL21hcC52dWUnXHJcbmltcG9ydCBIZWF0bWFwIGZyb20gJy4vY29tcG9uZW50cy9oZWF0bWFwJ1xyXG5pbXBvcnQgQXV0b2NvbXBsZXRlIGZyb20gJy4vY29tcG9uZW50cy9hdXRvY29tcGxldGUudnVlJ1xyXG5cclxuaW1wb3J0IE1hcEVsZW1lbnRNaXhpbiBmcm9tICcuL2NvbXBvbmVudHMvbWFwRWxlbWVudE1peGluJ1xyXG5pbXBvcnQgYnVpbGRDb21wb25lbnQgZnJvbSAnLi9jb21wb25lbnRzL2J1aWxkLWNvbXBvbmVudCdcclxuaW1wb3J0IE1vdW50YWJsZU1peGluIGZyb20gJy4vdXRpbHMvbW91bnRhYmxlTWl4aW4nXHJcbmltcG9ydCB7RW52fSBmcm9tIFwiLi91dGlscy9lbnZcIjtcclxubGV0IEdNYXBBcGkgPSBudWxsO1xyXG5cclxuZXhwb3J0IHtcclxuICBsb2FkR01hcEFwaSxcclxuICBNYXJrZXIsXHJcbiAgUG9seWxpbmUsXHJcbiAgUG9seWdvbixcclxuICBDaXJjbGUsXHJcbiAgR01hcENsdXN0ZXIsXHJcbiAgUmVjdGFuZ2xlLFxyXG4gIEluZm9XaW5kb3csXHJcbiAgTWFwLFxyXG4gIE1hcEVsZW1lbnRNaXhpbixcclxuICBIZWF0bWFwLFxyXG4gIGJ1aWxkQ29tcG9uZW50LFxyXG4gIEF1dG9jb21wbGV0ZSxcclxuICBNb3VudGFibGVNaXhpbixcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5zdGFsbChWdWUsIG9wdGlvbnMpIHtcclxuICBvcHRpb25zID0ge1xyXG4gICAgaW5zdGFsbENvbXBvbmVudHM6IHRydWUsXHJcbiAgICBhdXRvYmluZEFsbEV2ZW50czogZmFsc2UsXHJcbiAgICAuLi5vcHRpb25zLFxyXG4gIH1cclxuXHJcbiAgR01hcEFwaSA9IGNyZWF0ZUFwcCh7XHJcbiAgICBkYXRhOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHJldHVybiB7IGdtYXBBcGk6IG51bGwgfVxyXG4gICAgfSxcclxuICB9KVxyXG5cclxuICBjb25zdCBkZWZhdWx0UmVzaXplQnVzID0gY3JlYXRlQXBwKClcclxuXHJcbiAgLy8gVXNlIGEgbGF6eSB0byBvbmx5IGxvYWQgdGhlIEFQSSB3aGVuXHJcbiAgLy8gYSBWR00gY29tcG9uZW50IGlzIGxvYWRlZFxyXG4gIGxldCBnbWFwQXBpUHJvbWlzZUxhenkgPSBtYWtlR01hcEFwaVByb21pc2VMYXp5KG9wdGlvbnMpXHJcblxyXG4gIFZ1ZS5taXhpbih7XHJcbiAgICBjcmVhdGVkKCkge1xyXG4gICAgICB0aGlzLiRnbWFwRGVmYXVsdFJlc2l6ZUJ1cyA9IGRlZmF1bHRSZXNpemVCdXNcclxuICAgICAgdGhpcy4kZ21hcE9wdGlvbnMgPSBvcHRpb25zXHJcbiAgICAgIHRoaXMuJGdtYXBBcGlQcm9taXNlTGF6eSA9IGdtYXBBcGlQcm9taXNlTGF6eVxyXG4gICAgfSxcclxuICB9KVxyXG4gIFZ1ZS4kZ21hcERlZmF1bHRSZXNpemVCdXMgPSBkZWZhdWx0UmVzaXplQnVzXHJcbiAgVnVlLiRnbWFwQXBpUHJvbWlzZUxhenkgPSBnbWFwQXBpUHJvbWlzZUxhenlcclxuXHJcbiAgaWYgKG9wdGlvbnMuaW5zdGFsbENvbXBvbmVudHMpIHtcclxuICAgIFZ1ZS5jb21wb25lbnQoJ0dNYXBNYXAnLCBNYXApXHJcbiAgICBWdWUuY29tcG9uZW50KCdHTWFwTWFya2VyJywgTWFya2VyKVxyXG4gICAgVnVlLmNvbXBvbmVudCgnR01hcEluZm9XaW5kb3cnLCBJbmZvV2luZG93KVxyXG4gICAgVnVlLmNvbXBvbmVudCgnR01hcENsdXN0ZXInLCBHTWFwQ2x1c3RlcilcclxuICAgIFZ1ZS5jb21wb25lbnQoJ0dNYXBQb2x5bGluZScsIFBvbHlsaW5lKVxyXG4gICAgVnVlLmNvbXBvbmVudCgnR01hcFBvbHlnb24nLCBQb2x5Z29uKVxyXG4gICAgVnVlLmNvbXBvbmVudCgnR01hcENpcmNsZScsIENpcmNsZSlcclxuICAgIFZ1ZS5jb21wb25lbnQoJ0dNYXBSZWN0YW5nbGUnLCBSZWN0YW5nbGUpXHJcbiAgICBWdWUuY29tcG9uZW50KCdHTWFwQXV0b2NvbXBsZXRlJywgQXV0b2NvbXBsZXRlKVxyXG4gICAgVnVlLmNvbXBvbmVudCgnR01hcEhlYXRtYXAnLCBIZWF0bWFwKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gbWFrZUdNYXBBcGlQcm9taXNlTGF6eShvcHRpb25zKSB7XHJcbiAgLy8gVGhpbmdzIHRvIGRvIG9uY2UgdGhlIEFQSSBpcyBsb2FkZWRcclxuICBmdW5jdGlvbiBvbkFwaUxvYWRlZCgpIHtcclxuICAgIEdNYXBBcGkuZ21hcEFwaSA9IHt9XHJcbiAgICByZXR1cm4gd2luZG93Lmdvb2dsZVxyXG4gIH1cclxuXHJcbiAgaWYgKG9wdGlvbnMubG9hZCkge1xyXG4gICAgLy8gSWYgbGlicmFyeSBzaG91bGQgbG9hZCB0aGUgQVBJXHJcbiAgICByZXR1cm4gbGF6eSgoKSA9PiB7XHJcbiAgICAgIC8vIExvYWQgdGhlXHJcbiAgICAgIC8vIFRoaXMgd2lsbCBvbmx5IGJlIGV2YWx1YXRlZCBvbmNlXHJcbiAgICAgIGlmIChFbnYuaXNTZXJ2ZXIoKSkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgoKSA9PiB7fSkudGhlbihvbkFwaUxvYWRlZClcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgd2luZG93Wyd2dWVHb29nbGVNYXBzSW5pdCddID0gcmVzb2x2ZVxyXG4gICAgICAgICAgICBsb2FkR01hcEFwaShvcHRpb25zLmxvYWQpXHJcbiAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgcmVqZWN0KGVycilcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KS50aGVuKG9uQXBpTG9hZGVkKVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH0gZWxzZSB7XHJcbiAgICAvLyBJZiBsaWJyYXJ5IHNob3VsZCBub3QgaGFuZGxlIEFQSSwgcHJvdmlkZVxyXG4gICAgLy8gZW5kLXVzZXJzIHdpdGggdGhlIGdsb2JhbCBgdnVlR29vZ2xlTWFwc0luaXQ6ICgpID0+IHVuZGVmaW5lZGBcclxuICAgIC8vIHdoZW4gdGhlIEdvb2dsZSBNYXBzIEFQSSBoYXMgYmVlbiBsb2FkZWRcclxuICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgICBpZiAoRW52LmlzU2VydmVyKCkpIHtcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfVxyXG4gICAgICB3aW5kb3dbJ3Z1ZUdvb2dsZU1hcHNJbml0J10gPSByZXNvbHZlXHJcbiAgICB9KS50aGVuKG9uQXBpTG9hZGVkKVxyXG5cclxuICAgIHJldHVybiBsYXp5KCgpID0+IHByb21pc2UpXHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IGJvb3QgfSBmcm9tIFwicXVhc2FyL3dyYXBwZXJzXCI7XHJcbmltcG9ydCBWdWVHb29nbGVNYXBzIGZyb20gXCJAZmF3bWkvdnVlLWdvb2dsZS1tYXBzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBib290KCh7IGFwcCB9KSA9PiB7XHJcbiAgYXBwLnVzZShWdWVHb29nbGVNYXBzLCB7XHJcbiAgICBsb2FkOiB7XHJcbiAgICAgIGtleTogcHJvY2Vzcy5lbnYuR09PR0xFX01BUFNfQVBJX0tFWSxcclxuICAgIH0sXHJcbiAgfSk7XHJcbn0pO1xyXG4iXSwibmFtZXMiOlsiZXZlbnRzIiwicHJvcHMiLCJtYXBwZWRQcm9wcyIsIm9wdGlvbnMiLCJfc2ZjX21haW4iLCJfY3JlYXRlRWxlbWVudEJsb2NrIiwiX3JlbmRlclNsb3QiLCJkIiwiYiIsIl9fYXNzaWduIiwiT3ZlcmxheVZpZXdTYWZlIiwiQ2x1c3Rlckljb24iLCJDbHVzdGVyIiwiTWFya2VyQ2x1c3RlcmVyIiwiX2hvaXN0ZWRfMSIsIl9vcGVuQmxvY2siLCJfbm9ybWFsaXplQ2xhc3MiLCJfY3JlYXRlRWxlbWVudFZOb2RlIiwiX21lcmdlUHJvcHMiLCJfdG9IYW5kbGVycyIsIlZ1ZUdvb2dsZU1hcHMiXSwibWFwcGluZ3MiOiI7QUFFQSxJQUFBLE9BQWUsUUFBTTtBQUNuQixNQUFJLFNBQVM7QUFDYixNQUFJO0FBRUosU0FBTyxNQUFNO0FBQ1gsUUFBSSxDQUFDLFFBQVE7QUFDWCxlQUFTO0FBQ1QsZUFBUyxHQUFFO0FBQUEsSUFDWjtBQUVELFdBQU87QUFBQSxFQUNYO0FBQ0E7QUNkTyxNQUFNLElBQUk7QUFBQSxFQUNmLE9BQU8sV0FBVztBQUNoQixXQUFPLE9BQU8sYUFBYTtBQUFBLEVBQzVCO0FBQ0g7QUNKTyxTQUFTLGdCQUFnQixTQUFTO0FBQ3ZDLFFBQU0sa0JBQWtCLFNBQVMsY0FBYyxRQUFRO0FBQ3ZELE1BQUksT0FBTyxZQUFZLFVBQVU7QUFDL0IsVUFBTSxJQUFJLE1BQU0sOEJBQThCO0FBQUEsRUFDL0M7QUFJRCxNQUFJLE1BQU0sVUFBVSxjQUFjLFFBQVEsU0FBUyxHQUFHO0FBQ3BELFlBQVEsWUFBWSxRQUFRLFVBQVUsS0FBSyxHQUFHO0FBQUEsRUFDL0M7QUFDRCxVQUFRLGNBQWM7QUFDdEIsTUFBSSxVQUFVO0FBRWQsTUFBSSxNQUNGLFVBQ0EsT0FBTyxLQUFLLE9BQU8sRUFDaEIsSUFBSSxDQUFDLFFBQVEsbUJBQW1CLEdBQUcsSUFBSSxNQUFNLG1CQUFtQixRQUFRLElBQUksQ0FBQyxFQUFF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
