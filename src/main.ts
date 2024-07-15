import { createApp } from 'vue'
import App from './App.vue'
import { loadFonts } from './plugins/webfontloader'
import outputs from "../amplify_outputs.json";
import { Amplify } from "aws-amplify";
import "./assets/main.css";
import { createVuetify } from 'vuetify'
import 'vuetify/styles'

Amplify.configure(outputs);

loadFonts()

const vuetify = createVuetify()

createApp(App)
  .use(vuetify)
  .mount('#app')
