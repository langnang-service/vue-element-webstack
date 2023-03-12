<template>
  <el-dialog :visible.sync="visible" append-to-body :title="title" width="800px">
    <el-form ref="form" :model="form" :rules="rules" label-width="60px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="徽标" prop="icon">
        <el-input v-model="form.icon"></el-input>
        <el-avatar :src="form.icon"></el-avatar>
      </el-form-item>
      <el-form-item label="地址" prop="url">
        <el-input v-model="form.url"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio label="public"></el-radio>
          <el-radio label="private"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="排序">
        <el-input-number v-model="form.order"></el-input-number>
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item class="text-right">
        <el-button class="pull-left" type="warning" @click="onMock">Mock</el-button>
        <el-button type="primary" @click="onSubmit">确认</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import { elementIcons, fontAwesomeBrands } from '@/constants'
import Mock from 'mockjs'
const originForm = {
  id: null,
  name: null,
  slug: null,
  icon: null,
  type: "site",
  status: "public",
  order: 0,
  description: "",
  parent: 0,
};
export default {
  name: "SiteDialog",
  components: {
  },
  props: {
    target: {
      type: String,
      default: "category",
    },
    data: {
      type: Object,
      default: () => ({})
    },
  },
  data() {
    return {
      visible: false,
      title: "",
      form: {
        ...originForm,
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
        ],
        url: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ],
      },
      iconGroupActive: "element_ui",
      iconGroup: [
        { label: "Element UI", value: "element_ui", children: elementIcons },
        { label: "Font Awesome Brands", value: "font_awesome_brands", children: fontAwesomeBrands }
      ],
    }
  },
  watch: {
  },
  methods: {
    toggle(row = {}) {
      this.form = { ...originForm, ...row }
      this.title = this.form.id ? '编辑站点' : '新增站点'
      this.visible = !this.visible
      this.$refs.form ? this.$refs.form.resetFields() : null;
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit('submit', { ...this.form });
          this.toggle();
        } else {
          return false;
        }
      });
    },
    onCancel() {
      this.toggle();
    },
    onMock() {
      this.form = {
        ...this.form,
        name: Mock.mock('@ctitle'),
        url: Mock.mock('@url'),
        icon: Mock.Random.image('100x100')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep {
  .icon-select__wrapper {}

  .icon-select__item {
    font-size: 48px;
    text-align: center;
    border: 1px solid #DCDFE6;
    padding: 4px;
    border-radius: 4px;

    &:hover {
      border-color: #409EFF;
    }

    &.is-active {
      border-color: #409EFF;
      background-color: #409EFF;
      color: white;
    }
  }

  .el-avatar {
    display: block;
    margin: 22px auto 0 auto;
    width: 100px;
    height: 100px;
    line-height: 100px;
  }

  .is-horizontal {
    display: none;
  }

  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
}
</style>