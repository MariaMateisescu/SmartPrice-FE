import { boot } from "quasar/wrappers";
import VueGoogleMaps from "@fawmi/vue-google-maps";

export default boot(({ app }) => {
  app.use(VueGoogleMaps, {
    // 🤿 Vue App. Please install Vue Google Maps
    load: {
      key: "AIzaSyCaLqRmzlYh0hkEI_FtBx8nPhIS0jJH9V0", // 🤿 I don't have a google key, so leave it blank for now
    },
  });
});
