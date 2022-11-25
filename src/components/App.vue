<template>
  <div class="app">
    <HeaderComponent />

    <RouterView></RouterView>
  </div>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";

export default {
  components: {
    HeaderComponent
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
</style>
