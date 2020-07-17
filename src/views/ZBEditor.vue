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
    <el-form ref="form" :model="form" label-width="100px" style="display:flex ">
      <!-- 按板块查询 -->
      <el-form-item label="按板块查询:" prop="plate" style="margin-left: 10px">
        <el-select v-model="form.plate" placeholder="请选择板块">
          <el-option label="涉零舆情" value="yuqing"></el-option>
          <el-option label="敏感信息" value="mingan"></el-option>
          <el-option label="贴文信息" value="tiewen"></el-option>
          <el-option label="社会热点" value="redian"></el-option>
        </el-select>
      </el-form-item>
      <!-- 按标题查询 -->
      <el-form-item label="按标题查询:" prop="title" style="margin-left: 15px">
        <el-input v-model="form.title" placeholder="请输入关键字" class="search"></el-input>
      </el-form-item>
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
      ref="table"
    >
      <el-table-column type="index" width="80" align="center"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="plate" label="板块" width="130"></el-table-column>
      <el-table-column prop="operation" label="编辑/删除" width="160" align="center">
        <template slot-scope="scope">
          <el-button
            size="small"
            @click="handleEdit(scope.$index, scope.row)"
            circle
            type="primary"
            icon="el-icon-edit"
          ></el-button>
          <el-button
            :ref="`deleteBtn${scope.$index}`"
            size="small"
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
    ></el-pagination>
    <!-- 编辑框 -->
    <edit></edit>
  </div>
</template>

<script>
import Edit from "@/components/Edit";
import bus from "@/utils/bus";
// import _ from "lodash";
export default {
  data() {
    return {
      // 大标题
      title: "",
      // 舆情查询关键字
      form: {
        id: "",
        plate: "",
        title: ""
      },
      //当前舆情表格数据
      tableData: [],
      //全体舆情表格数据
      // 默认显示第几页
      currentPage: 1,
      // 总条数
      totalCount: 0,
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
      this.$http.post("FindDataId.php", this.currentZB).then(
        res => {
          const data = res.body;
          //解决刷新数据丢失的问题
          if (data instanceof Array) {
            this.tableData = data;
            this.totalCount = data.length;
            sessionStorage.setItem("tableDataTotal", JSON.stringify(data));
          } else {
            this.tableData = JSON.parse(
              sessionStorage.getItem("tableDataTotal")
            );
          }
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
      this.form.id = this.currentZB;
      let formData = JSON.stringify(this.form);
      this.$http.post("FindDataContent.php", formData).then(
        res => {
          this.tableData = res.body;
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
      this.tableData = this.tableDataTotal;
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
          this.$refs[`deleteBtn${index}`].disabled = "disabled"; //防止短时间多次点击删除按钮，导致一条舆情多次删除，造成数据错误
          this.$http.post("DeleteDataContent.php", JSON.stringify(row)).then(
            res => {
              if (res.body) {
                this.$router.go(-1);
                this.$message({
                  type: "success",
                  message: "专报已空，自动删除!"
                });
              } else {
                this.getData();
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
              }
            },
            err => {
              this.$refs[`deleteBtn${index}`].disabled = "";
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
    }
  },

  mounted() {
    this.getData();
    bus.$on("updateTable", () => {
      this.getData();
    });
  }
};
</script>

<style lang="stylus">
#zbedit {
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
    margin: 0.5rem 0 0 -0.773333rem;
    0.013333rem;
  }

  .el-form-item__label {
    font-size: 0.3rem;
  }
}
</style>