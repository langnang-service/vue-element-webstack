<template>
  <el-dialog :visible.sync="visible" append-to-body :title="title" width="800px">
    <el-form ref="form" :model="form" :rules="rules" label-width="60px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="编码" prop="slug">
        <el-input v-model="form.slug"></el-input>
      </el-form-item>
      <el-form-item label="图标" prop="icon">
        <el-popover class="icon-select__wrapper" placement="bottom" width="700" trigger="click">
          <el-input slot="reference" v-model="form.icon" disabled>
            <template slot="append"><i class="el-icon-setting"></i></template>
          </el-input>
          <el-tabs v-model="iconGroupActive">
            <el-tab-pane v-for="(list, index) in iconGroup" :key="index" :label="list.label" :name="list.value">
              <el-row :gutter="20" style="margin:0;">
                <el-scrollbar style="height:300px;">
                  <el-col v-for="(icon, idx) in list.children" :key="idx" :label="icon" :span="3" style="margin-right:0;margin-bottom:4px;" @click.native="onIconSelectClick(icon)">
                    <span :class="['icon-select__item', { 'is-active': form.icon === icon }]">
                      <i :class="icon"></i>
                    </span>
                  </el-col>
                </el-scrollbar>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </el-popover>
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
  name: "",
  slug: null,
  icon: "",
  type: "category",
  status: "public",
  order: 0,
  description: "",
  parent: 0,
};
export default {
  name: "CategoryDialog",
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
        icon: [
          { required: true, message: '请选择图标', trigger: 'blur' }
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
      this.title = this.form.id ? '编辑目录' : '新增目录'
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
    onIconSelectClick(val) {
      this.form.icon = val;
    },
    onMock() {
      this.form = {
        ...this.form,
        name: Mock.mock('@ctitle'),
        icon: Mock.mock({
          'array|1': [...elementIcons, ...fontAwesomeBrands],
        })['array']
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


  .is-horizontal {
    display: none;
  }

  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
}
</style>