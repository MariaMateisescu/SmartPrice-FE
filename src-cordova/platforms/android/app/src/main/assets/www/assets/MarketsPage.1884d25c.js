import { y as ref, a1 as computed, ah as getCurrentInstance, ce as stop, bI as stopAndPrevent, bN as client, ak as h, bt as createComponent, bZ as injectProp, bJ as prevent, bw as emptyRenderFn, bF as hSlot, an as inject, bz as layoutKey, bW as pageContainerKey, _ as _export_sfc, o as openBlock, c as createElementBlock, aa as createVNode, b5 as withCtx, a as createBaseVNode, bC as QIcon, a9 as createTextVNode, bD as QAvatar, M as toDisplayString, b7 as withDirectives, bE as QBtn, Q as Fragment, aH as pushScopeId, aF as popScopeId, bB as useDashHeaderStore, a2 as createBlock, aL as resolveComponent, aK as renderList } from "./index.404ce4fc.js";
import { Q as QSpace, a as QDialog } from "./QDialog.61cd08a9.js";
import { Q as QCard, a as QCardSection } from "./QCard.facf2956.js";
import { u as useFieldProps, a as useFieldEmits, c as useFieldState, e as useFileFormDomProps, b as useField, f as fieldValueIsFilled, Q as QInput } from "./QInput.79283f08.js";
import { Q as QChip } from "./QChip.fdd72c5d.js";
import { u as useFormProps, c as useFormInputNameAttr } from "./use-form.74a30394.js";
import { h as humanStorageSize } from "./format.ec2e0666.js";
import { C as ClosePopup } from "./ClosePopup.7842916c.js";
import { Q as QItem, a as QItemSection } from "./QItem.9f28e6fb.js";
import { Q as QSlideItem, a as QCardActions } from "./QCardActions.10f7195c.js";
import "./use-timeout.219926c0.js";
import "./focus-manager.d00a4595.js";
import "./use-dark.efa419b2.js";
import "./uid.7f2d5a47.js";
import "./TouchPan.91a572c2.js";
import "./touch.16a8a914.js";
import "./selection.663e88ad.js";
import "./use-cache.b95af379.js";
function filterFiles(files, rejectedFiles, failedPropValidation, filterFn) {
  const acceptedFiles = [];
  files.forEach((file) => {
    if (filterFn(file) === true) {
      acceptedFiles.push(file);
    } else {
      rejectedFiles.push({ failedPropValidation, file });
    }
  });
  return acceptedFiles;
}
function stopAndPreventDrag(e) {
  e && e.dataTransfer && (e.dataTransfer.dropEffect = "copy");
  stopAndPrevent(e);
}
const useFileProps = {
  multiple: Boolean,
  accept: String,
  capture: String,
  maxFileSize: [Number, String],
  maxTotalSize: [Number, String],
  maxFiles: [Number, String],
  filter: Function
};
const useFileEmits = ["rejected"];
function useFile({
  editable,
  dnd,
  getFileInput,
  addFilesToQueue
}) {
  const { props, emit, proxy } = getCurrentInstance();
  const dndRef = ref(null);
  const extensions = computed(() => props.accept !== void 0 ? props.accept.split(",").map((ext) => {
    ext = ext.trim();
    if (ext === "*") {
      return "*/";
    } else if (ext.endsWith("/*")) {
      ext = ext.slice(0, ext.length - 1);
    }
    return ext.toUpperCase();
  }) : null);
  const maxFilesNumber = computed(() => parseInt(props.maxFiles, 10));
  const maxTotalSizeNumber = computed(() => parseInt(props.maxTotalSize, 10));
  function pickFiles(e) {
    if (editable.value) {
      if (e !== Object(e)) {
        e = { target: null };
      }
      if (e.target !== null && e.target.matches('input[type="file"]') === true) {
        e.clientX === 0 && e.clientY === 0 && stop(e);
      } else {
        const input = getFileInput();
        input && input !== e.target && input.click(e);
      }
    }
  }
  function addFiles(files) {
    if (editable.value && files) {
      addFilesToQueue(null, files);
    }
  }
  function processFiles(e, filesToProcess, currentFileList, append) {
    let files = Array.from(filesToProcess || e.target.files);
    const rejectedFiles = [];
    const done = () => {
      if (rejectedFiles.length > 0) {
        emit("rejected", rejectedFiles);
      }
    };
    if (props.accept !== void 0 && extensions.value.indexOf("*/") === -1) {
      files = filterFiles(files, rejectedFiles, "accept", (file) => {
        return extensions.value.some((ext) => file.type.toUpperCase().startsWith(ext) || file.name.toUpperCase().endsWith(ext));
      });
      if (files.length === 0) {
        return done();
      }
    }
    if (props.maxFileSize !== void 0) {
      const maxFileSize = parseInt(props.maxFileSize, 10);
      files = filterFiles(files, rejectedFiles, "max-file-size", (file) => {
        return file.size <= maxFileSize;
      });
      if (files.length === 0) {
        return done();
      }
    }
    if (props.multiple !== true && files.length > 0) {
      files = [files[0]];
    }
    files.forEach((file) => {
      file.__key = file.webkitRelativePath + file.lastModified + file.name + file.size;
    });
    if (append === true) {
      const filenameMap = currentFileList.map((entry) => entry.__key);
      files = filterFiles(files, rejectedFiles, "duplicate", (file) => {
        return filenameMap.includes(file.__key) === false;
      });
    }
    if (files.length === 0) {
      return done();
    }
    if (props.maxTotalSize !== void 0) {
      let size = append === true ? currentFileList.reduce((total, file) => total + file.size, 0) : 0;
      files = filterFiles(files, rejectedFiles, "max-total-size", (file) => {
        size += file.size;
        return size <= maxTotalSizeNumber.value;
      });
      if (files.length === 0) {
        return done();
      }
    }
    if (typeof props.filter === "function") {
      const filteredFiles = props.filter(files);
      files = filterFiles(files, rejectedFiles, "filter", (file) => {
        return filteredFiles.includes(file);
      });
    }
    if (props.maxFiles !== void 0) {
      let filesNumber = append === true ? currentFileList.length : 0;
      files = filterFiles(files, rejectedFiles, "max-files", () => {
        filesNumber++;
        return filesNumber <= maxFilesNumber.value;
      });
      if (files.length === 0) {
        return done();
      }
    }
    done();
    if (files.length > 0) {
      return files;
    }
  }
  function onDragover(e) {
    stopAndPreventDrag(e);
    dnd.value !== true && (dnd.value = true);
  }
  function onDragleave(e) {
    stopAndPrevent(e);
    const gone = e.relatedTarget !== null || client.is.safari !== true ? e.relatedTarget !== dndRef.value : document.elementsFromPoint(e.clientX, e.clientY).includes(dndRef.value) === false;
    gone === true && (dnd.value = false);
  }
  function onDrop(e) {
    stopAndPreventDrag(e);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      addFilesToQueue(null, files);
    }
    dnd.value = false;
  }
  function getDndNode(type) {
    if (dnd.value === true) {
      return h("div", {
        ref: dndRef,
        class: `q-${type}__dnd absolute-full`,
        onDragenter: stopAndPreventDrag,
        onDragover: stopAndPreventDrag,
        onDragleave,
        onDrop
      });
    }
  }
  Object.assign(proxy, { pickFiles, addFiles });
  return {
    pickFiles,
    addFiles,
    onDragover,
    onDragleave,
    processFiles,
    getDndNode,
    maxFilesNumber,
    maxTotalSizeNumber
  };
}
var QFile = createComponent({
  name: "QFile",
  inheritAttrs: false,
  props: {
    ...useFieldProps,
    ...useFormProps,
    ...useFileProps,
    modelValue: [File, FileList, Array],
    append: Boolean,
    useChips: Boolean,
    displayValue: [String, Number],
    tabindex: {
      type: [String, Number],
      default: 0
    },
    counterLabel: Function,
    inputClass: [Array, String, Object],
    inputStyle: [Array, String, Object]
  },
  emits: [
    ...useFieldEmits,
    ...useFileEmits
  ],
  setup(props, { slots, emit, attrs }) {
    const { proxy } = getCurrentInstance();
    const state = useFieldState();
    const inputRef = ref(null);
    const dnd = ref(false);
    const nameProp = useFormInputNameAttr(props);
    const {
      pickFiles,
      onDragover,
      onDragleave,
      processFiles,
      getDndNode
    } = useFile({ editable: state.editable, dnd, getFileInput, addFilesToQueue });
    const formDomProps = useFileFormDomProps(props);
    const innerValue = computed(() => Object(props.modelValue) === props.modelValue ? "length" in props.modelValue ? Array.from(props.modelValue) : [props.modelValue] : []);
    const hasValue = computed(() => fieldValueIsFilled(innerValue.value));
    const selectedString = computed(
      () => innerValue.value.map((file) => file.name).join(", ")
    );
    const totalSize = computed(
      () => humanStorageSize(
        innerValue.value.reduce((acc, file) => acc + file.size, 0)
      )
    );
    const counterProps = computed(() => ({
      totalSize: totalSize.value,
      filesNumber: innerValue.value.length,
      maxFiles: props.maxFiles
    }));
    const inputAttrs = computed(() => ({
      tabindex: -1,
      type: "file",
      title: "",
      accept: props.accept,
      capture: props.capture,
      name: nameProp.value,
      ...attrs,
      id: state.targetUid.value,
      disabled: state.editable.value !== true
    }));
    const fieldClass = computed(
      () => "q-file q-field--auto-height" + (dnd.value === true ? " q-file--dnd" : "")
    );
    const isAppending = computed(
      () => props.multiple === true && props.append === true
    );
    function removeAtIndex(index) {
      const files = innerValue.value.slice();
      files.splice(index, 1);
      emitValue(files);
    }
    function removeFile(file) {
      const index = innerValue.value.findIndex(file);
      if (index > -1) {
        removeAtIndex(index);
      }
    }
    function emitValue(files) {
      emit("update:modelValue", props.multiple === true ? files : files[0]);
    }
    function onKeydown(e) {
      e.keyCode === 13 && prevent(e);
    }
    function onKeyup(e) {
      if (e.keyCode === 13 || e.keyCode === 32) {
        pickFiles(e);
      }
    }
    function getFileInput() {
      return inputRef.value;
    }
    function addFilesToQueue(e, fileList) {
      const files = processFiles(e, fileList, innerValue.value, isAppending.value);
      const fileInput = getFileInput();
      if (fileInput !== void 0 && fileInput !== null) {
        fileInput.value = "";
      }
      if (files === void 0) {
        return;
      }
      if (props.multiple === true ? props.modelValue && files.every((f) => innerValue.value.includes(f)) : props.modelValue === files[0]) {
        return;
      }
      emitValue(
        isAppending.value === true ? innerValue.value.concat(files) : files
      );
    }
    function getFiller() {
      return [
        h("input", {
          class: [props.inputClass, "q-file__filler"],
          style: props.inputStyle
        })
      ];
    }
    function getSelection() {
      if (slots.file !== void 0) {
        return innerValue.value.length === 0 ? getFiller() : innerValue.value.map(
          (file, index) => slots.file({ index, file, ref: this })
        );
      }
      if (slots.selected !== void 0) {
        return innerValue.value.length === 0 ? getFiller() : slots.selected({ files: innerValue.value, ref: this });
      }
      if (props.useChips === true) {
        return innerValue.value.length === 0 ? getFiller() : innerValue.value.map((file, i) => h(QChip, {
          key: "file-" + i,
          removable: state.editable.value,
          dense: true,
          textColor: props.color,
          tabindex: props.tabindex,
          onRemove: () => {
            removeAtIndex(i);
          }
        }, () => h("span", {
          class: "ellipsis",
          textContent: file.name
        })));
      }
      const textContent = props.displayValue !== void 0 ? props.displayValue : selectedString.value;
      return textContent.length > 0 ? [
        h("div", {
          class: props.inputClass,
          style: props.inputStyle,
          textContent
        })
      ] : getFiller();
    }
    function getInput() {
      const data = {
        ref: inputRef,
        ...inputAttrs.value,
        ...formDomProps.value,
        class: "q-field__input fit absolute-full cursor-pointer",
        onChange: addFilesToQueue
      };
      if (props.multiple === true) {
        data.multiple = true;
      }
      return h("input", data);
    }
    Object.assign(state, {
      fieldClass,
      emitValue,
      hasValue,
      inputRef,
      innerValue,
      floatingLabel: computed(
        () => hasValue.value === true || fieldValueIsFilled(props.displayValue)
      ),
      computedCounter: computed(() => {
        if (props.counterLabel !== void 0) {
          return props.counterLabel(counterProps.value);
        }
        const max = props.maxFiles;
        return `${innerValue.value.length}${max !== void 0 ? " / " + max : ""} (${totalSize.value})`;
      }),
      getControlChild: () => getDndNode("file"),
      getControl: () => {
        const data = {
          ref: state.targetRef,
          class: "q-field__native row items-center cursor-pointer",
          tabindex: props.tabindex
        };
        if (state.editable.value === true) {
          Object.assign(data, { onDragover, onDragleave, onKeydown, onKeyup });
        }
        return h("div", data, [getInput()].concat(getSelection()));
      }
    });
    Object.assign(proxy, {
      removeAtIndex,
      removeFile,
      getNativeElement: () => inputRef.value
    });
    injectProp(proxy, "nativeEl", () => inputRef.value);
    return useField(state);
  }
});
var QPage = createComponent({
  name: "QPage",
  props: {
    padding: Boolean,
    styleFn: Function
  },
  setup(props, { slots }) {
    const { proxy: { $q } } = getCurrentInstance();
    const $layout = inject(layoutKey, emptyRenderFn);
    if ($layout === emptyRenderFn) {
      console.error("QPage needs to be a deep child of QLayout");
      return emptyRenderFn;
    }
    const $pageContainer = inject(pageContainerKey, emptyRenderFn);
    if ($pageContainer === emptyRenderFn) {
      console.error("QPage needs to be child of QPageContainer");
      return emptyRenderFn;
    }
    const style = computed(() => {
      const offset = ($layout.header.space === true ? $layout.header.size : 0) + ($layout.footer.space === true ? $layout.footer.size : 0);
      if (typeof props.styleFn === "function") {
        const height = $layout.isContainer.value === true ? $layout.containerHeight.value : $q.screen.height;
        return props.styleFn(offset, height);
      }
      return {
        minHeight: $layout.isContainer.value === true ? $layout.containerHeight.value - offset + "px" : $q.screen.height === 0 ? offset !== 0 ? `calc(100vh - ${offset}px)` : "100vh" : $q.screen.height - offset + "px"
      };
    });
    const classes = computed(
      () => `q-page${props.padding === true ? " q-layout-padding" : ""}`
    );
    return () => h("main", {
      class: classes.value,
      style: style.value
    }, hSlot(slots.default));
  }
});
var MarketCard_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$1 = {
  name: "MarketCard",
  props: ["marketInfo"],
  data() {
    return {
      showEditMarket: false,
      showDeleteMarket: false,
      marketName: null,
      marketLogo: null,
      timer: null
    };
  },
  emits: ["fetchMarkets"],
  mounted() {
    this.marketName = this.marketInfo.name;
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
    goToMarketDetailsPage() {
      this.$router.push(`/administration/markets/${this.marketInfo._id}`);
    },
    showEditMarketDialog({ reset }) {
      this.showEditMarket = true;
      this.finalize(reset);
    },
    async editMarket() {
      try {
        let data = new FormData();
        data.append("name", this.marketName);
        data.append("logo", this.marketLogo);
        const res = await this.$api.patch(
          `/markets/${this.marketInfo._id}`,
          data
        );
        if (res.data.status === "success") {
          this.$emit("fetchMarkets");
          this.showEditMarket = false;
        }
      } catch (err) {
        console.log(err);
      }
    },
    showDeleteMarketDialog({ reset }) {
      this.showDeleteMarket = true;
      this.finalize(reset);
    },
    async deleteMarket() {
      try {
        const res = await this.$api.delete(`/markets/${this.marketInfo._id}`);
        if (res.data.status === "success") {
          this.$emit("fetchMarkets");
          this.showDeleteMarket = false;
        }
      } catch (err) {
        console.log(err);
      }
    },
    uploadFile() {
      console.log(this.marketLogo);
    }
  }
};
const _withScopeId$1 = (n) => (pushScopeId("data-v-72cc63a2"), n = n(), popScopeId(), n);
const _hoisted_1$1 = { class: "row items-center" };
const _hoisted_2$1 = { class: "row items-center" };
const _hoisted_3$1 = ["src"];
const _hoisted_4 = { class: "market-card__name" };
const _hoisted_5 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-h6" }, "Edit Market", -1));
const _hoisted_6 = { class: "q-ml-sm" };
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(Fragment, null, [
    createVNode(QSlideItem, {
      onLeft: $options.showEditMarketDialog,
      onRight: $options.showDeleteMarketDialog,
      onClick: $options.goToMarketDetailsPage
    }, {
      left: withCtx(() => [
        createBaseVNode("div", _hoisted_1$1, [
          createVNode(QIcon, {
            left: "",
            name: "edit"
          }),
          createTextVNode(" Edit")
        ])
      ]),
      right: withCtx(() => [
        createBaseVNode("div", _hoisted_2$1, [
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
            createVNode(QItemSection, { avatar: "" }, {
              default: withCtx(() => [
                createVNode(QAvatar, { rounded: "" }, {
                  default: withCtx(() => [
                    createBaseVNode("img", {
                      src: $props.marketInfo.logo
                    }, null, 8, _hoisted_3$1)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            createVNode(QItemSection, null, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_4, toDisplayString($props.marketInfo.name), 1)
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["onLeft", "onRight", "onClick"]),
    createVNode(QDialog, {
      maximized: "",
      modelValue: $data.showEditMarket,
      "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.showEditMarket = $event)
    }, {
      default: withCtx(() => [
        createVNode(QCard, null, {
          default: withCtx(() => [
            createVNode(QCardSection, { class: "row items-center q-pb-none" }, {
              default: withCtx(() => [
                _hoisted_5,
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
                  modelValue: $data.marketName,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.marketName = $event),
                  type: "text",
                  label: "Market Name",
                  class: "q-mb-lg"
                }, null, 8, ["modelValue"]),
                createVNode(QFile, {
                  color: "cyan-9",
                  filled: "",
                  modelValue: $data.marketLogo,
                  "onUpdate:modelValue": [
                    _cache[1] || (_cache[1] = ($event) => $data.marketLogo = $event),
                    $options.uploadFile
                  ],
                  label: "Logo"
                }, {
                  prepend: withCtx(() => [
                    createVNode(QIcon, { name: "cloud_upload" })
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue"])
              ]),
              _: 1
            }),
            createVNode(QBtn, {
              style: { "color": "#267378" },
              onClick: $options.editMarket
            }, {
              default: withCtx(() => [
                createTextVNode("Edit market")
              ]),
              _: 1
            }, 8, ["onClick"])
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["modelValue"]),
    createVNode(QDialog, {
      modelValue: $data.showDeleteMarket,
      "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.showDeleteMarket = $event),
      persistent: ""
    }, {
      default: withCtx(() => [
        createVNode(QCard, null, {
          default: withCtx(() => [
            createVNode(QCardSection, { class: "row items-center" }, {
              default: withCtx(() => [
                createBaseVNode("span", _hoisted_6, "Are you sure you want to delete " + toDisplayString($props.marketInfo.name) + "?", 1)
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
                  onClick: $options.deleteMarket
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
var MarketCard = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__scopeId", "data-v-72cc63a2"], ["__file", "MarketCard.vue"]]);
var MarketsPage_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main = {
  name: "AdministrationPage",
  components: {
    MarketCard
  },
  async mounted() {
    const dashHeader = useDashHeaderStore();
    dashHeader.$patch({ title: "Markets", showBackIcon: true });
    await this.fetchMarkets();
  },
  data() {
    return {
      markets: [],
      showAddMarket: false,
      marketLogo: null,
      marketName: ""
    };
  },
  methods: {
    uploadFile() {
      console.log(this.marketLogo);
    },
    async fetchMarkets() {
      const res = await this.$api.get("/markets");
      this.markets = res.data.data.markets;
    },
    resetFields() {
      this.marketLogo = null;
      this.marketName = "";
    },
    async addMarket() {
      try {
        let data = new FormData();
        data.append("name", this.marketName);
        data.append("logo", this.marketLogo);
        const res = await this.$api.post("/markets", data);
        if (res.data.status === "success") {
          await this.fetchMarkets();
          this.showAddMarket = false;
          this.resetFields();
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
};
const _withScopeId = (n) => (pushScopeId("data-v-8e75ddd2"), n = n(), popScopeId(), n);
const _hoisted_1 = { class: "page-style" };
const _hoisted_2 = { class: "market-card__list" };
const _hoisted_3 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-h6" }, "Add Market", -1));
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_MarketCard = resolveComponent("MarketCard");
  return openBlock(), createBlock(QPage, null, {
    default: withCtx(() => [
      createBaseVNode("div", _hoisted_1, [
        createVNode(QBtn, {
          class: "add-market__btn",
          onClick: _cache[0] || (_cache[0] = ($event) => $data.showAddMarket = true)
        }, {
          default: withCtx(() => [
            createTextVNode("Add Market")
          ]),
          _: 1
        }),
        createBaseVNode("div", _hoisted_2, [
          (openBlock(true), createElementBlock(Fragment, null, renderList($data.markets, (market) => {
            return openBlock(), createBlock(_component_MarketCard, {
              key: market._id,
              marketInfo: market,
              onFetchMarkets: $options.fetchMarkets
            }, null, 8, ["marketInfo", "onFetchMarkets"]);
          }), 128))
        ])
      ]),
      createVNode(QDialog, {
        maximized: "",
        modelValue: $data.showAddMarket,
        "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.showAddMarket = $event)
      }, {
        default: withCtx(() => [
          createVNode(QCard, null, {
            default: withCtx(() => [
              createVNode(QCardSection, { class: "row items-center q-pb-none" }, {
                default: withCtx(() => [
                  _hoisted_3,
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
                    modelValue: $data.marketName,
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.marketName = $event),
                    type: "text",
                    label: "Market Name",
                    class: "q-mb-lg"
                  }, null, 8, ["modelValue"]),
                  createVNode(QFile, {
                    color: "teal",
                    filled: "",
                    modelValue: $data.marketLogo,
                    "onUpdate:modelValue": [
                      _cache[2] || (_cache[2] = ($event) => $data.marketLogo = $event),
                      $options.uploadFile
                    ],
                    label: "Logo"
                  }, {
                    prepend: withCtx(() => [
                      createVNode(QIcon, { name: "cloud_upload" })
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(QBtn, {
                class: "btn",
                onClick: $options.addMarket
              }, {
                default: withCtx(() => [
                  createTextVNode("Add market")
                ]),
                _: 1
              }, 8, ["onClick"])
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["modelValue"])
    ]),
    _: 1
  });
}
var MarketsPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-8e75ddd2"], ["__file", "MarketsPage.vue"]]);
export { MarketsPage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFya2V0c1BhZ2UuMTg4NGQyNWMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWZpbGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2ZpbGUvUUZpbGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3BhZ2UvUVBhZ2UuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9hZG1pbmlzdHJhdGlvbi9NYXJrZXRDYXJkLnZ1ZSIsIi4uLy4uLy4uL3NyYy9wYWdlcy9hZG1pbmlzdHJhdGlvbi9NYXJrZXRzUGFnZS52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaCwgcmVmLCBjb21wdXRlZCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyBjbGllbnQgfSBmcm9tICcuLi8uLi9wbHVnaW5zL1BsYXRmb3JtLmpzJ1xuaW1wb3J0IHsgc3RvcCwgc3RvcEFuZFByZXZlbnQgfSBmcm9tICcuLi8uLi91dGlscy9ldmVudC5qcydcblxuZnVuY3Rpb24gZmlsdGVyRmlsZXMgKGZpbGVzLCByZWplY3RlZEZpbGVzLCBmYWlsZWRQcm9wVmFsaWRhdGlvbiwgZmlsdGVyRm4pIHtcbiAgY29uc3QgYWNjZXB0ZWRGaWxlcyA9IFtdXG5cbiAgZmlsZXMuZm9yRWFjaChmaWxlID0+IHtcbiAgICBpZiAoZmlsdGVyRm4oZmlsZSkgPT09IHRydWUpIHtcbiAgICAgIGFjY2VwdGVkRmlsZXMucHVzaChmaWxlKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJlamVjdGVkRmlsZXMucHVzaCh7IGZhaWxlZFByb3BWYWxpZGF0aW9uLCBmaWxlIH0pXG4gICAgfVxuICB9KVxuXG4gIHJldHVybiBhY2NlcHRlZEZpbGVzXG59XG5cbmZ1bmN0aW9uIHN0b3BBbmRQcmV2ZW50RHJhZyAoZSkge1xuICBlICYmIGUuZGF0YVRyYW5zZmVyICYmIChlLmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gJ2NvcHknKVxuICBzdG9wQW5kUHJldmVudChlKVxufVxuXG5leHBvcnQgY29uc3QgdXNlRmlsZVByb3BzID0ge1xuICBtdWx0aXBsZTogQm9vbGVhbixcbiAgYWNjZXB0OiBTdHJpbmcsXG4gIGNhcHR1cmU6IFN0cmluZyxcbiAgbWF4RmlsZVNpemU6IFsgTnVtYmVyLCBTdHJpbmcgXSxcbiAgbWF4VG90YWxTaXplOiBbIE51bWJlciwgU3RyaW5nIF0sXG4gIG1heEZpbGVzOiBbIE51bWJlciwgU3RyaW5nIF0sXG4gIGZpbHRlcjogRnVuY3Rpb25cbn1cblxuZXhwb3J0IGNvbnN0IHVzZUZpbGVFbWl0cyA9IFsgJ3JlamVjdGVkJyBdXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICh7XG4gIGVkaXRhYmxlLFxuICBkbmQsXG4gIGdldEZpbGVJbnB1dCxcbiAgYWRkRmlsZXNUb1F1ZXVlXG59KSB7XG4gIGNvbnN0IHsgcHJvcHMsIGVtaXQsIHByb3h5IH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuXG4gIGNvbnN0IGRuZFJlZiA9IHJlZihudWxsKVxuXG4gIGNvbnN0IGV4dGVuc2lvbnMgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgcHJvcHMuYWNjZXB0ICE9PSB2b2lkIDBcbiAgICAgID8gcHJvcHMuYWNjZXB0LnNwbGl0KCcsJykubWFwKGV4dCA9PiB7XG4gICAgICAgIGV4dCA9IGV4dC50cmltKClcbiAgICAgICAgaWYgKGV4dCA9PT0gJyonKSB7IC8vIHN1cHBvcnQgXCIqXCJcbiAgICAgICAgICByZXR1cm4gJyovJ1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGV4dC5lbmRzV2l0aCgnLyonKSkgeyAvLyBzdXBwb3J0IFwiaW1hZ2UvKlwiIG9yIFwiKi8qXCJcbiAgICAgICAgICBleHQgPSBleHQuc2xpY2UoMCwgZXh0Lmxlbmd0aCAtIDEpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGV4dC50b1VwcGVyQ2FzZSgpXG4gICAgICB9KVxuICAgICAgOiBudWxsXG4gICkpXG5cbiAgY29uc3QgbWF4RmlsZXNOdW1iZXIgPSBjb21wdXRlZCgoKSA9PiBwYXJzZUludChwcm9wcy5tYXhGaWxlcywgMTApKVxuICBjb25zdCBtYXhUb3RhbFNpemVOdW1iZXIgPSBjb21wdXRlZCgoKSA9PiBwYXJzZUludChwcm9wcy5tYXhUb3RhbFNpemUsIDEwKSlcblxuICBmdW5jdGlvbiBwaWNrRmlsZXMgKGUpIHtcbiAgICBpZiAoZWRpdGFibGUudmFsdWUpIHtcbiAgICAgIGlmIChlICE9PSBPYmplY3QoZSkpIHtcbiAgICAgICAgZSA9IHsgdGFyZ2V0OiBudWxsIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGUudGFyZ2V0ICE9PSBudWxsICYmIGUudGFyZ2V0Lm1hdGNoZXMoJ2lucHV0W3R5cGU9XCJmaWxlXCJdJykgPT09IHRydWUpIHtcbiAgICAgICAgLy8gc3RvcCBwcm9wYWdhdGlvbiBpZiBpdCdzIG5vdCBhIHJlYWwgcG9pbnRlciBldmVudFxuICAgICAgICBlLmNsaWVudFggPT09IDAgJiYgZS5jbGllbnRZID09PSAwICYmIHN0b3AoZSlcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjb25zdCBpbnB1dCA9IGdldEZpbGVJbnB1dCgpXG4gICAgICAgIGlucHV0ICYmIGlucHV0ICE9PSBlLnRhcmdldCAmJiBpbnB1dC5jbGljayhlKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZEZpbGVzIChmaWxlcykge1xuICAgIGlmIChlZGl0YWJsZS52YWx1ZSAmJiBmaWxlcykge1xuICAgICAgYWRkRmlsZXNUb1F1ZXVlKG51bGwsIGZpbGVzKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHByb2Nlc3NGaWxlcyAoZSwgZmlsZXNUb1Byb2Nlc3MsIGN1cnJlbnRGaWxlTGlzdCwgYXBwZW5kKSB7XG4gICAgbGV0IGZpbGVzID0gQXJyYXkuZnJvbShmaWxlc1RvUHJvY2VzcyB8fCBlLnRhcmdldC5maWxlcylcbiAgICBjb25zdCByZWplY3RlZEZpbGVzID0gW11cblxuICAgIGNvbnN0IGRvbmUgPSAoKSA9PiB7XG4gICAgICBpZiAocmVqZWN0ZWRGaWxlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGVtaXQoJ3JlamVjdGVkJywgcmVqZWN0ZWRGaWxlcylcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBmaWx0ZXIgZmlsZSB0eXBlc1xuICAgIGlmIChwcm9wcy5hY2NlcHQgIT09IHZvaWQgMCAmJiBleHRlbnNpb25zLnZhbHVlLmluZGV4T2YoJyovJykgPT09IC0xKSB7XG4gICAgICBmaWxlcyA9IGZpbHRlckZpbGVzKGZpbGVzLCByZWplY3RlZEZpbGVzLCAnYWNjZXB0JywgZmlsZSA9PiB7XG4gICAgICAgIHJldHVybiBleHRlbnNpb25zLnZhbHVlLnNvbWUoZXh0ID0+IChcbiAgICAgICAgICBmaWxlLnR5cGUudG9VcHBlckNhc2UoKS5zdGFydHNXaXRoKGV4dClcbiAgICAgICAgICB8fCBmaWxlLm5hbWUudG9VcHBlckNhc2UoKS5lbmRzV2l0aChleHQpXG4gICAgICAgICkpXG4gICAgICB9KVxuXG4gICAgICBpZiAoZmlsZXMubGVuZ3RoID09PSAwKSB7IHJldHVybiBkb25lKCkgfVxuICAgIH1cblxuICAgIC8vIGZpbHRlciBtYXggZmlsZSBzaXplXG4gICAgaWYgKHByb3BzLm1heEZpbGVTaXplICE9PSB2b2lkIDApIHtcbiAgICAgIGNvbnN0IG1heEZpbGVTaXplID0gcGFyc2VJbnQocHJvcHMubWF4RmlsZVNpemUsIDEwKVxuICAgICAgZmlsZXMgPSBmaWx0ZXJGaWxlcyhmaWxlcywgcmVqZWN0ZWRGaWxlcywgJ21heC1maWxlLXNpemUnLCBmaWxlID0+IHtcbiAgICAgICAgcmV0dXJuIGZpbGUuc2l6ZSA8PSBtYXhGaWxlU2l6ZVxuICAgICAgfSlcblxuICAgICAgaWYgKGZpbGVzLmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gZG9uZSgpIH1cbiAgICB9XG5cbiAgICAvLyBDb3Jkb3ZhL2lPUyBhbGxvd3Mgc2VsZWN0aW5nIG11bHRpcGxlIGZpbGVzIGV2ZW4gd2hlbiB0aGVcbiAgICAvLyBtdWx0aXBsZSBhdHRyaWJ1dGUgaXMgbm90IHNwZWNpZmllZC4gV2UgYWxzbyBub3JtYWxpemUgZHJhZyduJ2Ryb3BwZWRcbiAgICAvLyBmaWxlcyBoZXJlOlxuICAgIGlmIChwcm9wcy5tdWx0aXBsZSAhPT0gdHJ1ZSAmJiBmaWxlcy5sZW5ndGggPiAwKSB7XG4gICAgICBmaWxlcyA9IFsgZmlsZXNbIDAgXSBdXG4gICAgfVxuXG4gICAgLy8gQ29tcHV0ZSBrZXkgdG8gdXNlIGZvciBlYWNoIGZpbGVcbiAgICBmaWxlcy5mb3JFYWNoKGZpbGUgPT4ge1xuICAgICAgZmlsZS5fX2tleSA9IGZpbGUud2Via2l0UmVsYXRpdmVQYXRoICsgZmlsZS5sYXN0TW9kaWZpZWQgKyBmaWxlLm5hbWUgKyBmaWxlLnNpemVcbiAgICB9KVxuXG4gICAgaWYgKGFwcGVuZCA9PT0gdHJ1ZSkge1xuICAgICAgLy8gQXZvaWQgZHVwbGljYXRlIGZpbGVzXG4gICAgICBjb25zdCBmaWxlbmFtZU1hcCA9IGN1cnJlbnRGaWxlTGlzdC5tYXAoZW50cnkgPT4gZW50cnkuX19rZXkpXG4gICAgICBmaWxlcyA9IGZpbHRlckZpbGVzKGZpbGVzLCByZWplY3RlZEZpbGVzLCAnZHVwbGljYXRlJywgZmlsZSA9PiB7XG4gICAgICAgIHJldHVybiBmaWxlbmFtZU1hcC5pbmNsdWRlcyhmaWxlLl9fa2V5KSA9PT0gZmFsc2VcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgaWYgKGZpbGVzLmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gZG9uZSgpIH1cblxuICAgIGlmIChwcm9wcy5tYXhUb3RhbFNpemUgIT09IHZvaWQgMCkge1xuICAgICAgbGV0IHNpemUgPSBhcHBlbmQgPT09IHRydWVcbiAgICAgICAgPyBjdXJyZW50RmlsZUxpc3QucmVkdWNlKCh0b3RhbCwgZmlsZSkgPT4gdG90YWwgKyBmaWxlLnNpemUsIDApXG4gICAgICAgIDogMFxuXG4gICAgICBmaWxlcyA9IGZpbHRlckZpbGVzKGZpbGVzLCByZWplY3RlZEZpbGVzLCAnbWF4LXRvdGFsLXNpemUnLCBmaWxlID0+IHtcbiAgICAgICAgc2l6ZSArPSBmaWxlLnNpemVcbiAgICAgICAgcmV0dXJuIHNpemUgPD0gbWF4VG90YWxTaXplTnVtYmVyLnZhbHVlXG4gICAgICB9KVxuXG4gICAgICBpZiAoZmlsZXMubGVuZ3RoID09PSAwKSB7IHJldHVybiBkb25lKCkgfVxuICAgIH1cblxuICAgIC8vIGRvIHdlIGhhdmUgY3VzdG9tIGZpbHRlciBmdW5jdGlvbj9cbiAgICBpZiAodHlwZW9mIHByb3BzLmZpbHRlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc3QgZmlsdGVyZWRGaWxlcyA9IHByb3BzLmZpbHRlcihmaWxlcylcbiAgICAgIGZpbGVzID0gZmlsdGVyRmlsZXMoZmlsZXMsIHJlamVjdGVkRmlsZXMsICdmaWx0ZXInLCBmaWxlID0+IHtcbiAgICAgICAgcmV0dXJuIGZpbHRlcmVkRmlsZXMuaW5jbHVkZXMoZmlsZSlcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgaWYgKHByb3BzLm1heEZpbGVzICE9PSB2b2lkIDApIHtcbiAgICAgIGxldCBmaWxlc051bWJlciA9IGFwcGVuZCA9PT0gdHJ1ZVxuICAgICAgICA/IGN1cnJlbnRGaWxlTGlzdC5sZW5ndGhcbiAgICAgICAgOiAwXG5cbiAgICAgIGZpbGVzID0gZmlsdGVyRmlsZXMoZmlsZXMsIHJlamVjdGVkRmlsZXMsICdtYXgtZmlsZXMnLCAoKSA9PiB7XG4gICAgICAgIGZpbGVzTnVtYmVyKytcbiAgICAgICAgcmV0dXJuIGZpbGVzTnVtYmVyIDw9IG1heEZpbGVzTnVtYmVyLnZhbHVlXG4gICAgICB9KVxuXG4gICAgICBpZiAoZmlsZXMubGVuZ3RoID09PSAwKSB7IHJldHVybiBkb25lKCkgfVxuICAgIH1cblxuICAgIGRvbmUoKVxuXG4gICAgaWYgKGZpbGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiBmaWxlc1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uRHJhZ292ZXIgKGUpIHtcbiAgICBzdG9wQW5kUHJldmVudERyYWcoZSlcbiAgICBkbmQudmFsdWUgIT09IHRydWUgJiYgKGRuZC52YWx1ZSA9IHRydWUpXG4gIH1cblxuICBmdW5jdGlvbiBvbkRyYWdsZWF2ZSAoZSkge1xuICAgIHN0b3BBbmRQcmV2ZW50KGUpXG5cbiAgICAvLyBTYWZhcmkgYnVnOiByZWxhdGVkVGFyZ2V0IGlzIG51bGwgZm9yIG92ZXIgMTAgeWVhcnNcbiAgICAvLyBodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9NjY1NDdcbiAgICBjb25zdCBnb25lID0gZS5yZWxhdGVkVGFyZ2V0ICE9PSBudWxsIHx8IGNsaWVudC5pcy5zYWZhcmkgIT09IHRydWVcbiAgICAgID8gZS5yZWxhdGVkVGFyZ2V0ICE9PSBkbmRSZWYudmFsdWVcbiAgICAgIDogZG9jdW1lbnQuZWxlbWVudHNGcm9tUG9pbnQoZS5jbGllbnRYLCBlLmNsaWVudFkpLmluY2x1ZGVzKGRuZFJlZi52YWx1ZSkgPT09IGZhbHNlXG5cbiAgICBnb25lID09PSB0cnVlICYmIChkbmQudmFsdWUgPSBmYWxzZSlcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uRHJvcCAoZSkge1xuICAgIHN0b3BBbmRQcmV2ZW50RHJhZyhlKVxuICAgIGNvbnN0IGZpbGVzID0gZS5kYXRhVHJhbnNmZXIuZmlsZXNcblxuICAgIGlmIChmaWxlcy5sZW5ndGggPiAwKSB7XG4gICAgICBhZGRGaWxlc1RvUXVldWUobnVsbCwgZmlsZXMpXG4gICAgfVxuXG4gICAgZG5kLnZhbHVlID0gZmFsc2VcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldERuZE5vZGUgKHR5cGUpIHtcbiAgICBpZiAoZG5kLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgICByZWY6IGRuZFJlZixcbiAgICAgICAgY2xhc3M6IGBxLSR7IHR5cGUgfV9fZG5kIGFic29sdXRlLWZ1bGxgLFxuICAgICAgICBvbkRyYWdlbnRlcjogc3RvcEFuZFByZXZlbnREcmFnLFxuICAgICAgICBvbkRyYWdvdmVyOiBzdG9wQW5kUHJldmVudERyYWcsXG4gICAgICAgIG9uRHJhZ2xlYXZlLFxuICAgICAgICBvbkRyb3BcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgLy8gZXhwb3NlIHB1YmxpYyBtZXRob2RzXG4gIE9iamVjdC5hc3NpZ24ocHJveHksIHsgcGlja0ZpbGVzLCBhZGRGaWxlcyB9KVxuXG4gIHJldHVybiB7XG4gICAgcGlja0ZpbGVzLFxuICAgIGFkZEZpbGVzLFxuICAgIG9uRHJhZ292ZXIsXG4gICAgb25EcmFnbGVhdmUsXG4gICAgcHJvY2Vzc0ZpbGVzLFxuICAgIGdldERuZE5vZGUsXG5cbiAgICBtYXhGaWxlc051bWJlcixcbiAgICBtYXhUb3RhbFNpemVOdW1iZXJcbiAgfVxufVxuIiwiaW1wb3J0IHsgaCwgcmVmLCBjb21wdXRlZCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgUUNoaXAgZnJvbSAnLi4vY2hpcC9RQ2hpcC5qcydcblxuaW1wb3J0IHVzZUZpZWxkLCB7IHVzZUZpZWxkU3RhdGUsIHVzZUZpZWxkUHJvcHMsIHVzZUZpZWxkRW1pdHMsIGZpZWxkVmFsdWVJc0ZpbGxlZCB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWZpZWxkLmpzJ1xuaW1wb3J0IHsgdXNlRm9ybVByb3BzLCB1c2VGb3JtSW5wdXROYW1lQXR0ciB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWZvcm0uanMnXG5pbXBvcnQgdXNlRmlsZSwgeyB1c2VGaWxlUHJvcHMsIHVzZUZpbGVFbWl0cyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWZpbGUuanMnXG5pbXBvcnQgdXNlRmlsZUZvcm1Eb21Qcm9wcyBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1maWxlLWRvbS1wcm9wcy5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBodW1hblN0b3JhZ2VTaXplIH0gZnJvbSAnLi4vLi4vdXRpbHMvZm9ybWF0LmpzJ1xuaW1wb3J0IHsgcHJldmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL2V2ZW50LmpzJ1xuaW1wb3J0IHsgaW5qZWN0UHJvcCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvaW5qZWN0LW9iai1wcm9wLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUUZpbGUnLFxuXG4gIGluaGVyaXRBdHRyczogZmFsc2UsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VGaWVsZFByb3BzLFxuICAgIC4uLnVzZUZvcm1Qcm9wcyxcbiAgICAuLi51c2VGaWxlUHJvcHMsXG5cbiAgICAvKiBTU1IgZG9lcyBub3Qga25vdyBhYm91dCBGaWxlICYgRmlsZUxpc3QgKi9cbiAgICBtb2RlbFZhbHVlOiBfX1FVQVNBUl9TU1JfU0VSVkVSX19cbiAgICAgID8ge31cbiAgICAgIDogWyBGaWxlLCBGaWxlTGlzdCwgQXJyYXkgXSxcblxuICAgIGFwcGVuZDogQm9vbGVhbixcbiAgICB1c2VDaGlwczogQm9vbGVhbixcbiAgICBkaXNwbGF5VmFsdWU6IFsgU3RyaW5nLCBOdW1iZXIgXSxcblxuICAgIHRhYmluZGV4OiB7XG4gICAgICB0eXBlOiBbIFN0cmluZywgTnVtYmVyIF0sXG4gICAgICBkZWZhdWx0OiAwXG4gICAgfSxcblxuICAgIGNvdW50ZXJMYWJlbDogRnVuY3Rpb24sXG5cbiAgICBpbnB1dENsYXNzOiBbIEFycmF5LCBTdHJpbmcsIE9iamVjdCBdLFxuICAgIGlucHV0U3R5bGU6IFsgQXJyYXksIFN0cmluZywgT2JqZWN0IF1cbiAgfSxcblxuICBlbWl0czogW1xuICAgIC4uLnVzZUZpZWxkRW1pdHMsXG4gICAgLi4udXNlRmlsZUVtaXRzXG4gIF0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzLCBlbWl0LCBhdHRycyB9KSB7XG4gICAgY29uc3QgeyBwcm94eSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICAgIGNvbnN0IHN0YXRlID0gdXNlRmllbGRTdGF0ZSgpXG5cbiAgICBjb25zdCBpbnB1dFJlZiA9IHJlZihudWxsKVxuICAgIGNvbnN0IGRuZCA9IHJlZihmYWxzZSlcbiAgICBjb25zdCBuYW1lUHJvcCA9IHVzZUZvcm1JbnB1dE5hbWVBdHRyKHByb3BzKVxuXG4gICAgY29uc3Qge1xuICAgICAgcGlja0ZpbGVzLFxuICAgICAgb25EcmFnb3ZlcixcbiAgICAgIG9uRHJhZ2xlYXZlLFxuICAgICAgcHJvY2Vzc0ZpbGVzLFxuICAgICAgZ2V0RG5kTm9kZVxuICAgIH0gPSB1c2VGaWxlKHsgZWRpdGFibGU6IHN0YXRlLmVkaXRhYmxlLCBkbmQsIGdldEZpbGVJbnB1dCwgYWRkRmlsZXNUb1F1ZXVlIH0pXG5cbiAgICBjb25zdCBmb3JtRG9tUHJvcHMgPSB1c2VGaWxlRm9ybURvbVByb3BzKHByb3BzKVxuXG4gICAgY29uc3QgaW5uZXJWYWx1ZSA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIE9iamVjdChwcm9wcy5tb2RlbFZhbHVlKSA9PT0gcHJvcHMubW9kZWxWYWx1ZVxuICAgICAgICA/ICgnbGVuZ3RoJyBpbiBwcm9wcy5tb2RlbFZhbHVlID8gQXJyYXkuZnJvbShwcm9wcy5tb2RlbFZhbHVlKSA6IFsgcHJvcHMubW9kZWxWYWx1ZSBdKVxuICAgICAgICA6IFtdXG4gICAgKSlcblxuICAgIGNvbnN0IGhhc1ZhbHVlID0gY29tcHV0ZWQoKCkgPT4gZmllbGRWYWx1ZUlzRmlsbGVkKGlubmVyVmFsdWUudmFsdWUpKVxuXG4gICAgY29uc3Qgc2VsZWN0ZWRTdHJpbmcgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgaW5uZXJWYWx1ZS52YWx1ZVxuICAgICAgICAubWFwKGZpbGUgPT4gZmlsZS5uYW1lKVxuICAgICAgICAuam9pbignLCAnKVxuICAgIClcblxuICAgIGNvbnN0IHRvdGFsU2l6ZSA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBodW1hblN0b3JhZ2VTaXplKFxuICAgICAgICBpbm5lclZhbHVlLnZhbHVlLnJlZHVjZSgoYWNjLCBmaWxlKSA9PiBhY2MgKyBmaWxlLnNpemUsIDApXG4gICAgICApXG4gICAgKVxuXG4gICAgY29uc3QgY291bnRlclByb3BzID0gY29tcHV0ZWQoKCkgPT4gKHtcbiAgICAgIHRvdGFsU2l6ZTogdG90YWxTaXplLnZhbHVlLFxuICAgICAgZmlsZXNOdW1iZXI6IGlubmVyVmFsdWUudmFsdWUubGVuZ3RoLFxuICAgICAgbWF4RmlsZXM6IHByb3BzLm1heEZpbGVzXG4gICAgfSkpXG5cbiAgICBjb25zdCBpbnB1dEF0dHJzID0gY29tcHV0ZWQoKCkgPT4gKHtcbiAgICAgIHRhYmluZGV4OiAtMSxcbiAgICAgIHR5cGU6ICdmaWxlJyxcbiAgICAgIHRpdGxlOiAnJywgLy8gdHJ5IHRvIHJlbW92ZSBkZWZhdWx0IHRvb2x0aXAsXG4gICAgICBhY2NlcHQ6IHByb3BzLmFjY2VwdCxcbiAgICAgIGNhcHR1cmU6IHByb3BzLmNhcHR1cmUsXG4gICAgICBuYW1lOiBuYW1lUHJvcC52YWx1ZSxcbiAgICAgIC4uLmF0dHJzLFxuICAgICAgaWQ6IHN0YXRlLnRhcmdldFVpZC52YWx1ZSxcbiAgICAgIGRpc2FibGVkOiBzdGF0ZS5lZGl0YWJsZS52YWx1ZSAhPT0gdHJ1ZVxuICAgIH0pKVxuXG4gICAgY29uc3QgZmllbGRDbGFzcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAncS1maWxlIHEtZmllbGQtLWF1dG8taGVpZ2h0J1xuICAgICAgKyAoZG5kLnZhbHVlID09PSB0cnVlID8gJyBxLWZpbGUtLWRuZCcgOiAnJylcbiAgICApXG5cbiAgICBjb25zdCBpc0FwcGVuZGluZyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBwcm9wcy5tdWx0aXBsZSA9PT0gdHJ1ZSAmJiBwcm9wcy5hcHBlbmQgPT09IHRydWVcbiAgICApXG5cbiAgICBmdW5jdGlvbiByZW1vdmVBdEluZGV4IChpbmRleCkge1xuICAgICAgY29uc3QgZmlsZXMgPSBpbm5lclZhbHVlLnZhbHVlLnNsaWNlKClcbiAgICAgIGZpbGVzLnNwbGljZShpbmRleCwgMSlcbiAgICAgIGVtaXRWYWx1ZShmaWxlcylcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW1vdmVGaWxlIChmaWxlKSB7XG4gICAgICBjb25zdCBpbmRleCA9IGlubmVyVmFsdWUudmFsdWUuZmluZEluZGV4KGZpbGUpXG4gICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICByZW1vdmVBdEluZGV4KGluZGV4KVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVtaXRWYWx1ZSAoZmlsZXMpIHtcbiAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgcHJvcHMubXVsdGlwbGUgPT09IHRydWUgPyBmaWxlcyA6IGZpbGVzWyAwIF0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25LZXlkb3duIChlKSB7XG4gICAgICAvLyBwcmV2ZW50IGZvcm0gc3VibWl0IGlmIEVOVEVSIGlzIHByZXNzZWRcbiAgICAgIGUua2V5Q29kZSA9PT0gMTMgJiYgcHJldmVudChlKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uS2V5dXAgKGUpIHtcbiAgICAgIC8vIG9ubHkgb24gRU5URVIgYW5kIFNQQUNFIHRvIG1hdGNoIG5hdGl2ZSBpbnB1dCBmaWVsZFxuICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMTMgfHwgZS5rZXlDb2RlID09PSAzMikge1xuICAgICAgICBwaWNrRmlsZXMoZSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRGaWxlSW5wdXQgKCkge1xuICAgICAgcmV0dXJuIGlucHV0UmVmLnZhbHVlXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkRmlsZXNUb1F1ZXVlIChlLCBmaWxlTGlzdCkge1xuICAgICAgY29uc3QgZmlsZXMgPSBwcm9jZXNzRmlsZXMoZSwgZmlsZUxpc3QsIGlubmVyVmFsdWUudmFsdWUsIGlzQXBwZW5kaW5nLnZhbHVlKVxuICAgICAgY29uc3QgZmlsZUlucHV0ID0gZ2V0RmlsZUlucHV0KClcblxuICAgICAgaWYgKGZpbGVJbnB1dCAhPT0gdm9pZCAwICYmIGZpbGVJbnB1dCAhPT0gbnVsbCkge1xuICAgICAgICBmaWxlSW5wdXQudmFsdWUgPSAnJ1xuICAgICAgfVxuXG4gICAgICAvLyBpZiBub3RoaW5nIHRvIGRvLi4uXG4gICAgICBpZiAoZmlsZXMgPT09IHZvaWQgMCkgeyByZXR1cm4gfVxuXG4gICAgICAvLyBwcm90ZWN0IGFnYWluc3QgaW5wdXQgQGNoYW5nZSBiZWluZyBjYWxsZWQgaW4gYSBsb29wXG4gICAgICAvLyBsaWtlIGl0IGhhcHBlbnMgb24gU2FmYXJpLCBzbyBkb24ndCBlbWl0IHNhbWUgdGhpbmc6XG4gICAgICBpZiAoXG4gICAgICAgIHByb3BzLm11bHRpcGxlID09PSB0cnVlXG4gICAgICAgICAgPyBwcm9wcy5tb2RlbFZhbHVlICYmIGZpbGVzLmV2ZXJ5KGYgPT4gaW5uZXJWYWx1ZS52YWx1ZS5pbmNsdWRlcyhmKSlcbiAgICAgICAgICA6IHByb3BzLm1vZGVsVmFsdWUgPT09IGZpbGVzWyAwIF1cbiAgICAgICkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgZW1pdFZhbHVlKFxuICAgICAgICBpc0FwcGVuZGluZy52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAgID8gaW5uZXJWYWx1ZS52YWx1ZS5jb25jYXQoZmlsZXMpXG4gICAgICAgICAgOiBmaWxlc1xuICAgICAgKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEZpbGxlciAoKSB7XG4gICAgICByZXR1cm4gW1xuICAgICAgICBoKCdpbnB1dCcsIHtcbiAgICAgICAgICBjbGFzczogWyBwcm9wcy5pbnB1dENsYXNzLCAncS1maWxlX19maWxsZXInIF0sXG4gICAgICAgICAgc3R5bGU6IHByb3BzLmlucHV0U3R5bGVcbiAgICAgICAgfSlcbiAgICAgIF1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRTZWxlY3Rpb24gKCkge1xuICAgICAgaWYgKHNsb3RzLmZpbGUgIT09IHZvaWQgMCkge1xuICAgICAgICByZXR1cm4gaW5uZXJWYWx1ZS52YWx1ZS5sZW5ndGggPT09IDBcbiAgICAgICAgICA/IGdldEZpbGxlcigpXG4gICAgICAgICAgOiBpbm5lclZhbHVlLnZhbHVlLm1hcChcbiAgICAgICAgICAgIChmaWxlLCBpbmRleCkgPT4gc2xvdHMuZmlsZSh7IGluZGV4LCBmaWxlLCByZWY6IHRoaXMgfSlcbiAgICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIGlmIChzbG90cy5zZWxlY3RlZCAhPT0gdm9pZCAwKSB7XG4gICAgICAgIHJldHVybiBpbm5lclZhbHVlLnZhbHVlLmxlbmd0aCA9PT0gMFxuICAgICAgICAgID8gZ2V0RmlsbGVyKClcbiAgICAgICAgICA6IHNsb3RzLnNlbGVjdGVkKHsgZmlsZXM6IGlubmVyVmFsdWUudmFsdWUsIHJlZjogdGhpcyB9KVxuICAgICAgfVxuXG4gICAgICBpZiAocHJvcHMudXNlQ2hpcHMgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIGlubmVyVmFsdWUudmFsdWUubGVuZ3RoID09PSAwXG4gICAgICAgICAgPyBnZXRGaWxsZXIoKVxuICAgICAgICAgIDogaW5uZXJWYWx1ZS52YWx1ZS5tYXAoKGZpbGUsIGkpID0+IGgoUUNoaXAsIHtcbiAgICAgICAgICAgIGtleTogJ2ZpbGUtJyArIGksXG4gICAgICAgICAgICByZW1vdmFibGU6IHN0YXRlLmVkaXRhYmxlLnZhbHVlLFxuICAgICAgICAgICAgZGVuc2U6IHRydWUsXG4gICAgICAgICAgICB0ZXh0Q29sb3I6IHByb3BzLmNvbG9yLFxuICAgICAgICAgICAgdGFiaW5kZXg6IHByb3BzLnRhYmluZGV4LFxuICAgICAgICAgICAgb25SZW1vdmU6ICgpID0+IHsgcmVtb3ZlQXRJbmRleChpKSB9XG4gICAgICAgICAgfSwgKCkgPT4gaCgnc3BhbicsIHtcbiAgICAgICAgICAgIGNsYXNzOiAnZWxsaXBzaXMnLFxuICAgICAgICAgICAgdGV4dENvbnRlbnQ6IGZpbGUubmFtZVxuICAgICAgICAgIH0pKSlcbiAgICAgIH1cblxuICAgICAgY29uc3QgdGV4dENvbnRlbnQgPSBwcm9wcy5kaXNwbGF5VmFsdWUgIT09IHZvaWQgMFxuICAgICAgICA/IHByb3BzLmRpc3BsYXlWYWx1ZVxuICAgICAgICA6IHNlbGVjdGVkU3RyaW5nLnZhbHVlXG5cbiAgICAgIHJldHVybiB0ZXh0Q29udGVudC5sZW5ndGggPiAwXG4gICAgICAgID8gW1xuICAgICAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgICAgICBjbGFzczogcHJvcHMuaW5wdXRDbGFzcyxcbiAgICAgICAgICAgICAgc3R5bGU6IHByb3BzLmlucHV0U3R5bGUsXG4gICAgICAgICAgICAgIHRleHRDb250ZW50XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIF1cbiAgICAgICAgOiBnZXRGaWxsZXIoKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldElucHV0ICgpIHtcbiAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgIHJlZjogaW5wdXRSZWYsXG4gICAgICAgIC4uLmlucHV0QXR0cnMudmFsdWUsXG4gICAgICAgIC4uLmZvcm1Eb21Qcm9wcy52YWx1ZSxcbiAgICAgICAgY2xhc3M6ICdxLWZpZWxkX19pbnB1dCBmaXQgYWJzb2x1dGUtZnVsbCBjdXJzb3ItcG9pbnRlcicsXG4gICAgICAgIG9uQ2hhbmdlOiBhZGRGaWxlc1RvUXVldWVcbiAgICAgIH1cblxuICAgICAgaWYgKHByb3BzLm11bHRpcGxlID09PSB0cnVlKSB7XG4gICAgICAgIGRhdGEubXVsdGlwbGUgPSB0cnVlXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBoKCdpbnB1dCcsIGRhdGEpXG4gICAgfVxuXG4gICAgT2JqZWN0LmFzc2lnbihzdGF0ZSwge1xuICAgICAgZmllbGRDbGFzcyxcbiAgICAgIGVtaXRWYWx1ZSxcbiAgICAgIGhhc1ZhbHVlLFxuICAgICAgaW5wdXRSZWYsXG4gICAgICBpbm5lclZhbHVlLFxuXG4gICAgICBmbG9hdGluZ0xhYmVsOiBjb21wdXRlZCgoKSA9PlxuICAgICAgICBoYXNWYWx1ZS52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICB8fCBmaWVsZFZhbHVlSXNGaWxsZWQocHJvcHMuZGlzcGxheVZhbHVlKVxuICAgICAgKSxcblxuICAgICAgY29tcHV0ZWRDb3VudGVyOiBjb21wdXRlZCgoKSA9PiB7XG4gICAgICAgIGlmIChwcm9wcy5jb3VudGVyTGFiZWwgIT09IHZvaWQgMCkge1xuICAgICAgICAgIHJldHVybiBwcm9wcy5jb3VudGVyTGFiZWwoY291bnRlclByb3BzLnZhbHVlKVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbWF4ID0gcHJvcHMubWF4RmlsZXNcbiAgICAgICAgcmV0dXJuIGAkeyBpbm5lclZhbHVlLnZhbHVlLmxlbmd0aCB9JHsgbWF4ICE9PSB2b2lkIDAgPyAnIC8gJyArIG1heCA6ICcnIH0gKCR7IHRvdGFsU2l6ZS52YWx1ZSB9KWBcbiAgICAgIH0pLFxuXG4gICAgICBnZXRDb250cm9sQ2hpbGQ6ICgpID0+IGdldERuZE5vZGUoJ2ZpbGUnKSxcbiAgICAgIGdldENvbnRyb2w6ICgpID0+IHtcbiAgICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgICByZWY6IHN0YXRlLnRhcmdldFJlZixcbiAgICAgICAgICBjbGFzczogJ3EtZmllbGRfX25hdGl2ZSByb3cgaXRlbXMtY2VudGVyIGN1cnNvci1wb2ludGVyJyxcbiAgICAgICAgICB0YWJpbmRleDogcHJvcHMudGFiaW5kZXhcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdGF0ZS5lZGl0YWJsZS52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIE9iamVjdC5hc3NpZ24oZGF0YSwgeyBvbkRyYWdvdmVyLCBvbkRyYWdsZWF2ZSwgb25LZXlkb3duLCBvbktleXVwIH0pXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaCgnZGl2JywgZGF0YSwgWyBnZXRJbnB1dCgpIF0uY29uY2F0KGdldFNlbGVjdGlvbigpKSlcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgLy8gZXhwb3NlIHB1YmxpYyBtZXRob2RzXG4gICAgT2JqZWN0LmFzc2lnbihwcm94eSwge1xuICAgICAgcmVtb3ZlQXRJbmRleCxcbiAgICAgIHJlbW92ZUZpbGUsXG4gICAgICBnZXROYXRpdmVFbGVtZW50OiAoKSA9PiBpbnB1dFJlZi52YWx1ZSAvLyBkZXByZWNhdGVkXG4gICAgfSlcblxuICAgIGluamVjdFByb3AocHJveHksICduYXRpdmVFbCcsICgpID0+IGlucHV0UmVmLnZhbHVlKVxuXG4gICAgcmV0dXJuIHVzZUZpZWxkKHN0YXRlKVxuICB9XG59KVxuIiwiaW1wb3J0IHsgaCwgY29tcHV0ZWQsIGluamVjdCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGhTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9yZW5kZXIuanMnXG5pbXBvcnQgeyBwYWdlQ29udGFpbmVyS2V5LCBsYXlvdXRLZXksIGVtcHR5UmVuZGVyRm4gfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3N5bWJvbHMuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRUGFnZScsXG5cbiAgcHJvcHM6IHtcbiAgICBwYWRkaW5nOiBCb29sZWFuLFxuICAgIHN0eWxlRm46IEZ1bmN0aW9uXG4gIH0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzIH0pIHtcbiAgICBjb25zdCB7IHByb3h5OiB7ICRxIH0gfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG5cbiAgICBjb25zdCAkbGF5b3V0ID0gaW5qZWN0KGxheW91dEtleSwgZW1wdHlSZW5kZXJGbilcbiAgICBpZiAoJGxheW91dCA9PT0gZW1wdHlSZW5kZXJGbikge1xuICAgICAgY29uc29sZS5lcnJvcignUVBhZ2UgbmVlZHMgdG8gYmUgYSBkZWVwIGNoaWxkIG9mIFFMYXlvdXQnKVxuICAgICAgcmV0dXJuIGVtcHR5UmVuZGVyRm5cbiAgICB9XG5cbiAgICBjb25zdCAkcGFnZUNvbnRhaW5lciA9IGluamVjdChwYWdlQ29udGFpbmVyS2V5LCBlbXB0eVJlbmRlckZuKVxuICAgIGlmICgkcGFnZUNvbnRhaW5lciA9PT0gZW1wdHlSZW5kZXJGbikge1xuICAgICAgY29uc29sZS5lcnJvcignUVBhZ2UgbmVlZHMgdG8gYmUgY2hpbGQgb2YgUVBhZ2VDb250YWluZXInKVxuICAgICAgcmV0dXJuIGVtcHR5UmVuZGVyRm5cbiAgICB9XG5cbiAgICBjb25zdCBzdHlsZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IG9mZnNldFxuICAgICAgICA9ICgkbGF5b3V0LmhlYWRlci5zcGFjZSA9PT0gdHJ1ZSA/ICRsYXlvdXQuaGVhZGVyLnNpemUgOiAwKVxuICAgICAgICArICgkbGF5b3V0LmZvb3Rlci5zcGFjZSA9PT0gdHJ1ZSA/ICRsYXlvdXQuZm9vdGVyLnNpemUgOiAwKVxuXG4gICAgICBpZiAodHlwZW9mIHByb3BzLnN0eWxlRm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gJGxheW91dC5pc0NvbnRhaW5lci52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAgID8gJGxheW91dC5jb250YWluZXJIZWlnaHQudmFsdWVcbiAgICAgICAgICA6ICRxLnNjcmVlbi5oZWlnaHRcblxuICAgICAgICByZXR1cm4gcHJvcHMuc3R5bGVGbihvZmZzZXQsIGhlaWdodClcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbWluSGVpZ2h0OiAkbGF5b3V0LmlzQ29udGFpbmVyLnZhbHVlID09PSB0cnVlXG4gICAgICAgICAgPyAoJGxheW91dC5jb250YWluZXJIZWlnaHQudmFsdWUgLSBvZmZzZXQpICsgJ3B4J1xuICAgICAgICAgIDogKFxuICAgICAgICAgICAgICAkcS5zY3JlZW4uaGVpZ2h0ID09PSAwXG4gICAgICAgICAgICAgICAgPyAob2Zmc2V0ICE9PSAwID8gYGNhbGMoMTAwdmggLSAkeyBvZmZzZXQgfXB4KWAgOiAnMTAwdmgnKVxuICAgICAgICAgICAgICAgIDogKCRxLnNjcmVlbi5oZWlnaHQgLSBvZmZzZXQpICsgJ3B4J1xuICAgICAgICAgICAgKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIGBxLXBhZ2UkeyBwcm9wcy5wYWRkaW5nID09PSB0cnVlID8gJyBxLWxheW91dC1wYWRkaW5nJyA6ICcnIH1gXG4gICAgKVxuXG4gICAgcmV0dXJuICgpID0+IGgoJ21haW4nLCB7XG4gICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZSxcbiAgICAgIHN0eWxlOiBzdHlsZS52YWx1ZVxuICAgIH0sIGhTbG90KHNsb3RzLmRlZmF1bHQpKVxuICB9XG59KVxuIiwiPHRlbXBsYXRlPlxyXG4gIDxxLXNsaWRlLWl0ZW1cclxuICAgIEBsZWZ0PVwic2hvd0VkaXRNYXJrZXREaWFsb2dcIlxyXG4gICAgQHJpZ2h0PVwic2hvd0RlbGV0ZU1hcmtldERpYWxvZ1wiXHJcbiAgICBAY2xpY2s9XCJnb1RvTWFya2V0RGV0YWlsc1BhZ2VcIlxyXG4gID5cclxuICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6bGVmdD5cclxuICAgICAgPGRpdiBjbGFzcz1cInJvdyBpdGVtcy1jZW50ZXJcIj48cS1pY29uIGxlZnQgbmFtZT1cImVkaXRcIiAvPiBFZGl0PC9kaXY+XHJcbiAgICA8L3RlbXBsYXRlPlxyXG4gICAgPHRlbXBsYXRlIHYtc2xvdDpyaWdodD5cclxuICAgICAgPGRpdiBjbGFzcz1cInJvdyBpdGVtcy1jZW50ZXJcIj5EZWxldGUgPHEtaWNvbiByaWdodCBuYW1lPVwiZGVsZXRlXCIgLz48L2Rpdj5cclxuICAgIDwvdGVtcGxhdGU+XHJcblxyXG4gICAgPHEtaXRlbT5cclxuICAgICAgPHEtaXRlbS1zZWN0aW9uIGF2YXRhcj5cclxuICAgICAgICA8cS1hdmF0YXIgcm91bmRlZD5cclxuICAgICAgICAgIDxpbWcgOnNyYz1cIm1hcmtldEluZm8ubG9nb1wiIC8+XHJcbiAgICAgICAgPC9xLWF2YXRhcj5cclxuICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cclxuICAgICAgPHEtaXRlbS1zZWN0aW9uXHJcbiAgICAgICAgPjxkaXYgY2xhc3M9XCJtYXJrZXQtY2FyZF9fbmFtZVwiPlxyXG4gICAgICAgICAge3sgbWFya2V0SW5mby5uYW1lIH19XHJcbiAgICAgICAgPC9kaXY+PC9xLWl0ZW0tc2VjdGlvblxyXG4gICAgICA+XHJcbiAgICA8L3EtaXRlbT5cclxuICA8L3Etc2xpZGUtaXRlbT5cclxuICA8cS1kaWFsb2cgbWF4aW1pemVkIHYtbW9kZWw9XCJzaG93RWRpdE1hcmtldFwiPlxyXG4gICAgPHEtY2FyZD5cclxuICAgICAgPHEtY2FyZC1zZWN0aW9uIGNsYXNzPVwicm93IGl0ZW1zLWNlbnRlciBxLXBiLW5vbmVcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNlwiPkVkaXQgTWFya2V0PC9kaXY+XHJcbiAgICAgICAgPHEtc3BhY2UgLz5cclxuICAgICAgICA8cS1idG4gaWNvbj1cImNsb3NlXCIgZmxhdCByb3VuZCBkZW5zZSB2LWNsb3NlLXBvcHVwIC8+XHJcbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XHJcblxyXG4gICAgICA8cS1jYXJkLXNlY3Rpb24+XHJcbiAgICAgICAgPHEtaW5wdXRcclxuICAgICAgICAgIHYtbW9kZWw9XCJtYXJrZXROYW1lXCJcclxuICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgIGxhYmVsPVwiTWFya2V0IE5hbWVcIlxyXG4gICAgICAgICAgY2xhc3M9XCJxLW1iLWxnXCJcclxuICAgICAgICAvPlxyXG4gICAgICAgIDxxLWZpbGVcclxuICAgICAgICAgIGNvbG9yPVwiY3lhbi05XCJcclxuICAgICAgICAgIGZpbGxlZFxyXG4gICAgICAgICAgdi1tb2RlbD1cIm1hcmtldExvZ29cIlxyXG4gICAgICAgICAgbGFiZWw9XCJMb2dvXCJcclxuICAgICAgICAgIEB1cGRhdGU6bW9kZWwtdmFsdWU9XCJ1cGxvYWRGaWxlXCJcclxuICAgICAgICA+XHJcbiAgICAgICAgICA8dGVtcGxhdGUgdi1zbG90OnByZXBlbmQ+XHJcbiAgICAgICAgICAgIDxxLWljb24gbmFtZT1cImNsb3VkX3VwbG9hZFwiIC8+XHJcbiAgICAgICAgICA8L3RlbXBsYXRlPlxyXG4gICAgICAgIDwvcS1maWxlPlxyXG4gICAgICA8L3EtY2FyZC1zZWN0aW9uPlxyXG4gICAgICA8cS1idG4gc3R5bGU9XCJjb2xvcjogIzI2NzM3OFwiIEBjbGljaz1cImVkaXRNYXJrZXRcIj5FZGl0IG1hcmtldDwvcS1idG4+XHJcbiAgICA8L3EtY2FyZD5cclxuICA8L3EtZGlhbG9nPlxyXG4gIDxxLWRpYWxvZyB2LW1vZGVsPVwic2hvd0RlbGV0ZU1hcmtldFwiIHBlcnNpc3RlbnQ+XHJcbiAgICA8cS1jYXJkPlxyXG4gICAgICA8cS1jYXJkLXNlY3Rpb24gY2xhc3M9XCJyb3cgaXRlbXMtY2VudGVyXCI+XHJcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJxLW1sLXNtXCJcclxuICAgICAgICAgID5BcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIHt7IG1hcmtldEluZm8ubmFtZSB9fT88L3NwYW5cclxuICAgICAgICA+XHJcbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XHJcblxyXG4gICAgICA8cS1jYXJkLWFjdGlvbnMgYWxpZ249XCJyaWdodFwiPlxyXG4gICAgICAgIDxxLWJ0biBmbGF0IGxhYmVsPVwiQ2FuY2VsXCIgY29sb3I9XCJwcmltYXJ5XCIgdi1jbG9zZS1wb3B1cCAvPlxyXG4gICAgICAgIDxxLWJ0biBmbGF0IGxhYmVsPVwiRGVsZXRlXCIgY29sb3I9XCJyZWRcIiBAY2xpY2s9XCJkZWxldGVNYXJrZXRcIiAvPlxyXG4gICAgICA8L3EtY2FyZC1hY3Rpb25zPlxyXG4gICAgPC9xLWNhcmQ+XHJcbiAgPC9xLWRpYWxvZz5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBuYW1lOiBcIk1hcmtldENhcmRcIixcclxuICBwcm9wczogW1wibWFya2V0SW5mb1wiXSxcclxuICBkYXRhKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc2hvd0VkaXRNYXJrZXQ6IGZhbHNlLFxyXG4gICAgICBzaG93RGVsZXRlTWFya2V0OiBmYWxzZSxcclxuICAgICAgbWFya2V0TmFtZTogbnVsbCxcclxuICAgICAgbWFya2V0TG9nbzogbnVsbCxcclxuICAgICAgdGltZXI6IG51bGwsXHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgZW1pdHM6IFtcImZldGNoTWFya2V0c1wiXSxcclxuICBtb3VudGVkKCkge1xyXG4gICAgdGhpcy5tYXJrZXROYW1lID0gdGhpcy5tYXJrZXRJbmZvLm5hbWU7XHJcbiAgfSxcclxuICBiZWZvcmVVbm1vdW50KCkge1xyXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZXIpO1xyXG4gIH0sXHJcbiAgbWV0aG9kczoge1xyXG4gICAgZmluYWxpemUocmVzZXQpIHtcclxuICAgICAgdGhpcy50aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHJlc2V0KCk7XHJcbiAgICAgIH0sIDEwMDApO1xyXG4gICAgfSxcclxuICAgIGdvVG9NYXJrZXREZXRhaWxzUGFnZSgpIHtcclxuICAgICAgdGhpcy4kcm91dGVyLnB1c2goYC9hZG1pbmlzdHJhdGlvbi9tYXJrZXRzLyR7dGhpcy5tYXJrZXRJbmZvLl9pZH1gKTtcclxuICAgIH0sXHJcbiAgICBzaG93RWRpdE1hcmtldERpYWxvZyh7IHJlc2V0IH0pIHtcclxuICAgICAgdGhpcy5zaG93RWRpdE1hcmtldCA9IHRydWU7XHJcbiAgICAgIHRoaXMuZmluYWxpemUocmVzZXQpO1xyXG4gICAgfSxcclxuICAgIGFzeW5jIGVkaXRNYXJrZXQoKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgbGV0IGRhdGEgPSBuZXcgRm9ybURhdGEoKTtcclxuICAgICAgICBkYXRhLmFwcGVuZChcIm5hbWVcIiwgdGhpcy5tYXJrZXROYW1lKTtcclxuICAgICAgICBkYXRhLmFwcGVuZChcImxvZ29cIiwgdGhpcy5tYXJrZXRMb2dvKTtcclxuXHJcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy4kYXBpLnBhdGNoKFxyXG4gICAgICAgICAgYC9tYXJrZXRzLyR7dGhpcy5tYXJrZXRJbmZvLl9pZH1gLFxyXG4gICAgICAgICAgZGF0YVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgaWYgKHJlcy5kYXRhLnN0YXR1cyA9PT0gXCJzdWNjZXNzXCIpIHtcclxuICAgICAgICAgIHRoaXMuJGVtaXQoXCJmZXRjaE1hcmtldHNcIik7XHJcbiAgICAgICAgICB0aGlzLnNob3dFZGl0TWFya2V0ID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgc2hvd0RlbGV0ZU1hcmtldERpYWxvZyh7IHJlc2V0IH0pIHtcclxuICAgICAgdGhpcy5zaG93RGVsZXRlTWFya2V0ID0gdHJ1ZTtcclxuICAgICAgdGhpcy5maW5hbGl6ZShyZXNldCk7XHJcbiAgICB9LFxyXG4gICAgYXN5bmMgZGVsZXRlTWFya2V0KCkge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuJGFwaS5kZWxldGUoYC9tYXJrZXRzLyR7dGhpcy5tYXJrZXRJbmZvLl9pZH1gKTtcclxuICAgICAgICBpZiAocmVzLmRhdGEuc3RhdHVzID09PSBcInN1Y2Nlc3NcIikge1xyXG4gICAgICAgICAgdGhpcy4kZW1pdChcImZldGNoTWFya2V0c1wiKTtcclxuICAgICAgICAgIHRoaXMuc2hvd0RlbGV0ZU1hcmtldCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIHVwbG9hZEZpbGUoKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMubWFya2V0TG9nbyk7XHJcbiAgICB9LFxyXG4gIH0sXHJcbn07XHJcbjwvc2NyaXB0PlxyXG5cclxuPHN0eWxlIHNjb3BlZD5cclxuLm1hcmtldC1jYXJkX19uYW1lIHtcclxuICBmb250LXNpemU6IDIwcHg7XHJcbiAgZm9udC13ZWlnaHQ6IDYwMDtcclxufVxyXG4vKiAubWFya2V0LWNhcmQge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZ2FwOiAyMHB4O1xyXG4gIG1hcmdpbjogMjBweDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjNmM2YzO1xyXG59ICovXHJcbmltZyB7XHJcbiAgd2lkdGg6IDgwcHg7XHJcbiAgaGVpZ2h0OiA4MHB4O1xyXG59XHJcblxyXG4udGV4dC1oNiB7XHJcbiAgY29sb3I6ICMyNjczNzg7XHJcbn1cclxuPC9zdHlsZT5cclxuIiwiPHRlbXBsYXRlPlxyXG4gIDxxLXBhZ2U+XHJcbiAgICA8ZGl2IGNsYXNzPVwicGFnZS1zdHlsZVwiPlxyXG4gICAgICA8cS1idG4gY2xhc3M9XCJhZGQtbWFya2V0X19idG5cIiBAY2xpY2s9XCJzaG93QWRkTWFya2V0ID0gdHJ1ZVwiXHJcbiAgICAgICAgPkFkZCBNYXJrZXQ8L3EtYnRuXHJcbiAgICAgID5cclxuICAgICAgPGRpdiBjbGFzcz1cIm1hcmtldC1jYXJkX19saXN0XCI+XHJcbiAgICAgICAgPE1hcmtldENhcmRcclxuICAgICAgICAgIHYtZm9yPVwibWFya2V0IGluIG1hcmtldHNcIlxyXG4gICAgICAgICAgOmtleT1cIm1hcmtldC5faWRcIlxyXG4gICAgICAgICAgOm1hcmtldEluZm89XCJtYXJrZXRcIlxyXG4gICAgICAgICAgQGZldGNoTWFya2V0cz1cImZldGNoTWFya2V0c1wiXHJcbiAgICAgICAgPjwvTWFya2V0Q2FyZD5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxxLWRpYWxvZyBtYXhpbWl6ZWQgdi1tb2RlbD1cInNob3dBZGRNYXJrZXRcIj5cclxuICAgICAgPHEtY2FyZD5cclxuICAgICAgICA8cS1jYXJkLXNlY3Rpb24gY2xhc3M9XCJyb3cgaXRlbXMtY2VudGVyIHEtcGItbm9uZVwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDZcIj5BZGQgTWFya2V0PC9kaXY+XHJcbiAgICAgICAgICA8cS1zcGFjZSAvPlxyXG4gICAgICAgICAgPHEtYnRuIGljb249XCJjbG9zZVwiIGZsYXQgcm91bmQgZGVuc2Ugdi1jbG9zZS1wb3B1cCAvPlxyXG4gICAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XHJcblxyXG4gICAgICAgIDxxLWNhcmQtc2VjdGlvbj5cclxuICAgICAgICAgIDxxLWlucHV0XHJcbiAgICAgICAgICAgIHYtbW9kZWw9XCJtYXJrZXROYW1lXCJcclxuICAgICAgICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgICBsYWJlbD1cIk1hcmtldCBOYW1lXCJcclxuICAgICAgICAgICAgY2xhc3M9XCJxLW1iLWxnXCJcclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8cS1maWxlXHJcbiAgICAgICAgICAgIGNvbG9yPVwidGVhbFwiXHJcbiAgICAgICAgICAgIGZpbGxlZFxyXG4gICAgICAgICAgICB2LW1vZGVsPVwibWFya2V0TG9nb1wiXHJcbiAgICAgICAgICAgIGxhYmVsPVwiTG9nb1wiXHJcbiAgICAgICAgICAgIEB1cGRhdGU6bW9kZWwtdmFsdWU9XCJ1cGxvYWRGaWxlXCJcclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDpwcmVwZW5kPlxyXG4gICAgICAgICAgICAgIDxxLWljb24gbmFtZT1cImNsb3VkX3VwbG9hZFwiIC8+XHJcbiAgICAgICAgICAgIDwvdGVtcGxhdGU+XHJcbiAgICAgICAgICA8L3EtZmlsZT5cclxuICAgICAgICA8L3EtY2FyZC1zZWN0aW9uPlxyXG4gICAgICAgIDxxLWJ0biBjbGFzcz1cImJ0blwiIEBjbGljaz1cImFkZE1hcmtldFwiPkFkZCBtYXJrZXQ8L3EtYnRuPlxyXG4gICAgICA8L3EtY2FyZD5cclxuICAgIDwvcS1kaWFsb2c+XHJcbiAgPC9xLXBhZ2U+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG5pbXBvcnQgTWFya2V0Q2FyZCBmcm9tIFwic3JjL2NvbXBvbmVudHMvYWRtaW5pc3RyYXRpb24vTWFya2V0Q2FyZC52dWVcIjtcclxuaW1wb3J0IHsgdXNlRGFzaEhlYWRlclN0b3JlIH0gZnJvbSBcInNyYy9zdG9yZXMvZGFzaC1oZWFkZXJcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBuYW1lOiBcIkFkbWluaXN0cmF0aW9uUGFnZVwiLFxyXG4gIGNvbXBvbmVudHM6IHtcclxuICAgIE1hcmtldENhcmQsXHJcbiAgfSxcclxuICBhc3luYyBtb3VudGVkKCkge1xyXG4gICAgY29uc3QgZGFzaEhlYWRlciA9IHVzZURhc2hIZWFkZXJTdG9yZSgpO1xyXG4gICAgZGFzaEhlYWRlci4kcGF0Y2goeyB0aXRsZTogXCJNYXJrZXRzXCIsIHNob3dCYWNrSWNvbjogdHJ1ZSB9KTtcclxuICAgIGF3YWl0IHRoaXMuZmV0Y2hNYXJrZXRzKCk7XHJcbiAgfSxcclxuICBkYXRhKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbWFya2V0czogW10sXHJcbiAgICAgIHNob3dBZGRNYXJrZXQ6IGZhbHNlLFxyXG4gICAgICBtYXJrZXRMb2dvOiBudWxsLFxyXG4gICAgICBtYXJrZXROYW1lOiBcIlwiLFxyXG4gICAgfTtcclxuICB9LFxyXG4gIG1ldGhvZHM6IHtcclxuICAgIHVwbG9hZEZpbGUoKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMubWFya2V0TG9nbyk7XHJcbiAgICB9LFxyXG4gICAgYXN5bmMgZmV0Y2hNYXJrZXRzKCkge1xyXG4gICAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLiRhcGkuZ2V0KFwiL21hcmtldHNcIik7XHJcbiAgICAgIHRoaXMubWFya2V0cyA9IHJlcy5kYXRhLmRhdGEubWFya2V0cztcclxuICAgIH0sXHJcbiAgICByZXNldEZpZWxkcygpIHtcclxuICAgICAgdGhpcy5tYXJrZXRMb2dvID0gbnVsbDtcclxuICAgICAgdGhpcy5tYXJrZXROYW1lID0gXCJcIjtcclxuICAgIH0sXHJcbiAgICBhc3luYyBhZGRNYXJrZXQoKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgbGV0IGRhdGEgPSBuZXcgRm9ybURhdGEoKTtcclxuICAgICAgICBkYXRhLmFwcGVuZChcIm5hbWVcIiwgdGhpcy5tYXJrZXROYW1lKTtcclxuICAgICAgICBkYXRhLmFwcGVuZChcImxvZ29cIiwgdGhpcy5tYXJrZXRMb2dvKTtcclxuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLiRhcGkucG9zdChcIi9tYXJrZXRzXCIsIGRhdGEpO1xyXG4gICAgICAgIGlmIChyZXMuZGF0YS5zdGF0dXMgPT09IFwic3VjY2Vzc1wiKSB7XHJcbiAgICAgICAgICBhd2FpdCB0aGlzLmZldGNoTWFya2V0cygpO1xyXG4gICAgICAgICAgdGhpcy5zaG93QWRkTWFya2V0ID0gZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLnJlc2V0RmllbGRzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICB9LFxyXG59O1xyXG48L3NjcmlwdD5cclxuXHJcbjxzdHlsZSBsYW5nPVwic2Nzc1wiIHNjb3BlZD5cclxuLm1hcmtldHMtaGVhZGVyIHtcclxuICBmb250LXNpemU6IDMycHg7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIG1hcmdpbi10b3A6IDIwcHg7XHJcbn1cclxuLnBhZ2Utc3R5bGUge1xyXG4gIHBhZGRpbmctdG9wOiAzMHB4O1xyXG59XHJcbi5hZGQtbWFya2V0X19idG4ge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICRicmFuZC1jb2xvcjtcclxuICBjb2xvcjogd2hpdGU7XHJcbiAgbWFyZ2luOiAxMHB4O1xyXG59XHJcbi50ZXh0LWg2LFxyXG4uYnRuIHtcclxuICBjb2xvcjogJGJyYW5kLWNvbG9yO1xyXG59XHJcbi5hZGQtbWFya2V0LW1vZGFsIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWVlO1xyXG59XHJcblxyXG4ubWFya2V0LWNhcmRfX2xpc3Qge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBnYXA6IDE1cHg7XHJcbn1cclxuPC9zdHlsZT5cclxuIl0sIm5hbWVzIjpbIl9zZmNfbWFpbiIsIl9ob2lzdGVkXzEiLCJfaG9pc3RlZF8yIiwiX3dpdGhTY29wZUlkIiwiX2NyZWF0ZUVsZW1lbnRWTm9kZSIsIl9jcmVhdGVWTm9kZSIsIl90b0Rpc3BsYXlTdHJpbmciLCJfY3JlYXRlQmxvY2siLCJfY3JlYXRlRWxlbWVudEJsb2NrIiwiX0ZyYWdtZW50IiwiX3JlbmRlckxpc3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUtBLFNBQVMsWUFBYSxPQUFPLGVBQWUsc0JBQXNCLFVBQVU7QUFDMUUsUUFBTSxnQkFBZ0IsQ0FBRTtBQUV4QixRQUFNLFFBQVEsVUFBUTtBQUNwQixRQUFJLFNBQVMsSUFBSSxNQUFNLE1BQU07QUFDM0Isb0JBQWMsS0FBSyxJQUFJO0FBQUEsSUFDeEIsT0FDSTtBQUNILG9CQUFjLEtBQUssRUFBRSxzQkFBc0IsS0FBSSxDQUFFO0FBQUEsSUFDbEQ7QUFBQSxFQUNMLENBQUc7QUFFRCxTQUFPO0FBQ1Q7QUFFQSxTQUFTLG1CQUFvQixHQUFHO0FBQzlCLE9BQUssRUFBRSxpQkFBaUIsRUFBRSxh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
