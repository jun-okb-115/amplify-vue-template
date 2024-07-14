import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import outputs from "../amplify_outputs.json";
import { Amplify } from "aws-amplify";
import "./assets/main.css";

Amplify.configure(outputs);

loadFonts()

createApp(App)
  .use(vuetify)
  .mount('#app')
