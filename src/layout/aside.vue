<template>
  <el-aside class="sidebar-menu toggle-others fixed">
    <div class="sidebar-menu-inner">
      <header class="logo-env">
        <!-- logo -->
        <div class="logo">
          <a href="#" class="logo-expanded">
            <img src="../assets/images/logo@2x.png" width="100%" alt />
          </a>
          <a href="#" class="logo-collapsed">
            <img src="../assets/images/logo-collapsed@2x.png" width="40" alt />
          </a>
        </div>
        <div class="mobile-menu-toggle visible-xs">
          <a href="#" data-toggle="user-info-menu">
            <i class="linecons-cog"></i>
          </a>
          <a href="#" data-toggle="mobile-menu">
            <i class="fa-bars"></i>
          </a>
        </div>
      </header>
      <!-- 侧边栏 -->
      <el-scrollbar style="height:calc(100vh - 62px);">
        <el-menu background-color="#2c2e2f" text-color="#979898" active-text-color="#ffd04b" unique-opened style="border: unset" v-contextmenu:contextmenu @mousedown.native="handleMouseDown">
          <draggable v-model="tree" @end="handleDraggableEnd">
            <component v-for="(menu, idx) in tree.filter(v => v.type == 'category')" :key="idx" :index="menu.name" :is="menu.children.filter(v => v.type == 'category').length > 0 ? 'el-submenu' : 'el-menu-item'" @contextmenu.native.stop="$event => handleRowContextMenu(menu, $event)">
              <template slot="title">
                <a :href="'#' + branch_prefix + menu.name" class="smooth">
                  <i :class="menu.icon"></i>
                  <span class="title">{{ menu.name }}</span>
                </a>
              </template>
              <draggable v-model="menu.children">
                <el-menu-item v-for="(submenu, idx) in menu.children.filter(v => v.type == 'category')" :key="idx" :index="submenu.name" @contextmenu.native.stop="$event => handleRowContextMenu(submenu, $event)">
                  <a :href="'#' + branch_prefix + submenu.name" class="smooth">
                    <i :class="submenu.icon"></i>
                    <span class="title">{{ submenu.name }}</span>
                    <span v-show="submenu.is_hot" class="label label-pink pull-right hidden-collapsed">Hot</span>
                  </a>
                </el-menu-item>
              </draggable>
            </component>
            <el-menu-item>
              <router-link to="/about" class="smooth" index="about">
                <i class="linecons-heart"></i>
                <span class="tooltip-blue">关于本站</span>
                <span class="label label-primary pull-right hidden-collapsed">♥︎</span>
              </router-link>
            </el-menu-item>
          </draggable>
        </el-menu>
      </el-scrollbar>
    </div>
    <v-contextmenu ref="contextmenu">
      <v-contextmenu-item @click="() => $refs['category'].toggle({ parent: branch_active.id })">新建目录</v-contextmenu-item>
      <v-contextmenu-item :disabled="branch_active.id !== (row || {}).parent" @click="() => $refs['category'].toggle({ parent: row.id })">新建子目录</v-contextmenu-item>
      <hr />
      <v-contextmenu-item @click="() => $refs['site'].toggle({ parent: row.id })">站点收录</v-contextmenu-item>
      <hr />
      <v-contextmenu-item @click="() => $store.dispatch('app/deleteList', row)">删除目录</v-contextmenu-item>
      <v-contextmenu-item @click="() => $refs['category'].toggle(row)">修改目录</v-contextmenu-item>
      <hr />
      <v-contextmenu-item disabled>批量</v-contextmenu-item>
    </v-contextmenu>
    <CategoryDialog ref="category" @submit="handleSubmitDialog" />
    <SiteDialog ref="site" @submit="handleSubmitDialog" />
  </el-aside>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import draggable from 'vuedraggable'
import { insertItem, deleteList, updateItem } from "@/api/guide";
import Mock from 'mockjs'
import CategoryDialog from "@/components/CategoryDialog.vue";
import SiteDialog from "@/components/SiteDialog.vue";
export default {
  name: "LayoutAside",
  components: { draggable, CategoryDialog, SiteDialog },
  data() {
    return {
      row: null,
      visible: false,
    };
  },
  computed: {
    ...mapGetters(["tree", "branch_prefix", "branch_active"])
  },
  created() { },
  methods: {
    /**
     * 右键表格行，显示菜单
     */
    handleRowContextMenu(row, event) {
      event.preventDefault()
      this.row = row;
      this.$refs.contextmenu.show({ top: event.clientY, left: event.clientX });
    },
    /**
     * 隐藏菜单
     */
    handleMouseDown() {
      console.log("🚀 ~ handleMouseDown:")
      this.row = null;
      // this.$refs.contextmenu.hide()
    },
    transName(webItem) {
      return this.lang.key === "en" ? webItem.en_name : webItem.name;
    },
    handleDraggableEnd(evt, originalEvent) {
      console.log("🚀 ~ file: aside.vue:81 ~ handleDraggableEnd ~ handleDraggableEnd:", { arguments, evt, originalEvent })
    },
    handleInsertItem(row) {
      this.$store.dispatch('app/insertItem', row);
      // insertItem(row).then(res => {
      // this.selectTree();
      // });
    },
    handleInsertChild() {
      const parent = this.row.id;
      this.handleInsertItem(parent)
    },
    handleDeleteItem() {
      this.$store.dispatch('app/deleteList', this.row);
    },
    handleUpdateItem(row) {
      // updateItem(row);
      // const item = { ...this.row };
      // item.name = Mock.mock('@ctitle');
      updateItem(row).then(res => {
        this.selectTree();
      });
    },
    handleSubmitDialog(row) {
      if (row.id) {
        this.$store.dispatch('app/updateItem', row);
      } else {
        this.$store.dispatch('app/insertItem', row);
        // this.handleInsertItem(row);
      }
    },
  },

};
</script>

<style scoped lang="scss">
.el-menu-item a,
.el-submenu__title a {
  color: #979898;
  text-decoration: none;
  display: block;
  border-bottom: 1px solid #313437;

  i {
    display: inline-block;
    margin-right: 10px;
    width: 20px;
  }

  .pull-right {
    margin-top: 21px;
  }
}
</style>
