<template>
  <div>
    <nuxt-layout><nuxt-page></nuxt-page></nuxt-layout>

  </div>
</template>
<script setup>
const {user,getMe} = useAuth()
if (!user.value) {
  getMe()

}
</script>

<style>
html, body, #app {
  height: 100%;
  margin: 0;
  padding: 0;
    background: #d1d1d1;
}

</style>