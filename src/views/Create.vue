// 舆情创建页面
<template>
  <div id="create">
    <!-- 页面大标题 -->
    <el-row>
      <el-col :span="24">
        <div class="title">{{title}}</div>
      </el-col>
    </el-row>
    <!-- 表单 -->
    <el-form ref="form" :model="form" label-width="90px" :rules="rules">
      <!-- 标题填写 -->
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="form.title" style="width:48%;" placeholder="请输入文章标题"></el-input>
      </el-form-item>
      <!-- 板块选择-->
      <el-form-item label="选择板块" prop="plate">
        <el-select v-model="form.plate" placeholder="请选择板块">
          <el-option label="涉零舆情" value="yuqing"></el-option>
          <el-option label="敏感信息" value="mingan"></el-option>
          <el-option label="贴文信息" value="tiewen"></el-option>
          <el-option label="社会热点" value="redian"></el-option>
        </el-select>
      </el-form-item>
      <!-- 日期选择 -->
      <el-form-item label="选择日期" prop="date">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 200px;"></el-date-picker>
        </el-col>
      </el-form-item>
      <!-- 文章填写 -->
      <el-form-item label="填写内容" prop="content">
        <el-card>
          <quill-editor
            v-model="form.content"
            ref="myQuillEditor"
            style="height: 500px;"
            :options="editorOption"
            class="ql-editor"
          ></quill-editor>
        </el-card>
      </el-form-item>
      <!-- 完成/重置按钮 -->
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">完成</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import bus from "@/utils/bus";
//引入富文本编辑框
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
  data() {
    return {
      //大标题
      title: "创建舆情",
      // 表单数据
      form: {
        title: "",
        plate: "",
        date: "",
        // brief: "",
        content: null
      },
      // 表单验证规则
      rules: {
        title: [
          { required: true, message: "请输入文章标题", trigger: "blur" },
          { min: 5, max: 50, message: "长度在 5到 50 个字符", trigger: "blur" }
        ],
        plate: [
          { required: true, message: "请选择舆情板块", trigger: "change" }
        ],
        date: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        content: [
          { required: true, message: "请填写文章内容", trigger: "blur" }
        ]
      },
      // 编辑器配置项
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"], // 加粗，斜体，下划线，删除线
            ["blockquote"], //引用，代码块
            [{ list: "ordered" }, { list: "bullet" }], // 有序列表，无序列表
            [{ direction: "rtl" }], // 文字输入方向
            [{ color: [] }, { background: [] }], // 颜色选择
            [{ align: [] }], // 居中
            ["image", "video", "link"],
            ["clean"] //新添加的工具 // 清除样式
          ]
        }
      }
    };
  },
  components: {
    quillEditor
  },
  methods: {
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          event.preventDefault();
          this.$confirm("是否确认提交该舆情?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "primary"
          })
            .then(() => {
              let formData = JSON.stringify(this.form);
              this.$http.post("SetData.php", formData).then(
                res => {
                  console.log(res);
                  bus.$emit("addYuqing");
                  this.$message({
                    type: "success",
                    message: "添加成功"
                  });
                },
                err => {
                  console.log(err);
                  this.$message({
                    type: "warning",
                    message: "添加失败"
                  });
                }
              );

              this.$refs[formName].resetFields();
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "取消添加"
              });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="stylus">
#create {
  .el-textarea__inner {
    height: 1.2rem;
  }

  .el-card__body {
    height: 8.5rem;
    padding: 0;
    overflow: auto;

    .quill-editor {
      height: 8.5rem !important;
      overflow: hidden;

      .ql-container {
        height: 6.5rem;
      }
    }
  }

  .el-form-item__label {
    font-size: 0.3rem;
  }
}

.title {
  height: 20%;
  box-sizing: border-box;
  font-size: 0.45rem;
  padding: 0.266667rem 0 0.7rem;
}

.el-table_1_column_1 .cell {
  padding-left: 0.013333rem !important;
}
</style>