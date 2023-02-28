import { selectMetaTree, selectMetaList } from "../../api/meta";
import { selectContentList } from "../../api/content";
const state = {
  branches: [],
  tree: [],
  prefix: "",
};

const mutations = {
  SET_BRANCHES(state, payload) {
    state.branches = payload;
  },
  SET_TREE(state, payload) {
    state.tree = payload;
  },
  SET_PREFIX(state, payload = "") {
    state.prefix = payload ? payload + "/" : "";
  },
};

const actions = {
  async getBranchList({ commit }, payload) {
    await selectMetaList({ type: "branch" }).then((res) => {
      console.log("🚀 ~ file: app.js:23 ~ awaitselectMetaList ~ res:", res);
      commit("SET_BRANCHES", res.rows);
    });
  },
  async getMetaTree({ state, commit }, payload) {
    console.log("🚀 ~ file: app.js:17 ~ getMetaTree:", payload);
    let { name, slug, type, parent } = payload;
    if (!parent) {
      parent = state.branches.find((v) => v.slug === slug)["mid"];
    }
    await selectMetaTree({ name, type, parent })
      .then((res) => {
        let prefix;
        if (slug === "default") {
          prefix = "home";
        } else {
          prefix = "public/" + slug;
        }
        console.log(prefix);
        commit("SET_PREFIX", prefix);
        commit("SET_TREE", res.tree.children);
        return Promise.resolve(res.rows.map((v) => v.mid));
      })
      .then((res) => {
        console.log("🚀 ~ file: app.js:47 ~ getMetaTree ~ res:", res);
        selectContentList({ mids: res, type: "webstack" });
      });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
