<template>
  <div id="manage">
    <!-- "专报管理"大标题 -->
    <el-row>
      <el-col :span="24">
        <div class="title">{{title}}</div>
      </el-col>
    </el-row>
    <!-- 专报查询板块 -->
    <el-form ref="form" :model="form" label-width="100px" style="display:flex" size="small">
      <!-- 按日期查询专报 -->
      <el-form-item label="按日期查询:" prop="date" style="margin-left: -10px">
        <el-date-picker v-model="form.date" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item class="submmit">
        <el-button type="primary" style="margin: 0 5px 0 -80px" @click="handleSearch('form')">查询</el-button>
        <el-button @click="resetForm('form')">取消</el-button>
      </el-form-item>
    </el-form>
    <!-- 专报表格 -->
    <el-table
      :data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)"
      style="width: 100%"
      size="mini"
    >
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column label="标题" prop="title"></el-table-column>
      <el-table-column label="零陵舆情" prop="yuqing"></el-table-column>
      <el-table-column label="敏感信息" prop="mingan"></el-table-column>
      <el-table-column label="帖文信息" prop="tiewen"></el-table-column>
      <el-table-column label="社会热点" prop="redian"></el-table-column>
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

    <!-- 分页-->
    <el-pagination
      :current-page="currentPage"
      :page-size="PageSize"
      layout="total,  prev, pager, next, jumper"
      :total="totalCount"
      @current-change="handleCurrentChange"
      small
    ></el-pagination>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      // 大标题
      title: "管理专报",
      //专报查询关键字
      form: {
        date: ""
      },
      //专报表格数据
      tableData: [
        {
          id: "12987122",
          title: "2020/03/03期专报",
          date: "2020-01-01",
          yuqing: 1,
          mingan: 2,
          tiewen: 3,
          redian: 4
        },
        {
          id: "12987123",
          title: "2020/03/04期专报",
          date: "2020-01-01",
          yuqing: 1,
          mingan: 2,
          tiewen: 3,
          redian: 4
        },
        {
          id: "12987125",
          title: "2020/03/05期专报",
          date: "2020-01-01",
          yuqing: 1,
          mingan: 2,
          tiewen: 3,
          redian: 4
        },
        {
          id: "12987126",
          title: "2020/03/06期专报",
          date: "2020-01-01",
          yuqing: 1,
          mingan: 2,
          tiewen: 3,
          redian: 4
        },
        {
          id: "12987126",
          title: "2020/03/07期专报",
          date: "2020-01-01",
          yuqing: 1,
          mingan: 2,
          tiewen: 3,
          redian: 4
        },
        {
          id: "12987126",
          title: "2020/03/08期专报",
          date: "2020-01-01",
          yuqing: 1,
          mingan: 2,
          tiewen: 3,
          redian: 4
        },
        {
          id: "12987126",
          title: "2020/03/09期专报",
          date: "2020-01-01",
          yuqing: 1,
          mingan: 2,
          tiewen: 3,
          redian: 4
        },
        {
          id: "12987126",
          title: "2020/03/10期专报",
          date: "2020-01-01",
          yuqing: 1,
          mingan: 2,
          tiewen: 3,
          redian: 4
        },
        {
          id: "12987126",
          title: "2020/03/11期专报",
          date: "2020-01-01",
          yuqing: 1,
          mingan: 2,
          tiewen: 3,
          redian: 4
        },
        {
          id: "12987126",
          title: "2020/03/12期专报",
          date: "2020-01-01",
          yuqing: 1,
          mingan: 2,
          tiewen: 3,
          redian: 4
        },
        {
          id: "12987126",
          title: "2020/03/13期专报",
          date: "2020-01-01",
          yuqing: 1,
          mingan: 2,
          tiewen: 3,
          redian: 4
        },
        {
          id: "12987126",
          title: "2020/03/14期专报",
          date: "2020-01-01",
          yuqing: 1,
          mingan: 2,
          tiewen: 3,
          redian: 4
        },
        {
          id: "12987126",
          title: "2020/03/15期专报",
          date: "2020-01-01",
          yuqing: 1,
          mingan: 2,
          tiewen: 3,
          redian: 4
        },
        {
          id: "12987126",
          title: "2020/03/10期专报",
          date: "2020-01-01",
          yuqing: 1,
          mingan: 2,
          tiewen: 3,
          redian: 4
        }
      ],
      // 默认显示第几页
      currentPage: 1,
      // 总条数
      totalCount: 100,
      // 默认每页显示的条数
      PageSize: 10
    };
  },
  methods: {
    //获取所有专报
    getData() {
      this.$http.get("findDataTotal.php").then(
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
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
    //查询专报
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
      this.$router.push({ path: "/yuqing" });
      this.$store.commit("changeZB", row);
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
    }
  }
};
</script>

<style lang="stylus">
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