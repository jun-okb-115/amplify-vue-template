<template>
  <v-app>
    <v-main>
      <v-container>
        <v-form @submit="onSubmit">
          <v-text-field
            label="search"
            v-model="searchText"
            outlined
            required
          ></v-text-field>
          <v-btn :loading="loading" :disabled="loading" type="submit" color="primary">Submit</v-btn>
        </v-form>

        <v-progress-circular v-if="loading" indeterminate color="primary"></v-progress-circular>
        <v-alert v-if="!loading && recipeResult" type="success">Recipe Result: {{ recipeResult }}</v-alert>
      </v-container>
    </v-main>
  </v-app>
  </template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Schema } from '../../amplify/data/resource';
import { generateClient } from 'aws-amplify/data';
// import { generateRecipe } from "../logic/actions";

const client = generateClient<Schema>();
const todos = ref<Array<Schema['Todo']["type"]>>([]);
const loading = ref(false);
const searchText = ref('');
const recipeResult = ref<string>("");

const onSubmit = async (event: Event) => {
  loading.value = true;
  event.preventDefault();

  try {
    console.log(client.queries)
    const response = await client.queries.askBedrock({ ingredients: [searchText.value || ''] });

    const res = JSON.parse(response.data?.body!);
    const content = res.content[0].text;
    const recipe = typeof content === "string" ? content : "No data returned";
    recipeResult.value = recipe;
  } catch (error) {
    console.error('レシピの生成中にエラーが発生しました:', error);
    throw new Error('レシピの生成に失敗しました。');
  } finally {
    loading.value = false;
  }
};
</script>
