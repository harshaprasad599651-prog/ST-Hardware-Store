<script>
import AppHeader from './components/Layout/AppHeader.vue'
import Background from './components/Layout/background.vue'

export default {
  components: {
    AppHeader,
    Background
  }
}
</script>

<template>
  <Background>
    <AppHeader />
  </Background>
</template>