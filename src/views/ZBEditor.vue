// 专报编辑页面
<template>
  <div id="zbedit">
    <!-- 页面大标题 -->
    <el-row>
      <el-col :span="24">
        <div class="title">
          <i class="el-icon-arrow-left" @click="goBack">返回</i>
          <span id="title">{{currentZB.title}}</span>
        </div>
      </el-col>
    </el-row>
    <el-form ref="form" :model="form" label-width="100px" style="display:flex" size="mini">
      <!-- 按板块查询 -->
      <el-form-item label="按板块查询:" style="margin-left: -10px" prop="plate">
        <el-select v-model="form.plate" placeholder="请选择板块">
          <el-option label="零陵舆情" value="yuqing"></el-option>
          <el-option label="敏感信息" value="mingan"></el-option>
          <el-option label="贴文信息" value="tiewen"></el-option>
          <el-option label="社会热点" value="redian"></el-option>
        </el-select>
      </el-form-item>
      <!-- 按标题查询 -->
      <el-form-item label="按标题查询:" prop="title">
        <el-input v-model="form.title" placeholder="请输入关键字" class="search"></el-input>
      </el-form-item>
      <!-- 按日期查询 -->
      <!-- <el-form-item label="按日期查询:" prop="date">
        <el-date-picker v-model="form.date" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>-->
      <!-- 查询/取消 按钮 -->
      <el-form-item class="submmit">
        <el-button type="primary" style="margin: 0 5px 0 -80px" @click="handleSearch('form')">查询</el-button>
        <el-button @click="resetForm('form')">取消</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)"
      style="width: 100% "
      row-key="id"
      stripe
      :default-sort="{prop: 'date', order: 'descending'}"
      size="small"
      ref="table"
    >
      <el-table-column type="index" width="60"></el-table-column>
      <!-- <el-table-column prop="date" label="日期" width="130" sortable></el-table-column> -->
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="brief" label="简介"></el-table-column>
      <el-table-column prop="operation" label="编辑/删除" width="130">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
            circle
            type="primary"
            icon="el-icon-edit"
          ></el-button>
          <el-button
            size="mini"
            type="info"
            @click="handleDelete(scope.$index, scope.row)"
            circle
            icon="el-icon-delete"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="currentPage"
      :page-size="PageSize"
      layout="total,  prev, pager, next, jumper"
      :total="totalCount"
      @current-change="handleCurrentChange"
      small
    ></el-pagination>
    <!-- 编辑框 -->
    <edit></edit>
  </div>
</template>

<script>
import Edit from "@/components/Edit";
import bus from "@/utils/bus";
export default {
  data() {
    return {
      // 大标题
      title: "",
      // 舆情查询关键字
      form: {
        plate: "",
        title: ""
        // date: ""
      },
      //舆情表格数据
      tableData: [
        {
          id: "12",
          date: "2016-05-02",
          title: "12345ddddddddddddddddddddddddddddddddddddddddddddddd",
          plate: "零陵舆情",
          brief: "上海市普陀区金沙江路 1518 弄ddddddddddddddddddddddddddd",
          content: "dddddd"
        },
        {
          id: "23",
          date: "2016-05-04",
          title: "23456",
          plate: "敏感信息",
          brief: "上海市普陀区金沙江路 1517 弄",
          content: "dddddd"
        },
        {
          id: "34",
          date: "2016-05-01",
          title: "34567",
          plate: "帖文信息",
          content: "dddddd",
          brief: "上海市普陀区金沙江路 1519 弄"
        },
        {
          id: "45",
          date: "2016-05-03",
          title: "45678",
          plate: "社会热点",
          content: "dddddd",
          brief: "上海市普陀区金沙江路 1516 弄"
        },
        {
          id: "56",
          date: "2016-05-03",
          title: "45678",
          plate: "社会热点",
          content: "dddddd",
          brief: "上海市普陀区金沙江路 1516 弄"
        },
        {
          id: "67",
          date: "2016-05-03",
          title: "45678",
          plate: "社会热点",
          content: "dddddd",
          brief: "上海市普陀区金沙江路 1516 弄"
        },
        {
          id: "78",
          date: "2016-05-03",
          title: "45678",
          plate: "社会热点",
          content: "dddddd",
          brief: "上海市普陀区金沙江路 1516 弄"
        },
        {
          id: "89",
          date: "2016-05-03",
          title: "45678",
          plate: "社会热点",
          content: "dddddd",
          brief: "上海市普陀区金沙江路 1516 弄"
        },
        {
          id: "90",
          date: "2016-05-03",
          title: "45678",
          plate: "社会热点",
          content: "dddddd",
          brief: "上海市普陀区金沙江路 1516 弄"
        },
        {
          id: "91",
          date: "2016-05-03",
          title: "45678",
          plate: "社会热点",
          content: "dddddd",
          brief: "上海市普陀区金沙江路 1516 弄"
        },
        {
          id: "92",
          date: "2016-05-03",
          title: "45678",
          plate: "社会热点",
          content: "dddddd",
          brief: "上海市普陀区金沙江路 1516 弄"
        },
        {
          id: "93",
          date: "2016-05-03",
          title: "45678",
          plate: "社会热点",
          content: "dddddd",
          brief: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      // 默认显示第几页
      currentPage: 1,
      // 总条数
      totalCount: 100,
      // 默认每页显示的条数
      PageSize: 9
    };
  },
  computed: {
    currentZB() {
      return this.$store.state.currentZB;
    }
  },
  components: {
    Edit
  },
  methods: {
    //获取所有舆情
    getData() {
      this.$http.get("").then(
        res => {
          console.log(res);
          // this.tableData = res.body;
          // this.totalCount = data.data.body.length;
        },
        err => {
          console.log(err);
        }
      );
    },
    //分页跳转
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
    },
    //查询舆情
    handleSearch(formName) {
      event.preventDefault();
      let formData = JSON.stringify(formName);
      this.$http.get("", formData).then(
        res => {
          console.log(res);
          // this.form = res.
          this.$refs[formName].resetFields();
        },
        err => {
          console.log(err);
          this.$refs[formName].resetFields();
        }
      );
    },
    //取消查询，清空表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //编辑舆情
    handleEdit(index, row) {
      bus.$emit("editYQ", row); //给编辑组件传值
      bus.$emit("showEditDialog", true); //显示编辑页面
    },
    //删除舆情
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该舆情, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http.get("", row.id).then(
            res => {
              console.log(res);
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            },
            err => {
              console.log(err);
              this.$message({
                type: "warning",
                message: "删除失败!"
              });
            }
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    goBack() {
      this.$router.go(-1);
      console.log("goback");
    }
  },
  mounted() {
    this.getData();
    bus.$on("updateTable", e => {
      let obj = JSON.parse(e);
      let id = obj.id;
      let index = this.tableData.findIndex(x => x.id === id);
      this.$set(this.tableData, index, obj);
    });
  }
};
</script>

<style lang="stylus">
.title {
  position: relative;

  #title {
    left: 50%;
    position: absolute;
    transform: translateX(-50%);
  }
}

.el-table .cell {
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
}

.el-pagination {
  display: flex;
  justify-content: center;
  margin: 0.2rem 0 0 -0.773333rem;
  0.013333rem;
}
</style>