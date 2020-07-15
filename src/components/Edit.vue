<template>
  <div id="edit">
    <!-- 编辑对话框 -->
    <el-dialog title="编辑舆情" :visible.sync="dialogVisible" width="85%" top="2vh" :center="true">
      <!-- 表单 -->
      <el-form ref="form" :model="form" label-width="95px" :rules="rules">
        <!-- 标题 -->
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="form.title" style="width:45.8%;" placeholder="请输入文章标题"></el-input>
        </el-form-item>
        <!-- 板块 -->
        <el-form-item label="选择板块" prop="plate">
          <el-select v-model="form.plate" placeholder="请选择板块">
            <el-option label="涉零舆情" value="yuqing"></el-option>
            <el-option label="敏感信息" value="mingan"></el-option>
            <el-option label="贴文信息" value="tiewen"></el-option>
            <el-option label="社会热点" value="redian"></el-option>
          </el-select>
        </el-form-item>
        <!-- 日期 -->
        <el-form-item label="选择日期" prop="date">
          <el-col :span="11">
            <el-date-picker placeholder="选择日期" v-model="form.date" style="width: 200px;"></el-date-picker>
          </el-col>
        </el-form-item>
        <!-- 简介填写 -->
        <el-form-item label="填写简介" prop="brief">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.introduction"></el-input>
        </el-form-item>
        <!-- 内容 -->
        <el-form-item label="填写内容" prop="content">
          <el-card>
            <quill-editor
              v-model="form.content"
              ref="myQuillEditor"
              style="height: 400px;"
              :options="editorOption"
            ></quill-editor>
          </el-card>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">完成</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import bus from "@/utils/bus";
export default {
  data() {
    return {
      //   编辑对话框是否显示
      dialogVisible: false,
      // 表单数据
      form: {
        id: "",
        title: "",
        plate: "",
        date: "",
        introduction: "",
        content: null
      },

      // 表单验证
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
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        brief: [{ message: "请填写简介", trigger: "blur" }],
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
    //   提交编辑后的表单
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          event.preventDefault();
          this.$confirm("确认此次编辑?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "primary"
          })
            .then(() => {
              this.dialogVisible = false;

              let formData = JSON.stringify(this.form);
              this.$http.post("UpdateData.php", formData).then(
                () => {
                  bus.$emit("updateTable");
                  this.$message({
                    type: "success",
                    message: "编辑成功"
                  });
                },
                err => {
                  console.log(err);
                  this.$message({
                    type: "warning",
                    message: "编辑失败"
                  });
                }
              );

              this.$refs[formName].resetFields();
            })
            .catch(() => {
              this.dialogVisible = false;
              this.$message({
                type: "info",
                message: "取消编辑"
              });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 取消编辑
    cancel() {
      this.dialogVisible = false;
    }
  },
  created() {
    //   监听编辑按钮点击事件，给编辑框传入数据
    bus.$on("editYQ", e => {
      this.form = e;
    });
    //  监听编辑按钮点击事件，显示编辑框
    bus.$on("showEditDialog", e => {
      this.dialogVisible = e;
    });
  }
};
</script>
<style lang="stylus">
#edit {
  .el-textarea__inner {
    height: 1.2rem;
  }

  .el-dialog {
    height: 96vh;

    .el-card__body {
      height: 6.5rem;
      overflow: auto;
      padding: 0;

      .quill-editor {
        height: 6.5rem !important;
        overflow: hidden;

        .ql-container {
          white-space: pre-wrap !important;

          .ql-editor {
            height: 5.8rem;
          }
        }
      }
    }
  }

  .quill-editor {
    line-height: normal;
  }

  .el-form-item__label {
    font-size: 0.3rem !important;
  }
}
</style>