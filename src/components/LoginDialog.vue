<template>
  <el-dialog :visible.sync="visible" append-to-body title="登录" width="800px">
    <el-form :model="form" :rules="rules" label-width="60px">
      <el-form-item label="账号" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item class="text-right">
        <el-button type="primary" @click="onSubmit">确认</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
const originForm = {
  name: null,
  password: null,
}
export default {
  name: "LoginDialog",
  props: {},
  data() {
    return {
      visible: false,
      form: {
        ...originForm,
      },
      rules: {
        name: [
          { required: true, message: '请输入账号', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    toggle(row = {}) {
      this.form = { ...originForm, ...row }
      this.visible = !this.visible;
    },
    onSubmit() {
      this.$emit('submit', { ...this.form });
    },
    onCancel() {
      this.$emit('cancel', { ...this.form });
      this.toggle();
    }
  }
}
</script>

<style lang="scss" scoped></style>