import { ak as h, bt as createComponent, ck as useSizeProps, cj as useSize, y as ref, a1 as computed, bC as QIcon, by as hMergeSlot, bF as hSlot, ah as getCurrentInstance, D as toRaw, bI as stopAndPrevent, _ as _export_sfc, o as openBlock, c as createElementBlock, aa as createVNode, b5 as withCtx, a as createBaseVNode, a9 as createTextVNode, M as toDisplayString, b7 as withDirectives, bE as QBtn, Q as Fragment, aH as pushScopeId, aF as popScopeId, aL as resolveComponent, a3 as createCommentVNode, aK as renderList, a2 as createBlock, bB as useDashHeaderStore, bT as Ripple } from "./index.0ce84b9b.js";
import { Q as QItem, a as QItemSection } from "./QItem.742a43b4.js";
import { Q as QSpace, a as QDialog } from "./QDialog.27e255cd.js";
import { Q as QCard, a as QCardSection } from "./QCard.511536db.js";
import { Q as QInput } from "./QInput.4104ffc2.js";
import { Q as QSelect } from "./QSelect.fdd995d4.js";
import { u as useDarkProps, a as useDark } from "./use-dark.089fd8b8.js";
import { o as optionSizes, c as useRefocusTarget } from "./use-checkbox.bf2f6301.js";
import { u as useFormProps, a as useFormInject } from "./use-form.e754bc19.js";
import { a as QCheckbox } from "./QCheckbox.7ccc5998.js";
import { Q as QToggle } from "./QToggle.763578ad.js";
import { C as ClosePopup } from "./ClosePopup.fcd43a0a.js";
import { Q as QSeparator } from "./QSeparator.96f0308a.js";
import { Q as QSlideItem } from "./QSlideItem.ca1c7a33.js";
import { Q as QCardActions } from "./QCardActions.9dd12f15.js";
import "./use-timeout.0140a5e1.js";
import "./focus-manager.d6507951.js";
import "./uid.42677368.js";
import "./QChip.1f12071e.js";
import "./QMenu.73fdfda5.js";
import "./selection.0c91ca54.js";
import "./rtl.b51694b1.js";
import "./format.2a3572e1.js";
import "./TouchPan.43131768.js";
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
const _withScopeId$1 = (n) => (pushScopeId("data-v-61a7570e"), n = n(), popScopeId(), n);
const _hoisted_1$2 = { class: "row items-center" };
const _hoisted_2$2 = { class: "row items-center" };
const _hoisted_3$2 = { class: "product" };
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
                createBaseVNode("div", _hoisted_3$2, [
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
var ProductCard = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__scopeId", "data-v-61a7570e"], ["__file", "ProductCard.vue"]]);
var ProductsInCategory_vue_vue_type_style_index_0_scoped_true_lang = "";
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
const _hoisted_1$1 = { class: "category-name" };
const _hoisted_2$1 = { key: 0 };
const _hoisted_3$1 = { key: 1 };
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ProductCard = resolveComponent("ProductCard");
  return openBlock(), createElementBlock(Fragment, null, [
    createVNode(QSeparator),
    createBaseVNode("div", _hoisted_1$1, [
      createVNode(QIcon, {
        name: "arrow_back_ios",
        onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("goBackToCategories"))
      }),
      createBaseVNode("strong", null, toDisplayString($props.categoryInfo.name), 1)
    ]),
    $data.productsInCategory && !$data.productsInCategory.length ? (openBlock(), createElementBlock("div", _hoisted_2$1, " No products in this category. ")) : createCommentVNode("", true),
    $data.productsInCategory && $data.productsInCategory.length ? (openBlock(), createElementBlock("div", _hoisted_3$1, [
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
var ProductsInCategory = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__scopeId", "data-v-4d18f0e9"], ["__file", "ProductsInCategory.vue"]]);
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
const _withScopeId = (n) => (pushScopeId("data-v-6a4c27c6"), n = n(), popScopeId(), n);
const _hoisted_1 = { key: 0 };
const _hoisted_2 = {
  key: 0,
  class: "location-details__title"
};
const _hoisted_3 = { key: 1 };
const _hoisted_4 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-h6" }, "Add Product", -1));
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ProductsInCategory = resolveComponent("ProductsInCategory");
  return $data.location ? (openBlock(), createElementBlock("div", _hoisted_1, [
    $data.location ? (openBlock(), createElementBlock("div", _hoisted_2, toDisplayString($data.location.name), 1)) : createCommentVNode("", true),
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
var LocationDetailsPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6a4c27c6"], ["__file", "LocationDetailsPage.vue"]]);
export { LocationDetailsPage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9jYXRpb25EZXRhaWxzUGFnZS5jMjJhYmRjZS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9yYWRpby9RUmFkaW8uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL29wdGlvbi1ncm91cC9RT3B0aW9uR3JvdXAuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9hZG1pbmlzdHJhdGlvbi9Qcm9kdWN0Q2FyZC52dWUiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9hZG1pbmlzdHJhdGlvbi9Qcm9kdWN0c0luQ2F0ZWdvcnkudnVlIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL2FkbWluaXN0cmF0aW9uL0xvY2F0aW9uRGV0YWlsc1BhZ2UudnVlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGgsIHJlZiwgY29tcHV0ZWQsIGdldEN1cnJlbnRJbnN0YW5jZSwgdG9SYXcgfSBmcm9tICd2dWUnXG5cbmltcG9ydCBRSWNvbiBmcm9tICcuLi9pY29uL1FJY29uLmpzJ1xuXG5pbXBvcnQgdXNlRGFyaywgeyB1c2VEYXJrUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1kYXJrLmpzJ1xuaW1wb3J0IHVzZVNpemUsIHsgdXNlU2l6ZVByb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2Utc2l6ZS5qcydcbmltcG9ydCB1c2VSZWZvY3VzVGFyZ2V0IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLXJlZm9jdXMtdGFyZ2V0LmpzJ1xuaW1wb3J0IHsgdXNlRm9ybVByb3BzLCB1c2VGb3JtSW5qZWN0IH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtZm9ybS5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgb3B0aW9uU2l6ZXMgZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9vcHRpb24tc2l6ZXMuanMnXG5pbXBvcnQgeyBzdG9wQW5kUHJldmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL2V2ZW50LmpzJ1xuaW1wb3J0IHsgaFNsb3QsIGhNZXJnZVNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcblxuY29uc3Qgc3ZnID0gaCgnc3ZnJywge1xuICBrZXk6ICdzdmcnLFxuICBjbGFzczogJ3EtcmFkaW9fX2JnIGFic29sdXRlIG5vbi1zZWxlY3RhYmxlJyxcbiAgdmlld0JveDogJzAgMCAyNCAyNCdcbn0sIFtcbiAgaCgncGF0aCcsIHtcbiAgICBkOiAnTTEyLDIyYTEwLDEwIDAgMCAxIC0xMCwtMTBhMTAsMTAgMCAwIDEgMTAsLTEwYTEwLDEwIDAgMCAxIDEwLDEwYTEwLDEwIDAgMCAxIC0xMCwxMG0wLC0yMmExMiwxMiAwIDAgMCAtMTIsMTJhMTIsMTIgMCAwIDAgMTIsMTJhMTIsMTIgMCAwIDAgMTIsLTEyYTEyLDEyIDAgMCAwIC0xMiwtMTInXG4gIH0pLFxuXG4gIGgoJ3BhdGgnLCB7XG4gICAgY2xhc3M6ICdxLXJhZGlvX19jaGVjaycsXG4gICAgZDogJ00xMiw2YTYsNiAwIDAgMCAtNiw2YTYsNiAwIDAgMCA2LDZhNiw2IDAgMCAwIDYsLTZhNiw2IDAgMCAwIC02LC02J1xuICB9KVxuXSlcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FSYWRpbycsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VEYXJrUHJvcHMsXG4gICAgLi4udXNlU2l6ZVByb3BzLFxuICAgIC4uLnVzZUZvcm1Qcm9wcyxcblxuICAgIG1vZGVsVmFsdWU6IHsgcmVxdWlyZWQ6IHRydWUgfSxcbiAgICB2YWw6IHsgcmVxdWlyZWQ6IHRydWUgfSxcblxuICAgIGxhYmVsOiBTdHJpbmcsXG4gICAgbGVmdExhYmVsOiBCb29sZWFuLFxuXG4gICAgY2hlY2tlZEljb246IFN0cmluZyxcbiAgICB1bmNoZWNrZWRJY29uOiBTdHJpbmcsXG5cbiAgICBjb2xvcjogU3RyaW5nLFxuICAgIGtlZXBDb2xvcjogQm9vbGVhbixcbiAgICBkZW5zZTogQm9vbGVhbixcblxuICAgIGRpc2FibGU6IEJvb2xlYW4sXG4gICAgdGFiaW5kZXg6IFsgU3RyaW5nLCBOdW1iZXIgXVxuICB9LFxuXG4gIGVtaXRzOiBbICd1cGRhdGU6bW9kZWxWYWx1ZScgXSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMsIGVtaXQgfSkge1xuICAgIGNvbnN0IHsgcHJveHkgfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG5cbiAgICBjb25zdCBpc0RhcmsgPSB1c2VEYXJrKHByb3BzLCBwcm94eS4kcSlcbiAgICBjb25zdCBzaXplU3R5bGUgPSB1c2VTaXplKHByb3BzLCBvcHRpb25TaXplcylcblxuICAgIGNvbnN0IHJvb3RSZWYgPSByZWYobnVsbClcbiAgICBjb25zdCB7IHJlZm9jdXNUYXJnZXRFbCwgcmVmb2N1c1RhcmdldCB9ID0gdXNlUmVmb2N1c1RhcmdldChwcm9wcywgcm9vdFJlZilcblxuICAgIGNvbnN0IGlzVHJ1ZSA9IGNvbXB1dGVkKCgpID0+IHRvUmF3KHByb3BzLm1vZGVsVmFsdWUpID09PSB0b1Jhdyhwcm9wcy52YWwpKVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAncS1yYWRpbyBjdXJzb3ItcG9pbnRlciBuby1vdXRsaW5lIHJvdyBpbmxpbmUgbm8td3JhcCBpdGVtcy1jZW50ZXInXG4gICAgICArIChwcm9wcy5kaXNhYmxlID09PSB0cnVlID8gJyBkaXNhYmxlZCcgOiAnJylcbiAgICAgICsgKGlzRGFyay52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1yYWRpby0tZGFyaycgOiAnJylcbiAgICAgICsgKHByb3BzLmRlbnNlID09PSB0cnVlID8gJyBxLXJhZGlvLS1kZW5zZScgOiAnJylcbiAgICAgICsgKHByb3BzLmxlZnRMYWJlbCA9PT0gdHJ1ZSA/ICcgcmV2ZXJzZScgOiAnJylcbiAgICApXG5cbiAgICBjb25zdCBpbm5lckNsYXNzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3QgY29sb3IgPSBwcm9wcy5jb2xvciAhPT0gdm9pZCAwICYmIChcbiAgICAgICAgcHJvcHMua2VlcENvbG9yID09PSB0cnVlXG4gICAgICAgIHx8IGlzVHJ1ZS52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgKVxuICAgICAgICA/IGAgdGV4dC0keyBwcm9wcy5jb2xvciB9YFxuICAgICAgICA6ICcnXG5cbiAgICAgIHJldHVybiAncS1yYWRpb19faW5uZXIgcmVsYXRpdmUtcG9zaXRpb24gJ1xuICAgICAgICArIGBxLXJhZGlvX19pbm5lci0tJHsgaXNUcnVlLnZhbHVlID09PSB0cnVlID8gJ3RydXRoeScgOiAnZmFsc3knIH0keyBjb2xvciB9YFxuICAgIH0pXG5cbiAgICBjb25zdCBpY29uID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIChpc1RydWUudmFsdWUgPT09IHRydWVcbiAgICAgICAgPyBwcm9wcy5jaGVja2VkSWNvblxuICAgICAgICA6IHByb3BzLnVuY2hlY2tlZEljb25cbiAgICAgICkgfHwgbnVsbFxuICAgIClcblxuICAgIGNvbnN0IHRhYmluZGV4ID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgcHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZSA/IC0xIDogcHJvcHMudGFiaW5kZXggfHwgMFxuICAgICkpXG5cbiAgICBjb25zdCBmb3JtQXR0cnMgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCBwcm9wID0geyB0eXBlOiAncmFkaW8nIH1cblxuICAgICAgcHJvcHMubmFtZSAhPT0gdm9pZCAwICYmIE9iamVjdC5hc3NpZ24ocHJvcCwge1xuICAgICAgICAvLyBzZWUgaHR0cHM6Ly92dWVqcy5vcmcvZ3VpZGUvZXh0cmFzL3JlbmRlci1mdW5jdGlvbi5odG1sI2NyZWF0aW5nLXZub2RlcyAoLnByb3ApXG4gICAgICAgICcuY2hlY2tlZCc6IGlzVHJ1ZS52YWx1ZSA9PT0gdHJ1ZSxcbiAgICAgICAgJ15jaGVja2VkJzogaXNUcnVlLnZhbHVlID09PSB0cnVlID8gJ2NoZWNrZWQnIDogdm9pZCAwLFxuICAgICAgICBuYW1lOiBwcm9wcy5uYW1lLFxuICAgICAgICB2YWx1ZTogcHJvcHMudmFsXG4gICAgICB9KVxuXG4gICAgICByZXR1cm4gcHJvcFxuICAgIH0pXG5cbiAgICBjb25zdCBpbmplY3RGb3JtSW5wdXQgPSB1c2VGb3JtSW5qZWN0KGZvcm1BdHRycylcblxuICAgIGZ1bmN0aW9uIG9uQ2xpY2sgKGUpIHtcbiAgICAgIGlmIChlICE9PSB2b2lkIDApIHtcbiAgICAgICAgc3RvcEFuZFByZXZlbnQoZSlcbiAgICAgICAgcmVmb2N1c1RhcmdldChlKVxuICAgICAgfVxuXG4gICAgICBpZiAocHJvcHMuZGlzYWJsZSAhPT0gdHJ1ZSAmJiBpc1RydWUudmFsdWUgIT09IHRydWUpIHtcbiAgICAgICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCBwcm9wcy52YWwsIGUpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25LZXlkb3duIChlKSB7XG4gICAgICBpZiAoZS5rZXlDb2RlID09PSAxMyB8fCBlLmtleUNvZGUgPT09IDMyKSB7XG4gICAgICAgIHN0b3BBbmRQcmV2ZW50KGUpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25LZXl1cCAoZSkge1xuICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMTMgfHwgZS5rZXlDb2RlID09PSAzMikge1xuICAgICAgICBvbkNsaWNrKGUpXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gZXhwb3NlIHB1YmxpYyBtZXRob2RzXG4gICAgT2JqZWN0LmFzc2lnbihwcm94eSwgeyBzZXQ6IG9uQ2xpY2sgfSlcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjb25zdCBjb250ZW50ID0gaWNvbi52YWx1ZSAhPT0gbnVsbFxuICAgICAgICA/IFtcbiAgICAgICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICAgICAga2V5OiAnaWNvbicsXG4gICAgICAgICAgICAgIGNsYXNzOiAncS1yYWRpb19faWNvbi1jb250YWluZXIgYWJzb2x1dGUtZnVsbCBmbGV4IGZsZXgtY2VudGVyIG5vLXdyYXAnXG4gICAgICAgICAgICB9LCBbXG4gICAgICAgICAgICAgIGgoUUljb24sIHtcbiAgICAgICAgICAgICAgICBjbGFzczogJ3EtcmFkaW9fX2ljb24nLFxuICAgICAgICAgICAgICAgIG5hbWU6IGljb24udmFsdWVcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF0pXG4gICAgICAgICAgXVxuICAgICAgICA6IFsgc3ZnIF1cblxuICAgICAgcHJvcHMuZGlzYWJsZSAhPT0gdHJ1ZSAmJiBpbmplY3RGb3JtSW5wdXQoXG4gICAgICAgIGNvbnRlbnQsXG4gICAgICAgICd1bnNoaWZ0JyxcbiAgICAgICAgJyBxLXJhZGlvX19uYXRpdmUgcS1tYS1ub25lIHEtcGEtbm9uZSdcbiAgICAgIClcblxuICAgICAgY29uc3QgY2hpbGQgPSBbXG4gICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICBjbGFzczogaW5uZXJDbGFzcy52YWx1ZSxcbiAgICAgICAgICBzdHlsZTogc2l6ZVN0eWxlLnZhbHVlLFxuICAgICAgICAgICdhcmlhLWhpZGRlbic6ICd0cnVlJ1xuICAgICAgICB9LCBjb250ZW50KVxuICAgICAgXVxuXG4gICAgICBpZiAocmVmb2N1c1RhcmdldEVsLnZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgIGNoaWxkLnB1c2gocmVmb2N1c1RhcmdldEVsLnZhbHVlKVxuICAgICAgfVxuXG4gICAgICBjb25zdCBsYWJlbCA9IHByb3BzLmxhYmVsICE9PSB2b2lkIDBcbiAgICAgICAgPyBoTWVyZ2VTbG90KHNsb3RzLmRlZmF1bHQsIFsgcHJvcHMubGFiZWwgXSlcbiAgICAgICAgOiBoU2xvdChzbG90cy5kZWZhdWx0KVxuXG4gICAgICBsYWJlbCAhPT0gdm9pZCAwICYmIGNoaWxkLnB1c2goXG4gICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICBjbGFzczogJ3EtcmFkaW9fX2xhYmVsIHEtYW5jaG9yLS1za2lwJ1xuICAgICAgICB9LCBsYWJlbClcbiAgICAgIClcblxuICAgICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgICAgcmVmOiByb290UmVmLFxuICAgICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZSxcbiAgICAgICAgdGFiaW5kZXg6IHRhYmluZGV4LnZhbHVlLFxuICAgICAgICByb2xlOiAncmFkaW8nLFxuICAgICAgICAnYXJpYS1sYWJlbCc6IHByb3BzLmxhYmVsLFxuICAgICAgICAnYXJpYS1jaGVja2VkJzogaXNUcnVlLnZhbHVlID09PSB0cnVlID8gJ3RydWUnIDogJ2ZhbHNlJyxcbiAgICAgICAgJ2FyaWEtZGlzYWJsZWQnOiBwcm9wcy5kaXNhYmxlID09PSB0cnVlID8gJ3RydWUnIDogdm9pZCAwLFxuICAgICAgICBvbkNsaWNrLFxuICAgICAgICBvbktleWRvd24sXG4gICAgICAgIG9uS2V5dXBcbiAgICAgIH0sIGNoaWxkKVxuICAgIH1cbiAgfVxufSlcbiIsImltcG9ydCB7IGgsIGNvbXB1dGVkLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCBRUmFkaW8gZnJvbSAnLi4vcmFkaW8vUVJhZGlvLmpzJ1xuaW1wb3J0IFFDaGVja2JveCBmcm9tICcuLi9jaGVja2JveC9RQ2hlY2tib3guanMnXG5pbXBvcnQgUVRvZ2dsZSBmcm9tICcuLi90b2dnbGUvUVRvZ2dsZS5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5cbmltcG9ydCB1c2VEYXJrLCB7IHVzZURhcmtQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWRhcmsuanMnXG5cbmNvbnN0IGNvbXBvbmVudHMgPSB7XG4gIHJhZGlvOiBRUmFkaW8sXG4gIGNoZWNrYm94OiBRQ2hlY2tib3gsXG4gIHRvZ2dsZTogUVRvZ2dsZVxufVxuXG5jb25zdCB0eXBlVmFsdWVzID0gT2JqZWN0LmtleXMoY29tcG9uZW50cylcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FPcHRpb25Hcm91cCcsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VEYXJrUHJvcHMsXG5cbiAgICBtb2RlbFZhbHVlOiB7XG4gICAgICByZXF1aXJlZDogdHJ1ZVxuICAgIH0sXG4gICAgb3B0aW9uczoge1xuICAgICAgdHlwZTogQXJyYXksXG4gICAgICB2YWxpZGF0b3I6IG9wdHMgPT4gb3B0cy5ldmVyeShvcHQgPT4gJ3ZhbHVlJyBpbiBvcHQgJiYgJ2xhYmVsJyBpbiBvcHQpXG4gICAgfSxcblxuICAgIG5hbWU6IFN0cmluZyxcblxuICAgIHR5cGU6IHtcbiAgICAgIGRlZmF1bHQ6ICdyYWRpbycsXG4gICAgICB2YWxpZGF0b3I6IHYgPT4gdHlwZVZhbHVlcy5pbmNsdWRlcyh2KVxuICAgIH0sXG5cbiAgICBjb2xvcjogU3RyaW5nLFxuICAgIGtlZXBDb2xvcjogQm9vbGVhbixcbiAgICBkZW5zZTogQm9vbGVhbixcblxuICAgIHNpemU6IFN0cmluZyxcblxuICAgIGxlZnRMYWJlbDogQm9vbGVhbixcbiAgICBpbmxpbmU6IEJvb2xlYW4sXG4gICAgZGlzYWJsZTogQm9vbGVhblxuICB9LFxuXG4gIGVtaXRzOiBbICd1cGRhdGU6bW9kZWxWYWx1ZScgXSxcblxuICBzZXR1cCAocHJvcHMsIHsgZW1pdCwgc2xvdHMgfSkge1xuICAgIGNvbnN0IHsgcHJveHk6IHsgJHEgfSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICAgIGNvbnN0IGFycmF5TW9kZWwgPSBBcnJheS5pc0FycmF5KHByb3BzLm1vZGVsVmFsdWUpXG5cbiAgICBpZiAocHJvcHMudHlwZSA9PT0gJ3JhZGlvJykge1xuICAgICAgaWYgKGFycmF5TW9kZWwgPT09IHRydWUpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcigncS1vcHRpb24tZ3JvdXA6IG1vZGVsIHNob3VsZCBub3QgYmUgYXJyYXknKVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChhcnJheU1vZGVsID09PSBmYWxzZSkge1xuICAgICAgY29uc29sZS5lcnJvcigncS1vcHRpb24tZ3JvdXA6IG1vZGVsIHNob3VsZCBiZSBhcnJheSBpbiB5b3VyIGNhc2UnKVxuICAgIH1cblxuICAgIGNvbnN0IGlzRGFyayA9IHVzZURhcmsocHJvcHMsICRxKVxuXG4gICAgY29uc3QgY29tcG9uZW50ID0gY29tcHV0ZWQoKCkgPT4gY29tcG9uZW50c1sgcHJvcHMudHlwZSBdKVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAncS1vcHRpb24tZ3JvdXAgcS1ndXR0ZXIteC1zbSdcbiAgICAgICsgKHByb3BzLmlubGluZSA9PT0gdHJ1ZSA/ICcgcS1vcHRpb24tZ3JvdXAtLWlubGluZScgOiAnJylcbiAgICApXG5cbiAgICBjb25zdCBhdHRycyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IGF0dHJzID0geyByb2xlOiAnZ3JvdXAnIH1cblxuICAgICAgaWYgKHByb3BzLnR5cGUgPT09ICdyYWRpbycpIHtcbiAgICAgICAgYXR0cnMucm9sZSA9ICdyYWRpb2dyb3VwJ1xuXG4gICAgICAgIGlmIChwcm9wcy5kaXNhYmxlID09PSB0cnVlKSB7XG4gICAgICAgICAgYXR0cnNbICdhcmlhLWRpc2FibGVkJyBdID0gJ3RydWUnXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGF0dHJzXG4gICAgfSlcblxuICAgIGZ1bmN0aW9uIG9uVXBkYXRlTW9kZWxWYWx1ZSAodmFsdWUpIHtcbiAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgdmFsdWUpXG4gICAgfVxuXG4gICAgcmV0dXJuICgpID0+IGgoJ2RpdicsIHtcbiAgICAgIGNsYXNzOiBjbGFzc2VzLnZhbHVlLFxuICAgICAgLi4uYXR0cnMudmFsdWVcbiAgICB9LCBwcm9wcy5vcHRpb25zLm1hcCgob3B0LCBpKSA9PiB7XG4gICAgICAvLyBUT0RPOiAoUXYzKSBNYWtlIHRoZSAnb3B0JyBhIHNlcGFyYXRlIHByb3BlcnR5IGluc3RlYWQgb2ZcbiAgICAgIC8vIHRoZSB3aG9sZSBzY29wZSBmb3IgY29uc2lzdGVuY3kgYW5kIGZsZXhpYmlsaXR5XG4gICAgICAvLyAoZS5nLiB7IG9wdCB9IGluc3RlYWQgb2Ygb3B0KVxuICAgICAgY29uc3QgY2hpbGQgPSBzbG90c1sgJ2xhYmVsLScgKyBpIF0gIT09IHZvaWQgMFxuICAgICAgICA/ICgpID0+IHNsb3RzWyAnbGFiZWwtJyArIGkgXShvcHQpXG4gICAgICAgIDogKFxuICAgICAgICAgICAgc2xvdHMubGFiZWwgIT09IHZvaWQgMFxuICAgICAgICAgICAgICA/ICgpID0+IHNsb3RzLmxhYmVsKG9wdClcbiAgICAgICAgICAgICAgOiB2b2lkIDBcbiAgICAgICAgICApXG5cbiAgICAgIHJldHVybiBoKCdkaXYnLCBbXG4gICAgICAgIGgoY29tcG9uZW50LnZhbHVlLCB7XG4gICAgICAgICAgbW9kZWxWYWx1ZTogcHJvcHMubW9kZWxWYWx1ZSxcbiAgICAgICAgICB2YWw6IG9wdC52YWx1ZSxcbiAgICAgICAgICBuYW1lOiBvcHQubmFtZSA9PT0gdm9pZCAwID8gcHJvcHMubmFtZSA6IG9wdC5uYW1lLFxuICAgICAgICAgIGRpc2FibGU6IHByb3BzLmRpc2FibGUgfHwgb3B0LmRpc2FibGUsXG4gICAgICAgICAgbGFiZWw6IGNoaWxkID09PSB2b2lkIDAgPyBvcHQubGFiZWwgOiBudWxsLFxuICAgICAgICAgIGxlZnRMYWJlbDogb3B0LmxlZnRMYWJlbCA9PT0gdm9pZCAwID8gcHJvcHMubGVmdExhYmVsIDogb3B0LmxlZnRMYWJlbCxcbiAgICAgICAgICBjb2xvcjogb3B0LmNvbG9yID09PSB2b2lkIDAgPyBwcm9wcy5jb2xvciA6IG9wdC5jb2xvcixcbiAgICAgICAgICBjaGVja2VkSWNvbjogb3B0LmNoZWNrZWRJY29uLFxuICAgICAgICAgIHVuY2hlY2tlZEljb246IG9wdC51bmNoZWNrZWRJY29uLFxuICAgICAgICAgIGRhcms6IG9wdC5kYXJrIHx8IGlzRGFyay52YWx1ZSxcbiAgICAgICAgICBzaXplOiBvcHQuc2l6ZSA9PT0gdm9pZCAwID8gcHJvcHMuc2l6ZSA6IG9wdC5zaXplLFxuICAgICAgICAgIGRlbnNlOiBwcm9wcy5kZW5zZSxcbiAgICAgICAgICBrZWVwQ29sb3I6IG9wdC5rZWVwQ29sb3IgPT09IHZvaWQgMCA/IHByb3BzLmtlZXBDb2xvciA6IG9wdC5rZWVwQ29sb3IsXG4gICAgICAgICAgJ29uVXBkYXRlOm1vZGVsVmFsdWUnOiBvblVwZGF0ZU1vZGVsVmFsdWVcbiAgICAgICAgfSwgY2hpbGQpXG4gICAgICBdKVxuICAgIH0pKVxuICB9XG59KVxuIiwiPHRlbXBsYXRlPlxyXG4gIDxxLXNsaWRlLWl0ZW0gQGxlZnQ9XCJzaG93RWRpdFByb2R1Y3REaWFsb2dcIiBAcmlnaHQ9XCJzaG93RGVsZXRlUHJvZHVjdERpYWxvZ1wiPlxyXG4gICAgPHRlbXBsYXRlIHYtc2xvdDpsZWZ0PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwicm93IGl0ZW1zLWNlbnRlclwiPjxxLWljb24gbGVmdCBuYW1lPVwiZWRpdFwiIC8+IEVkaXQ8L2Rpdj5cclxuICAgIDwvdGVtcGxhdGU+XHJcbiAgICA8dGVtcGxhdGUgdi1zbG90OnJpZ2h0PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwicm93IGl0ZW1zLWNlbnRlclwiPkRlbGV0ZSA8cS1pY29uIHJpZ2h0IG5hbWU9XCJkZWxldGVcIiAvPjwvZGl2PlxyXG4gICAgPC90ZW1wbGF0ZT5cclxuXHJcbiAgICA8cS1pdGVtPlxyXG4gICAgICA8cS1pdGVtLXNlY3Rpb24+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInByb2R1Y3RcIj5cclxuICAgICAgICAgIHt7IHByb2R1Y3RJbmZvLmJyYW5kIH19IHt7IHByb2R1Y3RJbmZvLm5hbWUgfX1cclxuICAgICAgICAgIHt7IHByb2R1Y3RJbmZvLndlaWdodCB9fVxyXG4gICAgICAgICAgPHN0cm9uZz57eyBwcm9kdWN0SW5mby5wcmljZSB9fSBsZWk8L3N0cm9uZz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cclxuICAgIDwvcS1pdGVtPlxyXG4gIDwvcS1zbGlkZS1pdGVtPlxyXG5cclxuICA8cS1kaWFsb2cgbWF4aW1pemVkIHYtbW9kZWw9XCJzaG93RWRpdFByb2R1Y3RcIj5cclxuICAgIDxxLWNhcmQ+XHJcbiAgICAgIDxxLWNhcmQtc2VjdGlvbiBjbGFzcz1cInJvdyBpdGVtcy1jZW50ZXIgcS1wYi1ub25lXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDZcIj5FZGl0IFByb2R1Y3Q8L2Rpdj5cclxuICAgICAgICA8cS1zcGFjZSAvPlxyXG4gICAgICAgIDxxLWJ0biBpY29uPVwiY2xvc2VcIiBmbGF0IHJvdW5kIGRlbnNlIHYtY2xvc2UtcG9wdXAgLz5cclxuICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cclxuXHJcbiAgICAgIDxxLWNhcmQtc2VjdGlvbj5cclxuICAgICAgICA8cS1pbnB1dCB2LW1vZGVsPVwibmFtZVwiIHR5cGU9XCJ0ZXh0XCIgbGFiZWw9XCJOYW1lXCIgLz5cclxuICAgICAgICA8cS1pbnB1dCB2LW1vZGVsPVwiY2F0ZWdvcnlcIiB0eXBlPVwidGV4dFwiIGxhYmVsPVwiQ2F0ZWdvcnlcIiAvPlxyXG4gICAgICAgIDxxLWlucHV0IHYtbW9kZWw9XCJicmFuZFwiIHR5cGU9XCJ0ZXh0XCIgbGFiZWw9XCJCcmFuZFwiIC8+XHJcbiAgICAgICAgPHEtaW5wdXQgdi1tb2RlbD1cIndlaWdodFwiIHR5cGU9XCJ0ZXh0XCIgbGFiZWw9XCJXZWlnaHRcIiAvPlxyXG4gICAgICAgIDxxLWlucHV0IHYtbW9kZWw9XCJwcmljZVwiIHR5cGU9XCJudW1iZXJcIiBsYWJlbD1cIlByaWNlXCIgLz5cclxuICAgICAgICA8cS1idG4gY29sb3I9XCJzZWNvbmRhcnlcIiBAY2xpY2s9XCJzYXZlUHJvZHVjdFwiPlNhdmUgUHJvZHVjdDwvcS1idG4+XHJcbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XHJcbiAgICA8L3EtY2FyZD5cclxuICA8L3EtZGlhbG9nPlxyXG5cclxuICA8cS1kaWFsb2cgdi1tb2RlbD1cInNob3dEZWxldGVQcm9kdWN0XCIgcGVyc2lzdGVudD5cclxuICAgIDxxLWNhcmQ+XHJcbiAgICAgIDxxLWNhcmQtc2VjdGlvbiBjbGFzcz1cInJvdyBpdGVtcy1jZW50ZXJcIj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cInEtbWwtc21cIlxyXG4gICAgICAgICAgPkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUge3sgcHJvZHVjdEluZm8ubmFtZSB9fT88L3NwYW5cclxuICAgICAgICA+XHJcbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XHJcblxyXG4gICAgICA8cS1jYXJkLWFjdGlvbnMgYWxpZ249XCJyaWdodFwiPlxyXG4gICAgICAgIDxxLWJ0biBmbGF0IGxhYmVsPVwiQ2FuY2VsXCIgY29sb3I9XCJwcmltYXJ5XCIgdi1jbG9zZS1wb3B1cCAvPlxyXG4gICAgICAgIDxxLWJ0biBmbGF0IGxhYmVsPVwiRGVsZXRlXCIgY29sb3I9XCJyZWRcIiBAY2xpY2s9XCJkZWxldGVQcm9kdWN0XCIgLz5cclxuICAgICAgPC9xLWNhcmQtYWN0aW9ucz5cclxuICAgIDwvcS1jYXJkPlxyXG4gIDwvcS1kaWFsb2c+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgbmFtZTogXCJQcm9kdWN0Q2FyZFwiLFxyXG4gIHByb3BzOiBbXCJwcm9kdWN0SW5mb1wiXSxcclxuICBlbWl0czogW1wiZWRpdFByb2R1Y3RTdWNjZXNzXCIsIFwiZGVsZXRlUHJvZHVjdFN1Y2Nlc3NcIl0sXHJcbiAgZGF0YSgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHNob3dFZGl0UHJvZHVjdDogZmFsc2UsXHJcbiAgICAgIHNob3dEZWxldGVQcm9kdWN0OiBmYWxzZSxcclxuICAgICAgbmFtZTogdGhpcy5wcm9kdWN0SW5mby5uYW1lLFxyXG4gICAgICBjYXRlZ29yeTogdGhpcy5wcm9kdWN0SW5mby5jYXRlZ29yeS5uYW1lLFxyXG4gICAgICBicmFuZDogdGhpcy5wcm9kdWN0SW5mby5icmFuZCxcclxuICAgICAgd2VpZ2h0OiB0aGlzLnByb2R1Y3RJbmZvLndlaWdodCxcclxuICAgICAgcHJpY2U6IHRoaXMucHJvZHVjdEluZm8ucHJpY2UsXHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgYmVmb3JlVW5tb3VudCgpIHtcclxuICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVyKTtcclxuICB9LFxyXG4gIG1ldGhvZHM6IHtcclxuICAgIGZpbmFsaXplKHJlc2V0KSB7XHJcbiAgICAgIHRoaXMudGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICByZXNldCgpO1xyXG4gICAgICB9LCAxMDAwKTtcclxuICAgIH0sXHJcbiAgICBzaG93RWRpdFByb2R1Y3REaWFsb2coeyByZXNldCB9KSB7XHJcbiAgICAgIHRoaXMuc2hvd0VkaXRQcm9kdWN0ID0gdHJ1ZTtcclxuICAgICAgdGhpcy5maW5hbGl6ZShyZXNldCk7XHJcbiAgICB9LFxyXG4gICAgc2hvd0RlbGV0ZVByb2R1Y3REaWFsb2coeyByZXNldCB9KSB7XHJcbiAgICAgIHRoaXMuc2hvd0RlbGV0ZVByb2R1Y3QgPSB0cnVlO1xyXG4gICAgICB0aGlzLmZpbmFsaXplKHJlc2V0KTtcclxuICAgIH0sXHJcbiAgICBhc3luYyBzYXZlUHJvZHVjdCgpIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBkYXRhID0ge1xyXG4gICAgICAgICAgbmFtZTogdGhpcy5uYW1lLFxyXG4gICAgICAgICAgY2F0ZWdvcnk6IHRoaXMuY2F0ZWdvcnksXHJcbiAgICAgICAgICBicmFuZDogdGhpcy5icmFuZCxcclxuICAgICAgICAgIHdlaWdodDogdGhpcy53ZWlnaHQsXHJcbiAgICAgICAgICBwcmljZTogdGhpcy5wcmljZSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuJGFwaS5wYXRjaChcclxuICAgICAgICAgIGAvcHJvZHVjdHMvJHt0aGlzLnByb2R1Y3RJbmZvLl9pZH1gLFxyXG4gICAgICAgICAgZGF0YVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgaWYgKHJlcy5kYXRhLnN0YXR1cyA9PT0gXCJzdWNjZXNzXCIpIHtcclxuICAgICAgICAgIHRoaXMuJGVtaXQoXCJlZGl0UHJvZHVjdFN1Y2Nlc3NcIik7XHJcbiAgICAgICAgICB0aGlzLnNob3dFZGl0UHJvZHVjdCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGFzeW5jIGRlbGV0ZVByb2R1Y3QoKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy4kYXBpLmRlbGV0ZShcclxuICAgICAgICAgIGAvcHJvZHVjdHMvJHt0aGlzLnByb2R1Y3RJbmZvLl9pZH0vJHt0aGlzLiRyb3V0ZS5wYXJhbXMubG9jYXRpb25JZH1gXHJcbiAgICAgICAgKTtcclxuICAgICAgICBpZiAocmVzLmRhdGEuc3RhdHVzID09PSBcInN1Y2Nlc3NcIikge1xyXG4gICAgICAgICAgdGhpcy4kZW1pdChcImRlbGV0ZVByb2R1Y3RTdWNjZXNzXCIpO1xyXG4gICAgICAgICAgdGhpcy5zaG93RGVsZXRlUHJvZHVjdCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICB9LFxyXG59O1xyXG48L3NjcmlwdD5cclxuXHJcbjxzdHlsZSBzY29wZWQ+XHJcbi5wcm9kdWN0IHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxufVxyXG4ucS1pdGVtIHtcclxuICBwYWRkaW5nOiAwcHggMTZweDtcclxuICBtaW4taGVpZ2h0OiA0MHB4O1xyXG59XHJcbjwvc3R5bGU+XHJcbiIsIjx0ZW1wbGF0ZT5cclxuICA8cS1zZXBhcmF0b3I+PC9xLXNlcGFyYXRvcj5cclxuICA8ZGl2IGNsYXNzPVwiY2F0ZWdvcnktbmFtZVwiPlxyXG4gICAgPHEtaWNvbiBuYW1lPVwiYXJyb3dfYmFja19pb3NcIiBAY2xpY2s9XCIkZW1pdCgnZ29CYWNrVG9DYXRlZ29yaWVzJylcIj48L3EtaWNvbj5cclxuICAgIDxzdHJvbmc+e3sgY2F0ZWdvcnlJbmZvLm5hbWUgfX08L3N0cm9uZz5cclxuICA8L2Rpdj5cclxuICA8ZGl2IHYtaWY9XCJwcm9kdWN0c0luQ2F0ZWdvcnkgJiYgIXByb2R1Y3RzSW5DYXRlZ29yeS5sZW5ndGhcIj5cclxuICAgIE5vIHByb2R1Y3RzIGluIHRoaXMgY2F0ZWdvcnkuXHJcbiAgPC9kaXY+XHJcbiAgPGRpdiB2LWlmPVwicHJvZHVjdHNJbkNhdGVnb3J5ICYmIHByb2R1Y3RzSW5DYXRlZ29yeS5sZW5ndGhcIj5cclxuICAgIDxQcm9kdWN0Q2FyZFxyXG4gICAgICB2LWZvcj1cInByb2R1Y3QgaW4gcHJvZHVjdHNJbkNhdGVnb3J5XCJcclxuICAgICAgOmtleT1cInByb2R1Y3QuX2lkXCJcclxuICAgICAgOnByb2R1Y3RJbmZvPVwicHJvZHVjdFwiXHJcbiAgICAgIEBkZWxldGVQcm9kdWN0U3VjY2Vzcz1cImZldGNoUHJvZHVjdHNJbk9uZUNhdGVnb3J5XCJcclxuICAgICAgQGVkaXRQcm9kdWN0U3VjY2Vzcz1cImZldGNoUHJvZHVjdHNJbk9uZUNhdGVnb3J5XCJcclxuICAgIC8+XHJcbiAgPC9kaXY+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG5pbXBvcnQgUHJvZHVjdENhcmQgZnJvbSBcInNyYy9jb21wb25lbnRzL2FkbWluaXN0cmF0aW9uL1Byb2R1Y3RDYXJkLnZ1ZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIG5hbWU6IFwiUHJvZHVjdHNJbkNhdGVnb3J5XCIsXHJcbiAgY29tcG9uZW50czoge1xyXG4gICAgUHJvZHVjdENhcmQsXHJcbiAgfSxcclxuICBwcm9wczogW1wiY2F0ZWdvcnlJbmZvXCJdLFxyXG4gIGVtaXRzOiBbXCJnb0JhY2tUb0NhdGVnb3JpZXNcIl0sXHJcbiAgZGF0YSgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHByb2R1Y3RzSW5DYXRlZ29yeTogbnVsbCxcclxuICAgIH07XHJcbiAgfSxcclxuICBhc3luYyBtb3VudGVkKCkge1xyXG4gICAgYXdhaXQgdGhpcy5mZXRjaFByb2R1Y3RzSW5PbmVDYXRlZ29yeSgpO1xyXG4gIH0sXHJcbiAgbWV0aG9kczoge1xyXG4gICAgYXN5bmMgZmV0Y2hQcm9kdWN0c0luT25lQ2F0ZWdvcnkoKSB7XHJcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuJGFwaS5nZXQoXHJcbiAgICAgICAgYC9jYXRlZ29yaWVzLyR7dGhpcy4kcm91dGUucGFyYW1zLmxvY2F0aW9uSWR9LyR7dGhpcy5jYXRlZ29yeUluZm8uX2lkfWBcclxuICAgICAgKTtcclxuICAgICAgdGhpcy5wcm9kdWN0c0luQ2F0ZWdvcnkgPSByZXMuZGF0YS5kYXRhLnByb2R1Y3RzSW5DYXRlZ29yeUluTG9jYXRpb247XHJcbiAgICB9LFxyXG4gIH0sXHJcbn07XHJcbjwvc2NyaXB0PlxyXG5cclxuPHN0eWxlIHNjb3BlZD5cclxuLmNhdGVnb3J5LW5hbWUge1xyXG4gIGZvbnQtc2l6ZTogMThweDtcclxuICBtYXJnaW46IDVweDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbn1cclxuPC9zdHlsZT5cclxuIiwiPHRlbXBsYXRlPlxyXG4gIDxkaXYgdi1pZj1cImxvY2F0aW9uXCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwibG9jYXRpb24tZGV0YWlsc19fdGl0bGVcIiB2LWlmPVwibG9jYXRpb25cIj5cclxuICAgICAge3sgbG9jYXRpb24ubmFtZSB9fVxyXG4gICAgPC9kaXY+XHJcbiAgICA8cS1idG4gY2xhc3M9XCJhZGQtcHJvZHVjdF9fYnRuXCIgQGNsaWNrPVwic2hvd0FkZFByb2R1Y3QgPSB0cnVlXCJcclxuICAgICAgPkFkZCBQcm9kdWN0PC9xLWJ0blxyXG4gICAgPlxyXG4gICAgPGRpdiB2LWlmPVwiIWNhdGVnb3J5SW5mb1wiPlxyXG4gICAgICA8cS1pdGVtXHJcbiAgICAgICAgY2xpY2thYmxlXHJcbiAgICAgICAgdi1yaXBwbGVcclxuICAgICAgICB2LWZvcj1cImNhdGVnb3J5IGluIGNhdGVnb3JpZXNcIlxyXG4gICAgICAgIDprZXk9XCJjYXRlZ29yeS5faWRcIlxyXG4gICAgICA+XHJcbiAgICAgICAgPHEtaXRlbS1zZWN0aW9uIHRodW1ibmFpbCBzdHlsZT1cInBhZGRpbmctbGVmdDogMTBweFwiPlxyXG4gICAgICAgICAgPHEtaWNvbiA6bmFtZT1cImNhdGVnb3J5Lmljb25cIiAvPlxyXG4gICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XHJcbiAgICAgICAgPHEtaXRlbS1zZWN0aW9uIEBjbGljaz1cInZpZXdQcm9kdWN0c0luQ2F0ZWdvcnkoY2F0ZWdvcnkpXCI+e3tcclxuICAgICAgICAgIGNhdGVnb3J5Lm5hbWVcclxuICAgICAgICB9fTwvcS1pdGVtLXNlY3Rpb24+XHJcbiAgICAgIDwvcS1pdGVtPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8UHJvZHVjdHNJbkNhdGVnb3J5XHJcbiAgICAgIHYtaWY9XCJjYXRlZ29yeUluZm9cIlxyXG4gICAgICA6Y2F0ZWdvcnlJbmZvPVwiY2F0ZWdvcnlJbmZvXCJcclxuICAgICAgQGdvQmFja1RvQ2F0ZWdvcmllcz1cImNhdGVnb3J5SW5mbyA9IG51bGxcIlxyXG4gICAgLz5cclxuICAgIDxxLWRpYWxvZyBtYXhpbWl6ZWQgdi1tb2RlbD1cInNob3dBZGRQcm9kdWN0XCI+XHJcbiAgICAgIDxxLWNhcmQ+XHJcbiAgICAgICAgPHEtY2FyZC1zZWN0aW9uIGNsYXNzPVwicm93IGl0ZW1zLWNlbnRlciBxLXBiLW5vbmVcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWg2XCI+QWRkIFByb2R1Y3Q8L2Rpdj5cclxuICAgICAgICAgIDxxLXNwYWNlIC8+XHJcbiAgICAgICAgICA8cS1idG4gaWNvbj1cImNsb3NlXCIgZmxhdCByb3VuZCBkZW5zZSB2LWNsb3NlLXBvcHVwIC8+XHJcbiAgICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cclxuXHJcbiAgICAgICAgPHEtY2FyZC1zZWN0aW9uPlxyXG4gICAgICAgICAgPHEtaW5wdXQgdi1tb2RlbD1cIm5hbWVcIiB0eXBlPVwidGV4dFwiIGxhYmVsPVwiTmFtZVwiIC8+XHJcbiAgICAgICAgICA8cS1zZWxlY3RcclxuICAgICAgICAgICAgdi1tb2RlbD1cImNhdGVnb3J5XCJcclxuICAgICAgICAgICAgOm9wdGlvbnM9XCJzaG93ZWRPcHRpb25zXCJcclxuICAgICAgICAgICAgbGFiZWw9XCJDYXRlZ29yeVwiXHJcbiAgICAgICAgICAgIHVzZS1pbnB1dFxyXG4gICAgICAgICAgICBpbnB1dC1kZWJvdW5jZT1cIjBcIlxyXG4gICAgICAgICAgICBAZmlsdGVyPVwiZmlsdGVyRm5cIlxyXG4gICAgICAgICAgLz5cclxuICAgICAgICAgIDxxLWlucHV0IHYtbW9kZWw9XCJicmFuZFwiIHR5cGU9XCJ0ZXh0XCIgbGFiZWw9XCJCcmFuZFwiIC8+XHJcbiAgICAgICAgICA8cS1pbnB1dCB2LW1vZGVsPVwid2VpZ2h0XCIgdHlwZT1cInRleHRcIiBsYWJlbD1cIldlaWdodFwiIC8+XHJcbiAgICAgICAgICA8cS1pbnB1dCB2LW1vZGVsPVwicHJpY2VcIiB0eXBlPVwibnVtYmVyXCIgbGFiZWw9XCJQcmljZVwiIC8+XHJcblxyXG4gICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgPHEtb3B0aW9uLWdyb3VwXHJcbiAgICAgICAgICAgICAgdi1tb2RlbD1cInNlbGVjdGVkTG9jYXRpb25zXCJcclxuICAgICAgICAgICAgICA6b3B0aW9ucz1cImxvY2F0aW9uT3B0aW9uc1wiXHJcbiAgICAgICAgICAgICAgY29sb3I9XCJncmVlblwiXHJcbiAgICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPHEtYnRuXHJcbiAgICAgICAgICAgIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogIzI2NzM3ODsgY29sb3I6ICNmZmZcIlxyXG4gICAgICAgICAgICBAY2xpY2s9XCJhZGRQcm9kdWN0XCJcclxuICAgICAgICAgICAgbGFiZWw9XCJBZGQgcHJvZHVjdFwiXHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XHJcbiAgICAgIDwvcS1jYXJkPlxyXG4gICAgPC9xLWRpYWxvZz5cclxuICA8L2Rpdj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcbmltcG9ydCB7IHVzZURhc2hIZWFkZXJTdG9yZSB9IGZyb20gXCJzcmMvc3RvcmVzL2Rhc2gtaGVhZGVyXCI7XHJcbmltcG9ydCBQcm9kdWN0c0luQ2F0ZWdvcnkgZnJvbSBcInNyYy9jb21wb25lbnRzL2FkbWluaXN0cmF0aW9uL1Byb2R1Y3RzSW5DYXRlZ29yeS52dWVcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBuYW1lOiBcIlByb2R1Y3RzUGFnZVwiLFxyXG4gIGNvbXBvbmVudHM6IHtcclxuICAgIFByb2R1Y3RzSW5DYXRlZ29yeSxcclxuICB9LFxyXG5cclxuICBhc3luYyBtb3VudGVkKCkge1xyXG4gICAgYXdhaXQgdGhpcy5mZXRjaExvY2F0aW9uKCk7XHJcbiAgICBhd2FpdCB0aGlzLmZldGNoQ2F0ZWdvcmllcygpO1xyXG5cclxuICAgIGNvbnN0IGRhc2hIZWFkZXIgPSB1c2VEYXNoSGVhZGVyU3RvcmUoKTtcclxuICAgIGRhc2hIZWFkZXIuJHBhdGNoKHsgdGl0bGU6IHRoaXMubG9jYXRpb24ubmFtZSwgc2hvd0JhY2tJY29uOiB0cnVlIH0pO1xyXG5cclxuICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuJGFwaS5nZXQoYC9tYXJrZXRzLyR7dGhpcy4kcm91dGUucGFyYW1zLm1hcmtldElkfWApO1xyXG4gICAgdGhpcy5tYXJrZXQgPSByZXMuZGF0YS5kYXRhLm1hcmtldDtcclxuICAgIHRoaXMubWFya2V0LmxvY2F0aW9ucy5tYXAoKGxvYykgPT5cclxuICAgICAgdGhpcy5sb2NhdGlvbk9wdGlvbnMucHVzaCh7IGxhYmVsOiBsb2MubmFtZSwgdmFsdWU6IGxvYy5faWQgfSlcclxuICAgICk7XHJcbiAgICB0aGlzLnNlbGVjdGVkTG9jYXRpb25zLnB1c2godGhpcy4kcm91dGUucGFyYW1zLmxvY2F0aW9uSWQpO1xyXG4gIH0sXHJcbiAgZGF0YSgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5hbWU6IG51bGwsXHJcbiAgICAgIGNhdGVnb3J5OiBudWxsLFxyXG4gICAgICBicmFuZDogbnVsbCxcclxuICAgICAgd2VpZ2h0OiBudWxsLFxyXG4gICAgICBwcmljZTogbnVsbCxcclxuICAgICAgc2hvd0FkZFByb2R1Y3Q6IGZhbHNlLFxyXG4gICAgICBtYXJrZXQ6IG51bGwsXHJcbiAgICAgIHNlbGVjdGVkTG9jYXRpb25zOiBbXSxcclxuICAgICAgbG9jYXRpb25PcHRpb25zOiBbXSxcclxuICAgICAgbG9jYXRpb246IG51bGwsXHJcbiAgICAgIGNhdGVnb3J5T3B0aW9uczogW10sXHJcbiAgICAgIHNob3dlZE9wdGlvbnM6IFtdLFxyXG4gICAgICBjYXRlZ29yaWVzOiBbXSxcclxuICAgICAgY2F0ZWdvcnlJbmZvOiBudWxsLFxyXG4gICAgfTtcclxuICB9LFxyXG4gIG1ldGhvZHM6IHtcclxuICAgIGFzeW5jIGFkZFByb2R1Y3QoKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IHtcclxuICAgICAgICAgIG5hbWU6IHRoaXMubmFtZSxcclxuICAgICAgICAgIGNhdGVnb3J5OiB0aGlzLmNhdGVnb3J5LnZhbHVlLFxyXG4gICAgICAgICAgYnJhbmQ6IHRoaXMuYnJhbmQsXHJcbiAgICAgICAgICB3ZWlnaHQ6IHRoaXMud2VpZ2h0LFxyXG4gICAgICAgICAgcHJpY2U6IHRoaXMucHJpY2UsXHJcbiAgICAgICAgICBzZWxlY3RlZExvY2F0aW9uczogdGhpcy5zZWxlY3RlZExvY2F0aW9ucyxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuJGFwaS5wb3N0KFwiL3Byb2R1Y3RzXCIsIGRhdGEpO1xyXG4gICAgICAgIGlmIChyZXMuZGF0YS5zdGF0dXMgPT09IFwic3VjY2Vzc1wiKSB7XHJcbiAgICAgICAgICBhd2FpdCB0aGlzLmZldGNoTG9jYXRpb24oKTtcclxuICAgICAgICAgIHRoaXMuc2hvd0FkZFByb2R1Y3QgPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMucmVzZXRGaWVsZHMoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgcmVzZXRGaWVsZHMoKSB7XHJcbiAgICAgIHRoaXMubmFtZSA9IG51bGw7XHJcbiAgICAgIHRoaXMuY2F0ZWdvcnkgPSBudWxsO1xyXG4gICAgICB0aGlzLmJyYW5kID0gbnVsbDtcclxuICAgICAgdGhpcy53ZWlnaHQgPSBudWxsO1xyXG4gICAgICB0aGlzLnByaWNlID0gbnVsbDtcclxuICAgICAgdGhpcy5zZWxlY3RlZExvY2F0aW9ucyA9IFt0aGlzLiRyb3V0ZS5wYXJhbXMubG9jYXRpb25JZF07XHJcbiAgICB9LFxyXG4gICAgYXN5bmMgZmV0Y2hMb2NhdGlvbigpIHtcclxuICAgICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy4kYXBpLmdldChcclxuICAgICAgICBgL2xvY2F0aW9ucy8ke3RoaXMuJHJvdXRlLnBhcmFtcy5sb2NhdGlvbklkfWBcclxuICAgICAgKTtcclxuICAgICAgdGhpcy5sb2NhdGlvbiA9IHJlcy5kYXRhLmRhdGEubG9jYXRpb247XHJcbiAgICB9LFxyXG4gICAgYXN5bmMgZmV0Y2hDYXRlZ29yaWVzKCkge1xyXG4gICAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLiRhcGkuZ2V0KFwiL2NhdGVnb3JpZXNcIik7XHJcbiAgICAgIHRoaXMuY2F0ZWdvcnlPcHRpb25zID0gcmVzLmRhdGEuZGF0YS5jYXRlZ29yaWVzLm1hcChcclxuICAgICAgICAoeyBfaWQ6IHZhbHVlLCBuYW1lOiBsYWJlbCB9KSA9PiAoe1xyXG4gICAgICAgICAgdmFsdWUsXHJcbiAgICAgICAgICBsYWJlbCxcclxuICAgICAgICB9KVxyXG4gICAgICApO1xyXG4gICAgICB0aGlzLmNhdGVnb3JpZXMgPSByZXMuZGF0YS5kYXRhLmNhdGVnb3JpZXM7XHJcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuY2F0ZWdvcmllcyk7XHJcbiAgICAgIHRoaXMuc2hvd2VkT3B0aW9ucyA9IE9iamVjdC5hc3NpZ24odGhpcy5jYXRlZ29yeU9wdGlvbnMpO1xyXG4gICAgfSxcclxuICAgIGZpbHRlckZuKHZhbCwgdXBkYXRlKSB7XHJcbiAgICAgIGlmICh2YWwgPT09IFwiXCIpIHtcclxuICAgICAgICB1cGRhdGUoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5zaG93ZWRPcHRpb25zID0gdGhpcy5jYXRlZ29yeU9wdGlvbnM7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB1cGRhdGUoKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG5lZWRsZSA9IHZhbC50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIHRoaXMuc2hvd2VkT3B0aW9ucyA9IHRoaXMuY2F0ZWdvcnlPcHRpb25zLmZpbHRlcihcclxuICAgICAgICAgICh2KSA9PiB2LmxhYmVsLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihuZWVkbGUpID4gLTFcclxuICAgICAgICApO1xyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICB2aWV3UHJvZHVjdHNJbkNhdGVnb3J5KGNhdGVnb3J5KSB7XHJcbiAgICAgIHRoaXMuY2F0ZWdvcnlJbmZvID0gY2F0ZWdvcnk7XHJcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuY2F0ZWdvcnlJbmZvKTtcclxuICAgIH0sXHJcbiAgfSxcclxufTtcclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGUgc2NvcGVkPlxyXG4udGV4dC1oNiB7XHJcbiAgY29sb3I6ICMyNjczNzg7XHJcbn1cclxuLmFkZC1wcm9kdWN0X19idG4ge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICMyNjczNzg7XHJcbiAgY29sb3I6IHdoaXRlO1xyXG4gIG1hcmdpbjogMTBweDtcclxufVxyXG4ucHJvZHVjdC1jYXJkX19saXN0IHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgZ2FwOiAzMHB4O1xyXG59XHJcbi5sb2NhdGlvbi1kZXRhaWxzX190aXRsZSB7XHJcbiAgZm9udC1zaXplOiAyNHB4O1xyXG4gIHBhZGRpbmc6IDEwcHg7XHJcbn1cclxuLnEtaXRlbSB7XHJcbiAgcGFkZGluZzogMHB4IDE2cHg7XHJcbiAgbWluLWhlaWdodDogNDBweDtcclxufVxyXG4ucS1pdGVtX19zZWN0aW9uLS1zaWRlIHtcclxuICBjb2xvcjogIzI2NzM3ODtcclxufVxyXG48L3N0eWxlPlxyXG4iXSwibmFtZXMiOlsiYXR0cnMiLCJfc2ZjX21haW4iLCJfaG9pc3RlZF8xIiwiX2hvaXN0ZWRfMiIsIl9ob2lzdGVkXzMiLCJfaG9pc3RlZF80IiwiX3dpdGhTY29wZUlkIiwiX2NyZWF0ZUVsZW1lbnRWTm9kZSIsIl9jcmVhdGVWTm9kZSIsIl9jcmVhdGVUZXh0Vk5vZGUiLCJfdG9EaXNwbGF5U3RyaW5nIiwiX29wZW5CbG9jayIsIl9jcmVhdGVFbGVtZW50QmxvY2si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
