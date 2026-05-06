<script setup>

</script>

<template>
  <h1>Notes</h1>
  <router-link to="/dashboard/notes">All notes</router-link>
  <router-link to="/dashboard/notes/add">Add new note</router-link>
  <router-view></router-view>
</template>

<style lang = 'sass' scoped>
a
  margin-right: 20px
</style>