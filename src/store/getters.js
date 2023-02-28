export default {
  permission_routes: (state) => state.permission.routes,
  branches: (state) => state.app.branches.filter((v) => v.slug !== "default"),
};
