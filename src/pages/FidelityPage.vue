<template>
  <div class="fideliy-page">
    <div v-if="userStore.authUser" class="fidelity-page-info">
      <div style="width: 100%">
        <div class="fidelity-page__title" v-if="cards.length">
          <div class="text-h6">All cards</div>
          <q-btn
            class="newcard-btn"
            @click="openAddNewCardDialog"
            label="New Card"
          />
        </div>
        <div v-if="cards.length">
          <div class="fidelity-cards-style">
            <FidelityCard
              v-for="card in cards"
              :key="card"
              :cardInfo="card"
              @click="openCardDetailsDialog(card)"
            />
          </div>
        </div>

        <EmptyData
          v-else
          :image="imageCards"
          :title="titleCards"
          :message="messageCards"
        >
          <template v-slot:button>
            <q-btn
              class="btn"
              style="background-color: #267378; color: #fff"
              label="Add card"
              @click="showNewCardDialog = true"
            />
          </template>
        </EmptyData>
      </div>
    </div>
    <EmptyState v-else :image="image" :title="title" :message="message">
    </EmptyState>
  </div>

  <q-dialog maximized v-model="showDetailedCardDialog">
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Card Details</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <div
          :style="{ backgroundColor: selectedCardInfo.color }"
          class="detailed-card-container"
        >
          <div class="text-h5 card-text">{{ selectedCardInfo.name }}</div>
          <div class="barcode-background">
            <img
              class="code-img"
              :src="`http://bwipjs-api.metafloor.com/?bcid=${selectedCardInfo.format
                .toLowerCase()
                .split('_')
                .join('')}&text=${selectedCardInfo.code}&${
                selectedCardInfo.format === 'QR_CODE' ? '' : '&includetext'
              }`"
              alt=""
            />
          </div>
        </div>
      </q-card-section>
      <q-card-section class="row items-center q-pb-none">
        <q-btn
          class="btn"
          style="background-color: #267378; color: #fff"
          label="Edit card"
          @click="showEditCard = true"
        />
        <q-space />
        <q-btn
          class="btn"
          style="background-color: #267378; color: #fff"
          label="Remove card"
          @click="showDeleteCard = true"
        />
      </q-card-section>
    </q-card>
  </q-dialog>

  <q-dialog maximized v-model="showNewCardDialog">
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Card Scanner</div>
        <q-space />
        <q-btn
          icon="close"
          flat
          round
          dense
          v-close-popup
          @click="stopCamera = true"
        />
      </q-card-section>

      <q-card-section>
        <BarcodeScanner
          @cardSavedSuccessfully="onCardSaved"
          :stopCamera="stopCamera"
        />
      </q-card-section>
    </q-card>
  </q-dialog>

  <q-dialog v-model="showDeleteCard" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <span class="q-ml-sm"
          >Are you sure you want to delete
          {{ selectedCardInfo.name }} card?</span
        >
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn
          flat
          label="Delete"
          color="red"
          @click="deleteCard(selectedCardInfo)"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="showEditCard" persistent>
    <q-card class="edit-card__q-card">
      <q-card-section class="row items-center edit-card__q-card__section-1">
        <span class="q-ml-sm">Edit {{ selectedCardInfo.name }} card</span>
      </q-card-section>

      <q-card-section class="edit-card__q-card__section-2">
        <q-input v-model="cardName" type="text" label="Card name" />
        <q-input
          filled
          placeholder="Pick a color"
          v-model="cardColor"
          class="my-input"
        >
          <template v-slot:append>
            <q-icon name="colorize" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-color no-footer v-model="cardColor" />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="red" v-close-popup />
        <q-btn
          flat
          label="Save"
          color="primary"
          @click="editCard(selectedCardInfo)"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { useUserStore } from "../stores/UserStore";
import { useDashHeaderStore } from "src/stores/dash-header";
import EmptyState from "src/components/customer/EmptyState.vue";
import EmptyData from "src/components/customer/EmptyData.vue";
import BarcodeScanner from "src/components/customer/BarcodeScanner.vue";
import FidelityCard from "src/components/customer/FidelityCard.vue";
import useQuasar from "quasar/src/composables/use-quasar.js";

export default {
  name: "FidelityPage",
  components: {
    EmptyState,
    EmptyData,
    BarcodeScanner,
    FidelityCard,
  },
  data() {
    return {
      image: "EmptyState.svg",
      title: "Ooops! You are not logged in!",
      message: "Log in to access your cards",
      imageCards: "FidelityCard.svg",
      titleCards: "Ooops! No cards to show!",
      messageCards: "Add your first card.",
      cards: [],
      selectedCardInfo: null,
      showNewCardDialog: false,
      showDetailedCardDialog: false,
      showDeleteCard: false,
      showEditCard: false,
      cardName: "",
      cardColor: "",
      $q: useQuasar(),
      dashHeader: useDashHeaderStore(),
      userStore: useUserStore(),
      stopCamera: false,
    };
  },
  async mounted() {
    const dashHeader = useDashHeaderStore();
    dashHeader.$patch({
      title: "Fidelity Cards",
      showBackIcon: false,
    });
    if (this.userStore.authUser) {
      await this.fetchFidelityCards();
    }
  },
  methods: {
    openAddNewCardDialog() {
      this.stopCamera = false;
      this.showNewCardDialog = true;
    },
    openCardDetailsDialog(card) {
      this.selectedCardInfo = card;
      this.showDetailedCardDialog = true;
      this.cardName = this.selectedCardInfo.name;
      this.cardColor = this.selectedCardInfo.color;
    },
    async fetchFidelityCards() {
      try {
        const res = await this.$api.get("/cards");
        this.cards = res.data.cards;
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
    async onCardSaved() {
      await this.fetchFidelityCards();
      this.showNewCardDialog = false;
      this.$q.notify({
        type: "positive",
        position: "top",
        message: "Card saved successfully",
        color: "positive",
        timeout: "2500",
      });
    },
    async editCard() {
      try {
        const data = {
          name: this.cardName,
          color: this.cardColor,
        };
        const res = await this.$api.patch(
          `cards/patch-card/${this.selectedCardInfo._id}`,
          data
        );
        if (res.data.status === "success") {
          await this.fetchFidelityCards();
          this.showEditCard = false;
          this.showDetailedCardDialog = false;
          this.$q.notify({
            type: "positive",
            position: "top",
            message: "Fidelity Card edited",
            color: "positive",
            timeout: "2500",
          });
        }
      } catch (err) {
        this.$q.notify({
          type: "positive",
          position: "top",
          message: "Something went wrong!",
          color: "positive",
          timeout: "2500",
        });
      }
    },
    async deleteCard(selectedCardInfo) {
      try {
        const res = await this.$api.delete(
          `cards/delete-card/${selectedCardInfo._id}`
        );
        if (res.data.status === "success") {
          await this.fetchFidelityCards();
          this.showDeleteCard = false;
          this.showDetailedCardDialog = false;
          this.$q.notify({
            type: "positive",
            position: "top",
            message: "Fidelity Card deleted",
            color: "positive",
            timeout: "2500",
          });
        }
      } catch (err) {
        this.$q.notify({
          type: "positive",
          position: "top",
          message: "Something went wrong!",
          color: "positive",
          timeout: "2500",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.fidelity-page-info {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 16px;
}
.q-input {
  width: 100%;
  max-width: 300px;
  margin-top: 20px;
}
.fidelity-page__title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.fidelity-cards-style {
  display: grid;
  gap: 5px;
  grid-template-columns: 1fr 1fr;
}
.newcard-btn {
  background-color: $cyan-9;
  color: white;
  margin: 10px;
}
.illustration {
  height: 40vh;
  padding-top: 50px;
  background: radial-gradient(#bbeaec, #eeeeee 75%);
  display: flex;
  justify-content: center;
  align-items: center;
}
.barcode-background {
  background-color: white !important;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 25px;
  border-radius: 10px;
  flex-direction: column;
  gap: 20px;
}
.detailed-card-container {
  border-radius: 10px;
  padding: 10px;
  margin-top: 10px;
}
.card-text {
  color: white;
  padding: 25px;
  text-align: center;
  mix-blend-mode: difference;
}
.edit-card__q-card {
  .q-input {
    margin-top: 8px;
  }
}
.edit-card__q-card__section-1 {
  padding-bottom: 0px;
}
.edit-card__q-card__section-2 {
  padding-top: 0px;
}
</style>
