<template>
  <div class="profile-page">
    <div v-if="userStore.authUser" class="profile-page-info">
      <div style="width: 100%">
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="cyan-9"
          indicator-color="cyan-9"
          align="justify"
          narrow-indicator
        >
          <q-tab name="fidelityCards" label="Fidelity Cards" />
          <q-tab name="accountSettings" label="Account settings" />
        </q-tabs>
        <q-separator />
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="fidelityCards">
            <div class="flex justify-between" v-if="cards.length">
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
          </q-tab-panel>

          <q-tab-panel name="accountSettings">
            <!-- <p class="profile-page-title">Account information</p> -->
            <div class="inputs-style">
              <q-input rounded outlined v-model="name" label="Name" />
              <q-input
                rounded
                outlined
                v-model="email"
                type="email"
                label="Email"
              />
              <q-input
                rounded
                outlined
                v-model="passwordCurrent"
                :type="isPwd ? 'password' : 'text'"
                label="Current Password"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
              <q-input
                rounded
                outlined
                v-model="password"
                :type="isPwd ? 'password' : 'text'"
                label="New Password"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
              <q-input
                hint="Password should have at least 8 characters"
                rounded
                outlined
                v-model="passwordConfirm"
                :type="isPwdConfirm ? 'password' : 'text'"
                label="Confirm New Password"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwdConfirm ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwdConfirm = !isPwdConfirm"
                  />
                </template>
              </q-input>
              <q-btn
                class="savechanges-btn"
                @click="onSaveChanges"
                label="Save Changes"
              />
            </div>
            <div class="flex toggle-dark">
              <div style="padding-left: 18px">
                Switch to {{ darkMode ? "light mode" : "dark mode" }}
              </div>
              <q-toggle
                v-model="darkMode"
                checked-icon="dark_mode"
                color="cyan-9"
                size="xl"
                unchecked-icon="light_mode"
                @update:model-value="toggleDarkMode"
              />
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
    <EmptyState v-else :image="image" :title="title" :message="message">
    </EmptyState>
  </div>
  <q-dialog seamless maximized v-model="showDetailedCardDialog">
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
    <q-card>
      <q-card-section class="row items-center">
        <span class="q-ml-sm">Edit {{ selectedCardInfo.name }} card</span>
      </q-card-section>

      <q-card-section>
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
  name: "ProfilePage",
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
      message: "Log in to view your profile",
      imageCards: "FidelityCard.svg",
      titleCards: "Ooops! No cards to show!",
      messageCards: "Add your first card.",
      name: "",
      email: "",
      passwordCurrent: "",
      password: "",
      passwordConfirm: "",
      isPwd: true,
      isPwdConfirm: true,
      darkMode: null,
      tab: "fidelityCards",
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
      title: "Profile",
      showBackIcon: false,
    });
    this.darkMode = dashHeader.$state.darkMode;
    if (this.userStore.authUser) {
      this.name = this.userStore.authUser.name;
      this.email = this.userStore.authUser.email;

      await this.fetchFidelityCards();
    }
  },
  methods: {
    toggleDarkMode(e) {
      this.$q.dark.set(e);
      this.dashHeader.$patch({
        darkMode: e,
      });
    },
    openAddNewCardDialog() {
      this.stopCamera = false;
      this.showNewCardDialog = true;
    },
    openCardDetailsDialog(card) {
      this.selectedCardInfo = card;
      this.showDetailedCardDialog = true;
      this.cardName = this.selectedCardInfo.name;
      this.cardColor = this.selectedCardInfo.color;
      // console.log(card);
    },
    async fetchFidelityCards() {
      const res = await this.$api.get("/cards");
      this.cards = res.data.cards;
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
    async onSaveChanges() {
      try {
        const data = {
          name: this.name,
          passwordCurrent: this.passwordCurrent,
          password: this.password,
          passwordConfirm: this.passwordConfirm,
        };
        const res = await this.$api.patch("/users/updateMyPassword", data);
        if (res.data.status === "success") {
          console.log("succes");
          this.$q.notify({
            type: "positive",
            position: "top",
            message: "Changes saved successfully",
            color: "positive",
            timeout: "2500",
          });
          this.passwordCurrent = "";
          this.password = "";
          this.passwordConfirm = "";
        }
      } catch (err) {
        console.log(err);
      }
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
        console.log(err);
      }
    },
    async deleteCard(selectedCardInfo) {
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
    },
  },
};
</script>

<style lang="scss" scoped>
.profile-page {
  // height: 100%;
}
.profile-page-info {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.q-input {
  width: 100%;
  max-width: 300px;
  margin-top: 20px;
}
.savechanges-btn {
  background-color: #267378;
  color: white;
  margin: 10px;
  margin-top: 30px;
}
.profile-page-title {
  font-size: 24px;
}
.toggle-dark {
  align-items: center;
  font-size: 16px;
  gap: 60px;
  margin-top: 20px;
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
.inputs-style {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
</style>
