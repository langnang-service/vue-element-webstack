<template>
  <div :id="prefix + transName(item)" v-contextmenu:contextmenu style="margin-bottom: -65px; padding-top: 85px">
    <el-card :body-style="{ 'padding': '0 10px 10px 10px' }">
      <template slot="header" style="padding:10px">
        <h4 class="text-gray">
          <i class="linecons-tag"></i>
          {{ transName(item) }}
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
        <draggable v-model="item.web">
          <el-col :span="6" v-for="(web, idx) in item.web" :key="idx">
            <el-tooltip effect="dark" :content="web.url" placement="bottom">
              <el-card shadow="hover" @click.native="openweb(web.url)" style="margin: 10px 0 0 0; height: 76px; cursor: pointer" body-style="padding:10px;">
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
            </el-tooltip>
          </el-col>
        </draggable>
      </el-row>
    </el-card>
    <v-contextmenu ref="contextmenu">
      <v-contextmenu-item>新增</v-contextmenu-item>
      <v-contextmenu-item>删除</v-contextmenu-item>
      <v-contextmenu-item>修改</v-contextmenu-item>
      <v-contextmenu-item>删除</v-contextmenu-item>
      <hr style="margin-top:3px;margin-bottom: 3px;" />
      <v-contextmenu-item>迁移</v-contextmenu-item>
      <hr style="margin-top:3px;margin-bottom: 3px;" />
      <v-contextmenu-item>批量</v-contextmenu-item>
      <hr style="margin-top:3px;margin-bottom: 3px;" />
      <v-contextmenu-item>详情</v-contextmenu-item>
    </v-contextmenu>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  name: "WebItem",
  components: { draggable },
  props: {
    item: Object,
    transName: Function,
    prefix: String,
  },
  data() {
    return {
      selection: []
    }
  },
  methods: {
    openweb(url) {
      window.open(url, "_blank");
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
}

i {
  margin-right: 7px;
}
</style>
