<template>
  <ul>
    <li
      class="menu"
      :class="{'selected':$route.path==item.path}"
      v-for="(item,index) in data"
      :key="index"
      @click.stop="goToUrl(item)"
    >
      <a>{{item.sname}}</a>
      <Menu
        v-if="item.children"
        :data="item.children"
        :openMenus="openMenus"
        :class="{'active':canOpen(item)}"
        @gogo="outgoToClick"
      ></Menu>
    </li>
  </ul>
</template>

<script>
export default {
  name: "Menu",
  props: {
    data: Array,
    openMenus: Array
  },
  methods: {
    canOpen(item) {
      return this.openMenus.includes(item.path);
    },
    goToUrl(item) {
      this.$emit("gogo", item);
    },
    outgoToClick(item) {
      this.$emit("gogo", item);
    }
  }
};
</script>
