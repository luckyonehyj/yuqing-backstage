//专报概述页面
<template>
  <div id="home">
    <el-row>
      <el-col :span="24">
        <div class="title">{{title}}</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    title: String
  }
};
</script>

<style lang="stylus" scoped></style>