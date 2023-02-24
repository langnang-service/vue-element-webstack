<template>
  <el-header class="navbar user-info-navbar" role="navigation" style="height: unset;position: fixed;z-index: 99999;     width: calc(100vw - 300px);margin-left: 0;padding-top: 30px;padding-right:30px;">
    <ul class="user-info-menu left-links list-inline list-unstyled">
      <li class="hidden-sm hidden-xs">
        <a href="#" data-toggle="sidebar">
          <i class="fa-bars"></i>
        </a>
      </li>
      <li class="hidden-sm hidden-xs">
        <router-link to="/home">Home</router-link>
      </li>
      <li class="hidden-sm hidden-xs" v-for="(item, idx) in $store.state.app.branches" :key="idx">
        <router-link :to="'/public/' + item.slug.slice(7)">{{ item.name }}</router-link>
      </li>
    </ul>
    <ul class="user-info-menu right-links list-inline list-unstyled">
      <li class="hidden-sm hidden-xs" @click="dialogFormVisible = true">
        <a style="cursor:pointer;">站点收录</a>
      </li>
      <li class="hidden-sm hidden-xs">
        <a href="#" target="_blank">登录</a>
      </li>
      <li class="hidden-sm hidden-xs">
        <a href="https://github.com/Anjaxs/WebStack-vue" target="_blank">
          <i class="fa-github"></i> GitHub
        </a>
      </li>
    </ul>
    <el-dialog title="站点收录" :visible.sync="dialogFormVisible" append-to-body>
      <el-form :model="form">
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图标" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </el-header>
</template>
<script>
export default {
  name: "LayoutHeader",
  data() {
    return {
      gridData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px'
    }
  }
}
</script>