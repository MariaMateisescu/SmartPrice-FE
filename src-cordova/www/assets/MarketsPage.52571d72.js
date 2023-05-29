import { y as ref, a1 as computed, ah as getCurrentInstance, cf as stop, bI as stopAndPrevent, bN as client, ak as h, bt as createComponent, bZ as injectProp, bJ as prevent, bw as emptyRenderFn, bF as hSlot, an as inject, bz as layoutKey, bS as pageContainerKey, _ as _export_sfc, o as openBlock, c as createElementBlock, aa as createVNode, b5 as withCtx, a as createBaseVNode, bC as QIcon, a9 as createTextVNode, bD as QAvatar, M as toDisplayString, b7 as withDirectives, bE as QBtn, Q as Fragment, aH as pushScopeId, aF as popScopeId, bB as useDashHeaderStore, a2 as createBlock, aL as resolveComponent, aK as renderList } from "./index.0ce84b9b.js";
import { Q as QSpace, a as QDialog } from "./QDialog.27e255cd.js";
import { Q as QCard, a as QCardSection } from "./QCard.511536db.js";
import { u as useFieldProps, a as useFieldEmits, c as useFieldState, e as useFileFormDomProps, b as useField, f as fieldValueIsFilled, Q as QInput } from "./QInput.4104ffc2.js";
import { Q as QChip } from "./QChip.1f12071e.js";
import { u as useFormProps, c as useFormInputNameAttr } from "./use-form.e754bc19.js";
import { h as humanStorageSize } from "./format.2a3572e1.js";
import { C as ClosePopup } from "./ClosePopup.fcd43a0a.js";
import { Q as QItem, a as QItemSection } from "./QItem.742a43b4.js";
import { Q as QSlideItem } from "./QSlideItem.ca1c7a33.js";
import { Q as QCardActions } from "./QCardActions.9dd12f15.js";
import "./use-timeout.0140a5e1.js";
import "./focus-manager.d6507951.js";
import "./use-dark.089fd8b8.js";
import "./uid.42677368.js";
import "./TouchPan.43131768.js";
import "./selection.0c91ca54.js";
import "./use-cache.b0833c75.js";
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
const _hoisted_4$1 = { class: "market-card__name" };
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
                createBaseVNode("div", _hoisted_4$1, toDisplayString($props.marketInfo.name), 1)
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
const _withScopeId = (n) => (pushScopeId("data-v-4886c95d"), n = n(), popScopeId(), n);
const _hoisted_1 = { class: "page-style" };
const _hoisted_2 = { class: "market-card__list" };
const _hoisted_3 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-h6" }, "Add Market", -1));
const _hoisted_4 = { class: "add-market__container" };
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
                  }, 8, ["modelValue", "onUpdate:modelValue"]),
                  createBaseVNode("div", _hoisted_4, [
                    createVNode(QBtn, {
                      class: "add-market__btn q-mt-lg",
                      onClick: $options.addMarket
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Add market")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ])
                ]),
                _: 1
              })
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
var MarketsPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-4886c95d"], ["__file", "MarketsPage.vue"]]);
export { MarketsPage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFya2V0c1BhZ2UuNTI1NzFkNzIuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWZpbGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2ZpbGUvUUZpbGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3BhZ2UvUVBhZ2UuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9hZG1pbmlzdHJhdGlvbi9NYXJrZXRDYXJkLnZ1ZSIsIi4uLy4uLy4uL3NyYy9wYWdlcy9hZG1pbmlzdHJhdGlvbi9NYXJrZXRzUGFnZS52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaCwgcmVmLCBjb21wdXRlZCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyBjbGllbnQgfSBmcm9tICcuLi8uLi9wbHVnaW5zL1BsYXRmb3JtLmpzJ1xuaW1wb3J0IHsgc3RvcCwgc3RvcEFuZFByZXZlbnQgfSBmcm9tICcuLi8uLi91dGlscy9ldmVudC5qcydcblxuZnVuY3Rpb24gZmlsdGVyRmlsZXMgKGZpbGVzLCByZWplY3RlZEZpbGVzLCBmYWlsZWRQcm9wVmFsaWRhdGlvbiwgZmlsdGVyRm4pIHtcbiAgY29uc3QgYWNjZXB0ZWRGaWxlcyA9IFtdXG5cbiAgZmlsZXMuZm9yRWFjaChmaWxlID0+IHtcbiAgICBpZiAoZmlsdGVyRm4oZmlsZSkgPT09IHRydWUpIHtcbiAgICAgIGFjY2VwdGVkRmlsZXMucHVzaChmaWxlKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJlamVjdGVkRmlsZXMucHVzaCh7IGZhaWxlZFByb3BWYWxpZGF0aW9uLCBmaWxlIH0pXG4gICAgfVxuICB9KVxuXG4gIHJldHVybiBhY2NlcHRlZEZpbGVzXG59XG5cbmZ1bmN0aW9uIHN0b3BBbmRQcmV2ZW50RHJhZyAoZSkge1xuICBlICYmIGUuZGF0YVRyYW5zZmVyICYmIChlLmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gJ2NvcHknKVxuICBzdG9wQW5kUHJldmVudChlKVxufVxuXG5leHBvcnQgY29uc3QgdXNlRmlsZVByb3BzID0ge1xuICBtdWx0aXBsZTogQm9vbGVhbixcbiAgYWNjZXB0OiBTdHJpbmcsXG4gIGNhcHR1cmU6IFN0cmluZyxcbiAgbWF4RmlsZVNpemU6IFsgTnVtYmVyLCBTdHJpbmcgXSxcbiAgbWF4VG90YWxTaXplOiBbIE51bWJlciwgU3RyaW5nIF0sXG4gIG1heEZpbGVzOiBbIE51bWJlciwgU3RyaW5nIF0sXG4gIGZpbHRlcjogRnVuY3Rpb25cbn1cblxuZXhwb3J0IGNvbnN0IHVzZUZpbGVFbWl0cyA9IFsgJ3JlamVjdGVkJyBdXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICh7XG4gIGVkaXRhYmxlLFxuICBkbmQsXG4gIGdldEZpbGVJbnB1dCxcbiAgYWRkRmlsZXNUb1F1ZXVlXG59KSB7XG4gIGNvbnN0IHsgcHJvcHMsIGVtaXQsIHByb3h5IH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuXG4gIGNvbnN0IGRuZFJlZiA9IHJlZihudWxsKVxuXG4gIGNvbnN0IGV4dGVuc2lvbnMgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgcHJvcHMuYWNjZXB0ICE9PSB2b2lkIDBcbiAgICAgID8gcHJvcHMuYWNjZXB0LnNwbGl0KCcsJykubWFwKGV4dCA9PiB7XG4gICAgICAgIGV4dCA9IGV4dC50cmltKClcbiAgICAgICAgaWYgKGV4dCA9PT0gJyonKSB7IC8vIHN1cHBvcnQgXCIqXCJcbiAgICAgICAgICByZXR1cm4gJyovJ1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGV4dC5lbmRzV2l0aCgnLyonKSkgeyAvLyBzdXBwb3J0IFwiaW1hZ2UvKlwiIG9yIFwiKi8qXCJcbiAgICAgICAgICBleHQgPSBleHQuc2xpY2UoMCwgZXh0Lmxlbmd0aCAtIDEpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGV4dC50b1VwcGVyQ2FzZSgpXG4gICAgICB9KVxuICAgICAgOiBudWxsXG4gICkpXG5cbiAgY29uc3QgbWF4RmlsZXNOdW1iZXIgPSBjb21wdXRlZCgoKSA9PiBwYXJzZUludChwcm9wcy5tYXhGaWxlcywgMTApKVxuICBjb25zdCBtYXhUb3RhbFNpemVOdW1iZXIgPSBjb21wdXRlZCgoKSA9PiBwYXJzZUludChwcm9wcy5tYXhUb3RhbFNpemUsIDEwKSlcblxuICBmdW5jdGlvbiBwaWNrRmlsZXMgKGUpIHtcbiAgICBpZiAoZWRpdGFibGUudmFsdWUpIHtcbiAgICAgIGlmIChlICE9PSBPYmplY3QoZSkpIHtcbiAgICAgICAgZSA9IHsgdGFyZ2V0OiBudWxsIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGUudGFyZ2V0ICE9PSBudWxsICYmIGUudGFyZ2V0Lm1hdGNoZXMoJ2lucHV0W3R5cGU9XCJmaWxlXCJdJykgPT09IHRydWUpIHtcbiAgICAgICAgLy8gc3RvcCBwcm9wYWdhdGlvbiBpZiBpdCdzIG5vdCBhIHJlYWwgcG9pbnRlciBldmVudFxuICAgICAgICBlLmNsaWVudFggPT09IDAgJiYgZS5jbGllbnRZID09PSAwICYmIHN0b3AoZSlcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjb25zdCBpbnB1dCA9IGdldEZpbGVJbnB1dCgpXG4gICAgICAgIGlucHV0ICYmIGlucHV0ICE9PSBlLnRhcmdldCAmJiBpbnB1dC5jbGljayhlKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZEZpbGVzIChmaWxlcykge1xuICAgIGlmIChlZGl0YWJsZS52YWx1ZSAmJiBmaWxlcykge1xuICAgICAgYWRkRmlsZXNUb1F1ZXVlKG51bGwsIGZpbGVzKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHByb2Nlc3NGaWxlcyAoZSwgZmlsZXNUb1Byb2Nlc3MsIGN1cnJlbnRGaWxlTGlzdCwgYXBwZW5kKSB7XG4gICAgbGV0IGZpbGVzID0gQXJyYXkuZnJvbShmaWxlc1RvUHJvY2VzcyB8fCBlLnRhcmdldC5maWxlcylcbiAgICBjb25zdCByZWplY3RlZEZpbGVzID0gW11cblxuICAgIGNvbnN0IGRvbmUgPSAoKSA9PiB7XG4gICAgICBpZiAocmVqZWN0ZWRGaWxlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGVtaXQoJ3JlamVjdGVkJywgcmVqZWN0ZWRGaWxlcylcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBmaWx0ZXIgZmlsZSB0eXBlc1xuICAgIGlmIChwcm9wcy5hY2NlcHQgIT09IHZvaWQgMCAmJiBleHRlbnNpb25zLnZhbHVlLmluZGV4T2YoJyovJykgPT09IC0xKSB7XG4gICAgICBmaWxlcyA9IGZpbHRlckZpbGVzKGZpbGVzLCByZWplY3RlZEZpbGVzLCAnYWNjZXB0JywgZmlsZSA9PiB7XG4gICAgICAgIHJldHVybiBleHRlbnNpb25zLnZhbHVlLnNvbWUoZXh0ID0+IChcbiAgICAgICAgICBmaWxlLnR5cGUudG9VcHBlckNhc2UoKS5zdGFydHNXaXRoKGV4dClcbiAgICAgICAgICB8fCBmaWxlLm5hbWUudG9VcHBlckNhc2UoKS5lbmRzV2l0aChleHQpXG4gICAgICAgICkpXG4gICAgICB9KVxuXG4gICAgICBpZiAoZmlsZXMubGVuZ3RoID09PSAwKSB7IHJldHVybiBkb25lKCkgfVxuICAgIH1cblxuICAgIC8vIGZpbHRlciBtYXggZmlsZSBzaXplXG4gICAgaWYgKHByb3BzLm1heEZpbGVTaXplICE9PSB2b2lkIDApIHtcbiAgICAgIGNvbnN0IG1heEZpbGVTaXplID0gcGFyc2VJbnQocHJvcHMubWF4RmlsZVNpemUsIDEwKVxuICAgICAgZmlsZXMgPSBmaWx0ZXJGaWxlcyhmaWxlcywgcmVqZWN0ZWRGaWxlcywgJ21heC1maWxlLXNpemUnLCBmaWxlID0+IHtcbiAgICAgICAgcmV0dXJuIGZpbGUuc2l6ZSA8PSBtYXhGaWxlU2l6ZVxuICAgICAgfSlcblxuICAgICAgaWYgKGZpbGVzLmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gZG9uZSgpIH1cbiAgICB9XG5cbiAgICAvLyBDb3Jkb3ZhL2lPUyBhbGxvd3Mgc2VsZWN0aW5nIG11bHRpcGxlIGZpbGVzIGV2ZW4gd2hlbiB0aGVcbiAgICAvLyBtdWx0aXBsZSBhdHRyaWJ1dGUgaXMgbm90IHNwZWNpZmllZC4gV2UgYWxzbyBub3JtYWxpemUgZHJhZyduJ2Ryb3BwZWRcbiAgICAvLyBmaWxlcyBoZXJlOlxuICAgIGlmIChwcm9wcy5tdWx0aXBsZSAhPT0gdHJ1ZSAmJiBmaWxlcy5sZW5ndGggPiAwKSB7XG4gICAgICBmaWxlcyA9IFsgZmlsZXNbIDAgXSBdXG4gICAgfVxuXG4gICAgLy8gQ29tcHV0ZSBrZXkgdG8gdXNlIGZvciBlYWNoIGZpbGVcbiAgICBmaWxlcy5mb3JFYWNoKGZpbGUgPT4ge1xuICAgICAgZmlsZS5fX2tleSA9IGZpbGUud2Via2l0UmVsYXRpdmVQYXRoICsgZmlsZS5sYXN0TW9kaWZpZWQgKyBmaWxlLm5hbWUgKyBmaWxlLnNpemVcbiAgICB9KVxuXG4gICAgaWYgKGFwcGVuZCA9PT0gdHJ1ZSkge1xuICAgICAgLy8gQXZvaWQgZHVwbGljYXRlIGZpbGVzXG4gICAgICBjb25zdCBmaWxlbmFtZU1hcCA9IGN1cnJlbnRGaWxlTGlzdC5tYXAoZW50cnkgPT4gZW50cnkuX19rZXkpXG4gICAgICBmaWxlcyA9IGZpbHRlckZpbGVzKGZpbGVzLCByZWplY3RlZEZpbGVzLCAnZHVwbGljYXRlJywgZmlsZSA9PiB7XG4gICAgICAgIHJldHVybiBmaWxlbmFtZU1hcC5pbmNsdWRlcyhmaWxlLl9fa2V5KSA9PT0gZmFsc2VcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgaWYgKGZpbGVzLmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gZG9uZSgpIH1cblxuICAgIGlmIChwcm9wcy5tYXhUb3RhbFNpemUgIT09IHZvaWQgMCkge1xuICAgICAgbGV0IHNpemUgPSBhcHBlbmQgPT09IHRydWVcbiAgICAgICAgPyBjdXJyZW50RmlsZUxpc3QucmVkdWNlKCh0b3RhbCwgZmlsZSkgPT4gdG90YWwgKyBmaWxlLnNpemUsIDApXG4gICAgICAgIDogMFxuXG4gICAgICBmaWxlcyA9IGZpbHRlckZpbGVzKGZpbGVzLCByZWplY3RlZEZpbGVzLCAnbWF4LXRvdGFsLXNpemUnLCBmaWxlID0+IHtcbiAgICAgICAgc2l6ZSArPSBmaWxlLnNpemVcbiAgICAgICAgcmV0dXJuIHNpemUgPD0gbWF4VG90YWxTaXplTnVtYmVyLnZhbHVlXG4gICAgICB9KVxuXG4gICAgICBpZiAoZmlsZXMubGVuZ3RoID09PSAwKSB7IHJldHVybiBkb25lKCkgfVxuICAgIH1cblxuICAgIC8vIGRvIHdlIGhhdmUgY3VzdG9tIGZpbHRlciBmdW5jdGlvbj9cbiAgICBpZiAodHlwZW9mIHByb3BzLmZpbHRlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc3QgZmlsdGVyZWRGaWxlcyA9IHByb3BzLmZpbHRlcihmaWxlcylcbiAgICAgIGZpbGVzID0gZmlsdGVyRmlsZXMoZmlsZXMsIHJlamVjdGVkRmlsZXMsICdmaWx0ZXInLCBmaWxlID0+IHtcbiAgICAgICAgcmV0dXJuIGZpbHRlcmVkRmlsZXMuaW5jbHVkZXMoZmlsZSlcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgaWYgKHByb3BzLm1heEZpbGVzICE9PSB2b2lkIDApIHtcbiAgICAgIGxldCBmaWxlc051bWJlciA9IGFwcGVuZCA9PT0gdHJ1ZVxuICAgICAgICA/IGN1cnJlbnRGaWxlTGlzdC5sZW5ndGhcbiAgICAgICAgOiAwXG5cbiAgICAgIGZpbGVzID0gZmlsdGVyRmlsZXMoZmlsZXMsIHJlamVjdGVkRmlsZXMsICdtYXgtZmlsZXMnLCAoKSA9PiB7XG4gICAgICAgIGZpbGVzTnVtYmVyKytcbiAgICAgICAgcmV0dXJuIGZpbGVzTnVtYmVyIDw9IG1heEZpbGVzTnVtYmVyLnZhbHVlXG4gICAgICB9KVxuXG4gICAgICBpZiAoZmlsZXMubGVuZ3RoID09PSAwKSB7IHJldHVybiBkb25lKCkgfVxuICAgIH1cblxuICAgIGRvbmUoKVxuXG4gICAgaWYgKGZpbGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiBmaWxlc1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uRHJhZ292ZXIgKGUpIHtcbiAgICBzdG9wQW5kUHJldmVudERyYWcoZSlcbiAgICBkbmQudmFsdWUgIT09IHRydWUgJiYgKGRuZC52YWx1ZSA9IHRydWUpXG4gIH1cblxuICBmdW5jdGlvbiBvbkRyYWdsZWF2ZSAoZSkge1xuICAgIHN0b3BBbmRQcmV2ZW50KGUpXG5cbiAgICAvLyBTYWZhcmkgYnVnOiByZWxhdGVkVGFyZ2V0IGlzIG51bGwgZm9yIG92ZXIgMTAgeWVhcnNcbiAgICAvLyBodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9NjY1NDdcbiAgICBjb25zdCBnb25lID0gZS5yZWxhdGVkVGFyZ2V0ICE9PSBudWxsIHx8IGNsaWVudC5pcy5zYWZhcmkgIT09IHRydWVcbiAgICAgID8gZS5yZWxhdGVkVGFyZ2V0ICE9PSBkbmRSZWYudmFsdWVcbiAgICAgIDogZG9jdW1lbnQuZWxlbWVudHNGcm9tUG9pbnQoZS5jbGllbnRYLCBlLmNsaWVudFkpLmluY2x1ZGVzKGRuZFJlZi52YWx1ZSkgPT09IGZhbHNlXG5cbiAgICBnb25lID09PSB0cnVlICYmIChkbmQudmFsdWUgPSBmYWxzZSlcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uRHJvcCAoZSkge1xuICAgIHN0b3BBbmRQcmV2ZW50RHJhZyhlKVxuICAgIGNvbnN0IGZpbGVzID0gZS5kYXRhVHJhbnNmZXIuZmlsZXNcblxuICAgIGlmIChmaWxlcy5sZW5ndGggPiAwKSB7XG4gICAgICBhZGRGaWxlc1RvUXVldWUobnVsbCwgZmlsZXMpXG4gICAgfVxuXG4gICAgZG5kLnZhbHVlID0gZmFsc2VcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldERuZE5vZGUgKHR5cGUpIHtcbiAgICBpZiAoZG5kLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgICByZWY6IGRuZFJlZixcbiAgICAgICAgY2xhc3M6IGBxLSR7IHR5cGUgfV9fZG5kIGFic29sdXRlLWZ1bGxgLFxuICAgICAgICBvbkRyYWdlbnRlcjogc3RvcEFuZFByZXZlbnREcmFnLFxuICAgICAgICBvbkRyYWdvdmVyOiBzdG9wQW5kUHJldmVudERyYWcsXG4gICAgICAgIG9uRHJhZ2xlYXZlLFxuICAgICAgICBvbkRyb3BcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgLy8gZXhwb3NlIHB1YmxpYyBtZXRob2RzXG4gIE9iamVjdC5hc3NpZ24ocHJveHksIHsgcGlja0ZpbGVzLCBhZGRGaWxlcyB9KVxuXG4gIHJldHVybiB7XG4gICAgcGlja0ZpbGVzLFxuICAgIGFkZEZpbGVzLFxuICAgIG9uRHJhZ292ZXIsXG4gICAgb25EcmFnbGVhdmUsXG4gICAgcHJvY2Vzc0ZpbGVzLFxuICAgIGdldERuZE5vZGUsXG5cbiAgICBtYXhGaWxlc051bWJlcixcbiAgICBtYXhUb3RhbFNpemVOdW1iZXJcbiAgfVxufVxuIiwiaW1wb3J0IHsgaCwgcmVmLCBjb21wdXRlZCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgUUNoaXAgZnJvbSAnLi4vY2hpcC9RQ2hpcC5qcydcblxuaW1wb3J0IHVzZUZpZWxkLCB7IHVzZUZpZWxkU3RhdGUsIHVzZUZpZWxkUHJvcHMsIHVzZUZpZWxkRW1pdHMsIGZpZWxkVmFsdWVJc0ZpbGxlZCB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWZpZWxkLmpzJ1xuaW1wb3J0IHsgdXNlRm9ybVByb3BzLCB1c2VGb3JtSW5wdXROYW1lQXR0ciB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWZvcm0uanMnXG5pbXBvcnQgdXNlRmlsZSwgeyB1c2VGaWxlUHJvcHMsIHVzZUZpbGVFbWl0cyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWZpbGUuanMnXG5pbXBvcnQgdXNlRmlsZUZvcm1Eb21Qcm9wcyBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1maWxlLWRvbS1wcm9wcy5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBodW1hblN0b3JhZ2VTaXplIH0gZnJvbSAnLi4vLi4vdXRpbHMvZm9ybWF0LmpzJ1xuaW1wb3J0IHsgcHJldmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL2V2ZW50LmpzJ1xuaW1wb3J0IHsgaW5qZWN0UHJvcCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvaW5qZWN0LW9iai1wcm9wLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUUZpbGUnLFxuXG4gIGluaGVyaXRBdHRyczogZmFsc2UsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VGaWVsZFByb3BzLFxuICAgIC4uLnVzZUZvcm1Qcm9wcyxcbiAgICAuLi51c2VGaWxlUHJvcHMsXG5cbiAgICAvKiBTU1IgZG9lcyBub3Qga25vdyBhYm91dCBGaWxlICYgRmlsZUxpc3QgKi9cbiAgICBtb2RlbFZhbHVlOiBfX1FVQVNBUl9TU1JfU0VSVkVSX19cbiAgICAgID8ge31cbiAgICAgIDogWyBGaWxlLCBGaWxlTGlzdCwgQXJyYXkgXSxcblxuICAgIGFwcGVuZDogQm9vbGVhbixcbiAgICB1c2VDaGlwczogQm9vbGVhbixcbiAgICBkaXNwbGF5VmFsdWU6IFsgU3RyaW5nLCBOdW1iZXIgXSxcblxuICAgIHRhYmluZGV4OiB7XG4gICAgICB0eXBlOiBbIFN0cmluZywgTnVtYmVyIF0sXG4gICAgICBkZWZhdWx0OiAwXG4gICAgfSxcblxuICAgIGNvdW50ZXJMYWJlbDogRnVuY3Rpb24sXG5cbiAgICBpbnB1dENsYXNzOiBbIEFycmF5LCBTdHJpbmcsIE9iamVjdCBdLFxuICAgIGlucHV0U3R5bGU6IFsgQXJyYXksIFN0cmluZywgT2JqZWN0IF1cbiAgfSxcblxuICBlbWl0czogW1xuICAgIC4uLnVzZUZpZWxkRW1pdHMsXG4gICAgLi4udXNlRmlsZUVtaXRzXG4gIF0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzLCBlbWl0LCBhdHRycyB9KSB7XG4gICAgY29uc3QgeyBwcm94eSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICAgIGNvbnN0IHN0YXRlID0gdXNlRmllbGRTdGF0ZSgpXG5cbiAgICBjb25zdCBpbnB1dFJlZiA9IHJlZihudWxsKVxuICAgIGNvbnN0IGRuZCA9IHJlZihmYWxzZSlcbiAgICBjb25zdCBuYW1lUHJvcCA9IHVzZUZvcm1JbnB1dE5hbWVBdHRyKHByb3BzKVxuXG4gICAgY29uc3Qge1xuICAgICAgcGlja0ZpbGVzLFxuICAgICAgb25EcmFnb3ZlcixcbiAgICAgIG9uRHJhZ2xlYXZlLFxuICAgICAgcHJvY2Vzc0ZpbGVzLFxuICAgICAgZ2V0RG5kTm9kZVxuICAgIH0gPSB1c2VGaWxlKHsgZWRpdGFibGU6IHN0YXRlLmVkaXRhYmxlLCBkbmQsIGdldEZpbGVJbnB1dCwgYWRkRmlsZXNUb1F1ZXVlIH0pXG5cbiAgICBjb25zdCBmb3JtRG9tUHJvcHMgPSB1c2VGaWxlRm9ybURvbVByb3BzKHByb3BzKVxuXG4gICAgY29uc3QgaW5uZXJWYWx1ZSA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIE9iamVjdChwcm9wcy5tb2RlbFZhbHVlKSA9PT0gcHJvcHMubW9kZWxWYWx1ZVxuICAgICAgICA/ICgnbGVuZ3RoJyBpbiBwcm9wcy5tb2RlbFZhbHVlID8gQXJyYXkuZnJvbShwcm9wcy5tb2RlbFZhbHVlKSA6IFsgcHJvcHMubW9kZWxWYWx1ZSBdKVxuICAgICAgICA6IFtdXG4gICAgKSlcblxuICAgIGNvbnN0IGhhc1ZhbHVlID0gY29tcHV0ZWQoKCkgPT4gZmllbGRWYWx1ZUlzRmlsbGVkKGlubmVyVmFsdWUudmFsdWUpKVxuXG4gICAgY29uc3Qgc2VsZWN0ZWRTdHJpbmcgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgaW5uZXJWYWx1ZS52YWx1ZVxuICAgICAgICAubWFwKGZpbGUgPT4gZmlsZS5uYW1lKVxuICAgICAgICAuam9pbignLCAnKVxuICAgIClcblxuICAgIGNvbnN0IHRvdGFsU2l6ZSA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBodW1hblN0b3JhZ2VTaXplKFxuICAgICAgICBpbm5lclZhbHVlLnZhbHVlLnJlZHVjZSgoYWNjLCBmaWxlKSA9PiBhY2MgKyBmaWxlLnNpemUsIDApXG4gICAgICApXG4gICAgKVxuXG4gICAgY29uc3QgY291bnRlclByb3BzID0gY29tcHV0ZWQoKCkgPT4gKHtcbiAgICAgIHRvdGFsU2l6ZTogdG90YWxTaXplLnZhbHVlLFxuICAgICAgZmlsZXNOdW1iZXI6IGlubmVyVmFsdWUudmFsdWUubGVuZ3RoLFxuICAgICAgbWF4RmlsZXM6IHByb3BzLm1heEZpbGVzXG4gICAgfSkpXG5cbiAgICBjb25zdCBpbnB1dEF0dHJzID0gY29tcHV0ZWQoKCkgPT4gKHtcbiAgICAgIHRhYmluZGV4OiAtMSxcbiAgICAgIHR5cGU6ICdmaWxlJyxcbiAgICAgIHRpdGxlOiAnJywgLy8gdHJ5IHRvIHJlbW92ZSBkZWZhdWx0IHRvb2x0aXAsXG4gICAgICBhY2NlcHQ6IHByb3BzLmFjY2VwdCxcbiAgICAgIGNhcHR1cmU6IHByb3BzLmNhcHR1cmUsXG4gICAgICBuYW1lOiBuYW1lUHJvcC52YWx1ZSxcbiAgICAgIC4uLmF0dHJzLFxuICAgICAgaWQ6IHN0YXRlLnRhcmdldFVpZC52YWx1ZSxcbiAgICAgIGRpc2FibGVkOiBzdGF0ZS5lZGl0YWJsZS52YWx1ZSAhPT0gdHJ1ZVxuICAgIH0pKVxuXG4gICAgY29uc3QgZmllbGRDbGFzcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAncS1maWxlIHEtZmllbGQtLWF1dG8taGVpZ2h0J1xuICAgICAgKyAoZG5kLnZhbHVlID09PSB0cnVlID8gJyBxLWZpbGUtLWRuZCcgOiAnJylcbiAgICApXG5cbiAgICBjb25zdCBpc0FwcGVuZGluZyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBwcm9wcy5tdWx0aXBsZSA9PT0gdHJ1ZSAmJiBwcm9wcy5hcHBlbmQgPT09IHRydWVcbiAgICApXG5cbiAgICBmdW5jdGlvbiByZW1vdmVBdEluZGV4IChpbmRleCkge1xuICAgICAgY29uc3QgZmlsZXMgPSBpbm5lclZhbHVlLnZhbHVlLnNsaWNlKClcbiAgICAgIGZpbGVzLnNwbGljZShpbmRleCwgMSlcbiAgICAgIGVtaXRWYWx1ZShmaWxlcylcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW1vdmVGaWxlIChmaWxlKSB7XG4gICAgICBjb25zdCBpbmRleCA9IGlubmVyVmFsdWUudmFsdWUuZmluZEluZGV4KGZpbGUpXG4gICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICByZW1vdmVBdEluZGV4KGluZGV4KVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVtaXRWYWx1ZSAoZmlsZXMpIHtcbiAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgcHJvcHMubXVsdGlwbGUgPT09IHRydWUgPyBmaWxlcyA6IGZpbGVzWyAwIF0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25LZXlkb3duIChlKSB7XG4gICAgICAvLyBwcmV2ZW50IGZvcm0gc3VibWl0IGlmIEVOVEVSIGlzIHByZXNzZWRcbiAgICAgIGUua2V5Q29kZSA9PT0gMTMgJiYgcHJldmVudChlKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uS2V5dXAgKGUpIHtcbiAgICAgIC8vIG9ubHkgb24gRU5URVIgYW5kIFNQQUNFIHRvIG1hdGNoIG5hdGl2ZSBpbnB1dCBmaWVsZFxuICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMTMgfHwgZS5rZXlDb2RlID09PSAzMikge1xuICAgICAgICBwaWNrRmlsZXMoZSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRGaWxlSW5wdXQgKCkge1xuICAgICAgcmV0dXJuIGlucHV0UmVmLnZhbHVlXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkRmlsZXNUb1F1ZXVlIChlLCBmaWxlTGlzdCkge1xuICAgICAgY29uc3QgZmlsZXMgPSBwcm9jZXNzRmlsZXMoZSwgZmlsZUxpc3QsIGlubmVyVmFsdWUudmFsdWUsIGlzQXBwZW5kaW5nLnZhbHVlKVxuICAgICAgY29uc3QgZmlsZUlucHV0ID0gZ2V0RmlsZUlucHV0KClcblxuICAgICAgaWYgKGZpbGVJbnB1dCAhPT0gdm9pZCAwICYmIGZpbGVJbnB1dCAhPT0gbnVsbCkge1xuICAgICAgICBmaWxlSW5wdXQudmFsdWUgPSAnJ1xuICAgICAgfVxuXG4gICAgICAvLyBpZiBub3RoaW5nIHRvIGRvLi4uXG4gICAgICBpZiAoZmlsZXMgPT09IHZvaWQgMCkgeyByZXR1cm4gfVxuXG4gICAgICAvLyBwcm90ZWN0IGFnYWluc3QgaW5wdXQgQGNoYW5nZSBiZWluZyBjYWxsZWQgaW4gYSBsb29wXG4gICAgICAvLyBsaWtlIGl0IGhhcHBlbnMgb24gU2FmYXJpLCBzbyBkb24ndCBlbWl0IHNhbWUgdGhpbmc6XG4gICAgICBpZiAoXG4gICAgICAgIHByb3BzLm11bHRpcGxlID09PSB0cnVlXG4gICAgICAgICAgPyBwcm9wcy5tb2RlbFZhbHVlICYmIGZpbGVzLmV2ZXJ5KGYgPT4gaW5uZXJWYWx1ZS52YWx1ZS5pbmNsdWRlcyhmKSlcbiAgICAgICAgICA6IHByb3BzLm1vZGVsVmFsdWUgPT09IGZpbGVzWyAwIF1cbiAgICAgICkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgZW1pdFZhbHVlKFxuICAgICAgICBpc0FwcGVuZGluZy52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAgID8gaW5uZXJWYWx1ZS52YWx1ZS5jb25jYXQoZmlsZXMpXG4gICAgICAgICAgOiBmaWxlc1xuICAgICAgKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEZpbGxlciAoKSB7XG4gICAgICByZXR1cm4gW1xuICAgICAgICBoKCdpbnB1dCcsIHtcbiAgICAgICAgICBjbGFzczogWyBwcm9wcy5pbnB1dENsYXNzLCAncS1maWxlX19maWxsZXInIF0sXG4gICAgICAgICAgc3R5bGU6IHByb3BzLmlucHV0U3R5bGVcbiAgICAgICAgfSlcbiAgICAgIF1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRTZWxlY3Rpb24gKCkge1xuICAgICAgaWYgKHNsb3RzLmZpbGUgIT09IHZvaWQgMCkge1xuICAgICAgICByZXR1cm4gaW5uZXJWYWx1ZS52YWx1ZS5sZW5ndGggPT09IDBcbiAgICAgICAgICA/IGdldEZpbGxlcigpXG4gICAgICAgICAgOiBpbm5lclZhbHVlLnZhbHVlLm1hcChcbiAgICAgICAgICAgIChmaWxlLCBpbmRleCkgPT4gc2xvdHMuZmlsZSh7IGluZGV4LCBmaWxlLCByZWY6IHRoaXMgfSlcbiAgICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIGlmIChzbG90cy5zZWxlY3RlZCAhPT0gdm9pZCAwKSB7XG4gICAgICAgIHJldHVybiBpbm5lclZhbHVlLnZhbHVlLmxlbmd0aCA9PT0gMFxuICAgICAgICAgID8gZ2V0RmlsbGVyKClcbiAgICAgICAgICA6IHNsb3RzLnNlbGVjdGVkKHsgZmlsZXM6IGlubmVyVmFsdWUudmFsdWUsIHJlZjogdGhpcyB9KVxuICAgICAgfVxuXG4gICAgICBpZiAocHJvcHMudXNlQ2hpcHMgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIGlubmVyVmFsdWUudmFsdWUubGVuZ3RoID09PSAwXG4gICAgICAgICAgPyBnZXRGaWxsZXIoKVxuICAgICAgICAgIDogaW5uZXJWYWx1ZS52YWx1ZS5tYXAoKGZpbGUsIGkpID0+IGgoUUNoaXAsIHtcbiAgICAgICAgICAgIGtleTogJ2ZpbGUtJyArIGksXG4gICAgICAgICAgICByZW1vdmFibGU6IHN0YXRlLmVkaXRhYmxlLnZhbHVlLFxuICAgICAgICAgICAgZGVuc2U6IHRydWUsXG4gICAgICAgICAgICB0ZXh0Q29sb3I6IHByb3BzLmNvbG9yLFxuICAgICAgICAgICAgdGFiaW5kZXg6IHByb3BzLnRhYmluZGV4LFxuICAgICAgICAgICAgb25SZW1vdmU6ICgpID0+IHsgcmVtb3ZlQXRJbmRleChpKSB9XG4gICAgICAgICAgfSwgKCkgPT4gaCgnc3BhbicsIHtcbiAgICAgICAgICAgIGNsYXNzOiAnZWxsaXBzaXMnLFxuICAgICAgICAgICAgdGV4dENvbnRlbnQ6IGZpbGUubmFtZVxuICAgICAgICAgIH0pKSlcbiAgICAgIH1cblxuICAgICAgY29uc3QgdGV4dENvbnRlbnQgPSBwcm9wcy5kaXNwbGF5VmFsdWUgIT09IHZvaWQgMFxuICAgICAgICA/IHByb3BzLmRpc3BsYXlWYWx1ZVxuICAgICAgICA6IHNlbGVjdGVkU3RyaW5nLnZhbHVlXG5cbiAgICAgIHJldHVybiB0ZXh0Q29udGVudC5sZW5ndGggPiAwXG4gICAgICAgID8gW1xuICAgICAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgICAgICBjbGFzczogcHJvcHMuaW5wdXRDbGFzcyxcbiAgICAgICAgICAgICAgc3R5bGU6IHByb3BzLmlucHV0U3R5bGUsXG4gICAgICAgICAgICAgIHRleHRDb250ZW50XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIF1cbiAgICAgICAgOiBnZXRGaWxsZXIoKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldElucHV0ICgpIHtcbiAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgIHJlZjogaW5wdXRSZWYsXG4gICAgICAgIC4uLmlucHV0QXR0cnMudmFsdWUsXG4gICAgICAgIC4uLmZvcm1Eb21Qcm9wcy52YWx1ZSxcbiAgICAgICAgY2xhc3M6ICdxLWZpZWxkX19pbnB1dCBmaXQgYWJzb2x1dGUtZnVsbCBjdXJzb3ItcG9pbnRlcicsXG4gICAgICAgIG9uQ2hhbmdlOiBhZGRGaWxlc1RvUXVldWVcbiAgICAgIH1cblxuICAgICAgaWYgKHByb3BzLm11bHRpcGxlID09PSB0cnVlKSB7XG4gICAgICAgIGRhdGEubXVsdGlwbGUgPSB0cnVlXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBoKCdpbnB1dCcsIGRhdGEpXG4gICAgfVxuXG4gICAgT2JqZWN0LmFzc2lnbihzdGF0ZSwge1xuICAgICAgZmllbGRDbGFzcyxcbiAgICAgIGVtaXRWYWx1ZSxcbiAgICAgIGhhc1ZhbHVlLFxuICAgICAgaW5wdXRSZWYsXG4gICAgICBpbm5lclZhbHVlLFxuXG4gICAgICBmbG9hdGluZ0xhYmVsOiBjb21wdXRlZCgoKSA9PlxuICAgICAgICBoYXNWYWx1ZS52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICB8fCBmaWVsZFZhbHVlSXNGaWxsZWQocHJvcHMuZGlzcGxheVZhbHVlKVxuICAgICAgKSxcblxuICAgICAgY29tcHV0ZWRDb3VudGVyOiBjb21wdXRlZCgoKSA9PiB7XG4gICAgICAgIGlmIChwcm9wcy5jb3VudGVyTGFiZWwgIT09IHZvaWQgMCkge1xuICAgICAgICAgIHJldHVybiBwcm9wcy5jb3VudGVyTGFiZWwoY291bnRlclByb3BzLnZhbHVlKVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbWF4ID0gcHJvcHMubWF4RmlsZXNcbiAgICAgICAgcmV0dXJuIGAkeyBpbm5lclZhbHVlLnZhbHVlLmxlbmd0aCB9JHsgbWF4ICE9PSB2b2lkIDAgPyAnIC8gJyArIG1heCA6ICcnIH0gKCR7IHRvdGFsU2l6ZS52YWx1ZSB9KWBcbiAgICAgIH0pLFxuXG4gICAgICBnZXRDb250cm9sQ2hpbGQ6ICgpID0+IGdldERuZE5vZGUoJ2ZpbGUnKSxcbiAgICAgIGdldENvbnRyb2w6ICgpID0+IHtcbiAgICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgICByZWY6IHN0YXRlLnRhcmdldFJlZixcbiAgICAgICAgICBjbGFzczogJ3EtZmllbGRfX25hdGl2ZSByb3cgaXRlbXMtY2VudGVyIGN1cnNvci1wb2ludGVyJyxcbiAgICAgICAgICB0YWJpbmRleDogcHJvcHMudGFiaW5kZXhcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdGF0ZS5lZGl0YWJsZS52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIE9iamVjdC5hc3NpZ24oZGF0YSwgeyBvbkRyYWdvdmVyLCBvbkRyYWdsZWF2ZSwgb25LZXlkb3duLCBvbktleXVwIH0pXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaCgnZGl2JywgZGF0YSwgWyBnZXRJbnB1dCgpIF0uY29uY2F0KGdldFNlbGVjdGlvbigpKSlcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgLy8gZXhwb3NlIHB1YmxpYyBtZXRob2RzXG4gICAgT2JqZWN0LmFzc2lnbihwcm94eSwge1xuICAgICAgcmVtb3ZlQXRJbmRleCxcbiAgICAgIHJlbW92ZUZpbGUsXG4gICAgICBnZXROYXRpdmVFbGVtZW50OiAoKSA9PiBpbnB1dFJlZi52YWx1ZSAvLyBkZXByZWNhdGVkXG4gICAgfSlcblxuICAgIGluamVjdFByb3AocHJveHksICduYXRpdmVFbCcsICgpID0+IGlucHV0UmVmLnZhbHVlKVxuXG4gICAgcmV0dXJuIHVzZUZpZWxkKHN0YXRlKVxuICB9XG59KVxuIiwiaW1wb3J0IHsgaCwgY29tcHV0ZWQsIGluamVjdCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGhTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9yZW5kZXIuanMnXG5pbXBvcnQgeyBwYWdlQ29udGFpbmVyS2V5LCBsYXlvdXRLZXksIGVtcHR5UmVuZGVyRm4gfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3N5bWJvbHMuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRUGFnZScsXG5cbiAgcHJvcHM6IHtcbiAgICBwYWRkaW5nOiBCb29sZWFuLFxuICAgIHN0eWxlRm46IEZ1bmN0aW9uXG4gIH0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzIH0pIHtcbiAgICBjb25zdCB7IHByb3h5OiB7ICRxIH0gfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG5cbiAgICBjb25zdCAkbGF5b3V0ID0gaW5qZWN0KGxheW91dEtleSwgZW1wdHlSZW5kZXJGbilcbiAgICBpZiAoJGxheW91dCA9PT0gZW1wdHlSZW5kZXJGbikge1xuICAgICAgY29uc29sZS5lcnJvcignUVBhZ2UgbmVlZHMgdG8gYmUgYSBkZWVwIGNoaWxkIG9mIFFMYXlvdXQnKVxuICAgICAgcmV0dXJuIGVtcHR5UmVuZGVyRm5cbiAgICB9XG5cbiAgICBjb25zdCAkcGFnZUNvbnRhaW5lciA9IGluamVjdChwYWdlQ29udGFpbmVyS2V5LCBlbXB0eVJlbmRlckZuKVxuICAgIGlmICgkcGFnZUNvbnRhaW5lciA9PT0gZW1wdHlSZW5kZXJGbikge1xuICAgICAgY29uc29sZS5lcnJvcignUVBhZ2UgbmVlZHMgdG8gYmUgY2hpbGQgb2YgUVBhZ2VDb250YWluZXInKVxuICAgICAgcmV0dXJuIGVtcHR5UmVuZGVyRm5cbiAgICB9XG5cbiAgICBjb25zdCBzdHlsZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IG9mZnNldFxuICAgICAgICA9ICgkbGF5b3V0LmhlYWRlci5zcGFjZSA9PT0gdHJ1ZSA/ICRsYXlvdXQuaGVhZGVyLnNpemUgOiAwKVxuICAgICAgICArICgkbGF5b3V0LmZvb3Rlci5zcGFjZSA9PT0gdHJ1ZSA/ICRsYXlvdXQuZm9vdGVyLnNpemUgOiAwKVxuXG4gICAgICBpZiAodHlwZW9mIHByb3BzLnN0eWxlRm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gJGxheW91dC5pc0NvbnRhaW5lci52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAgID8gJGxheW91dC5jb250YWluZXJIZWlnaHQudmFsdWVcbiAgICAgICAgICA6ICRxLnNjcmVlbi5oZWlnaHRcblxuICAgICAgICByZXR1cm4gcHJvcHMuc3R5bGVGbihvZmZzZXQsIGhlaWdodClcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbWluSGVpZ2h0OiAkbGF5b3V0LmlzQ29udGFpbmVyLnZhbHVlID09PSB0cnVlXG4gICAgICAgICAgPyAoJGxheW91dC5jb250YWluZXJIZWlnaHQudmFsdWUgLSBvZmZzZXQpICsgJ3B4J1xuICAgICAgICAgIDogKFxuICAgICAgICAgICAgICAkcS5zY3JlZW4uaGVpZ2h0ID09PSAwXG4gICAgICAgICAgICAgICAgPyAob2Zmc2V0ICE9PSAwID8gYGNhbGMoMTAwdmggLSAkeyBvZmZzZXQgfXB4KWAgOiAnMTAwdmgnKVxuICAgICAgICAgICAgICAgIDogKCRxLnNjcmVlbi5oZWlnaHQgLSBvZmZzZXQpICsgJ3B4J1xuICAgICAgICAgICAgKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIGBxLXBhZ2UkeyBwcm9wcy5wYWRkaW5nID09PSB0cnVlID8gJyBxLWxheW91dC1wYWRkaW5nJyA6ICcnIH1gXG4gICAgKVxuXG4gICAgcmV0dXJuICgpID0+IGgoJ21haW4nLCB7XG4gICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZSxcbiAgICAgIHN0eWxlOiBzdHlsZS52YWx1ZVxuICAgIH0sIGhTbG90KHNsb3RzLmRlZmF1bHQpKVxuICB9XG59KVxuIiwiPHRlbXBsYXRlPlxyXG4gIDxxLXNsaWRlLWl0ZW1cclxuICAgIEBsZWZ0PVwic2hvd0VkaXRNYXJrZXREaWFsb2dcIlxyXG4gICAgQHJpZ2h0PVwic2hvd0RlbGV0ZU1hcmtldERpYWxvZ1wiXHJcbiAgICBAY2xpY2s9XCJnb1RvTWFya2V0RGV0YWlsc1BhZ2VcIlxyXG4gID5cclxuICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6bGVmdD5cclxuICAgICAgPGRpdiBjbGFzcz1cInJvdyBpdGVtcy1jZW50ZXJcIj48cS1pY29uIGxlZnQgbmFtZT1cImVkaXRcIiAvPiBFZGl0PC9kaXY+XHJcbiAgICA8L3RlbXBsYXRlPlxyXG4gICAgPHRlbXBsYXRlIHYtc2xvdDpyaWdodD5cclxuICAgICAgPGRpdiBjbGFzcz1cInJvdyBpdGVtcy1jZW50ZXJcIj5EZWxldGUgPHEtaWNvbiByaWdodCBuYW1lPVwiZGVsZXRlXCIgLz48L2Rpdj5cclxuICAgIDwvdGVtcGxhdGU+XHJcblxyXG4gICAgPHEtaXRlbT5cclxuICAgICAgPHEtaXRlbS1zZWN0aW9uIGF2YXRhcj5cclxuICAgICAgICA8cS1hdmF0YXIgcm91bmRlZD5cclxuICAgICAgICAgIDxpbWcgOnNyYz1cIm1hcmtldEluZm8ubG9nb1wiIC8+XHJcbiAgICAgICAgPC9xLWF2YXRhcj5cclxuICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cclxuICAgICAgPHEtaXRlbS1zZWN0aW9uXHJcbiAgICAgICAgPjxkaXYgY2xhc3M9XCJtYXJrZXQtY2FyZF9fbmFtZVwiPlxyXG4gICAgICAgICAge3sgbWFya2V0SW5mby5uYW1lIH19XHJcbiAgICAgICAgPC9kaXY+PC9xLWl0ZW0tc2VjdGlvblxyXG4gICAgICA+XHJcbiAgICA8L3EtaXRlbT5cclxuICA8L3Etc2xpZGUtaXRlbT5cclxuICA8cS1kaWFsb2cgbWF4aW1pemVkIHYtbW9kZWw9XCJzaG93RWRpdE1hcmtldFwiPlxyXG4gICAgPHEtY2FyZD5cclxuICAgICAgPHEtY2FyZC1zZWN0aW9uIGNsYXNzPVwicm93IGl0ZW1zLWNlbnRlciBxLXBiLW5vbmVcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNlwiPkVkaXQgTWFya2V0PC9kaXY+XHJcbiAgICAgICAgPHEtc3BhY2UgLz5cclxuICAgICAgICA8cS1idG4gaWNvbj1cImNsb3NlXCIgZmxhdCByb3VuZCBkZW5zZSB2LWNsb3NlLXBvcHVwIC8+XHJcbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XHJcblxyXG4gICAgICA8cS1jYXJkLXNlY3Rpb24+XHJcbiAgICAgICAgPHEtaW5wdXRcclxuICAgICAgICAgIHYtbW9kZWw9XCJtYXJrZXROYW1lXCJcclxuICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgIGxhYmVsPVwiTWFya2V0IE5hbWVcIlxyXG4gICAgICAgICAgY2xhc3M9XCJxLW1iLWxnXCJcclxuICAgICAgICAvPlxyXG4gICAgICAgIDxxLWZpbGVcclxuICAgICAgICAgIGNvbG9yPVwiY3lhbi05XCJcclxuICAgICAgICAgIGZpbGxlZFxyXG4gICAgICAgICAgdi1tb2RlbD1cIm1hcmtldExvZ29cIlxyXG4gICAgICAgICAgbGFiZWw9XCJMb2dvXCJcclxuICAgICAgICAgIEB1cGRhdGU6bW9kZWwtdmFsdWU9XCJ1cGxvYWRGaWxlXCJcclxuICAgICAgICA+XHJcbiAgICAgICAgICA8dGVtcGxhdGUgdi1zbG90OnByZXBlbmQ+XHJcbiAgICAgICAgICAgIDxxLWljb24gbmFtZT1cImNsb3VkX3VwbG9hZFwiIC8+XHJcbiAgICAgICAgICA8L3RlbXBsYXRlPlxyXG4gICAgICAgIDwvcS1maWxlPlxyXG4gICAgICA8L3EtY2FyZC1zZWN0aW9uPlxyXG4gICAgICA8cS1idG4gc3R5bGU9XCJjb2xvcjogIzI2NzM3OFwiIEBjbGljaz1cImVkaXRNYXJrZXRcIj5FZGl0IG1hcmtldDwvcS1idG4+XHJcbiAgICA8L3EtY2FyZD5cclxuICA8L3EtZGlhbG9nPlxyXG4gIDxxLWRpYWxvZyB2LW1vZGVsPVwic2hvd0RlbGV0ZU1hcmtldFwiIHBlcnNpc3RlbnQ+XHJcbiAgICA8cS1jYXJkPlxyXG4gICAgICA8cS1jYXJkLXNlY3Rpb24gY2xhc3M9XCJyb3cgaXRlbXMtY2VudGVyXCI+XHJcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJxLW1sLXNtXCJcclxuICAgICAgICAgID5BcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIHt7IG1hcmtldEluZm8ubmFtZSB9fT88L3NwYW5cclxuICAgICAgICA+XHJcbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XHJcblxyXG4gICAgICA8cS1jYXJkLWFjdGlvbnMgYWxpZ249XCJyaWdodFwiPlxyXG4gICAgICAgIDxxLWJ0biBmbGF0IGxhYmVsPVwiQ2FuY2VsXCIgY29sb3I9XCJwcmltYXJ5XCIgdi1jbG9zZS1wb3B1cCAvPlxyXG4gICAgICAgIDxxLWJ0biBmbGF0IGxhYmVsPVwiRGVsZXRlXCIgY29sb3I9XCJyZWRcIiBAY2xpY2s9XCJkZWxldGVNYXJrZXRcIiAvPlxyXG4gICAgICA8L3EtY2FyZC1hY3Rpb25zPlxyXG4gICAgPC9xLWNhcmQ+XHJcbiAgPC9xLWRpYWxvZz5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBuYW1lOiBcIk1hcmtldENhcmRcIixcclxuICBwcm9wczogW1wibWFya2V0SW5mb1wiXSxcclxuICBkYXRhKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc2hvd0VkaXRNYXJrZXQ6IGZhbHNlLFxyXG4gICAgICBzaG93RGVsZXRlTWFya2V0OiBmYWxzZSxcclxuICAgICAgbWFya2V0TmFtZTogbnVsbCxcclxuICAgICAgbWFya2V0TG9nbzogbnVsbCxcclxuICAgICAgdGltZXI6IG51bGwsXHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgZW1pdHM6IFtcImZldGNoTWFya2V0c1wiXSxcclxuICBtb3VudGVkKCkge1xyXG4gICAgdGhpcy5tYXJrZXROYW1lID0gdGhpcy5tYXJrZXRJbmZvLm5hbWU7XHJcbiAgfSxcclxuICBiZWZvcmVVbm1vdW50KCkge1xyXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZXIpO1xyXG4gIH0sXHJcbiAgbWV0aG9kczoge1xyXG4gICAgZmluYWxpemUocmVzZXQpIHtcclxuICAgICAgdGhpcy50aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHJlc2V0KCk7XHJcbiAgICAgIH0sIDEwMDApO1xyXG4gICAgfSxcclxuICAgIGdvVG9NYXJrZXREZXRhaWxzUGFnZSgpIHtcclxuICAgICAgdGhpcy4kcm91dGVyLnB1c2goYC9hZG1pbmlzdHJhdGlvbi9tYXJrZXRzLyR7dGhpcy5tYXJrZXRJbmZvLl9pZH1gKTtcclxuICAgIH0sXHJcbiAgICBzaG93RWRpdE1hcmtldERpYWxvZyh7IHJlc2V0IH0pIHtcclxuICAgICAgdGhpcy5zaG93RWRpdE1hcmtldCA9IHRydWU7XHJcbiAgICAgIHRoaXMuZmluYWxpemUocmVzZXQpO1xyXG4gICAgfSxcclxuICAgIGFzeW5jIGVkaXRNYXJrZXQoKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgbGV0IGRhdGEgPSBuZXcgRm9ybURhdGEoKTtcclxuICAgICAgICBkYXRhLmFwcGVuZChcIm5hbWVcIiwgdGhpcy5tYXJrZXROYW1lKTtcclxuICAgICAgICBkYXRhLmFwcGVuZChcImxvZ29cIiwgdGhpcy5tYXJrZXRMb2dvKTtcclxuXHJcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy4kYXBpLnBhdGNoKFxyXG4gICAgICAgICAgYC9tYXJrZXRzLyR7dGhpcy5tYXJrZXRJbmZvLl9pZH1gLFxyXG4gICAgICAgICAgZGF0YVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgaWYgKHJlcy5kYXRhLnN0YXR1cyA9PT0gXCJzdWNjZXNzXCIpIHtcclxuICAgICAgICAgIHRoaXMuJGVtaXQoXCJmZXRjaE1hcmtldHNcIik7XHJcbiAgICAgICAgICB0aGlzLnNob3dFZGl0TWFya2V0ID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgc2hvd0RlbGV0ZU1hcmtldERpYWxvZyh7IHJlc2V0IH0pIHtcclxuICAgICAgdGhpcy5zaG93RGVsZXRlTWFya2V0ID0gdHJ1ZTtcclxuICAgICAgdGhpcy5maW5hbGl6ZShyZXNldCk7XHJcbiAgICB9LFxyXG4gICAgYXN5bmMgZGVsZXRlTWFya2V0KCkge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuJGFwaS5kZWxldGUoYC9tYXJrZXRzLyR7dGhpcy5tYXJrZXRJbmZvLl9pZH1gKTtcclxuICAgICAgICBpZiAocmVzLmRhdGEuc3RhdHVzID09PSBcInN1Y2Nlc3NcIikge1xyXG4gICAgICAgICAgdGhpcy4kZW1pdChcImZldGNoTWFya2V0c1wiKTtcclxuICAgICAgICAgIHRoaXMuc2hvd0RlbGV0ZU1hcmtldCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIHVwbG9hZEZpbGUoKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMubWFya2V0TG9nbyk7XHJcbiAgICB9LFxyXG4gIH0sXHJcbn07XHJcbjwvc2NyaXB0PlxyXG5cclxuPHN0eWxlIHNjb3BlZD5cclxuLm1hcmtldC1jYXJkX19uYW1lIHtcclxuICBmb250LXNpemU6IDIwcHg7XHJcbiAgZm9udC13ZWlnaHQ6IDYwMDtcclxufVxyXG4vKiAubWFya2V0LWNhcmQge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZ2FwOiAyMHB4O1xyXG4gIG1hcmdpbjogMjBweDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjNmM2YzO1xyXG59ICovXHJcbmltZyB7XHJcbiAgd2lkdGg6IDgwcHg7XHJcbiAgaGVpZ2h0OiA4MHB4O1xyXG59XHJcblxyXG4udGV4dC1oNiB7XHJcbiAgY29sb3I6ICMyNjczNzg7XHJcbn1cclxuPC9zdHlsZT5cclxuIiwiPHRlbXBsYXRlPlxyXG4gIDxxLXBhZ2U+XHJcbiAgICA8ZGl2IGNsYXNzPVwicGFnZS1zdHlsZVwiPlxyXG4gICAgICA8cS1idG4gY2xhc3M9XCJhZGQtbWFya2V0X19idG5cIiBAY2xpY2s9XCJzaG93QWRkTWFya2V0ID0gdHJ1ZVwiXHJcbiAgICAgICAgPkFkZCBNYXJrZXQ8L3EtYnRuXHJcbiAgICAgID5cclxuICAgICAgPGRpdiBjbGFzcz1cIm1hcmtldC1jYXJkX19saXN0XCI+XHJcbiAgICAgICAgPE1hcmtldENhcmRcclxuICAgICAgICAgIHYtZm9yPVwibWFya2V0IGluIG1hcmtldHNcIlxyXG4gICAgICAgICAgOmtleT1cIm1hcmtldC5faWRcIlxyXG4gICAgICAgICAgOm1hcmtldEluZm89XCJtYXJrZXRcIlxyXG4gICAgICAgICAgQGZldGNoTWFya2V0cz1cImZldGNoTWFya2V0c1wiXHJcbiAgICAgICAgPjwvTWFya2V0Q2FyZD5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxxLWRpYWxvZyBtYXhpbWl6ZWQgdi1tb2RlbD1cInNob3dBZGRNYXJrZXRcIj5cclxuICAgICAgPHEtY2FyZD5cclxuICAgICAgICA8cS1jYXJkLXNlY3Rpb24gY2xhc3M9XCJyb3cgaXRlbXMtY2VudGVyIHEtcGItbm9uZVwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDZcIj5BZGQgTWFya2V0PC9kaXY+XHJcbiAgICAgICAgICA8cS1zcGFjZSAvPlxyXG4gICAgICAgICAgPHEtYnRuIGljb249XCJjbG9zZVwiIGZsYXQgcm91bmQgZGVuc2Ugdi1jbG9zZS1wb3B1cCAvPlxyXG4gICAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XHJcblxyXG4gICAgICAgIDxxLWNhcmQtc2VjdGlvbj5cclxuICAgICAgICAgIDxxLWlucHV0XHJcbiAgICAgICAgICAgIHYtbW9kZWw9XCJtYXJrZXROYW1lXCJcclxuICAgICAgICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgICBsYWJlbD1cIk1hcmtldCBOYW1lXCJcclxuICAgICAgICAgICAgY2xhc3M9XCJxLW1iLWxnXCJcclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8cS1maWxlXHJcbiAgICAgICAgICAgIGNvbG9yPVwidGVhbFwiXHJcbiAgICAgICAgICAgIGZpbGxlZFxyXG4gICAgICAgICAgICB2LW1vZGVsPVwibWFya2V0TG9nb1wiXHJcbiAgICAgICAgICAgIGxhYmVsPVwiTG9nb1wiXHJcbiAgICAgICAgICAgIEB1cGRhdGU6bW9kZWwtdmFsdWU9XCJ1cGxvYWRGaWxlXCJcclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDpwcmVwZW5kPlxyXG4gICAgICAgICAgICAgIDxxLWljb24gbmFtZT1cImNsb3VkX3VwbG9hZFwiIC8+XHJcbiAgICAgICAgICAgIDwvdGVtcGxhdGU+XHJcbiAgICAgICAgICA8L3EtZmlsZT5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJhZGQtbWFya2V0X19jb250YWluZXJcIj5cclxuICAgICAgICAgICAgPHEtYnRuIGNsYXNzPVwiYWRkLW1hcmtldF9fYnRuIHEtbXQtbGdcIiBAY2xpY2s9XCJhZGRNYXJrZXRcIlxyXG4gICAgICAgICAgICAgID5BZGQgbWFya2V0PC9xLWJ0blxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L3EtY2FyZC1zZWN0aW9uPlxyXG4gICAgICA8L3EtY2FyZD5cclxuICAgIDwvcS1kaWFsb2c+XHJcbiAgPC9xLXBhZ2U+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG5pbXBvcnQgTWFya2V0Q2FyZCBmcm9tIFwic3JjL2NvbXBvbmVudHMvYWRtaW5pc3RyYXRpb24vTWFya2V0Q2FyZC52dWVcIjtcclxuaW1wb3J0IHsgdXNlRGFzaEhlYWRlclN0b3JlIH0gZnJvbSBcInNyYy9zdG9yZXMvZGFzaC1oZWFkZXJcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBuYW1lOiBcIkFkbWluaXN0cmF0aW9uUGFnZVwiLFxyXG4gIGNvbXBvbmVudHM6IHtcclxuICAgIE1hcmtldENhcmQsXHJcbiAgfSxcclxuICBhc3luYyBtb3VudGVkKCkge1xyXG4gICAgY29uc3QgZGFzaEhlYWRlciA9IHVzZURhc2hIZWFkZXJTdG9yZSgpO1xyXG4gICAgZGFzaEhlYWRlci4kcGF0Y2goeyB0aXRsZTogXCJNYXJrZXRzXCIsIHNob3dCYWNrSWNvbjogdHJ1ZSB9KTtcclxuICAgIGF3YWl0IHRoaXMuZmV0Y2hNYXJrZXRzKCk7XHJcbiAgfSxcclxuICBkYXRhKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbWFya2V0czogW10sXHJcbiAgICAgIHNob3dBZGRNYXJrZXQ6IGZhbHNlLFxyXG4gICAgICBtYXJrZXRMb2dvOiBudWxsLFxyXG4gICAgICBtYXJrZXROYW1lOiBcIlwiLFxyXG4gICAgfTtcclxuICB9LFxyXG4gIG1ldGhvZHM6IHtcclxuICAgIHVwbG9hZEZpbGUoKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMubWFya2V0TG9nbyk7XHJcbiAgICB9LFxyXG4gICAgYXN5bmMgZmV0Y2hNYXJrZXRzKCkge1xyXG4gICAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLiRhcGkuZ2V0KFwiL21hcmtldHNcIik7XHJcbiAgICAgIHRoaXMubWFya2V0cyA9IHJlcy5kYXRhLmRhdGEubWFya2V0cztcclxuICAgIH0sXHJcbiAgICByZXNldEZpZWxkcygpIHtcclxuICAgICAgdGhpcy5tYXJrZXRMb2dvID0gbnVsbDtcclxuICAgICAgdGhpcy5tYXJrZXROYW1lID0gXCJcIjtcclxuICAgIH0sXHJcbiAgICBhc3luYyBhZGRNYXJrZXQoKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgbGV0IGRhdGEgPSBuZXcgRm9ybURhdGEoKTtcclxuICAgICAgICBkYXRhLmFwcGVuZChcIm5hbWVcIiwgdGhpcy5tYXJrZXROYW1lKTtcclxuICAgICAgICBkYXRhLmFwcGVuZChcImxvZ29cIiwgdGhpcy5tYXJrZXRMb2dvKTtcclxuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLiRhcGkucG9zdChcIi9tYXJrZXRzXCIsIGRhdGEpO1xyXG4gICAgICAgIGlmIChyZXMuZGF0YS5zdGF0dXMgPT09IFwic3VjY2Vzc1wiKSB7XHJcbiAgICAgICAgICBhd2FpdCB0aGlzLmZldGNoTWFya2V0cygpO1xyXG4gICAgICAgICAgdGhpcy5zaG93QWRkTWFya2V0ID0gZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLnJlc2V0RmllbGRzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICB9LFxyXG59O1xyXG48L3NjcmlwdD5cclxuXHJcbjxzdHlsZSBsYW5nPVwic2Nzc1wiIHNjb3BlZD5cclxuLm1hcmtldHMtaGVhZGVyIHtcclxuICBmb250LXNpemU6IDMycHg7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIG1hcmdpbi10b3A6IDIwcHg7XHJcbn1cclxuLnBhZ2Utc3R5bGUge1xyXG4gIHBhZGRpbmctdG9wOiAxMHB4O1xyXG59XHJcbi5hZGQtbWFya2V0X19idG4ge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICRicmFuZC1jb2xvcjtcclxuICBjb2xvcjogd2hpdGU7XHJcbiAgbWFyZ2luOiAxMHB4O1xyXG59XHJcbi5hZGQtbWFya2V0X19jb250YWluZXIge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgbWFyZ2luLXRvcDogMjBweDtcclxufVxyXG4uYWRkLW1hcmtldC1tb2RhbCB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VlZTtcclxufVxyXG5cclxuLm1hcmtldC1jYXJkX19saXN0IHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgZ2FwOiAxNXB4O1xyXG59XHJcbjwvc3R5bGU+XHJcbiJdLCJuYW1lcyI6WyJfc2ZjX21haW4iLCJfaG9pc3RlZF8xIiwiX2hvaXN0ZWRfMiIsIl9ob2lzdGVkXzQiLCJfd2l0aFNjb3BlSWQiLCJfY3JlYXRlRWxlbWVudFZOb2RlIiwiX2NyZWF0ZVZOb2RlIiwiX3RvRGlzcGxheVN0cmluZyIsIl9jcmVhdGVCbG9jayIsIl9jcmVhdGVFbGVtZW50QmxvY2siLCJfRnJhZ21lbnQiLCJfcmVuZGVyTGlzdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBS0EsU0FBUyxZQUFhLE9BQU8sZUFBZSxzQkFBc0IsVUFBVTtBQUMxRSxRQUFNLGdCQUFnQixDQUFFO0FBRXhCLFFBQU0sUUFBUSxVQUFRO0FBQ3BCLFFBQUksU0FBUyxJQUFJLE1BQU0sTUFBTTtBQUMzQixvQkFBYyxLQUFLLElBQUk7QUFBQSxJQUN4QixPQUNJO0FBQ0gsb0JBQWMsS0FBSyxFQUFFLHNCQUFzQixLQUFJLENBQUU7QUFBQSxJQUNsRDtBQUFBLEVBQ0wsQ0FBRztBQUVELFNBQU87QUFDVDtBQUVBLFNBQVMsbUJBQW9CLEdBQUc7QUFDOUIsT0FBSyxFQUFFLGlCQUFpQixFQUFFLGFBQWEsYUFBYTtBQUNwRCxpQkFBZSxDQUFDO0FBQ2xCO0FBRU8sTUFBTSxlQUFlO0FBQUEsRUFDMUIsVUFBVTtBQUFBLEVBQ1YsUUFBUTtBQUFBLEVBQ1IsU0FBUztBQUFBLEVBQ1QsYUFBYSxDQUFFLFFBQVEsTUFBUTtBQUFBLEVBQy9CLGNBQWMsQ0FBRSxRQUFRLE1BQVE7QUFBQSxFQUNoQyxVQUFVLENBQUUsUUFBUSxNQUFRO0FBQUEsRUFDNUIsUUFBUTtBQUNWO0FBRU8sTUFBTSxlQUFlLENBQUUsVUFBWTtBQUUzQixTQUFBLFFBQVU7QUFBQSxFQUN2QjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNGLEdBQUc7QUFDRCxRQUFNLEVBQUUsT0FBTyxNQUFNLE1BQUssSUFBSyxtQkFBb0I7QUFFbkQsUUFBTSxTQUFTLElBQUksSUFBSTtBQUV2QixRQUFNLGFBQWEsU0FBUyxNQUMxQixNQUFNLFdBQVcsU0FDYixNQUFNLE9BQU8sTUFBTSxHQUFHLEVBQUUsSUFBSSxTQUFPO0FBQ25DLFVBQU0sSUFBSSxLQUFNO0FBQ2hCLFFBQUksUUFBUSxLQUFLO0FBQ2YsYUFBTztBQUFBLElBQ1IsV0FDUSxJQUFJLFNBQVMsSUFBSSxHQUFHO0FBQzNCLFlBQU0sSUFBSSxNQUFNLEdBQUcsSUFBSSxTQUFTLENBQUM7QUFBQSxJQUNsQztBQUNELFdBQU8sSUFBSSxZQUFhO0FBQUEsRUFDaEMsQ0FBTyxJQUNDLElBQ0w7QUFFRCxRQUFNLGlCQUFpQixTQUFTLE1BQU0sU0FBUyxNQUFNLFVBQVUsRUFBRSxDQUFDO0FBQ2xFLFFBQU0scUJBQXFCLFNBQVMsTUFBTSxTQUFTLE1BQU0sY0FBYyxFQUFFLENBQUM7QUFFMUUsV0FBUyxVQUFXLEdBQUc7QUFDckIsUUFBSSxTQUFTLE9BQU87QUFDbEIsVUFBSSxNQUFNLE9BQU8sQ0FBQyxHQUFHO0FBQ25CLFlBQUksRUFBRSxRQUFRLEtBQU07QUFBQSxNQUNyQjtBQUVELFVBQUksRUFBRSxXQUFXLFFBQVEsRUFBRSxPQUFPLFFBQVEsb0JBQW9CLE1BQU0sTUFBTTtBQUV4RSxVQUFFLFlBQVksS0FBSyxFQUFFLFlBQVksS0FBSyxLQUFLLENBQUM7QUFBQSxNQUM3QyxPQUNJO0FBQ0gsY0FBTSxRQUFRLGFBQWM7QUFDNUIsaUJBQVMsVUFBVSxFQUFFLFVBQVUsTUFBTSxNQUFNLENBQUM7QUFBQSxNQUM3QztBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBRUQsV0FBUyxTQUFVLE9BQU87QUFDeEIsUUFBSSxTQUFTLFNBQVMsT0FBTztBQUMzQixzQkFBZ0IsTUFBTSxLQUFLO0FBQUEsSUFDNUI7QUFBQSxFQUNGO0FBRUQsV0FBUyxhQUFjLEdBQUcsZ0JBQWdCLGlCQUFpQixRQUFRO0FBQ2pFLFFBQUksUUFBUSxNQUFNLEtBQUssa0JBQWtCLEVBQUUsT0FBTyxLQUFLO0FBQ3ZELFVBQU0sZ0JBQWdCLENBQUU7QUFFeEIsVUFBTSxPQUFPLE1BQU07QUFDakIsVUFBSSxjQUFjLFNBQVMsR0FBRztBQUM1QixhQUFLLFlBQVksYUFBYTtBQUFBLE1BQy9CO0FBQUEsSUFDRjtBQUdELFFBQUksTUFBTSxXQUFXLFVBQVUsV0FBVyxNQUFNLFFBQVEsSUFBSSxNQUFNLElBQUk7QUFDcEUsY0FBUSxZQUFZLE9BQU8sZUFBZSxVQUFVLFVBQVE7QUFDMUQsZUFBTyxXQUFXLE1BQU0sS0FBSyxTQUMzQixLQUFLLEtBQUssY0FBYyxXQUFXLEdBQUcsS0FDbkMsS0FBSyxLQUFLLGNBQWMsU0FBUyxHQUFHLENBQ3hDO0FBQUEsTUFDVCxDQUFPO0FBRUQsVUFBSSxNQUFNLFdBQVcsR0FBRztBQUFFLGVBQU8sS0FBSTtBQUFBLE1BQUk7QUFBQSxJQUMxQztBQUdELFFBQUksTUFBTSxnQkFBZ0IsUUFBUTtBQUNoQyxZQUFNLGNBQWMsU0FBUyxNQUFNLGFBQWEsRUFBRTtBQUNsRCxjQUFRLFlBQVksT0FBTyxlQUFlLGlCQUFpQixVQUFRO0FBQ2pFLGVBQU8sS0FBSyxRQUFRO0FBQUEsTUFDNUIsQ0FBTztBQUVELFVBQUksTUFBTSxXQUFXLEdBQUc7QUFBRSxlQUFPLEtBQUk7QUFBQSxNQUFJO0FBQUEsSUFDMUM7QUFLRCxRQUFJLE1BQU0sYUFBYSxRQUFRLE1BQU0sU0FBUyxHQUFHO0FBQy9DLGNBQVEsQ0FBRSxNQUFPLEVBQUs7QUFBQSxJQUN2QjtBQUdELFVBQU0sUUFBUSxVQUFRO0FBQ3BCLFdBQUssUUFBUSxLQUFLLHFCQUFxQixLQUFLLGVBQWUsS0FBSyxPQUFPLEtBQUs7QUFBQSxJQUNsRixDQUFLO0FBRUQsUUFBSSxXQUFXLE1BQU07QUFFbkIsWUFBTSxjQUFjLGdCQUFnQixJQUFJLFdBQVMsTUFBTSxLQUFLO0FBQzVELGNBQVEsWUFBWSxPQUFPLGVBQWUsYUFBYSxVQUFRO0FBQzdELGVBQU8sWUFBWSxTQUFTLEtBQUssS0FBSyxNQUFNO0FBQUEsTUFDcEQsQ0FBTztBQUFBLElBQ0Y7QUFFRCxRQUFJLE1BQU0sV0FBVyxHQUFHO0FBQUUsYUFBTyxLQUFJO0FBQUEsSUFBSTtBQUV6QyxRQUFJLE1BQU0saUJBQWlCLFFBQVE7QUFDakMsVUFBSSxPQUFPLFdBQVcsT0FDbEIsZ0JBQWdCLE9BQU8sQ0FBQyxPQUFPLFNBQVMsUUFBUSxLQUFLLE1BQU0sQ0FBQyxJQUM1RDtBQUVKLGNBQVEsWUFBWSxPQUFPLGVBQWUsa0JBQWtCLFVBQVE7QUFDbEUsZ0JBQVEsS0FBSztBQUNiLGVBQU8sUUFBUSxtQkFBbUI7QUFBQSxNQUMxQyxDQUFPO0FBRUQsVUFBSSxNQUFNLFdBQVcsR0FBRztBQUFFLGVBQU8sS0FBSTtBQUFBLE1BQUk7QUFBQSxJQUMxQztBQUdELFFBQUksT0FBTyxNQUFNLFdBQVcsWUFBWTtBQUN0QyxZQUFNLGdCQUFnQixNQUFNLE9BQU8sS0FBSztBQUN4QyxjQUFRLFlBQVksT0FBTyxlQUFlLFVBQVUsVUFBUTtBQUMxRCxlQUFPLGNBQWMsU0FBUyxJQUFJO0FBQUEsTUFDMUMsQ0FBTztBQUFBLElBQ0Y7QUFFRCxRQUFJLE1BQU0sYUFBYSxRQUFRO0FBQzdCLFVBQUksY0FBYyxXQUFXLE9BQ3pCLGdCQUFnQixTQUNoQjtBQUVKLGNBQVEsWUFBWSxPQUFPLGVBQWUsYUFBYSxNQUFNO0FBQzNEO0FBQ0EsZUFBTyxlQUFlLGVBQWU7QUFBQSxNQUM3QyxDQUFPO0FBRUQsVUFBSSxNQUFNLFdBQVcsR0FBRztBQUFFLGVBQU8sS0FBSTtBQUFBLE1BQUk7QUFBQSxJQUMxQztBQUVELFNBQU07QUFFTixRQUFJLE1BQU0sU0FBUyxHQUFHO0FBQ3BCLGFBQU87QUFBQSxJQUNSO0FBQUEsRUFDRjtBQUVELFdBQVMsV0FBWSxHQUFHO0FBQ3RCLHVCQUFtQixDQUFDO0FBQ3BCLFFBQUksVUFBVSxTQUFTLElBQUksUUFBUTtBQUFBLEVBQ3BDO0FBRUQsV0FBUyxZQUFhLEdBQUc7QUFDdkIsbUJBQWUsQ0FBQztBQUloQixVQUFNLE9BQU8sRUFBRSxrQkFBa0IsUUFBUSxPQUFPLEdBQUcsV0FBVyxPQUMxRCxFQUFFLGtCQUFrQixPQUFPLFFBQzNCLFNBQVMsa0JBQWtCLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxTQUFTLE9BQU8sS0FBSyxNQUFNO0FBRWhGLGFBQVMsU0FBUyxJQUFJLFFBQVE7QUFBQSxFQUMvQjtBQUVELFdBQVMsT0FBUSxHQUFHO0FBQ2xCLHVCQUFtQixDQUFDO0FBQ3BCLFVBQU0sUUFBUSxFQUFFLGFBQWE7QUFFN0IsUUFBSSxNQUFNLFNBQVMsR0FBRztBQUNwQixzQkFBZ0IsTUFBTSxLQUFLO0FBQUEsSUFDNUI7QUFFRCxRQUFJLFFBQVE7QUFBQSxFQUNiO0FBRUQsV0FBUyxXQUFZLE1BQU07QUFDekIsUUFBSSxJQUFJLFVBQVUsTUFBTTtBQUN0QixhQUFPLEVBQUUsT0FBTztBQUFBLFFBQ2QsS0FBSztBQUFBLFFBQ0wsT0FBTyxLQUFNO0FBQUEsUUFDYixhQUFhO0FBQUEsUUFDYixZQUFZO0FBQUEsUUFDWjtBQUFBLFFBQ0E7QUFBQSxNQUNSLENBQU87QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUdELFNBQU8sT0FBTyxPQUFPLEVBQUUsV0FBVyxTQUFRLENBQUU7QUFFNUMsU0FBTztBQUFBLElBQ0w7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBRUE7QUFBQSxJQUNBO0FBQUEsRUFDRDtBQUNIO0FDaE9BLElBQUEsUUFBZSxnQkFBZ0I7QUFBQSxFQUM3QixNQUFNO0FBQUEsRUFFTixjQUFjO0FBQUEsRUFFZCxPQUFPO0FBQUEsSUFDTCxHQUFHO0FBQUEsSUFDSCxHQUFHO0FBQUEsSUFDSCxHQUFHO0FBQUEsSUFHSCxZQUVJLENBQUUsTUFBTSxVQUFVLEtBQU87QUFBQSxJQUU3QixRQUFRO0FBQUEsSUFDUixVQUFVO0FBQUEsSUFDVixjQUFjLENBQUUsUUFBUSxNQUFRO0FBQUEsSUFFaEMsVUFBVTtBQUFBLE1BQ1IsTUFBTSxDQUFFLFFBQVEsTUFBUTtBQUFBLE1BQ3hCLFNBQVM7QUFBQSxJQUNWO0FBQUEsSUFFRCxjQUFjO0FBQUEsSUFFZCxZQUFZLENBQUUsT0FBTyxRQUFRLE1BQVE7QUFBQSxJQUNyQyxZQUFZLENBQUUsT0FBTyxRQUFRLE1BQVE7QUFBQSxFQUN0QztBQUFBLEVBRUQsT0FBTztBQUFBLElBQ0wsR0FBRztBQUFBLElBQ0gsR0FBRztBQUFBLEVBQ0o7QUFBQSxFQUVELE1BQU8sT0FBTyxFQUFFLE9BQU8sTUFBTSxNQUFLLEdBQUk7QUFDcEMsVUFBTSxFQUFFLE1BQU8sSUFBRyxtQkFBb0I7QUFFdEMsVUFBTSxRQUFRLGNBQWU7QUFFN0IsVUFBTSxXQUFXLElBQUksSUFBSTtBQUN6QixVQUFNLE1BQU0sSUFBSSxLQUFLO0FBQ3JCLFVBQU0sV0FBVyxxQkFBcUIsS0FBSztBQUUzQyxVQUFNO0FBQUEsTUFDSjtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNOLElBQVEsUUFBUSxFQUFFLFVBQVUsTUFBTSxVQUFVLEtBQUssY0FBYyxpQkFBaUI7QUFFNUUsVUFBTSxlQUFlLG9CQUFvQixLQUFLO0FBRTlDLFVBQU0sYUFBYSxTQUFTLE1BQzFCLE9BQU8sTUFBTSxVQUFVLE1BQU0sTUFBTSxhQUM5QixZQUFZLE1BQU0sYUFBYSxNQUFNLEtBQUssTUFBTSxVQUFVLElBQUksQ0FBRSxNQUFNLFVBQVksSUFDbkYsQ0FBRSxDQUNQO0FBRUQsVUFBTSxXQUFXLFNBQVMsTUFBTSxtQkFBbUIsV0FBVyxLQUFLLENBQUM7QUFFcEUsVUFBTSxpQkFBaUI7QUFBQSxNQUFTLE1BQzlCLFdBQVcsTUFDUixJQUFJLFVBQVEsS0FBSyxJQUFJLEVBQ3JCLEtBQUssSUFBSTtBQUFBLElBQ2I7QUFFRCxVQUFNLFlBQVk7QUFBQSxNQUFTLE1BQ3pCO0FBQUEsUUFDRSxXQUFXLE1BQU0sT0FBTyxDQUFDLEtBQUssU0FBUyxNQUFNLEtBQUssTUFBTSxDQUFDO0FBQUEsTUFDMUQ7QUFBQSxJQUNGO0FBRUQsVUFBTSxlQUFlLFNBQVMsT0FBTztBQUFBLE1BQ25DLFdBQVcsVUFBVTtBQUFBLE1BQ3JCLGFBQWEsV0FBVyxNQUFNO0FBQUEsTUFDOUIsVUFBVSxNQUFNO0FBQUEsSUFDdEIsRUFBTTtBQUVGLFVBQU0sYUFBYSxTQUFTLE9BQU87QUFBQSxNQUNqQyxVQUFVO0FBQUEsTUFDVixNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsTUFDUCxRQUFRLE1BQU07QUFBQSxNQUNkLFNBQVMsTUFBTTtBQUFBLE1BQ2YsTUFBTSxTQUFTO0FBQUEsTUFDZixHQUFHO0FBQUEsTUFDSCxJQUFJLE1BQU0sVUFBVTtBQUFBLE1BQ3BCLFVBQVUsTUFBTSxTQUFTLFVBQVU7QUFBQSxJQUN6QyxFQUFNO0FBRUYsVUFBTSxhQUFhO0FBQUEsTUFBUyxNQUMxQixpQ0FDRyxJQUFJLFVBQVUsT0FBTyxpQkFBaUI7QUFBQSxJQUMxQztBQUVELFVBQU0sY0FBYztBQUFBLE1BQVMsTUFDM0IsTUFBTSxhQUFhLFFBQVEsTUFBTSxXQUFXO0FBQUEsSUFDN0M7QUFFRCxhQUFTLGNBQWUsT0FBTztBQUM3QixZQUFNLFFBQVEsV0FBVyxNQUFNLE1BQU87QUFDdEMsWUFBTSxPQUFPLE9BQU8sQ0FBQztBQUNyQixnQkFBVSxLQUFLO0FBQUEsSUFDaEI7QUFFRCxhQUFTLFdBQVksTUFBTTtBQUN6QixZQUFNLFFBQVEsV0FBVyxNQUFNLFVBQVUsSUFBSTtBQUM3QyxVQUFJLFFBQVEsSUFBSTtBQUNkLHNCQUFjLEtBQUs7QUFBQSxNQUNwQjtBQUFBLElBQ0Y7QUFFRCxhQUFTLFVBQVcsT0FBTztBQUN6QixXQUFLLHFCQUFxQixNQUFNLGFBQWEsT0FBTyxRQUFRLE1BQU8sRUFBRztBQUFBLElBQ3ZFO0FBRUQsYUFBUyxVQUFXLEdBQUc7QUFFckIsUUFBRSxZQUFZLE1BQU0sUUFBUSxDQUFDO0FBQUEsSUFDOUI7QUFFRCxhQUFTLFFBQVMsR0FBRztBQUVuQixVQUFJLEVBQUUsWUFBWSxNQUFNLEVBQUUsWUFBWSxJQUFJO0FBQ3hDLGtCQUFVLENBQUM7QUFBQSxNQUNaO0FBQUEsSUFDRjtBQUVELGFBQVMsZUFBZ0I7QUFDdkIsYUFBTyxTQUFTO0FBQUEsSUFDakI7QUFFRCxhQUFTLGdCQUFpQixHQUFHLFVBQVU7QUFDckMsWUFBTSxRQUFRLGFBQWEsR0FBRyxVQUFVLFdBQVcsT0FBTyxZQUFZLEtBQUs7QUFDM0UsWUFBTSxZQUFZLGFBQWM7QUFFaEMsVUFBSSxjQUFjLFVBQVUsY0FBYyxNQUFNO0FBQzlDLGtCQUFVLFFBQVE7QUFBQSxNQUNuQjtBQUdELFVBQUksVUFBVSxRQUFRO0FBQUU7QUFBQSxNQUFRO0FBSWhDLFVBQ0UsTUFBTSxhQUFhLE9BQ2YsTUFBTSxjQUFjLE1BQU0sTUFBTSxPQUFLLFdBQVcsTUFBTSxTQUFTLENBQUMsQ0FBQyxJQUNqRSxNQUFNLGVBQWUsTUFBTyxJQUNoQztBQUNBO0FBQUEsTUFDRDtBQUVEO0FBQUEsUUFDRSxZQUFZLFVBQVUsT0FDbEIsV0FBVyxNQUFNLE9BQU8sS0FBSyxJQUM3QjtBQUFBLE1BQ0w7QUFBQSxJQUNGO0FBRUQsYUFBUyxZQUFhO0FBQ3BCLGFBQU87QUFBQSxRQUNMLEVBQUUsU0FBUztBQUFBLFVBQ1QsT0FBTyxDQUFFLE1BQU0sWUFBWSxnQkFBa0I7QUFBQSxVQUM3QyxPQUFPLE1BQU07QUFBQSxRQUN2QixDQUFTO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFFRCxhQUFTLGVBQWdCO0FBQ3ZCLFVBQUksTUFBTSxTQUFTLFFBQVE7QUFDekIsZUFBTyxXQUFXLE1BQU0sV0FBVyxJQUMvQixVQUFXLElBQ1gsV0FBVyxNQUFNO0FBQUEsVUFDakIsQ0FBQyxNQUFNLFVBQVUsTUFBTSxLQUFLLEVBQUUsT0FBTyxNQUFNLEtBQUssTUFBTTtBQUFBLFFBQ3ZEO0FBQUEsTUFDSjtBQUVELFVBQUksTUFBTSxhQUFhLFFBQVE7QUFDN0IsZUFBTyxXQUFXLE1BQU0sV0FBVyxJQUMvQixVQUFXLElBQ1gsTUFBTSxTQUFTLEVBQUUsT0FBTyxXQUFXLE9BQU8sS0FBSyxNQUFNO0FBQUEsTUFDMUQ7QUFFRCxVQUFJLE1BQU0sYUFBYSxNQUFNO0FBQzNCLGVBQU8sV0FBVyxNQUFNLFdBQVcsSUFDL0IsVUFBVyxJQUNYLFdBQVcsTUFBTSxJQUFJLENBQUMsTUFBTSxNQUFNLEVBQUUsT0FBTztBQUFBLFVBQzNDLEtBQUssVUFBVTtBQUFBLFVBQ2YsV0FBVyxNQUFNLFNBQVM7QUFBQSxVQUMxQixPQUFPO0FBQUEsVUFDUCxXQUFXLE1BQU07QUFBQSxVQUNqQixVQUFVLE1BQU07QUFBQSxVQUNoQixVQUFVLE1BQU07QUFBRSwwQkFBYyxDQUFDO0FBQUEsVUFBRztBQUFBLFFBQ2hELEdBQWEsTUFBTSxFQUFFLFFBQVE7QUFBQSxVQUNqQixPQUFPO0FBQUEsVUFDUCxhQUFhLEtBQUs7QUFBQSxRQUNuQixDQUFBLENBQUMsQ0FBQztBQUFBLE1BQ047QUFFRCxZQUFNLGNBQWMsTUFBTSxpQkFBaUIsU0FDdkMsTUFBTSxlQUNOLGVBQWU7QUFFbkIsYUFBTyxZQUFZLFNBQVMsSUFDeEI7QUFBQSxRQUNFLEVBQUUsT0FBTztBQUFBLFVBQ1AsT0FBTyxNQUFNO0FBQUEsVUFDYixPQUFPLE1BQU07QUFBQSxVQUNiO0FBQUEsUUFDZCxDQUFhO0FBQUEsTUFDRixJQUNELFVBQVc7QUFBQSxJQUNoQjtBQUVELGFBQVMsV0FBWTtBQUNuQixZQUFNLE9BQU87QUFBQSxRQUNYLEtBQUs7QUFBQSxRQUNMLEdBQUcsV0FBVztBQUFBLFFBQ2QsR0FBRyxhQUFhO0FBQUEsUUFDaEIsT0FBTztBQUFBLFFBQ1AsVUFBVTtBQUFBLE1BQ1g7QUFFRCxVQUFJLE1BQU0sYUFBYSxNQUFNO0FBQzNCLGFBQUssV0FBVztBQUFBLE1BQ2pCO0FBRUQsYUFBTyxFQUFFLFNBQVMsSUFBSTtBQUFBLElBQ3ZCO0FBRUQsV0FBTyxPQUFPLE9BQU87QUFBQSxNQUNuQjtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUVBLGVBQWU7QUFBQSxRQUFTLE1BQ3RCLFNBQVMsVUFBVSxRQUNoQixtQkFBbUIsTUFBTSxZQUFZO0FBQUEsTUFDekM7QUFBQSxNQUVELGlCQUFpQixTQUFTLE1BQU07QUFDOUIsWUFBSSxNQUFNLGlCQUFpQixRQUFRO0FBQ2pDLGlCQUFPLE1BQU0sYUFBYSxhQUFhLEtBQUs7QUFBQSxRQUM3QztBQUVELGNBQU0sTUFBTSxNQUFNO0FBQ2xCLGVBQU8sR0FBSSxXQUFXLE1BQU0sU0FBVyxRQUFRLFNBQVMsUUFBUSxNQUFNLE9BQVMsVUFBVTtBQUFBLE1BQ2pHLENBQU87QUFBQSxNQUVELGlCQUFpQixNQUFNLFdBQVcsTUFBTTtBQUFBLE1BQ3hDLFlBQVksTUFBTTtBQUNoQixjQUFNLE9BQU87QUFBQSxVQUNYLEtBQUssTUFBTTtBQUFBLFVBQ1gsT0FBTztBQUFBLFVBQ1AsVUFBVSxNQUFNO0FBQUEsUUFDakI7QUFFRCxZQUFJLE1BQU0sU0FBUyxVQUFVLE1BQU07QUFDakMsaUJBQU8sT0FBTyxNQUFNLEVBQUUsWUFBWSxhQUFhLFdBQVcsU0FBUztBQUFBLFFBQ3BFO0FBRUQsZUFBTyxFQUFFLE9BQU8sTUFBTSxDQUFFLFNBQVEsR0FBSyxPQUFPLGFBQVksQ0FBRSxDQUFDO0FBQUEsTUFDNUQ7QUFBQSxJQUNQLENBQUs7QUFHRCxXQUFPLE9BQU8sT0FBTztBQUFBLE1BQ25CO0FBQUEsTUFDQTtBQUFBLE1BQ0Esa0JBQWtCLE1BQU0sU0FBUztBQUFBLElBQ3ZDLENBQUs7QUFFRCxlQUFXLE9BQU8sWUFBWSxNQUFNLFNBQVMsS0FBSztBQUVsRCxXQUFPLFNBQVMsS0FBSztBQUFBLEVBQ3RCO0FBQ0gsQ0FBQztBQ2pTRCxJQUFBLFFBQWUsZ0JBQWdCO0FBQUEsRUFDN0IsTUFBTTtBQUFBLEVBRU4sT0FBTztBQUFBLElBQ0wsU0FBUztBQUFBLElBQ1QsU0FBUztBQUFBLEVBQ1Y7QUFBQSxFQUVELE1BQU8sT0FBTyxFQUFFLFNBQVM7QUFDdkIsVUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFJLEVBQUEsSUFBSyxtQkFBb0I7QUFFOUMsVUFBTSxVQUFVLE9BQU8sV0FBVyxhQUFhO0FBQy9DLFFBQUksWUFBWSxlQUFlO0FBQzdCLGNBQVEsTUFBTSwyQ0FBMkM7QUFDekQsYUFBTztBQUFBLElBQ1I7QUFFRCxVQUFNLGlCQUFpQixPQUFPLGtCQUFrQixhQUFhO0FBQzdELFFBQUksbUJBQW1CLGVBQWU7QUFDcEMsY0FBUSxNQUFNLDJDQUEyQztBQUN6RCxhQUFPO0FBQUEsSUFDUjtBQUVELFVBQU0sUUFBUSxTQUFTLE1BQU07QUFDM0IsWUFBTSxVQUNELFFBQVEsT0FBTyxVQUFVLE9BQU8sUUFBUSxPQUFPLE9BQU8sTUFDdEQsUUFBUSxPQUFPLFVBQVUsT0FBTyxRQUFRLE9BQU8sT0FBTztBQUUzRCxVQUFJLE9BQU8sTUFBTSxZQUFZLFlBQVk7QUFDdkMsY0FBTSxTQUFTLFFBQVEsWUFBWSxVQUFVLE9BQ3pDLFFBQVEsZ0JBQWdCLFFBQ3hCLEdBQUcsT0FBTztBQUVkLGVBQU8sTUFBTSxRQUFRLFFBQVEsTUFBTTtBQUFBLE1BQ3BDO0FBRUQsYUFBTztBQUFBLFFBQ0wsV0FBVyxRQUFRLFlBQVksVUFBVSxPQUNwQyxRQUFRLGdCQUFnQixRQUFRLFNBQVUsT0FFekMsR0FBRyxPQUFPLFdBQVcsSUFDaEIsV0FBVyxJQUFJLGdCQUFpQixjQUFlLFVBQy9DLEdBQUcsT0FBTyxTQUFTLFNBQVU7QUFBQSxNQUV6QztBQUFBLElBQ1AsQ0FBSztBQUVELFVBQU0sVUFBVTtBQUFBLE1BQVMsTUFDdkIsU0FBVSxNQUFNLFlBQVksT0FBTyxzQkFBc0I7QUFBQSxJQUMxRDtBQUVELFdBQU8sTUFBTSxFQUFFLFFBQVE7QUFBQSxNQUNyQixPQUFPLFFBQVE7QUFBQSxNQUNmLE9BQU8sTUFBTTtBQUFBLElBQ25CLEdBQU8sTUFBTSxNQUFNLE9BQU8sQ0FBQztBQUFBLEVBQ3hCO0FBQ0gsQ0FBQzs7QUNXRCxNQUFLQSxjQUFVO0FBQUEsRUFDYixNQUFNO0FBQUEsRUFDTixPQUFPLENBQUMsWUFBWTtBQUFBLEVBQ3BCLE9BQU87QUFDTCxXQUFPO0FBQUEsTUFDTCxnQkFBZ0I7QUFBQSxNQUNoQixrQkFBa0I7QUFBQSxNQUNsQixZQUFZO0FBQUEsTUFDWixZQUFZO0FBQUEsTUFDWixPQUFPO0FBQUE7RUFFVjtBQUFBLEVBQ0QsT0FBTyxDQUFDLGNBQWM7QUFBQSxFQUN0QixVQUFVO0FBQ1IsU0FBSyxhQUFhLEtBQUssV0FBVztBQUFBLEVBQ25DO0FBQUEsRUFDRCxnQkFBZ0I7QUFDZCxpQkFBYSxLQUFLLEtBQUs7QUFBQSxFQUN4QjtBQUFBLEVBQ0QsU0FBUztBQUFBLElBQ1AsU0FBUyxPQUFPO0FBQ2QsV0FBSyxRQUFRLFdBQVcsTUFBTTtBQUM1QjtNQUNELEdBQUUsR0FBSTtBQUFBLElBQ1I7QUFBQSxJQUNELHdCQUF3QjtBQUN0QixXQUFLLFFBQVEsS0FBSywyQkFBMkIsS0FBSyxXQUFXLEtBQUs7QUFBQSxJQUNuRTtBQUFBLElBQ0QscUJBQXFCLEVBQUUsU0FBUztBQUM5QixXQUFLLGlCQUFpQjtBQUN0QixXQUFLLFNBQVMsS0FBSztBQUFBLElBQ3BCO0FBQUEsSUFDRCxNQUFNLGFBQWE7QUFDakIsVUFBSTtBQUNGLFlBQUksT0FBTyxJQUFJO0FBQ2YsYUFBSyxPQUFPLFFBQVEsS0FBSyxVQUFVO0FBQ25DLGFBQUssT0FBTyxRQUFRLEtBQUssVUFBVTtBQUVuQyxjQUFNLE1BQU0sTUFBTSxLQUFLLEtBQUs7QUFBQSxVQUMxQixZQUFZLEtBQUssV0FBVztBQUFBLFVBQzVCO0FBQUE7QUFFRixZQUFJLElBQUksS0FBSyxXQUFXLFdBQVc7QUFDakMsZUFBSyxNQUFNLGNBQWM7QUFDekIsZUFBSyxpQkFBaUI7QUFBQSxRQUN4QjtBQUFBLE1BQ0EsU0FBTyxLQUFQO0FBQ0EsZ0JBQVEsSUFBSSxHQUFHO0FBQUEsTUFDakI7QUFBQSxJQUNEO0FBQUEsSUFDRCx1QkFBdUIsRUFBRSxTQUFTO0FBQ2hDLFdBQUssbUJBQW1CO0FBQ3hCLFdBQUssU0FBUyxLQUFLO0FBQUEsSUFDcEI7QUFBQSxJQUNELE1BQU0sZUFBZTtBQUNuQixVQUFJO0FBQ0YsY0FBTSxNQUFNLE1BQU0sS0FBSyxLQUFLLE9BQU8sWUFBWSxLQUFLLFdBQVcsS0FBSztBQUNwRSxZQUFJLElBQUksS0FBSyxXQUFXLFdBQVc7QUFDakMsZUFBSyxNQUFNLGNBQWM7QUFDekIsZUFBSyxtQkFBbUI7QUFBQSxRQUMxQjtBQUFBLE1BQ0EsU0FBTyxLQUFQO0FBQ0EsZ0JBQVEsSUFBSSxHQUFHO0FBQUEsTUFDakI7QUFBQSxJQUNEO0FBQUEsSUFDRCxhQUFhO0FBQ1gsY0FBUSxJQUFJLEtBQUssVUFBVTtBQUFBLElBQzVCO0FBQUEsRUFDRjtBQUNIOztBQXZJVyxNQUFBQyxlQUFBLEVBQUEsT0FBTSxtQkFBa0I7QUFHeEIsTUFBQUMsZUFBQSxFQUFBLE9BQU0sbUJBQWtCOztBQVVyQixNQUFBQyxlQUFBLEVBQUEsT0FBTSxvQkFBbUI7QUFTL0IsTUFBQSxhQUFBQywrQkFBQSxNQUFBQyxnQ0FBc0MsT0FBakMsRUFBQSxPQUFNLGFBQVUsZUFBVyxFQUFBLENBQUE7QUE4QjFCLE1BQUEsYUFBQSxFQUFBLE9BQU0sVUFBUzs7O0lBMUQzQkMsWUF3QmUsWUFBQTtBQUFBLE1BdkJaLFFBQU0sU0FBb0I7QUFBQSxNQUMxQixTQUFPLFNBQXNCO0FBQUEsTUFDN0IsU0FBTyxTQUFxQjtBQUFBO01BRVosY0FDZixNQUFvRTtBQUFBLFFBQXBFRCxnQkFBb0UsT0FBcEVKLGNBQW9FO0FBQUEsVUFBdENLLFlBQTJCLE9BQUE7QUFBQSxZQUFuQixNQUFBO0FBQUEsWUFBSyxNQUFLO0FBQUE7MEJBQVMsT0FBSztBQUFBOztNQUUvQyxlQUNmLE1BQXlFO0FBQUEsUUFBekVELGdCQUF5RSxPQUF6RUgsY0FBeUU7QUFBQSwwQkFBM0MsU0FBTztBQUFBLFVBQUFJLFlBQThCLE9BQUE7QUFBQSxZQUF0QixPQUFBO0FBQUEsWUFBTSxNQUFLO0FBQUE7Ozt1QkFHMUQsTUFXUztBQUFBLFFBWFRBLFlBV1MsT0FBQSxNQUFBO0FBQUEsMkJBVlAsTUFJaUI7QUFBQSxZQUpqQkEsWUFJaUIsY0FBQSxFQUFBLFFBQUEsR0FBQSxHQUpLO0FBQUEsK0JBQ3BCLE1BRVc7QUFBQSxnQkFGWEEsWUFFVyxTQUFBLEVBQUEsU0FBQSxHQUFBLEdBRk07QUFBQSxtQ0FDZixNQUE4QjtBQUFBLG9CQUE5QkQsZ0JBQThCLE9BQUE7QUFBQSxzQkFBeEIsS0FBSyxPQUFVLFdBQUM7QUFBQTs7Ozs7OztZQUcxQkMsWUFJQyxjQUFBLE1BQUE7QUFBQSwrQkFIRSxNQUVLO0FBQUEsZ0JBRkxELGdCQUVLLE9BRkxGLGNBQ0lJLGdCQUFBLE9BQUEsV0FBVyxJQUFJLEdBQUEsQ0FBQTtBQUFBOzs7Ozs7Ozs7SUFLMUJELFlBNkJXLFNBQUE7QUFBQSxNQTdCRCxXQUFBO0FBQUEsa0JBQW1CLE1BQWM7QUFBQSxtRUFBZCxNQUFjLGlCQUFBO0FBQUE7dUJBQ3pDLE1BMkJTO0FBQUEsUUEzQlRBLFlBMkJTLE9BQUEsTUFBQTtBQUFBLDJCQTFCUCxNQUlpQjtBQUFBLFlBSmpCQSxZQUlpQixjQUFBLEVBQUEsT0FBQSw2QkFKaUMsR0FBQTtBQUFBLCtCQUNoRCxNQUFzQztBQUFBLGdCQUF0QztBQUFBLGdCQUNBQSxZQUFXLE1BQUE7QUFBQSwrQkFDWEEsWUFBcUQsTUFBQTtBQUFBLGtCQUE5QyxNQUFLO0FBQUEsa0JBQVEsTUFBQTtBQUFBLGtCQUFLLE9BQUE7QUFBQSxrQkFBTSxPQUFBO0FBQUE7Ozs7OztZQUdqQ0EsWUFrQmlCLGNBQUEsTUFBQTtBQUFBLCtCQWpCZixNQUtFO0FBQUEsZ0JBTEZBLFlBS0UsUUFBQTtBQUFBLDhCQUpTLE1BQVU7QUFBQSwrRUFBVixNQUFVLGFBQUE7QUFBQSxrQkFDbkIsTUFBSztBQUFBLGtCQUNMLE9BQU07QUFBQSxrQkFDTixPQUFNO0FBQUE7Z0JBRVJBLFlBVVMsT0FBQTtBQUFBLGtCQVRQLE9BQU07QUFBQSxrQkFDTixRQUFBO0FBQUEsOEJBQ1MsTUFBVTtBQUFBOzBEQUFWLE1BQVUsYUFBQTtBQUFBLG9CQUVFLFNBQVU7QUFBQTtrQkFEL0IsT0FBTTtBQUFBO2tCQUdXLGlCQUNmLE1BQThCO0FBQUEsb0JBQTlCQSxZQUE4QixPQUFBLEVBQUEsTUFBQSxlQUFILENBQUE7QUFBQTs7Ozs7O1lBSWpDQSxZQUFxRSxNQUFBO0FBQUEsY0FBOUQsT0FBQSxFQUFzQixTQUFBLFVBQUE7QUFBQSxjQUFFLFNBQU8sU0FBVTtBQUFBOytCQUFFLE1BQVc7QUFBQSxnQ0FBWCxhQUFXO0FBQUE7Ozs7Ozs7OztJQUdqRUEsWUFhVyxTQUFBO0FBQUEsa0JBYlEsTUFBZ0I7QUFBQSxtRUFBaEIsTUFBZ0IsbUJBQUE7QUFBQSxNQUFFLFlBQUE7QUFBQTt1QkFDbkMsTUFXUztBQUFBLFFBWFRBLFlBV1MsT0FBQSxNQUFBO0FBQUEsMkJBVlAsTUFJaUI7QUFBQSxZQUpqQkEsWUFJaUIsY0FBQSxFQUFBLE9BQUEsbUJBSnVCLEdBQUE7QUFBQSwrQkFDdEMsTUFFQztBQUFBLGdCQUZERCxnQkFFQyxRQUZELFlBQ0cscURBQW1DLE9BQVUsV0FBQyxJQUFJLElBQUcsS0FBQyxDQUFBO0FBQUE7OztZQUkzREMsWUFHaUIsY0FBQSxFQUFBLE9BQUEsUUFISSxHQUFBO0FBQUEsK0JBQ25CLE1BQTJEO0FBQUEsK0JBQTNEQSxZQUEyRCxNQUFBO0FBQUEsa0JBQXBELE1BQUE7QUFBQSxrQkFBSyxPQUFNO0FBQUEsa0JBQVMsT0FBTTtBQUFBOzs7Z0JBQ2pDQSxZQUErRCxNQUFBO0FBQUEsa0JBQXhELE1BQUE7QUFBQSxrQkFBSyxPQUFNO0FBQUEsa0JBQVMsT0FBTTtBQUFBLGtCQUFPLFNBQU8sU0FBWTtBQUFBOzs7Ozs7Ozs7Ozs7OztBQ1ZuRSxNQUFLLFlBQVU7QUFBQSxFQUNiLE1BQU07QUFBQSxFQUNOLFlBQVk7QUFBQSxJQUNWO0FBQUEsRUFDRDtBQUFBLEVBQ0QsTUFBTSxVQUFVO0FBQ2QsVUFBTSxhQUFhO0FBQ25CLGVBQVcsT0FBTyxFQUFFLE9BQU8sV0FBVyxjQUFjLEtBQUssQ0FBQztBQUMxRCxVQUFNLEtBQUs7RUFDWjtBQUFBLEVBQ0QsT0FBTztBQUNMLFdBQU87QUFBQSxNQUNMLFNBQVMsQ0FBRTtBQUFBLE1BQ1gsZUFBZTtBQUFBLE1BQ2YsWUFBWTtBQUFBLE1BQ1osWUFBWTtBQUFBO0VBRWY7QUFBQSxFQUNELFNBQVM7QUFBQSxJQUNQLGFBQWE7QUFDWCxjQUFRLElBQUksS0FBSyxVQUFVO0FBQUEsSUFDNUI7QUFBQSxJQUNELE1BQU0sZUFBZTtBQUNuQixZQUFNLE1BQU0sTUFBTSxLQUFLLEtBQUssSUFBSSxVQUFVO0FBQzFDLFdBQUssVUFBVSxJQUFJLEtBQUssS0FBSztBQUFBLElBQzlCO0FBQUEsSUFDRCxjQUFjO0FBQ1osV0FBSyxhQUFhO0FBQ2xCLFdBQUssYUFBYTtBQUFBLElBQ25CO0FBQUEsSUFDRCxNQUFNLFlBQVk7QUFDaEIsVUFBSTtBQUNGLFlBQUksT0FBTyxJQUFJO0FBQ2YsYUFBSyxPQUFPLFFBQVEsS0FBSyxVQUFVO0FBQ25DLGFBQUssT0FBTyxRQUFRLEtBQUssVUFBVTtBQUNuQyxjQUFNLE1BQU0sTUFBTSxLQUFLLEtBQUssS0FBSyxZQUFZLElBQUk7QUFDakQsWUFBSSxJQUFJLEtBQUssV0FBVyxXQUFXO0FBQ2pDLGdCQUFNLEtBQUs7QUFDWCxlQUFLLGdCQUFnQjtBQUNyQixlQUFLLFlBQVc7QUFBQSxRQUNsQjtBQUFBLE1BQ0EsU0FBTyxPQUFQO0FBQ0EsZ0JBQVEsSUFBSSxLQUFLO0FBQUEsTUFDbkI7QUFBQSxJQUNEO0FBQUEsRUFDRjtBQUNIOztBQXBHUyxNQUFBLGFBQUEsRUFBQSxPQUFNLGFBQVk7QUFJaEIsTUFBQSxhQUFBLEVBQUEsT0FBTSxvQkFBbUI7QUFZMUIsTUFBQSxhQUFBLDZCQUFBLE1BQUFELGdDQUFxQyxPQUFoQyxFQUFBLE9BQU0sYUFBVSxjQUFVLEVBQUEsQ0FBQTtBQXVCMUIsTUFBQSxhQUFBLEVBQUEsT0FBTSx3QkFBdUI7OztzQkF4QzFDRyxZQWdEUyxPQUFBLE1BQUE7QUFBQSxxQkEvQ1AsTUFZTTtBQUFBLE1BWk5ILGdCQVlNLE9BWk4sWUFZTTtBQUFBLFFBWEpDLFlBRUMsTUFBQTtBQUFBLFVBRk0sT0FBTTtBQUFBLFVBQW1CLCtDQUFPLE1BQWEsZ0JBQUE7QUFBQTsyQkFDakQsTUFBVTtBQUFBLDRCQUFWLFlBQVU7QUFBQTs7O1FBRWJELGdCQU9NLE9BUE4sWUFPTTtBQUFBLDRCQU5KSSxtQkFLY0MsVUFBQSxNQUFBQyxXQUpLLE1BQU8sU0FBQSxDQUFqQixXQUFNO2dDQURmSCxZQUtjLHVCQUFBO0FBQUEsY0FIWCxLQUFLLE9BQU87QUFBQSxjQUNaLFlBQVk7QUFBQSxjQUNaLGdCQUFjLFNBQVk7QUFBQTs7OztNQUlqQ0YsWUFpQ1csU0FBQTtBQUFBLFFBakNELFdBQUE7QUFBQSxvQkFBbUIsTUFBYTtBQUFBLHFFQUFiLE1BQWEsZ0JBQUE7QUFBQTt5QkFDeEMsTUErQlM7QUFBQSxVQS9CVEEsWUErQlMsT0FBQSxNQUFBO0FBQUEsNkJBOUJQLE1BSWlCO0FBQUEsY0FKakJBLFlBSWlCLGNBQUEsRUFBQSxPQUFBLDZCQUppQyxHQUFBO0FBQUEsaUNBQ2hELE1BQXFDO0FBQUEsa0JBQXJDO0FBQUEsa0JBQ0FBLFlBQVcsTUFBQTtBQUFBLGlDQUNYQSxZQUFxRCxNQUFBO0FBQUEsb0JBQTlDLE1BQUs7QUFBQSxvQkFBUSxNQUFBO0FBQUEsb0JBQUssT0FBQTtBQUFBLG9CQUFNLE9BQUE7QUFBQTs7Ozs7O2NBR2pDQSxZQXVCaUIsY0FBQSxNQUFBO0FBQUEsaUNBdEJmLE1BS0U7QUFBQSxrQkFMRkEsWUFLRSxRQUFBO0FBQUEsZ0NBSlMsTUFBVTtBQUFBLGlGQUFWLE1BQVUsYUFBQTtBQUFBLG9CQUNuQixNQUFLO0FBQUEsb0JBQ0wsT0FBTTtBQUFBLG9CQUNOLE9BQU07QUFBQTtrQkFFUkEsWUFVUyxPQUFBO0FBQUEsb0JBVFAsT0FBTTtBQUFBLG9CQUNOLFFBQUE7QUFBQSxnQ0FDUyxNQUFVO0FBQUE7NERBQVYsTUFBVSxhQUFBO0FBQUEsc0JBRUUsU0FBVTtBQUFBO29CQUQvQixPQUFNO0FBQUE7b0JBR1csaUJBQ2YsTUFBOEI7QUFBQSxzQkFBOUJBLFlBQThCLE9BQUEsRUFBQSxNQUFBLGVBQUgsQ0FBQTtBQUFBOzs7a0JBRy9CRCxnQkFJTSxPQUpOLFlBSU07QUFBQSxvQkFISkMsWUFFQyxNQUFBO0FBQUEsc0JBRk0sT0FBTTtBQUFBLHNCQUEyQixTQUFPLFNBQVM7QUFBQTt1Q0FDckQsTUFBVTtBQUFBLHdDQUFWLFlBQVU7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==
