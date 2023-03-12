export default {
  permission_routes: (state) => state.permission.routes,
  branch_list: (state) =>
    state.app.branch.list.filter((v) => v.slug !== "default"),
  branch_active: (state) => state.app.branch.active,
  branch_prefix: (state) => state.app.branch.prefix,
  tree: (state) => state.app.tree,
};
