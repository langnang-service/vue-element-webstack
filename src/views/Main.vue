<template>
  <div>
    <div v-for="(item, idx) in $store.state.app.tree" :key="idx">
      <div v-if="item.web">
        <WebItem :item="item" :transName="transName" :prefix="$store.state.app.prefix" />
      </div>
      <div v-else v-for="(subItem, idx) in item.children" :key="idx">
        <WebItem :item="subItem" :transName="transName" :prefix="$store.state.app.prefix" />
      </div>
    </div>
  </div>
</template>

<script>
import WebItem from "../components/WebItem.vue";
import Footer from "../components/Footer.vue";
import itemsData from "../assets/designer.json";
// import { loadJs } from '../assets/js/app.js'
import { mapMutations, mapState } from "vuex";
import { getMetaList } from "../api/meta";

export default {
  name: "Main",
  components: {
    WebItem,
  },
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
  computed: {},
  async beforeRouteEnter(to, from, next) {
    console.log("🚀 ~ file: Main.vue:49 ~ beforeRouteEnter:", {
      to,
      from,
      next,
      self: this,
    });
    // this.$store.dispatch('app/getMetaTree', { name: 'langnang', type: "category" })
    await next(async (vm) => {
      await vm.$store.dispatch("app/getMetaTree", {
        slug: to.params.branch || "default",
        type: "category",
      });
    });
  },
  async beforeRouteUpdate(to, from, next) {
    console.log("🚀 ~ file: Main.vue:52 ~ beforeRouteUpdate:", {
      to,
      from,
      next,
      self: this,
    });
    await this.$store.dispatch("app/getMetaTree", {
      slug: to.params.branch || "default",
      type: "category",
    });
    next();
  },
  created() {
    console.log(this);
    // this.SET_TREE(itemsData);
    this.lang = this.langList[0];
    // this.$store.dispatch('app/getMetaTree', { name: 'langnang', type: "category" })
    // loadJs();
    // getMetaList({ type: "branch" });
  },
  methods: {
    // ...mapMutations(["SET_TREE"]),
    transName(webItem) {
      return this.lang.key === "en" ? webItem.en_name : webItem.name;
    },
  },
};
</script>

<style scoped lang="scss">
.el-scrollbar,
.el-scrollbar__wrap {
  overflow-x: hidden !important;
}
</style>
