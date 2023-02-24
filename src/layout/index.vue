<template>
  <el-container class="page-container">
    <LayoutAside />
    <el-container class="main-content" style="padding:0 10px;">
      <LayoutHeader />
      <el-main style="padding: 0 0 70px 0; ">
        <router-view></router-view>
      </el-main>
      <LayoutFooter />
    </el-container>
  </el-container>
</template>

<script>
import WebItem from "../components/WebItem.vue";
import LayoutAside from "./aside.vue";
import LayoutHeader from "./header.vue";
import LayoutFooter from "./footer.vue";
import itemsData from "../assets/designer.json";
export default {
  name: "Layout",
  components: { LayoutAside, LayoutHeader, LayoutFooter },
  data() {
    return {
      items: itemsData,
      lang: {},
      langList: [
        {
          key: "zh",
          name: "简体中文",
          flag: "./assets/images/flags/flag-cn.png",
        },
        {
          key: "en",
          name: "English",
          flag: "./assets/images/flags/flag-us.png",
        },
      ],
    };
  },
  created() {
    this.lang = this.langList[0];
    this.$store.dispatch('app/getBranchList')
    // loadJs();
  },
  mounted() {
    console.log(this);
  },
  methods: {
    transName(webItem) {
      return this.lang.key === "en" ? webItem.en_name : webItem.name;
    },
  },
};
</script>
