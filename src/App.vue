<template>
  <div id="app">
    <el-tabs type="border-card" v-model="activeName" tab-position="left" stretch>
      <el-tab-pane name="专报概述">
        <span slot="label">
          <i class="el-icon-menu"></i>专报概述
        </span>
        <home :title="activeName"></home>
      </el-tab-pane>
      <el-tab-pane label="创建专报" name="创建专报">
        <span slot="label">
          <i class="el-icon-upload"></i> 创建专报
        </span>
        <create :title="activeName"></create>
      </el-tab-pane>
      <el-tab-pane label="管理专报" name="管理专报">
        <span slot="label">
          <i class="el-icon-s-management"></i> 管理专报
        </span>
        <manage :title="activeName"></manage>
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
import Manage from "@/views/Manage";
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
    Manage,
    User
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>
<style lang="stylus">
.el-tabs {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;

  .el-tabs__header {
    height: 100vh !important;

    .el-tabs__nav-wrap {
      height: 100% !important;
      background-color: #00BFFF;

      .el-tabs__nav {
        height: 100%;

        .el-tabs__item {
          height: 25%;
          line-height: 25vh;
          font-weight: 700;
          color: #fff !important;
        }

        .is-active {
          background-color: #1E90FF !important;
          border-color: #1E90FF !important;
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
