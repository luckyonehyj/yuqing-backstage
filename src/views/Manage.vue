<template>
  <div id="manage">
    <!-- "专报管理"大标题 -->
    <el-row>
      <el-col :span="24">
        <div class="title">{{title}}</div>
      </el-col>
    </el-row>
    <!-- 专报查询板块 -->
    <el-form ref="form" :model="form" label-width="100px" style="display:flex">
      <!-- 按日期查询专报 -->
      <el-form-item label="按日期查询:" prop="date">
        <el-date-picker
          v-model="form.date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
      <el-form-item class="submmit">
        <el-button type="primary" style="margin: 0 5px 0 -80px" @click="handleSearch('form')">查询</el-button>
        <el-button @click="resetForm('form')">取消</el-button>
      </el-form-item>
    </el-form>
    <!-- 专报表格 -->
    <el-table :data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)" stripe>
      <el-table-column type="index" align="center" width="70"></el-table-column>
      <el-table-column label="标题" prop="title"></el-table-column>
      <el-table-column label="涉零舆情" prop="yuqing" align="center"></el-table-column>
      <el-table-column label="敏感信息" prop="mingan" align="center"></el-table-column>
      <el-table-column label="帖文信息" prop="tiewen" align="center"></el-table-column>
      <el-table-column label="社会热点" prop="redian" align="center"></el-table-column>
      <el-table-column prop="operation" label="编辑/删除" width="130" align="center">
        <template slot-scope="scope">
          <el-button
            size="small"
            @click="handleEdit(scope.$index, scope.row)"
            circle
            type="primary"
            icon="el-icon-edit"
          ></el-button>
          <el-button
            size="small"
            type="info"
            @click="handleDelete(scope.$index, scope.row)"
            circle
            icon="el-icon-delete"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页-->
    <el-pagination
      :current-page="currentPage"
      :page-size="PageSize"
      layout="total,  prev, pager, next, jumper"
      :total="totalCount"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>
  
<script>
import bus from "@/utils/bus";
export default {
  data() {
    return {
      // 大标题
      title: "管理专报",
      //专报查询关键字
      form: {
        date: []
      },
      //专报表格全体数据
      tableDataTotal: [],
      //当前表格数据
      tableData: [],
      // 默认显示第几页
      currentPage: 1,
      // 总条数
      totalCount: 100,
      // 默认每页显示的条数
      PageSize: 9
    };
  },
  methods: {
    //获取所有专报
    getData() {
      this.$http.get("FindDataTotal.php").then(
        res => {
          const data = res.body;
          this.tableData = data;
          this.totalCount = data.length;
          this.tableDataTotal = data;
          console.log(data);
        },
        err => {
          console.log(err);
        }
      );
    },
    //分页跳转
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
    //查询专报
    handleSearch(formName) {
      event.preventDefault();
      console.log(this.form.date);
      if (this.form.date.length !== 0) {
        let formData = JSON.stringify(this.form);
        this.$http.post("FindData.php", formData).then(
          res => {
            this.tableData = res.body;
            this.$refs[formName].resetFields();
          },
          err => {
            console.log(err);
            this.$refs[formName].resetFields();
          }
        );
      }
      this.tableData = this.tableDataTotal;
    },
    //取消查询，清空表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.tableData = this.tableDataTotal;
    },
    //编辑专报
    handleEdit(index, row) {
      this.$router.push({ path: "/yuqing" });
      this.$store.commit("changeZB", row.id);
    },
    //删除专报
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该舆情, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http.post("DeleteData.php", row.id).then(
            () => {
              const data = this.tableData.filter(item => item.id !== row.id);
              this.tableData = data;
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
    }
  },
  mounted() {
    this.getData();
    bus.$on("addYuqing", () => {
      this.getData();
    });
  }
};
</script>

<style lang="stylus">
#manage {
  .el-table .cell {
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
  }

  .el-pagination {
    display: flex;
    justify-content: center;
    margin: 0.5rem 0 0 -0.773333rem;
    0.013333rem;
  }

  .el-form-item__label {
    font-size: 0.3rem !important;
  }
}
</style>