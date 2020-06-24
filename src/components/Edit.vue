<template>
  <div id="create">
    <el-dialog title="编辑" :visible.sync="dialogVisible" width="85%" top="0">
      <el-form ref="form" :model="form" label-width="80px" :rules="rules" size="small">
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="form.title" style="width:45.8%;" placeholder="请输入文章标题"></el-input>
        </el-form-item>
        <el-form-item label="选择板块" prop="plate">
          <el-select v-model="form.plate" placeholder="请选择板块">
            <el-option label="零陵舆情" value="yuqing"></el-option>
            <el-option label="敏感信息" value="mingan"></el-option>
            <el-option label="贴文信息" value="tiewen"></el-option>
            <el-option label="社会热点" value="redian"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择日期" prop="date">
          <el-col :span="11">
            <el-date-picker placeholder="选择日期" v-model="form.date" style="width: 200px;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="填写简介" prop="brief">
          <el-input type="textarea" v-model="form.brief" placeholder="请输入文章简介"></el-input>
        </el-form-item>

        <el-form-item label="填写内容" prop="content">
          <el-card>
            <quill-editor v-model="form.content" ref="myQuillEditor" style="height: 500px;"></quill-editor>
          </el-card>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">完成</el-button>
          <el-button @click="resetForm">取消</el-button>
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
      form: {
        title: "",
        plate: "",
        date: "",
        brief: "",
        content: null
      },
      dialogVisible: false,

      rules: {
        title: [
          { required: true, message: "请输入文章标题", trigger: "blur" },
          { min: 5, max: 30, message: "长度在 5到 30 个字符", trigger: "blur" }
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
        brief: [{ required: true, message: "请填写简介", trigger: "blur" }],
        content: [
          { required: true, message: "请填写文章内容", trigger: "blur" }
        ]
      }
    };
  },
  components: {
    quillEditor
  },
  methods: {
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
              this.$http.get("test.php", formData).then(
                res => {
                  console.log(res);
                },
                err => {
                  console.log(err);
                }
              );
              this.$message({
                type: "success",
                message: "编辑成功"
              });
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
    cancel() {
      this.dialogVisible = false;
    }
  },
  created() {
    bus.$on("edit", e => {
      this.form = e;
    });
    bus.$on("showEditDialog", e => {
      this.dialogVisible = e;
      console.log(e);
    });
  }
};
</script>
<style lang="stylus">
.el-tabs__content {
  .el-textarea__inner {
    height: 1.2rem;
  }

  .el-card__body {
    height: 5rem;
    padding: 0;
    overflow: auto;
  }
}
</style>