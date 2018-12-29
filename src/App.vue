<template>
  <div id="app" class="dark_theme">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  created() {
    import(`./assets/styles/theme/${this.theme}/index.scss`);
  },
  computed: {
    ...mapState({
      theme: state => state.GlobalStore.theme
    })
  }
};
</script>
<style lang="scss">
@import "./assets/styles/common.scss";
</style>
