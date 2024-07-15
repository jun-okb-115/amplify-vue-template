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
      <!-- <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="searchText" label="Search" outlined></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-btn color="primary" @click="listTodos">Search</v-btn>
          </v-col>
          <v-col cols="12">
            <検索結果を表示する部分>
            <div v-if="todos.length > 0">
            <h2>Search Results:</h2>
            <ul>
              <li v-for="result in todos" :key="result.id">{{ result.content }}</li>
            </ul>
            </div>
            <div v-else>
            <p>No results found.</p>
            </div>
          </v-col>
        </v-row>
      </v-container> -->
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


// const search = () => {
// // ここで実際の検索ロジックを実装します（例：APIからデータを取得する）
// // 今回はダミーデータを使用しています
// const dummyData = [
//   { id: 1, name: 'Result 1' },
//   { id: 2, name: 'Result 2' },
//   { id: 3, name: 'Result 3' },
// ];

// // searchTextに基づいて検索結果をフィルタリングする例
// searchResults.value = dummyData.filter(item =>
//   item.name.toLowerCase().includes(searchText.value.toLowerCase())
// );
// };

// フォーム送信時の処

const onSubmit = async (event: Event) => {
  loading.value = true;
  event.preventDefault();

  try {
    console.log(client.queries)
    // const response = await client.queries.askBedrock({ ingredients: [searchText.value || ''] });

    // const res = JSON.parse(response.data?.body!);
    // const content = res.content[0].text;
    // return content || '';
  } catch (error) {
    console.error('レシピの生成中にエラーが発生しました:', error);
    throw new Error('レシピの生成に失敗しました。');
  } finally {
    // loading.value = false;
  }

  // try {
  //   const formData = new FormData(event.currentTarget as HTMLFormElement);
  //   const data = await generateRecipe(formData);
  //   const recipe = typeof data === "string" ? data : "No data returned";
  //   recipeResult.value = recipe;
  // } catch (e) {
  //   alert(`An error occurred: ${e}`);
  // } finally {
  //   loading.value = false;
  // }
};
</script>
