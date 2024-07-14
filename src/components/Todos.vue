<script setup lang="ts">
import '@/assets/main.css';
import { onMounted, ref } from 'vue';
import type { Schema } from '../../amplify/data/resource';
import { generateClient } from 'aws-amplify/data';

const client = generateClient<Schema>();

const todos = ref<Array<Schema['Todo']["type"]>>([]);

function listTodos() {
  client.models.Todo.observeQuery().subscribe({
    next: ({ items, isSynced }) => {
      todos.value = items
     },
  });
}

function createTodo() {
  client.models.Todo.create({
    content: window.prompt("Todo content")
  }).then(() => {
    listTodos();
  });
}

function deleteTodo(id: string) {
  client.models.Todo.delete({ id })
}

 onMounted(() => {
  listTodos();
});

</script>

<template>
  <main>
    <h1>My todos</h1>
    <v-btn color="primary" @click="createTodo">+ new</v-btn>
    <ul>
      <li
        v-for="todo in todos"
        :key="todo.id"
        @click="deleteTodo(todo.id)">
        {{ todo.content }}
      </li>
    </ul>
  </main>
</template>
