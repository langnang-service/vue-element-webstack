<template>
  <div :id="prefix + item.name" style="margin-bottom: -65px; padding-top: 85px">
    <el-card :body-style="{ 'padding': '0 10px 10px 10px' }" v-contextmenu:contextmenu @contextmenu.native.stop="$event => handleRowContextMenu(null, $event)">
      <template slot="header">
        <h4 class="text-gray">
          <i class="linecons-tag"></i>
          {{ item.name }}
        </h4>
      </template>

      <el-row :gutter="10">
        <el-checkbox-group v-model="selection" v-if="false">
          <el-col :span="6" v-for="(web, idx) in item.web" :key="idx">
            <el-checkbox :label="web">
              <el-card shadow="hover" @click.native="openweb(web.url)" style="margin: 10px 0 0 0; height: 86px; cursor: pointer">
                <div class="xe-comment-entry">
                  <div class="xe-user-img">
                    <img :src="web.logo" style="width: 40px; height: 40px" class="lozad img-circle" width="40" />
                  </div>
                  <div class="xe-comment" style="margin-left: 40px;">
                    <a href="#" class="xe-user-name overflowClip_1">
                      <strong>{{ web.title }}</strong>
                    </a>
                    <p class="overflowClip_2">{{ web.desc }}</p>
                  </div>
                </div>
              </el-card>
            </el-checkbox>
          </el-col>
        </el-checkbox-group>
        <el-empty v-if="item.children.filter(v => v.type === 'site').length == 0" :image-size="0"></el-empty>
        <draggable v-model="item.web">
          <el-col :span="6" v-for="(web, idx) in item.children.filter(v => v.type === 'site')" :key="idx" @contextmenu.native.stop="$event => handleRowContextMenu(web, $event)">
            <el-tooltip effect="dark" :content="web.url" placement="bottom">
              <el-card shadow="hover" @click.native="openweb(web.url)" style="margin: 10px 0 0 0; height: 76px; cursor: pointer" body-style="padding:10px;">
                <div class="xe-comment-entry">
                  <div class="xe-user-img">
                    <img :src="web.icon" style="width: 40px; height: 40px" class="lozad img-circle" width="40" />
                  </div>
                  <div class="xe-comment" style="margin-left: 40px;">
                    <a href="#" class="xe-user-name overflowClip_1">
                      <strong>{{ web.name }}</strong>
                    </a>
                    <p class="overflowClip_2">{{ web.description }}</p>
                  </div>
                </div>
              </el-card>
            </el-tooltip>
          </el-col>
        </draggable>
      </el-row>
    </el-card>
    <v-contextmenu ref="contextmenu">
      <v-contextmenu-item @click="() => $refs['site'].toggle({ parent: item.id })">新增站点</v-contextmenu-item>
      <hr />
      <v-contextmenu-item :disabled="!item.id" @click="() => $store.dispatch('app/deleteList', item)">删除目录</v-contextmenu-item>
      <v-contextmenu-item :disabled="!row || !row.id" @click="() => $store.dispatch('app/deleteList', row)">删除站点</v-contextmenu-item>
      <hr />
      <v-contextmenu-item :disabled="!item.id" @click="() => $refs['category'].toggle(item)">更新目录</v-contextmenu-item>
      <v-contextmenu-item :disabled="!row || !row.id" @click="() => $refs['site'].toggle(row)">更新站点</v-contextmenu-item>
      <hr />
      <v-contextmenu-item disabled>迁移站点</v-contextmenu-item>
      <hr />
      <v-contextmenu-item disabled>批量</v-contextmenu-item>
      <hr />
      <v-contextmenu-item disabled>详情</v-contextmenu-item>
    </v-contextmenu>
    <CategoryDialog ref="category" @submit="handleSubmitDialog" />
    <SiteDialog ref="site" @submit="handleSubmitDialog" />
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import { insertItem, deleteList, updateItem } from "@/api/guide";
import Mock from 'mockjs'
import CategoryDialog from "@/components/CategoryDialog.vue";
import SiteDialog from "@/components/SiteDialog.vue";
export default {
  name: "WebItem",
  components: { draggable, CategoryDialog, SiteDialog },
  props: {
    item: Object,
    prefix: String,
  },
  data() {
    return {
      row: null,
      selection: []
    }
  },
  created() {
  },
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
      this.row = null;
      // this.$refs.contextmenu.hide()
    },
    openweb(url) {
      window.open(url, "_blank");
    },
    selectTree() {
      this.$store.dispatch("app/selectTree", {
        slug: this.$route.params.branch || "default",
        type: ["category", "site"],
      });
    },
    handleInsertItem(parent = null) {
      console.log(this.row);
      console.log("handleInsertItem")
      insertItem({ name: Mock.mock('@ctitle'), type: 'site', parent: this.item.id, icon: "el-icon-eleme" }).then(res => {
        this.selectTree();
      });
    },
    handleSubmitDialog(row) {
      if (row.id) {
        this.$store.dispatch('app/updateItem', row);
      } else {
        this.$store.dispatch('app/insertItem', row);
      }
    },
  },
};
</script>

<style scoped lang="scss">
::v-deep {
  .el-checkbox {
    width: 100%;

    .el-checkbox__input {
      position: absolute;
      top: 10px;
      right: 0;
    }

    .el-checkbox__label {
      width: 100%;
    }

    &.is-checked .el-card {
      border-color: #409eff;
    }
  }

  .el-card__header {
    padding: 8px 10px;
  }

  .el-empty {
    padding: 23px 0;
  }

  .el-empty__image {
    display: none;
  }
}

i {
  margin-right: 7px;
}
</style>
