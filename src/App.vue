<template>
  <div id="app">
    <el-tabs type="border-card" v-model="activeName" tab-position="left" stretch>
      <el-tab-pane name="专报概述">
        <span slot="label">
          <i class="el-icon-menu"></i>专报概述
        </span>
        <home :title="activeName"></home>
      </el-tab-pane>
      <el-tab-pane label="创建舆情" name="创建舆情">
        <span slot="label">
          <i class="el-icon-upload"></i> 创建舆情
        </span>
        <create :title="activeName"></create>
      </el-tab-pane>
      <el-tab-pane label="管理专报" name="管理专报">
        <span slot="label">
          <i class="el-icon-s-management"></i> 管理专报
        </span>
        <router-view></router-view>
      </el-tab-pane>
      <el-tab-pane label="用户管理" name="用户管理">
        <span slot="label">
          <i class="el-icon-s-custom"></i> 用户管理
        </span>
        <user :title="activeName"></user>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import Home from "@/views/Home";
import Create from "@/views/Create";

import User from "@/views/User";
export default {
  data() {
    return {
      activeName: "管理专报"
    };
  },
  components: {
    Home,
    Create,
    User
  }
};
</script>
<style lang="stylus">
.el-tabs {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;

  .el-tabs__header {
    width: 16vh !important;
    height: 100vh !important;

    .el-tabs__nav-wrap {
      height: 100% !important;
      background-color: #00BFFF;

      .el-tabs__nav {
        height: 100%;

        .el-tabs__item {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 25%;
          font-weight: 700;
          font-size: 0.3rem;
          color: #fff !important;
        }

        .is-active {
          background-color: #409EFF !important;
          border-color: #409EFF !important;
        }
      }
    }
  }

  .el-tab-pane {
    padding-right: 0.533333rem;
    box-sizing: border-box;
  }
}
</style>
