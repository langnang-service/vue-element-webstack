import { selectMetaTree, selectMetaList } from "../../api/meta";
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
      commit(
        "SET_BRANCHES",
        res.rows.filter((v) => v.slug !== "branch_langnang")
      );
    });
  },
  async getMetaTree({ commit }, payload) {
    console.log("🚀 ~ file: app.js:17 ~ getMetaTree:", payload);
    await selectMetaTree(payload).then((res) => {
      console.log(res);
      let prefix;
      if (payload.name === "langnang") {
        prefix = "home";
      } else {
        prefix = "public/" + payload.name;
      }
      console.log(prefix);
      commit("SET_PREFIX", prefix);
      commit("SET_TREE", res.tree);
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
