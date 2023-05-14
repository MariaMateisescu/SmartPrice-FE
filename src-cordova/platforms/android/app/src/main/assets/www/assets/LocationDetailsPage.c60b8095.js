import { ak as h, bt as createComponent, ck as useSizeProps, cj as useSize, y as ref, a1 as computed, bC as QIcon, by as hMergeSlot, bF as hSlot, ah as getCurrentInstance, D as toRaw, bI as stopAndPrevent, _ as _export_sfc, o as openBlock, c as createElementBlock, aa as createVNode, b5 as withCtx, a as createBaseVNode, a9 as createTextVNode, M as toDisplayString, b7 as withDirectives, bE as QBtn, Q as Fragment, aH as pushScopeId, aF as popScopeId, aL as resolveComponent, a3 as createCommentVNode, aK as renderList, a2 as createBlock, bB as useDashHeaderStore, bS as Ripple } from "./index.5a14f3c4.js";
import { Q as QItem, a as QItemSection } from "./QItem.aec05661.js";
import { Q as QSpace, a as QDialog } from "./QDialog.8f997d51.js";
import { Q as QCard, a as QCardSection } from "./QCard.133f47d5.js";
import { Q as QInput } from "./QInput.11495055.js";
import { Q as QSelect } from "./QSelect.7f454133.js";
import { u as useDarkProps, a as useDark } from "./use-dark.a5d47983.js";
import { o as optionSizes, c as useRefocusTarget } from "./use-checkbox.e7258a8b.js";
import { u as useFormProps, a as useFormInject } from "./use-form.0026fe71.js";
import { a as QCheckbox } from "./QCheckbox.dfa8d790.js";
import { Q as QToggle } from "./QToggle.27d1ec1b.js";
import { C as ClosePopup } from "./ClosePopup.262ce3d8.js";
import { Q as QSeparator } from "./QSeparator.8089b31c.js";
import { Q as QSlideItem, a as QCardActions } from "./QCardActions.cb1bd3d9.js";
import "./use-timeout.a3a7dc24.js";
import "./focus-manager.d6507951.js";
import "./uid.42677368.js";
import "./QChip.c00f6ba3.js";
import "./QMenu.62491ec2.js";
import "./selection.f977ff01.js";
import "./rtl.b51694b1.js";
import "./format.2a3572e1.js";
import "./TouchPan.0f0bed18.js";
import "./touch.70a9dd44.js";
import "./use-cache.b0833c75.js";
const svg = h("svg", {
  key: "svg",
  class: "q-radio__bg absolute non-selectable",
  viewBox: "0 0 24 24"
}, [
  h("path", {
    d: "M12,22a10,10 0 0 1 -10,-10a10,10 0 0 1 10,-10a10,10 0 0 1 10,10a10,10 0 0 1 -10,10m0,-22a12,12 0 0 0 -12,12a12,12 0 0 0 12,12a12,12 0 0 0 12,-12a12,12 0 0 0 -12,-12"
  }),
  h("path", {
    class: "q-radio__check",
    d: "M12,6a6,6 0 0 0 -6,6a6,6 0 0 0 6,6a6,6 0 0 0 6,-6a6,6 0 0 0 -6,-6"
  })
]);
var QRadio = createComponent({
  name: "QRadio",
  props: {
    ...useDarkProps,
    ...useSizeProps,
    ...useFormProps,
    modelValue: { required: true },
    val: { required: true },
    label: String,
    leftLabel: Boolean,
    checkedIcon: String,
    uncheckedIcon: String,
    color: String,
    keepColor: Boolean,
    dense: Boolean,
    disable: Boolean,
    tabindex: [String, Number]
  },
  emits: ["update:modelValue"],
  setup(props, { slots, emit }) {
    const { proxy } = getCurrentInstance();
    const isDark = useDark(props, proxy.$q);
    const sizeStyle = useSize(props, optionSizes);
    const rootRef = ref(null);
    const { refocusTargetEl, refocusTarget } = useRefocusTarget(props, rootRef);
    const isTrue = computed(() => toRaw(props.modelValue) === toRaw(props.val));
    const classes = computed(
      () => "q-radio cursor-pointer no-outline row inline no-wrap items-center" + (props.disable === true ? " disabled" : "") + (isDark.value === true ? " q-radio--dark" : "") + (props.dense === true ? " q-radio--dense" : "") + (props.leftLabel === true ? " reverse" : "")
    );
    const innerClass = computed(() => {
      const color = props.color !== void 0 && (props.keepColor === true || isTrue.value === true) ? ` text-${props.color}` : "";
      return `q-radio__inner relative-position q-radio__inner--${isTrue.value === true ? "truthy" : "falsy"}${color}`;
    });
    const icon = computed(
      () => (isTrue.value === true ? props.checkedIcon : props.uncheckedIcon) || null
    );
    const tabindex = computed(() => props.disable === true ? -1 : props.tabindex || 0);
    const formAttrs = computed(() => {
      const prop = { type: "radio" };
      props.name !== void 0 && Object.assign(prop, {
        ".checked": isTrue.value === true,
        "^checked": isTrue.value === true ? "checked" : void 0,
        name: props.name,
        value: props.val
      });
      return prop;
    });
    const injectFormInput = useFormInject(formAttrs);
    function onClick(e) {
      if (e !== void 0) {
        stopAndPrevent(e);
        refocusTarget(e);
      }
      if (props.disable !== true && isTrue.value !== true) {
        emit("update:modelValue", props.val, e);
      }
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
    Object.assign(proxy, { set: onClick });
    return () => {
      const content = icon.value !== null ? [
        h("div", {
          key: "icon",
          class: "q-radio__icon-container absolute-full flex flex-center no-wrap"
        }, [
          h(QIcon, {
            class: "q-radio__icon",
            name: icon.value
          })
        ])
      ] : [svg];
      props.disable !== true && injectFormInput(
        content,
        "unshift",
        " q-radio__native q-ma-none q-pa-none"
      );
      const child = [
        h("div", {
          class: innerClass.value,
          style: sizeStyle.value,
          "aria-hidden": "true"
        }, content)
      ];
      if (refocusTargetEl.value !== null) {
        child.push(refocusTargetEl.value);
      }
      const label = props.label !== void 0 ? hMergeSlot(slots.default, [props.label]) : hSlot(slots.default);
      label !== void 0 && child.push(
        h("div", {
          class: "q-radio__label q-anchor--skip"
        }, label)
      );
      return h("div", {
        ref: rootRef,
        class: classes.value,
        tabindex: tabindex.value,
        role: "radio",
        "aria-label": props.label,
        "aria-checked": isTrue.value === true ? "true" : "false",
        "aria-disabled": props.disable === true ? "true" : void 0,
        onClick,
        onKeydown,
        onKeyup
      }, child);
    };
  }
});
const components = {
  radio: QRadio,
  checkbox: QCheckbox,
  toggle: QToggle
};
const typeValues = Object.keys(components);
var QOptionGroup = createComponent({
  name: "QOptionGroup",
  props: {
    ...useDarkProps,
    modelValue: {
      required: true
    },
    options: {
      type: Array,
      validator: (opts) => opts.every((opt) => "value" in opt && "label" in opt)
    },
    name: String,
    type: {
      default: "radio",
      validator: (v) => typeValues.includes(v)
    },
    color: String,
    keepColor: Boolean,
    dense: Boolean,
    size: String,
    leftLabel: Boolean,
    inline: Boolean,
    disable: Boolean
  },
  emits: ["update:modelValue"],
  setup(props, { emit, slots }) {
    const { proxy: { $q } } = getCurrentInstance();
    const arrayModel = Array.isArray(props.modelValue);
    if (props.type === "radio") {
      if (arrayModel === true) {
        console.error("q-option-group: model should not be array");
      }
    } else if (arrayModel === false) {
      console.error("q-option-group: model should be array in your case");
    }
    const isDark = useDark(props, $q);
    const component = computed(() => components[props.type]);
    const classes = computed(
      () => "q-option-group q-gutter-x-sm" + (props.inline === true ? " q-option-group--inline" : "")
    );
    const attrs = computed(() => {
      const attrs2 = { role: "group" };
      if (props.type === "radio") {
        attrs2.role = "radiogroup";
        if (props.disable === true) {
          attrs2["aria-disabled"] = "true";
        }
      }
      return attrs2;
    });
    function onUpdateModelValue(value) {
      emit("update:modelValue", value);
    }
    return () => h("div", {
      class: classes.value,
      ...attrs.value
    }, props.options.map((opt, i) => {
      const child = slots["label-" + i] !== void 0 ? () => slots["label-" + i](opt) : slots.label !== void 0 ? () => slots.label(opt) : void 0;
      return h("div", [
        h(component.value, {
          modelValue: props.modelValue,
          val: opt.value,
          name: opt.name === void 0 ? props.name : opt.name,
          disable: props.disable || opt.disable,
          label: child === void 0 ? opt.label : null,
          leftLabel: opt.leftLabel === void 0 ? props.leftLabel : opt.leftLabel,
          color: opt.color === void 0 ? props.color : opt.color,
          checkedIcon: opt.checkedIcon,
          uncheckedIcon: opt.uncheckedIcon,
          dark: opt.dark || isDark.value,
          size: opt.size === void 0 ? props.size : opt.size,
          dense: props.dense,
          keepColor: opt.keepColor === void 0 ? props.keepColor : opt.keepColor,
          "onUpdate:modelValue": onUpdateModelValue
        }, child)
      ]);
    }));
  }
});
var ProductCard_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$2 = {
  name: "ProductCard",
  props: ["productInfo"],
  emits: ["editProductSuccess", "deleteProductSuccess"],
  data() {
    return {
      showEditProduct: false,
      showDeleteProduct: false,
      name: this.productInfo.name,
      category: this.productInfo.category.name,
      brand: this.productInfo.brand,
      weight: this.productInfo.weight,
      price: this.productInfo.price
    };
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
    showEditProductDialog({ reset }) {
      this.showEditProduct = true;
      this.finalize(reset);
    },
    showDeleteProductDialog({ reset }) {
      this.showDeleteProduct = true;
      this.finalize(reset);
    },
    async saveProduct() {
      try {
        const data = {
          name: this.name,
          category: this.category,
          brand: this.brand,
          weight: this.weight,
          price: this.price
        };
        const res = await this.$api.patch(
          `/products/${this.productInfo._id}`,
          data
        );
        if (res.data.status === "success") {
          this.$emit("editProductSuccess");
          this.showEditProduct = false;
        }
      } catch (err) {
        console.log(err);
      }
    },
    async deleteProduct() {
      try {
        const res = await this.$api.delete(
          `/products/${this.productInfo._id}/${this.$route.params.locationId}`
        );
        if (res.data.status === "success") {
          this.$emit("deleteProductSuccess");
          this.showDeleteProduct = false;
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
};
const _withScopeId$1 = (n) => (pushScopeId("data-v-37517c3b"), n = n(), popScopeId(), n);
const _hoisted_1$2 = { class: "row items-center" };
const _hoisted_2$2 = { class: "row items-center" };
const _hoisted_3$1 = { class: "product" };
const _hoisted_4$1 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-h6" }, "Edit Product", -1));
const _hoisted_5 = { class: "q-ml-sm" };
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(Fragment, null, [
    createVNode(QSlideItem, {
      onLeft: $options.showEditProductDialog,
      onRight: $options.showDeleteProductDialog
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
        createVNode(QItem, null, {
          default: withCtx(() => [
            createVNode(QItemSection, null, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_3$1, [
                  createTextVNode(toDisplayString($props.productInfo.brand) + " " + toDisplayString($props.productInfo.name) + " " + toDisplayString($props.productInfo.weight) + " ", 1),
                  createBaseVNode("strong", null, toDisplayString($props.productInfo.price) + " lei", 1)
                ])
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["onLeft", "onRight"]),
    createVNode(QDialog, {
      maximized: "",
      modelValue: $data.showEditProduct,
      "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $data.showEditProduct = $event)
    }, {
      default: withCtx(() => [
        createVNode(QCard, null, {
          default: withCtx(() => [
            createVNode(QCardSection, { class: "row items-center q-pb-none" }, {
              default: withCtx(() => [
                _hoisted_4$1,
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
            createVNode(QCardSection, null, {
              default: withCtx(() => [
                createVNode(QInput, {
                  modelValue: $data.name,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.name = $event),
                  type: "text",
                  label: "Name"
                }, null, 8, ["modelValue"]),
                createVNode(QInput, {
                  modelValue: $data.category,
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.category = $event),
                  type: "text",
                  label: "Category"
                }, null, 8, ["modelValue"]),
                createVNode(QInput, {
                  modelValue: $data.brand,
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.brand = $event),
                  type: "text",
                  label: "Brand"
                }, null, 8, ["modelValue"]),
                createVNode(QInput, {
                  modelValue: $data.weight,
                  "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.weight = $event),
                  type: "text",
                  label: "Weight"
                }, null, 8, ["modelValue"]),
                createVNode(QInput, {
                  modelValue: $data.price,
                  "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $data.price = $event),
                  type: "number",
                  label: "Price"
                }, null, 8, ["modelValue"]),
                createVNode(QBtn, {
                  color: "secondary",
                  onClick: $options.saveProduct
                }, {
                  default: withCtx(() => [
                    createTextVNode("Save Product")
                  ]),
                  _: 1
                }, 8, ["onClick"])
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
      modelValue: $data.showDeleteProduct,
      "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $data.showDeleteProduct = $event),
      persistent: ""
    }, {
      default: withCtx(() => [
        createVNode(QCard, null, {
          default: withCtx(() => [
            createVNode(QCardSection, { class: "row items-center" }, {
              default: withCtx(() => [
                createBaseVNode("span", _hoisted_5, "Are you sure you want to delete " + toDisplayString($props.productInfo.name) + "?", 1)
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
                  onClick: $options.deleteProduct
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
var ProductCard = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__scopeId", "data-v-37517c3b"], ["__file", "ProductCard.vue"]]);
const _sfc_main$1 = {
  name: "ProductsInCategory",
  components: {
    ProductCard
  },
  props: ["categoryInfo"],
  emits: ["goBackToCategories"],
  data() {
    return {
      productsInCategory: null
    };
  },
  async mounted() {
    await this.fetchProductsInOneCategory();
  },
  methods: {
    async fetchProductsInOneCategory() {
      const res = await this.$api.get(
        `/categories/${this.$route.params.locationId}/${this.categoryInfo._id}`
      );
      this.productsInCategory = res.data.data.productsInCategoryInLocation;
    }
  }
};
const _hoisted_1$1 = { key: 0 };
const _hoisted_2$1 = { key: 1 };
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ProductCard = resolveComponent("ProductCard");
  return openBlock(), createElementBlock(Fragment, null, [
    createVNode(QSeparator),
    createBaseVNode("div", null, [
      createVNode(QIcon, {
        name: "arrow_back_ios",
        onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("goBackToCategories"))
      }),
      createBaseVNode("strong", null, toDisplayString($props.categoryInfo.name), 1)
    ]),
    $data.productsInCategory && !$data.productsInCategory.length ? (openBlock(), createElementBlock("div", _hoisted_1$1, " No products in this category. ")) : createCommentVNode("", true),
    $data.productsInCategory && $data.productsInCategory.length ? (openBlock(), createElementBlock("div", _hoisted_2$1, [
      (openBlock(true), createElementBlock(Fragment, null, renderList($data.productsInCategory, (product) => {
        return openBlock(), createBlock(_component_ProductCard, {
          key: product._id,
          productInfo: product,
          onDeleteProductSuccess: $options.fetchProductsInOneCategory,
          onEditProductSuccess: $options.fetchProductsInOneCategory
        }, null, 8, ["productInfo", "onDeleteProductSuccess", "onEditProductSuccess"]);
      }), 128))
    ])) : createCommentVNode("", true)
  ], 64);
}
var ProductsInCategory = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__file", "ProductsInCategory.vue"]]);
var LocationDetailsPage_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main = {
  name: "ProductsPage",
  components: {
    ProductsInCategory
  },
  async mounted() {
    await this.fetchLocation();
    await this.fetchCategories();
    const dashHeader = useDashHeaderStore();
    dashHeader.$patch({ title: this.location.name, showBackIcon: true });
    const res = await this.$api.get(`/markets/${this.$route.params.marketId}`);
    this.market = res.data.data.market;
    this.market.locations.map(
      (loc) => this.locationOptions.push({ label: loc.name, value: loc._id })
    );
    this.selectedLocations.push(this.$route.params.locationId);
  },
  data() {
    return {
      name: null,
      category: null,
      brand: null,
      weight: null,
      price: null,
      showAddProduct: false,
      market: null,
      selectedLocations: [],
      locationOptions: [],
      location: null,
      categoryOptions: [],
      showedOptions: [],
      categories: [],
      categoryInfo: null
    };
  },
  methods: {
    async addProduct() {
      try {
        const data = {
          name: this.name,
          category: this.category.value,
          brand: this.brand,
          weight: this.weight,
          price: this.price,
          selectedLocations: this.selectedLocations
        };
        const res = await this.$api.post("/products", data);
        if (res.data.status === "success") {
          await this.fetchLocation();
          this.showAddProduct = false;
          this.resetFields();
        }
      } catch (error) {
        console.log(error);
      }
    },
    resetFields() {
      this.name = null;
      this.category = null;
      this.brand = null;
      this.weight = null;
      this.price = null;
      this.selectedLocations = [this.$route.params.locationId];
    },
    async fetchLocation() {
      const res = await this.$api.get(
        `/locations/${this.$route.params.locationId}`
      );
      this.location = res.data.data.location;
    },
    async fetchCategories() {
      const res = await this.$api.get("/categories");
      this.categoryOptions = res.data.data.categories.map(
        ({ _id: value, name: label }) => ({
          value,
          label
        })
      );
      this.categories = res.data.data.categories;
      console.log(this.categories);
      this.showedOptions = Object.assign(this.categoryOptions);
    },
    filterFn(val, update) {
      if (val === "") {
        update(() => {
          this.showedOptions = this.categoryOptions;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        this.showedOptions = this.categoryOptions.filter(
          (v) => v.label.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    viewProductsInCategory(category) {
      this.categoryInfo = category;
      console.log(this.categoryInfo);
    }
  }
};
const _withScopeId = (n) => (pushScopeId("data-v-76325bce"), n = n(), popScopeId(), n);
const _hoisted_1 = { key: 0 };
const _hoisted_2 = { key: 0 };
const _hoisted_3 = { key: 1 };
const _hoisted_4 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-h6" }, "Add Product", -1));
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ProductsInCategory = resolveComponent("ProductsInCategory");
  return $data.location ? (openBlock(), createElementBlock("div", _hoisted_1, [
    $data.location ? (openBlock(), createElementBlock("h5", _hoisted_2, toDisplayString($data.location.name), 1)) : createCommentVNode("", true),
    createVNode(QBtn, {
      class: "add-product__btn",
      onClick: _cache[0] || (_cache[0] = ($event) => $data.showAddProduct = true)
    }, {
      default: withCtx(() => [
        createTextVNode("Add Product")
      ]),
      _: 1
    }),
    !$data.categoryInfo ? (openBlock(), createElementBlock("div", _hoisted_3, [
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
    $data.categoryInfo ? (openBlock(), createBlock(_component_ProductsInCategory, {
      key: 2,
      categoryInfo: $data.categoryInfo,
      onGoBackToCategories: _cache[1] || (_cache[1] = ($event) => $data.categoryInfo = null)
    }, null, 8, ["categoryInfo"])) : createCommentVNode("", true),
    createVNode(QDialog, {
      maximized: "",
      modelValue: $data.showAddProduct,
      "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => $data.showAddProduct = $event)
    }, {
      default: withCtx(() => [
        createVNode(QCard, null, {
          default: withCtx(() => [
            createVNode(QCardSection, { class: "row items-center q-pb-none" }, {
              default: withCtx(() => [
                _hoisted_4,
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
            createVNode(QCardSection, null, {
              default: withCtx(() => [
                createVNode(QInput, {
                  modelValue: $data.name,
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.name = $event),
                  type: "text",
                  label: "Name"
                }, null, 8, ["modelValue"]),
                createVNode(QSelect, {
                  modelValue: $data.category,
                  "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.category = $event),
                  options: $data.showedOptions,
                  label: "Category",
                  "use-input": "",
                  "input-debounce": "0",
                  onFilter: $options.filterFn
                }, null, 8, ["modelValue", "options", "onFilter"]),
                createVNode(QInput, {
                  modelValue: $data.brand,
                  "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $data.brand = $event),
                  type: "text",
                  label: "Brand"
                }, null, 8, ["modelValue"]),
                createVNode(QInput, {
                  modelValue: $data.weight,
                  "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $data.weight = $event),
                  type: "text",
                  label: "Weight"
                }, null, 8, ["modelValue"]),
                createVNode(QInput, {
                  modelValue: $data.price,
                  "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $data.price = $event),
                  type: "number",
                  label: "Price"
                }, null, 8, ["modelValue"]),
                createBaseVNode("div", null, [
                  createVNode(QOptionGroup, {
                    modelValue: $data.selectedLocations,
                    "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $data.selectedLocations = $event),
                    options: $data.locationOptions,
                    color: "green",
                    type: "checkbox"
                  }, null, 8, ["modelValue", "options"])
                ]),
                createVNode(QBtn, {
                  style: { "background-color": "#267378", "color": "#fff" },
                  onClick: $options.addProduct,
                  label: "Add product"
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
  ])) : createCommentVNode("", true);
}
var LocationDetailsPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-76325bce"], ["__file", "LocationDetailsPage.vue"]]);
export { LocationDetailsPage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9jYXRpb25EZXRhaWxzUGFnZS5jNjBiODA5NS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9yYWRpby9RUmFkaW8uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL29wdGlvbi1ncm91cC9RT3B0aW9uR3JvdXAuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9hZG1pbmlzdHJhdGlvbi9Qcm9kdWN0Q2FyZC52dWUiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9hZG1pbmlzdHJhdGlvbi9Qcm9kdWN0c0luQ2F0ZWdvcnkudnVlIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL2FkbWluaXN0cmF0aW9uL0xvY2F0aW9uRGV0YWlsc1BhZ2UudnVlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGgsIHJlZiwgY29tcHV0ZWQsIGdldEN1cnJlbnRJbnN0YW5jZSwgdG9SYXcgfSBmcm9tICd2dWUnXG5cbmltcG9ydCBRSWNvbiBmcm9tICcuLi9pY29uL1FJY29uLmpzJ1xuXG5pbXBvcnQgdXNlRGFyaywgeyB1c2VEYXJrUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1kYXJrLmpzJ1xuaW1wb3J0IHVzZVNpemUsIHsgdXNlU2l6ZVByb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2Utc2l6ZS5qcydcbmltcG9ydCB1c2VSZWZvY3VzVGFyZ2V0IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLXJlZm9jdXMtdGFyZ2V0LmpzJ1xuaW1wb3J0IHsgdXNlRm9ybVByb3BzLCB1c2VGb3JtSW5qZWN0IH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtZm9ybS5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgb3B0aW9uU2l6ZXMgZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9vcHRpb24tc2l6ZXMuanMnXG5pbXBvcnQgeyBzdG9wQW5kUHJldmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL2V2ZW50LmpzJ1xuaW1wb3J0IHsgaFNsb3QsIGhNZXJnZVNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcblxuY29uc3Qgc3ZnID0gaCgnc3ZnJywge1xuICBrZXk6ICdzdmcnLFxuICBjbGFzczogJ3EtcmFkaW9fX2JnIGFic29sdXRlIG5vbi1zZWxlY3RhYmxlJyxcbiAgdmlld0JveDogJzAgMCAyNCAyNCdcbn0sIFtcbiAgaCgncGF0aCcsIHtcbiAgICBkOiAnTTEyLDIyYTEwLDEwIDAgMCAxIC0xMCwtMTBhMTAsMTAgMCAwIDEgMTAsLTEwYTEwLDEwIDAgMCAxIDEwLDEwYTEwLDEwIDAgMCAxIC0xMCwxMG0wLC0yMmExMiwxMiAwIDAgMCAtMTIsMTJhMTIsMTIgMCAwIDAgMTIsMTJhMTIsMTIgMCAwIDAgMTIsLTEyYTEyLDEyIDAgMCAwIC0xMiwtMTInXG4gIH0pLFxuXG4gIGgoJ3BhdGgnLCB7XG4gICAgY2xhc3M6ICdxLXJhZGlvX19jaGVjaycsXG4gICAgZDogJ00xMiw2YTYsNiAwIDAgMCAtNiw2YTYsNiAwIDAgMCA2LDZhNiw2IDAgMCAwIDYsLTZhNiw2IDAgMCAwIC02LC02J1xuICB9KVxuXSlcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FSYWRpbycsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VEYXJrUHJvcHMsXG4gICAgLi4udXNlU2l6ZVByb3BzLFxuICAgIC4uLnVzZUZvcm1Qcm9wcyxcblxuICAgIG1vZGVsVmFsdWU6IHsgcmVxdWlyZWQ6IHRydWUgfSxcbiAgICB2YWw6IHsgcmVxdWlyZWQ6IHRydWUgfSxcblxuICAgIGxhYmVsOiBTdHJpbmcsXG4gICAgbGVmdExhYmVsOiBCb29sZWFuLFxuXG4gICAgY2hlY2tlZEljb246IFN0cmluZyxcbiAgICB1bmNoZWNrZWRJY29uOiBTdHJpbmcsXG5cbiAgICBjb2xvcjogU3RyaW5nLFxuICAgIGtlZXBDb2xvcjogQm9vbGVhbixcbiAgICBkZW5zZTogQm9vbGVhbixcblxuICAgIGRpc2FibGU6IEJvb2xlYW4sXG4gICAgdGFiaW5kZXg6IFsgU3RyaW5nLCBOdW1iZXIgXVxuICB9LFxuXG4gIGVtaXRzOiBbICd1cGRhdGU6bW9kZWxWYWx1ZScgXSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMsIGVtaXQgfSkge1xuICAgIGNvbnN0IHsgcHJveHkgfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG5cbiAgICBjb25zdCBpc0RhcmsgPSB1c2VEYXJrKHByb3BzLCBwcm94eS4kcSlcbiAgICBjb25zdCBzaXplU3R5bGUgPSB1c2VTaXplKHByb3BzLCBvcHRpb25TaXplcylcblxuICAgIGNvbnN0IHJvb3RSZWYgPSByZWYobnVsbClcbiAgICBjb25zdCB7IHJlZm9jdXNUYXJnZXRFbCwgcmVmb2N1c1RhcmdldCB9ID0gdXNlUmVmb2N1c1RhcmdldChwcm9wcywgcm9vdFJlZilcblxuICAgIGNvbnN0IGlzVHJ1ZSA9IGNvbXB1dGVkKCgpID0+IHRvUmF3KHByb3BzLm1vZGVsVmFsdWUpID09PSB0b1Jhdyhwcm9wcy52YWwpKVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAncS1yYWRpbyBjdXJzb3ItcG9pbnRlciBuby1vdXRsaW5lIHJvdyBpbmxpbmUgbm8td3JhcCBpdGVtcy1jZW50ZXInXG4gICAgICArIChwcm9wcy5kaXNhYmxlID09PSB0cnVlID8gJyBkaXNhYmxlZCcgOiAnJylcbiAgICAgICsgKGlzRGFyay52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1yYWRpby0tZGFyaycgOiAnJylcbiAgICAgICsgKHByb3BzLmRlbnNlID09PSB0cnVlID8gJyBxLXJhZGlvLS1kZW5zZScgOiAnJylcbiAgICAgICsgKHByb3BzLmxlZnRMYWJlbCA9PT0gdHJ1ZSA/ICcgcmV2ZXJzZScgOiAnJylcbiAgICApXG5cbiAgICBjb25zdCBpbm5lckNsYXNzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3QgY29sb3IgPSBwcm9wcy5jb2xvciAhPT0gdm9pZCAwICYmIChcbiAgICAgICAgcHJvcHMua2VlcENvbG9yID09PSB0cnVlXG4gICAgICAgIHx8IGlzVHJ1ZS52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgKVxuICAgICAgICA/IGAgdGV4dC0keyBwcm9wcy5jb2xvciB9YFxuICAgICAgICA6ICcnXG5cbiAgICAgIHJldHVybiAncS1yYWRpb19faW5uZXIgcmVsYXRpdmUtcG9zaXRpb24gJ1xuICAgICAgICArIGBxLXJhZGlvX19pbm5lci0tJHsgaXNUcnVlLnZhbHVlID09PSB0cnVlID8gJ3RydXRoeScgOiAnZmFsc3knIH0keyBjb2xvciB9YFxuICAgIH0pXG5cbiAgICBjb25zdCBpY29uID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIChpc1RydWUudmFsdWUgPT09IHRydWVcbiAgICAgICAgPyBwcm9wcy5jaGVja2VkSWNvblxuICAgICAgICA6IHByb3BzLnVuY2hlY2tlZEljb25cbiAgICAgICkgfHwgbnVsbFxuICAgIClcblxuICAgIGNvbnN0IHRhYmluZGV4ID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgcHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZSA/IC0xIDogcHJvcHMudGFiaW5kZXggfHwgMFxuICAgICkpXG5cbiAgICBjb25zdCBmb3JtQXR0cnMgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCBwcm9wID0geyB0eXBlOiAncmFkaW8nIH1cblxuICAgICAgcHJvcHMubmFtZSAhPT0gdm9pZCAwICYmIE9iamVjdC5hc3NpZ24ocHJvcCwge1xuICAgICAgICAvLyBzZWUgaHR0cHM6Ly92dWVqcy5vcmcvZ3VpZGUvZXh0cmFzL3JlbmRlci1mdW5jdGlvbi5odG1sI2NyZWF0aW5nLXZub2RlcyAoLnByb3ApXG4gICAgICAgICcuY2hlY2tlZCc6IGlzVHJ1ZS52YWx1ZSA9PT0gdHJ1ZSxcbiAgICAgICAgJ15jaGVja2VkJzogaXNUcnVlLnZhbHVlID09PSB0cnVlID8gJ2NoZWNrZWQnIDogdm9pZCAwLFxuICAgICAgICBuYW1lOiBwcm9wcy5uYW1lLFxuICAgICAgICB2YWx1ZTogcHJvcHMudmFsXG4gICAgICB9KVxuXG4gICAgICByZXR1cm4gcHJvcFxuICAgIH0pXG5cbiAgICBjb25zdCBpbmplY3RGb3JtSW5wdXQgPSB1c2VGb3JtSW5qZWN0KGZvcm1BdHRycylcblxuICAgIGZ1bmN0aW9uIG9uQ2xpY2sgKGUpIHtcbiAgICAgIGlmIChlICE9PSB2b2lkIDApIHtcbiAgICAgICAgc3RvcEFuZFByZXZlbnQoZSlcbiAgICAgICAgcmVmb2N1c1RhcmdldChlKVxuICAgICAgfVxuXG4gICAgICBpZiAocHJvcHMuZGlzYWJsZSAhPT0gdHJ1ZSAmJiBpc1RydWUudmFsdWUgIT09IHRydWUpIHtcbiAgICAgICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCBwcm9wcy52YWwsIGUpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25LZXlkb3duIChlKSB7XG4gICAgICBpZiAoZS5rZXlDb2RlID09PSAxMyB8fCBlLmtleUNvZGUgPT09IDMyKSB7XG4gICAgICAgIHN0b3BBbmRQcmV2ZW50KGUpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25LZXl1cCAoZSkge1xuICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMTMgfHwgZS5rZXlDb2RlID09PSAzMikge1xuICAgICAgICBvbkNsaWNrKGUpXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gZXhwb3NlIHB1YmxpYyBtZXRob2RzXG4gICAgT2JqZWN0LmFzc2lnbihwcm94eSwgeyBzZXQ6IG9uQ2xpY2sgfSlcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjb25zdCBjb250ZW50ID0gaWNvbi52YWx1ZSAhPT0gbnVsbFxuICAgICAgICA/IFtcbiAgICAgICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICAgICAga2V5OiAnaWNvbicsXG4gICAgICAgICAgICAgIGNsYXNzOiAncS1yYWRpb19faWNvbi1jb250YWluZXIgYWJzb2x1dGUtZnVsbCBmbGV4IGZsZXgtY2VudGVyIG5vLXdyYXAnXG4gICAgICAgICAgICB9LCBbXG4gICAgICAgICAgICAgIGgoUUljb24sIHtcbiAgICAgICAgICAgICAgICBjbGFzczogJ3EtcmFkaW9fX2ljb24nLFxuICAgICAgICAgICAgICAgIG5hbWU6IGljb24udmFsdWVcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF0pXG4gICAgICAgICAgXVxuICAgICAgICA6IFsgc3ZnIF1cblxuICAgICAgcHJvcHMuZGlzYWJsZSAhPT0gdHJ1ZSAmJiBpbmplY3RGb3JtSW5wdXQoXG4gICAgICAgIGNvbnRlbnQsXG4gICAgICAgICd1bnNoaWZ0JyxcbiAgICAgICAgJyBxLXJhZGlvX19uYXRpdmUgcS1tYS1ub25lIHEtcGEtbm9uZSdcbiAgICAgIClcblxuICAgICAgY29uc3QgY2hpbGQgPSBbXG4gICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICBjbGFzczogaW5uZXJDbGFzcy52YWx1ZSxcbiAgICAgICAgICBzdHlsZTogc2l6ZVN0eWxlLnZhbHVlLFxuICAgICAgICAgICdhcmlhLWhpZGRlbic6ICd0cnVlJ1xuICAgICAgICB9LCBjb250ZW50KVxuICAgICAgXVxuXG4gICAgICBpZiAocmVmb2N1c1RhcmdldEVsLnZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgIGNoaWxkLnB1c2gocmVmb2N1c1RhcmdldEVsLnZhbHVlKVxuICAgICAgfVxuXG4gICAgICBjb25zdCBsYWJlbCA9IHByb3BzLmxhYmVsICE9PSB2b2lkIDBcbiAgICAgICAgPyBoTWVyZ2VTbG90KHNsb3RzLmRlZmF1bHQsIFsgcHJvcHMubGFiZWwgXSlcbiAgICAgICAgOiBoU2xvdChzbG90cy5kZWZhdWx0KVxuXG4gICAgICBsYWJlbCAhPT0gdm9pZCAwICYmIGNoaWxkLnB1c2goXG4gICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICBjbGFzczogJ3EtcmFkaW9fX2xhYmVsIHEtYW5jaG9yLS1za2lwJ1xuICAgICAgICB9LCBsYWJlbClcbiAgICAgIClcblxuICAgICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgICAgcmVmOiByb290UmVmLFxuICAgICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZSxcbiAgICAgICAgdGFiaW5kZXg6IHRhYmluZGV4LnZhbHVlLFxuICAgICAgICByb2xlOiAncmFkaW8nLFxuICAgICAgICAnYXJpYS1sYWJlbCc6IHByb3BzLmxhYmVsLFxuICAgICAgICAnYXJpYS1jaGVja2VkJzogaXNUcnVlLnZhbHVlID09PSB0cnVlID8gJ3RydWUnIDogJ2ZhbHNlJyxcbiAgICAgICAgJ2FyaWEtZGlzYWJsZWQnOiBwcm9wcy5kaXNhYmxlID09PSB0cnVlID8gJ3RydWUnIDogdm9pZCAwLFxuICAgICAgICBvbkNsaWNrLFxuICAgICAgICBvbktleWRvd24sXG4gICAgICAgIG9uS2V5dXBcbiAgICAgIH0sIGNoaWxkKVxuICAgIH1cbiAgfVxufSlcbiIsImltcG9ydCB7IGgsIGNvbXB1dGVkLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCBRUmFkaW8gZnJvbSAnLi4vcmFkaW8vUVJhZGlvLmpzJ1xuaW1wb3J0IFFDaGVja2JveCBmcm9tICcuLi9jaGVja2JveC9RQ2hlY2tib3guanMnXG5pbXBvcnQgUVRvZ2dsZSBmcm9tICcuLi90b2dnbGUvUVRvZ2dsZS5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5cbmltcG9ydCB1c2VEYXJrLCB7IHVzZURhcmtQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWRhcmsuanMnXG5cbmNvbnN0IGNvbXBvbmVudHMgPSB7XG4gIHJhZGlvOiBRUmFkaW8sXG4gIGNoZWNrYm94OiBRQ2hlY2tib3gsXG4gIHRvZ2dsZTogUVRvZ2dsZVxufVxuXG5jb25zdCB0eXBlVmFsdWVzID0gT2JqZWN0LmtleXMoY29tcG9uZW50cylcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FPcHRpb25Hcm91cCcsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VEYXJrUHJvcHMsXG5cbiAgICBtb2RlbFZhbHVlOiB7XG4gICAgICByZXF1aXJlZDogdHJ1ZVxuICAgIH0sXG4gICAgb3B0aW9uczoge1xuICAgICAgdHlwZTogQXJyYXksXG4gICAgICB2YWxpZGF0b3I6IG9wdHMgPT4gb3B0cy5ldmVyeShvcHQgPT4gJ3ZhbHVlJyBpbiBvcHQgJiYgJ2xhYmVsJyBpbiBvcHQpXG4gICAgfSxcblxuICAgIG5hbWU6IFN0cmluZyxcblxuICAgIHR5cGU6IHtcbiAgICAgIGRlZmF1bHQ6ICdyYWRpbycsXG4gICAgICB2YWxpZGF0b3I6IHYgPT4gdHlwZVZhbHVlcy5pbmNsdWRlcyh2KVxuICAgIH0sXG5cbiAgICBjb2xvcjogU3RyaW5nLFxuICAgIGtlZXBDb2xvcjogQm9vbGVhbixcbiAgICBkZW5zZTogQm9vbGVhbixcblxuICAgIHNpemU6IFN0cmluZyxcblxuICAgIGxlZnRMYWJlbDogQm9vbGVhbixcbiAgICBpbmxpbmU6IEJvb2xlYW4sXG4gICAgZGlzYWJsZTogQm9vbGVhblxuICB9LFxuXG4gIGVtaXRzOiBbICd1cGRhdGU6bW9kZWxWYWx1ZScgXSxcblxuICBzZXR1cCAocHJvcHMsIHsgZW1pdCwgc2xvdHMgfSkge1xuICAgIGNvbnN0IHsgcHJveHk6IHsgJHEgfSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICAgIGNvbnN0IGFycmF5TW9kZWwgPSBBcnJheS5pc0FycmF5KHByb3BzLm1vZGVsVmFsdWUpXG5cbiAgICBpZiAocHJvcHMudHlwZSA9PT0gJ3JhZGlvJykge1xuICAgICAgaWYgKGFycmF5TW9kZWwgPT09IHRydWUpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcigncS1vcHRpb24tZ3JvdXA6IG1vZGVsIHNob3VsZCBub3QgYmUgYXJyYXknKVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChhcnJheU1vZGVsID09PSBmYWxzZSkge1xuICAgICAgY29uc29sZS5lcnJvcigncS1vcHRpb24tZ3JvdXA6IG1vZGVsIHNob3VsZCBiZSBhcnJheSBpbiB5b3VyIGNhc2UnKVxuICAgIH1cblxuICAgIGNvbnN0IGlzRGFyayA9IHVzZURhcmsocHJvcHMsICRxKVxuXG4gICAgY29uc3QgY29tcG9uZW50ID0gY29tcHV0ZWQoKCkgPT4gY29tcG9uZW50c1sgcHJvcHMudHlwZSBdKVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAncS1vcHRpb24tZ3JvdXAgcS1ndXR0ZXIteC1zbSdcbiAgICAgICsgKHByb3BzLmlubGluZSA9PT0gdHJ1ZSA/ICcgcS1vcHRpb24tZ3JvdXAtLWlubGluZScgOiAnJylcbiAgICApXG5cbiAgICBjb25zdCBhdHRycyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IGF0dHJzID0geyByb2xlOiAnZ3JvdXAnIH1cblxuICAgICAgaWYgKHByb3BzLnR5cGUgPT09ICdyYWRpbycpIHtcbiAgICAgICAgYXR0cnMucm9sZSA9ICdyYWRpb2dyb3VwJ1xuXG4gICAgICAgIGlmIChwcm9wcy5kaXNhYmxlID09PSB0cnVlKSB7XG4gICAgICAgICAgYXR0cnNbICdhcmlhLWRpc2FibGVkJyBdID0gJ3RydWUnXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGF0dHJzXG4gICAgfSlcblxuICAgIGZ1bmN0aW9uIG9uVXBkYXRlTW9kZWxWYWx1ZSAodmFsdWUpIHtcbiAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgdmFsdWUpXG4gICAgfVxuXG4gICAgcmV0dXJuICgpID0+IGgoJ2RpdicsIHtcbiAgICAgIGNsYXNzOiBjbGFzc2VzLnZhbHVlLFxuICAgICAgLi4uYXR0cnMudmFsdWVcbiAgICB9LCBwcm9wcy5vcHRpb25zLm1hcCgob3B0LCBpKSA9PiB7XG4gICAgICAvLyBUT0RPOiAoUXYzKSBNYWtlIHRoZSAnb3B0JyBhIHNlcGFyYXRlIHByb3BlcnR5IGluc3RlYWQgb2ZcbiAgICAgIC8vIHRoZSB3aG9sZSBzY29wZSBmb3IgY29uc2lzdGVuY3kgYW5kIGZsZXhpYmlsaXR5XG4gICAgICAvLyAoZS5nLiB7IG9wdCB9IGluc3RlYWQgb2Ygb3B0KVxuICAgICAgY29uc3QgY2hpbGQgPSBzbG90c1sgJ2xhYmVsLScgKyBpIF0gIT09IHZvaWQgMFxuICAgICAgICA/ICgpID0+IHNsb3RzWyAnbGFiZWwtJyArIGkgXShvcHQpXG4gICAgICAgIDogKFxuICAgICAgICAgICAgc2xvdHMubGFiZWwgIT09IHZvaWQgMFxuICAgICAgICAgICAgICA/ICgpID0+IHNsb3RzLmxhYmVsKG9wdClcbiAgICAgICAgICAgICAgOiB2b2lkIDBcbiAgICAgICAgICApXG5cbiAgICAgIHJldHVybiBoKCdkaXYnLCBbXG4gICAgICAgIGgoY29tcG9uZW50LnZhbHVlLCB7XG4gICAgICAgICAgbW9kZWxWYWx1ZTogcHJvcHMubW9kZWxWYWx1ZSxcbiAgICAgICAgICB2YWw6IG9wdC52YWx1ZSxcbiAgICAgICAgICBuYW1lOiBvcHQubmFtZSA9PT0gdm9pZCAwID8gcHJvcHMubmFtZSA6IG9wdC5uYW1lLFxuICAgICAgICAgIGRpc2FibGU6IHByb3BzLmRpc2FibGUgfHwgb3B0LmRpc2FibGUsXG4gICAgICAgICAgbGFiZWw6IGNoaWxkID09PSB2b2lkIDAgPyBvcHQubGFiZWwgOiBudWxsLFxuICAgICAgICAgIGxlZnRMYWJlbDogb3B0LmxlZnRMYWJlbCA9PT0gdm9pZCAwID8gcHJvcHMubGVmdExhYmVsIDogb3B0LmxlZnRMYWJlbCxcbiAgICAgICAgICBjb2xvcjogb3B0LmNvbG9yID09PSB2b2lkIDAgPyBwcm9wcy5jb2xvciA6IG9wdC5jb2xvcixcbiAgICAgICAgICBjaGVja2VkSWNvbjogb3B0LmNoZWNrZWRJY29uLFxuICAgICAgICAgIHVuY2hlY2tlZEljb246IG9wdC51bmNoZWNrZWRJY29uLFxuICAgICAgICAgIGRhcms6IG9wdC5kYXJrIHx8IGlzRGFyay52YWx1ZSxcbiAgICAgICAgICBzaXplOiBvcHQuc2l6ZSA9PT0gdm9pZCAwID8gcHJvcHMuc2l6ZSA6IG9wdC5zaXplLFxuICAgICAgICAgIGRlbnNlOiBwcm9wcy5kZW5zZSxcbiAgICAgICAgICBrZWVwQ29sb3I6IG9wdC5rZWVwQ29sb3IgPT09IHZvaWQgMCA/IHByb3BzLmtlZXBDb2xvciA6IG9wdC5rZWVwQ29sb3IsXG4gICAgICAgICAgJ29uVXBkYXRlOm1vZGVsVmFsdWUnOiBvblVwZGF0ZU1vZGVsVmFsdWVcbiAgICAgICAgfSwgY2hpbGQpXG4gICAgICBdKVxuICAgIH0pKVxuICB9XG59KVxuIiwiPHRlbXBsYXRlPlxyXG4gIDxxLXNsaWRlLWl0ZW0gQGxlZnQ9XCJzaG93RWRpdFByb2R1Y3REaWFsb2dcIiBAcmlnaHQ9XCJzaG93RGVsZXRlUHJvZHVjdERpYWxvZ1wiPlxyXG4gICAgPHRlbXBsYXRlIHYtc2xvdDpsZWZ0PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwicm93IGl0ZW1zLWNlbnRlclwiPjxxLWljb24gbGVmdCBuYW1lPVwiZWRpdFwiIC8+IEVkaXQ8L2Rpdj5cclxuICAgIDwvdGVtcGxhdGU+XHJcbiAgICA8dGVtcGxhdGUgdi1zbG90OnJpZ2h0PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwicm93IGl0ZW1zLWNlbnRlclwiPkRlbGV0ZSA8cS1pY29uIHJpZ2h0IG5hbWU9XCJkZWxldGVcIiAvPjwvZGl2PlxyXG4gICAgPC90ZW1wbGF0ZT5cclxuXHJcbiAgICA8cS1pdGVtPlxyXG4gICAgICA8cS1pdGVtLXNlY3Rpb24+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInByb2R1Y3RcIj5cclxuICAgICAgICAgIHt7IHByb2R1Y3RJbmZvLmJyYW5kIH19IHt7IHByb2R1Y3RJbmZvLm5hbWUgfX1cclxuICAgICAgICAgIHt7IHByb2R1Y3RJbmZvLndlaWdodCB9fVxyXG4gICAgICAgICAgPHN0cm9uZz57eyBwcm9kdWN0SW5mby5wcmljZSB9fSBsZWk8L3N0cm9uZz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cclxuICAgIDwvcS1pdGVtPlxyXG4gIDwvcS1zbGlkZS1pdGVtPlxyXG5cclxuICA8cS1kaWFsb2cgbWF4aW1pemVkIHYtbW9kZWw9XCJzaG93RWRpdFByb2R1Y3RcIj5cclxuICAgIDxxLWNhcmQ+XHJcbiAgICAgIDxxLWNhcmQtc2VjdGlvbiBjbGFzcz1cInJvdyBpdGVtcy1jZW50ZXIgcS1wYi1ub25lXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDZcIj5FZGl0IFByb2R1Y3Q8L2Rpdj5cclxuICAgICAgICA8cS1zcGFjZSAvPlxyXG4gICAgICAgIDxxLWJ0biBpY29uPVwiY2xvc2VcIiBmbGF0IHJvdW5kIGRlbnNlIHYtY2xvc2UtcG9wdXAgLz5cclxuICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cclxuXHJcbiAgICAgIDxxLWNhcmQtc2VjdGlvbj5cclxuICAgICAgICA8cS1pbnB1dCB2LW1vZGVsPVwibmFtZVwiIHR5cGU9XCJ0ZXh0XCIgbGFiZWw9XCJOYW1lXCIgLz5cclxuICAgICAgICA8cS1pbnB1dCB2LW1vZGVsPVwiY2F0ZWdvcnlcIiB0eXBlPVwidGV4dFwiIGxhYmVsPVwiQ2F0ZWdvcnlcIiAvPlxyXG4gICAgICAgIDxxLWlucHV0IHYtbW9kZWw9XCJicmFuZFwiIHR5cGU9XCJ0ZXh0XCIgbGFiZWw9XCJCcmFuZFwiIC8+XHJcbiAgICAgICAgPHEtaW5wdXQgdi1tb2RlbD1cIndlaWdodFwiIHR5cGU9XCJ0ZXh0XCIgbGFiZWw9XCJXZWlnaHRcIiAvPlxyXG4gICAgICAgIDxxLWlucHV0IHYtbW9kZWw9XCJwcmljZVwiIHR5cGU9XCJudW1iZXJcIiBsYWJlbD1cIlByaWNlXCIgLz5cclxuICAgICAgICA8cS1idG4gY29sb3I9XCJzZWNvbmRhcnlcIiBAY2xpY2s9XCJzYXZlUHJvZHVjdFwiPlNhdmUgUHJvZHVjdDwvcS1idG4+XHJcbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XHJcbiAgICA8L3EtY2FyZD5cclxuICA8L3EtZGlhbG9nPlxyXG5cclxuICA8cS1kaWFsb2cgdi1tb2RlbD1cInNob3dEZWxldGVQcm9kdWN0XCIgcGVyc2lzdGVudD5cclxuICAgIDxxLWNhcmQ+XHJcbiAgICAgIDxxLWNhcmQtc2VjdGlvbiBjbGFzcz1cInJvdyBpdGVtcy1jZW50ZXJcIj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cInEtbWwtc21cIlxyXG4gICAgICAgICAgPkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUge3sgcHJvZHVjdEluZm8ubmFtZSB9fT88L3NwYW5cclxuICAgICAgICA+XHJcbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XHJcblxyXG4gICAgICA8cS1jYXJkLWFjdGlvbnMgYWxpZ249XCJyaWdodFwiPlxyXG4gICAgICAgIDxxLWJ0biBmbGF0IGxhYmVsPVwiQ2FuY2VsXCIgY29sb3I9XCJwcmltYXJ5XCIgdi1jbG9zZS1wb3B1cCAvPlxyXG4gICAgICAgIDxxLWJ0biBmbGF0IGxhYmVsPVwiRGVsZXRlXCIgY29sb3I9XCJyZWRcIiBAY2xpY2s9XCJkZWxldGVQcm9kdWN0XCIgLz5cclxuICAgICAgPC9xLWNhcmQtYWN0aW9ucz5cclxuICAgIDwvcS1jYXJkPlxyXG4gIDwvcS1kaWFsb2c+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgbmFtZTogXCJQcm9kdWN0Q2FyZFwiLFxyXG4gIHByb3BzOiBbXCJwcm9kdWN0SW5mb1wiXSxcclxuICBlbWl0czogW1wiZWRpdFByb2R1Y3RTdWNjZXNzXCIsIFwiZGVsZXRlUHJvZHVjdFN1Y2Nlc3NcIl0sXHJcbiAgZGF0YSgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHNob3dFZGl0UHJvZHVjdDogZmFsc2UsXHJcbiAgICAgIHNob3dEZWxldGVQcm9kdWN0OiBmYWxzZSxcclxuICAgICAgbmFtZTogdGhpcy5wcm9kdWN0SW5mby5uYW1lLFxyXG4gICAgICBjYXRlZ29yeTogdGhpcy5wcm9kdWN0SW5mby5jYXRlZ29yeS5uYW1lLFxyXG4gICAgICBicmFuZDogdGhpcy5wcm9kdWN0SW5mby5icmFuZCxcclxuICAgICAgd2VpZ2h0OiB0aGlzLnByb2R1Y3RJbmZvLndlaWdodCxcclxuICAgICAgcHJpY2U6IHRoaXMucHJvZHVjdEluZm8ucHJpY2UsXHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgYmVmb3JlVW5tb3VudCgpIHtcclxuICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVyKTtcclxuICB9LFxyXG4gIG1ldGhvZHM6IHtcclxuICAgIGZpbmFsaXplKHJlc2V0KSB7XHJcbiAgICAgIHRoaXMudGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICByZXNldCgpO1xyXG4gICAgICB9LCAxMDAwKTtcclxuICAgIH0sXHJcbiAgICBzaG93RWRpdFByb2R1Y3REaWFsb2coeyByZXNldCB9KSB7XHJcbiAgICAgIHRoaXMuc2hvd0VkaXRQcm9kdWN0ID0gdHJ1ZTtcclxuICAgICAgdGhpcy5maW5hbGl6ZShyZXNldCk7XHJcbiAgICB9LFxyXG4gICAgc2hvd0RlbGV0ZVByb2R1Y3REaWFsb2coeyByZXNldCB9KSB7XHJcbiAgICAgIHRoaXMuc2hvd0RlbGV0ZVByb2R1Y3QgPSB0cnVlO1xyXG4gICAgICB0aGlzLmZpbmFsaXplKHJlc2V0KTtcclxuICAgIH0sXHJcbiAgICBhc3luYyBzYXZlUHJvZHVjdCgpIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBkYXRhID0ge1xyXG4gICAgICAgICAgbmFtZTogdGhpcy5uYW1lLFxyXG4gICAgICAgICAgY2F0ZWdvcnk6IHRoaXMuY2F0ZWdvcnksXHJcbiAgICAgICAgICBicmFuZDogdGhpcy5icmFuZCxcclxuICAgICAgICAgIHdlaWdodDogdGhpcy53ZWlnaHQsXHJcbiAgICAgICAgICBwcmljZTogdGhpcy5wcmljZSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuJGFwaS5wYXRjaChcclxuICAgICAgICAgIGAvcHJvZHVjdHMvJHt0aGlzLnByb2R1Y3RJbmZvLl9pZH1gLFxyXG4gICAgICAgICAgZGF0YVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgaWYgKHJlcy5kYXRhLnN0YXR1cyA9PT0gXCJzdWNjZXNzXCIpIHtcclxuICAgICAgICAgIHRoaXMuJGVtaXQoXCJlZGl0UHJvZHVjdFN1Y2Nlc3NcIik7XHJcbiAgICAgICAgICB0aGlzLnNob3dFZGl0UHJvZHVjdCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGFzeW5jIGRlbGV0ZVByb2R1Y3QoKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy4kYXBpLmRlbGV0ZShcclxuICAgICAgICAgIGAvcHJvZHVjdHMvJHt0aGlzLnByb2R1Y3RJbmZvLl9pZH0vJHt0aGlzLiRyb3V0ZS5wYXJhbXMubG9jYXRpb25JZH1gXHJcbiAgICAgICAgKTtcclxuICAgICAgICBpZiAocmVzLmRhdGEuc3RhdHVzID09PSBcInN1Y2Nlc3NcIikge1xyXG4gICAgICAgICAgdGhpcy4kZW1pdChcImRlbGV0ZVByb2R1Y3RTdWNjZXNzXCIpO1xyXG4gICAgICAgICAgdGhpcy5zaG93RGVsZXRlUHJvZHVjdCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICB9LFxyXG59O1xyXG48L3NjcmlwdD5cclxuXHJcbjxzdHlsZSBzY29wZWQ+XHJcbi5wcm9kdWN0IHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxufVxyXG48L3N0eWxlPlxyXG4iLCI8dGVtcGxhdGU+XHJcbiAgPHEtc2VwYXJhdG9yPjwvcS1zZXBhcmF0b3I+XHJcbiAgPGRpdj5cclxuICAgIDxxLWljb24gbmFtZT1cImFycm93X2JhY2tfaW9zXCIgQGNsaWNrPVwiJGVtaXQoJ2dvQmFja1RvQ2F0ZWdvcmllcycpXCI+PC9xLWljb24+XHJcbiAgICA8c3Ryb25nPnt7IGNhdGVnb3J5SW5mby5uYW1lIH19PC9zdHJvbmc+XHJcbiAgPC9kaXY+XHJcbiAgPGRpdiB2LWlmPVwicHJvZHVjdHNJbkNhdGVnb3J5ICYmICFwcm9kdWN0c0luQ2F0ZWdvcnkubGVuZ3RoXCI+XHJcbiAgICBObyBwcm9kdWN0cyBpbiB0aGlzIGNhdGVnb3J5LlxyXG4gIDwvZGl2PlxyXG4gIDxkaXYgdi1pZj1cInByb2R1Y3RzSW5DYXRlZ29yeSAmJiBwcm9kdWN0c0luQ2F0ZWdvcnkubGVuZ3RoXCI+XHJcbiAgICA8UHJvZHVjdENhcmRcclxuICAgICAgdi1mb3I9XCJwcm9kdWN0IGluIHByb2R1Y3RzSW5DYXRlZ29yeVwiXHJcbiAgICAgIDprZXk9XCJwcm9kdWN0Ll9pZFwiXHJcbiAgICAgIDpwcm9kdWN0SW5mbz1cInByb2R1Y3RcIlxyXG4gICAgICBAZGVsZXRlUHJvZHVjdFN1Y2Nlc3M9XCJmZXRjaFByb2R1Y3RzSW5PbmVDYXRlZ29yeVwiXHJcbiAgICAgIEBlZGl0UHJvZHVjdFN1Y2Nlc3M9XCJmZXRjaFByb2R1Y3RzSW5PbmVDYXRlZ29yeVwiXHJcbiAgICAvPlxyXG4gIDwvZGl2PlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuaW1wb3J0IFByb2R1Y3RDYXJkIGZyb20gXCJzcmMvY29tcG9uZW50cy9hZG1pbmlzdHJhdGlvbi9Qcm9kdWN0Q2FyZC52dWVcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBuYW1lOiBcIlByb2R1Y3RzSW5DYXRlZ29yeVwiLFxyXG4gIGNvbXBvbmVudHM6IHtcclxuICAgIFByb2R1Y3RDYXJkLFxyXG4gIH0sXHJcbiAgcHJvcHM6IFtcImNhdGVnb3J5SW5mb1wiXSxcclxuICBlbWl0czogW1wiZ29CYWNrVG9DYXRlZ29yaWVzXCJdLFxyXG4gIGRhdGEoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBwcm9kdWN0c0luQ2F0ZWdvcnk6IG51bGwsXHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgYXN5bmMgbW91bnRlZCgpIHtcclxuICAgIGF3YWl0IHRoaXMuZmV0Y2hQcm9kdWN0c0luT25lQ2F0ZWdvcnkoKTtcclxuICB9LFxyXG4gIG1ldGhvZHM6IHtcclxuICAgIGFzeW5jIGZldGNoUHJvZHVjdHNJbk9uZUNhdGVnb3J5KCkge1xyXG4gICAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLiRhcGkuZ2V0KFxyXG4gICAgICAgIGAvY2F0ZWdvcmllcy8ke3RoaXMuJHJvdXRlLnBhcmFtcy5sb2NhdGlvbklkfS8ke3RoaXMuY2F0ZWdvcnlJbmZvLl9pZH1gXHJcbiAgICAgICk7XHJcbiAgICAgIHRoaXMucHJvZHVjdHNJbkNhdGVnb3J5ID0gcmVzLmRhdGEuZGF0YS5wcm9kdWN0c0luQ2F0ZWdvcnlJbkxvY2F0aW9uO1xyXG4gICAgfSxcclxuICB9LFxyXG59O1xyXG48L3NjcmlwdD5cclxuXHJcbjxzdHlsZSBzY29wZWQ+PC9zdHlsZT5cclxuIiwiPHRlbXBsYXRlPlxyXG4gIDxkaXYgdi1pZj1cImxvY2F0aW9uXCI+XHJcbiAgICA8aDUgdi1pZj1cImxvY2F0aW9uXCI+e3sgbG9jYXRpb24ubmFtZSB9fTwvaDU+XHJcbiAgICA8cS1idG4gY2xhc3M9XCJhZGQtcHJvZHVjdF9fYnRuXCIgQGNsaWNrPVwic2hvd0FkZFByb2R1Y3QgPSB0cnVlXCJcclxuICAgICAgPkFkZCBQcm9kdWN0PC9xLWJ0blxyXG4gICAgPlxyXG4gICAgPGRpdiB2LWlmPVwiIWNhdGVnb3J5SW5mb1wiPlxyXG4gICAgICA8IS0tIDxDYXRlZ29yeUNhcmRBZG1pblxyXG4gICAgICAgIHYtZm9yPVwiY2F0ZWdvcnkgaW4gY2F0ZWdvcnlPcHRpb25zXCJcclxuICAgICAgICA6a2V5PVwiY2F0ZWdvcnkudmFsdWVcIlxyXG4gICAgICAgIDpjYXRlZ29yeUluZm89XCJjYXRlZ29yeVwiXHJcbiAgICAgIC8+IC0tPlxyXG4gICAgICA8cS1pdGVtXHJcbiAgICAgICAgY2xpY2thYmxlXHJcbiAgICAgICAgdi1yaXBwbGVcclxuICAgICAgICB2LWZvcj1cImNhdGVnb3J5IGluIGNhdGVnb3JpZXNcIlxyXG4gICAgICAgIDprZXk9XCJjYXRlZ29yeS5faWRcIlxyXG4gICAgICA+XHJcbiAgICAgICAgPHEtaXRlbS1zZWN0aW9uIHRodW1ibmFpbCBzdHlsZT1cInBhZGRpbmctbGVmdDogMTBweFwiPlxyXG4gICAgICAgICAgPHEtaWNvbiA6bmFtZT1cImNhdGVnb3J5Lmljb25cIiAvPlxyXG4gICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XHJcbiAgICAgICAgPHEtaXRlbS1zZWN0aW9uIEBjbGljaz1cInZpZXdQcm9kdWN0c0luQ2F0ZWdvcnkoY2F0ZWdvcnkpXCI+e3tcclxuICAgICAgICAgIGNhdGVnb3J5Lm5hbWVcclxuICAgICAgICB9fTwvcS1pdGVtLXNlY3Rpb24+XHJcbiAgICAgIDwvcS1pdGVtPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8UHJvZHVjdHNJbkNhdGVnb3J5XHJcbiAgICAgIHYtaWY9XCJjYXRlZ29yeUluZm9cIlxyXG4gICAgICA6Y2F0ZWdvcnlJbmZvPVwiY2F0ZWdvcnlJbmZvXCJcclxuICAgICAgQGdvQmFja1RvQ2F0ZWdvcmllcz1cImNhdGVnb3J5SW5mbyA9IG51bGxcIlxyXG4gICAgLz5cclxuICAgIDxxLWRpYWxvZyBtYXhpbWl6ZWQgdi1tb2RlbD1cInNob3dBZGRQcm9kdWN0XCI+XHJcbiAgICAgIDxxLWNhcmQ+XHJcbiAgICAgICAgPHEtY2FyZC1zZWN0aW9uIGNsYXNzPVwicm93IGl0ZW1zLWNlbnRlciBxLXBiLW5vbmVcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWg2XCI+QWRkIFByb2R1Y3Q8L2Rpdj5cclxuICAgICAgICAgIDxxLXNwYWNlIC8+XHJcbiAgICAgICAgICA8cS1idG4gaWNvbj1cImNsb3NlXCIgZmxhdCByb3VuZCBkZW5zZSB2LWNsb3NlLXBvcHVwIC8+XHJcbiAgICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cclxuXHJcbiAgICAgICAgPHEtY2FyZC1zZWN0aW9uPlxyXG4gICAgICAgICAgPHEtaW5wdXQgdi1tb2RlbD1cIm5hbWVcIiB0eXBlPVwidGV4dFwiIGxhYmVsPVwiTmFtZVwiIC8+XHJcbiAgICAgICAgICA8cS1zZWxlY3RcclxuICAgICAgICAgICAgdi1tb2RlbD1cImNhdGVnb3J5XCJcclxuICAgICAgICAgICAgOm9wdGlvbnM9XCJzaG93ZWRPcHRpb25zXCJcclxuICAgICAgICAgICAgbGFiZWw9XCJDYXRlZ29yeVwiXHJcbiAgICAgICAgICAgIHVzZS1pbnB1dFxyXG4gICAgICAgICAgICBpbnB1dC1kZWJvdW5jZT1cIjBcIlxyXG4gICAgICAgICAgICBAZmlsdGVyPVwiZmlsdGVyRm5cIlxyXG4gICAgICAgICAgLz5cclxuICAgICAgICAgIDxxLWlucHV0IHYtbW9kZWw9XCJicmFuZFwiIHR5cGU9XCJ0ZXh0XCIgbGFiZWw9XCJCcmFuZFwiIC8+XHJcbiAgICAgICAgICA8cS1pbnB1dCB2LW1vZGVsPVwid2VpZ2h0XCIgdHlwZT1cInRleHRcIiBsYWJlbD1cIldlaWdodFwiIC8+XHJcbiAgICAgICAgICA8cS1pbnB1dCB2LW1vZGVsPVwicHJpY2VcIiB0eXBlPVwibnVtYmVyXCIgbGFiZWw9XCJQcmljZVwiIC8+XHJcblxyXG4gICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgPHEtb3B0aW9uLWdyb3VwXHJcbiAgICAgICAgICAgICAgdi1tb2RlbD1cInNlbGVjdGVkTG9jYXRpb25zXCJcclxuICAgICAgICAgICAgICA6b3B0aW9ucz1cImxvY2F0aW9uT3B0aW9uc1wiXHJcbiAgICAgICAgICAgICAgY29sb3I9XCJncmVlblwiXHJcbiAgICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPHEtYnRuXHJcbiAgICAgICAgICAgIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogIzI2NzM3ODsgY29sb3I6ICNmZmZcIlxyXG4gICAgICAgICAgICBAY2xpY2s9XCJhZGRQcm9kdWN0XCJcclxuICAgICAgICAgICAgbGFiZWw9XCJBZGQgcHJvZHVjdFwiXHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XHJcbiAgICAgIDwvcS1jYXJkPlxyXG4gICAgPC9xLWRpYWxvZz5cclxuICA8L2Rpdj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcbmltcG9ydCB7IHVzZURhc2hIZWFkZXJTdG9yZSB9IGZyb20gXCJzcmMvc3RvcmVzL2Rhc2gtaGVhZGVyXCI7XHJcbmltcG9ydCBQcm9kdWN0c0luQ2F0ZWdvcnkgZnJvbSBcInNyYy9jb21wb25lbnRzL2FkbWluaXN0cmF0aW9uL1Byb2R1Y3RzSW5DYXRlZ29yeS52dWVcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBuYW1lOiBcIlByb2R1Y3RzUGFnZVwiLFxyXG4gIGNvbXBvbmVudHM6IHtcclxuICAgIFByb2R1Y3RzSW5DYXRlZ29yeSxcclxuICB9LFxyXG5cclxuICBhc3luYyBtb3VudGVkKCkge1xyXG4gICAgYXdhaXQgdGhpcy5mZXRjaExvY2F0aW9uKCk7XHJcbiAgICBhd2FpdCB0aGlzLmZldGNoQ2F0ZWdvcmllcygpO1xyXG5cclxuICAgIGNvbnN0IGRhc2hIZWFkZXIgPSB1c2VEYXNoSGVhZGVyU3RvcmUoKTtcclxuICAgIGRhc2hIZWFkZXIuJHBhdGNoKHsgdGl0bGU6IHRoaXMubG9jYXRpb24ubmFtZSwgc2hvd0JhY2tJY29uOiB0cnVlIH0pO1xyXG5cclxuICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuJGFwaS5nZXQoYC9tYXJrZXRzLyR7dGhpcy4kcm91dGUucGFyYW1zLm1hcmtldElkfWApO1xyXG4gICAgdGhpcy5tYXJrZXQgPSByZXMuZGF0YS5kYXRhLm1hcmtldDtcclxuICAgIHRoaXMubWFya2V0LmxvY2F0aW9ucy5tYXAoKGxvYykgPT5cclxuICAgICAgdGhpcy5sb2NhdGlvbk9wdGlvbnMucHVzaCh7IGxhYmVsOiBsb2MubmFtZSwgdmFsdWU6IGxvYy5faWQgfSlcclxuICAgICk7XHJcbiAgICB0aGlzLnNlbGVjdGVkTG9jYXRpb25zLnB1c2godGhpcy4kcm91dGUucGFyYW1zLmxvY2F0aW9uSWQpO1xyXG4gIH0sXHJcbiAgZGF0YSgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5hbWU6IG51bGwsXHJcbiAgICAgIGNhdGVnb3J5OiBudWxsLFxyXG4gICAgICBicmFuZDogbnVsbCxcclxuICAgICAgd2VpZ2h0OiBudWxsLFxyXG4gICAgICBwcmljZTogbnVsbCxcclxuICAgICAgc2hvd0FkZFByb2R1Y3Q6IGZhbHNlLFxyXG4gICAgICBtYXJrZXQ6IG51bGwsXHJcbiAgICAgIHNlbGVjdGVkTG9jYXRpb25zOiBbXSxcclxuICAgICAgbG9jYXRpb25PcHRpb25zOiBbXSxcclxuICAgICAgbG9jYXRpb246IG51bGwsXHJcbiAgICAgIGNhdGVnb3J5T3B0aW9uczogW10sXHJcbiAgICAgIHNob3dlZE9wdGlvbnM6IFtdLFxyXG4gICAgICBjYXRlZ29yaWVzOiBbXSxcclxuICAgICAgY2F0ZWdvcnlJbmZvOiBudWxsLFxyXG4gICAgfTtcclxuICB9LFxyXG4gIG1ldGhvZHM6IHtcclxuICAgIGFzeW5jIGFkZFByb2R1Y3QoKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IHtcclxuICAgICAgICAgIG5hbWU6IHRoaXMubmFtZSxcclxuICAgICAgICAgIGNhdGVnb3J5OiB0aGlzLmNhdGVnb3J5LnZhbHVlLFxyXG4gICAgICAgICAgYnJhbmQ6IHRoaXMuYnJhbmQsXHJcbiAgICAgICAgICB3ZWlnaHQ6IHRoaXMud2VpZ2h0LFxyXG4gICAgICAgICAgcHJpY2U6IHRoaXMucHJpY2UsXHJcbiAgICAgICAgICBzZWxlY3RlZExvY2F0aW9uczogdGhpcy5zZWxlY3RlZExvY2F0aW9ucyxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuJGFwaS5wb3N0KFwiL3Byb2R1Y3RzXCIsIGRhdGEpO1xyXG4gICAgICAgIGlmIChyZXMuZGF0YS5zdGF0dXMgPT09IFwic3VjY2Vzc1wiKSB7XHJcbiAgICAgICAgICBhd2FpdCB0aGlzLmZldGNoTG9jYXRpb24oKTtcclxuICAgICAgICAgIHRoaXMuc2hvd0FkZFByb2R1Y3QgPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMucmVzZXRGaWVsZHMoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgcmVzZXRGaWVsZHMoKSB7XHJcbiAgICAgIHRoaXMubmFtZSA9IG51bGw7XHJcbiAgICAgIHRoaXMuY2F0ZWdvcnkgPSBudWxsO1xyXG4gICAgICB0aGlzLmJyYW5kID0gbnVsbDtcclxuICAgICAgdGhpcy53ZWlnaHQgPSBudWxsO1xyXG4gICAgICB0aGlzLnByaWNlID0gbnVsbDtcclxuICAgICAgdGhpcy5zZWxlY3RlZExvY2F0aW9ucyA9IFt0aGlzLiRyb3V0ZS5wYXJhbXMubG9jYXRpb25JZF07XHJcbiAgICB9LFxyXG4gICAgYXN5bmMgZmV0Y2hMb2NhdGlvbigpIHtcclxuICAgICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy4kYXBpLmdldChcclxuICAgICAgICBgL2xvY2F0aW9ucy8ke3RoaXMuJHJvdXRlLnBhcmFtcy5sb2NhdGlvbklkfWBcclxuICAgICAgKTtcclxuICAgICAgdGhpcy5sb2NhdGlvbiA9IHJlcy5kYXRhLmRhdGEubG9jYXRpb247XHJcbiAgICB9LFxyXG4gICAgYXN5bmMgZmV0Y2hDYXRlZ29yaWVzKCkge1xyXG4gICAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLiRhcGkuZ2V0KFwiL2NhdGVnb3JpZXNcIik7XHJcbiAgICAgIHRoaXMuY2F0ZWdvcnlPcHRpb25zID0gcmVzLmRhdGEuZGF0YS5jYXRlZ29yaWVzLm1hcChcclxuICAgICAgICAoeyBfaWQ6IHZhbHVlLCBuYW1lOiBsYWJlbCB9KSA9PiAoe1xyXG4gICAgICAgICAgdmFsdWUsXHJcbiAgICAgICAgICBsYWJlbCxcclxuICAgICAgICB9KVxyXG4gICAgICApO1xyXG4gICAgICB0aGlzLmNhdGVnb3JpZXMgPSByZXMuZGF0YS5kYXRhLmNhdGVnb3JpZXM7XHJcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuY2F0ZWdvcmllcyk7XHJcbiAgICAgIHRoaXMuc2hvd2VkT3B0aW9ucyA9IE9iamVjdC5hc3NpZ24odGhpcy5jYXRlZ29yeU9wdGlvbnMpO1xyXG4gICAgfSxcclxuICAgIGZpbHRlckZuKHZhbCwgdXBkYXRlKSB7XHJcbiAgICAgIGlmICh2YWwgPT09IFwiXCIpIHtcclxuICAgICAgICB1cGRhdGUoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5zaG93ZWRPcHRpb25zID0gdGhpcy5jYXRlZ29yeU9wdGlvbnM7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB1cGRhdGUoKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG5lZWRsZSA9IHZhbC50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIHRoaXMuc2hvd2VkT3B0aW9ucyA9IHRoaXMuY2F0ZWdvcnlPcHRpb25zLmZpbHRlcihcclxuICAgICAgICAgICh2KSA9PiB2LmxhYmVsLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihuZWVkbGUpID4gLTFcclxuICAgICAgICApO1xyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICB2aWV3UHJvZHVjdHNJbkNhdGVnb3J5KGNhdGVnb3J5KSB7XHJcbiAgICAgIHRoaXMuY2F0ZWdvcnlJbmZvID0gY2F0ZWdvcnk7XHJcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuY2F0ZWdvcnlJbmZvKTtcclxuICAgIH0sXHJcbiAgfSxcclxufTtcclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGUgc2NvcGVkPlxyXG4udGV4dC1oNiB7XHJcbiAgY29sb3I6ICMyNjczNzg7XHJcbn1cclxuLmFkZC1wcm9kdWN0X19idG4ge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICMyNjczNzg7XHJcbiAgY29sb3I6IHdoaXRlO1xyXG4gIG1hcmdpbjogMTBweDtcclxufVxyXG4ucHJvZHVjdC1jYXJkX19saXN0IHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgZ2FwOiAzMHB4O1xyXG59XHJcbjwvc3R5bGU+XHJcbiJdLCJuYW1lcyI6WyJhdHRycyIsIl9zZmNfbWFpbiIsIl9ob2lzdGVkXzEiLCJfaG9pc3RlZF8yIiwiX2hvaXN0ZWRfMyIsIl9ob2lzdGVkXzQiLCJfd2l0aFNjb3BlSWQiLCJfY3JlYXRlRWxlbWVudFZOb2RlIiwiX2NyZWF0ZVZOb2RlIiwiX2NyZWF0ZVRleHRWTm9kZSIsIl90b0Rpc3BsYXlTdHJpbmciLCJfb3BlbkJsb2NrIiwiX2NyZWF0ZUVsZW1lbnRCbG9jayIsIl9GcmFnbWVudCIsIl9yZW5kZXJMaXN0IiwiX2NyZWF0ZUJsb2NrIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBY0EsTUFBTSxNQUFNLEVBQUUsT0FBTztBQUFBLEVBQ25CLEtBQUs7QUFBQSxFQUNMLE9BQU87QUFBQSxFQUNQLFNBQVM7QUFDWCxHQUFHO0FBQUEsRUFDRCxFQUFFLFFBQVE7QUFBQSxJQUNSLEdBQUc7QUFBQSxFQUNQLENBQUc7QUFBQSxFQUVELEVBQUUsUUFBUTtBQUFBLElBQ1IsT0FBTztBQUFBLElBQ1AsR0FBRztBQUFBLEVBQ1AsQ0FBRztBQUNILENB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
