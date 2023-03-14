import {
  insertItem,
  deleteItem,
  deleteList,
  updateItem,
  selectList,
  selectTree,
} from "@/api/guide";
import { getGuideType } from "@/constants";
import router from '@/router'
const state = {
  branch: {
    list: [],
    active: {},
    prefix: "",
  },
  tree: [],
};

const mutations = {
  SET_BRANCH_LIST(state, payload) {
    state.branch.list = payload;
  },
  SET_BRANCH_ACTIVE(state, payload) {
    state.branch.active = payload;
  },
  SET_BRANCH_PREFIX(state, payload = "") {
    state.branch.prefix = payload ? payload + "/" : "";
  },
  SET_TREE(state, payload) {
    state.tree = payload;
  },
};

const actions = {
  insertItem({ state, dispatch }, payload = {}) {
    if (!payload.parent) payload.parent = state.branch.active.id;

    if (payload.type === "branch") payload.parent = 0;

    insertItem(payload).then((res) => {
      if (payload.type === "branch") {
        dispatch("selectBranchList");
      } else {
        dispatch("selectTree", {
          slug: state.branch.active.slug || "default",
          type: ["category", "site"],
        });
      }
    });
  },
  deleteItem({ state, dispatch }, payload) {
    let msg;
    if (payload.type === "category") {
      msg =
        "此操作将永久删除该目录, 并将该目录下所属目录及站点迁移至上级目录，是否继续?";
    }

    this._vm
      .$confirm(msg, "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
      .then(() => {
        deleteItem({ id: payload.id }).then((res) => {
          this._vm.$message({ type: "success", message: "删除成功!" });
          dispatch("selectTree", {
            slug: state.branch.active.slug || "default",
            type: ["category", "site"],
          });
        });
      }).catch(() => { });
  },
  deleteList({ state, dispatch }, payload) {
    console.log("🚀 ~ file: app.js:76 ~ deleteList ~ payload:", payload);
    const msg = getGuideType(payload.type).delete_confirm_msg;
    console.log("🚀 ~ file: app.js:78 ~ deleteList ~ this._vm:", { ...this._vm });
    return this._vm
      .$confirm(msg, "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
      .then(() => {
        deleteList({ id: [payload.id] }).then((res) => {
          this._vm.$message({ type: "success", message: "删除成功!" });
          if (payload.type === "branch") {
            dispatch("selectBranchList");
            router.push('/home');
          } else {
            dispatch("selectTree", {
              slug: state.branch.active.slug || "default",
              type: ["category", "site"],
            });
          }
        });
      }).catch(() => { });
  },
  updateItem({ state, dispatch }, payload) {
    updateItem(payload).then((res) => {
      if (payload.type === "branch") {
        dispatch("selectBranchList");
      } else {
        dispatch("selectTree", {
          slug: state.branch.active.slug || "default",
          type: ["category", "site"],
        });
      }
    });
  },
  // 获取主目录列表
  async selectBranchList({ commit }) {
    await selectList({ parent: 0, type: "branch" }).then((res) => {
      commit("SET_BRANCH_LIST", res.rows);
    });
  },
  // 获取树状数据
  selectTree({ state, commit }, payload = {}) {
    let { name, slug, type, parent } = payload;
    if (!parent) {
      const active = state.branch.list.find((v) => v.slug === slug);
      commit("SET_BRANCH_ACTIVE", active);
      parent = active.id;
    }
    selectTree({ parent })
      .then((res) => {
        let prefix;
        if (slug === "default") {
          prefix = "home";
        } else {
          prefix = "public/" + slug;
        }
        commit("SET_BRANCH_PREFIX", prefix);
        commit("SET_TREE", res.tree.children);
        return Promise.resolve(res.rows.map((v) => v.id));
      })
      .then((res) => {
        // selectContentList({ ids: res, type: "category" });
      });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
