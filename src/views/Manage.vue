<template>
  <div id="manage">
    <!-- 页面大标题 -->
    <el-row>
      <el-col :span="24">
        <div class="title">{{title}}</div>
      </el-col>
    </el-row>
    <!-- 查询 -->
    <el-form ref="form" :model="form" label-width="100px" style="display:flex" size="mini">
      <!-- 按板块查询 -->
      <el-form-item label="按板块查询:" style="margin-left: -10px">
        <el-select v-model="form.plate" placeholder="请选择板块">
          <el-option label="零陵舆情" value="yuqing"></el-option>
          <el-option label="敏感信息" value="mingan"></el-option>
          <el-option label="贴文信息" value="tiewen"></el-option>
          <el-option label="社会热点" value="redian"></el-option>
        </el-select>
      </el-form-item>
      <!-- 按标题查询 -->
      <el-form-item label="按标题查询:">
        <el-input v-model="form.title" placeholder="请输入关键字" class="search"></el-input>
      </el-form-item>
      <!-- 按日期查询 -->
      <el-form-item label="按日期查询:">
        <el-date-picker v-model="form.date" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <!-- 按钮 -->
      <el-form-item class="submmit">
        <el-button type="primary" style="margin: 0 5px 0 -80px" @click="onSearch('form')">查询</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table
      :data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)"
      style="width: 100% "
      row-key="id"
      stripe
      :default-sort="{prop: 'date', order: 'descending'}"
      size="mini"
      ref="table"
    >
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="date" label="日期" width="130" sortable></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="brief" label="简介"></el-table-column>
      <el-table-column prop="operation" label="编辑/删除" width="130">
        <!-- <el-button
          type="primary"
          icon="el-icon-edit"
          circle
          size="mini"
          @click="onEdit(scope.$index)"
        ></el-button>
        <el-button type="info" icon="el-icon-delete" circle @click="onDelete" size="mini"></el-button>-->
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
    <!-- 分页 -->
    <el-pagination
      :current-page="currentPage"
      :page-size="PageSize"
      layout="total,  prev, pager, next, jumper"
      :total="totalCount"
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
      // 查询表单
      title: "管理舆情",
      form: {
        plate: "",
        title: "",
        date: ""
      },
      tableData: [
        {
          id: "0",
          date: "2016-05-02",
          plate: "零陵舆情",
          title:
            "王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎",
          brief:
            "上海市普陀区金沙江路 1518 弄王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎"
        },
        {
          id: "1",
          date: "2016-05-04",
          title: "王小虎",
          brief: "上海市普陀区金沙江路 1517 弄",
          plate: "零陵舆情"
        },
        {
          id: "2",
          date: "2016-05-01",
          title: "王小虎",
          plate: "零陵舆情",

          brief: "上海市普陀区金沙江路 1519 弄"
        },
        {
          id: "3",
          date: "2016-05-01",
          title: "王小虎",
          plate: "零陵舆情",

          brief: "上海市普陀区金沙江路 1519 弄"
        },
        {
          id: "4",
          date: "2016-05-04",
          title: "王小虎",
          plate: "零陵舆情",

          brief: "上海市普陀区金沙江路 1517 弄"
        },
        {
          id: "5",

          date: "2016-05-01",
          title: "王小虎",
          plate: "零陵舆情",

          brief: "上海市普陀区金沙江路 1519 弄"
        },
        {
          id: "6",

          date: "2016-05-01",
          title: "王小虎",
          plate: "零陵舆情",

          brief: "上海市普陀区金沙江路 1519 弄"
        },

        {
          id: "7",

          date: "2016-05-01",
          title: "王小虎",
          plate: "零陵舆情",

          brief: "上海市普陀区金沙江路 1519 弄"
        },
        {
          id: "8",

          date: "2016-05-03",
          title: "王小虎",
          plate: "零陵舆情",

          brief: "上海市普陀区金沙江路 1516 弄"
        },
        {
          id: "9",
          plate: "零陵舆情",

          date: "2016-05-02",
          title:
            "王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎",
          brief:
            "上海市普陀区金沙江路 1518 弄王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎"
        },
        {
          id: "10",

          date: "2016-05-04",
          plate: "零陵舆情",

          title: "王小虎",
          brief: "上海市普陀区金沙江路 1517 弄"
        },
        {
          id: "11",
          plate: "零陵舆情",

          date: "2016-05-01",
          title: "王小虎",
          brief: "上海市普陀区金沙江路 1519 弄"
        },
        {
          id: "12",
          plate: "零陵舆情",

          date: "2016-05-01",
          title: "王小虎",
          brief: "上海市普陀区金沙江路 1519 弄"
        },
        {
          id: "13",
          plate: "零陵舆情",

          date: "2016-05-04",
          title: "王小虎",
          brief: "上海市普陀区金沙江路 1517 弄"
        },
        {
          id: "14",
          plate: "零陵舆情",

          date: "2016-05-01",
          title: "王小虎",
          brief: "上海市普陀区金沙江路 1519 弄"
        },
        {
          id: "15",
          plate: "零陵舆情",

          date: "2016-05-01",
          title: "王小虎",
          brief: "上海市普陀区金沙江路 1519 弄"
        },
        {
          id: "16",
          plate: "零陵舆情",

          date: "2016-05-01",
          title: "王小虎",
          brief: "上海市普陀区金沙江路 1519 弄"
        },
        {
          id: "17",
          plate: "零陵舆情",

          date: "2016-05-03",
          title: "王小虎",
          brief: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      // 默认显示第几页
      currentPage: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 100,
      // 个数选择器（可修改）
      // 默认每页显示的条数（可修改）
      PageSize: 10
      // 编辑对话框是否可见
    };
  },
  components: {
    Edit
  },
  methods: {
    // getData() {
    //   this.$http.get("").then(
    //     function(res) {
    //       console.log(reponse);
    //       this.tableData = data.data.body;
    //       this.totalCount = data.data.body.length;
    //     },
    //     function() {
    //       console.log("请求失败处理");
    //     }
    //   );
    // },'
    // onSearch(formName) {
    //   event.preventDefault();
    //   let formData = JSON.stringify(this.form);
    //   this.$http.get("", formData).then(
    //     res => {
    //       console.log(res);
    //     },
    //     err => {
    //       console.log(err);
    //     }
    //   );
    //   console.dir(this.form);
    // },
    handleEdit(index, row) {
      bus.$emit("edit", row); //给编辑组件传值
      bus.$emit("showEditDialog", true); //显示编辑页面
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该舆情, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          console.log(index, row);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
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
    //   this.getData();
    bus.$on("showEditDialog", e => {
      this.dialogTableVisible = e;
      console.log(e);
    });
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