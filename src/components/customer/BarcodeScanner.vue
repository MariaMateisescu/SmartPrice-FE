<template>
  <div>
    <!-- <p>Scan barcode or QR code</p> -->
    <div id="qr-code-reader"></div>
    <div>Scanned code {{ qrCodeText }}</div>
    <q-input type="text" placeholder="Card name" v-model="cardName"></q-input>
    <q-input
      filled
      placeholder="Pick a color for your card"
      v-model="color"
      class="my-input"
    >
      <template v-slot:append>
        <q-icon name="colorize" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-color no-footer v-model="color" />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
    <div class="save-card__container">
      <q-btn class="save-btn" @click="addCard" label="Save card" />
    </div>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { Html5Qrcode } from "html5-qrcode";
// import { Html5QrcodeScanner } from "html5-qrcode";
export default {
  emits: ["cardSavedSuccessfully"],
  props: ["stopCamera"],
  data() {
    return {
      qrCodeScanner: null,
      qrCodeText: "",
      codeFormat: "",
      cardName: "",
      $q: useQuasar(),
      color: "",
    };
  },
  async mounted() {
    this.qrCodeScanner = new Html5Qrcode("qr-code-reader");
    this.qrCodeScanner.start(
      { facingMode: "environment" },
      { qrbox: 250 },
      this.onScanSuccess
    );
  },
  methods: {
    async addCard() {
      try {
        const data = {
          code: this.qrCodeText,
          format: this.codeFormat,
          name: this.cardName,
          color: this.color,
        };
        const res = await this.$api.post("/cards", data);
        if (res.data.status === "success") {
          this.$emit("cardSavedSuccessfully");
          this.qrCodeScanner.stop(true);
        }
      } catch (err) {
        this.$q.notify({
          type: "negative",
          position: "top",
          message: "Something went wrong!",
          color: "negative",
          timeout: "2500",
        });
      }
    },
    onScanSuccess(decodedText, decodedResult) {
      this.qrCodeText = decodedText;
      this.codeFormat = decodedResult.result.format.formatName;
      this.qrCodeScanner.pause(true);
    },
    onScanFailure(error) {
      console.warn(`Code scan error = ${error}`);
    },
  },
  watch: {
    stopCamera(after, before) {
      if (after) this.qrCodeScanner.stop(true);
    },
  },
};
</script>

<style lang="scss" scoped>
.save-btn {
  background-color: $cyan-9;
  color: white;
  margin: 10px;
}
.save-card__container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
