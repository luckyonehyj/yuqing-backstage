//用户管理页面
<template>
  <div id="user">
    <el-row>
      <el-col :span="24">
        <div class="title">{{title}}</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "用户管理"
    };
  }
};
</script>

<style lang="stylus"></style>