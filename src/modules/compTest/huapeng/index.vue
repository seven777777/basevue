<template>
  <div>
    <Datepicker></Datepicker>
    <SwiperSelecter :bottomData="bottomData" :activeId="activeId" @change="bottomChange"></SwiperSelecter>
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
@import url("index.scss");
</style>
