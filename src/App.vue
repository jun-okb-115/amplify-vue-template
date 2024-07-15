<!-- <script setup lang="ts">
import Todos from './components/Todos.vue'
import MenuBar from './components/MenuBar.vue'
import { Authenticator } from "@aws-amplify/ui-vue";
import "@aws-amplify/ui-vue/styles.css";
</script>

<template>
  <main>
    <authenticator>
      <template v-slot="{user, signOut}">
        <v-btn color="error" @click="signOut">signOut</v-btn>
        <h1>Hello {{user?.signInDetails?.loginId}}'s todos</h1>
        <Todos />
      </template>
    </authenticator>
  </main>
</template> -->

<template>
  <v-app>
    <v-main>
      <authenticator>
        <template v-slot="{user, signOut}">
          <v-container>
            <v-row align="center">
              <v-col cols="12">
                <v-btn color="error" @click="signOut">Sign Out</v-btn>
              </v-col>
              <v-col cols="12">
                <h1>Hello {{ user?.signInDetails?.loginId }}'s todos</h1>
              </v-col>
              <v-col cols="12">
                <!-- <Todos /> -->
                <SearchFrom />
              </v-col>
            </v-row>
          </v-container>
        </template>
      </authenticator>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import Todos from './components/Todos.vue';
import SearchFrom from './components/SearchForm.vue';
import { Authenticator } from "@aws-amplify/ui-vue";
import "@aws-amplify/ui-vue/styles.css";
</script>

<style scoped>
/* 必要に応じてスタイルを追加 */
</style>
