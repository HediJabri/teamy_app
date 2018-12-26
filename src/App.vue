<template>
  <div id="app">
    <router-view />
    <portal-target name="modals">
    </portal-target>
  </div>
</template>
<script>
export default {
  name: 'App'
}
</script>
<style lang="scss">
</style>
