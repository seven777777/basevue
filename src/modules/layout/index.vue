<template>
  <div class="layoutWrapper">
    <div class="layoutTopbar layoutTop">
      <div class="logo">logo</div>

      <el-select
        size="mini"
        v-model="theme"
        placeholder="请选择"
        style="float:right;margin-right:10px;"
        @change="changeTheme"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <aside class="layoutAside">
      <ul class="menus">
        <li v-for="(item,index) in menu" :key="index" class="menu">
          <a @click.stop="goToUrl(item)">{{item.sname}}</a>
          <Menu
            :data="item.children"
            :class="{'active':canOpen(item)}"
            :openMenus="openMenus"
            @gogo="goToUrl"
          ></Menu>
        </li>
      </ul>
    </aside>
    <div class="layoutMain">
      <router-view></router-view>
    </div>
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
@import "./index.scss";
</style>


