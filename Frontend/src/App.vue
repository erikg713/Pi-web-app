<template>
  <div class="app">
    <Header />
    <LoginButton @loginSuccess="setUser" />
    <UserInfo :user="user" />
    <ProductList />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Header from './components/Header.vue'
import LoginButton from './components/LoginButton.vue'
import UserInfo from './components/UserInfo.vue'
import ProductList from './components/ProductList.vue'

const user = ref(null)
const setUser = (u) => { user.value = u }
</script>

<style src="./assets/styles.css"></style>
